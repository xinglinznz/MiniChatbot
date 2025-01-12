import { useState } from 'react'

//Props interface for the MessageInput component
interface MessageInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

// A text input for sending messages
const MessageInput = ({ onSend, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('')

  // Handle form submission when send button is clicked
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }
 
  // Add "Enter" keypress for quick send submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
      />
      <button type="submit" disabled={!message.trim() || disabled}>
        Send
      </button>
    </form>
  )
}

export default MessageInput