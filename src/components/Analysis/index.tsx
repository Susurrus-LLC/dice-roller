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

  const calcProb = (
    target: number,
    attempts: number[],
    iteration?: number
  ): Probability => {

    return {
      val: target,
      prob: 0
    }
  }

  const diceProbs = (min: number, max: number): Probability[] => {
    const probabilities: Probability[] = []
    const sidesArr = getSidesArr()

    for (let i = min; i <= max; i++) {
      probabilities.push(calcProb(i, sidesArr))
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
