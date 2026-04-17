import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GuessrContextProvider } from './contexts/GuessrContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuessrContextProvider>
      <App />
    </GuessrContextProvider>
  </StrictMode>,
)
