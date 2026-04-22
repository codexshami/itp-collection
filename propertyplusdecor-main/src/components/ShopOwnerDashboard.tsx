
import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Camera, Upload, Eye, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount?: number;
  description: string;
  images: string[];
  category: string;
}

interface ShopProfile {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  coverPhoto: string;
  priceListImages: string[];
  introVideo?: string;
  products: Product[];
}

const ShopOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'analytics'>('profile');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [shopProfile, setShopProfile] = useState<ShopProfile | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    price: 0,
    description: '',
    category: '',
    images: []
  });

  const categories = [
    'Ceramic Tiles', 'Vitrified Tiles', 'Marble', 'Granite', 'Mosaic',
    'Mattresses', 'Sofas', 'Curtains', 'Bed Sheets', 'Pillows',
    'Wall Hangings', 'Clocks', 'Vases', 'Lamps', 'Decorative Items'
  ];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.brand && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name!,
        brand: newProduct.brand!,
        price: newProduct.price!,
        discount: newProduct.discount,
        description: newProduct.description || '',
        images: newProduct.images || [],
        category: newProduct.category || ''
      };
      
      console.log('Adding product:', product);
      setNewProduct({ name: '', brand: '', price: 0, description: '', category: '', images: [] });
      setShowAddProduct(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewProduct(prev => ({ ...prev, images: [...(prev.images || []), ...imageUrls] }));
    }
  };

  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log('Cover photo uploaded:', imageUrl);
    }
  };

  const handlePriceListUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      console.log('Price list images uploaded:', imageUrls);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      console.log('Intro video uploaded:', videoUrl);
    }
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location updated:', { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Owner Dashboard</h1>
          <p className="text-gray-600">Manage your shop profile, cover photos, and price lists</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'profile', label: 'Shop Profile' },
            { id: 'products', label: 'Products' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-6"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Shop Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Shop Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name *</label>
                  <Input placeholder="Enter your shop name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <Input placeholder="9819912166" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shop Description</label>
                <Textarea placeholder="Tell customers about your shop, experience, and specialties..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shop Location</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter shop address" className="flex-1" />
                  <Button onClick={handleLocationUpdate} variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Location
                  </Button>
                </div>
              </div>

              {/* Cover Photo Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Upload Cover Photo</p>
                  <p className="text-sm text-gray-600 mb-4">This will be the main image visitors see first</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverPhotoUpload}
                    className="hidden" 
                    id="coverPhoto"
                  />
                  <label htmlFor="coverPhoto" className="cursor-pointer">
                    <Button type="button" className="bg-brand-orange hover:bg-brand-orange/90">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Cover Photo
                    </Button>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price List Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price List Images *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload up to 2 price list images</p>
                    <p className="text-xs text-gray-500 mb-3">Make it easy for customers to see your pricing</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handlePriceListUpload}
                      className="hidden" 
                      id="priceListImages"
                    />
                    <label htmlFor="priceListImages" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Choose Images
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Intro Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intro Video (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload intro video (1 min max)</p>
                    <p className="text-xs text-gray-500 mb-3">Show customers your shop and products</p>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload}
                      className="hidden" 
                      id="introVideo"
                    />
                    <label htmlFor="introVideo" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Choose Video
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
                Save Shop Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Products</h2>
              <Button onClick={() => setShowAddProduct(true)} className="bg-brand-orange hover:bg-brand-orange/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {showAddProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                      <Input
                        placeholder="e.g., Kajaria Vitrified Tiles"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                      <Input
                        placeholder="e.g., Kajaria"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                      <Input
                        type="number"
                        placeholder="65"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={newProduct.discount || ''}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, discount: Number(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      placeholder="Describe your product features, quality, and specifications..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload product images (max 3)</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    {newProduct.images && newProduct.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {newProduct.images.map((image, index) => (
                          <img key={index} src={image} alt={`Product ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} className="bg-brand-orange hover:bg-brand-orange/90">
                      Add Product
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center py-12">
              <div className="mb-4">
                <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No products added yet</h3>
                <p className="text-gray-600 mb-4">
                  Focus on uploading your cover photo and price list images first. 
                  This makes it easier for customers to see your offerings!
                </p>
              </div>
              <Button onClick={() => setShowAddProduct(true)} className="bg-brand-orange hover:bg-brand-orange/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle>Shop Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-orange">0</div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-blue">0</div>
                  <div className="text-sm text-gray-600">Cover Photo Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Price List Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">WhatsApp Clicks</div>
                </div>
              </div>
              <p className="text-center text-gray-600">Analytics will be available once you start getting visitors!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
