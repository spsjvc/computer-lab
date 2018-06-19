import { SET_EDITING_CLASSROOM, DELETE_CLASSROOM } from '../../constants'

export const setEditingClassroom = payload => ({
  type: SET_EDITING_CLASSROOM,
  payload,
})

export const deleteClassroom = payload => ({
  type: DELETE_CLASSROOM,
  payload,
})
