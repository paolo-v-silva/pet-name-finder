import { useState } from 'react'
import './App.css'
import dogForList from './assets/dog-for-list.png'
import { CategoryFilter, GenderFilter, PetNameList } from './components'

function App() {
  const [activeGender, setActiveGender] = useState<string | null>(null)

  return (
    <>
      <GenderFilter activeGender={activeGender} setActiveGender={setActiveGender} />
      <CategoryFilter />
      <section className="pet-name-list-container">
        <h2>All Pets names</h2>
        <div className="grid">
          <img src={dogForList} alt="dog" width={400} />
          <PetNameList />
        </div>
      </section>
    </>
  )
}

export default App
