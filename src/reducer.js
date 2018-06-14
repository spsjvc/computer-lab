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

    case ACTION.OCCUPY_TERM: {
      const { classroomId, subjectId, coordinates, length } = action.payload

      const classroom = state.classrooms.find(c => c.id === classroomId)
      const subject = state.subjects.find(s => s.id === subjectId)

      const updatedSubject = {
        ...subject,
        numberOfTermsRemaining: subject.numberOfTermsRemaining - 1,
      }

      const updatedClassroom = { ...classroom }
      for (let i = coordinates.y; i < coordinates.y + length * 3; i++) {
        updatedClassroom.layout[coordinates.x][i] = subjectId
      }

      return {
        ...state,
        subjects: state.subjects.filter(s => s.id !== subjectId).concat([updatedSubject]),
        classrooms: state.classrooms.filter(c => c.id !== classroomId).concat([updatedClassroom]),
      }
    }

    case ACTION.UNOCCUPY_TERM: {
      const { x, y, classroomId } = action.payload

      const classroom = state.classrooms.find(c => c.id === classroomId)
      const subjectId = classroom.layout[x][y]
      const subject = state.subjects.find(s => s.id === subjectId)

      let termStartY = y
      while (classroom.layout[x][termStartY - 1] === subjectId) {
        termStartY--
      }

      let termEndY = y
      while (classroom.layout[x][termEndY + 1] === subjectId) {
        termEndY++
      }

      const updatedClassroom = { ...classroom }
      for (let i = termStartY; i < termEndY + 1; i++) {
        updatedClassroom.layout[x][i] = 0
      }

      const updatedSubject = {
        ...subject,
        numberOfTermsRemaining: subject.numberOfTermsRemaining + 1,
      }

      return {
        ...state,
        subjects: state.subjects.filter(s => s.id !== subjectId).concat([updatedSubject]),
        classrooms: state.classrooms.filter(c => c.id !== classroomId).concat([updatedClassroom]),
      }
    }

    case ACTION.SELECT_CLASSROOM:
      return { ...state, selectedClassroom: action.payload }

    default:
      return state
  }
}

export default reducer
