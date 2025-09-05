import PropTypes from 'prop-types'

const buttonVariants = {
  variant: {
    default: "bg-primary text-white shadow-sm hover:bg-primary/90",
    destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
    outline: "border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3",
    lg: "h-10 rounded-md px-6",
    icon: "h-9 w-9",
  },
}

export default function Button({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}) {
  const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default
  const sizeClass = buttonVariants.size[size] || buttonVariants.size.default
  
  const baseClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  
  const combinedClassName = `${baseClass} ${variantClass} ${sizeClass} ${className}`

  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  children: PropTypes.node.isRequired
}