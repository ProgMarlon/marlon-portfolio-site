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
import FloatingObject from './components/FloatingObject'

function App() {
  return (
    <div className="app">
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      <Footer />
      <FloatingObject />
    </div>
  )
}

export default App
