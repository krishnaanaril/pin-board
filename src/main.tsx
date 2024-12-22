import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';

const Home = lazy(() => import('./components/Home.tsx'));
const Saved = lazy(() => import('./components/Saved.tsx'));
const Lists = lazy(() => import('./components/Lists.tsx'));

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
