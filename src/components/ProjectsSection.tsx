import '../styles/ProjectsSection.css'

export default function ProjectsSection() {
  const projects = [
    { 
      id: 1, 
      title: 'MarBot2000: AI Assistant', 
      description: 'An intelligent virtual assistant powered by Gemini 2.5 Flash. Features persistent message history via LocalStorage and a highly responsive, custom-built chat interface.', 
      image: '🤖 AI & Chatbot', 
      role: 'Full-Stack Developer',
      link: '#'
    },
    { 
      id: 2, 
      title: 'StockSense Forecast System', 
      description: 'A microservices application that uses a Python FastAPI engine to predict inventory needs based on sales data. Built with React and Node.js for seamless data visualization.', 
      image: '📊 Data Analytics', 
      role: 'System Architect',
      link: '#'
    },
    { 
      id: 3, 
      title: 'High-Performance Portfolio', 
      description: 'A modern, accessible (WCAG AA) portfolio optimized for speed. Achieved a 20% reduction in load times through lazy loading, image optimization, and clean code practices.', 
      image: '🚀 Optimization', 
      role: 'Frontend Lead',
      link: '#'
    },
    { 
      id: 4, 
      title: 'Secure MERN API', 
      description: 'A robust backend infrastructure featuring JWT authentication, MongoDB integration, and automated verification workflows using Node.js and Nodemailer.', 
      image: '🛡️ Backend Security', 
      role: 'Backend Developer',
      link: '#'
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Featured Work</h2>
        <p className="section-subtitle">Real-world applications focused on performance and intelligence</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-placeholder">{project.image}</div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-role"><strong>Focus:</strong> {project.role}</div>
                <a href={project.link} className="project-link">Explore Project <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
