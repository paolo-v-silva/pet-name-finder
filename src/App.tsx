import { useState } from 'react'
import './App.css'
import dogForList from './assets/dog-for-list.png'
import { CategoryFilter, GenderFilter, LetterFilter, PetNameList } from './components'
import { PetDetails } from './components/PetDetail/PetDetail'

export interface PetDetails {
  id: string
  title: string
  definition: string
  gender: string[]
  categories: string[]
}

function App() {
  const [activeGender, setActiveGender] = useState<string>('Male')
  const [activeLetter, setActiveLetter] = useState<string>('A')
  const [activePet, setActivePet] = useState<PetDetails | null>(null)
  const [activeCategories, setActiveCategories] = useState<string[]>([])

  const categoryFilterProps = {
    addFilter: (categoryId: string) => {
      if (!categoryId) return

      setActiveCategories([...activeCategories, categoryId])
      setActivePet(null)
    },
    removeFilter: (categoryId: string) => {
      if (!categoryId) return

      setActiveCategories(activeCategories.filter((id) => id !== categoryId))
      setActivePet(null)
    },
    activeCategories,
  }

  const petNameListProps = {
    activeGender,
    activeCategories,
    activeLetter,
    activePet,
    setActivePet,
  }

  const handleSetActiveGender = (gender: string) => {
    setActiveGender(gender)
    setActivePet(null)
  }

  const handleSetActiveLetter = (letter: string) => {
    setActiveLetter(letter)
    setActivePet(null)
  }

  return (
    <>
      <GenderFilter activeGender={activeGender} setActiveGender={handleSetActiveGender} />
      <CategoryFilter {...categoryFilterProps} />
      <section className="pet-name-list-container">
        <h2>All Pets names</h2>
        <LetterFilter
          activeLetterFilter={activeLetter}
          setActiveLetterFilter={handleSetActiveLetter}
        />
        <div className={activePet ? 'grid hasActivePet' : 'grid'}>
          <img src={dogForList} alt="dog" width={400} />
          <PetNameList
            key={activeGender + activeCategories.join(',') + activeLetter}
            {...petNameListProps}
          />
          <PetDetails pet={activePet} />
        </div>
      </section>
    </>
  )
}

export default App
