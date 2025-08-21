import React from 'react'
import HomePage from './page/HomePage.jsx'
import MemoryGame from './page/MemoryGame.jsx'
import { useState } from 'react'


const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [pairCount, setPairCount] = useState(4)

  const startGame = (pairs) => {
    setPairCount(pairs)
    setCurrentPage('game')
  };

  const goHome = () => {
    setCurrentPage('home')
  };

  return (
    <div>
      {currentPage === 'home' ? (
        <HomePage onStartGame={startGame} />
      ) : (
        <MemoryGame
          pairCount={pairCount}
          onBackHome={goHome}
        />
      )}
    </div>
  )
}

export default App
