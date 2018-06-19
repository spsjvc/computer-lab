import { SET_EDITING_STUDY, DELETE_STUDY } from '../../constants'

export const setEditingStudy = payload => ({
  type: SET_EDITING_STUDY,
  payload,
})

export const deleteStudy = payload => ({
  type: DELETE_STUDY,
  payload,
})
