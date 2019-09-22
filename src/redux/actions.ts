import { Options } from './types'

// action types

export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_RESULT = 'SET_RESULT'

// action creators

export const setOptions = (options: Options) => (
  {
    type: SET_OPTIONS,
    options
  }
)

export const setResult = (result: number) => (
  {
    type: SET_RESULT,
    result
  }
)
