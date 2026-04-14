import './LetterFilter.css'
import letter from '../../data/letters.json'

interface Props {
  activeLetterFilter: string | null
  setActiveLetterFilter: (letter: string) => void
}

export function LetterFilter({ activeLetterFilter, setActiveLetterFilter }: Props) {
  return (
    <div className="letter-filter-container">
      {letter.data.map((letter) => (
        <div
          key={letter}
          className={`letter-filter ${activeLetterFilter === letter ? 'active' : ''}`}
          onClick={() => setActiveLetterFilter(letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
