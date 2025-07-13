import { useState, useEffect } from "react";
import { MessageSquare, Send, User, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  sender_id: string;
  subject: string;
  content: string;
  read: boolean;
  created_at: string;
}

export const MessagesPanel = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({ subject: '', content: '' });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (user) {
      fetchMessages();
      insertSampleMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('recipient_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const insertSampleMessages = async () => {
    if (!user) return;

    const sampleMessages = [
      {
        sender_id: user.id,
        recipient_id: user.id,
        subject: "Welcome to AgriHub Dashboard",
        content: "Welcome to your personalized agriculture dashboard. Here you can track your portfolio, register for events, and stay updated with market trends."
      },
      {
        sender_id: user.id,
        recipient_id: user.id,
        subject: "Market Analysis Report Ready",
        content: "Your requested wheat market analysis report has been generated and is ready for download. The report includes price trends, volume analysis, and future predictions."
      },
      {
        sender_id: user.id,
        recipient_id: user.id,
        subject: "Event Reminder: Smart Farming Conference",
        content: "This is a reminder that the Smart Farming Conference 2024 is scheduled for February 15th. Don't forget to attend and bring your registration confirmation."
      }
    ];

    // Check if messages already exist
    const { data: existing } = await supabase
      .from('messages')
      .select('id')
      .eq('recipient_id', user.id);

    if (!existing || existing.length === 0) {
      await supabase.from('messages').insert(sampleMessages);
      fetchMessages();
    }
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id);
    
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, read: true } : msg)
    );
  };

  const sendMessage = async () => {
    if (!user || !newMessage.subject || !newMessage.content) return;

    await supabase.from('messages').insert({
      sender_id: user.id,
      recipient_id: user.id, // For demo, sending to self
      subject: newMessage.subject,
      content: newMessage.content
    });

    setNewMessage({ subject: '', content: '' });
    fetchMessages();
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Your inbox and communications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                />
                <Textarea
                  placeholder="Message content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                  rows={5}
                />
                <Button onClick={sendMessage} className="w-full">
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <ScrollArea className="h-[350px]">
            {loading ? (
              <div className="text-center py-4">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No messages yet
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message) => (
                  <Dialog key={message.id}>
                    <DialogTrigger asChild>
                      <div
                        className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                          message.read ? 'bg-muted/20' : 'bg-background border-primary/20'
                        }`}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.read) markAsRead(message.id);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-3 w-3" />
                              <h4 className={`text-sm font-medium ${
                                message.read ? 'text-muted-foreground' : ''
                              }`}>
                                {message.subject}
                              </h4>
                              {!message.read && <Badge variant="default" className="text-xs">New</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {message.content}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3" />
                              <p className="text-xs text-muted-foreground">
                                {new Date(message.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{message.subject}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>From: System</span>
                          <Clock className="h-4 w-4 ml-4" />
                          <span>{new Date(message.created_at).toLocaleString()}</span>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};