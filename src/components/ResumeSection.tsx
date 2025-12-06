import '../styles/ResumeSection.css'

export default function ResumeSection() {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <h2>Resume & Experience</h2>
        
        <div className="resume-content">
          <div className="resume-section">
            <h3>Education</h3>
            <div className="resume-item">
              <h4>[Degree Name]</h4>
              <p className="school">[School/University Name]</p>
              <p className="date">[Graduation Year]</p>
              <p className="description">[Relevant coursework or achievements]</p>
            </div>
            <div className="resume-item">
              <h4>[Degree Name]</h4>
              <p className="school">[School/University Name]</p>
              <p className="date">[Graduation Year]</p>
              <p className="description">[Relevant coursework or achievements]</p>
            </div>
          </div>

          <div className="resume-section">
            <h3>Experience</h3>
            <div className="resume-item">
              <h4>[Job Title]</h4>
              <p className="company">[Company Name]</p>
              <p className="date">[Start Date] - [End Date]</p>
              <p className="description">[Key responsibilities and achievements]</p>
            </div>
            <div className="resume-item">
              <h4>[Job Title]</h4>
              <p className="company">[Company Name]</p>
              <p className="date">[Start Date] - [End Date]</p>
              <p className="description">[Key responsibilities and achievements]</p>
            </div>
          </div>

          <div className="resume-download">
            <a href="#" className="download-button">Download Full Resume (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  )
}
