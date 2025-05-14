import React from 'react';
import '../styles/About.css';

function About() {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      role: "CEO, Tech Innovations",
      text: "This platform has transformed how we approach our projects. The team's dedication to excellence is unmatched.",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=1"
    },
    {
      id: 2,
      name: "John Smith",
      role: "Developer",
      text: "As a developer, I appreciate the clean code and intuitive design. Makes my job so much easier\!",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=2"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Product Manager",
      text: "The attention to detail and user experience focus has helped us deliver better products to our customers.",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=3"
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "CTO, Future Tech",
      text: "The scalability and performance of this solution exceeded our expectations. Highly recommended for growing businesses.",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=4"
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "UX Designer",
      text: "As someone obsessed with user experience, I'm impressed by the thoughtful design choices throughout the entire platform.",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=5"
    },
    {
      id: 6,
      name: "Robert Garcia",
      role: "Startup Founder",
      text: "This platform helped us launch faster and with higher quality than we thought possible with our limited resources.",
      avatar: "https://randomimages.org/api/random?width=100&height=100&id=6"
    }
  ];

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>We're a passionate team dedicated to creating amazing experiences.</p>
      </section>

      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide innovative solutions that help businesses grow and succeed in the digital age.
          We believe in combining cutting-edge technology with thoughtful design to create products that people love.
        </p>
      </section>

      <section className="testimonials-section">
        <h2>What People Say About Us</h2>
        <div className="testimonials-container">
          <div className="testimonials-intro">
            <p>Our clients and partners love working with us. Here's what they have to say about their experience:</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <p className="testimonial-author">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
EOL < /dev/null
