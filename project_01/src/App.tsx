import { useState } from 'react'
import './App.css'
import { Calculator } from './components/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex items-center w-full justify-center'>
        <Calculator />
      </div>
    </>
  )
}

export default App
