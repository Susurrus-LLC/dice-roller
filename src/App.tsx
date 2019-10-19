import React, { useState, SyntheticEvent } from 'react'

import Analysis from './components/Analysis'
import Footer from './components/Footer'
import Header from './components/Header'
import Input from './components/Input'
import Results from './components/Results'

import styles from './App.module.sass'

export type DieType = number | 'f'

export interface Die {
  number: number
  sides: DieType
  other: boolean
  modifier: number
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
  number: 1,
  sides: 20,
  other: false,
  modifier: 0
}

const App: React.FC = () => {
  const [dice, setDice] = useState<Die[]>([defaultDie])
  const [results, setResults] = useState<Result[]>([])

  const calcResult = (die: Die) => {
    const { number, sides, modifier } = die
    let num = number
    let total = 0
    const rolls: number[] = []

    for (let j = num; j > 0; j--) {
      const roll =
        typeof sides === 'number'
          ? Math.floor(Math.random() * sides) + 1
          : Math.floor(Math.random() * 3) - 1

      rolls.push(roll)
      total += roll
    }

    total += modifier

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
      dice: newDice,
      result: result,
      rolled: new Date()
    })

    setResults(newResults)
  }

  const handleAddRemove = (e: SyntheticEvent): void => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    const action = target.getAttribute('data-action')
    const die = +target.value
    const newDice = [...dice]

    if (action === 'add') {
      if (die === newDice.length) {
        newDice.push(defaultDie)
      } else {
        newDice.splice(die + 1, 0, defaultDie)
      }
    } else {
      newDice.splice(die, 1)
    }

    setDice(newDice)
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Input
          dice={dice}
          setDice={setDice}
          handleSubmit={handleSubmit}
          handleAddRemove={handleAddRemove}
        />
        <Results results={results} />
        <Analysis dice={dice} />
      </main>
      <Footer />
    </>
  )
}

export default App
