import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, MapPin, Clock, Weight, X } from "lucide-react";

interface Shipment {
  id: string;
  orderId: string;
  status: 'dispatched' | 'in-transit' | 'delivered';
  amount: number;
  trackingId: string;
  carrier: string;
  estimatedDelivery: string;
  destination: string;
  weight: string;
  dispatchedDate: string;
  productName: string;
}

interface ShipmentTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
}

export const ShipmentTrackingModal = ({ isOpen, onClose, shipment }: ShipmentTrackingModalProps) => {
  if (!shipment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dispatched': return 'bg-blue-100 text-blue-800';
      case 'in-transit': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dispatched': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Package className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(shipment.status)}
              <DialogTitle>Shipment {shipment.status}</DialogTitle>
              <Badge className={getStatusColor(shipment.status)}>
                {shipment.status}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">
                Order #{shipment.orderId} shipped via truck
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{getDaysAgo(shipment.dispatchedDate)}</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ₹{shipment.amount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Tracking Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Tracking Id</div>
                <div className="font-medium">{shipment.trackingId}</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Estimated Delivery</div>
                <div className="font-medium">{formatDate(shipment.estimatedDelivery)}</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Weight</div>
                <div className="font-medium">{shipment.weight}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Carrier</div>
                <div className="font-medium">{shipment.carrier}</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Destination</div>
                <div className="font-medium">{shipment.destination}</div>
              </div>

              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-sm text-gray-600">Product</div>
                <div className="font-medium">{shipment.productName}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button 
              className="flex-1" 
              onClick={() => window.open(`https://www.bluedart.com/tracking/${shipment.trackingId}`, '_blank')}
            >
              Track Shipment
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};