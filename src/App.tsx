import { useState } from 'react'
import './App.css'
import dogForList from './assets/dog-for-list.png'
import { CategoryFilter, GenderFilter, PetNameList } from './components'
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
  const [activePet, setActivePet] = useState<PetDetails | null>(null)

  const petNameListProps = {
    activeGender,
    activePet,
    setActivePet,
  }

  return (
    <>
      <GenderFilter activeGender={activeGender} setActiveGender={setActiveGender} />
      <CategoryFilter />
      <section className="pet-name-list-container">
        <h2>All Pets names</h2>
        <div className={activePet ? 'grid hasActivePet' : 'grid'}>
          <img src={dogForList} alt="dog" width={400} />
          <PetNameList key={activeGender} {...petNameListProps} />
          <PetDetails pet={activePet} />
        </div>
      </section>
    </>
  )
}

export default App
