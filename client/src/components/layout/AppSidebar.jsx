import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import LoadingSkeleton from '../ui/LoadingSkeleton'
import ThemeToggle from '../ui/ThemeToggle'
import { LogOut, Trash2, X } from 'lucide-react'
import api from '../../services/api'

export default function AppSidebar({ isOpen, setIsOpen, isMobile }) {
  const [conversations, setConversations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingIds, setDeletingIds] = useState(new Set())
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get('/conversations')
      setConversations(response.data)
    } catch (err) {
      setError('Failed to load conversations')
      console.error('Error fetching conversations:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteConversation = async (conversationId, e) => {
    e.preventDefault()
    e.stopPropagation()

    if (deletingIds.has(conversationId)) return

    try {
      setDeletingIds(prev => new Set(prev).add(conversationId))
      
      await api.delete(`/conversations/${conversationId}`)

      // Remove from local state
      setConversations(prev => prev.filter(conv => conv.id !== conversationId))

      // If we're currently viewing this conversation, redirect to home
      if (location.pathname === `/c/${conversationId}`) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error deleting conversation:', error)
      setError('Failed to delete conversation')
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(conversationId)
        return newSet
      })
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-900 text-white rounded-tr-3xl rounded-br-3xl dark:bg-[#111111]">
      {/* Header */}
      <div className="pt-3 pb-3 md:pt-6 md:pb-3 md:pl-2 md:pr-2 bg-neutral-100 md:bg-transparent dark:bg-neutral-900 md:dark:bg-transparent rounded-tr-3xl flex items-center justify-between">
        <h1 className="md:text-white text-black dark:text-white text-center text-2xl font-bold flex-1">
          Chats
        </h1>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-black dark:text-white md:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-sm text-red-500 p-2">{error}</div>
        ) : conversations.length === 0 ? (
          <div className="text-sm text-gray-400 p-2">Your inbox is emptier than my DMs.</div>
        ) : (
          conversations.map((convo) => (
            <div key={convo.id} className="relative mb-2">
              <Link 
                to={`/c/${convo.id}`} 
                className="block p-3 pr-12 rounded-3xl text-center md:text-white hover:bg-neutral-800 transition-colors"
                title={convo.title}
                onClick={() => isMobile && setIsOpen(false)}
              >
                {convo.title}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 h-8 w-8"
                onClick={(e) => handleDeleteConversation(convo.id, e)}
                disabled={deletingIds.has(convo.id)}
                title="Delete Chat"
              >
                {deletingIds.has(convo.id) ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                ) : (
                  <Trash2 size={16} />
                )}
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-neutral-100 dark:bg-neutral-900 md:bg-transparent md:dark:bg-transparent rounded-br-3xl p-2">
        <div className="flex p-2 bg-neutral-200 rounded-2xl gap-4 items-center w-full justify-center dark:bg-neutral-800 md:bg-neutral-800">
          <Avatar user={user} />
          <Button 
            onClick={handleLogout}
            className="hover:cursor-pointer bg-white hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 md:bg-neutral-700 md:hover:bg-neutral-600"
            title="Logout"
            size="icon"
            variant="outline"
          >
            <LogOut className="stroke-black dark:stroke-white md:stroke-white"/>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
        
        {/* Mobile sidebar */}
        <div className={`
          fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {sidebarContent}
        </div>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block w-64 h-full">
      {sidebarContent}
    </div>
  )
}

AppSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
}