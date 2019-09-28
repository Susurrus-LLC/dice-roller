import React from 'react'
import ReactDOM from 'react-dom'

import { defaultDie } from '../../App'

import Input from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Input
      dType='n'
      setDtype={() => {
        return
      }}
      gmult={1}
      setGmult={() => {
        return
      }}
      gmod={0}
      setGmod={() => {
        return
      }}
      dice={[defaultDie]}
      setDice={() => {
        return
      }}
      handleSubmit={() => {
        return
      }}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
