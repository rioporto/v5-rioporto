import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { 
  Shield,
  Eye,
  EyeOff,
  UserX,
  Globe,
  Lock,
  Smartphone,
  Mail,
  Bell,
  Database,
  Download,
  Trash2,
  AlertTriangle,
  Check,
  X,
  Info,
  ChevronRight,
  FileText,
  Key,
  Camera,
  Mic,
  MapPin
} from 'lucide-react';

interface PrivacySetting {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  risk: 'low' | 'medium' | 'high';
  recommendation?: string;
}

interface PrivacySettingsProps {
  className?: string;
  onSettingChange?: (settingId: string, enabled: boolean) => void;
}

export function PrivacySettings({ 
  className,
  onSettingChange
}: PrivacySettingsProps) {
  const [settings, setSettings] = React.useState<PrivacySetting[]>([
    // Profile Privacy
    {
      id: 'profile-public',
      category: 'Profile',
      title: 'Public Profile',
      description: 'Allow others to view your profile and trading statistics',
      icon: <Globe className="w-4 h-4" />,
      enabled: false,
      risk: 'medium',
      recommendation: 'Keep disabled for maximum privacy'
    },
    {
      id: 'profile-photo',
      category: 'Profile',
      title: 'Profile Photo Visibility',
      description: 'Show your profile photo to other users',
      icon: <Camera className="w-4 h-4" />,
      enabled: true,
      risk: 'low'
    },
    {
      id: 'online-status',
      category: 'Profile',
      title: 'Online Status',
      description: 'Show when you are online to other users',
      icon: <Eye className="w-4 h-4" />,
      enabled: false,
      risk: 'low'
    },
    {
      id: 'trading-history',
      category: 'Profile',
      title: 'Trading History Visibility',
      description: 'Allow others to see your trading history',
      icon: <FileText className="w-4 h-4" />,
      enabled: false,
      risk: 'high',
      recommendation: 'Keep disabled to protect trading strategies'
    },

    // Data Collection
    {
      id: 'analytics-tracking',
      category: 'Data Collection',
      title: 'Analytics & Tracking',
      description: 'Help improve our services by sharing usage data',
      icon: <Database className="w-4 h-4" />,
      enabled: true,
      risk: 'low'
    },
    {
      id: 'personalized-ads',
      category: 'Data Collection',
      title: 'Personalized Advertising',
      description: 'Show relevant ads based on your activity',
      icon: <Eye className="w-4 h-4" />,
      enabled: false,
      risk: 'medium'
    },
    {
      id: 'location-tracking',
      category: 'Data Collection',
      title: 'Location Services',
      description: 'Use location for security and regional features',
      icon: <MapPin className="w-4 h-4" />,
      enabled: true,
      risk: 'medium'
    },
    {
      id: 'device-fingerprinting',
      category: 'Data Collection',
      title: 'Device Fingerprinting',
      description: 'Identify your devices for security purposes',
      icon: <Smartphone className="w-4 h-4" />,
      enabled: true,
      risk: 'low',
      recommendation: 'Recommended for account security'
    },

    // Communication
    {
      id: 'email-marketing',
      category: 'Communication',
      title: 'Marketing Emails',
      description: 'Receive promotional emails and newsletters',
      icon: <Mail className="w-4 h-4" />,
      enabled: false,
      risk: 'low'
    },
    {
      id: 'sms-notifications',
      category: 'Communication',
      title: 'SMS Notifications',
      description: 'Get important updates via text message',
      icon: <Smartphone className="w-4 h-4" />,
      enabled: true,
      risk: 'low'
    },
    {
      id: 'push-notifications',
      category: 'Communication',
      title: 'Push Notifications',
      description: 'Receive push notifications on your devices',
      icon: <Bell className="w-4 h-4" />,
      enabled: true,
      risk: 'low'
    },
    {
      id: 'third-party-sharing',
      category: 'Communication',
      title: 'Third-Party Sharing',
      description: 'Share data with trusted partners for enhanced services',
      icon: <UserX className="w-4 h-4" />,
      enabled: false,
      risk: 'high',
      recommendation: 'Disable unless necessary'
    },

    // Security
    {
      id: 'login-notifications',
      category: 'Security',
      title: 'Login Notifications',
      description: 'Get notified of new login attempts',
      icon: <Lock className="w-4 h-4" />,
      enabled: true,
      risk: 'low',
      recommendation: 'Keep enabled for security'
    },
    {
      id: 'api-access-logs',
      category: 'Security',
      title: 'API Access Logging',
      description: 'Log all API access for security monitoring',
      icon: <Key className="w-4 h-4" />,
      enabled: true,
      risk: 'low'
    },
    {
      id: 'voice-biometrics',
      category: 'Security',
      title: 'Voice Biometrics',
      description: 'Use voice recognition for enhanced security',
      icon: <Mic className="w-4 h-4" />,
      enabled: false,
      risk: 'medium'
    },
    {
      id: 'anonymous-mode',
      category: 'Security',
      title: 'Anonymous Trading Mode',
      description: 'Hide your identity in order books',
      icon: <EyeOff className="w-4 h-4" />,
      enabled: false,
      risk: 'low'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [showDataRequest, setShowDataRequest] = React.useState(false);

  const categories = [
    { id: 'all', label: 'All Settings', count: settings.length },
    { id: 'Profile', label: 'Profile', count: settings.filter(s => s.category === 'Profile').length },
    { id: 'Data Collection', label: 'Data Collection', count: settings.filter(s => s.category === 'Data Collection').length },
    { id: 'Communication', label: 'Communication', count: settings.filter(s => s.category === 'Communication').length },
    { id: 'Security', label: 'Security', count: settings.filter(s => s.category === 'Security').length }
  ];

  const filteredSettings = selectedCategory === 'all' 
    ? settings 
    : settings.filter(s => s.category === selectedCategory);

  const handleToggle = (settingId: string) => {
    setSettings(prev => prev.map(s => 
      s.id === settingId ? { ...s, enabled: !s.enabled } : s
    ));
    const setting = settings.find(s => s.id === settingId);
    if (setting) {
      onSettingChange?.(settingId, !setting.enabled);
    }
  };

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: 'bg-green-500/10 text-green-500 border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      high: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[risk])}>
        {risk} risk
      </Badge>
    );
  };

  const privacyScore = React.useMemo(() => {
    const enabledHighRisk = settings.filter(s => s.enabled && s.risk === 'high').length;
    const enabledMediumRisk = settings.filter(s => s.enabled && s.risk === 'medium').length;
    const totalSettings = settings.length;
    
    const score = Math.max(0, 100 - (enabledHighRisk * 20) - (enabledMediumRisk * 10));
    
    return {
      score,
      level: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor',
      color: score >= 80 ? 'text-green-500' : score >= 60 ? 'text-blue-500' : score >= 40 ? 'text-yellow-500' : 'text-red-500'
    };
  }, [settings]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy Settings
        </h3>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Privacy Score</p>
            <p className={cn('text-2xl font-bold', privacyScore.color)}>
              {privacyScore.score}%
            </p>
          </div>
          <Badge variant="outline" className={privacyScore.color}>
            {privacyScore.level}
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              setSettings(prev => prev.map(s => ({ ...s, enabled: s.risk === 'low' })));
            }}
          >
            <Shield className="w-4 h-4 mr-2" />
            Maximum Privacy
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              setSettings(prev => prev.map(s => ({ 
                ...s, 
                enabled: s.risk === 'low' || (s.risk === 'medium' && s.recommendation?.includes('Recommended'))
              })));
            }}
          >
            <Check className="w-4 h-4 mr-2" />
            Balanced
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowDataRequest(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Request My Data
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            {category.label}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {filteredSettings.map((setting) => (
          <Card key={setting.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-muted">
                  {setting.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{setting.title}</h4>
                    {getRiskBadge(setting.risk)}
                  </div>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                  {setting.recommendation && (
                    <div className="flex items-start gap-2 mt-2 p-2 bg-blue-500/10 rounded">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                      <p className="text-xs text-blue-500">{setting.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
              <Switch
                checked={setting.enabled}
                onCheckedChange={() => handleToggle(setting.id)}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Privacy Policy */}
      <Card className="p-4">
        <button className="w-full flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Privacy Policy</p>
              <p className="text-sm text-muted-foreground">Last updated: January 15, 2025</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </Card>

      {/* Data Request Modal */}
      {showDataRequest && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Request Your Data</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We'll prepare a complete copy of your data and send it to your email within 48 hours.
            </p>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Your data package will include:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Profile information
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Trading history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Account settings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Communication logs
                  </li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDataRequest(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setShowDataRequest(false);
                    // Handle data request
                  }}
                >
                  Request Data
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}