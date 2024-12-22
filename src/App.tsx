import { Outlet } from 'react-router'
import './App.css'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <>
      <Outlet/>
      <Toaster/>
    </>
  )
}

export default App
