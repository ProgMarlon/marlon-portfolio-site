import { useState, useEffect } from 'react'
import '../styles/Navigation.css'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const sections = ['home', 'about', 'projects', 'services', 'testimonials', 'resume', 'contact']

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('section')
      let current = 'home'

      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop
        // 100px offset for the sticky header
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || 'home'
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          <span>Marlon C. Isaguirre Jr.</span>
        </a>
        
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
