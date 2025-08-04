import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Switch } from '@/components/ui/Switch';
import { 
  Shield,
  Download,
  Upload,
  Cloud,
  HardDrive,
  Key,
  Lock,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Database,
  FileArchive,
  Smartphone,
  Mail,
  Settings,
  Info,
  ChevronRight,
  Play,
  Pause,
  X
} from 'lucide-react';

interface BackupJob {
  id: string;
  type: 'manual' | 'scheduled' | 'automatic';
  status: 'completed' | 'in_progress' | 'failed' | 'queued';
  progress?: number;
  startTime: Date;
  endTime?: Date;
  size?: number;
  items?: {
    portfolio: boolean;
    transactions: boolean;
    settings: boolean;
    kyc: boolean;
    keys: boolean;
  };
  error?: string;
}

interface BackupSchedule {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  retention: number;
  encryption: boolean;
  destinations: ('cloud' | 'email' | 'device')[];
}

interface BackupSettingsProps {
  className?: string;
  onBackupStart?: (type: string) => void;
  onScheduleChange?: (schedule: BackupSchedule) => void;
}

export function BackupSettings({ 
  className,
  onBackupStart,
  onScheduleChange
}: BackupSettingsProps) {
  const [autoBackup, setAutoBackup] = React.useState(true);
  const [currentBackup, setCurrentBackup] = React.useState<BackupJob | null>(null);
  const [schedule, setSchedule] = React.useState<BackupSchedule>({
    enabled: true,
    frequency: 'weekly',
    time: '02:00',
    retention: 30,
    encryption: true,
    destinations: ['cloud', 'email']
  });

  const backupHistory: BackupJob[] = [
    {
      id: '1',
      type: 'scheduled',
      status: 'completed',
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000),
      size: 2.5 * 1024 * 1024,
      items: { portfolio: true, transactions: true, settings: true, kyc: true, keys: false }
    },
    {
      id: '2',
      type: 'manual',
      status: 'completed',
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000),
      size: 1.8 * 1024 * 1024,
      items: { portfolio: true, transactions: true, settings: false, kyc: false, keys: false }
    },
    {
      id: '3',
      type: 'automatic',
      status: 'failed',
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      error: 'Network connection failed',
      items: { portfolio: true, transactions: true, settings: true, kyc: true, keys: true }
    }
  ];

  const dataCategories = [
    { id: 'portfolio', label: 'Portfolio Data', size: '1.2 MB', icon: <Database className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transaction History', size: '850 KB', icon: <FileArchive className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', size: '120 KB', icon: <Settings className="w-4 h-4" /> },
    { id: 'kyc', label: 'KYC Documents', size: '3.5 MB', icon: <Shield className="w-4 h-4" /> },
    { id: 'keys', label: 'API Keys (Encrypted)', size: '8 KB', icon: <Key className="w-4 h-4" /> }
  ];

  const handleBackupNow = () => {
    const newBackup: BackupJob = {
      id: Date.now().toString(),
      type: 'manual',
      status: 'in_progress',
      progress: 0,
      startTime: new Date(),
      items: { portfolio: true, transactions: true, settings: true, kyc: true, keys: true }
    };
    
    setCurrentBackup(newBackup);
    onBackupStart?.('manual');

    // Simulate backup progress
    const interval = setInterval(() => {
      setCurrentBackup(prev => {
        if (!prev || prev.progress === undefined) return prev;
        
        const newProgress = prev.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            status: 'completed',
            progress: 100,
            endTime: new Date(),
            size: 2.3 * 1024 * 1024
          };
        }
        
        return { ...prev, progress: newProgress };
      });
    }, 500);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusIcon = (status: BackupJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getNextBackupTime = () => {
    const now = new Date();
    const [hours, minutes] = schedule.time.split(':').map(Number);
    const next = new Date(now);
    next.setHours(hours, minutes, 0, 0);
    
    if (next <= now) {
      switch (schedule.frequency) {
        case 'daily':
          next.setDate(next.getDate() + 1);
          break;
        case 'weekly':
          next.setDate(next.getDate() + 7);
          break;
        case 'monthly':
          next.setMonth(next.getMonth() + 1);
          break;
      }
    }
    
    return next;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Backup & Recovery
        </h3>
        <Button onClick={handleBackupNow} disabled={currentBackup?.status === 'in_progress'}>
          <Download className="w-4 h-4 mr-2" />
          Backup Now
        </Button>
      </div>

      {/* Current Backup Progress */}
      {currentBackup && currentBackup.status === 'in_progress' && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
              <div>
                <p className="font-medium">Backup in Progress</p>
                <p className="text-sm text-muted-foreground">
                  Creating encrypted backup of your data...
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Progress value={currentBackup.progress || 0} className="mb-2" />
          <p className="text-xs text-muted-foreground text-right">
            {currentBackup.progress}% complete
          </p>
        </Card>
      )}

      {/* Automatic Backup */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-medium mb-1">Automatic Backup</h4>
            <p className="text-sm text-muted-foreground">
              Schedule regular backups to protect your data
            </p>
          </div>
          <Switch
            checked={autoBackup}
            onCheckedChange={setAutoBackup}
          />
        </div>

        {autoBackup && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Frequency</label>
                <select
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  value={schedule.frequency}
                  onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value as any })}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  value={schedule.time}
                  onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Retention</label>
                <select
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  value={schedule.retention}
                  onChange={(e) => setSchedule({ ...schedule, retention: Number(e.target.value) })}
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">
                Next backup scheduled for{' '}
                <span className="font-medium">{formatDate(getNextBackupTime())}</span>
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Backup Destinations */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Backup Destinations</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Cloud Storage</p>
                <p className="text-sm text-muted-foreground">Encrypted backup in RioPorto Cloud</p>
              </div>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Email Backup</p>
                <p className="text-sm text-muted-foreground">Send encrypted file to your email</p>
              </div>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">Local Device</p>
                <p className="text-sm text-muted-foreground">Download to your device</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Data Selection */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Data to Backup</h4>
        <div className="space-y-3">
          {dataCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <p className="font-medium">{category.label}</p>
                  <p className="text-sm text-muted-foreground">{category.size}</p>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
          <p className="text-sm text-blue-500">
            All backups are encrypted with AES-256 encryption. Your encryption key is never stored on our servers.
          </p>
        </div>
      </Card>

      {/* Backup History */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Backup History</h4>
        <div className="space-y-3">
          {backupHistory.map((backup) => (
            <div
              key={backup.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(backup.status)}
                <div>
                  <p className="font-medium capitalize">{backup.type} Backup</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(backup.startTime)}
                    {backup.size && ` • ${formatSize(backup.size)}`}
                  </p>
                  {backup.error && (
                    <p className="text-xs text-red-500 mt-1">{backup.error}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {backup.status === 'completed' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recovery Options */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Recovery Options</h4>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-2" />
            Restore from Backup
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Key className="w-4 h-4 mr-2" />
            Recovery Phrase
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-500">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Recovery
          </Button>
        </div>
      </Card>
    </div>
  );
}