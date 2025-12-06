import '../styles/ProjectsSection.css'

export default function ProjectsSection() {
  const projects = [
    { id: 1, title: '[Project 1]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
    { id: 2, title: '[Project 2]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
    { id: 3, title: '[Project 3]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
    { id: 4, title: '[Project 4]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
    { id: 5, title: '[Project 5]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
    { id: 6, title: '[Project 6]', description: '[Project description]', image: '[Image/Demo Link]', role: '[Your role]' },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <p className="section-subtitle">Showcase of my strongest and most relevant work</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-placeholder">{project.image}</div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-role"><strong>My Role:</strong> {project.role}</p>
                <a href="#" className="project-link">View Project →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
