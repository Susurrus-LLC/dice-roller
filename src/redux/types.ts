import {
  SET_DNUM,
  INC_DNUM,
  DEC_DNUM,
  SET_DTYPE,
  SET_DSIDES,
  INC_DSIDES,
  DEC_DSIDES,
  SET_MULT,
  INC_MULT,
  DEC_MULT,
  SET_MOD,
  INC_MOD,
  DEC_MOD,
  SET_RESULT,
  CLEAR_RESULTS,
  ADD_DIE,
  DEL_DIE,
  SET_GMULT,
  INC_GMULT,
  DEC_GMULT,
  SET_GMOD,
  INC_GMOD,
  DEC_GMOD
} from './actions'

// states

export type DType = 'num' | 'fudge'
export type DID = number
export type Multiplier = number
export type DNum = number
export type Sides = number | 'f'
export type Modifier = number
export type Result = number

export interface Die {
  multiplier: Multiplier
  dNum: DNum
  sides: Sides
  modifier: Modifier
}

export interface Dice {
  dType: DType
  multiplier: Multiplier
  dice: Die[]
  modifier: Modifier
}

export interface Results {
  result: Result
}

// actions

interface SetTypeAction {
  type: typeof SET_DTYPE
  dType: DType
}

interface SetGMultAction {
  type: typeof SET_GMULT | typeof INC_GMULT | typeof DEC_GMULT
  multiplier: Multiplier
}

interface SetGModAction {
  type: typeof SET_GMOD | typeof INC_GMOD | typeof DEC_GMOD
  modifier: Modifier
}

interface AddDelDieAction {
  type: typeof ADD_DIE | typeof DEL_DIE
  dID: DID
}

interface SetMultAction {
  type: typeof SET_MULT | typeof INC_MULT | typeof DEC_MULT
  dID: DID
  multiplier: Multiplier
}

interface SetNumAction {
  type: typeof SET_DNUM | typeof INC_DNUM | typeof DEC_DNUM
  dID: DID
  number: DNum
}

interface SetDSidesAction {
  type: typeof SET_DSIDES | typeof INC_DSIDES | typeof DEC_DSIDES
  dID: DID
  sides: Sides
}

interface SetModAction {
  type: typeof SET_MOD | typeof INC_MOD | typeof DEC_MOD
  dID: DID
  modifier: Modifier
}

interface SetResultAction {
  type: typeof SET_RESULT
  result: number
}

interface ClearResultsAction {
  type: typeof CLEAR_RESULTS
  results: number[]
}

export type ActionTypes =
  | SetTypeAction
  | SetGMultAction
  | SetGModAction
  | AddDelDieAction
  | SetMultAction
  | SetNumAction
  | SetDSidesAction
  | SetModAction
  | SetResultAction
  | ClearResultsAction
