import React from 'react'

import { DieType, Die } from '../../App'

import styles from './Analysis.module.sass'

interface Props {
  dType: DieType
  dice: Die[]
}

const Analysis: React.FC<Props> = ({ dType, dice }) => {
  
  return (
    <section className={styles.analysis}>
      <p>Analysis</p>
    </section>
  )
}

export default Analysis
