import { DELETE_SOFTWARE } from '../../constants'

export const deleteSoftware = payload => ({
  type: DELETE_SOFTWARE,
  payload,
})
