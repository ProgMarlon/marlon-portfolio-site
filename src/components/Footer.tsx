import '../styles/Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Marlon C. Isaguirre Jr. All rights reserved.</p>
        <p>Built with React & Vite</p>
      </div>
    </footer>
  )
}
