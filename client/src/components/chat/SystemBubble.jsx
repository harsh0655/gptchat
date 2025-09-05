import PropTypes from 'prop-types'
import Card from '../ui/Card'
import WordFadeIn from './WordFadeIn'

export default function SystemBubble({ children, useWordFadeIn = false, content }) {
  return (
    <div className="flex w-full justify-start">
      <Card className="max-w-[100%] sm:max-w-[75%] p-4 bg-[#b388ff] border-0 outline-0 ring-0 shadow-[7px_7px_0px_#fff085] text-neutral-950 text-shadow-[0.4px_0.4px_0.01px_#000000] break-words dark:bg-[#323232] dark:text-white dark:shadow-[7px_7px_0px_#f4e990]">
        <div className="whitespace-pre-wrap break-words">
          {useWordFadeIn && content ? (
            <WordFadeIn text={content} isActive={useWordFadeIn} speed={40} />
          ) : (
            children
          )}
        </div>
      </Card>
    </div>
  )
}

SystemBubble.propTypes = {
  children: PropTypes.node.isRequired,
  useWordFadeIn: PropTypes.bool,
  content: PropTypes.string
}