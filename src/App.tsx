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
  const [currentPage, setCurrentPage] = useState<number>(1)

  const categoryFilterProps = {
    addFilter: (categoryId: string) => {
      if (!categoryId) return

      setActiveCategories((currentCategories) => {
        if (currentCategories.includes(categoryId)) return currentCategories
        return [...currentCategories, categoryId]
      })
      setActivePet(null)
      setCurrentPage(1)
    },
    removeFilter: (categoryId: string) => {
      if (!categoryId) return

      setActiveCategories((currentCategories) =>
        currentCategories.filter((id) => id !== categoryId),
      )
      setActivePet(null)
      setCurrentPage(1)
    },
    activeCategories,
  }

  const petNameListProps = {
    activeGender,
    activeCategories,
    activeLetter,
    activePet,
    currentPage,
    setCurrentPage,
    setActivePet,
  }

  const handleSetActiveGender = (gender: string) => {
    setActiveGender(gender)
    setActivePet(null)
    setCurrentPage(1)
  }

  const handleSetActiveLetter = (letter: string) => {
    setActiveLetter(letter)
    setActivePet(null)
    setCurrentPage(1)
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
          <PetNameList {...petNameListProps} />
          <PetDetails pet={activePet} />
        </div>
      </section>
    </>
  )
}

export default App
