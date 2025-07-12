
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Mail, Download } from "lucide-react";
import { useEffect, useState } from "react";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

export const RegistrationSuccessModal = ({ 
  isOpen, 
  onClose, 
  eventTitle, 
  eventDate, 
  eventLocation 
}: RegistrationSuccessModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '1s'
                }}
              >
                🎉
              </div>
            ))}
          </div>
        )}

        <div className="text-center space-y-6 py-4">
          {/* Success Icon with Animation */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 Registration Successful!
            </h2>
            <p className="text-gray-600">
              Congratulations! You have successfully registered for the event.
            </p>
          </div>

          {/* Event Details Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3">{eventTitle}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">{eventDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">{eventLocation}</span>
              </div>
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Confirmation Sent</span>
            </div>
            <p className="text-sm text-blue-700">
              Event details and ticket have been sent to your registered email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => {
                // Simulate downloading ticket
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,Event Ticket - ' + eventTitle;
                link.download = 'event-ticket.txt';
                link.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
