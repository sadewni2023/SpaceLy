import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchFilters from './components/SearchFilters';
import PropertyGrid from './components/PropertyGrid';
import FavouritesSidebar from './components/FavouritesSidebar';
import PropertyDetail from './components/PropertyDetail';
import Footer from './components/Footer';
import FeaturedSection from './components/FeaturedSection';
import { useFavourites } from './hooks/useFavourites';
import AboutPage from './components/AboutPage';
import AgentsPage from './components/AgentsPage';
import ContactPage from './components/ContactPage';
import FavouritesPage from './components/FavouritesPage';
import './styles/main.css';

// Different image sets for each property (16 unique sets)
const propertyImageSets = {
  // PROP 1: Modern Family Home
  prop1: [
    "/images/properties/prop1/image1.jpg",
    "/images/properties/prop1/image2.jpg", 
    "/images/properties/prop1/image3.jpg",
    "/images/properties/prop1/image4.jpg",
    "/images/properties/prop1/image5.jpg",
    "/images/properties/prop1/image6.jpg",
    "/images/properties/prop1/image7.jpg",
    "/images/properties/prop1/image1.jpg"
  ],
  
  // PROP 2: Garden Flat
  prop2: [
    "/images/properties/prop2/image1.jpg",
    "/images/properties/prop2/image2.jpg", 
    "/images/properties/prop2/image3.jpg",
    "/images/properties/prop2/image4.jpg",
    "/images/properties/prop2/image5.jpg",
    "/images/properties/prop2/image6.jpg",
    "/images/properties/prop2/image7.jpg",
    "/images/properties/prop2/image1.jpg"
  ],
  
  // PROP 3: Luxury Detached House
  prop3: [
    "/images/properties/prop3/image1.jpg",
    "/images/properties/prop3/image2.jpg", 
    "/images/properties/prop3/image3.jpg",
    "/images/properties/prop3/image4.jpg",
    "/images/properties/prop3/image5.jpg",
    "/images/properties/prop3/image6.jpg",
    "/images/properties/prop3/image7.jpg",
    "/images/properties/prop3/image1.jpg"
  ],
  
  // PROP 4: City Apartment
  prop4: [
    "/images/properties/prop4/image1.jpg",
    "/images/properties/prop4/image2.jpg", 
    "/images/properties/prop4/image3.jpg",
    "/images/properties/prop4/image4.jpg",
    "/images/properties/prop4/image5.jpg",
    "/images/properties/prop4/image6.jpg",
    "/images/properties/prop4/image7.jpg",
    "/images/properties/prop4/image1.jpg"
  ],
  
  // PROP 5: Victorian House
  prop5: [
    "/images/properties/prop5/image1.jpg",
    "/images/properties/prop5/image2.jpg", 
    "/images/properties/prop5/image3.jpg",
    "/images/properties/prop5/image4.jpg",
    "/images/properties/prop5/image5.jpg",
    "/images/properties/prop5/image6.jpg",
    "/images/properties/prop5/image7.jpg",
    "/images/properties/prop5/image1.jpg"
  ],
  
  // PROP 6: Penthouse
  prop6: [
    "/images/properties/prop6/image1.jpg",
    "/images/properties/prop6/image2.jpg", 
    "/images/properties/prop6/image3.jpg",
    "/images/properties/prop6/image4.jpg",
    "/images/properties/prop6/image5.jpg",
    "/images/properties/prop6/image6.jpg",
    "/images/properties/prop6/image7.jpg",
    "/images/properties/prop6/image1.jpg"
  ],
  
  // PROP 7: Mews House
  prop7: [
    "/images/properties/prop7/image1.jpg",
    "/images/properties/prop7/image2.jpg", 
    "/images/properties/prop7/image3.jpg",
    "/images/properties/prop7/image4.jpg",
    "/images/properties/prop7/image5.jpg",
    "/images/properties/prop7/image6.jpg",
    "/images/properties/prop7/image7.jpg",
    "/images/properties/prop7/image1.jpg"
  ],
  
  // PROP 8: Townhouse with Rooftop Terrace
  prop8: [
    "/images/properties/prop8/image1.jpg",
    "/images/properties/prop8/image2.jpg", 
    "/images/properties/prop8/image3.jpg",
    "/images/properties/prop8/image4.jpg",
    "/images/properties/prop8/image5.jpg",
    "/images/properties/prop8/image6.jpg",
    "/images/properties/prop8/image7.jpg",
    "/images/properties/prop8/image1.jpg"
  ],
  
  // PROP 9: Converted School Apartment
  prop9: [
    "/images/properties/prop9/image1.jpg",
    "/images/properties/prop9/image2.jpg", 
    "/images/properties/prop9/image3.jpg",
    "/images/properties/prop9/image4.jpg",
    "/images/properties/prop9/image5.jpg",
    "/images/properties/prop9/image6.jpg",
    "/images/properties/prop9/image7.jpg",
    "/images/properties/prop9/image1.jpg"
  ],
  
  // PROP 10: Georgian Townhouse
  prop10: [
    "/images/properties/prop10/image1.jpg",
    "/images/properties/prop10/image2.jpg", 
    "/images/properties/prop10/image3.jpg",
    "/images/properties/prop10/image4.jpg",
    "/images/properties/prop10/image5.jpg",
    "/images/properties/prop10/image6.jpg",
    "/images/properties/prop10/image7.jpg",
    "/images/properties/prop10/image1.jpg"
  ],
  
  // PROP 11: Luxury Canary Wharf Apartment
  prop11: [
    "/images/properties/prop11/image1.jpg",
    "/images/properties/prop11/image2.jpg", 
    "/images/properties/prop11/image3.jpg",
    "/images/properties/prop11/image4.jpg",
    "/images/properties/prop11/image5.jpg",
    "/images/properties/prop11/image6.jpg",
    "/images/properties/prop11/image7.jpg",
    "/images/properties/prop11/image1.jpg"
  ],
  
  // PROP 12: Extended Family Home
  prop12: [
    "/images/properties/prop12/image1.jpg",
    "/images/properties/prop12/image2.jpg", 
    "/images/properties/prop12/image3.jpg",
    "/images/properties/prop12/image4.jpg",
    "/images/properties/prop12/image5.jpg",
    "/images/properties/prop12/image6.jpg",
    "/images/properties/prop12/image7.jpg",
    "/images/properties/prop12/image1.jpg"
  ],
};

