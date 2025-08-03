'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Info,
  ExternalLink
} from 'lucide-react';

interface OrderData {
  id?: string;
  type: 'market' | 'limit' | 'stop' | 'stop_loss' | 'take_profit';
  side: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price?: number;
  triggerPrice?: number;
  total: number;
  fee: number;
  timeInForce?: string;
  reduceOnly?: boolean;
}

interface OrderConfirmationProps {
  order: OrderData;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  status?: 'pending' | 'confirmed' | 'filled' | 'cancelled' | 'failed';
  error?: string;
  txHash?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    label: 'Pending',
  },
  confirmed: {
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10',
    label: 'Confirmed',
  },
  filled: {
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10',
    label: 'Filled',
  },
  cancelled: {
    icon: XCircle,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    label: 'Cancelled',
  },
  failed: {
    icon: XCircle,
    color: 'text-error',
    bgColor: 'bg-error/10',
    label: 'Failed',
  },
};

export function OrderConfirmation({
  order,
  onConfirm,
  onCancel,
  isSubmitting = false,
  status,
  error,
  txHash
}: OrderConfirmationProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getOrderTypeDisplay = () => {
    switch (order.type) {
      case 'market': return 'Market Order';
      case 'limit': return 'Limit Order';
      case 'stop': return 'Stop Order';
      case 'stop_loss': return 'Stop Loss';
      case 'take_profit': return 'Take Profit';
      default: return order.type;
    }
  };

  const getOrderIcon = () => {
    switch (order.type) {
      case 'stop_loss': return Shield;
      case 'take_profit': return Target;
      default: return order.side === 'buy' ? TrendingUp : TrendingDown;
    }
  };

  const OrderIcon = getOrderIcon();
  const currentStatus = status ? statusConfig[status] : null;
  const StatusIcon = currentStatus?.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <OrderIcon className={`w-6 h-6 ${order.side === 'buy' ? 'text-success' : 'text-error'}`} />
          <h2 className="text-xl font-bold">Order Confirmation</h2>
        </div>
        {status && (
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${currentStatus?.bgColor} ${currentStatus?.color}`}>
            {StatusIcon && <StatusIcon className="w-4 h-4" />}
            <span>{currentStatus?.label}</span>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Type</span>
            <div className="flex items-center space-x-2">
              <Badge variant={order.side === 'buy' ? 'success' : 'error'}>
                {order.side.toUpperCase()}
              </Badge>
              <span className="font-medium">{getOrderTypeDisplay()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Symbol</span>
            <span className="font-mono font-medium">{order.symbol}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-mono font-medium">
              {order.amount.toFixed(8)} {order.symbol.split('/')[0]}
            </span>
          </div>

          {order.price && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-mono font-medium">
                R$ {order.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {order.triggerPrice && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Trigger Price</span>
              <span className="font-mono font-medium">
                R$ {order.triggerPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-mono font-medium text-lg">
                R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-mono">
                R$ {order.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Details */}
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full justify-between"
        >
          <span>Order Details</span>
          <span className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </Button>

        {showDetails && (
          <Card>
            <div className="p-4 space-y-3 text-sm">
              {order.id && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono">{order.id}</span>
                </div>
              )}

              {order.timeInForce && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time in Force</span>
                  <span>{order.timeInForce}</span>
                </div>
              )}

              {order.reduceOnly && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reduce Only</span>
                  <span>Yes</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee Rate</span>
                <span>0.1%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time</span>
                <span>{order.type === 'market' ? 'Immediate' : '< 1 minute'}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Transaction Hash */}
      {txHash && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Transaction Hash</span>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <code className="text-xs font-mono break-all text-muted-foreground">
              {txHash}
            </code>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card>
          <div className="p-4 bg-error/10 border-error/20">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-error">Order Failed</div>
                <div className="text-sm text-error/80 mt-1">{error}</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Risk Warning */}
      {order.type === 'market' && (
        <Card>
          <div className="p-4 bg-warning/10 border-warning/20">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-warning mb-1">Market Order Warning</div>
                <p className="text-warning/80">
                  Market orders execute immediately at the best available price. 
                  The actual execution price may differ from the current market price, 
                  especially during high volatility.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {!status && (
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`flex-1 ${
              order.side === 'buy' 
                ? 'bg-success hover:bg-success/90' 
                : 'bg-error hover:bg-error/90'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <>
                Confirm {order.side === 'buy' ? 'Buy' : 'Sell'} Order
              </>
            )}
          </Button>
        </div>
      )}

      {status && ['confirmed', 'filled'].includes(status) && (
        <Button onClick={onCancel} className="w-full">
          Close
        </Button>
      )}

      {status === 'failed' && (
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Close
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            Retry Order
          </Button>
        </div>
      )}

      {/* Progress Bar for Pending Orders */}
      {isSubmitting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing order...</span>
            <span className="text-muted-foreground">⏱️ ~30s</span>
          </div>
          <Progress value={undefined} className="h-2" />
        </div>
      )}
    </div>
  );
}