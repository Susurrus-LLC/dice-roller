import { ActionTypes, DNum, DType, DSides, Modifier, Result } from './types'

// action types

export const SET_DNUM = 'SET_DNUM'
export const INC_DNUM = 'INC_DNUM'
export const DEC_DNUM = 'DEC_DNUM'
export const SET_DTYPE = 'SET_DTYPE'
export const SET_DSIDES = 'SET_DSIDES'
export const INC_DSIDES = 'INC_DSIDES'
export const DEC_DSIDES = 'DEC_DSIDES'
export const SET_MOD = 'SET_MOD'
export const INC_MOD = 'INC_MOD'
export const DEC_MOD = 'DEC_MOD'
export const SET_RESULT = 'SET_RESULT'
export const CLEAR_RESULTS = 'CLEAR_RESULTS'

// action creators

export const setDNum = (number: DNum): ActionTypes => (
  {
    type: SET_DNUM,
    number
  }
)

export const incDNum = (number: DNum): ActionTypes => (
  {
    type: INC_DNUM,
    number: number + 1
  }
)

export const decDNum = (number: DNum): ActionTypes => (
  {
    type: DEC_DNUM,
    number: number - 1
  }
)

export const setDType = (dType: DType): ActionTypes => (
  {
    type: SET_DTYPE,
    dType
  }
)

export const setDSides = (dSides: DSides): ActionTypes => (
  {
    type: SET_DSIDES,
    dSides
  }
)

export const incDSides = (dSides: DSides): ActionTypes => (
  {
    type: INC_DSIDES,
    dSides: dSides + 1
  }
)

export const decDSides = (dSides: DSides): ActionTypes => (
  {
    type: DEC_DSIDES,
    dSides: dSides - 1
  }
)

export const setMod = (modifier: Modifier): ActionTypes => (
  {
    type: SET_MOD,
    modifier
  }
)

export const incMod = (modifier: Modifier): ActionTypes => (
  {
    type: INC_MOD,
    modifier: modifier + 1
  }
)

export const decMod = (modifier: Modifier): ActionTypes => (
  {
    type: DEC_MOD,
    modifier: modifier - 1
  }
)

export const setResult = (result: Result): ActionTypes => (
  {
    type: SET_RESULT,
    result
  }
)

export const clearResults = (): ActionTypes => (
  {
    type: CLEAR_RESULTS,
    results: []
  }
)
