import { OCCUPY_TERM, UNOCCUPY_TERM } from '../../constants'

export const occupyTerm = payload => ({
  type: OCCUPY_TERM,
  payload,
})

export const unoccupyTerm = payload => ({
  type: UNOCCUPY_TERM,
  payload,
})
