import './GenderFilter.css'

interface Props {
  activeGender: string | null
  setActiveGender: (gender: string) => void
}

export function GenderFilter({ activeGender, setActiveGender }: Props) {
  const handleClick = (gender: string) => {
    setActiveGender(gender)
  }

  return (
    <div className="gender-filter-container">
      <h3>Choose your pet's gender</h3>
      <div className="gender-container">
        <button
          className={activeGender === 'Male' ? 'active' : ''}
          onClick={() => handleClick('Male')}
        >
          Male
        </button>
        <button
          className={activeGender === 'Female' ? 'active' : ''}
          onClick={() => handleClick('Female')}
        >
          Female
        </button>
        <button
          className={activeGender === 'Both' ? 'active' : ''}
          onClick={() => handleClick('Both')}
        >
          Both
        </button>
      </div>
    </div>
  )
}
