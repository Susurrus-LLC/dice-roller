import React from 'react'

import { DieType, Die, defaultDie } from '../../App'

import inputStyles from '../Input/Input.module.sass'

import styles from './DiceInputs.module.sass'

interface Props {
  dType: DieType
  die: Die
  i: number
  handleDieChange: (
    die: Die,
    num: number,
    change: 'mul' | 'num' | 'sid' | 'mod' | 'mulmod',
    i: number
  ) => void
}

const DiceInputs: React.FC<Props> = ({
  dType = 'n',
  die = defaultDie,
  i = 0,
  handleDieChange
}) => (
  <p className={styles.dieRow} key={i}>
    <input
      className={inputStyles.inputs}
      name={`multiplier-${i}`}
      type='number'
      min={1}
      step={1}
      value={die.multiplier}
      onChange={e => handleDieChange(die, +e.target.value, 'mul', i)}
    />{' '}
    &times; ({' '}
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
    {dType === 'n' ? (
      <input
        className={inputStyles.inputs}
        name={`sides-${i}`}
        type='number'
        min={2}
        step={1}
        value={die.sides}
        onChange={e => handleDieChange(die, +e.target.value, 'sid', i)}
      />
    ) : dType === 'f' ? (
      <input
        className={inputStyles.inputs}
        name={`sides-${i}`}
        type='text'
        value='f'
        readOnly
      />
    ) : null}{' '}
    +{' '}
    <input
      className={inputStyles.inputs}
      name={`modifier-${i}`}
      type='number'
      step={1}
      value={die.modifier}
      onChange={e => handleDieChange(die, +e.target.value, 'mod', i)}
    />{' '}
    ) +{' '}
    <input
      className={inputStyles.inputs}
      name={`mulmod-${i}`}
      type='number'
      step={1}
      value={die.mulMod}
      onChange={e => handleDieChange(die, +e.target.value, 'mulmod', i)}
    />
  </p>
)

export default DiceInputs
