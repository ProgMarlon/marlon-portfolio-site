import { useState } from 'react'
import '../styles/ContactSection.css'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with your actual form submission logic
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Let's connect and discuss how I can help you</p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <strong>Email:</strong>
              <p><a href="mailto:marloncopilot@gmail.com">[marloncopilot@gmail.com]</a></p>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <p><a href="tel:+639948180273">[+63 994 818 0273]</a></p>
            </div>
            <div className="info-item">
              <strong>Location:</strong>
              <p>[Your Location]</p>
            </div>

            <h3>Follow Me</h3>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Portfolio</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
            {submitted && <p className="success-message">Message sent successfully!</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
