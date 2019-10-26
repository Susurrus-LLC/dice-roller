import React from 'react'

import styles from './Footer.module.sass'

const Footer: React.FC = () => {
  const years = (): string => {
    const start = 2019
    const current = new Date().getFullYear()
    return current > start ? `${start}–${current}` : start.toString()
  }

  const author = 'Ian A. Cook'
  const authorURL = 'https://github.com/nai888/'
  const appGhURL = 'https://github.com/nai888/dice-roller/'
  const version = '0.1.2'

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        <i className='fas fa-code' />{' '}
        <a
          href={appGhURL + 'blob/master/CHANGELOG.md'}
          target='_blank'
          rel='noopener noreferrer'
        >
          Version {version}
        </a>
        . Built by <i className='fas fa-wrench' />{' '}
        <a href={authorURL} target='_blank' rel='noopener noreferrer'>
          {author}
        </a>
        , copyright &copy; {years()} under the <i className='fas fa-gavel' />{' '}
        <a
          href={appGhURL + 'blob/master/LICENSE'}
          target='_blank'
          rel='noopener noreferrer'
        >
          AGPL-3.0
        </a>{' '}
        license. View this project <i className='fab fa-github' />{' '}
        <a href={appGhURL} target='_blank' rel='noopener noreferrer'>
          on GitHub
        </a>
        .
      </p>
    </footer>
  )
}

export default Footer
