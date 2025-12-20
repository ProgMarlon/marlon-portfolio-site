import { useState } from 'react'
import '../styles/FloatingObject.css'
import pcGif from '../assets/3d-pc-analog.gif'
import ChatWindow from './ChatWindow'

export default function FloatingObject() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="floating-object-container">
        <div className="floating-label">AI Chatbot</div>
        <img 
          src={pcGif} 
          alt="Chat with Marlon's Bot" 
          className="floating-pc"
          onClick={toggleChat}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleChat()
            }
          }}
          title="Click to chat!"
        />
      </div>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
