import { SET_EDITING_SUBJECT, DELETE_SUBJECT, CLEAR_SUBJECT_SCHEDULE } from '../../constants'

export const setEditingSubject = payload => ({
  type: SET_EDITING_SUBJECT,
  payload,
})

export const clearSubjectSchedule = payload => ({
  type: CLEAR_SUBJECT_SCHEDULE,
  payload,
})

export const deleteSubject = payload => ({
  type: DELETE_SUBJECT,
  payload,
})
