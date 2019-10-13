import React from 'react'

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
}

const DiceInputs: React.FC<Props> = ({
  die = defaultDie,
  i = 0,
  handleDieChange
}) => (
  <p className={styles.dieRow} key={i}>
    <input
      className={inputStyles.inputs}
      name={`number-${i}`}
      type='number'
      min={1}
      step={1}
      value={die.number}
      onChange={e => handleDieChange(die, +e.target.value, 'num', i)}
    />{' '}
    d
    <select
      className={inputStyles.inputs}
      name={`sides-${i}`}
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
      <option value='f'>f</option>
      <option value='other'>other</option>
    </select>{' '}
    +{' '}
    <input
      className={inputStyles.inputs}
      name={`modifier-${i}`}
      type='number'
      step={1}
      value={die.modifier}
      onChange={e => handleDieChange(die, +e.target.value, 'mod', i)}
    />
  </p>
)

export default DiceInputs
