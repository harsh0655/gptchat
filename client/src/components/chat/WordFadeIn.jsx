import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { useWordFadeIn } from '../../hooks/useWordFadeIn'

export default function WordFadeIn({ text, isActive, speed = 150 }) {
  const { visibleWordCount, words } = useWordFadeIn({ 
    text, 
    speed, 
    isActive 
  })

  if (!isActive) {
    return (
      <div className="prose break-words max-w-full whitespace-pre-wrap">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    )
  }

  // Create visible text by joining visible words, preserving markdown
  const visibleText = words.slice(0, visibleWordCount).join(' ')
  
  return (
    <div className="prose break-words max-w-full whitespace-pre-wrap">
      <ReactMarkdown>{visibleText}</ReactMarkdown>
    </div>
  )
}

WordFadeIn.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  speed: PropTypes.number
}