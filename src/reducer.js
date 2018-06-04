import { initialState } from './store'
import * as ACTION from './constants'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ADD_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload],
      }

    case ACTION.ADD_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, action.payload],
      }

    case ACTION.ADD_STUDY:
      return {
        ...state,
        studies: [...state.studies, action.payload],
      }

    case ACTION.ADD_SOFTWARE:
      return {
        ...state,
        software: [...state.software, action.payload],
      }

    case ACTION.DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: state.classrooms.filter(c => c.id !== action.payload),
      }

    case ACTION.DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(s => s.id !== action.payload),
      }

    case ACTION.DELETE_STUDY:
      return {
        ...state,
        studies: state.studies.filter(s => s.id !== action.payload),
      }

    case ACTION.DELETE_SOFTWARE:
      return {
        ...state,
        software: state.software.filter(s => s.id !== action.payload),
      }

    default:
      return state
  }
}

export default reducer
