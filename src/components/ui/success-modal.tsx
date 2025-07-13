import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  action?: string;
}

export const SuccessModal = ({ isOpen, onClose, title, message, action = "Continue" }: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-muted-foreground">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center">
          <Button onClick={onClose} className="w-full sm:w-auto">
            {action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};