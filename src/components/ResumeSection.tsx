import '../styles/ResumeSection.css'

export default function ResumeSection() {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <h2>Professional Journey</h2>
        
        <div className="resume-content">
          <div className="resume-section">
            <h3>Education</h3>
            <div className="resume-item">
              <h4>Bachelor of Science in Information Technology</h4>
              <p className="school">Cavite State University — Don Severino de las Alas Campus</p>
              <p className="date">2023 — Present</p>
              <p className="description">Specializing in Web Development and Software Engineering. Core coursework includes Database Management, Systems Analysis, and Advanced Web Technologies.</p>
            </div>
          </div>

          <div className="resume-section">
            <h3>Experience</h3>
            <div className="resume-item">
              <h4>Full-Stack Developer (Freelance)</h4>
              <p className="company">Independent Projects</p>
              <p className="date">2023 — Present</p>
              <p className="description">Delivering custom MERN stack solutions for diverse clients. Focused on optimizing web performance and integrating third-party APIs to solve real-world business challenges.</p>
            </div>
            <div className="resume-item">
              <h4>Technical Lead & Architect</h4>
              <p className="company">Academic Projects (StockSense & MarBot)</p>
              <p className="date">2024 — 2025</p>
              <p className="description">Engineered complex systems including AI-integrated assistants and predictive analytics engines. Led the transition from monolithic to microservices architecture for improved scalability.</p>
            </div>
          </div>

          <div className="resume-download">
            <a href="/Isaguirre_CV.pdf" download="Isaguirre_CV.pdf" className="download-button">Download Full CV (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  )
}
