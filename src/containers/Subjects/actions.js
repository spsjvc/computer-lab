import { DELETE_SUBJECT } from '../../constants'

export const deleteSubject = payload => ({
  type: DELETE_SUBJECT,
  payload,
})
