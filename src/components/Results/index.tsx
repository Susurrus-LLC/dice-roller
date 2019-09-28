import React from 'react'

import { Result } from '../../App'

import styles from './Results.module.sass'

interface Props {
  results: Result[]
}

const Results: React.FC<Props> = ({ results }) => {
  const resultRow = [...results].reverse().map(result => {
    const concatDice = result.dice.map((die, i) => (
      <li className={styles.die} key={i}>
        {`${die.multiplier} × ( ${die.number}d${die.sides} ${
          die.modifier < 0 ? '−' : '+'
        } ${Math.abs(die.modifier)} ) ${die.mulMod < 0 ? '−' : '+'} ${Math.abs(
          die.mulMod
        )}`}
      </li>
    ))

    return (
      <div className={styles.roll} key={JSON.stringify(result.rolled)}>
        <p className={styles.rollTime}>{result.rolled.toLocaleTimeString()}</p>
        <ul className={styles.dice}>{concatDice}</ul>
        <p className={styles.result}>{result.result}</p>
      </div>
    )
  })

  return <aside className={styles.results}>{resultRow}</aside>
}

export default Results
