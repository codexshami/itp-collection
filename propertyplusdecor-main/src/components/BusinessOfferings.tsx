
import { Hammer, Users, Phone, Store, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BusinessOfferings = () => {
  const offerings = [
    {
      icon: <Hammer className="h-12 w-12" />,
      title: "Tiles & Ceramics",
      description: "Premium quality tiles, ceramics, and flooring solutions from verified local dealers",
      features: ["Ceramic Tiles", "Vitrified Tiles", "Marble & Granite", "Mosaic Tiles"],
      color: "from-blue-500 to-blue-600",
      sectionId: "tiles"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Interior Design Companies",
      description: "Professional interior design services from verified companies and agencies",
      features: ["Complete Home Design", "Office Interiors", "3D Visualization", "Turnkey Projects"],
      color: "from-green-500 to-green-600",
      sectionId: "join-platform"
    },
    {
      icon: <Phone className="h-12 w-12" />,
      title: "Contact Our Experts",
      description: "Connect with skilled professionals for all your home improvement needs",
      features: ["Individual Experts", "Verified Professionals", "Quality Guarantee", "Direct Contact"],
      color: "from-orange-500 to-orange-600",
      sectionId: "experts"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to transform your flat into a dream home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover-lift border-0 shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${offering.color} p-6 text-white`}>
                <div className="flex justify-center mb-4">
                  {offering.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {offering.title}
                </h3>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  {offering.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {offering.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
                    onClick={() => scrollToSection(offering.sectionId)}
                  >
                    Explore {offering.title}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    onClick={() => scrollToSection('join-platform')}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Register Your Business
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Business Registration CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Grow Your Business?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of verified businesses on PropertyPlusDecor. List your shop or interior design company and reach more customers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              onClick={() => scrollToSection('join-platform')}
            >
              <Store className="h-5 w-5 mr-2" />
              List Your Tiles Shop
            </Button>
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={() => scrollToSection('join-platform')}
            >
              <Building className="h-5 w-5 mr-2" />
              Register Interior Company
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessOfferings;
