import './PetNameList.css'
import names from '../../data/names.json'
import { useMemo, useState } from 'react'

export function PetNameList() {
  const pageSize = 7
  const [page] = useState(1)

  const paginatedPets = useMemo(() => {
    const start = (page - 1) * pageSize
    return names.data.slice(start, start + pageSize)
  }, [page])

  const middleIndex = Math.floor(paginatedPets.length / 2)

  return (
    <ul>
      {paginatedPets.map((pet, index) => (
        <li key={pet.id} className={index === middleIndex ? 'middle' : ''}>
          {pet.title}
        </li>
      ))}
    </ul>
  )
}
