import React, { useState } from 'react';
import { Store, Building, ArrowRight, Upload, Shield, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JoinPlatformSectionProps {
  initialPlan?: 'shop' | 'interior' | null;
}

const JoinPlatformSection = ({ initialPlan = null }: JoinPlatformSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'shop' | 'interior' | null>(initialPlan);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    area: '',
    businessType: '',
    experience: '',
    description: '',
    password: '',
    confirmPassword: '',
    // Shop specific
    shopCategory: '',
    // Interior company specific
    companyRegistration: '',
    teamSize: '',
    previousProjects: '',
    serviceAreas: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    coverPhoto: null as File | null,
    priceList1: null as File | null,
    priceList2: null as File | null,
    projectImage1: null as File | null,
    projectImage2: null as File | null,
    projectImage3: null as File | null,
    introVideo: null as File | null
  });

  const plans = [
    {
      id: 'shop',
      title: 'Tiles & Ceramics Shop',
      icon: <Store className="h-8 w-8" />,
      price: 'FREE',
      period: 'Limited Time Offer',
      features: [
        'Business Profile Creation',
        'Upload Cover Photo',
        'Upload 2 Price List Images',
        'Upload 1 Intro Video',
        'Direct Customer Contact',
        'Admin Verification'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'interior',
      title: 'Interior Design Company',
      icon: <Building className="h-8 w-8" />,
      price: 'FREE',
      period: 'Limited Time Offer',
      features: [
        'Company Profile Creation',
        'Upload Cover Photo',
        'Upload 3 Project Images',
        'Upload 1 Credentials Video',
        'Portfolio Showcase',
        'Company Registration Verification',
        'Admin Verification'
      ],
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for interior companies
    if (selectedPlan === 'interior' && !formData.companyRegistration) {
      alert('Company registration number is required for interior design companies');
      return;
    }
    
    console.log('Form submitted:', { formData, uploadedFiles, planType: selectedPlan });
    alert(`${selectedPlan === 'shop' ? 'Shop' : 'Company'} registration submitted! Our admin team will verify and approve your listing within 24 hours.`);
  };

  const resetForm = () => {
    setFormData({
      businessName: '',
      ownerName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      area: '',
      businessType: '',
      experience: '',
      description: '',
      password: '',
      confirmPassword: '',
      shopCategory: '',
      companyRegistration: '',
      teamSize: '',
      previousProjects: '',
      serviceAreas: ''
    });
    setUploadedFiles({
      coverPhoto: null,
      priceList1: null,
      priceList2: null,
      projectImage1: null,
      projectImage2: null,
      projectImage3: null,
      introVideo: null
    });
  };

  const handlePlanSelect = (planId: 'shop' | 'interior') => {
    console.log('Plan selected:', planId);
    setSelectedPlan(planId);
    resetForm();
  };

  const handleBackToPlans = () => {
    setSelectedPlan(null);
    resetForm();
  };

  // Effect to handle initial plan selection
  React.useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan]);

  return (
    <section id="join-platform" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Register Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join PropertyPlusDecor platform and connect with thousands of flat owners looking for quality tiles and interior design services
          </p>
        </div>

        {selectedPlan === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className="overflow-hidden hover-lift border-0 shadow-lg animate-fade-in transition-all duration-300 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {plan.title}
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <Badge className="bg-white/20 text-white mt-2">
                      {plan.period}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.id === 'shop' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    onClick={() => handlePlanSelect(plan.id as 'shop' | 'interior')}
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    {selectedPlan === 'shop' ? 'Tiles & Ceramics Shop' : 'Interior Design Company'} Registration
                  </CardTitle>
                  <Button variant="outline" onClick={handleBackToPlans}>
                    Back to Plans
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {selectedPlan === 'shop' ? 'Shop Name' : 'Company Name'} *
                      </label>
                      <Input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder={selectedPlan === 'shop' ? 'Enter shop name' : 'Enter company name'}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="Enter owner name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <Textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter complete business address"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area *
                      </label>
                      <Input
                        type="text"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        placeholder="Enter area/locality"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="Enter years of experience"
                        required
                      />
                    </div>
                  </div>

                  {/* Shop-specific fields */}
                  {selectedPlan === 'shop' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Category *
                      </label>
                      <Select value={formData.shopCategory} onValueChange={(value) => handleInputChange('shopCategory', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shop category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceramic">Ceramic Tiles</SelectItem>
                          <SelectItem value="vitrified">Vitrified Tiles</SelectItem>
                          <SelectItem value="marble">Marble & Granite</SelectItem>
                          <SelectItem value="mosaic">Mosaic Tiles</SelectItem>
                          <SelectItem value="porcelain">Porcelain Tiles</SelectItem>
                          <SelectItem value="mixed">Mixed Tiles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Interior company-specific fields */}
                  {selectedPlan === 'interior' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Registration Number *
                          </label>
                          <Input
                            type="text"
                            value={formData.companyRegistration}
                            onChange={(e) => handleInputChange('companyRegistration', e.target.value)}
                            placeholder="Enter GST/Company registration number"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Team Size *
                          </label>
                          <Input
                            type="number"
                            value={formData.teamSize}
                            onChange={(e) => handleInputChange('teamSize', e.target.value)}
                            placeholder="Enter team size"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Previous Projects Completed *
                          </label>
                          <Input
                            type="number"
                            value={formData.previousProjects}
                            onChange={(e) => handleInputChange('previousProjects', e.target.value)}
                            placeholder="Enter number of projects"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Areas *
                          </label>
                          <Input
                            type="text"
                            value={formData.serviceAreas}
                            onChange={(e) => handleInputChange('serviceAreas', e.target.value)}
                            placeholder="e.g., Mumbai, Pune, Nashik"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your business and services..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Upload Files</h3>
                    
                    {/* Cover Photo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Photo *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('coverPhoto', e.target.files?.[0] || null)}
                          className="hidden"
                          id="coverPhoto"
                          required
                        />
                        <label htmlFor="coverPhoto" className="cursor-pointer">
                          <span className="text-sm text-gray-600">
                            {uploadedFiles.coverPhoto ? uploadedFiles.coverPhoto.name : 'Click to upload cover photo'}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Shop-specific uploads */}
                    {selectedPlan === 'shop' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price List Image 1 *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                              <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('priceList1', e.target.files?.[0] || null)}
                                className="hidden"
                                id="priceList1"
                                required
                              />
                              <label htmlFor="priceList1" className="cursor-pointer">
                                <span className="text-xs text-gray-600">
                                  {uploadedFiles.priceList1 ? uploadedFiles.priceList1.name : 'Upload price list'}
                                </span>
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price List Image 2
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                              <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('priceList2', e.target.files?.[0] || null)}
                                className="hidden"
                                id="priceList2"
                              />
                              <label htmlFor="priceList2" className="cursor-pointer">
                                <span className="text-xs text-gray-600">
                                  {uploadedFiles.priceList2 ? uploadedFiles.priceList2.name : 'Upload price list (optional)'}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Interior company-specific uploads */}
                    {selectedPlan === 'interior' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Image 1 *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('projectImage1', e.target.files?.[0] || null)}
                              className="hidden"
                              id="projectImage1"
                              required
                            />
                            <label htmlFor="projectImage1" className="cursor-pointer">
                              <span className="text-xs text-gray-600">
                                {uploadedFiles.projectImage1 ? uploadedFiles.projectImage1.name : 'Upload project image'}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Image 2
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('projectImage2', e.target.files?.[0] || null)}
                              className="hidden"
                              id="projectImage2"
                            />
                            <label htmlFor="projectImage2" className="cursor-pointer">
                              <span className="text-xs text-gray-600">
                                {uploadedFiles.projectImage2 ? uploadedFiles.projectImage2.name : 'Upload project image (optional)'}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Image 3
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('projectImage3', e.target.files?.[0] || null)}
                              className="hidden"
                              id="projectImage3"
                            />
                            <label htmlFor="projectImage3" className="cursor-pointer">
                              <span className="text-xs text-gray-600">
                                {uploadedFiles.projectImage3 ? uploadedFiles.projectImage3.name : 'Upload project image (optional)'}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Intro Video */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intro Video *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload('introVideo', e.target.files?.[0] || null)}
                          className="hidden"
                          id="introVideo"
                          required
                        />
                        <label htmlFor="introVideo" className="cursor-pointer">
                          <span className="text-sm text-gray-600">
                            {uploadedFiles.introVideo ? uploadedFiles.introVideo.name : 'Click to upload intro video'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Password Creation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Create Password *
                      </label>
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  {/* Admin Verification Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Admin Verification Process</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <Clock className="h-4 w-4" />
                      <span>Your listing will be reviewed and approved by our admin team within 24 hours</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full ${selectedPlan === 'shop' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    size="lg"
                  >
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinPlatformSection;
