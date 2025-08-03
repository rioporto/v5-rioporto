'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CourseCard,
  ProgressDashboard,
  TutorialPlayer,
  QuizPlayer
} from '@/components/academy-hub';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Users,
  Search,
  Filter,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  Play,
  PenTool
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
  };
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  price?: number;
  certificate?: boolean;
  tags: string[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Bitcoin and Blockchain',
    description: 'Learn the fundamentals of Bitcoin, blockchain technology, and how cryptocurrencies work.',
    thumbnail: '',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    level: 'beginner',
    duration: '4 hours',
    lessons: 12,
    students: 15420,
    rating: 4.8,
    progress: 75,
    certificate: true,
    tags: ['Bitcoin', 'Blockchain', 'Fundamentals']
  },
  {
    id: '2',
    title: 'Advanced Trading Strategies',
    description: 'Master technical analysis, risk management, and advanced trading techniques.',
    thumbnail: '',
    instructor: {
      name: 'Michael Roberts',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    level: 'advanced',
    duration: '8 hours',
    lessons: 24,
    students: 8350,
    rating: 4.9,
    progress: 30,
    certificate: true,
    tags: ['Trading', 'Technical Analysis', 'Risk Management']
  },
  {
    id: '3',
    title: 'DeFi Fundamentals',
    description: 'Understand decentralized finance, yield farming, liquidity pools, and more.',
    thumbnail: '',
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    level: 'intermediate',
    duration: '6 hours',
    lessons: 18,
    students: 12800,
    rating: 4.7,
    certificate: true,
    tags: ['DeFi', 'Yield Farming', 'Smart Contracts']
  }
];

export default function AcademyPage() {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'courses' | 'tutorials' | 'quizzes' | 'community'>('dashboard');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);

  const stats = {
    totalCourses: 24,
    completed: 8,
    learningTime: 124,
    certificates: 5,
    rank: 42,
    points: 2850
  };

  const tabs = [
    { id: 'dashboard', label: 'My Learning', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'courses', label: 'All Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'tutorials', label: 'Tutorials', icon: <Play className="w-4 h-4" /> },
    { id: 'quizzes', label: 'Quizzes', icon: <PenTool className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-500" />
            RioPorto Academy
          </h1>
          <p className="text-muted-foreground mt-2">
            Learn crypto trading, DeFi, security, and more from industry experts
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2 border-purple-500 text-purple-500">
            <Trophy className="w-4 h-4 mr-2" />
            Rank #{stats.rank} • {stats.points} pts
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
              <p className="text-xs text-muted-foreground">Total Courses</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{stats.learningTime}h</p>
              <p className="text-xs text-muted-foreground">Learning Time</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{stats.certificates}</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'dashboard' && <ProgressDashboard />}

      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="trading">Trading</option>
                <option value="defi">DeFi</option>
                <option value="security">Security</option>
                <option value="nft">NFT</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => console.log('Enroll:', course.id)}
                onContinue={() => console.log('Continue:', course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tutorials' && (
        <div className="space-y-6">
          {!showTutorial ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: '1', title: 'Getting Started with RioPorto', duration: '15 min', category: 'Platform' },
                  { id: '2', title: 'How to Place Your First Trade', duration: '20 min', category: 'Trading' },
                  { id: '3', title: 'Understanding Order Types', duration: '25 min', category: 'Trading' },
                  { id: '4', title: 'Security Best Practices', duration: '18 min', category: 'Security' },
                  { id: '5', title: 'Using Stop Loss Orders', duration: '12 min', category: 'Risk Management' },
                  { id: '6', title: 'Introduction to DeFi', duration: '30 min', category: 'DeFi' }
                ].map((tutorial) => (
                  <Card 
                    key={tutorial.id} 
                    className="p-6 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setShowTutorial(true)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">{tutorial.category}</Badge>
                      <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setShowTutorial(false)}
                className="mb-4"
              >
                ← Back to Tutorials
              </Button>
              <TutorialPlayer 
                tutorialId="tutorial-1"
                onComplete={() => {
                  console.log('Tutorial completed');
                  setShowTutorial(false);
                }}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          {!showQuiz ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: '1', title: 'Bitcoin Basics Quiz', questions: 10, difficulty: 'Easy', xp: 50 },
                  { id: '2', title: 'Trading Fundamentals', questions: 15, difficulty: 'Medium', xp: 100 },
                  { id: '3', title: 'Advanced DeFi Concepts', questions: 20, difficulty: 'Hard', xp: 200 },
                  { id: '4', title: 'Security Knowledge Test', questions: 12, difficulty: 'Medium', xp: 80 },
                  { id: '5', title: 'Market Analysis', questions: 18, difficulty: 'Hard', xp: 150 },
                  { id: '6', title: 'Crypto Regulations', questions: 10, difficulty: 'Easy', xp: 60 }
                ].map((quiz) => (
                  <Card 
                    key={quiz.id} 
                    className="p-6 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setShowQuiz(true)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Badge 
                        variant="outline"
                        className={cn(
                          quiz.difficulty === 'Easy' && 'border-green-500 text-green-500',
                          quiz.difficulty === 'Medium' && 'border-yellow-500 text-yellow-500',
                          quiz.difficulty === 'Hard' && 'border-red-500 text-red-500'
                        )}
                      >
                        {quiz.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{quiz.xp} XP</span>
                    </div>
                    <h3 className="font-semibold mb-2">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {quiz.questions} questions
                    </p>
                    <Button className="w-full" variant="outline">
                      <PenTool className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setShowQuiz(false)}
                className="mb-4"
              >
                ← Back to Quizzes
              </Button>
              <QuizPlayer 
                quizId="quiz-1"
                onComplete={(score) => {
                  console.log('Quiz completed with score:', score);
                  setShowQuiz(false);
                }}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-6">
          {/* Study Groups */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Study Groups</h3>
            <div className="space-y-4">
              {['Trading Fundamentals', 'DeFi Deep Dive', 'Security Best Practices'].map((group) => (
                <div key={group} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{group}</h4>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 50 + 10)} members • Active now
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join Group
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Learners This Week</h3>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => ({
                rank: i + 1,
                name: ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Davis', 'Chris Wilson'][i],
                points: 2500 - i * 200,
                courses: 8 - i
              })).map((learner) => (
                <div key={learner.rank} className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    learner.rank === 1 && 'bg-yellow-500 text-white',
                    learner.rank === 2 && 'bg-gray-400 text-white',
                    learner.rank === 3 && 'bg-orange-600 text-white',
                    learner.rank > 3 && 'bg-muted text-muted-foreground'
                  )}>
                    {learner.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{learner.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {learner.points} points • {learner.courses} courses
                    </p>
                  </div>
                  {learner.rank <= 3 && <Trophy className="w-4 h-4 text-yellow-500" />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}