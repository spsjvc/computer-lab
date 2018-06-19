import { SET_EDITING_SOFTWARE, DELETE_SOFTWARE } from '../../constants'

export const setEditingSoftware = payload => ({
  type: SET_EDITING_SOFTWARE,
  payload,
})

export const deleteSoftware = payload => ({
  type: DELETE_SOFTWARE,
  payload,
})
