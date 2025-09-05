import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import ChatLayout from '../components/layout/ChatLayout'
import Container from '../components/layout/Container'
import MessageInput from '../components/layout/MessageInput'
import TextInput from '../components/input/TextInput'
import SendButton from '../components/input/SendButton'
import UserBubble from '../components/chat/UserBubble'
import SystemBubble from '../components/chat/SystemBubble'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import WordFadeIn from '../components/chat/WordFadeIn'
import ReactMarkdown from 'react-markdown'
import api from '../services/api'

export default function ChatPage() {
  const { id } = useParams()
  const [isSending, setIsSending] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)
  const [latestAssistantMessageId, setLatestAssistantMessageId] = useState(null)

  useEffect(() => {
    // Check for optimistic messages in sessionStorage
    const optimisticKey = `optimistic-${id}`
    const optimisticData = sessionStorage.getItem(optimisticKey)
    
    if (optimisticData) {
      try {
        const optimisticMessages = JSON.parse(optimisticData)
        setMessages(optimisticMessages)
        // Clean up the sessionStorage
        sessionStorage.removeItem(optimisticKey)
      } catch (err) {
        console.error('Error parsing optimistic messages:', err)
      }
    }

    fetchMessages()
  }, [id])

  // Track the latest assistant message for word fade-in effect
  useEffect(() => {
    const assistantMessages = messages.filter(msg => msg.messageType === 'assistant' && msg.content !== '')
    if (assistantMessages.length > 0) {
      const latest = assistantMessages[assistantMessages.length - 1]
      setLatestAssistantMessageId(latest.id)
    }
  }, [messages])

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages for conversation:', id)
      const response = await api.get(`/messages?conversationId=${id}`)
      
      if (response.data.messages) {
        console.log('Setting messages:', response.data.messages)
        setMessages(response.data.messages)
        setError(null)
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError(err.response?.data?.error || 'Failed to load messages')
    }
  }

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

    // Optimistically add messages
    setMessages(prev => [...prev, userMessage, aiMessage])
    setInput('')
    setIsSending(true)
    setError(null)
    
    try {
      const response = await api.post('/messages', {
        content: input,
        conversationId: id
      })
      
      // Replace temporary messages with real ones
      setMessages(prev => 
        prev.map(msg => {
          if (msg.id === userMessage.id) return response.data.message
          if (msg.id === aiMessage.id) return response.data.aiMessage
          return msg
        })
      )
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send message')
      
      // Remove temporary messages on error
      setMessages(prev => 
        prev.filter(msg => msg.id !== userMessage.id && msg.id !== aiMessage.id)
      )
      
      // Restore input
      setInput(userMessage.content)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Container>
      <Header>YAPPIE</Header>
      <ChatLayout>
        {error && (
          <div className="text-red-500 text-center p-2 bg-red-100 rounded">
            {error}
          </div>
        )}
        {messages.map((msg) => (
          msg.messageType === 'user' ? (
            <UserBubble key={msg.id}>{msg.content}</UserBubble>
          ) : (
            <SystemBubble 
              key={msg.id}
              useWordFadeIn={msg.id === latestAssistantMessageId && msg.content !== ''}
              content={msg.content}
            >
              {msg.content === '' ? (
                <LoadingSkeleton />
              ) : (
                <div className="prose break-words max-w-full whitespace-pre-wrap">
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
            </SystemBubble>
          )
        ))}
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