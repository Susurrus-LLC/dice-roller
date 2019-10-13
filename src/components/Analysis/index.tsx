import React from 'react'

import { DieType, Die } from '../../App'

import styles from './Analysis.module.sass'

interface Props {
  dType: DieType
  dice: Die[]
}

interface Probability {
  val: number
  prob: number
}

const Analysis: React.FC<Props> = ({ dType, dice }) => {
  const calcMinMax = (which: 'min' | 'max'): number => {
    let fullTotal = 0

    dice.forEach(die => {
      const { multiplier, number, sides, modifier, mulMod } = die
      let mul = multiplier
      let num = number
      let total = 0

      for (let i = mul; i > 0; i--) {
        let tempTotal = 0
        for (let j = num; j > 0; j--) {
          which === 'min'
            ? (tempTotal += dType === 'n' ? 1 : -1)
            : which === 'max'
            ? (tempTotal += dType === 'n' ? sides : 1)
            : (tempTotal += 0)
        }

        total += tempTotal + modifier
      }

      fullTotal += total + mulMod
    })

    return fullTotal
  }

  const calcAvg = (): number => {
    let avg = 0

    dice.forEach(die => {
      const { multiplier, number, sides, modifier, mulMod } = die
      dType === 'n'
        ? (avg += (((sides + 1) / 2) * number + modifier) * multiplier + mulMod)
        : dType === 'f'
        ? (avg += modifier * multiplier + mulMod)
        : (avg += 0)
    })

    return avg
  }

  const getSidesArr = (): number[] => {
    const arr: number[] = []

    dice.forEach(die => {
      for (let i = die.multiplier * die.number; i > 0; i--) {
        if (dType === 'n') {
          arr.push(die.sides)
        } else {
          arr.push(3)
        }
      }
    })

    return arr
  }

  const calcDieResults = (rolls: number[]): number => {
    let total = 0
    let roll = 0

    dice.forEach(die => {
      const { multiplier, number, modifier, mulMod } = die
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

  const min = calcMinMax('min')
  const max = calcMinMax('max')
  const avg = calcAvg()
  const probs = diceProbs(min, max)

  return (
    <section className={styles.analysis}>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Avg: {avg}</p>
      <p>Probabilities: {JSON.stringify(probs)}</p>
    </section>
  )
}

export default Analysis
