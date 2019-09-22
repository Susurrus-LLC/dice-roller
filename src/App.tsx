import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'

import './App.module.sass'

const App: React.FC = () => (
  <>
    <Header />
    <main>
      <p>Dice roller&hellip;</p>
    </main>
    <Footer />
  </>
)

export default App
