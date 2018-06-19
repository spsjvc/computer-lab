import { SET_EDITING_SUBJECT, DELETE_SUBJECT } from '../../constants'

export const setEditingSubject = payload => ({
  type: SET_EDITING_SUBJECT,
  payload,
})

export const deleteSubject = payload => ({
  type: DELETE_SUBJECT,
  payload,
})
