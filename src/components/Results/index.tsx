import React from 'react'

import { Result } from '../../App'

import styles from './Results.module.sass'

interface Props {
  results: Result[]
}

const Results: React.FC<Props> = ({ results }) => {
  const resultRow = [...results].reverse().map(result => (
    <div key={JSON.stringify(result.rolled)}>
      <p>{JSON.stringify(result.rolled)}</p>
      <p>{JSON.stringify(result.dice)}</p>
      <p>{result.result}</p>
    </div>
  ))

  return <aside className={styles.results}>{resultRow}</aside>
}

export default Results
