import { useState, useEffect, useRef } from 'react'
import '../styles/ChatWindow.css'
import pcGif from '../assets/3d-pc-analog.gif'

interface ChatWindowProps {
  onClose: () => void
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initialization
    const saved = localStorage.getItem('marbot_messages');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Hi! I'm MarBot2000, Marlon's virtual assistant. Ask me about his skills, projects, or how to contact him!", sender: 'bot' }
    ];
  })
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('marbot_messages', JSON.stringify(messages));
  }, [messages]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        // Optional: you can choose to close it here, or just ensure focus isn't lost.
        // Given your issue, closing it might be the cleanest UX fix.
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault()
    const messageText = customText || inputText;
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    if (!customText) setInputText('')
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

  const quickActions = [
    { label: "🚀 Projects", text: "Tell me about your projects" },
    { label: "🛠 Skills", text: "What is your tech stack?" },
    { label: "📧 Contact", text: "How can I contact you?" }
  ]

  return (
    <div className="chat-window" ref={chatRef}>
      <div className="chat-header">
        <div className="chat-header-content">
          <img src={pcGif} alt="" className="chat-header-gif" />
          <span className="chat-title">MarBot2000</span>
        </div>
        <div 
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation(); 
            onClose();
          }} 
          className="win-close-btn" 
          role="button"
          tabIndex={0}
          aria-label="Close"
          style={{ zIndex: 1000, position: 'relative' }} // Force z-index
        >
          ×
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot typing-indicator">MarBot2000 is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <div className="quick-actions">
          {quickActions.map(action => (
            <button 
              key={action.label} 
              className="action-btn"
              onClick={() => handleSend(undefined, action.text)}
            >
              {action.label}
            </button>
          ))}
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask MarBot2000..."
          />
        </form>
        <p className="ai-disclaimer">MarBot2000 may provide AI-generated content. Verify important details.</p>
      </div>
    </div>
  )
}
