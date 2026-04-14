import './LetterFilter.css'
import letter from '../../data/letters.json'

export function LetterFilter() {
  return (
    <div className="letter-filter-container">
      {letter.data.map((letter) => (
        <div key={letter} className="letter-filter">
          {letter}
        </div>
      ))}
    </div>
  )
}
