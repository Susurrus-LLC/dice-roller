import React from 'react'

import { Die } from '../../App'

import styles from './Analysis.module.sass'

interface Props {
  dice: Die[]
}

interface Probability {
  val: number
  prob: string
}

const Analysis: React.FC<Props> = ({ dice }) => {
  // calculate the minimum or maximum result of a set of dice and modifiers
  const calcMinMax = (which: 'min' | 'max'): number => {
    let total = 0

    dice.forEach(die => {
      const { number, sides, modifier } = die

      for (let i = number; i > 0; i--) {
        if (which === 'min') {
          total += sides === 'f' ? -1 : 1
        } else if (which === 'max') {
          total += sides === 'f' ? 1 : sides
        } else {
          total += 0
        }
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

      sides === 'f'
        ? (avg += modifier)
        : (avg += number * ((sides + 1) / 2) + modifier)
    })

    return avg
  }

  // calculate the total possible results (including identicals) of a set of dice
  const calcTotalPoss = (): number => {
    let total = 1

    dice.forEach(die => {
      const { number, sides } = die

      total *= sides === 'f' ? number * 3 : Math.pow(sides, number)
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

  // calculate the number of combinations of results that will succeed at reaching a target
  const calcSucc = (
    target: number,
    attempts: number[],
    die: number = 0,
    original?: number[]
  ): number => {
    let successes = 0
    // if this is the topmost call of the function, create the original array
    // if this is a recursive call, pass the original array along
    const orig = original === undefined ? [...attempts] : original
    const newAttempts = [...attempts]

    // cycle through all possible results with the current die
    for (let i = newAttempts[die]; i > 0; i--) {
      newAttempts[die] = i

      // if examining the first die, or if the current die does not equal the value of its original, check for success
      // this logic needed to prevent checking twice with each recursion
      if (
        (die === 0 || newAttempts[die] !== orig[die]) &&
        calcDieResults(newAttempts) === target
      ) {
        successes++
      }

      if (die < orig.length - 1) {
        successes += calcSucc(target, newAttempts, die + 1, orig)
      }
    }

    return successes
  }

  const diceProbs = (min: number, max: number): Probability[] => {
    const probabilities: Probability[] = []
    const poss = calcTotalPoss()

    // for each possible result between the min and max, calculate how many ways that result can be rolled
    for (let i = min; i <= max; i++) {
      const succ = calcSucc(i, getSidesArr())

      probabilities.push({
        val: i,
        prob: `${Math.round((succ / poss) * 10000) / 100}%: ${succ} / ${poss}`
      })
    }

    return probabilities
  }

  const min = calcMinMax('min')
  const max = calcMinMax('max')

  return (
    <section className={styles.analysis}>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Avg: {calcAvg()}</p>
      <p>Probabilities: of {calcTotalPoss()} possible results</p>
      <p>{JSON.stringify(diceProbs(min, max))}</p>
    </section>
  )
}

export default Analysis
