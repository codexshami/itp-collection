
import { Search, MapPin, MessageCircle, Star, ArrowRight, Store, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const businessLogicSteps = [
    {
      step: "1",
      title: "Search & Discover",
      description: "Find tiles, furniture, and decor shops near you",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: <Search className="h-8 w-8 text-brand-orange" />
    },
    {
      step: "2", 
      title: "Browse & Compare",
      description: "View cover photos, price lists, and shop details",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: <Star className="h-8 w-8 text-brand-orange" />
    },
    {
      step: "3",
      title: "Connect Directly",
      description: "Contact shops via WhatsApp for instant communication",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: <MessageCircle className="h-8 w-8 text-brand-orange" />
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center">
      {/* Background Pattern with Hero Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Modern tiles and interior"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Home with
              <span className="text-brand-orange block">PropertyPlusDecor</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Discover the best tiles, furniture, and decor from verified local shops. 
              Browse price lists, watch videos, and connect directly with shop owners.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for tiles, furniture, decor..."
                  className="pl-10 h-12 border-2 focus:border-brand-orange"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter your location..."
                  className="pl-10 h-12 border-2 focus:border-brand-orange"
                />
              </div>
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 h-12"
                onClick={() => scrollToSection('tiles')}
              >
                Search
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                onClick={() => scrollToSection('tiles')}
              >
                Browse Shops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                onClick={() => scrollToSection('join-platform')}
              >
                <Store className="mr-2 h-5 w-5" />
                List Your Business
              </Button>
            </div>

            {/* Business Registration CTA */}
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Own a Business?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Register your shop or interior design company with us
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => scrollToSection('join-platform')}
                  >
                    <Store className="h-4 w-4 mr-1" />
                    Tiles Shop
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => scrollToSection('join-platform')}
                  >
                    <Building className="h-4 w-4 mr-1" />
                    Interior Design
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-orange">500+</div>
                <div className="text-sm text-gray-600">Verified Shops</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-blue">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* Right Content - Business Logic Steps */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-left mb-8">
                How PropertyPlusDecor Works
              </h2>
              
              {businessLogicSteps.map((step, index) => (
                <Card key={index} className="hover-lift border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-brand-orange/20 rounded-full animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-brand-blue/20 rounded-full animate-pulse hidden lg:block"></div>
      </div>
    </section>
  );
};

export default HeroSection;
