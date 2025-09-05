import PropTypes from 'prop-types'

export default function Input({ className = '', ...props }) {
  const baseClass = "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
  const combinedClassName = `${baseClass} ${className}`

  return (
    <input
      className={combinedClassName}
      {...props}
    />
  )
}

Input.propTypes = {
  className: PropTypes.string
}