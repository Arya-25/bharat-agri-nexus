
import { Smartphone, CreditCard, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Regional Language Support",
      description: "BHASHINI and Google APIs integration for Speech-to-Text and Text-to-Speech in local languages",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      description: "Seamless commercial transactions with multiple payment gateways and digital wallet integration",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel Communication",
      description: "WhatsApp Business, LinkedIn, Instagram, Facebook, and YouTube integration for comprehensive reach",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Data-driven insights for better decision making across the agricultural value chain",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Enterprise-grade security for all financial transactions and data protection",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live market prices, weather updates, and instant notifications for all stakeholders",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Agriculture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with agricultural expertise to deliver 
            comprehensive solutions for the entire agribusiness ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
