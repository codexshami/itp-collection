
import { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationSearchProps {
  onSearchChange: (query: string, location: string, area: string, radius: number) => void;
  onLocationDetect: (lat: number, lng: number) => void;
}

const LocationSearch = ({ onSearchChange, onLocationDetect }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [searchRadius, setSearchRadius] = useState(5);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const getAreasForCity = (city: string) => {
    const areaMap: { [key: string]: string[] } = {
      'Mumbai': ['Andheri', 'Bandra', 'Borivali', 'Malad', 'Powai', 'Thane', 'Navi Mumbai'],
      'Delhi': ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Saket', 'Dwarka', 'Gurgaon'],
      'Bangalore': ['Koramangala', 'Whitefield', 'Electronic City', 'Hebbal', 'Jayanagar'],
      'Pune': ['Hinjewadi', 'Wakad', 'Baner', 'Kothrud', 'Viman Nagar', 'Hadapsar'],
      'Hyderabad': ['Hitech City', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Secunderabad'],
      'Chennai': ['T Nagar', 'Anna Nagar', 'Velachery', 'Adyar', 'Tambaram'],
      'Kolkata': ['Park Street', 'Salt Lake', 'Ballygunge', 'Howrah', 'New Town'],
      'Ahmedabad': ['Satellite', 'Vastrapur', 'Bopal', 'Maninagar', 'Chandkheda'],
      'Jaipur': ['Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'C Scheme', 'Ajmer Road'],
      'Lucknow': ['Gomti Nagar', 'Hazratganj', 'Alambagh', 'Indira Nagar', 'Mahanagar'],
      'Kanpur': ['Civil Lines', 'Swaroop Nagar', 'Kidwai Nagar', 'Govind Nagar', 'Kalyanpur'],
      'Nagpur': ['Sadar', 'Dharampeth', 'Ramdaspeth', 'Hanuman Nagar', 'Wardha Road']
    };
    return areaMap[city] || [];
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          onLocationDetect(latitude, longitude);
          setSelectedLocation('Current Location');
          setSelectedArea('');
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    }
  };

  const handleSearch = () => {
    onSearchChange(searchQuery, selectedLocation, selectedArea, searchRadius);
  };

  const handleCityChange = (city: string) => {
    setSelectedLocation(city);
    setSelectedArea(''); // Reset area when city changes
  };

  useEffect(() => {
    if (searchQuery || selectedLocation || selectedArea) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchQuery, selectedLocation, selectedArea, searchRadius]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search tiles, interior design..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Select value={selectedLocation} onValueChange={handleCityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Location
                </div>
              </SelectItem>
              {popularCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Select 
            value={selectedArea} 
            onValueChange={setSelectedArea}
            disabled={!selectedLocation || selectedLocation === 'current'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              {selectedLocation && selectedLocation !== 'current' && 
                getAreasForCity(selectedLocation).map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={searchRadius.toString()} onValueChange={(value) => setSearchRadius(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Within 2 km</SelectItem>
              <SelectItem value="5">Within 5 km</SelectItem>
              <SelectItem value="10">Within 10 km</SelectItem>
              <SelectItem value="25">Within 25 km</SelectItem>
              <SelectItem value="50">Within 50 km</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={detectLocation} variant="outline" className="flex-1">
            <MapPin className="h-4 w-4 mr-2" />
            Detect
          </Button>
          <Button onClick={handleSearch} className="flex-1 bg-orange-500 hover:bg-orange-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
