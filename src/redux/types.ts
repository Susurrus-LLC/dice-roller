import { SET_DNUM, INC_DNUM, DEC_DNUM, SET_DTYPE, SET_DSIDES, INC_DSIDES, DEC_DSIDES, SET_MOD, INC_MOD, DEC_MOD, SET_RESULT, CLEAR_RESULTS } from './actions'

// states

export type DNum = number
export type DType = 'num' | 'fudge'
export type DSides = number
export type Modifier = number
export type Result = number

export interface Options {
  dNum: DNum,
  dType: DType,
  dSides: DSides,
  modifier: Modifier
}

export interface Results {
  result: Result
}

// actions

interface SetNumAction {
  type: typeof SET_DNUM | typeof INC_DNUM | typeof DEC_DNUM,
  number: DNum
}

interface SetTypeAction {
  type: typeof SET_DTYPE,
  dType: DType
}

interface SetDSidesAction {
  type: typeof SET_DSIDES | typeof INC_DSIDES | typeof DEC_DSIDES,
  dSides: DSides
}

interface SetModAction {
  type: typeof SET_MOD | typeof INC_MOD | typeof DEC_MOD,
  modifier: Modifier
}

interface SetResultAction {
  type: typeof SET_RESULT,
  result: number
}

interface ClearResultsAction {
  type: typeof CLEAR_RESULTS,
  results: number[]
}

export type ActionTypes = SetNumAction | SetTypeAction | SetDSidesAction | SetModAction | SetResultAction | ClearResultsAction
