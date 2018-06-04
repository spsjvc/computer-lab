import { DELETE_CLASSROOM } from '../../constants'

export const deleteClassroom = payload => ({
  type: DELETE_CLASSROOM,
  payload,
})
