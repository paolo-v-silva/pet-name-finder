import './PetNameList.css'
import names from '../../data/names.json'
import { useMemo, useState } from 'react'

interface Props {
  activeGender: string | null
}

export function PetNameList({ activeGender }: Props) {
  const pageSize = 7
  const [page] = useState(1)

  const paginatedPets = useMemo(() => {
    const filteredPets = names.data.filter((pet) => {
      if (!activeGender || activeGender === 'Both') return true
      if (activeGender === 'Male') return pet.gender.includes('M')
      if (activeGender === 'Female') return pet.gender.includes('F')

      return true
    })

    const start = (page - 1) * pageSize
    return filteredPets.slice(start, start + pageSize)
  }, [activeGender, page])

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
