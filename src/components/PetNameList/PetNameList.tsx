import { useMemo, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import names from '../../data/names.json'
import './PetNameList.css'

interface Props {
  activeGender: string | null
}

export function PetNameList({ activeGender }: Props) {
  const pageSize = 7
  const [page, setPage] = useState(1)

  const filteredPets = useMemo(() => {
    return names.data.filter((pet) => {
      if (!activeGender || activeGender === 'Both') return true
      if (activeGender === 'Male') return pet.gender.includes('M')
      if (activeGender === 'Female') return pet.gender.includes('F')

      return true
    })
  }, [activeGender])

  const totalPages = Math.max(1, Math.ceil(filteredPets.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const paginatedPets = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPets.slice(start, start + pageSize)
  }, [currentPage, filteredPets])

  const isAtStart = currentPage === 1
  const isAtEnd = currentPage === totalPages
  const middleIndex = Math.floor(paginatedPets.length / 2)

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const handleNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages))
  }

  return (
    <div className="list-container">
      <ul>
        {paginatedPets.map((pet, index) => (
          <li key={pet.id} className={index === middleIndex ? 'middle' : ''}>
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
