import React, { useState } from 'react'

import styles from './Input.module.sass'

interface Die {
  multiplier: number
  number: number
  sides: number
  modifier: number
}

const defaultDie: Die = {
  multiplier: 1,
  number: 1,
  sides: 20,
  modifier: 0
}

const Input: React.FC = () => {
  const [dType, setDtype] = useState<'n' | 'f'>('n')
  const [gmult, setGmult] = useState(1)
  const [gmod, setGmod] = useState(0)
  const [dice, setDice] = useState<Die[]>([defaultDie])

  const handleNumbers = (num: number, min: number, handler: Function) => {
    if (num < min) {
      handler(min)
    } else {
      handler(Math.round(num))
    }
  }

  const diceInputs = dice.map((die, i) => (
    <div className={styles.dieRow} key={i}>
      <input
        className={styles.inputs}
        name={`multiplier-${i}`}
        type='number'
        min={1}
        step={1}
        value={die.multiplier}
      />{' '}
      &times;{' '}
      <input
        className={styles.inputs}
        name={`number-${i}`}
        type='number'
        min={1}
        step={1}
        value={die.number}
      />{' '}
      d
      <input
        className={styles.inputs}
        name={`sides-${i}`}
        type='number'
        min={2}
        step={1}
        value={die.sides}
      />{' '}
      +{' '}
      <input
        className={styles.inputs}
        name={`modifier-${i}`}
        type='number'
        step={1}
        value={die.modifier}
      />
    </div>
  ))

  return (
    <section className={styles.input}>
      <form
        id={styles.diceForm}
        className={styles.diceForm}
        name='diceForm'
        autoComplete='false'
      >
        <div>
          <label>
            <input
              className={styles.radio}
              name='dtype'
              type='radio'
              value='n'
              checked={dType === 'n'}
              onChange={e => (e.target.checked ? setDtype('n') : null)}
            />{' '}
            Number
          </label>
          <label>
            <input
              className={styles.radio}
              name='dtype'
              type='radio'
              value='f'
              checked={dType === 'f'}
              onChange={e => (e.target.checked ? setDtype('f') : null)}
            />{' '}
            Fudge
          </label>
        </div>
        <div>
          <input
            className={styles.inputs}
            name='gmult'
            type='number'
            min={1}
            step={1}
            value={gmult}
            onChange={e => handleNumbers(+e.target.value, 1, setGmult)}
          />{' '}
          &times; (
        </div>
        {diceInputs}
        <div>
          ) +{' '}
          <input
            className={styles.inputs}
            name='gmod'
            type='number'
            step={1}
            value={gmod}
            onChange={e => handleNumbers(+e.target.value, 1, setGmod)}
          />
        </div>
      </form>
    </section>
  )
}

export default Input
