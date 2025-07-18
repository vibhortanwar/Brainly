import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button startIcon={<PlusIcon size="lg" />} variant='primary' text='Share' size='sm'></Button>
      <Button variant='secondary' text='Share' size='md'></Button>
      <Button variant='secondary' text='Share' size='lg'></Button>
    </div>
  )
}

export default App
