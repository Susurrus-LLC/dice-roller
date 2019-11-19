import React from 'react'

import { Die, Result } from '../../App'

import styles from './Results.module.sass'

interface Props {
  results: Result[]
}

const Results: React.FC<Props> = ({ results }) => {
  const icon = (die: Die) => {
    switch (die.sides) {
      case 2:
        return <i className='df-d2-2' />
      case 4:
        return <i className='df-d4-4' />
      case 6:
        return <i className='df-d6-6' />
      case 8:
        return <i className='df-d8-8' />
      case 10:
        return <i className='df-d10-10' />
      case 12:
        return <i className='df-d12-12' />
      case 20:
        return <i className='df-d20-20' />
      default:
        return
    }
  }

  const resultRow = [...results].reverse().map(result => {
    const concatDice = result.dice.map((die, i) => (
      <React.Fragment key={i}>
        <li className={styles.die}>
          <span className={styles.code}>
            {`${die.number}d${die.sides} ${die.modifier < 0 ? '−' : '+'} ${Math.abs(die.modifier)} = `}
            <span className={styles.dieResult}>{die.result}</span>
          </span>
          <span className={styles.rolls}>
            <span className={styles.rollsIcon}>
              {icon(die)}
            </span>
            <span className={styles.rollsNums}>
              {` ${die.rolls ? die.rolls.join(', ') : null}`}
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
