
import { useState, useEffect } from 'react';
import { ArrowUp, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goToHome = () => {
    navigate('/');
    // After navigation, scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <Button
        onClick={goToHome}
        className="w-12 h-12 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white shadow-lg"
        title="Go to Home"
      >
        <Home className="h-5 w-5" />
      </Button>
      <Button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg"
        title="Back to Top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default BackToTop;
