import React from 'react'
import ReactDOM from 'react-dom'

import { Die, defaultDie } from '../../App'

import DiceInputs from './'

it('renders without crashing', () => {
  const handleDieChange = (
    die: Die,
    num: number,
    change: 'mul' | 'num' | 'sid' | 'mod' | 'mulmod',
    i: number
  ): void => {
    return
  }

  const div = document.createElement('div')

  ReactDOM.render(
    <DiceInputs
      dType='n'
      die={defaultDie}
      i={0}
      handleDieChange={handleDieChange}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
