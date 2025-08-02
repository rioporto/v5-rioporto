'use client';

import { useState } from 'react';
import { OrdersTable } from '@/components/models/financial/orders/OrdersTable';
import { OrderForm } from '@/components/models/financial/orders/OrderForm';
import { OrderDetails } from '@/components/models/financial/orders/OrderDetails';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Download,
  Settings
} from 'lucide-react';

const orderTabs = [
  { id: 'open', label: 'Open Orders', icon: Clock },
  { id: 'filled', label: 'Filled', icon: CheckCircle },
  { id: 'cancelled', label: 'Cancelled', icon: XCircle },
  { id: 'all', label: 'All Orders' },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('open');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Mock data
  const orderStats = {
    open: 5,
    filled: 23,
    cancelled: 2,
    total: 30,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track your trading orders
            </p>
          </div>
          
          {/* Order Stats */}
          <div className="flex items-center space-x-4 pl-6 border-l border-border">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                <Clock className="w-3 h-3 mr-1" />
                {orderStats.open} Open
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                {orderStats.filled} Filled
              </Badge>
              <Badge variant="outline" className="bg-muted text-muted-foreground">
                <XCircle className="w-3 h-3 mr-1" />
                {orderStats.cancelled} Cancelled
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowOrderForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <Tabs
            items={orderTabs}
            value={activeTab}
            onValueChange={setActiveTab}
            variant="underline"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {activeTab === 'open' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Open Orders</h3>
                    <div className="text-sm text-muted-foreground">
                      {orderStats.open} active orders
                    </div>
                  </div>
                  <OrdersTable 
                    filter="open"
                    onSelectOrder={setSelectedOrder}
                  />
                </div>
              </Card>
            )}

            {activeTab === 'filled' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filled Orders</h3>
                    <div className="text-sm text-muted-foreground">
                      {orderStats.filled} completed orders
                    </div>
                  </div>
                  <OrdersTable 
                    filter="filled"
                    onSelectOrder={setSelectedOrder}
                  />
                </div>
              </Card>
            )}

            {activeTab === 'cancelled' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Cancelled Orders</h3>
                    <div className="text-sm text-muted-foreground">
                      {orderStats.cancelled} cancelled orders
                    </div>
                  </div>
                  <OrdersTable 
                    filter="cancelled"
                    onSelectOrder={setSelectedOrder}
                  />
                </div>
              </Card>
            )}

            {activeTab === 'all' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">All Orders</h3>
                    <div className="text-sm text-muted-foreground">
                      {orderStats.total} total orders
                    </div>
                  </div>
                  <OrdersTable 
                    filter="all"
                    onSelectOrder={setSelectedOrder}
                  />
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Right Panel - Order Details */}
        {selectedOrder && (
          <div className="w-96 border-l border-border bg-card">
            <OrderDetails 
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          </div>
        )}
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <Card>
              <OrderForm 
                onClose={() => setShowOrderForm(false)}
                onSubmit={(order) => {
                  console.log('New order:', order);
                  setShowOrderForm(false);
                }}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}