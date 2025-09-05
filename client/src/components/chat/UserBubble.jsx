import PropTypes from 'prop-types'
import Card from '../ui/Card'

export default function UserBubble({ children }) {
  return (
    <div className="flex w-full justify-end">
      <Card className="flex items-center justify-center p-4 max-w-[80%] bg-yellow-200 border-0 outline-0 ring-0 shadow-[7px_7px_0px_#b388ff] text-shadow-[0.4px_0.4px_0.01px_#000000] dark:bg-[#333333] dark:shadow-[7px_7px_0px_#b7c2ff] dark:text-white break-words">
        {children}
      </Card>
    </div>
  )
}

UserBubble.propTypes = {
  children: PropTypes.node.isRequired
}