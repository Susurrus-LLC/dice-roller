import React from 'react'

import { Result } from '../../App'

import styles from './Results.module.sass'

interface Props {
  results: Result[]
}

const Results: React.FC<Props> = ({ results }) => {
  const resultRow = [...results].reverse().map(result => {
    const concatDice = result.dice.map((die, i) => (
      <React.Fragment key={i}>
        <li className={styles.die}>
          <span className={styles.code}>
            {`${die.number}d${die.sides} ${
              die.modifier < 0 ? '−' : '+'
            } ${Math.abs(die.modifier)} = `}
            <span className={styles.dieResult}>{die.result}</span>
          </span>
          <span className={styles.rolls}>
            <span className={styles.rollsIcon}>
              <i className={`${styles.icon} fas fa-dice-d20`} />
            </span>
            <span className={styles.rollsNums}>
              {` ${die.rolls !== undefined ? die.rolls.join(', ') : ''}`}
            </span>
          </span>
        </li>
      </React.Fragment>
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
