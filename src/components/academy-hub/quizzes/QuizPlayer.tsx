import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { 
  Brain,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Award,
  Star,
  Target,
  Zap,
  BookOpen,
  Info,
  TrendingUp,
  Medal,
  Flag,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Question {
  id: string;
  type: 'single' | 'multiple' | 'true-false';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect?: boolean;
  }[];
  explanation?: string;
  hint?: string;
  timeLimit?: number;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  passingScore: number;
  questions: Question[];
  rewards: {
    points: number;
    badge?: string;
    certificate?: boolean;
  };
}

interface QuizPlayerProps {
  className?: string;
  quiz?: QuizData;
  onComplete?: (score: number, passed: boolean) => void;
}

const generateMockQuiz = (): QuizData => {
  return {
    id: 'quiz-1',
    title: 'Bitcoin Fundamentals',
    description: 'Test your knowledge of Bitcoin basics and blockchain technology',
    category: 'Cryptocurrency Basics',
    difficulty: 'beginner',
    duration: 600, // 10 minutes
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        type: 'single',
        difficulty: 'easy',
        points: 10,
        question: 'What is the maximum supply of Bitcoin?',
        options: [
          { id: 'a', text: '21 million', isCorrect: true },
          { id: 'b', text: '100 million', isCorrect: false },
          { id: 'c', text: 'Unlimited', isCorrect: false },
          { id: 'd', text: '50 million', isCorrect: false }
        ],
        explanation: 'Bitcoin has a fixed maximum supply of 21 million coins, which is hardcoded into the protocol.',
        hint: 'Think about the scarcity aspect of Bitcoin'
      },
      {
        id: 'q2',
        type: 'single',
        difficulty: 'medium',
        points: 15,
        question: 'What is the process called when miners validate transactions and add them to the blockchain?',
        options: [
          { id: 'a', text: 'Staking', isCorrect: false },
          { id: 'b', text: 'Mining', isCorrect: true },
          { id: 'c', text: 'Forking', isCorrect: false },
          { id: 'd', text: 'Hashing', isCorrect: false }
        ],
        explanation: 'Mining is the process where miners use computational power to validate transactions and secure the network.',
        timeLimit: 30
      },
      {
        id: 'q3',
        type: 'true-false',
        difficulty: 'easy',
        points: 10,
        question: 'Bitcoin transactions are reversible once confirmed.',
        options: [
          { id: 'true', text: 'True', isCorrect: false },
          { id: 'false', text: 'False', isCorrect: true }
        ],
        explanation: 'Bitcoin transactions are irreversible once confirmed on the blockchain, providing finality.'
      },
      {
        id: 'q4',
        type: 'single',
        difficulty: 'hard',
        points: 20,
        question: 'What is the average block time for Bitcoin?',
        options: [
          { id: 'a', text: '1 minute', isCorrect: false },
          { id: 'b', text: '5 minutes', isCorrect: false },
          { id: 'c', text: '10 minutes', isCorrect: true },
          { id: 'd', text: '30 minutes', isCorrect: false }
        ],
        explanation: 'Bitcoin aims for an average block time of 10 minutes through difficulty adjustments.',
        hint: 'It\'s longer than most other cryptocurrencies'
      },
      {
        id: 'q5',
        type: 'single',
        difficulty: 'medium',
        points: 15,
        question: 'What is a Bitcoin wallet\'s private key used for?',
        options: [
          { id: 'a', text: 'Receiving Bitcoin', isCorrect: false },
          { id: 'b', text: 'Viewing balance', isCorrect: false },
          { id: 'c', text: 'Signing transactions', isCorrect: true },
          { id: 'd', text: 'Mining Bitcoin', isCorrect: false }
        ],
        explanation: 'Private keys are used to sign transactions, proving ownership of the Bitcoin.',
        timeLimit: 30
      }
    ],
    rewards: {
      points: 100,
      badge: 'Bitcoin Expert',
      certificate: true
    }
  };
};

