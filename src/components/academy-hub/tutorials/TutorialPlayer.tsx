import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  BookOpen,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  List,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Download,
  FileText,
  Monitor,
  Smartphone,
  Award
} from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  timestamp: number;
}

interface TutorialPlayerProps {
  className?: string;
  tutorialId?: string;
  title?: string;
  description?: string;
  instructor?: string;
  duration?: number;
  chapters?: Chapter[];
  currentChapter?: number;
  onChapterChange?: (chapterIndex: number) => void;
  onComplete?: () => void;
}

export function TutorialPlayer({ 
  className,
  tutorialId = 'tutorial-1',
  title = 'Complete Bitcoin Trading Guide',
  description = 'Learn everything about Bitcoin trading from basics to advanced strategies',
  instructor = 'Dr. Sarah Chen',
  duration = 3600,
  chapters = [
    { id: '1', title: 'Introduction to Bitcoin', duration: 600, completed: true, timestamp: 0 },
    { id: '2', title: 'Setting Up Your Wallet', duration: 480, completed: true, timestamp: 600 },
    { id: '3', title: 'Understanding Market Orders', duration: 720, completed: false, timestamp: 1080 },
    { id: '4', title: 'Technical Analysis Basics', duration: 900, completed: false, timestamp: 1800 },
    { id: '5', title: 'Risk Management Strategies', duration: 600, completed: false, timestamp: 2700 },
    { id: '6', title: 'Advanced Trading Techniques', duration: 300, completed: false, timestamp: 3300 }
  ],
  currentChapter = 2,
  onChapterChange,
  onComplete
}: TutorialPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(chapters[currentChapter].timestamp);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showTranscript, setShowTranscript] = React.useState(false);
  const [showChapterList, setShowChapterList] = React.useState(true);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [quality, setQuality] = React.useState('1080p');
  const [showSettings, setShowSettings] = React.useState(false);

  const currentChapterData = chapters[currentChapter];
  const totalCompleted = chapters.filter(c => c.completed).length;
  const progressPercentage = (totalCompleted / chapters.length) * 100;

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next >= currentChapterData.timestamp + currentChapterData.duration) {
            // Chapter completed
            handleNextChapter();
            return currentChapterData.timestamp;
          }
          return next;
        });
      }, 1000 / playbackSpeed);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentChapter, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      onChapterChange?.(currentChapter - 1);
      setCurrentTime(chapters[currentChapter - 1].timestamp);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      onChapterChange?.(currentChapter + 1);
      setCurrentTime(chapters[currentChapter + 1].timestamp);
    } else {
      setIsPlaying(false);
      onComplete?.();
    }
  };

  const handleChapterClick = (index: number) => {
    onChapterChange?.(index);
    setCurrentTime(chapters[index].timestamp);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    
    // Find which chapter we're in
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (newTime >= chapters[i].timestamp) {
        if (i !== currentChapter) {
          onChapterChange?.(i);
        }
        break;
      }
    }
  };

  const relativeTime = currentTime - currentChapterData.timestamp;
  const chapterProgress = (relativeTime / currentChapterData.duration) * 100;

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-6', className)}>
      {/* Main Player */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="overflow-hidden">
          {/* Video Player Area */}
          <div className="relative aspect-video bg-black">
            {/* Placeholder for video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Video Player</p>
                <p className="text-sm text-gray-500 mt-2">Chapter {currentChapter + 1}: {currentChapterData.title}</p>
              </div>
            </div>

            {/* Fullscreen Badge */}
            {isFullscreen && (
              <Badge className="absolute top-4 right-4">
                Fullscreen Mode
              </Badge>
            )}
          </div>

          {/* Player Controls */}
          <div className="p-4 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousChapter}
                  disabled={currentChapter === 0}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextChapter}
                  disabled={currentChapter === chapters.length - 1}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {playbackSpeed}x
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {quality}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Settings Menu */}
            {showSettings && (
              <Card className="p-4 space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Playback Speed</p>
                  <div className="flex gap-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <Button
                        key={speed}
                        variant={playbackSpeed === speed ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setPlaybackSpeed(speed)}
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Quality</p>
                  <div className="flex gap-2">
                    {['Auto', '1080p', '720p', '480p'].map((q) => (
                      <Button
                        key={q}
                        variant={quality === q ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setQuality(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {/* Tutorial Info */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-1">{description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span>Instructor: <span className="font-medium">{instructor}</span></span>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTime(duration)}
                </Badge>
                <Badge variant="outline">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate Available
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Button
              variant={showTranscript ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Transcript
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Q&A
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Like
            </Button>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Mobile compatible</span>
            </div>
          </div>

          {/* Transcript */}
          {showTranscript && (
            <Card className="mt-4 p-4 max-h-64 overflow-y-auto">
              <h3 className="font-medium mb-3">Transcript</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">00:00</p>
                  <p>Welcome to the Complete Bitcoin Trading Guide. In this chapter, we'll explore market orders...</p>
                </div>
                <div>
                  <p className="text-muted-foreground">00:45</p>
                  <p>A market order is an instruction to buy or sell immediately at the best available price...</p>
                </div>
                <div>
                  <p className="text-muted-foreground">01:30</p>
                  <p>The main advantage of market orders is their immediate execution...</p>
                </div>
              </div>
            </Card>
          )}
        </Card>
      </div>

      {/* Chapter List */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Course Progress</h3>
            <Badge variant="outline" className="text-xs">
              {totalCompleted}/{chapters.length} completed
            </Badge>
          </div>
          <Progress value={progressPercentage} className="mb-4" />
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowChapterList(!showChapterList)}
          >
            <List className="w-4 h-4 mr-2" />
            {showChapterList ? 'Hide' : 'Show'} Chapters
          </Button>
        </Card>

        {showChapterList && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Chapters</h3>
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(index)}
                  className={cn(
                    'w-full p-3 rounded-lg text-left transition-colors',
                    currentChapter === index
                      ? 'bg-primary/10 border border-primary'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      chapter.completed
                        ? 'bg-green-500 text-white'
                        : currentChapter === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted-foreground/20'
                    )}>
                      {chapter.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        'font-medium text-sm',
                        currentChapter === index && 'text-primary'
                      )}>
                        {chapter.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatTime(chapter.duration)}
                        </span>
                        {currentChapter === index && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-primary">
                              {Math.round(chapterProgress)}% complete
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Related Resources */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Resources</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Course Materials (PDF)
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BookOpen className="w-4 h-4 mr-2" />
              Practice Exercises
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Award className="w-4 h-4 mr-2" />
              Get Certificate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}