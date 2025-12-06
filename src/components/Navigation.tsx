import { useState } from 'react'
import '../styles/Navigation.css'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const sections = ['home', 'about', 'projects', 'services', 'testimonials', 'resume', 'contact']

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Marlon C. Isaguirre Jr.</span>
        </div>
        
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {sections.map((section) => (
            <a
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
