'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Container } from '@/components/layout/Container';
import { 
  CourseCard 
} from '@/components/academy-hub/courses';
import {
  ProgressDashboard
} from '@/components/academy-hub/progress';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
  ChevronRight
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
  },
  {
    id: '4',
    title: 'Security Best Practices',
    description: 'Protect your crypto assets with advanced security techniques and best practices.',
    thumbnail: '',
    instructor: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?u=4'
    },
    level: 'beginner',
    duration: '3 hours',
    lessons: 10,
    students: 22100,
    rating: 4.9,
    isCompleted: true,
    progress: 100,
    certificate: true,
    tags: ['Security', 'Wallets', 'Best Practices']
  },
  {
    id: '5',
    title: 'NFT Masterclass',
    description: 'Create, trade, and invest in NFTs. Learn about the NFT ecosystem and opportunities.',
    thumbnail: '',
    instructor: {
      name: 'David Lee',
      avatar: 'https://i.pravatar.cc/150?u=5'
    },
    level: 'intermediate',
    duration: '5 hours',
    lessons: 15,
    students: 9600,
    rating: 4.6,
    price: 49.99,
    certificate: true,
    tags: ['NFT', 'Digital Art', 'Investing']
  },
  {
    id: '6',
    title: 'Crypto Taxation Guide',
    description: 'Navigate crypto taxes, reporting requirements, and compliance strategies.',
    thumbnail: '',
    instructor: {
      name: 'John Davis',
      avatar: 'https://i.pravatar.cc/150?u=6'
    },
    level: 'intermediate',
    duration: '4 hours',
    lessons: 12,
    students: 6200,
    rating: 4.5,
    isLocked: true,
    certificate: true,
    tags: ['Taxation', 'Compliance', 'Legal']
  }
];

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const enrolledCourses = mockCourses.filter(course => course.progress !== undefined);
  const recommendedCourses = mockCourses.filter(course => !course.progress && !course.isLocked);

  const tabs = [
    {
      value: 'dashboard',
      label: 'My Learning',
      icon: <GraduationCap className="w-4 h-4" />,
      content: (
        <ProgressDashboard />
      )
    },
    {
      value: 'courses',
      label: 'All Courses',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
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
      )
    },
    {
      value: 'my-courses',
      label: 'My Courses',
      icon: <Trophy className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Continue Learning */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.filter(c => c.progress !== 100).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onContinue={() => console.log('Continue:', course.id)}
                />
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Completed Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.filter(c => c.progress === 100).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onContinue={() => console.log('Review:', course.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      value: 'community',
      label: 'Community',
      icon: <Users className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Study Groups */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Active Study Groups
            </h3>
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
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Top Learners This Week
            </h3>
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
      )
    }
  ];

  return (
    <ProtectedRoute>
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            RioPorto Academy
          </h1>
          <p className="text-muted-foreground">
            Learn crypto trading, DeFi, security, and more from industry experts
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Total Courses</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">124h</p>
                <p className="text-xs text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" tabs={tabs} className="space-y-6" />
      </Container>
    </ProtectedRoute>
  );
}