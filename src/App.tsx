import { useState } from 'react'
import './App.css'
import { GenderFilter } from './components'

function App() {
  const [activeGender, setActiveGender] = useState<string | null>(null)

  return <GenderFilter activeGender={activeGender} setActiveGender={setActiveGender} />
}

export default App
