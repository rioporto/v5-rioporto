import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { 
  Shield,
  Smartphone,
  Key,
  QrCode,
  Copy,
  Check,
  AlertCircle,
  Lock,
  ChevronRight
} from 'lucide-react';

interface TwoFactorSetupProps {
  className?: string;
  isEnabled?: boolean;
  onEnable?: () => void;
  onDisable?: () => void;
}

export function TwoFactorSetup({ 
  className,
  isEnabled = false,
  onEnable,
  onDisable
}: TwoFactorSetupProps) {
  const [step, setStep] = React.useState(1);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [secretKey] = React.useState('JBSWY3DPEHPK3PXP');
  const [copied, setCopied] = React.useState(false);
  const [backupCodes] = React.useState([
    'A3K9-2M5P-8Q7R',
    'B7N4-3X6L-9W2E',
    'C5H8-4J2K-7T9Y',
    'D9L3-6M8N-2P4Q',
    'E2W7-5R3T-8K6J',
    'F4Y9-7N5M-3L2H'
  ]);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/RioPorto:user@example.com?secret=${secretKey}&issuer=RioPorto`;

  if (isEnabled) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your account is protected with 2FA
            </p>
          </div>
          <Badge variant="default" className="bg-green-500">
            <Check className="w-3 h-3 mr-1" />
            Enabled
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-green-500">Enhanced Security Active</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Two-factor authentication adds an extra layer of security to your account
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <Smartphone className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-medium mb-1">Authenticator App</h4>
              <p className="text-xs text-muted-foreground">
                Google Authenticator connected
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Key className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-medium mb-1">Backup Codes</h4>
              <p className="text-xs text-muted-foreground">
                6 codes remaining
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Lock className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-medium mb-1">Last Used</h4>
              <p className="text-xs text-muted-foreground">
                2 hours ago
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              View Backup Codes
            </Button>
            <Button variant="outline" className="flex-1">
              Change Authentication Method
            </Button>
            <Button 
              variant="danger" 
              onClick={onDisable}
            >
              Disable 2FA
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Enable Two-Factor Authentication
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        {step > 1 && (
          <Badge variant="outline">
            Step {step} of 3
          </Badge>
        )}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-500">Important</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You'll need an authenticator app on your phone to set up 2FA. 
                  We recommend Google Authenticator or Authy.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">How it works:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Install an authenticator app</p>
                  <p className="text-sm text-muted-foreground">
                    Download Google Authenticator or Authy on your phone
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Scan QR code or enter key</p>
                  <p className="text-sm text-muted-foreground">
                    Link your account to the authenticator app
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Enter verification code</p>
                  <p className="text-sm text-muted-foreground">
                    Confirm setup with the 6-digit code from your app
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full"
            onClick={() => setStep(2)}
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Scan this QR code with your authenticator app
            </p>
            <div className="inline-block p-4 bg-white rounded-lg">
              <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or enter manually
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="secret">Secret Key</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="secret"
                value={secretKey}
                readOnly
                className="font-mono"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySecret}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep this key safe - you'll need it to recover access if you lose your device
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep(3)}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Enter verification code</h4>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div>
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="000000"
              className="text-center text-2xl font-mono tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Backup Codes
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Save these codes in a safe place. You can use them to access your account if you lose your device.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-background rounded text-center font-mono text-sm"
                >
                  {code}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              <Copy className="w-4 h-4 mr-2" />
              Copy All Codes
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={onEnable}
              disabled={verificationCode.length !== 6}
            >
              Enable 2FA
              <Lock className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}