import '../styles/AboutSection.css'

export default function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">[Professional Photo]</div>
          </div>
          
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>Web Developer and BSIT student specializing in the MERN stack and Python. I build high-performance, accessible web applications, recently achieving a 20% reduction in load times through workflow optimization. I focus on bridging technical complexity with intuitive, user-centric experiences.</p>
            
            <h3>Core Competencies</h3>
            <div className="skills-grid">
              <div className="skill-card">Analytical Thinking</div>
              <div className="skill-card">Detail Oriented</div>
              <div className="skill-card">Process-Driven Development</div>
              <div className="skill-card">Problem Solving</div>
              <div className="skill-card">Collaborative Teamwork</div>
              <div className="skill-card">Effective Communication</div>
            </div>

            <h3>Technical Expertise</h3>
            <div className="skills-grid">
              <div className="skill-card">MERN Stack (MongoDB, Express, React, Node.js)</div>
              <div className="skill-card">Python & Data Libraries</div>
              <div className="skill-card">JavaScript (ES6+) & TypeScript</div>
              <div className="skill-card">Responsive HTML5 & CSS3</div>
              <div className="skill-card">PHP & MySQL Database Management</div>
              <div className="skill-card">RESTful API Integration & Git</div>
            </div>

            <h3>Location</h3>
            <p>- Based in Dasmariñas, Cavite, Philippines <br></br>
              - Connected to the growing tech community in Calabarzon<br></br>
              - Open to remote opportunities worldwide </p>
          </div>
        </div>
      </div>
    </section>
  )
}
