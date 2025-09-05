import PropTypes from 'prop-types'

export default function MessageInput({ children }) {
  return (
    <div className="flex items-center w-full gap-2">
      {children}
    </div>
  )
}

MessageInput.propTypes = {
  children: PropTypes.node.isRequired
}