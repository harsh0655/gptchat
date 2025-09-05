import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import ChatLayout from '../components/layout/ChatLayout'
import Container from '../components/layout/Container'
import MessageInput from '../components/layout/MessageInput'
import TextInput from '../components/input/TextInput'
import SendButton from '../components/input/SendButton'
import UserBubble from '../components/chat/UserBubble'
import SystemBubble from '../components/chat/SystemBubble'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import api from '../services/api'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()

  const handleSend = async () => {
    if (isSending || input.trim() === '') return
    
    const userMessage = {
      id: `temp-${Date.now()}`,
      content: input,
      messageType: 'user',
      createdAt: new Date().toISOString(),
    }

    const aiMessage = {
      id: `temp-ai-${Date.now()}`,
      content: '',
      messageType: 'assistant',
      createdAt: new Date().toISOString(),
    }

    // Optimistically add messages to show immediately
    setMessages([userMessage, aiMessage])
    const currentInput = input
    setInput('')
    setIsSending(true)

    try {
      const response = await api.post('/messages', {
        content: currentInput
      })

      if (response.data.conversationId) {
        // Store optimistic messages in sessionStorage to avoid blank screen
        sessionStorage.setItem(
          `optimistic-${response.data.conversationId}`, 
          JSON.stringify([userMessage, aiMessage])
        )
        
        // Redirect to the conversation page where the real messages will be shown
        navigate(`/c/${response.data.conversationId}`)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      // Reset state on error
      setMessages([])
      setInput(currentInput)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Container>
      <Header>YAPPIE</Header>
      <ChatLayout>
        {messages.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-center text-xl text-neutral-500 select-none">
            No messages yet. Let&apos;s change that.
          </div>
        ) : (
          messages.map((msg) => (
            msg.messageType === 'user' ? (
              <UserBubble key={msg.id}>{msg.content}</UserBubble>
            ) : (
              <SystemBubble key={msg.id}>
                <LoadingSkeleton />
              </SystemBubble>
            )
          ))
        )}
      </ChatLayout>
      <MessageInput>
        <TextInput 
          isSending={isSending}
          onSend={handleSend}
          input={input}
          setInput={setInput}
        />
        <SendButton 
          isSending={isSending}
          setIsSending={setIsSending}
          onSend={handleSend}
        />
      </MessageInput>
    </Container>
  )
}