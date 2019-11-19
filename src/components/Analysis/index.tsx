import React, { useState, useEffect, useCallback } from 'react'

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
  const calcMinMax = useCallback((which: 'min' | 'max'): number => {
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
  }, [dice])

  // calculate the average result of a set of dice and modifiers
  const calcAvg = useCallback((): number => {
    let avg = 0

    dice.forEach(die => {
      const { number, sides, modifier } = die

      sides === 'f' ? (avg += modifier) : (avg += (number * ((sides + 1) / 2)) + modifier)
    })

    return avg
  }, [dice])


  // calculate the total possible results (including identicals) of a set of dice
  const calcTotalPoss = useCallback((): number => {
    let total = 1

    dice.forEach(die => {
      const { number, sides } = die

      total *= sides === 'f' ? number * 3 : Math.pow(sides, number)
    })

    return total
  }, [dice])

  // given a set of dice, create an array filled with the maximum roll for each die
  const getSidesArr = useCallback((): number[] => {
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
  }, [dice])

  // given an array of die rolls, add them together with their modifiers to get the final total
  const calcDieResults = useCallback((rolls: number[]): number => {
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
  }, [dice])

  // calculate the number of combinations of results that will succeed at reaching a target
  const calcSucc = useCallback((
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
      if ((die === 0 || newAttempts[die] !== orig[die]) && (calcDieResults(newAttempts) === target)) {
        successes++
      }

      if (die < orig.length - 1) {
        successes += calcSucc(target, newAttempts, die + 1, orig)
      }
    }

    return successes
  }, [calcDieResults])

  const [min, setMin] = useState<number>(calcMinMax('min'))
  const [max, setMax] = useState<number>(calcMinMax('max'))
  const [avg, setAvg] = useState<number>(calcAvg())

  const diceProbs = useCallback((): Probability[] => {
    const probabilities: Probability[] = []
    const poss = calcTotalPoss()

    // for each possible result between the min and max, calculate how many ways that result can be rolled
    for (let i = min; i <= max; i++) {
      const succ = calcSucc(i, getSidesArr())

      probabilities.push({
        val: i,
        prob: `${Math.round(succ / poss * 10000) / 100}%: ${succ} / ${poss}`
      })
    }

    return probabilities
  }, [min, max, calcTotalPoss, calcSucc, getSidesArr])

  const [poss, setPoss] = useState<number>(calcTotalPoss())
  const [probs, setProbs] = useState<Probability[]>(diceProbs())

  useEffect(() => setMin(calcMinMax('min')), [calcMinMax])
  useEffect(() => setMax(calcMinMax('max')), [calcMinMax])
  useEffect(() => setAvg(calcAvg()), [calcAvg])
  useEffect(() => setPoss(calcTotalPoss()), [calcTotalPoss])
  useEffect(() => setProbs(diceProbs()), [diceProbs])

  return (
    <section className={styles.analysis}>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Avg: {avg}</p>
      <p>Probabilities: of {poss} possible results</p>
      <p>{JSON.stringify(probs)}</p>
    </section>
  )
}

export default Analysis
