import React from 'react'
import ReactDOM from 'react-dom'

import Analysis from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Analysis dType='n' dice={[]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
