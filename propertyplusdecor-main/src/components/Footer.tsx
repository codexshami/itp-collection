
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Tiles & Ceramics", href: "#tiles" },
      { name: "Mattress & Furnishings", href: "#furnishings" },
      { name: "Decorative Items", href: "#decor" },
      { name: "Contact Experts", href: "#experts" },
      { name: "Interior Design", href: "#experts" }
    ],
    quickLinks: [
      { name: "About Us", href: "#about" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" },
      { name: "Blog", href: "#blog" }
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "Help Center", href: "#help" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Refund Policy", href: "#refund" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">PropertyPlusDecor</h3>
                <p className="text-sm text-gray-400">Your Flat to Dream Home</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              India's premier platform for discovering home decor products and services. 
              Connect with verified local shops and expert craftsmen to transform your space.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-orange" />
                <span>radhadhirendrakumar@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-orange" />
                <span>+91 9819912166</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <span>Mumbai & Surrounding Areas</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="p-2 border-gray-700 hover:border-brand-orange">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 border-gray-700 hover:border-brand-orange">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 border-gray-700 hover:border-brand-orange">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 border-gray-700 hover:border-brand-orange">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="font-medium">Stay Updated</h5>
              <p className="text-sm text-gray-400">
                Subscribe to get updates on new shops and offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:border-brand-orange focus:outline-none"
                />
                <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Link */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">🔧 Need More Expert Options?</h3>
            <p className="mb-4 text-sm">
              Explore verified labor profiles on our partner platform
            </p>
            <Button 
              size="lg" 
              className="bg-white text-brand-orange hover:bg-gray-100"
              onClick={() => window.open('https://www.labormitra.com', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit LaborMitra.com
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} PropertyPlusDecor.com. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Made with ❤️ in India</span>
              <span>•</span>
              <span>Trusted by 1000+ customers</span>
              <span>•</span>
              <span>500+ verified shops</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
