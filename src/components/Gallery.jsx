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
import './styles/main.css';


const propertyImageSets = {
  // Modern Houses
  modernHouse: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop", // Modern house exterior
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop", // Living room
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop", // Kitchen
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1560448205-97abe0d5b8e5?w=800&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop", // Garden
    "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop", // Another view
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop" // Exterior night
  ],
  
  // Victorian Houses
  victorianHouse: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop", // Victorian exterior
    "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop", // Period living room
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop", // Bedroom with fireplace
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop", // Kitchen extension
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop", // Dining room
    "https://images.unsplash.com/photo-1560448205-97abe0d5b8e5?w=800&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop", // Garden view
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop" // Front exterior
  ],
  
  // Luxury Apartments
  luxuryApartment: [
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop", // Modern apartment exterior
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop", // Open plan living
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1560448205-97abe0d5b8e5?w=800&auto=format&fit=crop", // Luxury bathroom
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop", // City view from balcony
    "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop", // Kitchen detail
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop", // Building amenities
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop" // Entrance lobby
  ],
  
  // Studio Apartments
  studioApartment: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop", // Studio layout
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop", // Kitchenette
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop", // Sleeping area
    "https://images.unsplash.com/photo-1560448205-97abe0d5b8e5?w=800&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop", // Living area
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop", // Balcony/View
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop" // Building exterior
  ],
  
  // Penthouse
  penthouse: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop", // Penthouse terrace
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop", // Living area with view
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop", // Luxury kitchen
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop", // Master bedroom
    "https://images.unsplash.com/photo-1560448205-97abe0d5b8e5?w=800&auto=format&fit=crop", // Spa bathroom
    "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop", // Dining area
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop", // Building exterior
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop" // City skyline view
  ]
};

// Floor plan images
const floorPlanImages = {
  house: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  flat: "https://images.unsplash.com/photo-1560448204-603a3b0e7d3b?w=800&auto=format&fit=crop",
  penthouse: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
};

