import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import LogMonitoringApp from './pages/LogManager';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogMonitoringApp/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
