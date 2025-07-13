import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  max_attendees: number;
  current_attendees: number;
  price: number;
}

interface Registration {
  id: string;
  event_id: string;
  status: string;
}

export const EnhancedCalendar = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
  };

  const fetchRegistrations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      setRegistrations(data);
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(reg => reg.event_id === eventId);
  };

  const getRegisteredEventDates = () => {
    const registeredEventIds = registrations.map(reg => reg.event_id);
    return events
      .filter(event => registeredEventIds.includes(event.id))
      .map(event => new Date(event.date));
  };

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];
  const registeredDates = getRegisteredEventDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'summit': return 'bg-purple-100 text-purple-800';
      case 'seminar': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Event Calendar
          </CardTitle>
          <CardDescription>
            View upcoming events and your registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              registered: registeredDates
            }}
            modifiersStyles={{
              registered: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary"></div>
              <span>Registered Events</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? formatDate(selectedDate) : 'Select a Date'}
          </CardTitle>
          <CardDescription>
            {eventsForSelectedDate.length === 0 
              ? 'No events scheduled for this date'
              : `${eventsForSelectedDate.length} event(s) scheduled`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {eventsForSelectedDate.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{event.title}</h3>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>{event.current_attendees}/{event.max_attendees} attendees</span>
                  </div>
                </div>

                <p className="text-xs mt-2 text-muted-foreground line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium">₹{event.price}</span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedEvent(event)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Date:</span>
                              <p className="text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Time:</span>
                              <p className="text-muted-foreground">{event.time}</p>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <p className="text-muted-foreground">{event.location}</p>
                            </div>
                            <div>
                              <span className="font-medium">Price:</span>
                              <p className="text-muted-foreground">₹{event.price}</p>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Description:</span>
                            <p className="text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                            {isRegistered(event.id) && (
                              <Badge variant="outline" className="text-green-600">
                                Registered
                              </Badge>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {isRegistered(event.id) ? (
                      <Badge variant="outline" className="text-green-600">
                        Registered
                      </Badge>
                    ) : (
                      <Button size="sm" className="text-xs">
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};