// Floor plan images matching property types
const floorPlanImages = {
  // House floor plans
  modernHouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  victorianHouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  townhouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  mewsHouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  georgianHouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  extendedHouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  estate: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  
  // Flat floor plans
  gardenFlat: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop",
  cityApartment: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop",
  penthouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  convertedApartment: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop",
  luxuryApartment: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop",
  duplex: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  riverViewApartment: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop"
};

// Map images
const mapImages = {
  prop1: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Petts+Wood+BR5",
  prop2: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Orpington+BR6",
  prop3: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=London+NW1",
  prop4: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=London+SW15",
  prop5: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=London+E14",
  prop6: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=London+SE1",
  prop7: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=London+W1",
  prop8: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Baker+Street+W1",
  prop9: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Chelsea+Bridge+SW1",
  prop10: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Kensington+W8",
  prop11: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Canary+Wharf+E14",
  prop12: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Hampstead+NW3"
};

// Properties data
const propertiesData = {
  "properties": [
    {
      "id": "prop1",
      "type": "House",
      "bedrooms": 3,
      "price": 750000,
      "tenure": "Freehold",
      "description": "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland.",
      "longDescription": "<h3><p>This stylish three-bedroom modern villa is ideally located just 0.5 miles from Petts Wood station, providing fast and convenient rail connections into London. Designed for contemporary living, the property is within easy walking distance of local shops, well-regarded schools, multiple bus routes, and the stunning National Trust woodland—perfect for relaxing walks, outdoor activities, and family leisure time.</p>",
      "location": "Petts Wood Road, Petts Wood, Orpington BR5",
      "postcode": "BR5",
      "imageSet": "prop1",
      "mapImage": mapImages.prop1,
      "coordinates": { "lat": 51.3886, "lng": 0.0749 },
      "added": { "month": "October", "day": 12, "year": 2022 }
    },
    {
      "id": "prop2",
      "type": "Flat",
      "bedrooms": 2,
      "price": 399995,
      "tenure": "Leasehold",
      "description": "Presented in excellent decorative order throughout is this two double bedroom, two bathroom, garden flat. The modern fitted kitchen is open plan to the living room which boasts solid wooden floors and includes integrated appliances.",
      "longDescription": "<h3>Modern Garden Flat in Excellent Condition</h3><p>This exceptional two double bedroom garden flat is presented in excellent decorative order throughout, offering modern living in a highly desirable location. The property has been meticulously maintained and upgraded to provide a contemporary and comfortable living space.</p>",
      "location": "Crofton Road, Orpington BR6",
      "postcode": "BR6",
      "imageSet": "prop2",
      "mapImage": mapImages.prop2,
      "coordinates": { "lat": 51.3675, "lng": 0.0984 },
      "added": { "month": "September", "day": 14, "year": 2022 }
    },
    {
      "id": "prop3",
      "type": "Villa",
      "bedrooms": 4,
      "price": 925000,
      "tenure": "Freehold",
      "description": "Stunning four bedroom detached family home in sought-after location. Recently renovated to highest standards with open-plan kitchen/diner, luxury bathrooms and south-facing garden.",
      "longDescription": "<h3>Luxury Detached Family Home</h3><p>This magnificent four-bedroom detached family home has been recently renovated to the highest standards and is situated in one of the area's most sought-after locations. The property combines contemporary design with practical family staying.</p>",
      "location": "The Avenue, London NW1",
      "postcode": "NW1",
      "imageSet": "prop3",
      "mapImage": mapImages.prop3,
      "coordinates": { "lat": 51.5320, "lng": -0.1420 },
      "added": { "month": "March", "day": 22, "year": 2023 }
    },
    {
      "id": "prop4",
      "type": "House",
      "bedrooms": 1,
      "price": 325000,
      "tenure": "Leasehold",
      "description": "Modern one bedroom house in newly buildup. Features garden , parking space .",
      "longDescription": "<h3>Contemporary City house</h3><p>This contemporary one-bedroom apartment is located within a prestigious newly buildup house. The property has been finished to a high specification throughout.</p>",
      "location": "Riverside Drive, London SW15",
      "postcode": "SW15",
      "imageSet": "prop4",
      "mapImage": mapImages.prop4,
      "coordinates": { "lat": 51.4639, "lng": -0.2138 },
      "added": { "month": "June", "day": 8, "year": 2023 }
    },
    {
      "id": "prop5",
      "type": "Hotel",
      "bedrooms": 5,
      "price": 1200000,
      "tenure": "Freehold",
      "description": "Impressive five bedroom Victorian terraced hotel with original period features. Recently extended to include large kitchen/diner and home office. Close to mountain hike.",
      "longDescription": "<h3>Victorian Family Residence</h3><p>This impressive five-bedroom Victorian terraced hotel beautifully combines original period features with contemporary staying spaces.</p>",
      "location": "Victoria Park Road, London E14",
      "postcode": "E14",
      "imageSet": "prop5",
      "mapImage": mapImages.prop5,
      "coordinates": { "lat": 51.5145, "lng": -0.0145 },
      "added": { "month": "January", "day": 15, "year": 2024 }
    },
    {
      "id": "prop6",
      "type": "Apartment",
      "bedrooms": 2,
      "price": 675000,
      "tenure": "Leasehold",
      "description": "Luxury two bedroom penthouse with calm environment. Features private roof terrace, smart home technology throughout.",
      "longDescription": "<h3>Penthouse with calm environment.</h3><p>This exceptional two-bedroom penthouse offers luxury living with breathtaking panoramic  views. Located on the top floor of a prestigious development, the property features high-end finishes and premium amenities.</p>",
      "location": "Thames Quay, London SE1",
      "postcode": "SE1",
      "imageSet": "prop6",
      "mapImage": mapImages.prop6,
      "coordinates": { "lat": 51.5014, "lng": -0.0719 },
      "added": { "month": "August", "day": 3, "year": 2024 }
    },
    {
      "id": "prop7",
      "type": "House",
      "bedrooms": 3,
      "price": 850000,
      "tenure": "Freehold",
      "description": "Beautiful three bedroom mews house with private parking and courtyard garden. Recently refurbished with high-spec kitchen and bathrooms. Quiet cul-de-sac location.",
      "longDescription": "<h3>Modern Mews House</h3><p>This beautiful three-bedroom mews house has been recently refurbished to an exceptionally high standard and is located in a quiet cul-de-sac, offering a peaceful retreat while being close to local amenities.</p>",
      "location": "Mews Lane, London W1",
      "postcode": "W1",
      "imageSet": "prop7",
      "mapImage": mapImages.prop7,
      "coordinates": { "lat": 51.5155, "lng": -0.1443 },
      "added": { "month": "November", "day": 20, "year": 2024 }
    },
    
    {
      "id": "prop8",
      "type": "Cottage",
      "bedrooms": 4,
      "price": 895000,
      "tenure": "Freehold",
      "description": "This delightful four-bedroom cottage-style home is ideally situated just 0.5 miles from Petts Wood station, offering convenient access to London via fast train services.",
      "longDescription": "<h3>Modern cottage with Rooftop Terrace</h3><p>This stunning contemporary townhouse offers modern staying with spectacular mountain views from its private rooftop terrace. The property has been designed with attention to detail and features high-quality finishes throughout.</p>",
      "location": "Baker Street, London W1",
      "postcode": "W1",
      "imageSet": "prop8",
      "mapImage": mapImages.prop8,
      "coordinates": { "lat": 51.5074, "lng": -0.1278 },
      "added": { "month": "February", "day": 10, "year": 2024 }
    },
    {
      "id": "prop9",
      "type": "Villa",
      "bedrooms": 1,
      "price": 425000,
      "tenure": "Leasehold",
      "description": "Bright one-bedroom seaside villa featuring open-plan living, contemporary finishes, and private outdoor space.",
      "longDescription": "<h3>Modern Seaside Villa Living</h3><p>This beautifully designed one-bedroom seaside villa offers a relaxed coastal lifestyle with modern comfort. The villa features an open-plan living area filled with natural light, stylish interiors, and seamless indoor-outdoor flow. Large windows capture fresh sea breezes, while the private outdoor space is ideal for relaxing or entertaining. Designed for peaceful seaside living, this villa combines elegance, comfort, and coastal charm.</p>",
      "location": "Chelsea Bridge Road, London SW1",
      "postcode": "SW1",
      "imageSet": "prop9",
      "mapImage": mapImages.prop9,
      "coordinates": { "lat": 51.4893, "lng": -0.1444 },
      "added": { "month": "April", "day": 5, "year": 2024 }
    },
    {
      "id": "prop10",
      "type": "Apartment",
      "bedrooms": 5,
      "price": 1350000,
      "tenure": "Freehold",
      "description": "Stunning five-bedroom modern apartment offering spacious interiors, high-end finishes, and private outdoor space.",
      "longDescription": "<h3>Contemporary Luxury Apartment</h3><p>This impressive five-bedroom modern apartment delivers refined urban living with sleek design and premium finishes throughout. The property features expansive living areas, floor-to-ceiling windows, and thoughtfully designed interiors that maximise light and space. Contemporary fittings and high-quality materials create a stylish yet comfortable home, ideal for modern city living.</p>",
      "location": "Kensington High Street, London W8",
      "postcode": "W8",
      "imageSet": "prop10",
      "mapImage": mapImages.prop10,
      "coordinates": { "lat": 51.4625, "lng": -0.1690 },
      "added": { "month": "May", "day": 18, "year": 2024 }
    },
    {
      "id": "prop11",
      "type": "Villa",
      "bedrooms": 2,
      "price": 725000,
      "tenure": "Leasehold",
      "description": "Two bedroom luxury villa with concierge and swimming pool. Features panoramic views and private balcony.",
      "longDescription": "<h3>Luxury Villa with Amenities</h3><p>This exceptional two-bedroom villa offers luxury living with access to premium amenities including 24-hour concierge, swimming pool, and outdoor area. The property features panoramic views and a private pool.</p>",
      "location": "Canary Wharf, London E14",
      "postcode": "E14",
      "imageSet": "prop11",
      "mapImage": mapImages.prop11,
      "coordinates": { "lat": 51.4975, "lng": -0.1357 },
      "added": { "month": "March", "day": 30, "year": 2024 }
    },
    {
      "id": "prop12",
      "type": "Villa",
      "bedrooms": 3,
      "price": 950000,
      "tenure": "Freehold",
      "description": "Three bedroom semi-detached family home with extension and beach access. Close to excellent beach ",
      "longDescription": "<h3>Extended villa</h3><p>This beautifully extended three-bedroom semi-detached family villa offers spacious living accommodation with a modern open-plan kitchen/diner extension. The property features a landscaped rear sea and is located close to excellent view.</p>",
      "location": "Hampstead Heath, London NW3",
      "postcode": "NW3",
      "imageSet": "prop12",
      "mapImage": mapImages.prop12,
      "coordinates": { "lat": 51.5230, "lng": -0.1573 },
      "added": { "month": "July", "day": 12, "year": 2024 }
    },
  ]
};

