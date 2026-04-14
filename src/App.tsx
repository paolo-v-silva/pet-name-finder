import { useReducer, useState } from 'react'
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

interface FilterState {
  activeGender: string
  activeLetter: string
  activeCategories: string[]
}

type FilterAction =
  | { type: 'set-gender'; payload: string }
  | { type: 'set-letter'; payload: string }
  | { type: 'add-category'; payload: string }
  | { type: 'remove-category'; payload: string }

function filtersReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'set-gender':
      return { ...state, activeGender: action.payload }
    case 'set-letter':
      return { ...state, activeLetter: action.payload }
    case 'add-category':
      if (state.activeCategories.includes(action.payload)) {
        return state
      }

      return {
        ...state,
        activeCategories: [...state.activeCategories, action.payload],
      }
    case 'remove-category':
      return {
        ...state,
        activeCategories: state.activeCategories.filter((id) => id !== action.payload),
      }
    default:
      return state
  }
}

function App() {
  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    activeGender: 'Male',
    activeLetter: 'A',
    activeCategories: [],
  })
  const [activePet, setActivePet] = useState<PetDetails | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleFilterChange = (action: FilterAction) => {
    dispatchFilters(action)
    setActivePet(null)
    setCurrentPage(1)
  }

  const categoryFilterProps = {
    addFilter: (categoryId: string) => {
      if (!categoryId) return
      handleFilterChange({ type: 'add-category', payload: categoryId })
    },
    removeFilter: (categoryId: string) => {
      if (!categoryId) return
      handleFilterChange({ type: 'remove-category', payload: categoryId })
    },
    activeCategories: filters.activeCategories,
  }

  const petNameListProps = {
    activeGender: filters.activeGender,
    activeCategories: filters.activeCategories,
    activeLetter: filters.activeLetter,
    activePet,
    currentPage,
    setCurrentPage,
    setActivePet,
  }

  const handleSetActiveGender = (gender: string) => {
    handleFilterChange({ type: 'set-gender', payload: gender })
  }

  const handleSetActiveLetter = (letter: string) => {
    handleFilterChange({ type: 'set-letter', payload: letter })
  }

  return (
    <>
      <GenderFilter activeGender={filters.activeGender} setActiveGender={handleSetActiveGender} />
      <CategoryFilter {...categoryFilterProps} />
      <section className="pet-name-list-container">
        <h2>All Pets names</h2>
        <LetterFilter
          activeLetterFilter={filters.activeLetter}
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
