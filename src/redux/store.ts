import { combineReducers, createStore } from 'redux'
import { options, results } from './reducers'

const diceApp = combineReducers({
  options,
  results
})

const store = createStore(diceApp)

export default store
