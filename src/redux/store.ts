import { combineReducers, createStore } from 'redux'
import { dice, results } from './reducers'

const diceApp = combineReducers({
  dice,
  results
})

const store = createStore(diceApp)

export default store
