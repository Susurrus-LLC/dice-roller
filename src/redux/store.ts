import { createStore } from 'redux'
import diceApp from './reducers'

const store = createStore(diceApp)

export default store
