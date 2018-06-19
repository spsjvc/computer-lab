import { SET_EDITING_STUDY, EDIT_STUDY } from '../../constants'

export const setEditingStudy = payload => ({
  type: SET_EDITING_STUDY,
  payload,
})

export const editStudy = payload => ({
  type: EDIT_STUDY,
  payload,
})
