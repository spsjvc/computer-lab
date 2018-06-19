import { SET_EDITING_SUBJECT, EDIT_SUBJECT } from '../../constants'

export const setEditingSubject = payload => ({
  type: SET_EDITING_SUBJECT,
  payload,
})

export const editSubject = payload => ({
  type: EDIT_SUBJECT,
  payload,
})
