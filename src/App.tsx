import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import ResumeSection from './components/ResumeSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="app">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && <HeroSection />}
      {activeSection === 'about' && <AboutSection />}
      {activeSection === 'projects' && <ProjectsSection />}
      {activeSection === 'services' && <ServicesSection />}
      {activeSection === 'testimonials' && <TestimonialsSection />}
      {activeSection === 'resume' && <ResumeSection />}
      {activeSection === 'contact' && <ContactSection />}
      
      <Footer />
    </div>
  )
}

export default App
