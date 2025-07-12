
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RegistrationSuccessModal } from "@/components/modals/RegistrationSuccessModal";

export const Events = () => {
  const { toast } = useToast();
  const [registering, setRegistering] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const upcomingEvents = [
    {
      id: 1,
      title: "AgriBusiness Innovation Summit 2024",
      date: "March 15-17, 2024",
      location: "New Delhi, India",
      attendees: "500+ Participants",
      description: "Leading agricultural innovation conference bringing together farmers, technology providers, and policymakers.",
      type: "Conference"
    },
    {
      id: 2,
      title: "FPO Digital Transformation Workshop",
      date: "April 8-9, 2024",
      location: "Pune, Maharashtra",
      attendees: "200+ FPO Representatives",
      description: "Hands-on workshop for Farmer Producer Organizations on digital platform adoption and e-commerce.",
      type: "Workshop"
    },
    {
      id: 3,
      title: "International Agri-Trade Exhibition",
      date: "May 22-25, 2024",
      location: "Mumbai, India",
      attendees: "1000+ Industry Leaders",
      description: "Premier exhibition showcasing latest agricultural technologies and facilitating global trade partnerships.",
      type: "Exhibition"
    }
  ];

  const handleRegister = async (eventId: number, event: any) => {
    setRegistering(eventId);
    
    // Simulate API call delay with loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save registration to localStorage
    const registrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
    const newRegistration = {
      id: Date.now(),
      eventId,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      registeredAt: new Date().toISOString(),
      status: "confirmed",
      ticketNumber: `TKT${Date.now().toString().slice(-6)}`
    };
    registrations.push(newRegistration);
    localStorage.setItem("eventRegistrations", JSON.stringify(registrations));
    
    setRegistering(null);
    setSelectedEvent(event);
    setShowSuccessModal(true);
    
    // Also show toast for immediate feedback
    toast({
      title: "🎉 Registration Successful!",
      description: `You have been registered for "${event.title}". Check your email for confirmation.`,
    });
  };

  const handleViewAllEvents = () => {
    toast({
      title: "Loading All Events",
      description: "Fetching complete events calendar with advanced filters...",
    });
    
    setTimeout(() => {
      toast({
        title: "Events Calendar Loaded",
        description: "Browse through 50+ upcoming agricultural events and workshops.",
      });
    }, 1500);
  };

  return (
    <>
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Upcoming Events & Exhibitions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              Join us at industry-leading events that bring together the entire 
              agricultural ecosystem for networking, learning, and collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                style={{animationDelay: `${0.4 + index * 0.2}s`}}
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 relative">
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{event.type}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 leading-tight">{event.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">{event.attendees}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                    onClick={() => handleRegister(event.id, event)}
                    disabled={registering === event.id}
                  >
                    {registering === event.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Registering...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Register Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
              onClick={handleViewAllEvents}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View All Events
            </Button>
          </div>
        </div>
      </section>

      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        eventTitle={selectedEvent?.title || ""}
        eventDate={selectedEvent?.date || ""}
        eventLocation={selectedEvent?.location || ""}
      />
    </>
  );
};
