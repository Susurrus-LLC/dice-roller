import React, { SyntheticEvent } from 'react'

import { DieType, Die, defaultDie } from '../../App'

import DiceInputs from '../DiceInputs'

import styles from './Input.module.sass'

interface Props {
  dType: DieType
  setDtype: React.Dispatch<React.SetStateAction<DieType>>
  dice: Die[]
  setDice: React.Dispatch<React.SetStateAction<Die[]>>
  handleSubmit: () => void
}

const Input: React.FC<Props> = ({
  dType = 'n',
  setDtype,
  dice = [defaultDie],
  setDice,
  handleSubmit
}) => {
  const handleNumbers = (num: number, min?: number): number => (
    min
    ? num < min
      ? min
      : Math.round(num)
    : Math.round(num)
  )

  const handleDieChange = (
    die: Die,
    num: number,
    change: 'mul' | 'num' | 'sid' | 'mod' | 'mulmod',
    i: number
  ): void => {
    const newDice = [...dice]

    newDice.splice(i, 1, {
      multiplier: change === 'mul' ? handleNumbers(num, 1) : die.multiplier,
      number: change === 'num' ? handleNumbers(num, 1) : die.number,
      sides: change === 'sid' ? handleNumbers(num, 2) : die.sides,
      modifier: change === 'mod' ? handleNumbers(num) : die.modifier,
      mulMod: change === 'mulmod' ? handleNumbers(num) : die.mulMod
    })

    setDice(newDice)
  }

  const diceInputs = dice.map((die, i) => (
    <DiceInputs
      dType={dType}
      die={die}
      i={i}
      handleDieChange={handleDieChange}
      key={i}
    />
  ))

  const submit = (e: SyntheticEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <section className={styles.input}>
      <form
        id={styles.diceForm}
        className={styles.diceForm}
        name='diceForm'
        autoComplete='false'
      >
        <p className={styles.dTypeRow}>
          <label className={styles.dType}>
            <input
              name='dtype'
              type='radio'
              value='n'
              checked={dType === 'n'}
              onChange={e => (e.target.checked ? setDtype('n') : null)}
            />{' '}
            Number
          </label>
          <label className={styles.dType}>
            <input
              name='dtype'
              type='radio'
              value='f'
              checked={dType === 'f'}
              onChange={e => (e.target.checked ? setDtype('f') : null)}
            />{' '}
            Fudge
          </label>
        </p>
        {diceInputs}
        <button
          className={styles.submit}
          name='submit'
          type='submit'
          value='submit'
          onClick={submit}
        >
          Roll
        </button>
      </form>
    </section>
  )
}

export default Input
