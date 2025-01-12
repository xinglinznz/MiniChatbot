// src/components/ChatBox.tsx
import { useState, useEffect } from 'react'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { Message } from '../types'
import { sendToDialogflow } from '../services/dialogflow'
import React from 'react'

const MAX_MESSAGES = 10  // Limited 10 messages for testing
const MESSAGE_EXPIRY = 5 * 60 * 1000  // 5 minutes

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fixed: Parse dates properly when loading messages
  useEffect(() => {
    const saved = localStorage.getItem('chat-messages')
    if (saved) {
      try {
        let savedMessages = JSON.parse(saved) as Message[]
        
        // Convert string dates back to Date objects
        savedMessages = savedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        
        // Remove expired messages
        const now = new Date().getTime()
        savedMessages = savedMessages.filter(msg => {
          const msgTime = msg.timestamp.getTime()
          return now - msgTime < MESSAGE_EXPIRY
        })

        // Keep only recent messages
        if (savedMessages.length > MAX_MESSAGES) {
          savedMessages = savedMessages.slice(-MAX_MESSAGES)
        }

        setMessages(savedMessages)
        localStorage.setItem('chat-messages', JSON.stringify(savedMessages))
      } catch (e) {
        console.error('Error loading messages:', e)
      }
    }
  }, [])

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {  // Only save if we have messages
      const msgsToSave = messages.slice(-MAX_MESSAGES)
      localStorage.setItem('chat-messages', JSON.stringify(msgsToSave))
    }
  }, [messages])

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev.slice(-MAX_MESSAGES + 1), userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendToDialogflow(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev.slice(-MAX_MESSAGES + 1), botMessage])
    } catch (error) {
      setError('Message failed to send')
      console.error(error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2>Mini Chatbot</h2>
        <button onClick={() => {
          setMessages([])
          localStorage.removeItem('chat-messages')
        }} className="clear-btn">
          Clear
        </button>
      </div>
      <MessageList messages={messages} />
      {error && <div className="error">{error}</div>}
      <MessageInput onSend={handleSendMessage} disabled={isLoading} />
      {isLoading && <div className="typing">Bot is typing...</div>}
    </div>
  )
}

export default ChatBox