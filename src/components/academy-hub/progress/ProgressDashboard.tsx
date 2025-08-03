import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Trophy,
  Target,
  Flame,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Calendar,
  Star,
  Zap
} from 'lucide-react';

interface ProgressStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  certificatesEarned: number;
  skillPoints: number;
  level: number;
  nextLevelProgress: number;
}

interface ProgressDashboardProps {
  className?: string;
  stats?: ProgressStats;
}

const defaultStats: ProgressStats = {
  totalCourses: 15,
  completedCourses: 8,
  inProgressCourses: 3,
  totalHours: 124,
  currentStreak: 7,
  longestStreak: 15,
  certificatesEarned: 5,
  skillPoints: 2450,
  level: 12,
  nextLevelProgress: 65
};

export function ProgressDashboard({ 
  className,
  stats = defaultStats
}: ProgressDashboardProps) {
  const completionRate = Math.round((stats.completedCourses / stats.totalCourses) * 100);
  
  const achievements = [
    { 
      id: '1', 
      title: 'Fast Learner', 
      description: 'Complete 5 courses', 
      progress: Math.min(100, (stats.completedCourses / 5) * 100),
      icon: <Zap className="w-4 h-4" />,
      unlocked: stats.completedCourses >= 5
    },
    { 
      id: '2', 
      title: 'Dedicated Student', 
      description: '7 day streak', 
      progress: Math.min(100, (stats.currentStreak / 7) * 100),
      icon: <Flame className="w-4 h-4" />,
      unlocked: stats.currentStreak >= 7
    },
    { 
      id: '3', 
      title: 'Certificate Collector', 
      description: 'Earn 3 certificates', 
      progress: Math.min(100, (stats.certificatesEarned / 3) * 100),
      icon: <Award className="w-4 h-4" />,
      unlocked: stats.certificatesEarned >= 3
    },
    { 
      id: '4', 
      title: 'Knowledge Seeker', 
      description: '100 hours of learning', 
      progress: Math.min(100, (stats.totalHours / 100) * 100),
      icon: <BookOpen className="w-4 h-4" />,
      unlocked: stats.totalHours >= 100
    }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <Badge variant="outline" className="text-xs">
              Level {stats.level}
            </Badge>
          </div>
          <p className="text-2xl font-bold">{stats.skillPoints}</p>
          <p className="text-xs text-muted-foreground">Skill Points</p>
          <Progress value={stats.nextLevelProgress} className="h-1 mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            {stats.currentStreak > 0 && (
              <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">
                Active
              </Badge>
            )}
          </div>
          <p className="text-2xl font-bold">{stats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
          <p className="text-xs text-muted-foreground mt-1">
            Best: {stats.longestStreak} days
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-muted-foreground">
              {completionRate}%
            </span>
          </div>
          <p className="text-2xl font-bold">{stats.completedCourses}</p>
          <p className="text-xs text-muted-foreground">Courses Completed</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.inProgressCourses} in progress
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalHours}h</p>
          <p className="text-xs text-muted-foreground">Learning Time</p>
          <p className="text-xs text-muted-foreground mt-1">
            ~{Math.round(stats.totalHours / 30)}h per month
          </p>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Learning Progress
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Completion</span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
              <p className="text-xs text-muted-foreground">Total Courses</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
              <p className="text-xs text-muted-foreground">Certificates Earned</p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">+23%</p>
              <p className="text-xs text-muted-foreground">Monthly Growth</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Achievements
          </h3>
          <Badge variant="outline" className="text-xs">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                'p-4 rounded-lg border transition-all',
                achievement.unlocked 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/50 border-border'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  achievement.unlocked 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={cn(
                      'font-medium',
                      !achievement.unlocked && 'text-muted-foreground'
                    )}>
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <Progress 
                    value={achievement.progress} 
                    className="h-1.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Study Calendar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Study Calendar
          </h3>
          <Badge variant="outline" className="text-xs">
            This Month
          </Badge>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="text-center text-xs text-muted-foreground font-medium">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const hasActivity = Math.random() > 0.5;
            const isToday = i === 20;
            return (
              <div
                key={i}
                className={cn(
                  'aspect-square rounded flex items-center justify-center text-xs',
                  hasActivity && 'bg-primary/20 text-primary font-medium',
                  !hasActivity && 'bg-muted/50',
                  isToday && 'ring-2 ring-primary'
                )}
              >
                {i % 7 + 1}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/20 rounded" />
            <span>Study Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted/50 rounded" />
            <span>No Activity</span>
          </div>
        </div>
      </Card>
    </div>
  );
}