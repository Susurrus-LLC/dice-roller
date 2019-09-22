import React from 'react'

import Analysis from './components/Analysis'
import Footer from './components/Footer'
import Header from './components/Header'
import Input from './components/Input'
import Results from './components/Results'

import styles from './App.module.sass'

const App: React.FC = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Input />
      <Results />
      <Analysis />
    </main>
    <Footer />
  </>
)

export default App
