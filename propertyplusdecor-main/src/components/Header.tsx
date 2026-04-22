import { useState } from 'react';
import { Menu, X, Phone, Mail, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Tiles & Ceramics', href: '#tiles' },
    { name: 'Furnishings', href: '#furnishings' },
    { name: 'Decor Items', href: '#decor' },
    { name: 'Contact Experts', href: '#experts' },
    { name: 'Join Platform', href: '#join-platform' },
    { name: 'Blog', href: '/blog', isLink: true },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      if (href === '#home') {
        // For home, navigate to the root path and scroll to top
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = () => {
    // Navigate to home page and scroll to top when logo is clicked
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleRegisterClick = () => {
    const element = document.getElementById('join-platform');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-brand-orange to-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PropertyPlusDecor</h1>
              <p className="text-xs text-gray-600">Flat to Dream Home</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              item.isLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-brand-orange transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-brand-orange transition-colors font-medium"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>9819912166</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              onClick={handleRegisterClick}
            >
              <Store className="h-4 w-4 mr-1" />
              List Business
            </Button>
            <Button 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={handleRegisterClick}
            >
              Register Business
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-left text-gray-700 hover:text-brand-orange transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-gray-700 hover:text-brand-orange transition-colors font-medium"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="flex items-center space-x-2 text-sm text-gray-600 pt-4 border-t">
                <Phone className="h-4 w-4" />
                <span>9819912166</span>
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                  onClick={handleRegisterClick}
                >
                  <Store className="h-4 w-4 mr-1" />
                  List Your Business
                </Button>
                <Button 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  onClick={handleRegisterClick}
                >
                  Register Your Business
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
