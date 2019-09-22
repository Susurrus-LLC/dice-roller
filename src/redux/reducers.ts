import { combineReducers } from 'redux'

import { ActionTypes, Options, Result } from './types'
import { SET_OPTIONS, SET_RESULT } from './actions'

const options = (state: Options[] = [], action: ActionTypes) => {
  switch (action.type) {
    case SET_OPTIONS:
      return [
        ...state,
        {
          number: action.options.number,
          type: action.options.type,
          sides: action.options.sides,
          modifier: action.options.modifier
        }
      ]
    default:
      return state
  }
}

const result = (state: Result[] = [], action: ActionTypes) => {
  switch (action.type) {
    case SET_RESULT:
      return [
        ...state,
        {
          result: action.result
        }
      ]
    default:
      return state
  }
}

const diceApp = combineReducers({
  options,
  result
})

export default diceApp
