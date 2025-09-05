import PropTypes from 'prop-types'

export default function LoadingSpinner({ className = '' }) {
  return (
    <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white ${className}`} />
  )
}

LoadingSpinner.propTypes = {
  className: PropTypes.string
}