import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import App from './App.tsx'
import { SimulationProvider } from './context/SimulationContext.tsx'
import { ErrorBoundary } from './components/UI/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SimulationProvider>
        <App />
      </SimulationProvider>
    </ErrorBoundary>
  </StrictMode>,
)
