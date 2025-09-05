import PropTypes from 'prop-types'
import Card from '../ui/Card'

export default function TextInput({ isSending, onSend, input, setInput }) {
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isSending) {
        onSend()
      }
    }
  }

  return (
    <Card className="w-full h-20 p-0 bg-[#2c2c2c] text-neutral-100 shadow-[7px_7px_0px_#c1ff72] border-0 outline-0 ring-0 rounded-3xl flex justify-center dark:bg-[#111111] dark:text-white dark:shadow-[7px_7px_0px_#d272ff]">
      <textarea
        placeholder="Type a message..."
        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 ring-0 resize-none overflow-y-auto max-h-20 placeholder-neutral-400 pl-4 pr-4 dark:bg-transparent bg-transparent rounded-3xl py-4"
        onChange={handleChange}
        value={input}
        onKeyDown={handleKeyDown}
        disabled={isSending}
      />
    </Card>
  )
}

TextInput.propTypes = {
  isSending: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired
}