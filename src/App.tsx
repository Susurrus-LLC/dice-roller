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
  result?: number
}

export interface Result {
  type?: DieType
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

  const calcResult = (die: Die): number => {
    const { multiplier, number, sides, modifier, mulMod } = die
    let mul = multiplier
    let num = number
    let total = 0

    for (let i = mul; i > 0; i--) {
      let tempTotal = 0
      for (let j = num; j > 0; j--) {
        tempTotal +=
          dType === 'n'
            ? Math.ceil(Math.random() * sides)
            : Math.floor(Math.random() * 3) - 1
      }

      tempTotal += modifier

      total += tempTotal
    }

    total += mulMod

    return total
  }

  const handleSubmit = (): void => {
    const newResults = [...results]
    const newDice: Die[] = []
    let result = 0

    dice.forEach(die => {
      const newDie = JSON.parse(JSON.stringify(die))
      newDie.result = calcResult(die)
      newDice.push(newDie)
      result += newDie.result
    })

    newResults.push({
      type: dType,
      dice: newDice,
      result: result,
      rolled: new Date()
    })

    console.log(newResults)

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
