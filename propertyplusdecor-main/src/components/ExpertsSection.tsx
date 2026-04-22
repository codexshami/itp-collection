
import { useState } from 'react';
import { Star, MapPin, MessageCircle, Phone, Award, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ExpertsSection = () => {
  const [activeTab, setActiveTab] = useState('individual');

  const serviceCategories = [
    { id: 'painters', name: 'Painters', icon: '🎨', count: 45 },
    { id: 'carpenters', name: 'Carpenters', icon: '🔨', count: 38 },
    { id: 'electricians', name: 'Electricians', icon: '⚡', count: 32 },
    { id: 'plumbers', name: 'Plumbers', icon: '🔧', count: 28 },
    { id: 'pop-ceiling', name: 'POP/False Ceiling', icon: '🏠', count: 22 },
    { id: 'interior', name: 'Interior Designers', icon: '🎨', count: 15 }
  ];

  const individualExperts = [
    {
      id: 1,
      name: "Rajesh Kumar",
      profession: "Professional Painter",
      rating: 4.9,
      reviews: 127,
      experience: "8+ years",
      location: "Andheri West, Mumbai",
      phone: "9819912166",
      verified: true,
      image: "/api/placeholder/300/300",
      specialties: ["Interior Painting", "Exterior Painting", "Texture Work"],
      priceRange: "₹12-18 per sq ft",
      availability: "Available",
      workSamples: [
        "/api/placeholder/200/200",
        "/api/placeholder/200/200",
        "/api/placeholder/200/200"
      ],
      services: ["Free Estimate", "Material Procurement", "Quality Guarantee"]
    },
    {
      id: 2,
      name: "Suresh Sharma",
      profession: "Master Carpenter",
      rating: 4.8,
      reviews: 89,
      experience: "12+ years",
      location: "Bandra East, Mumbai",
      phone: "9819912166",
      verified: true,
      image: "/api/placeholder/300/300",
      specialties: ["Custom Furniture", "Kitchen Cabinets", "Wardrobes"],
      priceRange: "₹250-400 per sq ft",
      availability: "Busy (Next available: 5 days)",
      workSamples: [
        "/api/placeholder/200/200",
        "/api/placeholder/200/200",
        "/api/placeholder/200/200"
      ],
      services: ["Design Consultation", "Installation", "1 Year Warranty"]
    },
    {
      id: 3,
      name: "Amit Electricals",
      profession: "Licensed Electrician",
      rating: 4.7,
      reviews: 156,
      experience: "10+ years",
      location: "Malad West, Mumbai",
      phone: "9819912166",
      verified: true,
      image: "/api/placeholder/300/300",
      specialties: ["Home Wiring", "LED Installation", "Electrical Repairs"],
      priceRange: "₹300-500 per point",
      availability: "Available",
      workSamples: [
        "/api/placeholder/200/200",
        "/api/placeholder/200/200",
        "/api/placeholder/200/200"
      ],
      services: ["Emergency Service", "Safety Inspection", "Quality Parts"]
    }
  ];

  const interiorAgencies = [
    {
      id: 1,
      name: "Dream Spaces Interior",
      rating: 4.9,
      reviews: 234,
      location: "Powai, Mumbai",
      phone: "9819912166",
      verified: true,
      image: "/api/placeholder/400/300",
      specialties: ["Complete Home Design", "Office Interiors", "Modular Kitchen"],
      priceRange: "₹1,200-2,500 per sq ft",
      experience: "15+ years",
      projectsCompleted: 500,
      services: ["3D Visualization", "Turnkey Projects", "5 Year Warranty"],
      portfolio: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ]
    },
    {
      id: 2,
      name: "Elegant Interiors",
      rating: 4.6,
      reviews: 89,
      location: "Goregaon West, Mumbai",
      phone: "9819912166",
      verified: true,
      image: "/api/placeholder/400/300",
      specialties: ["Luxury Interiors", "Residential Design", "Commercial Spaces"],
      priceRange: "₹2,000-4,000 per sq ft",
      experience: "20+ years",
      projectsCompleted: 300,
      services: ["Premium Materials", "Skilled Craftsmen", "Project Management"],
      portfolio: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ]
    }
  ];

  const handleWhatsAppContact = (expert: any) => {
    const message = `Hi ${expert.name}! I'm interested in your ${expert.profession || 'interior design'} services. Can you share more details about your work and availability?`;
    window.open(`https://wa.me/91${expert.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="experts" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with skilled professionals and interior agencies to bring your dream home to life. All experts are verified and experienced.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="individual">Individual Experts</TabsTrigger>
            <TabsTrigger value="agencies">Interior Agencies</TabsTrigger>
          </TabsList>

          {/* Individual Experts Tab */}
          <TabsContent value="individual" className="space-y-6">
            {/* Service Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gradient-card rounded-lg p-4 text-center hover-lift cursor-pointer border border-gray-100"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h4 className="font-semibold text-sm">{category.name}</h4>
                  <p className="text-xs text-gray-600">{category.count} experts</p>
                </div>
              ))}
            </div>

            {/* Individual Experts List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {individualExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {expert.verified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      <Badge className={`${
                        expert.availability === 'Available' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-yellow-600 text-white'
                      }`}>
                        {expert.availability}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{expert.name}</CardTitle>
                    <p className="text-brand-orange font-medium">{expert.profession}</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{expert.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{expert.experience}</span>
                      </div>
                      <span>•</span>
                      <span>{expert.reviews} reviews</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Specialties */}
                      <div>
                        <h4 className="font-medium mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {expert.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="border-brand-orange text-brand-orange">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Price Range:</span>
                        <span className="font-semibold text-brand-blue">{expert.priceRange}</span>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="font-medium mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {expert.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Work Samples */}
                      <div>
                        <h4 className="font-medium mb-2">Work Samples:</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {expert.workSamples.map((sample, idx) => (
                            <img
                              key={idx}
                              src={sample}
                              alt={`Work sample ${idx + 1}`}
                              className="w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-80"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 btn-whatsapp text-white"
                          onClick={() => handleWhatsAppContact(expert)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interior Agencies Tab */}
          <TabsContent value="agencies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {interiorAgencies.map((agency) => (
                <Card key={agency.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={agency.image}
                      alt={agency.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">Verified Agency</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{agency.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{agency.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{agency.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{agency.experience}</span>
                      </div>
                      <span>•</span>
                      <span>{agency.projectsCompleted}+ projects</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Specialties */}
                      <div>
                        <h4 className="font-medium mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {agency.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="border-brand-orange text-brand-orange">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Price Range:</span>
                        <span className="font-semibold text-brand-blue">{agency.priceRange}</span>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="font-medium mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {agency.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <h4 className="font-medium mb-2">Portfolio:</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {agency.portfolio.map((work, idx) => (
                            <img
                              key={idx}
                              src={work}
                              alt={`Portfolio ${idx + 1}`}
                              className="w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-80"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 btn-whatsapp text-white"
                          onClick={() => handleWhatsAppContact(agency)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* LaborMitra Integration Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-blue to-brand-orange rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">🔧 Need More Expert Options?</h3>
          <p className="text-lg mb-6">
            Explore thousands of verified labor profiles on our partner platform LaborMitra.com
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-orange hover:bg-gray-100 font-semibold"
            onClick={() => window.open('https://www.labormitra.com', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Visit LaborMitra.com
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