// Map images for each location
const mapImages = {
  prop1: `https://maps.googleapis.com/maps/api/staticmap?center=51.3886,0.0749&zoom=15&size=600x400&markers=color:red%7C51.3886,0.0749&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop2: `https://maps.googleapis.com/maps/api/staticmap?center=51.3675,0.0984&zoom=15&size=600x400&markers=color:red%7C51.3675,0.0984&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop3: `https://maps.googleapis.com/maps/api/staticmap?center=51.5320,-0.1420&zoom=15&size=600x400&markers=color:red%7C51.5320,-0.1420&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop4: `https://maps.googleapis.com/maps/api/staticmap?center=51.4639,-0.2138&zoom=15&size=600x400&markers=color:red%7C51.4639,-0.2138&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop5: `https://maps.googleapis.com/maps/api/staticmap?center=51.5145,-0.0145&zoom=15&size=600x400&markers=color:red%7C51.5145,-0.0145&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop6: `https://maps.googleapis.com/maps/api/staticmap?center=51.5014,-0.0719&zoom=15&size=600x400&markers=color:red%7C51.5014,-0.0719&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop7: `https://maps.googleapis.com/maps/api/staticmap?center=51.5155,-0.1443&zoom=15&size=600x400&markers=color:red%7C51.5155,-0.1443&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop8: `https://maps.googleapis.com/maps/api/staticmap?center=51.5074,-0.1278&zoom=15&size=600x400&markers=color:red%7C51.5074,-0.1278&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop9: `https://maps.googleapis.com/maps/api/staticmap?center=51.4893,-0.1444&zoom=15&size=600x400&markers=color:red%7C51.4893,-0.1444&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop10: `https://maps.googleapis.com/maps/api/staticmap?center=51.4625,-0.1690&zoom=15&size=600x400&markers=color:red%7C51.4625,-0.1690&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop11: `https://maps.googleapis.com/maps/api/staticmap?center=51.4975,-0.1357&zoom=15&size=600x400&markers=color:red%7C51.4975,-0.1357&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop12: `https://maps.googleapis.com/maps/api/staticmap?center=51.5230,-0.1573&zoom=15&size=600x400&markers=color:red%7C51.5230,-0.1573&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop13: `https://maps.googleapis.com/maps/api/staticmap?center=51.5054,-0.0755&zoom=15&size=600x400&markers=color:red%7C51.5054,-0.0755&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop14: `https://maps.googleapis.com/maps/api/staticmap?center=51.4845,-0.2066&zoom=15&size=600x400&markers=color:red%7C51.4845,-0.2066&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop15: `https://maps.googleapis.com/maps/api/staticmap?center=51.5112,-0.1861&zoom=15&size=600x400&markers=color:red%7C51.5112,-0.1861&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`,
  prop16: `https://maps.googleapis.com/maps/api/staticmap?center=51.5364,-0.1370&zoom=15&size=600x400&markers=color:red%7C51.5364,-0.1370&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
};

// Properties data with consistent image sets
const propertiesData = {
  "properties": [
   
    {

      "id": "prop1",
      "type": "House",
      "bedrooms": 3,
      "price": 750000,
      "tenure": "Freehold",
      "description": "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland.",
      "longDescription": "<h3>Beautiful Family Home in Prime Location</h3><p>This charming three-bedroom semi-detached family home is perfectly situated just 0.5 miles from Petts Wood station, offering quick and convenient access to London via fast trains. The location provides easy walking distance to local shops, reputable schools, various bus routes, and the beautiful National Trust woodland - ideal for family walks and outdoor activities.</p>",
      "location": "Petts Wood Road, Petts Wood, Orpington BR5",
      "postcode": "BR5",
      "imageSet": "modernHouse",
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
      "imageSet": "luxuryApartment",
      "mapImage": mapImages.prop2,
      "coordinates": { "lat": 51.3675, "lng": 0.0984 },
      "added": { "month": "September", "day": 14, "year": 2022 }
    },
    {
      "id": "prop3",
      "type": "House",
      "bedrooms": 4,
      "price": 925000,
      "tenure": "Freehold",
      "description": "Stunning four bedroom detached family home in sought-after location. Recently renovated to highest standards with open-plan kitchen/diner, luxury bathrooms and south-facing garden.",
      "longDescription": "<h3>Luxury Detached Family Home</h3><p>This magnificent four-bedroom detached family home has been recently renovated to the highest standards and is situated in one of the area's most sought-after locations. The property combines contemporary design with practical family living.</p>",
      "location": "The Avenue, London NW1",
      "postcode": "NW1",
      "imageSet": "modernHouse",
      "mapImage": mapImages.prop3,
      "coordinates": { "lat": 51.5320, "lng": -0.1420 },
      "added": { "month": "March", "day": 22, "year": 2023 }
    },
    {
      "id": "prop4",
      "type": "Flat",
      "bedrooms": 1,
      "price": 325000,
      "tenure": "Leasehold",
      "description": "Modern one bedroom apartment in newly developed complex. Features balcony with city views, secure underground parking and access to gym and concierge services.",
      "longDescription": "<h3>Contemporary City Apartment</h3><p>This contemporary one-bedroom apartment is located within a prestigious newly developed complex, offering modern city living with premium amenities. The property has been finished to a high specification throughout.</p>",
      "location": "Riverside Drive, London SW15",
      "postcode": "SW15",
      "imageSet": "studioApartment",
      "mapImage": mapImages.prop4,
      "coordinates": { "lat": 51.4639, "lng": -0.2138 },
      "added": { "month": "June", "day": 8, "year": 2023 }
    },
    {
      "id": "prop5",
      "type": "House",
      "bedrooms": 5,
      "price": 1200000,
      "tenure": "Freehold",
      "description": "Impressive five bedroom Victorian terraced house with original period features. Recently extended to include large kitchen/diner and home office. Close to excellent schools.",
      "longDescription": "<h3>Victorian Family Residence</h3><p>This impressive five-bedroom Victorian terraced house beautifully combines original period features with contemporary living spaces. The property has been thoughtfully extended and refurbished to create a wonderful family home in a prime location close to excellent schools.</p>",
      "location": "Victoria Park Road, London E14",
      "postcode": "E14",
      "imageSet": "victorianHouse",
      "mapImage": mapImages.prop5,
      "coordinates": { "lat": 51.5145, "lng": -0.0145 },
      "added": { "month": "January", "day": 15, "year": 2024 }
    },
    {
      "id": "prop6",
      "type": "Flat",
      "bedrooms": 2,
      "price": 675000,
      "tenure": "Leasehold",
      "description": "Luxury two bedroom penthouse with panoramic river views. Features private roof terrace, underfloor heating and smart home technology throughout.",
      "longDescription": "<h3>Penthouse with River Views</h3><p>This exceptional two-bedroom penthouse offers luxury living with breathtaking panoramic river views. Located on the top floor of a prestigious development, the property features high-end finishes and premium amenities.</p>",
      "location": "Thames Quay, London SE1",
      "postcode": "SE1",
      "imageSet": "penthouse",
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
      "imageSet": "modernHouse",
      "mapImage": mapImages.prop7,
      "coordinates": { "lat": 51.5155, "lng": -0.1443 },
      "added": { "month": "November", "day": 20, "year": 2024 }
    },
    
   
    {
      "id": "prop8",
      "type": "House",
      "bedrooms": 4,
      "price": 895000,
      "tenure": "Freehold",
      "description": "Contemporary four bedroom townhouse with rooftop terrace. Features smart home automation, underfloor heating and secure garage.",
      "longDescription": "<h3>Modern Townhouse with Rooftop Terrace</h3><p>This stunning contemporary townhouse offers modern living with spectacular city views from its private rooftop terrace. The property has been designed with attention to detail and features high-quality finishes throughout.</p>",
      "location": "Baker Street, London W1",
      "postcode": "W1",
      "imageSet": "modernHouse",
      "mapImage": mapImages.prop8,
      "coordinates": { "lat": 51.5074, "lng": -0.1278 },
      "added": { "month": "February", "day": 10, "year": 2024 }
    },
    {
      "id": "prop9",
      "type": "Flat",
      "bedrooms": 1,
      "price": 425000,
      "tenure": "Leasehold",
      "description": "Bright one bedroom apartment in converted Victorian school. Features high ceilings, original features and communal garden.",
      "longDescription": "<h3>Character Apartment in Historic Building</h3><p>This unique one-bedroom apartment is located within a beautifully converted Victorian school building, retaining many original features while offering modern comforts. The property benefits from high ceilings, large windows, and access to a communal garden.</p>",
      "location": "Chelsea Bridge Road, London SW1",
      "postcode": "SW1",
      "imageSet": "luxuryApartment",
      "mapImage": mapImages.prop9,
      "coordinates": { "lat": 51.4893, "lng": -0.1444 },
      "added": { "month": "April", "day": 5, "year": 2024 }
    },
    {
      "id": "prop10",
      "type": "House",
      "bedrooms": 5,
      "price": 1350000,
      "tenure": "Freehold",
      "description": "Magnificent five bedroom Georgian townhouse with private garden and off-street parking. Original features throughout.",
      "longDescription": "<h3>Georgian Townhouse with Garden</h3><p>This magnificent Georgian townhouse offers elegant living in one of London's most prestigious areas. The property retains many original period features including cornices, fireplaces, and sash windows, while providing modern family accommodation.</p>",
      "location": "Kensington High Street, London W8",
      "postcode": "W8",
      "imageSet": "victorianHouse",
      "mapImage": mapImages.prop10,
      "coordinates": { "lat": 51.4625, "lng": -0.1690 },
      "added": { "month": "May", "day": 18, "year": 2024 }
    },
    {
      "id": "prop11",
      "type": "Flat",
      "bedrooms": 2,
      "price": 725000,
      "tenure": "Leasehold",
      "description": "Two bedroom luxury apartment with concierge and swimming pool. Features panoramic views and private balcony.",
      "longDescription": "<h3>Luxury Apartment with Amenities</h3><p>This exceptional two-bedroom apartment offers luxury living with access to premium amenities including 24-hour concierge, swimming pool, and gym. The property features panoramic city views and a private balcony.</p>",
      "location": "Canary Wharf, London E14",
      "postcode": "E14",
      "imageSet": "luxuryApartment",
      "mapImage": mapImages.prop11,
      "coordinates": { "lat": 51.4975, "lng": -0.1357 },
      "added": { "month": "March", "day": 30, "year": 2024 }
    },
    {
      "id": "prop12",
      "type": "House",
      "bedrooms": 3,
      "price": 950000,
      "tenure": "Freehold",
      "description": "Three bedroom semi-detached family home with extension and landscaped garden. Close to excellent schools and transport.",
      "longDescription": "<h3>Extended Family Home</h3><p>This beautifully extended three-bedroom semi-detached family home offers spacious living accommodation with a modern open-plan kitchen/diner extension. The property features a landscaped rear garden and is located close to excellent schools and transport links.</p>",
      "location": "Hampstead Heath, London NW3",
      "postcode": "NW3",
      "imageSet": "modernHouse",
      "mapImage": mapImages.prop12,
      "coordinates": { "lat": 51.5230, "lng": -0.1573 },
      "added": { "month": "July", "day": 12, "year": 2024 }
    },
    {
      "id": "prop13",
      "type": "Flat",
      "bedrooms": 3,
      "price": 875000,
      "tenure": "Leasehold",
      "description": "Three bedroom duplex apartment with private terrace. Features modern kitchen, two bathrooms and secure parking.",
      "longDescription": "<h3>Duplex Apartment with Terrace</h3><p>This impressive three-bedroom duplex apartment offers flexible living accommodation across two floors, with a private terrace overlooking communal gardens. The property features a modern fitted kitchen, two bathrooms, and secure underground parking.</p>",
      "location": "Battersea Power Station, London SW11",
      "postcode": "SW11",
      "imageSet": "luxuryApartment",
      "mapImage": mapImages.prop13,
      "coordinates": { "lat": 51.5054, "lng": -0.0755 },
      "added": { "month": "January", "day": 22, "year": 2024 }
    },
    {
      "id": "prop14",
      "type": "House",
      "bedrooms": 6,
      "price": 1850000,
      "tenure": "Freehold",
      "description": "Six bedroom detached family home with swimming pool and tennis court. Set in private gated development.",
      "longDescription": "<h3>Luxury Family Estate</h3><p>This exceptional six-bedroom detached family home is set within a private gated development and offers luxurious living with extensive grounds including swimming pool and tennis court. The property features multiple reception rooms, a cinema room, and staff accommodation.</p>",
      "location": "Richmond Park, London TW10",
      "postcode": "TW10",
      "imageSet": "modernHouse",
      "mapImage": mapImages.prop14,
      "coordinates": { "lat": 51.4845, "lng": -0.2066 },
      "added": { "month": "December", "day": 8, "year": 2023 }
    },
    {
      "id": "prop15",
      "type": "Flat",
      "bedrooms": 2,
      "price": 550000,
      "tenure": "Leasehold",
      "description": "Two bedroom modern apartment with river views. Features balcony, allocated parking and lift access.",
      "longDescription": "<h3>River View Apartment</h3><p>This modern two-bedroom apartment offers stunning river views from its private balcony. The property features a contemporary fitted kitchen, allocated parking space, and secure lift access to all floors.</p>",
      "location": "Greenwich Peninsula, London SE10",
      "postcode": "SE10",
      "imageSet": "luxuryApartment",
      "mapImage": mapImages.prop15,
      "coordinates": { "lat": 51.5112, "lng": -0.1861 },
      "added": { "month": "September", "day": 25, "year": 2024 }
    },
    {
      "id": "prop16",
      "type": "House",
      "bedrooms": 4,
      "price": 1100000,
      "tenure": "Freehold",
      "description": "Four bedroom Victorian villa with coach house. Features original fireplaces, high ceilings and mature garden.",
      "longDescription": "<h3>Victorian Villa with Coach House</h3><p>This impressive four-bedroom Victorian villa offers characterful living with many original features including fireplaces, cornicing, and high ceilings. The property benefits from a separate coach house suitable for home office or guest accommodation, and a mature private garden.</p>",
      "location": "Islington, London N1",
      "postcode": "N1",
      "imageSet": "victorianHouse",
      "mapImage": mapImages.prop16,
      "coordinates": { "lat": 51.5364, "lng": -0.1370 },
      "added": { "month": "August", "day": 15, "year": 2024 }
    }
  ]
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
    // Add status and other missing fields to properties with consistent images
    const enhancedProperties = propertiesData.properties.map(property => {
      const imageSet = propertyImageSets[property.imageSet] || propertyImageSets.modernHouse;
      const floorPlan = property.type === 'House' ? floorPlanImages.house : floorPlanImages.flat;
      
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
        image: imageSet[0],
        picture: imageSet[0],
        gallery: imageSet,
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
      'House': ['Garden', 'Parking', 'Modern Kitchen', 'Double Glazing', 'Gas Central Heating'],
      'Flat': ['Modern Kitchen', 'Security', 'Double Glazing', 'Lift Access', 'Concierge']
    };
    
    const typeFeatures = baseFeatures[property.type] || baseFeatures['House'];
    const additionalFeatures = [];
    
    if (property.bedrooms >= 4) additionalFeatures.push('Large Garden');
    if (property.price > 800000) additionalFeatures.push('Luxury Finish');
    if (property.tenure === 'Freehold') additionalFeatures.push('Freehold');
    if (property.bedrooms > 3) additionalFeatures.push('Multiple Bathrooms');
    if (property.imageSet === 'penthouse') additionalFeatures.push('Panoramic Views', 'Private Terrace');
    if (property.imageSet === 'victorianHouse') additionalFeatures.push('Original Features', 'Period Charm');
    
    return [...typeFeatures, ...additionalFeatures];
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
            
            <Route path="/property/:id" element={
              <PropertyDetail 
                properties={properties}
                favourites={favourites}
                onToggleFavourite={handleAddFavourite}
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
