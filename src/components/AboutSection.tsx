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
            <p>A quirked up asian boy who loves to code.</p>
            
            <h3>Soft Skills</h3>
            <div className="skills-grid">
              <div className="skill-card">[Detail Oriented]</div>
              <div className="skill-card">[Skill 2]</div>
              <div className="skill-card">[Skill 3]</div>
              <div className="skill-card">[Skill 4]</div>
              <div className="skill-card">[Skill 5]</div>
              <div className="skill-card">[Skill 6]</div>
            </div>

            <h3>Programming Knowledge</h3>
            <div className="skills-grid">
              <div className="skill-card">[HTML, CSS, PHP, JavaScript ]</div>
              <div className="skill-card">[MONGO DB, EXPRESS.JS, REACT.JS, NODE.JS ]</div>
              <div className="skill-card">[Python and its libraries]</div>
              <div className="skill-card">[Java]</div>
              <div className="skill-card">[Skill 5]</div>
              <div className="skill-card">[Skill 6]</div>
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
