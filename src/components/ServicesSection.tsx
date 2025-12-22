import '../styles/ServicesSection.css'

export default function ServicesSection() {
  const services = [
    { 
      id: 1, 
      icon: '💻',
      title: 'Full-Stack Web Development', 
      description: 'Building robust, scalable applications using the MERN stack. I deliver production-ready code that balances complex backend logic with intuitive, mobile-first frontend experiences.' 
    },
    { 
      id: 2, 
      icon: '🤖',
      title: 'AI & Chatbot Integration', 
      description: 'Implementing intelligent virtual assistants using modern LLMs. Enhance user engagement and automate 24/7 support with custom-trained AI interfaces tailored to your business needs.' 
    },
    { 
      id: 3, 
      icon: '🚀',
      title: 'Performance & SEO Strategy', 
      description: 'Optimizing for speed and search visibility. I specialize in achieving 90+ Lighthouse scores and have a proven record of reducing page load times by up to 20%.' 
    },
    { 
      id: 4, 
      icon: '📊',
      title: 'Data Visualization Solutions', 
      description: 'Converting complex datasets into interactive dashboards. I build predictive analytics tools using Python and React to help stakeholders make data-driven decisions.' 
    },
    { 
      id: 5, 
      icon: '📱',
      title: 'Social Media Management', 
      description: 'Strategic growth and content creation across all platforms. I handle management, paid ads, and analytics reporting to maximize your brand reach and engagement.' 
    },
    { 
      id: 6, 
      icon: '📈',
      title: 'Advanced SEO Optimization', 
      description: 'Comprehensive search engine strategies including keyword research, technical SEO, and link building to drive organic traffic and track performance metrics.' 
    },
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Services</h2>
        <p className="section-subtitle">Delivering measurable results through technical expertise</p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
