import React, { useState } from 'react'

import Analysis from './components/Analysis'
import Footer from './components/Footer'
import Header from './components/Header'
import Input from './components/Input'
import Results from './components/Results'

import styles from './App.module.sass'

export type DieType = 'n' | 'f'

export interface Die {
  multiplier: number
  number: number
  sides: number
  modifier: number
}

export const defaultDie: Die = {
  multiplier: 1,
  number: 1,
  sides: 20,
  modifier: 0
}

const App: React.FC = () => {
  const [dType, setDtype] = useState<DieType>('n')
  const [gmult, setGmult] = useState(1)
  const [gmod, setGmod] = useState(0)
  const [dice, setDice] = useState<Die[]>([defaultDie])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Input
          dType={dType}
          setDtype={setDtype}
          gmult={gmult}
          setGmult={setGmult}
          gmod={gmod}
          setGmod={setGmod}
          dice={dice}
          setDice={setDice}
        />
        <Results />
        <Analysis />
      </main>
      <Footer />
    </>
  )
}

export default App
