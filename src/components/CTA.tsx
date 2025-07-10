
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your AgriBusiness?
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of farmers, corporates, and organizations already benefiting 
          from our innovative agricultural platform. Start your digital transformation today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
            Schedule Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-green-100">
            <Phone className="h-5 w-5" />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-100">
            <Mail className="h-5 w-5" />
            <span>info@agribusinesspro.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};
