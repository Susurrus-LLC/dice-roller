import React from 'react'

import styles from './Input.module.sass'

const Input: React.FC = () => (
  <section className={styles.input}>
    <input type='number' name='dice' className={styles.inputs} /> d
    <input type='number' name='dieType' className={styles.inputs} /> +{' '}
    <input type='number' name='modifier' className={styles.inputs} />
  </section>
)

export default Input
