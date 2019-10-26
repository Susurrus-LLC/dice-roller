import React from 'react'

import { Die } from '../../App'

import styles from './Analysis.module.sass'

interface Props {
  dice: Die[]
}

interface Probability {
  val: number
  prob: number
}

const Analysis: React.FC<Props> = ({ dice }) => {

  // calculate the minimum or maximum result of a set of dice and modifiers
  const calcMinMax = (which: 'min' | 'max'): number => {
    let total = 0

    dice.forEach(die => {
      const { number, sides, modifier } = die

      for (let i = number; i > 0; i--) {
        which === 'min'
          ? (total += sides === 'f' ? -1 : 1)
          : which === 'max'
            ? (total += sides === 'f' ? 1 : sides)
            : (total += 0)
      }

      total += modifier
    })

    return total
  }

  // calculate the average result of a set of dice and modifiers
  const calcAvg = (): number => {
    let avg = 0

    dice.forEach(die => {
      const { number, sides, modifier } = die

      sides === 'f' ? (avg += modifier) : (avg += (number * ((sides + 1) / 2)) + modifier)
    })

    return avg
  }


  // calculate the total possible results (including identicals) of a set of dice
  const calcTotalPoss = (): number => {
    let total = 0

    dice.forEach(die => {
      const { number, sides } = die

      total += sides === 'f' ? number * 3 : number * sides
    })

    return total
  }

  // given a set of dice, create an array filled with the maximum roll for each die
  const getSidesArr = (): number[] => {
    const arr: number[] = []

    dice.forEach(die => {
      for (let i = die.number; i > 0; i--) {
        if (die.sides === 'f') {
          arr.push(3)
        } else {
          arr.push(die.sides)
        }
      }
    })

    return arr
  }

  // given an array of die rolls, add them together with their modifiers to get the final total
  const calcDieResults = (rolls: number[]): number => {
    let total = 0
    let roll = 0

    dice.forEach(die => {
      const { number, modifier } = die
      let subtotal = 0

      for (let i = 0; i < number; i++, roll++) {
        subtotal += rolls[roll]
      }

      total += subtotal + modifier
    })

    return total
  }

  const calcSucc = (
    target: number,
    count: number,
    attempts: number[],
    roll: number,
    original?: number[]
  ): number => {
    let successes = count
    const orig = original === undefined ? [...attempts] : original
    const newAttempts = [...attempts]

    if (roll === 0 || newAttempts[roll] !== orig[roll]) {
      console.log('checking success')
      if (calcDieResults(newAttempts) === target) {
        successes++
      }
    }

    for (let i = newAttempts[roll]; i > 0; i--) {
      console.log(newAttempts)
      newAttempts[roll]--

      if (newAttempts[roll] > 0) {
        if (roll < orig.length - 1) {
          return calcSucc(target, successes, newAttempts, roll + 1, orig)
        } else {
          return calcSucc(target, successes, newAttempts, roll, orig)
        }
      } else {
        return successes
      }
    }

    return successes
  }

  const diceProbs = (min: number, max: number): Probability[] => {
    const probabilities: Probability[] = []
    const sidesArr = getSidesArr()

    for (let i = min; i <= max; i++) {
      console.log('start')
      probabilities.push({
        val: i,
        prob: calcSucc(i, 0, sidesArr, 0)
      })
    }

    return probabilities
  }

  return (
    <section className={styles.analysis}>
      <p>Min: {calcMinMax('min')}</p>
      <p>Max: {calcMinMax('max')}</p>
      <p>Avg: {calcAvg()}</p>
      <p>Probabilities: to be calculated{/* diceProbs(min, max) */}: of {calcTotalPoss()} possible results</p>
    </section>
  )
}

export default Analysis
