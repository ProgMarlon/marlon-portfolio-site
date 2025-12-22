import '../styles/TestimonialsSection.css'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2>Let's Build Something Great Together</h2>
        <p className="section-subtitle">Transforming ideas into high-performance digital reality</p>
        
        <div className="cta-card">
          <div className="cta-icon">🚀</div>
          <h3>Ready to start your next project?</h3>
          <p>
            I am currently open to new opportunities and freelance collaborations. 
            Whether you need a scalable full-stack application, a custom API integration, 
            or a performance-optimized web experience, I am ready to help you succeed.
          </p>
          <div className="cta-features">
            <div className="feature-item">
              <span className="feature-check">✓</span>
              <span>Modern MERN Stack Development</span>
            </div>
            <div className="feature-item">
              <span className="feature-check">✓</span>
              <span>Mobile-First Responsive Design</span>
            </div>
            <div className="feature-item">
              <span className="feature-check">✓</span>
              <span>Clean, Maintainable & Secure Code</span>
            </div>
          </div>
          <a href="#contact" className="cta-link-button">Become My Client</a>
        </div>
      </div>
    </section>
  )
}