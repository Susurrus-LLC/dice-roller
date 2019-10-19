import React, { SyntheticEvent } from 'react'

import { Die, defaultDie } from '../../App'

import DiceInputs from '../DiceInputs'

import styles from './Input.module.sass'

interface Props {
  dice: Die[]
  setDice: React.Dispatch<React.SetStateAction<Die[]>>
  handleSubmit: () => void
  handleAddRemove: (e: SyntheticEvent) => void
}

const Input: React.FC<Props> = ({
  dice = [defaultDie],
  setDice,
  handleSubmit,
  handleAddRemove
}) => {
  const handleNumbers = (num: number, min?: number): number =>
    min ? (num < min ? min : Math.round(num)) : Math.round(num)

  const handleDieChange = (
    die: Die,
    num: number,
    change: 'num' | 'sid' | 'oth' | 'mod',
    i: number
  ): void => {
    const newDice = [...dice]

    newDice.splice(i, 1, {
      number: change === 'num' ? handleNumbers(num, 1) : die.number,
      sides: change === 'sid' ? handleNumbers(num, 2) : die.sides,
      other: die.other,
      modifier: change === 'mod' ? handleNumbers(num) : die.modifier
    })

    setDice(newDice)
  }

  const diceInputs = dice.map((die, i) => (
    <DiceInputs
      die={die}
      i={i}
      handleDieChange={handleDieChange}
      handleAddRemove={handleAddRemove}
      numDice={dice.length}
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
