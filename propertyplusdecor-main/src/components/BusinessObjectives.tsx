
import { Target, Heart, Star, Shield } from 'lucide-react';

const BusinessObjectives = () => {
  const objectives = [
    {
      icon: <Heart className="h-12 w-12 text-brand-orange" />,
      title: "Affordable Quality",
      description: "Best products at budget-friendly prices",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Shield className="h-12 w-12 text-brand-blue" />,
      title: "Trusted Partners",
      description: "Verified shops & certified interior designers",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Star className="h-12 w-12 text-brand-orange" />,
      title: "Dream Homes",
      description: "Transform your flat into a beautiful home",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Target className="h-12 w-12 text-brand-blue" />,
      title: "Easy Access",
      description: "Find everything you need in one place",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting flat owners with quality products and services at affordable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((objective, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                <img
                  src={objective.image}
                  alt={objective.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {objective.icon}
                  </div>
                  <h3 className="text-xl font-bold">{objective.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-center">{objective.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement with Visual */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                From Flat to Dream Home
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We believe every flat owner deserves access to quality tiles, ceramics, and professional interior design services without breaking the bank.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-orange">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue">50+</div>
                  <div className="text-sm text-gray-600">Partner Shops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-orange">25+</div>
                  <div className="text-sm text-gray-600">Design Companies</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Beautiful home interior"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-blue/20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessObjectives;
