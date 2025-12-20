import { useState, useEffect, useRef } from 'react'
import '../styles/ChatWindow.css'

interface ChatWindowProps {
  onClose: () => void
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Marlon's virtual assistant. Ask me about his skills, projects, or how to contact him!", sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const historyPayload = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text, 
          history: historyPayload 
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'bot'
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.message || 'API Error');
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "The server is taking too long to respond. It might be under heavy load. Please try again in a few seconds.",
          sender: 'bot'
        }
        setMessages(prev => [...prev, errorMessage])
      } else {
        console.error('Chat Error:', error);
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: `Error: ${error.message}. Please check your internet or if the site is still deploying.`,
          sender: 'bot'
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-title">MarlonBot AI</span>
        <button onClick={onClose} className="close-btn" aria-label="Close Chat">×</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot typing-indicator">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  )
}
