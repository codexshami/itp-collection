
import { useState } from 'react';
import { Star, MapPin, Phone, MessageCircle, Filter, Store, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LocationSearch from './LocationSearch';
import GoogleMapsIntegration from './GoogleMapsIntegration';

interface TilesSectionProps {
  onRegisterShop?: () => void;
}

const TilesSection = ({ onRegisterShop }: TilesSectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filters = [
    { id: 'all', name: 'All Types', count: 120 },
    { id: 'ceramic', name: 'Ceramic', count: 45 },
    { id: 'vitrified', name: 'Vitrified', count: 38 },
    { id: 'marble', name: 'Marble', count: 25 },
    { id: 'mosaic', name: 'Mosaic', count: 12 }
  ];

  const shops = [
    {
      id: 1,
      name: "Royal Tiles & Ceramics",
      location: "Andheri West, Mumbai",
      coordinates: { lat: 19.1334, lng: 72.8267 },
      rating: 4.8,
      reviews: 156,
      coverPhoto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=300&fit=crop",
      priceListImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      introVideo: "/api/placeholder/400/300",
      speciality: "Premium Vitrified Tiles",
      priceRange: "₹45-₹150 per sq ft",
      phone: "9819912166",
      description: "25 years of experience in premium tiles and ceramics",
      address: "Shop No. 15, Andheri West Market, Mumbai - 400053"
    },
    {
      id: 2,
      name: "Sai Tiles Emporium",
      location: "Bandra East, Mumbai",
      coordinates: { lat: 19.0676, lng: 72.8663 },
      rating: 4.6,
      reviews: 89,
      coverPhoto: "https://images.unsplash.com/photo-1574687408399-5c7e123ad5d8?w=600&h=300&fit=crop",
      priceListImage: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop",
      introVideo: "/api/placeholder/400/300",
      speciality: "Affordable Ceramic Collection",
      priceRange: "₹25-₹85 per sq ft",
      phone: "9819912166",
      description: "Your one-stop shop for budget-friendly tiles",
      address: "Shop No. 22, Bandra East Station, Mumbai - 400051"
    },
    {
      id: 3,
      name: "Marble Palace",
      location: "Powai, Mumbai",
      coordinates: { lat: 19.1199, lng: 72.9084 },
      rating: 4.9,
      reviews: 234,
      coverPhoto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=300&fit=crop",
      priceListImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop",
      introVideo: "/api/placeholder/400/300",
      speciality: "Natural Marble & Granite",
      priceRange: "₹180-₹350 per sq ft",
      phone: "9819912166",
      description: "Premium natural stones and imported marbles",
      address: "Shop No. 5, Hiranandani Market, Powai, Mumbai - 400076"
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

  const handleWhatsAppClick = (shop: any) => {
    const message = `Hi! I'm interested in tiles from ${shop.name}. Please share more details about your products and pricing.`;
    window.open(`https://wa.me/91${shop.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContactForm = (shop: any) => {
    console.log('Contact form submitted for:', shop.name);
    // This would typically open a modal or redirect to a contact form
  };

  const handleRegisterShop = () => {
    if (onRegisterShop) {
      onRegisterShop();
    } else {
      // Fallback: scroll to registration section
      const element = document.getElementById('join-platform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="tiles" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tiles & Ceramics Shops
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find quality tiles and ceramics from verified shops. Compare prices, view catalogs, and connect directly with shop owners.
          </p>
          
          {/* Tile showcase images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop" 
                alt="Ceramic Tiles" 
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                <p className="text-sm font-medium">Ceramic Tiles</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop" 
                alt="Marble Tiles" 
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                <p className="text-sm font-medium">Marble Tiles</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1574687408399-5c7e123ad5d8?w=200&h=150&fit=crop" 
                alt="Vitrified Tiles" 
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                <p className="text-sm font-medium">Vitrified Tiles</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=200&h=150&fit=crop" 
                alt="Mosaic Tiles" 
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                <p className="text-sm font-medium">Mosaic Tiles</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8"
            >
              Explore Tiles and Ceramics
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleRegisterShop}
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8"
            >
              <Store className="h-5 w-5 mr-2" />
              Register Your Business
            </Button>
          </div>
        </div>

        {/* Location Search */}
        <LocationSearch 
          onSearchChange={handleSearchChange}
          onLocationDetect={handleLocationDetect}
        />

        {/* Register Business Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg p-8 mb-8 mx-auto max-w-4xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Own a Tiles & Ceramics Shop?
            </h3>
            <p className="text-gray-600">
              Register your shop on our platform and reach thousands of potential customers
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleRegisterShop}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              Register Your Shop - FREE
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

        {/* Shops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden hover-lift border-0 shadow-lg">
              <div className="relative">
                <img
                  src={shop.coverPhoto}
                  alt={shop.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                  </div>
                </div>
                {shop.introVideo && (
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                      <Play className="h-4 w-4 mr-1" />
                      Watch Video
                    </Button>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{shop.name}</CardTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{shop.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{shop.reviews} reviews</span>
                  <span>•</span>
                  <span className="text-brand-orange font-medium">{shop.speciality}</span>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-3">{shop.description}</p>
                <p className="text-lg font-semibold text-brand-blue mb-4">{shop.priceRange}</p>

                {/* Price List Image */}
                <div className="mb-4">
                  <img
                    src={shop.priceListImage}
                    alt="Price List"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">Price List - Click to view details</p>
                </div>

                {/* Google Maps Integration */}
                <div className="mb-4">
                  <GoogleMapsIntegration
                    location={{
                      lat: shop.coordinates.lat,
                      lng: shop.coordinates.lng,
                      name: shop.name,
                      address: shop.address,
                      phone: shop.phone
                    }}
                    showDirections={true}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 btn-whatsapp text-white"
                    onClick={() => handleWhatsAppClick(shop)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                    onClick={() => handleContactForm(shop)}
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
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8">
            View All Tile Shops
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TilesSection;
