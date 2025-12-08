import { useState } from 'react'
import '../styles/ContactSection.css'
import linkedinIcon from '../assets/icons/linkedin.svg'
import githubIcon from '../assets/icons/github.svg'
import xIcon from '../assets/icons/x.svg'
import facebookIcon from '../assets/icons/facebook.svg'

// ✅ Define the type for formData
type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactSection() {
  // ✅ Apply the type to useState
  const [formData, setFormData] = useState<ContactFormData>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        console.error('Error:', data.message)
        alert('Error sending message. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Error sending message. Please try again.')
    }
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
              <strong>📧 Email:</strong>
              <p><a href="mailto:marloncopilot@gmail.com">marloncopilot@gmail.com</a></p>
            </div>
            <div className="info-item">
              <strong>📞 Phone:</strong>
              <p><a href="tel:+639948180273">+63 994 818 0273</a></p>
            </div>
            <div className="info-item">
              <strong>📍 Location:</strong>
              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d123723.61961435794!2d121.0104661!3d14.2903226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d5b87c111e25%3A0xab8cb698f840321f!2sDasmari%C3%B1as%2C%20Cavite!5e0!3m2!1sen!2sph!4v1765126831453!5m2!1sen!2sph"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dasmariñas, Cavite"
                ></iframe>
              </div>
            </div>

            <h3>Follow Me</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/marlon-isaguirre-jr-414683393" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                LinkedIn
              </a>
              <a href="https://github.com/ProgMarlon" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={githubIcon} alt="GitHub" className="social-icon" />
                GitHub
              </a>
              <a href="#" className="social-link">
                <img src={xIcon} alt="X" className="social-icon" />
                X
              </a>
              <a href="https://www.facebook.com/marloncisaguirrejr" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
                Facebook
              </a>
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