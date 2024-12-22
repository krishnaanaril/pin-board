import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home.tsx'
import Saved from './components/Saved.tsx'
import Lists from './components/Lists.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route  path="saved" element={<Saved />}/>
          <Route  path="lists" element={<Lists />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