// Get floor plan based on property type and features
const getFloorPlanForProperty = (property) => {
  if (property.type === 'House') {
    if (property.description.includes('Victorian')) return floorPlanImages.victorianHouse;
    if (property.description.includes('Georgian')) return floorPlanImages.georgianHouse;
    if (property.description.includes('extended') || property.description.includes('Extended')) return floorPlanImages.extendedHouse;
    if (property.description.includes('mews')) return floorPlanImages.mewsHouse;
    if (property.description.includes('townhouse')) return floorPlanImages.townhouse;
    if (property.description.includes('estate') || property.bedrooms >= 6) return floorPlanImages.estate;
    if (property.description.includes('villa')) return floorPlanImages.villa;
    return floorPlanImages.modernHouse;
  } else {
    if (property.description.includes('penthouse')) return floorPlanImages.penthouse;
    if (property.description.includes('duplex')) return floorPlanImages.duplex;
    if (property.description.includes('converted')) return floorPlanImages.convertedApartment;
    if (property.description.includes('garden')) return floorPlanImages.gardenFlat;
    if (property.description.includes('river')) return floorPlanImages.riverViewApartment;
    if (property.description.includes('luxury')) return floorPlanImages.luxuryApartment;
    return floorPlanImages.cityApartment;
  }
};

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    searchQuery: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();

  useEffect(() => {
    // Process properties with unique image sets
    const enhancedProperties = propertiesData.properties.map(property => {
      const images = propertyImageSets[property.imageSet] || propertyImageSets.prop1;
      const floorPlan = getFloorPlanForProperty(property);
      
      return {
        ...property,
        title: `${property.bedrooms} Bedroom ${property.type} in ${property.location.split(',')[0]}`,
        status: property.tenure === 'Freehold' ? 'sale' : 'rent',
        bathrooms: Math.min(property.bedrooms, property.type === 'House' ? 4 : 2),
        sqft: property.bedrooms * (property.type === 'House' ? 700 : 500) + 300,
        agent: getRandomAgent(),
        date: `${property.added.day} ${property.added.month} ${property.added.year}`,
        featured: property.price > 1000000 || property.bedrooms >= 5,
        features: getPropertyFeatures(property),
        image: images[0],
        picture: images[0],
        gallery: images,
        floorPlan: floorPlan
      };
    });
    
    setProperties(enhancedProperties);
    setFilteredProperties(enhancedProperties);
  }, []);

  const getRandomAgent = () => {
    const agents = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'David Park', 'Lisa Rodriguez', 'James Miller'];
    return agents[Math.floor(Math.random() * agents.length)];
  };

  const getPropertyFeatures = (property) => {
    const baseFeatures = {
      'House': ['Garden', 'Parking', 'Double Glazing', 'Gas Central Heating'],
      'Flat': ['Security', 'Double Glazing', 'Lift Access']
    };
    
    const typeFeatures = baseFeatures[property.type] || baseFeatures['House'];
    const additionalFeatures = [];
    
    if (property.description.includes('modern') || property.description.includes('contemporary')) 
      additionalFeatures.push('Modern Kitchen');
    if (property.description.includes('Victorian') || property.description.includes('Georgian') || property.description.includes('original'))
      additionalFeatures.push('Period Features', 'Character Details');
    if (property.description.includes('garden'))
      additionalFeatures.push('Private Garden');
    if (property.description.includes('terrace') || property.description.includes('balcony'))
      additionalFeatures.push('Outdoor Space');
    if (property.description.includes('parking'))
      additionalFeatures.push('Allocated Parking');
    if (property.description.includes('luxury'))
      additionalFeatures.push('Luxury Finish');
    if (property.description.includes('pool'))
      additionalFeatures.push('Swimming Pool');
    if (property.description.includes('view'))
      additionalFeatures.push('Scenic Views');
    if (property.description.includes('smart'))
      additionalFeatures.push('Smart Home');
    
    return [...typeFeatures, ...additionalFeatures].slice(0, 6);
  };

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    
    let filtered = properties;
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.postcode.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice) || 0);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice) || 10000000);
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms) || 0);
    }
    
    if (filters.searchQuery) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== 'all') {
      if (activeTab === 'sale') {
        filtered = filtered.filter(p => p.status === 'sale');
      } else if (activeTab === 'rent') {
        filtered = filtered.filter(p => p.status === 'rent');
      } else if (activeTab === 'House' || activeTab === 'Flat') {
        filtered = filtered.filter(p => p.type === activeTab);
      } else {
        filtered = filtered.filter(p => p.type === activeTab);
      }
    }
    
    setFilteredProperties(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let filtered = properties;
    
    if (tab !== 'all') {
      if (tab === 'sale') {
        filtered = filtered.filter(p => p.status === 'sale');
      } else if (tab === 'rent') {
        filtered = filtered.filter(p => p.status === 'rent');
      } else if (tab === 'House' || tab === 'Flat') {
        filtered = filtered.filter(p => p.type === tab);
      } else {
        filtered = filtered.filter(p => p.type === tab);
      }
    }
    
    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    const emptyFilters = {
      location: '',
      type: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      searchQuery: ''
    };
    setSearchFilters(emptyFilters);
    setActiveTab('all');
    setFilteredProperties(properties);
  };

  const handleAddFavourite = (propertyId) => {
    if (!favourites.includes(propertyId)) {
      addFavourite(propertyId);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="app">
          <div className="gradient-bg"></div>
          
          <Header favourites={favourites} />
          
          <Routes>
            {/* Home Page */}
            <Route path="/" element={
              <>
                <HeroSection />
                
                <div className="search-section">
                  <div className="container">
                    <SearchFilters 
                      onSearch={handleSearch}
                      onClear={clearFilters}
                      filters={searchFilters}
                    />
                  </div>
                </div>
                
                <main className="main-content">
                  <div className="container">
                    <div className="content-wrapper">
                      <div className="property-tabs">
                        <button 
                          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                          onClick={() => handleTabChange('all')}
                        >
                          All Properties ({properties.length})
                        </button>
                        <button 
                          className={`tab-btn ${activeTab === 'sale' ? 'active' : ''}`}
                          onClick={() => handleTabChange('sale')}
                        >
                          For Sale ({properties.filter(p => p.status === 'sale').length})
                        </button>
                        <button 
                          className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
                          onClick={() => handleTabChange('rent')}
                        >
                          For Rent ({properties.filter(p => p.status === 'rent').length})
                        </button>
                        <button 
                          className={`tab-btn ${activeTab === 'House' ? 'active' : ''}`}
                          onClick={() => handleTabChange('House')}
                        >
                          Houses ({properties.filter(p => p.type === 'House').length})
                        </button>
                        <button 
                          className={`tab-btn ${activeTab === 'Flat' ? 'active' : ''}`}
                          onClick={() => handleTabChange('Flat')}
                        >
                          Flats ({properties.filter(p => p.type === 'Flat').length})
                        </button>
                      </div>
                      
                      <div className="main-grid">
                        <div className="properties-section">
                          <PropertyGrid 
                            properties={filteredProperties}
                            favourites={favourites}
                            onToggleFavourite={handleAddFavourite}
                          />
                        </div>
                        
                        <div className="sidebar-section">
                          <FavouritesSidebar 
                            favourites={favourites}
                            properties={properties}
                            onRemoveFavourite={removeFavourite}
                            onClearFavourites={clearFavourites}
                            onAddFavourite={handleAddFavourite}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
                
                <FeaturedSection properties={properties.filter(p => p.featured)} />
              </>
            } />
            
            {/* Property Detail Page */}
            <Route path="/property/:id" element={
              <PropertyDetail 
                properties={properties}
                favourites={favourites}
                onToggleFavourite={handleAddFavourite}
              />
            } />
            
            {/* About Page */}
            <Route path="/about" element={<AboutPage />} />
            
            {/* Agents Page */}
            <Route path="/agents" element={<AgentsPage />} />
            
            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Favourites Page */}
            <Route path="/favourites" element={
              <FavouritesPage 
                favourites={favourites}
                properties={properties}
                removeFavourite={removeFavourite}
                clearFavourites={clearFavourites}
              />
            } />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;