import { SET_EDITING_CLASSROOM, EDIT_CLASSROOM } from '../../constants'

export const setEditingClassroom = payload => ({
  type: SET_EDITING_CLASSROOM,
  payload,
})

export const editClassroom = payload => ({
  type: EDIT_CLASSROOM,
  payload,
})
