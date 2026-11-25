import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/latin-500.css'
import '@fontsource/be-vietnam-pro/vietnamese-500.css'
import '@fontsource/be-vietnam-pro/latin-600.css'
import '@fontsource/be-vietnam-pro/vietnamese-600.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/vietnamese-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/vietnamese-600.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/vietnamese-400.css'
import './styles/global.css'
import { App } from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><MotionConfig reducedMotion="user"><LazyMotion features={domAnimation}><App /></LazyMotion></MotionConfig></BrowserRouter></StrictMode>,
)
