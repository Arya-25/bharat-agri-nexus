
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UpcomingEvents = () => {
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "Agricultural Trade Fair",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Mumbai Exhibition Center",
      type: "trade-fair",
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      date: "2024-01-25",
      time: "2:00 PM",
      location: "Online Webinar",
      type: "workshop",
    },
    {
      id: 3,
      title: "Crop Insurance Seminar",
      date: "2024-02-01",
      time: "11:00 AM",
      location: "Delhi Convention Center",
      type: "seminar",
    },
  ];

  const handleJoinEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Registration",
      description: `Registered for "${eventTitle}" successfully!`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Events</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                <Button
                  size="sm"
                  onClick={() => handleJoinEvent(event.id, event.title)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Register
                </Button>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => toast({
            title: "All Events",
            description: "Loading complete events calendar...",
          })}
        >
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
};
