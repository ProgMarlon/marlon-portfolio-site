import '../styles/TestimonialsSection.css'

export default function TestimonialsSection() {
  const testimonials = [
    { 
      id: 1, 
      quote: '[Client testimonial and feedback about your work]', 
      author: '[Client Name]',
      title: '[Client Title/Company]'
    },
    { 
      id: 2, 
      quote: '[Client testimonial and feedback about your work]', 
      author: '[Client Name]',
      title: '[Client Title/Company]'
    },
    { 
      id: 3, 
      quote: '[Client testimonial and feedback about your work]', 
      author: '[Client Name]',
      title: '[Client Title/Company]'
    },
  ]

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2>Testimonials</h2>
        <p className="section-subtitle">What my clients and colleagues say about working with me</p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">— {testimonial.author}</p>
              <p className="title">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
