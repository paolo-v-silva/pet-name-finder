import { useMemo } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import type { PetDetails } from '../../App'
import names from '../../data/names.json'
import './PetNameList.css'

interface Props {
  activeGender: string | null
  activeLetter: string | null
  activePet: PetDetails | null
  activeCategories: string[]
  currentPage: number
  setCurrentPage: (page: number) => void
  setActivePet: (pet: PetDetails | null) => void
}

export function PetNameList({
  activeGender,
  activeLetter,
  activePet,
  activeCategories,
  currentPage,
  setCurrentPage,
  setActivePet,
}: Props) {
  const pageSize = activePet ? 11 : 7

  const filteredPets = useMemo(() => {
    const filteredByGender = names.data.filter((pet) => {
      if (!activeGender || activeGender === 'Both') return true
      if (activeGender === 'Male') return pet.gender.includes('M')
      if (activeGender === 'Female') return pet.gender.includes('F')

      return true
    })

    return filteredByGender.filter((pet) => {
      if (activeLetter && pet.title[0].toLowerCase() !== activeLetter.toLowerCase()) return false
      if (activeCategories.length === 0) return true
      return activeCategories.every((category) => pet.categories.includes(category))
    })
  }, [activeGender, activeLetter, activeCategories])

  const totalPages = Math.max(1, Math.ceil(filteredPets.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedPets = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize
    return filteredPets.slice(start, start + pageSize)
  }, [safeCurrentPage, filteredPets, pageSize])

  const isAtStart = safeCurrentPage === 1
  const isAtEnd = safeCurrentPage === totalPages

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(safeCurrentPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(Math.min(safeCurrentPage + 1, totalPages))
  }

  const handlePetClick = (pet: PetDetails) => {
    setActivePet(pet)
  }

  return (
    <div className={activePet ? 'list-container hasActivePet' : 'list-container'}>
      <ul>
        {paginatedPets.map((pet) => (
          <li
            key={pet.id}
            className={activePet?.id === pet.id ? 'active' : ''}
            onClick={() => handlePetClick(pet)}
          >
            {pet.title}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          type="button"
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={isAtStart}
          aria-label="Previous page"
        >
          <FaChevronUp className={isAtStart ? 'icon disabled' : 'icon active'} />
        </button>

        <button
          type="button"
          className="pagination-button"
          onClick={handleNextPage}
          disabled={isAtEnd}
          aria-label="Next page"
        >
          <FaChevronDown className={isAtEnd ? 'icon disabled' : 'icon active'} />
        </button>
      </div>
    </div>
  )
}
