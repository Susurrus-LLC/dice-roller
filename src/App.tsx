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
  rolls?: number[]
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
  const [dice, setDice] = useState<Die[]>([defaultDie, defaultDie])
  const [results, setResults] = useState<Result[]>([])

  const calcResult = (die: Die) => {
    const { multiplier, number, sides, modifier, mulMod } = die
    let mul = multiplier
    let num = number
    let total = 0
    const rolls: number[] = []

    for (let i = mul; i > 0; i--) {
      let tempTotal = 0
      for (let j = num; j > 0; j--) {
        const roll =
          dType === 'n'
            ? Math.floor(Math.random() * sides) + 1
            : Math.floor(Math.random() * 3) - 1

        rolls.push(roll)
        tempTotal += roll
      }

      tempTotal += modifier

      total += tempTotal
    }

    total += mulMod

    return { total, rolls }
  }

  const handleSubmit = (): void => {
    const newResults = [...results]
    const newDice: Die[] = []
    let result = 0

    dice.forEach(die => {
      const newDie: Die = JSON.parse(JSON.stringify(die))
      const rollResult = calcResult(die)

      newDie.rolls = rollResult.rolls
      newDie.result = rollResult.total
      newDice.push(newDie)
      result += newDie.result
    })

    newResults.push({
      type: dType,
      dice: newDice,
      result: result,
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
        <Analysis dType={dType} dice={dice} />
      </main>
      <Footer />
    </>
  )
}

export default App
