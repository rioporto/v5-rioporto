import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { 
  BookOpen,
  Clock,
  Users,
  Star,
  Trophy,
  Play,
  Lock,
  CheckCircle,
  BarChart
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

interface CourseCardProps {
  className?: string;
  course: Course;
  onEnroll?: () => void;
  onContinue?: () => void;
}

export function CourseCard({ 
  className,
  course,
  onEnroll,
  onContinue
}: CourseCardProps) {
  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };

  const getLevelIcon = (level: Course['level']) => {
    switch (level) {
      case 'beginner': return <BarChart className="w-3 h-3" />;
      case 'intermediate': return <BarChart className="w-3 h-3" />;
      case 'advanced': return <BarChart className="w-3 h-3" />;
    }
  };

  const isEnrolled = course.progress !== undefined;

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      <div className="relative aspect-video bg-muted">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {course.isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}

        {course.isCompleted && (
          <div className="absolute top-2 right-2 p-2 bg-green-500 rounded-full">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}

        <Badge 
          variant="outline" 
          className={cn(
            'absolute top-2 left-2 capitalize',
            getLevelColor(course.level)
          )}
        >
          {getLevelIcon(course.level)}
          <span className="ml-1">{course.level}</span>
        </Badge>

        {course.certificate && (
          <Badge 
            variant="outline" 
            className="absolute bottom-2 right-2 bg-background/90"
          >
            <Trophy className="w-3 h-3 mr-1" />
            Certificate
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {course.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        {isEnrolled && course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="pt-3 border-t border-border">
          {course.isLocked ? (
            <Button 
              variant="outline" 
              className="w-full" 
              disabled
            >
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </Button>
          ) : isEnrolled ? (
            <Button 
              className="w-full"
              onClick={onContinue}
            >
              <Play className="w-4 h-4 mr-2" />
              {course.progress === 100 ? 'Review' : 'Continue Learning'}
            </Button>
          ) : (
            <div className="space-y-2">
              {course.price !== undefined && course.price > 0 && (
                <div className="text-center">
                  <span className="text-2xl font-bold">${course.price}</span>
                </div>
              )}
              <Button 
                className="w-full"
                onClick={onEnroll}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {course.price && course.price > 0 ? 'Enroll Now' : 'Start Free'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}