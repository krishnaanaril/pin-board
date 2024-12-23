import { Link, Outlet } from 'react-router'
import './App.css'
import { Toaster } from './components/ui/toaster'
import { Bookmark, Menu, Search } from 'lucide-react'

function App() {

  return (
    <div className='h-dvh w-screen flex flex-col'>
      <div className='h-full overflow-scroll'>
        <Outlet />
        <Toaster />
      </div>
      <div className='bg-opacity-50 py-2 backdrop-blur-lg flex flex-row justify-between max-w-screen-md'>
        <Link className='w-1/3 flex flex-col items-center' id="saved-link" to="/saved">
          <Bookmark />
          Saved
        </Link>
        <Link className='w-1/3 flex flex-col items-center' id="search-link" to="/">
          <Search />
          Search
        </Link>
        <Link className='w-1/3 flex flex-col items-center' id="settings-link" to="/settings">
          <Menu />
          Menu
        </Link>
      </div>
    </div>
  )
}

export default App
