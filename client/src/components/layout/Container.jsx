import PropTypes from 'prop-types'
import AppSidebar from './AppSidebar'
import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function Container({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="flex h-full overflow-hidden">
      <AppSidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      <div className="flex flex-col flex-1 h-full overflow-hidden p-2 gap-3 dark:bg-[#202020] pb-4">
        {children}
      </div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}