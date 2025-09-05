import PropTypes from 'prop-types'

export default function Avatar({ user, className = '' }) {
  const baseClass = "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full"
  const combinedClassName = `${baseClass} ${className}`

  const getInitials = (name) => {
    if (!name) return '🧑'
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className={combinedClassName}>
      {user?.image ? (
        <img 
          src={user.image} 
          alt={user.name || 'User'} 
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {getInitials(user?.name)}
          </span>
        </div>
      )}
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }),
  className: PropTypes.string
}