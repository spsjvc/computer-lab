import { DELETE_STUDY } from '../../constants'

export const deleteStudy = payload => ({
  type: DELETE_STUDY,
  payload,
})
