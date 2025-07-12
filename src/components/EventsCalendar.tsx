
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "AgriBusiness Innovation Summit 2024",
      date: new Date(2024, 2, 15), // March 15, 2024
      time: "10:00 AM",
      location: "New Delhi, India",
      attendees: "500+ Participants",
      type: "Conference"
    },
    {
      id: 2,
      title: "FPO Digital Transformation Workshop",
      date: new Date(2024, 3, 8), // April 8, 2024
      time: "2:00 PM",
      location: "Pune, Maharashtra",
      attendees: "200+ FPO Representatives",
      type: "Workshop"
    },
    {
      id: 3,
      title: "International Agri-Trade Exhibition",
      date: new Date(2024, 4, 22), // May 22, 2024
      time: "9:00 AM",
      location: "Mumbai, India",
      attendees: "1000+ Industry Leaders",
      type: "Exhibition"
    }
  ];

  const eventDates = events.map(event => event.date);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleRegister = (eventId: number, eventTitle: string) => {
    toast({
      title: "🎉 Registration Successful!",
      description: `You have been registered for "${eventTitle}". Check your email for confirmation.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Events Calendar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              eventDay: eventDates
            }}
            modifiersStyles={{
              eventDay: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? `Events on ${selectedDate.toDateString()}` : 'Select a date to view events'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg">{event.title}</h4>
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => handleRegister(event.id, event.title)}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Register Now
                  </Button>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No events scheduled for this date</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Select a date to view events</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
