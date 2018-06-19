import { SET_EDITING_SOFTWARE, EDIT_SOFTWARE } from '../../constants'

export const setEditingSoftware = payload => ({
  type: SET_EDITING_SOFTWARE,
  payload,
})

export const editSoftware = payload => ({
  type: EDIT_SOFTWARE,
  payload,
})
