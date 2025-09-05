import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Button from './Button'
import { Moon, Sun, Monitor } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 md:bg-neutral-700 md:hover:bg-neutral-600"
      >
        <CurrentIcon className="h-[1.4rem] w-[1.4rem] md:stroke-white" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 bottom-full mb-2 z-20 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-neutral-900 dark:border-neutral-700">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white"
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {themeOption.label}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}