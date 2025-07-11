
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContactSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactSupportModal = ({ open, onOpenChange }: ContactSupportModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage for demo purposes
    const tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
    const newTicket = {
      id: `TICKET-${Date.now()}`,
      ...formData,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    localStorage.setItem("supportTickets", JSON.stringify(tickets));

    toast({
      title: "Support Ticket Created",
      description: `Your ticket ${newTicket.id} has been submitted. Our team will respond within 24 hours.`,
    });

    setFormData({ subject: "", priority: "", message: "" });
    setSending(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              required
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Issue affecting work</SelectItem>
                <SelectItem value="high">High - Urgent business impact</SelectItem>
                <SelectItem value="critical">Critical - System down</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe your issue in detail..."
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={sending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sending} className="flex-1">
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
