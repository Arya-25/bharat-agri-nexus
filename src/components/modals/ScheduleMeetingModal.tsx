
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ScheduleMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleMeetingModal = ({ open, onOpenChange }: ScheduleMeetingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage for demo purposes
    const meetings = JSON.parse(localStorage.getItem("scheduledMeetings") || "[]");
    const newMeeting = {
      id: `MEET-${Date.now()}`,
      ...formData,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };
    meetings.push(newMeeting);
    localStorage.setItem("scheduledMeetings", JSON.stringify(meetings));

    toast({
      title: "Meeting Scheduled",
      description: `Your ${formData.type} consultation is scheduled for ${formData.date} at ${formData.time}.`,
    });

    setFormData({ type: "", date: "", time: "", duration: "", notes: "" });
    onOpenChange(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Meeting Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business-consultation">Business Consultation</SelectItem>
                <SelectItem value="technical-support">Technical Support</SelectItem>
                <SelectItem value="market-analysis">Market Analysis</SelectItem>
                <SelectItem value="product-demo">Product Demo</SelectItem>
                <SelectItem value="training-session">Training Session</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={today}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Preferred Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">30 minutes</SelectItem>
                <SelectItem value="1hour">1 hour</SelectItem>
                <SelectItem value="1.5hours">1.5 hours</SelectItem>
                <SelectItem value="2hours">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific topics or requirements..."
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">Schedule Meeting</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
