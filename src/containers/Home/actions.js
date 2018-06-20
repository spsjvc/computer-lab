import { SET_IS_TUTORIAL_VISIBLE, SET_TUTORIAL_STEP } from '../../constants'

export const setIsTutorialVisible = payload => ({
  type: SET_IS_TUTORIAL_VISIBLE,
  payload,
})

export const setTutorialStep = payload => ({
  type: SET_TUTORIAL_STEP,
  payload,
})
