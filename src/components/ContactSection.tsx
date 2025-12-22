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
                <p>Dasmariñas, Cavite, Philippines</p>
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=120.8864%2C14.2796%2C120.9864%2C14.3796&amp;layer=mapnik&amp;marker=14.3296%2C120.9364"
                  style={{ border: 0 }}
                  title="Dasmariñas, Cavite"
                ></iframe>
                <br />
                <small>
                  <a href="https://www.openstreetmap.org/?mlat=14.3296&amp;mlon=120.9364#map=13/14.3296/120.9364" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>
                    View Larger Map
                  </a>
                </small>
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
              <a href="https://x.com/MarBot2000" target="_blank" rel="noopener noreferrer" className="social-link">
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
            {submitted && <p className="success-message">Message sent successfully!<br>Please verify your email. Check your inbox or spam section.</br></p>}
          </form>
        </div>
      </div>
    </section>
  )
}