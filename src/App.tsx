import { Link, Outlet } from 'react-router'
import './App.css'
import { Toaster } from './components/ui/toaster'
import { Bookmark, Search } from 'lucide-react'
import SideMenu from './components/SideMenu'

function App() {

  return (
    <div className='h-dvh flex flex-col md:max-w-screen-md md:mx-auto'>
      <div className='h-full overflow-scroll'>
        <Outlet />
        <Toaster />
      </div>
      <div className='bg-opacity-50 py-2 backdrop-blur-lg flex flex-row justify-between max-w-screen-md md:mx-auto w-full md:w-screen-sm md:rounded-full md:mb-2'>
        <Link className='w-1/3 flex flex-col items-center' id="saved-link" to="/saved">
          <Bookmark />
          Saved
        </Link>
        <Link className='w-1/3 flex flex-col items-center' id="search-link" to="/">
          <Search />
          Search
        </Link>
        <div className='w-1/3 flex flex-col items-center'>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

export default App
