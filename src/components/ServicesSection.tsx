import '../styles/ServicesSection.css'

export default function ServicesSection() {
  const services = [
    { id: 1, title: '[Service 1]', description: '[Service description and details]' },
    { id: 2, title: '[Service 2]', description: '[Service description and details]' },
    { id: 3, title: '[Service 3]', description: '[Service description and details]' },
    { id: 4, title: '[Service 4]', description: '[Service description and details]' },
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Services</h2>
        <p className="section-subtitle">What I offer to help your business</p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">📋</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
