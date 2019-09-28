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
  mulMod: number
}

export interface Result {
  dice: Die[]
  result: number
  rolled: Date
}

export const defaultDie: Die = {
  multiplier: 1,
  number: 1,
  sides: 20,
  modifier: 0,
  mulMod: 0
}

const App: React.FC = () => {
  const [dType, setDtype] = useState<DieType>('n')
  const [dice, setDice] = useState<Die[]>([defaultDie])
  const [results, setResults] = useState<Result[]>([])

  const handleSubmit = (): void => {
    const newResults = [...results]

    newResults.push({
      dice: [...dice],
      result: 10,
      rolled: new Date()
    })

    setResults(newResults)
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Input
          dType={dType}
          setDtype={setDtype}
          dice={dice}
          setDice={setDice}
          handleSubmit={handleSubmit}
        />
        <Results results={results} />
        <Analysis />
      </main>
      <Footer />
    </>
  )
}

export default App
