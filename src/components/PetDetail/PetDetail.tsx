import { IoIosFemale, IoIosMale } from 'react-icons/io'
import type { PetDetails } from '../../App'
import categories from '../../data/categories.json'
import './PetDetail.css'

interface Props {
  pet: PetDetails | null
}

export function PetDetails({ pet }: Props) {
  if (!pet) return null

  const categoryNames = categories.data
    .filter((cat) => pet.categories.includes(cat.id))
    .map((cat) => cat.name)

  return (
    <div className="pet-details-container">
      <div className="title">
        {pet.gender[0] === 'M' ? <IoIosMale className="icon" /> : <IoIosFemale className="icon" />}
        {categoryNames.join(' - ')}
      </div>
      <div className="separator"></div>
      <div dangerouslySetInnerHTML={{ __html: pet.definition }} className="definition" />
      <div className="categories"></div>
    </div>
  )
}
