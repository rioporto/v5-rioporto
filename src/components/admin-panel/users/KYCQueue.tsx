import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield,
  FileText,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Filter,
  Search,
  ChevronRight,
  Camera,
  File,
  CreditCard,
  Home
} from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface KYCSubmission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  currentLevel: number;
  requestedLevel: number;
  documents: {
    type: 'id' | 'address' | 'selfie' | 'bank';
    name: string;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
    uploadDate: Date;
    reviewNote?: string;
  }[];
  submittedAt: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'additional_required';
  reviewer?: string;
  reviewedAt?: Date;
}

interface KYCQueueProps {
  className?: string;
  submissions?: KYCSubmission[];
}

const generateMockSubmissions = (): KYCSubmission[] => {
  const submissions: KYCSubmission[] = [];
  const names = [
    'Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown',
    'Emma Davis', 'Frank Miller', 'Grace Wilson', 'Henry Moore'
  ];
  const statuses: KYCSubmission['status'][] = ['pending', 'reviewing', 'approved', 'rejected', 'additional_required'];
  const priorities: KYCSubmission['priority'][] = ['high', 'medium', 'low'];
  
  for (let i = 0; i < 25; i++) {
    const name = names[i % names.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const currentLevel = Math.floor(Math.random() * 3);
    
    submissions.push({
      id: `kyc-${i}`,
      userId: `user-${i}`,
      userName: name,
      userEmail: name.toLowerCase().replace(' ', '.') + '@example.com',
      currentLevel,
      requestedLevel: Math.min(currentLevel + 1, 3),
      documents: [
        {
          type: 'id',
          name: 'Government ID',
          status: status === 'approved' ? 'approved' : 
                 status === 'rejected' ? 'rejected' : 
                 Math.random() > 0.5 ? 'reviewing' : 'pending',
          uploadDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          reviewNote: status === 'rejected' ? 'Document is blurry' : undefined
        },
        {
          type: 'address',
          name: 'Proof of Address',
          status: Math.random() > 0.5 ? 'pending' : 'reviewing',
          uploadDate: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000)
        },
        {
          type: 'selfie',
          name: 'Selfie with ID',
          status: 'pending',
          uploadDate: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000)
        }
      ],
      submittedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status,
      reviewer: status === 'approved' || status === 'rejected' ? 'Admin User' : undefined,
      reviewedAt: status === 'approved' || status === 'rejected' ? 
        new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000) : undefined
    });
  }
  
  return submissions.sort((a, b) => {
    // Sort by priority first, then by date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.submittedAt.getTime() - a.submittedAt.getTime();
  });
};

export function KYCQueue({ 
  className,
  submissions = generateMockSubmissions()
}: KYCQueueProps) {
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [filterPriority, setFilterPriority] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubmission, setSelectedSubmission] = React.useState<KYCSubmission | null>(null);

  const getStatusBadge = (status: KYCSubmission['status']) => {
    const variants = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      reviewing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      approved: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
      additional_required: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    };
    
    const labels = {
      pending: 'Pending',
      reviewing: 'Reviewing',
      approved: 'Approved',
      rejected: 'Rejected',
      additional_required: 'Additional Required'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs', variants[status])}>
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: KYCSubmission['priority']) => {
    const variants = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[priority])}>
        {priority}
      </Badge>
    );
  };

  const getDocumentIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      id: <CreditCard className="w-4 h-4" />,
      address: <Home className="w-4 h-4" />,
      selfie: <Camera className="w-4 h-4" />,
      bank: <File className="w-4 h-4" />
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const getDocumentStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      reviewing: <Eye className="w-4 h-4 text-blue-500" />,
      approved: <CheckCircle className="w-4 h-4 text-green-500" />,
      rejected: <XCircle className="w-4 h-4 text-red-500" />
    };
    return icons[status];
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (searchQuery && !submission.userName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !submission.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus !== 'all' && submission.status !== filterStatus) return false;
    if (filterPriority !== 'all' && submission.priority !== filterPriority) return false;
    return true;
  });

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    reviewing: submissions.filter(s => s.status === 'reviewing').length,
    today: submissions.filter(s => {
      const today = new Date();
      return s.submittedAt.toDateString() === today.toDateString();
    }).length,
    highPriority: submissions.filter(s => s.priority === 'high').length
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500/20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Review</p>
              <p className="text-2xl font-bold">{stats.reviewing}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500/20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Submissions</p>
              <p className="text-2xl font-bold">{stats.today}</p>
            </div>
            <FileText className="w-8 h-8 text-green-500/20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold">{stats.highPriority}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500/20" />
          </div>
        </Card>
      </div>

      {/* Queue */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            KYC Review Queue
          </h3>
          <Button size="sm">
            Auto-Assign to Me
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="additional_required">Additional Required</option>
            </select>
            <select
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-3">
          {filteredSubmissions.slice(0, 10).map((submission) => (
            <div
              key={submission.id}
              className={cn(
                'p-4 bg-muted/50 rounded-lg cursor-pointer transition-colors',
                'hover:bg-muted/70',
                selectedSubmission?.id === submission.id && 'ring-2 ring-primary'
              )}
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{submission.userName}</p>
                    <p className="text-sm text-muted-foreground">{submission.userEmail}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Level {submission.currentLevel} → {submission.requestedLevel}
                      </Badge>
                      {getPriorityBadge(submission.priority)}
                      {getStatusBadge(submission.status)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{formatDate(submission.submittedAt)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {submission.documents.map((doc, idx) => (
                      <div key={idx} className="relative">
                        {getDocumentIcon(doc.type)}
                        <div className="absolute -bottom-1 -right-1">
                          {getDocumentStatusIcon(doc.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {submission.status === 'reviewing' && submission.reviewer && (
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="text-xs">
                    Assigned to {submission.reviewer}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {selectedSubmission && (
          <div className="mt-6 p-4 bg-background border border-border rounded-lg">
            <h4 className="font-medium mb-3">Quick Actions for {selectedSubmission.userName}</h4>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Review Documents
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Additional
              </Button>
              <Button size="sm" variant="outline" className="text-green-500">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="text-red-500">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}