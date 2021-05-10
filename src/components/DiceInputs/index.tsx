import React, { SyntheticEvent } from 'react'

import { Die, defaultDie } from '../../App'

import inputStyles from '../Input/Input.module.sass'

import styles from './DiceInputs.module.sass'

interface Props {
  die: Die
  i: number
  handleDieChange: (
    die: Die,
    num: number,
    change: 'num' | 'sid' | 'oth' | 'mod',
    i: number
  ) => void
  handleAddRemove: (e: SyntheticEvent) => void
  numDice: number
}

const DiceInputs: React.FC<Props> = ({
  die = defaultDie,
  i = 0,
  handleDieChange,
  handleAddRemove,
  numDice
}) => {
  const addButton = (): JSX.Element => (
    <button
      type='button'
      className={styles.add}
      name={`add-${i + 1}`}
      data-action='add'
      aria-label='Add a new die'
      value={i}
      onClick={handleAddRemove}
    >
      Add
    </button>
  )

  const remButton = (): JSX.Element => (
    <button
      type='button'
      className={styles.remove}
      name={`remove-${i + 1}`}
      data-action='remove'
      aria-label={`Remove die ${i + 1}`}
      value={i}
      onClick={handleAddRemove}
    >
      Remove
    </button>
  )

  return (
    <p className={styles.dieRow} key={i}>
      <input
        className={inputStyles.inputs}
        name={`number-${i + 1}`}
        aria-label={`Dice ${i + 1} multiplier`}
        type='number'
        min={1}
        step={1}
        value={die.number}
        onChange={e => handleDieChange(die, +e.target.value, 'num', i)}
      />{' '}
      d
      <select
        className={inputStyles.selects}
        name={`sides-${i + 1}`}
        aria-label={`Dice ${i + 1} number of sides`}
        value={die.sides}
        onChange={e => handleDieChange(die, +e.target.value, 'sid', i)}
      >
        <option value={20}>20</option>
        <option value={12}>12</option>
        <option value={10}>10</option>
        <option value={8}>8</option>
        <option value={6}>6</option>
        <option value={4}>4</option>
        <option value={2}>2</option>
        <option value='f' disabled>
          fudge
        </option>
        <option value='other' disabled>
          other
        </option>
      </select>{' '}
      +{' '}
      <input
        className={inputStyles.inputs}
        name={`modifier-${i + 1}`}
        aria-label={`Dice ${i + 1} modifier`}
        type='number'
        step={1}
        value={die.modifier}
        onChange={e => handleDieChange(die, +e.target.value, 'mod', i)}
      />
      {addButton()}
      {numDice > 1 ? remButton() : null}
    </p>
  )
}

export default DiceInputs
