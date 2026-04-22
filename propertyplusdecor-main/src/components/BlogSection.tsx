
import { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'home-decor', name: 'Home Decor', count: 4 },
    { id: 'interior-design', name: 'Interior Design', count: 3 },
    { id: 'tiles-guide', name: 'Tiles Guide', count: 2 },
    { id: 'furnishing-tips', name: 'Furnishing Tips', count: 3 }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Transform Your 2BHK Flat into a Dream Home: Complete Guide',
      excerpt: 'Discover expert tips and tricks to maximize space and create a beautiful home in your 2BHK apartment with the right tiles, furnishings, and decor.',
      content: '',
      author: 'PropertyPlusDecor Team',
      publishedAt: '2024-01-15',
      readTime: 8,
      image: '/api/placeholder/600/400',
      category: 'home-decor',
      tags: ['2BHK', 'Interior Design', 'Space Optimization'],
      featured: true
    },
    {
      id: '2',
      title: 'Choosing the Right Tiles for Your Living Room: A Complete Guide',
      excerpt: 'Learn about different types of tiles, their benefits, and how to choose the perfect tiles for your living room based on your lifestyle and budget.',
      content: '',
      author: 'Rajesh Kumar',
      publishedAt: '2024-01-10',
      readTime: 6,
      image: '/api/placeholder/600/400',
      category: 'tiles-guide',
      tags: ['Tiles', 'Living Room', 'Ceramic', 'Vitrified'],
      featured: false
    },
    {
      id: '3',
      title: 'Budget-Friendly Home Decor Ideas Under ₹10,000',
      excerpt: 'Transform your home without breaking the bank. Here are creative and affordable decor ideas that will refresh your space.',
      content: '',
      author: 'Priya Sharma',
      publishedAt: '2024-01-05',
      readTime: 5,
      image: '/api/placeholder/600/400',
      category: 'home-decor',
      tags: ['Budget Decor', 'DIY', 'Affordable'],
      featured: false
    },
    {
      id: '4',
      title: 'Mattress Buying Guide: Memory Foam vs Spring vs Latex',
      excerpt: 'Confused about which mattress to buy? Our comprehensive guide compares different types of mattresses to help you make the right choice.',
      content: '',
      author: 'Dr. Suresh Patel',
      publishedAt: '2024-01-01',
      readTime: 7,
      image: '/api/placeholder/600/400',
      category: 'furnishing-tips',
      tags: ['Mattress', 'Sleep', 'Health', 'Comfort'],
      featured: true
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Home Decor Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert insights, tips, and guides to help you create your dream home. 
            From choosing the right tiles to furnishing your space perfectly.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover-lift border-0 shadow-lg">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-orange text-white">Featured</Badge>
                  </div>
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
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-brand-orange transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
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

        {/* All Posts */}
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
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min
                  </div>
                </div>
                <CardTitle className="text-lg hover:text-brand-orange transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8">
            Load More Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
