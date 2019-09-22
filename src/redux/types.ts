import { SET_OPTIONS, SET_RESULT } from './actions'

// states

export interface Options {
  number: number,
  type: 'num' | 'fudge',
  sides: number,
  modifier: number
}

export interface Result {
  result: number
}

// actions

interface SetOptionsAction {
  type: typeof SET_OPTIONS,
  options: Options
}

interface SetResultAction {
  type: typeof SET_RESULT,
  result: number
}

export type ActionTypes = SetOptionsAction | SetResultAction
