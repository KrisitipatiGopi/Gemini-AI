import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import "./index.css"

const App = () => {
  return (
    <div className='App'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default App