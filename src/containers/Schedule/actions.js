import { SELECT_CLASSROOM, OCCUPY_TERM, UNOCCUPY_TERM } from '../../constants'

export const selectClassroom = payload => ({
  type: SELECT_CLASSROOM,
  payload,
})

export const occupyTerm = payload => ({
  type: OCCUPY_TERM,
  payload,
})

export const unoccupyTerm = payload => ({
  type: UNOCCUPY_TERM,
  payload,
})
