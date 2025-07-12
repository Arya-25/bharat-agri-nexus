
import { ArrowRight, Leaf, Globe, Users, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleWatchDemo = () => {
    // Simulate demo action
    alert("Demo video would play here!");
  };

  return (
    <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-30 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 mr-2" />
            Revolutionary AgriBusiness Platform
            <Star className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Transforming Agriculture
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Through Innovation
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Connecting farmers, corporates, FPOs, and global stakeholders through 
            cutting-edge technology, regional language support, and seamless commercial transactions.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600 animate-fade-in">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>10,000+ Farmers</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>500+ Corporates</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>15+ Languages</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>99.9% Uptime</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={handleGetStarted}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-green-300 text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={handleWatchDemo}
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Stakeholder</h3>
              <p className="text-gray-600">Connecting all agriculture ecosystem participants seamlessly</p>
            </div>
            
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">BHASHINI integration for regional languages worldwide</p>
            </div>
            
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge agricultural solutions for modern farming</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
