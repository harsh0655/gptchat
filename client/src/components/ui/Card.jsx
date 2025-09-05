import PropTypes from 'prop-types'

export default function Card({ className = '', children, ...props }) {
  const baseClass = "bg-white text-black flex flex-col rounded-xl border shadow-sm dark:bg-gray-800 dark:text-white"
  const combinedClassName = `${baseClass} ${className}`

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}