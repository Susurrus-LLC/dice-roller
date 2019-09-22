import React from 'react'

import styles from './Header.module.sass'

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1 className='title'>Dice Roller</h1>
  </header>
)

export default Header
