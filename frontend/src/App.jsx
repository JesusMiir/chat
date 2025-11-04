import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UsersList from './components/UsersList'
import RegisterForm from './components/RegisterFrom'

import { useAuth } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  const auth = useAuth()
  console.log(auth)

  return (
    <>
      <button onClick={auth.increaseA}>{auth.a}</button>
      <UsersList />
      <RegisterForm />
    </>
  )
}

export default App
