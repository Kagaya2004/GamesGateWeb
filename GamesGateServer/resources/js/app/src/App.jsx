import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Rotas from './routes/Rotas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Rotas/>
  )
}

export default App
