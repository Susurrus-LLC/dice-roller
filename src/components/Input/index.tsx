import React, { SyntheticEvent } from 'react'

import { DieType, Die, defaultDie } from '../../App'

import DiceInputs from '../DiceInputs'

import styles from './Input.module.sass'

interface Props {
  dType: DieType
  setDtype: React.Dispatch<React.SetStateAction<DieType>>
  gmult: number
  setGmult: React.Dispatch<React.SetStateAction<number>>
  gmod: number
  setGmod: React.Dispatch<React.SetStateAction<number>>
  dice: Die[]
  setDice: React.Dispatch<React.SetStateAction<Die[]>>
  handleSubmit: () => void
}

const Input: React.FC<Props> = ({
  dType = 'n',
  setDtype,
  gmult = 1,
  setGmult,
  gmod = 0,
  setGmod,
  dice = [defaultDie],
  setDice,
  handleSubmit
}) => {
  const handleNumbers = (num: number, min: number, handler: Function): void => {
    if (num < min) {
      handler(min)
    } else {
      handler(Math.round(num))
    }
  }

  const handleDieChange = (
    die: Die,
    num: number,
    change: 'mul' | 'num' | 'sid' | 'mod',
    i: number
  ): void => {
    const newDice = [...dice]

    newDice.splice(i, 1, {
      multiplier: change === 'mul' ? num : die.multiplier,
      number: change === 'num' ? num : die.number,
      sides: change === 'sid' ? num : die.sides,
      modifier: change === 'mod' ? num : die.modifier
    })

    setDice(newDice)
  }

  const diceInputs = dice.map((die, i) => {
    return (
      <DiceInputs
        dType={dType}
        die={die}
        i={i}
        handleDieChange={handleDieChange}
        key={i}
      />
    )
  })

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
        <div className={styles.dTypeRow}>
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
