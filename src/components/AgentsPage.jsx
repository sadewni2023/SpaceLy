import React from 'react';

const AgentsPage = () => {
  const agents = [
    {
      id: 1,
      name: "John Smith",
      position: "Senior Property Consultant",
      experience: "12 years",
      speciality: "Luxury Homes & Investments",
      bio: "John specializes in high-end residential properties and investment opportunities. With over a decade of experience, he has helped hundreds of clients find their perfect homes.",
      phone: "+44 20 1234 5678",
      email: "john.smith@estateagent.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400&auto=format&fit=crop",
      propertiesSold: 320,
      rating: 4.9
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Managing Director",
      experience: "15 years",
      speciality: "Commercial & Residential",
      bio: "Sarah oversees all agency operations and specializes in both commercial and residential properties. She's known for her exceptional negotiation skills.",
      phone: "+44 20 1234 5679",
      email: "sarah.johnson@estateagent.com",
      image: "https://img.freepik.com/premium-photo/american-female-real-estate-agent-suit_1106493-267934.jpg",
      propertiesSold: 450,
      rating: 4.8
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Head of Sales",
      experience: "10 years",
      speciality: "New Developments",
      bio: "Michael has extensive experience with new build properties and developments. He works closely with developers and investors.",
      phone: "+44 20 1234 5680",
      email: "michael.chen@estateagent.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-400&auto=format&fit=crop",
      propertiesSold: 280,
      rating: 4.9
    },
    {
      id: 4,
      name: "Emma Wilson",
      position: "Lettings Manager",
      experience: "8 years",
      speciality: "Rental Properties",
      bio: "Emma manages our rental portfolio and specializes in finding perfect tenants for landlords and ideal homes for renters.",
      phone: "+44 20 1234 5681",
      email: "emma.wilson@estateagent.com",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w-400&auto=format&fit=crop",
      propertiesSold: 210,
      rating: 4.7
    },
    {
      id: 5,
      name: "David Park",
      position: "Property Valuer",
      experience: "9 years",
      speciality: "Property Valuation",
      bio: "David provides accurate property valuations and market analysis. His expertise helps clients make informed decisions.",
      phone: "+44 20 1234 5682",
      email: "david.park@estateagent.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w-400&auto=format&fit=crop",
      propertiesSold: 180,
      rating: 4.8
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      position: "First-Time Buyer Specialist",
      experience: "6 years",
      speciality: "First-Time Buyers",
      bio: "Lisa specializes in helping first-time buyers navigate the property market. She guides clients through every step of the process.",
      phone: "+44 20 1234 5683",
      email: "lisa.rodriguez@estateagent.com",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w-400&auto=format&fit=crop",
      propertiesSold: 150,
      rating: 4.9
    },
    {
      id: 7,
      name: "James Miller",
      position: "International Properties",
      experience: "11 years",
      speciality: "Overseas Investments",
      bio: "James handles international property investments and helps clients build global property portfolios.",
      phone: "+44 20 1234 5684",
      email: "james.miller@estateagent.com",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w-400&auto=format&fit=crop",
      propertiesSold: 190,
      rating: 4.7
    },
    {
      id: 8,
      name: "Rachel Green",
      position: "Property Manager",
      experience: "7 years",
      speciality: "Property Management",
      bio: "Rachel manages our property maintenance and tenant relations, ensuring all properties are well-maintained.",
      phone: "+44 20 1234 5685",
      email: "rachel.green@estateagent.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w-400&auto=format&fit=crop",
      propertiesSold: 120,
      rating: 4.8
    }
  ];

  return (
    <div className="agents-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Meet Our Expert Agents</h1>
          <p className="page-subtitle">Professional guidance for your property journey</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="agents-intro">
            <h2>Why Work With Our Agents?</h2>
            <p>
              Our team of experienced property professionals brings together decades of 
              collective experience in the real estate market. Each agent specializes in 
              different areas, ensuring you get expert advice tailored to your needs.
            </p>
          </div>

          <div className="agents-filter">
            <div className="filter-tabs">
              <button className="filter-tab active">All Agents</button>
              <button className="filter-tab">Sales</button>
              <button className="filter-tab">Lettings</button>
              <button className="filter-tab">Valuations</button>
              <button className="filter-tab">Management</button>
            </div>
          </div>

          <div className="agents-grid">
            {agents.map(agent => (
              <div key={agent.id} className="agent-card">
                <div className="agent-image">
                  <img src={agent.image} alt={agent.name} />
                  <div className="agent-badge">
                    <span className="rating">⭐ {agent.rating}</span>
                  </div>
                </div>
                
                <div className="agent-content">
                  <h3>{agent.name}</h3>
                  <p className="agent-position">{agent.position}</p>
                  
                  <div className="agent-stats">
                    <div className="stat">
                      <span className="stat-label">Experience:</span>
                      <span className="stat-value">{agent.experience}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Properties Sold:</span>
                      <span className="stat-value">{agent.propertiesSold}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Speciality:</span>
                      <span className="stat-value">{agent.speciality}</span>
                    </div>
                  </div>
                  
                  <p className="agent-bio">{agent.bio}</p>
                  
                  <div className="agent-contact">
                    <div className="contact-info">
                      <span className="contact-label">Phone:</span>
                      <span className="contact-value">{agent.phone}</span>
                    </div>
                    <div className="contact-info">
                      <span className="contact-label">Email:</span>
                      <span className="contact-value">{agent.email}</span>
                    </div>
                  </div>
                  
                  <div className="agent-actions">
                    <button className="btn btn-primary">View Properties</button>
                    <button className="btn btn-secondary">Contact Agent</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="agents-cta">
            <h2>Can't Find the Right Agent?</h2>
            <p>Contact our team and we'll match you with the perfect agent for your needs.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Contact Us</button>
              <button className="btn btn-secondary">Book Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;