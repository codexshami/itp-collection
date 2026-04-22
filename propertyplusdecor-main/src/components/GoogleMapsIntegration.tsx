
import { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  phone?: string;
}

interface GoogleMapsIntegrationProps {
  location: MapLocation;
  showDirections?: boolean;
}

const GoogleMapsIntegration = ({ location, showDirections = true }: GoogleMapsIntegrationProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          calculateDistance(latitude, longitude, location.lat, location.lng);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [location]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      setDistance(`${Math.round(distance * 1000)}m away`);
    } else {
      setDistance(`${distance.toFixed(1)}km away`);
    }
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const getDirections = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  const callShop = () => {
    if (location.phone) {
      window.open(`tel:${location.phone}`, '_self');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-orange" />
          Shop Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">{location.name}</h4>
            <p className="text-sm text-gray-600">{location.address}</p>
            {distance && (
              <p className="text-sm text-brand-orange font-medium mt-1">{distance}</p>
            )}
          </div>

          {/* Embedded Google Map */}
          <div className="relative">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15078.353856082635!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={openGoogleMaps}
                className="bg-white/90 hover:bg-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {showDirections && (
              <Button
                onClick={getDirections}
                className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            )}
            
            {location.phone && (
              <Button
                onClick={callShop}
                variant="outline"
                className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Shop
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapsIntegration;
