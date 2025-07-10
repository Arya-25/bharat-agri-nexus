
import { Megaphone, Calendar, Video, FileText, Camera, Podcast } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Comprehensive social media management across LinkedIn, Instagram, Facebook, and WhatsApp Business",
      features: ["Content creation", "Campaign management", "Audience targeting", "Performance analytics"]
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Professional organization of demos, conclaves, and exhibitions for all stakeholders",
      features: ["Event planning", "Venue coordination", "Registration management", "Live streaming"]
    },
    {
      icon: Video,
      title: "Video Production",
      description: "High-quality video content for YouTube channels, product demos, and training materials",
      features: ["Corporate videos", "Training content", "Product demos", "Live streaming"]
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "Professional brochures, whitepapers, and marketing materials in multiple languages",
      features: ["Print materials", "Digital content", "Technical documentation", "Marketing collateral"]
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photography services for products, events, and corporate communications",
      features: ["Product photography", "Event coverage", "Corporate portraits", "Agricultural documentation"]
    },
    {
      icon: Podcast,
      title: "Audio Content",
      description: "Podcast production and audio content creation for agricultural education and awareness",
      features: ["Podcast series", "Audio training", "Voice-over services", "Multi-language content"]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Communication Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From digital marketing to event management, we provide comprehensive 
            communication services across all channels and platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