export function QuizPlayer({ 
  className,
  quiz = generateMockQuiz(),
  onComplete
}: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(quiz.duration);
  const [showHint, setShowHint] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  React.useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
      case 'beginner':
        return 'text-green-500';
      case 'medium':
      case 'intermediate':
        return 'text-yellow-500';
      case 'hard':
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[currentQuestion.id]) return;
    
    if (isLastQuestion) {
      handleQuizComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      setShowHint(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
      setShowHint(false);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer) {
        const selectedOption = question.options.find(opt => opt.id === selectedAnswer);
        if (selectedOption?.isCorrect) {
          totalScore += question.points;
          correctAnswers++;
        }
      }
    });
    
    const percentage = (totalScore / quiz.questions.reduce((sum, q) => sum + q.points, 0)) * 100;
    
    return {
      totalScore,
      percentage,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passed: percentage >= quiz.passingScore
    };
  };

  const handleQuizComplete = () => {
    const results = calculateScore();
    setQuizCompleted(true);
    onComplete?.(results.totalScore, results.passed);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizStarted(false);
    setQuizCompleted(false);
    setTimeRemaining(quiz.duration);
    setShowHint(false);
  };

  if (!quizStarted) {
    return (
      <Card className={cn('p-8', className)}>
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
          <p className="text-muted-foreground mb-6">{quiz.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{quiz.duration / 60} minutes</p>
            </Card>
            
            <Card className="p-4">
              <Target className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Questions</p>
              <p className="font-medium">{quiz.questions.length}</p>
            </Card>
            
            <Card className="p-4">
              <Trophy className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pass Score</p>
              <p className="font-medium">{quiz.passingScore}%</p>
            </Card>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Rewards</h3>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {quiz.rewards.points} Points
              </span>
              {quiz.rewards.badge && (
                <span className="flex items-center gap-1">
                  <Medal className="w-4 h-4 text-purple-500" />
                  {quiz.rewards.badge}
                </span>
              )}
              {quiz.rewards.certificate && (
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  Certificate
                </span>
              )}
            </div>
          </div>
          
          <Button size="lg" onClick={() => setQuizStarted(true)}>
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </div>
      </Card>
    );
  }

  if (quizCompleted) {
    const results = calculateScore();
    
    return (
      <Card className={cn('p-8', className)}>
        <div className="text-center max-w-2xl mx-auto">
          <div className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6',
            results.passed ? 'bg-green-500/10' : 'bg-red-500/10'
          )}>
            {results.passed ? (
              <Trophy className="w-10 h-10 text-green-500" />
            ) : (
              <AlertCircle className="w-10 h-10 text-red-500" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {results.passed ? 'Congratulations!' : 'Quiz Complete'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {results.passed 
              ? 'You passed the quiz! Great job!' 
              : `You need ${quiz.passingScore}% to pass. Keep practicing!`}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-3xl font-bold mb-1">{results.percentage.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Your Score</p>
            </Card>
            
            <Card className="p-6">
              <p className="text-3xl font-bold mb-1">
                {results.correctAnswers}/{results.totalQuestions}
              </p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </Card>
          </div>
          
          {results.passed && quiz.rewards && (
            <div className="p-4 bg-primary/10 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Rewards Earned</h3>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="default" className="gap-1">
                  <Star className="w-3 h-3" />
                  {quiz.rewards.points} Points
                </Badge>
                {quiz.rewards.badge && (
                  <Badge variant="secondary" className="gap-1">
                    <Medal className="w-3 h-3" />
                    {quiz.rewards.badge}
                  </Badge>
                )}
                {quiz.rewards.certificate && (
                  <Badge variant="outline" className="gap-1">
                    <Award className="w-3 h-3" />
                    Certificate Available
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleRetakeQuiz}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Review Answers
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flag className="w-4 h-4" />
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(timeRemaining)}
              </span>
              <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                {quiz.difficulty}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {/* Progress */}
        <Progress 
          value={(currentQuestionIndex / quiz.questions.length) * 100} 
          className="mt-4"
        />
      </Card>

      {/* Question */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="secondary">
                  {currentQuestion.points} points
                </Badge>
                {currentQuestion.timeLimit && (
                  <Badge variant="destructive" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {currentQuestion.timeLimit}s
                  </Badge>
                )}
              </div>
              <h4 className="text-xl font-semibold">{currentQuestion.question}</h4>
            </div>
            {currentQuestion.hint && !showHint && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint(true)}
              >
                <Info className="w-4 h-4 mr-2" />
                Hint
              </Button>
            )}
          </div>

          {showHint && currentQuestion.hint && (
            <div className="p-3 bg-blue-500/10 rounded-lg mb-4">
              <p className="text-sm text-blue-500 flex items-center gap-2">
                <Info className="w-4 h-4" />
                {currentQuestion.hint}
              </p>
            </div>
          )}

          {/* Answer Options */}
          <RadioGroup
            value={selectedAnswers[currentQuestion.id] || ''}
            onValueChange={handleAnswerSelect}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    'flex items-center p-4 rounded-lg border cursor-pointer transition-colors',
                    selectedAnswers[currentQuestion.id] === option.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <RadioGroupItem value={option.id} className="mr-3" />
                  <span className="flex-1">{option.text}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={cn(
                  'w-8 h-8 rounded-full text-xs font-medium transition-colors',
                  index === currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : selectedAnswers[quiz.questions[index].id]
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestion.id]}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}