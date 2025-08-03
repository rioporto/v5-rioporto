import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Users,
  Search,
  Filter,
  Download,
  MoreVertical,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Dropdown, DropdownContent, DropdownItem } from '@/components/ui/Dropdown';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'suspended' | 'pending';
  kycLevel: 0 | 1 | 2 | 3;
  joinDate: Date;
  lastActive: Date;
  totalVolume: number;
  balance: number;
}

interface UserManagementProps {
  className?: string;
  users?: User[];
}

const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const names = [
    'John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Davis', 
    'Chris Wilson', 'Lisa Anderson', 'David Brown', 'Maria Garcia',
    'James Martinez', 'Jennifer Lee'
  ];
  
  for (let i = 0; i < 50; i++) {
    const name = names[i % names.length] + ' ' + (Math.floor(i / names.length) + 1);
    users.push({
      id: `user-${i}`,
      name,
      email: name.toLowerCase().replace(' ', '.') + '@example.com',
      role: i === 0 ? 'admin' : i < 3 ? 'moderator' : 'user',
      status: Math.random() > 0.9 ? 'suspended' : Math.random() > 0.8 ? 'pending' : 'active',
      kycLevel: Math.floor(Math.random() * 4) as any,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      totalVolume: Math.random() * 1000000,
      balance: Math.random() * 50000
    });
  }
  
  return users;
};

export function UserManagement({ 
  className,
  users = generateMockUsers()
}: UserManagementProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [filterRole, setFilterRole] = React.useState<string>('all');
  const [filterKYC, setFilterKYC] = React.useState<string>('all');

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: 'bg-green-500/10 text-green-500 border-green-500/20',
      suspended: 'bg-red-500/10 text-red-500 border-red-500/20',
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };
    
    const icons = {
      active: <CheckCircle className="w-3 h-3" />,
      suspended: <Ban className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status])}>
        {icons[status]}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  const getRoleBadge = (role: User['role']) => {
    const variants = {
      admin: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      moderator: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      user: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[role])}>
        {role}
      </Badge>
    );
  };

  const getKYCBadge = (level: User['kycLevel']) => {
    const labels = ['Not Verified', 'Basic', 'Intermediate', 'Advanced'];
    const colors = [
      'bg-gray-500/10 text-gray-500 border-gray-500/20',
      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'bg-green-500/10 text-green-500 border-green-500/20'
    ];
    
    return (
      <Badge variant="outline" className={cn('text-xs', colors[level])}>
        <Shield className="w-3 h-3 mr-1" />
        KYC {level}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredUsers = users.filter(user => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus !== 'all' && user.status !== filterStatus) return false;
    if (filterRole !== 'all' && user.role !== filterRole) return false;
    if (filterKYC !== 'all' && user.kycLevel !== Number(filterKYC)) return false;
    return true;
  });

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Management
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            Add User
          </Button>
        </div>
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterKYC}
            onChange={(e) => setFilterKYC(e.target.value)}
          >
            <option value="all">All KYC</option>
            <option value="0">KYC 0</option>
            <option value="1">KYC 1</option>
            <option value="2">KYC 2</option>
            <option value="3">KYC 3</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left pb-3">User</th>
              <th className="text-left pb-3">Role</th>
              <th className="text-left pb-3">Status</th>
              <th className="text-left pb-3">KYC</th>
              <th className="text-left pb-3">Joined</th>
              <th className="text-left pb-3">Volume</th>
              <th className="text-left pb-3">Balance</th>
              <th className="text-left pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers.slice(0, 10).map((user) => (
              <tr 
                key={user.id} 
                className="border-b border-border/50 hover:bg-muted/50"
              >
                <td className="py-3">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="py-3">{getRoleBadge(user.role)}</td>
                <td className="py-3">{getStatusBadge(user.status)}</td>
                <td className="py-3">{getKYCBadge(user.kycLevel)}</td>
                <td className="py-3">
                  <div className="text-xs">
                    <p>{formatDate(user.joinDate)}</p>
                    <p className="text-muted-foreground">
                      Active {formatDate(user.lastActive)}
                    </p>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-muted-foreground" />
                    <span>{formatCurrency(user.totalVolume)}</span>
                  </div>
                </td>
                <td className="py-3 font-medium">
                  {formatCurrency(user.balance)}
                </td>
                <td className="py-3">
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    }
                  >
                    <DropdownContent>
                      <DropdownItem>
                        View Details
                      </DropdownItem>
                      <DropdownItem>
                        Edit User
                      </DropdownItem>
                      <DropdownItem>
                        View Activity
                      </DropdownItem>
                      <DropdownItem>
                        Reset Password
                      </DropdownItem>
                      {user.status === 'active' ? (
                        <DropdownItem className="text-red-500">
                          Suspend User
                        </DropdownItem>
                      ) : (
                        <DropdownItem className="text-green-500">
                          Activate User
                        </DropdownItem>
                      )}
                    </DropdownContent>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-muted-foreground">
          Showing 1-10 of {filteredUsers.length} users
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}