import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
    timeframe: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: '',
        budget: '',
        timeframe: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Our Office",
      details: ["123 Property Street", "London W1A 1AA", "United Kingdom"],
      link: "https://maps.google.com",
      linkText: "Get Directions"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["Main Office: +44 20 1234 5678", "Sales: +44 20 1234 5679", "Lettings: +44 20 1234 5680"],
      link: "tel:+442012345678",
      linkText: "Call Now"
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["General: info@estateagent.com", "Sales: sales@estateagent.com", "Support: support@estateagent.com"],
      link: "mailto:info@estateagent.com",
      linkText: "Send Email"
    },
    {
      icon: "🕒",
      title: "Opening Hours",
      details: ["Monday-Friday: 9am-6pm", "Saturday: 10am-4pm", "Sunday: 10am-2pm"],
      link: null,
      linkText: null
    }
  ];

  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer: "We aim to respond to all inquiries within 1 business hour during office hours."
    },
    {
      question: "Do I need to book a viewing in advance?",
      answer: "Yes, we recommend booking at least 24 hours in advance to ensure availability."
    },
    {
      question: "What areas do you cover?",
      answer: "We cover all London boroughs and surrounding areas. Contact us for specific locations."
    },
    {
      question: "Can I get a free property valuation?",
      answer: "Yes, we offer free, no-obligation property valuations. Book online or call us."
    }
  ];

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">We're here to help with all your property needs</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you within 1 business hour.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="property-inquiry">Property Inquiry</option>
                        <option value="valuation-request">Property Valuation</option>
                        <option value="viewing-booking">Book a Viewing</option>
                        <option value="sales-query">Sales Question</option>
                        <option value="lettings-query">Lettings Question</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertyType">Property Type (Optional)</label>
                    <div className="property-type-options">
                      <label>
                        <input
                          type="radio"
                          name="propertyType"
                          value="house"
                          checked={formData.propertyType === 'house'}
                          onChange={handleChange}
                        />
                        House
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="propertyType"
                          value="flat"
                          checked={formData.propertyType === 'flat'}
                          onChange={handleChange}
                        />
                        Flat
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="propertyType"
                          value="commercial"
                          checked={formData.propertyType === 'commercial'}
                          onChange={handleChange}
                        />
                        Commercial
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="propertyType"
                          value="land"
                          checked={formData.propertyType === 'land'}
                          onChange={handleChange}
                        />
                        Land
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget</option>
                        <option value="0-250k">£0 - £250,000</option>
                        <option value="250k-500k">£250,000 - £500,000</option>
                        <option value="500k-1m">£500,000 - £1,000,000</option>
                        <option value="1m+">£1,000,000+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="timeframe">Timeframe</label>
                      <select
                        id="timeframe"
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleChange}
                      >
                        <option value="">Select timeframe</option>
                        <option value="immediately">Immediately</option>
                        <option value="1-3months">1-3 Months</option>
                        <option value="3-6months">3-6 Months</option>
                        <option value="6months+">6+ Months</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us about your property needs..."
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
            
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                      {info.link && (
                        <a href={info.link} className="info-link">
                          {info.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="emergency-contact">
                <h3>Emergency Contact</h3>
                <p>For urgent property matters outside office hours:</p>
                <div className="emergency-info">
                  <span className="emergency-phone">📞 +44 7890 123456</span>
                  <span className="emergency-hours">(24/7 Emergency Line)</span>
                </div>
              </div>
              
              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">📘 Facebook</a>
                  <a href="#" className="social-link">📷 Instagram</a>
                  <a href="#" className="social-link">💼 LinkedIn</a>
                  <a href="#" className="social-link">🐦 Twitter</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="map-section">
            <h2>Find Our Office</h2>
            <div className="map-placeholder">
              <div className="map-content">
                <h3>123 Property Street, London W1A 1AA</h3>
                <p>Nearest tube stations: Oxford Circus (2 min walk), Bond Street (5 min walk)</p>
                <div className="map-actions">
                  <a 
                    href="https://maps.google.com/?q=123+Property+Street,+London+W1A+1AA" 
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;