import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from '../ui/Card'

export default function ChatLayout({ children }) {
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [children])

  return (
    <Card 
      ref={chatRef} 
      className="h-full flex flex-col p-4 gap-4 overflow-y-auto border-0 outline-0 ring-0 shadow-none dark:bg-[#202020]"
    >
      {children}
    </Card>
  )
}

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired
}