import { useState } from 'react';
import { Star, MapPin, MessageCircle, Phone, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FurnishingsSection = () => {
  const [activeTab, setActiveTab] = useState('mattresses');

  const categories = [
    { id: 'mattresses', name: 'Mattresses', icon: '🛏️' },
    { id: 'curtains', name: 'Curtains & Blinds', icon: '🪟' },
    { id: 'covers', name: 'Sofa Covers', icon: '🛋️' },
    { id: 'cushions', name: 'Cushions & Pillows', icon: '🪑' }
  ];

  const mattressShops = [
    {
      id: 1,
      name: "Sleep Well Mattress Store",
      location: "Malad West, Mumbai",
      rating: 4.7,
      reviews: 189,
      verified: true,
      featured: true,
      image: "/api/placeholder/400/300",
      speciality: "Memory Foam & Orthopedic",
      priceRange: "₹8,000-₹45,000",
      phone: "9819912166",
      description: "Premium mattresses with 10-year warranty",
      products: [
        { name: "Memory Foam Queen", price: "₹25,000", size: "Queen Size", image: "/api/placeholder/200/200" },
        { name: "Orthopedic King", price: "₹35,000", size: "King Size", image: "/api/placeholder/200/200" },
        { name: "Spring Comfort", price: "₹18,000", size: "Double", image: "/api/placeholder/200/200" }
      ],
      services: ["Free Home Delivery", "10 Year Warranty", "Easy EMI"]
    },
    {
      id: 2,
      name: "Comfort Zone Furnishings",
      location: "Goregaon East, Mumbai",
      rating: 4.5,
      reviews: 95,
      verified: true,
      featured: false,
      image: "/api/placeholder/400/300",
      speciality: "Budget-Friendly Options",
      priceRange: "₹3,500-₹20,000",
      phone: "9819912166",
      description: "Quality mattresses at affordable prices",
      products: [
        { name: "Foam Mattress", price: "₹8,500", size: "Single", image: "/api/placeholder/200/200" },
        { name: "Coir Mattress", price: "₹6,200", size: "Double", image: "/api/placeholder/200/200" }
      ],
      services: ["Free Delivery", "1 Year Warranty", "Exchange Offer"]
    }
  ];

  const curtainShops = [
    {
      id: 1,
      name: "Elegant Curtains & Blinds",
      location: "Bandra West, Mumbai",
      rating: 4.8,
      reviews: 156,
      verified: true,
      featured: true,
      image: "/api/placeholder/400/300",
      speciality: "Custom Curtains & Blinds",
      priceRange: "₹150-₹800 per sq ft",
      phone: "9819912166",
      description: "Handcrafted curtains and modern blinds",
      products: [
        { name: "Silk Curtains", price: "₹450/sq ft", material: "Pure Silk", image: "/api/placeholder/200/200" },
        { name: "Wooden Blinds", price: "₹280/sq ft", material: "Teak Wood", image: "/api/placeholder/200/200" },
        { name: "Sheer Curtains", price: "₹180/sq ft", material: "Voile", image: "/api/placeholder/200/200" }
      ],
      services: ["Free Measurement", "Custom Design", "Installation"]
    }
  ];

  const handleWhatsAppClick = (shop: any) => {
    const message = `Hi! I'm interested in ${activeTab} from ${shop.name}. Please share more details about your products and pricing.`;
    window.open(`https://wa.me/91${shop.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="furnishings" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mattress & Furnishings
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your living space with premium mattresses, elegant curtains, and comfortable furnishings from trusted local dealers.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mattresses Tab */}
          <TabsContent value="mattresses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mattressShops.map((shop) => (
                <Card key={shop.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {shop.verified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      {shop.featured && (
                        <Badge className="bg-brand-orange text-white">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                      </div>
                    </div>
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

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="border-brand-orange text-brand-orange">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sample Products */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Popular Products:</h4>
                      <div className="space-y-2">
                        {shop.products.map((product, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-gray-600">{product.size}</p>
                            </div>
                            <p className="text-brand-orange font-medium">{product.price}</p>
                          </div>
                        ))}
                      </div>
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
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Curtains Tab */}
          <TabsContent value="curtains" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {curtainShops.map((shop) => (
                <Card key={shop.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {shop.verified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      {shop.featured && (
                        <Badge className="bg-brand-orange text-white">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{shop.location}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{shop.description}</p>
                    <p className="text-lg font-semibold text-brand-blue mb-4">{shop.priceRange}</p>

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="border-brand-orange text-brand-orange">
                            {service}
                          </Badge>
                        ))}
                      </div>
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
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would have similar structure */}
          <TabsContent value="covers" className="space-y-6">
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-brand-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sofa Covers Coming Soon</h3>
              <p className="text-gray-600 mb-6">We're curating the best sofa cover dealers for you</p>
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                Get Notified
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="cushions" className="space-y-6">
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-brand-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cushions & Pillows Coming Soon</h3>
              <p className="text-gray-600 mb-6">We're adding more cushion and pillow dealers</p>
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                Get Notified
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FurnishingsSection;
