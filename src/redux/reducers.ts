import { ActionTypes, Results, Dice, Die } from './types'
import {
  SET_DNUM,
  INC_DNUM,
  DEC_DNUM,
  SET_DSIDES,
  INC_DSIDES,
  DEC_DSIDES,
  SET_MOD,
  INC_MOD,
  DEC_MOD,
  SET_RESULT,
  CLEAR_RESULTS,
  ADD_DIE,
  DEL_DIE,
  SET_DTYPE,
  SET_GMULT,
  INC_GMULT,
  DEC_GMULT,
  SET_GMOD,
  INC_GMOD,
  DEC_GMOD,
  SET_MULT,
  INC_MULT,
  DEC_MULT
} from './actions'

const defaultDie: Die = {
  multiplier: 1,
  dNum: 1,
  sides: 20,
  modifier: 0
}

const defaultDice: Dice = {
  dType: 'num',
  multiplier: 1,
  dice: [defaultDie],
  modifier: 0
}

export const dice = (state: Dice = defaultDice, action: ActionTypes): Dice => {
  let newDice = [...state.dice]
  switch (action.type) {
    case SET_DTYPE:
      return Object.assign({}, state, {
        dType: action.dType
      })
    case SET_GMULT || INC_GMULT || DEC_GMULT:
      return Object.assign({}, state, {
        multiplier: action.multiplier
      })
    case SET_GMOD || INC_GMOD || DEC_GMOD:
      return Object.assign({}, state, {
        modifier: action.modifier
      })
    case ADD_DIE:
      newDice.splice(action.dID, 0, {
        multiplier: 1,
        dNum: 1,
        sides: state.dType === 'num' ? 20 : 'f',
        modifier: 0
      })

      return Object.assign({}, state, {
        dice: newDice
      })
    case DEL_DIE:
      newDice.splice(action.dID, 1)

      return Object.assign({}, state, {
        dice: newDice
      })
    case SET_MULT || INC_MULT || DEC_MULT:
      newDice[action.dID] = {
        multiplier: action.multiplier,
        dNum: newDice[action.dID].dNum,
        sides: newDice[action.dID].sides,
        modifier: newDice[action.dID].modifier
      }

      return Object.assign({}, state, {
        dice: newDice
      })
    case SET_DNUM || INC_DNUM || DEC_DNUM:
      newDice[action.dID] = {
        multiplier: newDice[action.dID].multiplier,
        dNum: action.number,
        sides: newDice[action.dID].sides,
        modifier: newDice[action.dID].modifier
      }

      return Object.assign({}, state, {
        dice: newDice
      })
    case SET_DSIDES || INC_DSIDES || DEC_DSIDES:
      newDice[action.dID] = {
        multiplier: newDice[action.dID].multiplier,
        dNum: newDice[action.dID].dNum,
        sides: action.sides,
        modifier: newDice[action.dID].modifier
      }

      return Object.assign({}, state, {
        dice: newDice
      })
    case SET_MOD || INC_MOD || DEC_MOD:
      newDice[action.dID] = {
        multiplier: newDice[action.dID].multiplier,
        dNum: newDice[action.dID].dNum,
        sides: newDice[action.dID].sides,
        modifier: action.modifier
      }

      return Object.assign({}, state, {
        dice: newDice
      })
    default:
      return state
  }
}

export const results = (
  state: Results[] = [],
  action: ActionTypes
): Results[] => {
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
