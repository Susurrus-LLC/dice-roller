import {
  ActionTypes,
  DNum,
  DType,
  Sides,
  Modifier,
  Result,
  DID,
  Multiplier
} from './types'
import { isNumber } from 'util'

// action types

export const SET_DTYPE = 'SET_DTYPE'
export const SET_GMULT = 'SET_GMULT'
export const INC_GMULT = 'INC_GMULT'
export const DEC_GMULT = 'DEC_GMULT'
export const SET_GMOD = 'SET_GMOD'
export const INC_GMOD = 'INC_GMOD'
export const DEC_GMOD = 'DEC_GMOD'
export const ADD_DIE = 'ADD_DIE'
export const DEL_DIE = 'DEL_DIE'
export const SET_MULT = 'SET_MULT'
export const INC_MULT = 'INC_MULT'
export const DEC_MULT = 'DEC_MULT'
export const SET_DNUM = 'SET_DNUM'
export const INC_DNUM = 'INC_DNUM'
export const DEC_DNUM = 'DEC_DNUM'
export const SET_DSIDES = 'SET_DSIDES'
export const INC_DSIDES = 'INC_DSIDES'
export const DEC_DSIDES = 'DEC_DSIDES'
export const SET_MOD = 'SET_MOD'
export const INC_MOD = 'INC_MOD'
export const DEC_MOD = 'DEC_MOD'
export const SET_RESULT = 'SET_RESULT'
export const CLEAR_RESULTS = 'CLEAR_RESULTS'

// action creators

export const setDType = (dType: DType): ActionTypes => ({
  type: SET_DTYPE,
  dType
})

export const setGMult = (multiplier: Multiplier): ActionTypes => ({
  type: SET_GMULT,
  multiplier
})

export const incGMult = (multiplier: Multiplier): ActionTypes => ({
  type: INC_GMULT,
  multiplier: multiplier + 1
})

export const decGMult = (multiplier: Multiplier): ActionTypes => ({
  type: DEC_GMULT,
  multiplier: multiplier - 1
})

export const setGMod = (modifier: Modifier): ActionTypes => ({
  type: SET_GMOD,
  modifier
})

export const incGMod = (modifier: Modifier): ActionTypes => ({
  type: INC_GMOD,
  modifier: modifier + 1
})

export const decGMod = (modifier: Modifier): ActionTypes => ({
  type: DEC_GMOD,
  modifier: modifier - 1
})

export const addDie = (dID: DID): ActionTypes => ({
  type: ADD_DIE,
  dID
})

export const delDie = (dID: DID): ActionTypes => ({
  type: DEL_DIE,
  dID
})

export const setMult = (multiplier: Multiplier, dID: DID): ActionTypes => ({
  type: SET_MULT,
  dID,
  multiplier
})

export const incMult = (multiplier: Multiplier, dID: DID): ActionTypes => ({
  type: INC_MULT,
  dID,
  multiplier: multiplier + 1
})

export const decMult = (multiplier: Multiplier, dID: DID): ActionTypes => ({
  type: DEC_MULT,
  dID,
  multiplier: multiplier - 1
})

export const setDNum = (number: DNum, dID: DID): ActionTypes => ({
  type: SET_DNUM,
  dID,
  number
})

export const incDNum = (number: DNum, dID: DID): ActionTypes => ({
  type: INC_DNUM,
  dID,
  number: number + 1
})

export const decDNum = (number: DNum, dID: DID): ActionTypes => ({
  type: DEC_DNUM,
  dID,
  number: number - 1
})

export const setDSides = (sides: Sides, dID: DID): ActionTypes => ({
  type: SET_DSIDES,
  dID,
  sides
})

export const incDSides = (sides: Sides, dID: DID): ActionTypes => ({
  type: INC_DSIDES,
  dID,
  sides: isNumber(sides) ? sides + 1 : sides
})

export const decDSides = (sides: Sides, dID: DID): ActionTypes => ({
  type: DEC_DSIDES,
  dID,
  sides: isNumber(sides) ? sides - 1 : sides
})

export const setMod = (modifier: Modifier, dID: DID): ActionTypes => ({
  type: SET_MOD,
  dID,
  modifier
})

export const incMod = (modifier: Modifier, dID: DID): ActionTypes => ({
  type: INC_MOD,
  dID,
  modifier: modifier + 1
})

export const decMod = (modifier: Modifier, dID: DID): ActionTypes => ({
  type: DEC_MOD,
  dID,
  modifier: modifier - 1
})

export const setResult = (result: Result): ActionTypes => ({
  type: SET_RESULT,
  result
})

export const clearResults = (): ActionTypes => ({
  type: CLEAR_RESULTS,
  results: []
})
