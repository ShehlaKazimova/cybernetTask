import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrivateRouters from './pages/PrivateRouters'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <PrivateRouters />
      </BrowserRouter>
    </>
  )
}

export default App 