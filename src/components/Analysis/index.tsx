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

  const calcAvg = (): number => {
    let avg = 0

    dice.forEach(die => {
      const { number, sides, modifier } = die

      sides === 'f' ? (avg += modifier) : (avg += (number * ((sides + 1) / 2)) + modifier)
    })

    return avg
  }

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

  /*
  const calcDieResults = (rolls: number[]): number => {
    let total = 0
    let roll = 0

    dice.forEach(die => {
      const { number, modifier } = die
      let subtotal = 0

      for (let i = 0; i < multiplier; i++) {
        let subsubtotal = 0

        for (let j = 0; j < number; j++, roll++) {
          subsubtotal += rolls[roll]
        }

        subtotal += subsubtotal + modifier
      }

      total += subtotal + mulMod
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
  */

  const min = calcMinMax('min')
  const max = calcMinMax('max')
  const avg = calcAvg()
  //const probs = diceProbs(min, max)

  return (
    <section className={styles.analysis}>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Avg: {avg}</p>
      <p>Probabilities: to be calculated</p>
    </section>
  )
}

export default Analysis
