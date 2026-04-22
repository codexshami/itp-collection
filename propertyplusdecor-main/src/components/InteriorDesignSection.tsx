import { useState } from 'react';
import { Star, MapPin, Phone, MessageCircle, Filter, Building, Play, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LocationSearch from './LocationSearch';
import GoogleMapsIntegration from './GoogleMapsIntegration';

interface InteriorDesignSectionProps {
  onRegisterInterior?: () => void;
}

const InteriorDesignSection = ({ onRegisterInterior }: InteriorDesignSectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filters = [
    { id: 'all', name: 'All Types', count: 85 },
    { id: 'residential', name: 'Residential', count: 45 },
    { id: 'commercial', name: 'Commercial', count: 25 },
    { id: 'luxury', name: 'Luxury', count: 15 }
  ];

  const companies = [
    {
      id: 1,
      name: "Dream Interiors",
      location: "Bandra West, Mumbai",
      coordinates: { lat: 19.0544, lng: 72.8356 },
      rating: 4.9,
      reviews: 124,
      coverPhoto: "/api/placeholder/600/300",
      projectImages: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      credentialsVideo: "/api/placeholder/400/300",
      speciality: "Luxury Home Interiors",
      priceRange: "₹1,200-₹2,500 per sq ft",
      phone: "9819912166",
      description: "Award-winning interior design company with 15 years of experience",
      address: "Office No. 301, Bandra West Complex, Mumbai - 400050",
      teamSize: 25,
      projectsCompleted: 180,
      companyRegistration: "MH-2008-123456"
    },
    {
      id: 2,
      name: "Elite Spaces",
      location: "Andheri East, Mumbai",
      coordinates: { lat: 19.1136, lng: 72.8697 },
      rating: 4.7,
      reviews: 89,
      coverPhoto: "/api/placeholder/600/300",
      projectImages: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      credentialsVideo: "/api/placeholder/400/300",
      speciality: "Modern Contemporary Design",
      priceRange: "₹800-₹1,800 per sq ft",
      phone: "9819912166",
      description: "Contemporary interior solutions for modern homes",
      address: "Suite 205, Andheri East Hub, Mumbai - 400069",
      teamSize: 18,
      projectsCompleted: 145,
      companyRegistration: "MH-2010-789012"
    },
    {
      id: 3,
      name: "Artisan Interiors",
      location: "Powai, Mumbai",
      coordinates: { lat: 19.1199, lng: 72.9084 },
      rating: 4.8,
      reviews: 156,
      coverPhoto: "/api/placeholder/600/300",
      projectImages: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      credentialsVideo: "/api/placeholder/400/300",
      speciality: "Traditional & Heritage Design",
      priceRange: "₹900-₹2,000 per sq ft",
      phone: "9819912166",
      description: "Specialists in traditional and heritage interior design",
      address: "Office 102, Hiranandani Gardens, Powai, Mumbai - 400076",
      teamSize: 22,
      projectsCompleted: 210,
      companyRegistration: "MH-2007-345678"
    }
  ];

  const handleSearchChange = (query: string, location: string, area: string, radius: number) => {
    setSearchQuery(query);
    setSearchLocation(location);
    console.log('Search:', { query, location, area, radius });
  };

  const handleLocationDetect = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    console.log('User location:', { lat, lng });
  };

  const handleWhatsAppClick = (company: any) => {
    const message = `Hi! I'm interested in interior design services from ${company.name}. Please share more details about your services and pricing.`;
    window.open(`https://wa.me/91${company.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContactForm = (company: any) => {
    console.log('Contact form submitted for:', company.name);
    // This would typically open a modal or redirect to a contact form
  };

  const handleRegisterInterior = () => {
    if (onRegisterInterior) {
      onRegisterInterior();
    } else {
      // Fallback: scroll to registration section
      const element = document.getElementById('join-platform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="interior-design" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Interior Design Companies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified interior design professionals. View their portfolios, credentials, and get quotes for your project.
          </p>
        </div>

        {/* Location Search */}
        <LocationSearch 
          onSearchChange={handleSearchChange}
          onLocationDetect={handleLocationDetect}
        />

        {/* Register Business Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg p-8 mb-8 mx-auto max-w-4xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Are you an Interior Design Company?
            </h3>
            <p className="text-gray-600">
              Join our platform and showcase your portfolio to potential clients
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleRegisterInterior}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              Register Your Company - FREE
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex gap-2 flex-wrap justify-center">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-1" />
              {filter.name} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Card key={company.id} className="overflow-hidden hover-lift border-0 shadow-lg">
              <div className="relative">
                <img
                  src={company.coverPhoto}
                  alt={company.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{company.rating}</span>
                  </div>
                </div>
                {company.credentialsVideo && (
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                      <Play className="h-4 w-4 mr-1" />
                      Watch Video
                    </Button>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{company.name}</CardTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{company.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{company.reviews} reviews</span>
                  <span>•</span>
                  <span className="text-brand-blue font-medium">{company.speciality}</span>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-3">{company.description}</p>
                <p className="text-lg font-semibold text-brand-blue mb-4">{company.priceRange}</p>

                {/* Company Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{company.teamSize} Team Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{company.projectsCompleted} Projects</span>
                  </div>
                </div>

                {/* Project Images */}
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {company.projectImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">Portfolio Projects</p>
                </div>

                {/* Google Maps Integration */}
                <div className="mb-4">
                  <GoogleMapsIntegration
                    location={{
                      lat: company.coordinates.lat,
                      lng: company.coordinates.lng,
                      name: company.name,
                      address: company.address,
                      phone: company.phone
                    }}
                    showDirections={true}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 btn-whatsapp text-white"
                    onClick={() => handleWhatsAppClick(company)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    onClick={() => handleContactForm(company)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8">
            View All Interior Companies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignSection;
