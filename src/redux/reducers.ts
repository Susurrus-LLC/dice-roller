import { ActionTypes, Options, Results } from './types'
import {
  SET_DNUM,
  INC_DNUM,
  DEC_DNUM,
  SET_DTYPE,
  SET_DSIDES,
  INC_DSIDES,
  DEC_DSIDES,
  SET_MOD,
  INC_MOD,
  DEC_MOD,
  SET_RESULT,
  CLEAR_RESULTS
} from './actions'

export const options = (state: Options[] = [], action: ActionTypes) => {
  switch (action.type) {
    case SET_DNUM || INC_DNUM || DEC_DNUM:
      return [
        ...state,
        Object.assign({}, state[-1], {
          dNum: action.number
        })
      ]
    case SET_DTYPE:
      return [
        ...state,
        Object.assign({}, state[-1], {
          dType: action.dType
        })
      ]
    case SET_DSIDES || INC_DSIDES || DEC_DSIDES:
      return [
        ...state,
        Object.assign({}, state[-1], {
          dSides: action.dSides
        })
      ]
    case SET_MOD || INC_MOD || DEC_MOD:
      return [
        ...state,
        Object.assign({}, state[-1], {
          modifier: action.modifier
        })
      ]
    default:
      return state
  }
}

export const results = (state: Results[] = [], action: ActionTypes) => {
  switch (action.type) {
    case SET_RESULT:
      return [
        ...state,
        {
          result: action.result
        }
      ]
    case CLEAR_RESULTS:
      return []
    default:
      return state
  }
}
