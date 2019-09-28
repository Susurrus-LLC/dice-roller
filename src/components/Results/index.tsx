import React from 'react'

import { Result } from '../../App'

import styles from './Results.module.sass'

interface Props {
  results: Result[]
}

const Results: React.FC<Props> = ({ results }) => {
  const resultRow = [...results].reverse().map(result => (
    <div className={styles.roll} key={JSON.stringify(result.rolled)}>
      <p className={styles.rollTime}>{result.rolled.toLocaleTimeString()}</p>
      <p className={styles.dice}>{JSON.stringify(result.dice)}</p>
      <p className={styles.result}>{result.result}</p>
    </div>
  ))

  return <aside className={styles.results}>{resultRow}</aside>
}

export default Results
