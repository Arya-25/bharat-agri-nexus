
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Events = () => {
  const upcomingEvents = [
    {
      title: "AgriBusiness Innovation Summit 2024",
      date: "March 15-17, 2024",
      location: "New Delhi, India",
      attendees: "500+ Participants",
      description: "Leading agricultural innovation conference bringing together farmers, technology providers, and policymakers.",
      type: "Conference"
    },
    {
      title: "FPO Digital Transformation Workshop",
      date: "April 8-9, 2024",
      location: "Pune, Maharashtra",
      attendees: "200+ FPO Representatives",
      description: "Hands-on workshop for Farmer Producer Organizations on digital platform adoption and e-commerce.",
      type: "Workshop"
    },
    {
      title: "International Agri-Trade Exhibition",
      date: "May 22-25, 2024",
      location: "Mumbai, India",
      attendees: "1000+ Industry Leaders",
      description: "Premier exhibition showcasing latest agricultural technologies and facilitating global trade partnerships.",
      type: "Exhibition"
    }
  ];

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events & Exhibitions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at industry-leading events that bring together the entire 
            agricultural ecosystem for networking, learning, and collaboration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{event.type}</span>
                <h3 className="text-xl font-semibold text-white mt-2">{event.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">{event.attendees}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-green-300 text-green-700 hover:bg-green-50">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};
