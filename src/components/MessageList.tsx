import { useEffect, useRef } from 'react'
import { Message } from '../types'

interface MessageListProps {
  messages: Message[] // Array of message objectives to display
}

// Interface for group messages by date
interface MessageGroup {
  date: string
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add Message timestamps
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  // Add the date of messages
  const getMessageDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  // Group messages by date
  const groupedMessages: MessageGroup[] = messages.reduce((groups: MessageGroup[], msg) => {
    const date = getMessageDate(msg.timestamp)
    const group = groups.find(g => g.date === date)
    
    if (group) {
      group.messages.push(msg)
    } else {
      groups.push({ date, messages: [msg] })
    }
    
    return groups
  }, [])

  // In MessageList.tsx, update the date divider rendering
  return (
    <div className="message-list">
      {groupedMessages.map(group => (
        <div key={group.date}>
          <div className="date-divider">
            <span className="date-text">{group.date}</span>
          </div>
          {group.messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          ))}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList