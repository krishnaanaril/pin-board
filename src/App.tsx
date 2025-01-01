import { Link, Outlet, useLocation } from 'react-router'
import './App.css'
import { Toaster } from './components/ui/toaster'
import { Bookmark, LocateFixed, Search } from 'lucide-react'
import SideMenu from './components/SideMenu'
import { Button } from './components/ui/button'
import SaveLocation from './components/SaveLocation'
import { SearchForm } from './components/SearchForm'
import usePinBoardStore from './store/pinboard-store'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  const { updateActivePosition } = usePinBoardStore();
  const location = useLocation();

  function goToCurrentLocation() {
    updateActivePosition(null);
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="pin-board-theme">
      <div className='h-dvh flex flex-col md:max-w-screen-md md:mx-auto'>
        <div className='h-full overflow-y-auto'>
          <Outlet />
          <Toaster />
        </div>
        {location.pathname === '/' && (
          <div className='w-screen md:max-w-screen-md md:mx-auto'>
            <div className="relative right-2 flex flex-col md:right-4">
              <div className="my-2 flex flex-row justify-end">
                <Button id="current-location-button" onClick={goToCurrentLocation}>
                  <LocateFixed size={24} />
                </Button>
              </div>
              <div className='my-2 flex flex-row justify-end'>
                <SaveLocation />
              </div>
              <div className='my-2 ml-2 flex flex-row justify-end'>
                <SearchForm />
              </div>
            </div>
          </div>
        )}

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
    </ThemeProvider>
  )
}

export default App
