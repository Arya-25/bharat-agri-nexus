
import { Building2, Users, Wheat, Globe, Briefcase, GraduationCap } from "lucide-react";

export const Stakeholders = () => {
  const stakeholders = [
    {
      icon: Wheat,
      title: "Farmers",
      description: "Direct market access, fair pricing, and modern farming techniques",
      valueProps: ["Market linkage", "Technology access", "Financial inclusion", "Training programs"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Farmer Producer Organizations (FPOs)",
      description: "Collective bargaining power and organized market participation",
      valueProps: ["Bulk procurement", "Quality certification", "Export opportunities", "Capacity building"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Building2,
      title: "Corporates",
      description: "Reliable supply chain and sustainable sourcing solutions",
      valueProps: ["Supply chain transparency", "Quality assurance", "Bulk sourcing", "CSR opportunities"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Globe,
      title: "Foreign Governments",
      description: "International trade facilitation and policy implementation",
      valueProps: ["Trade agreements", "Policy insights", "Market intelligence", "Bilateral cooperation"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Briefcase,
      title: "Trade Organizations",
      description: "Market regulation and industry standardization",
      valueProps: ["Standards compliance", "Market regulation", "Trade facilitation", "Industry insights"],
      color: "from-teal-500 to-green-500"
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Research collaboration and knowledge dissemination",
      valueProps: ["Research partnerships", "Student programs", "Technology transfer", "Innovation hubs"],
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="stakeholders" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Value for Every Stakeholder
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform delivers tailored solutions and clear value propositions for 
            each participant in the agricultural ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stakeholders.map((stakeholder, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-2 bg-gradient-to-r ${stakeholder.color}`}></div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stakeholder.color} flex items-center justify-center mb-4`}>
                  <stakeholder.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stakeholder.title}</h3>
                <p className="text-gray-600 mb-4">{stakeholder.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {stakeholder.valueProps.map((prop, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {prop}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
