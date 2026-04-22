
import { useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'home-decor', name: 'Home Decor', count: 4 },
    { id: 'interior-design', name: 'Interior Design', count: 3 },
    { id: 'tiles-guide', name: 'Tiles Guide', count: 2 },
    { id: 'furnishing-tips', name: 'Furnishing Tips', count: 3 }
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'Transform Your 2BHK Flat into a Dream Home: Complete Guide',
      excerpt: 'Discover expert tips and tricks to maximize space and create a beautiful home in your 2BHK apartment with the right tiles, furnishings, and decor.',
      author: 'PropertyPlusDecor Team',
      publishedAt: '2024-01-15',
      readTime: 8,
      image: '/api/placeholder/800/400',
      category: 'home-decor',
      tags: ['2BHK', 'Interior Design', 'Space Optimization'],
      featured: true
    },
    {
      id: '2',
      title: 'Choosing the Right Tiles for Your Living Room: A Complete Guide',
      excerpt: 'Learn about different types of tiles, their benefits, and how to choose the perfect tiles for your living room based on your lifestyle and budget.',
      author: 'Rajesh Kumar',
      publishedAt: '2024-01-10',
      readTime: 6,
      image: '/api/placeholder/800/400',
      category: 'tiles-guide',
      tags: ['Tiles', 'Living Room', 'Ceramic', 'Vitrified'],
      featured: false
    },
    {
      id: '3',
      title: 'Budget-Friendly Home Decor Ideas Under ₹10,000',
      excerpt: 'Transform your home without breaking the bank. Here are creative and affordable decor ideas that will refresh your space.',
      author: 'Priya Sharma',
      publishedAt: '2024-01-05',
      readTime: 5,
      image: '/api/placeholder/800/400',
      category: 'home-decor',
      tags: ['Budget Decor', 'DIY', 'Affordable'],
      featured: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-brand-orange/5 to-brand-blue/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                variant="ghost"
                className="mb-6 text-brand-orange hover:text-brand-orange/80"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                PropertyPlusDecor Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your ultimate guide to transforming your flat into a dream home. Expert tips, 
                latest trends, and comprehensive guides for home decor enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-blue text-white capitalize">
                        {post.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-brand-orange text-white">Featured</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg hover:text-brand-orange transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {post.readTime} min read
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
                Load More Posts
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Blog;
