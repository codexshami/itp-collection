
import { useState } from 'react';
import { Heart, Star, ShoppingCart, MessageCircle, Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DecorSection = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', count: 1000 },
    { id: 'wall-art', name: 'Wall Art', count: 250 },
    { id: 'lamps', name: 'Lamps & Lighting', count: 180 },
    { id: 'vases', name: 'Vases & Planters', count: 150 },
    { id: 'clocks', name: 'Wall Clocks', count: 120 },
    { id: 'idols', name: 'Religious Items', count: 100 },
    { id: 'mirrors', name: 'Decorative Mirrors', count: 90 },
    { id: 'candles', name: 'Candles & Holders', count: 80 },
    { id: 'festive', name: 'Festive Decor', count: 30 }
  ];

  const products = [
    {
      id: 1,
      name: "Elegant Buddha Wall Art",
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      rating: 4.7,
      reviews: 156,
      image: "/api/placeholder/300/300",
      category: "wall-art",
      shopName: "Artisan Crafts",
      location: "Bandra West",
      inStock: true,
      trending: true
    },
    {
      id: 2,
      name: "Modern Table Lamp",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.5,
      reviews: 89,
      image: "/api/placeholder/300/300",
      category: "lamps",
      shopName: "Light House",
      location: "Andheri East",
      inStock: true,
      trending: false
    },
    {
      id: 3,
      name: "Ceramic Flower Vase",
      price: 649,
      originalPrice: 999,
      discount: 35,
      rating: 4.8,
      reviews: 234,
      image: "/api/placeholder/300/300",
      category: "vases",
      shopName: "Pottery World",
      location: "Malad West",
      inStock: true,
      trending: true
    },
    {
      id: 4,
      name: "Vintage Wall Clock",
      price: 1899,
      originalPrice: 2799,
      discount: 32,
      rating: 4.6,
      reviews: 67,
      image: "/api/placeholder/300/300",
      category: "clocks",
      shopName: "Time Pieces",
      location: "Goregaon",
      inStock: false,
      trending: false
    },
    {
      id: 5,
      name: "Ganesh Brass Idol",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      rating: 4.9,
      reviews: 312,
      image: "/api/placeholder/300/300",
      category: "idols",
      shopName: "Divine Crafts",
      location: "Dadar",
      inStock: true,
      trending: true
    },
    {
      id: 6,
      name: "Decorative Mirror Set",
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      rating: 4.4,
      reviews: 45,
      image: "/api/placeholder/300/300",
      category: "mirrors",
      shopName: "Mirror Magic",
      location: "Powai",
      inStock: true,
      trending: false
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleWhatsAppInquiry = (product: any) => {
    const message = `Hi! I'm interested in "${product.name}" from ${product.shopName}. Is it available? Price: ₹${product.price}`;
    window.open(`https://wa.me/919819912166?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="decor" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Decorative & Miscellaneous Items
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add personality to your space with our curated collection of decorative items, from elegant wall art to festive decorations.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Category Filters */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-lift border-0 shadow-lg group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover ${
                    viewMode === 'grid' ? 'h-48' : 'h-32'
                  }`}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.trending && (
                    <Badge className="bg-red-500 text-white text-xs">Trending</Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-green-600 text-white text-xs">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-white">Out of Stock</Badge>
                  </div>
                )}

                {/* Quick Actions (appears on hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="btn-whatsapp text-white"
                      onClick={() => handleWhatsAppInquiry(product)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Inquire
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{product.shopName}</span>
                    <span className="mx-1">•</span>
                    <span>{product.location}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 btn-whatsapp text-white"
                      onClick={() => handleWhatsAppInquiry(product)}
                      disabled={!product.inStock}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Inquiry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8">
            Load More Items
          </Button>
        </div>

        {/* Festive Collection Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-gold to-brand-orange rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">🎊 Festive Collection Now Available! 🎊</h3>
          <p className="text-lg mb-6">
            Celebrate every occasion with our special festive decorations and seasonal items
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-orange hover:bg-gray-100 font-semibold"
            onClick={() => setSelectedCategory('festive')}
          >
            Explore Festive Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DecorSection;
