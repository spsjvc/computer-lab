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

    case ACTION.DELETE_CLASSROOM: {
      const classroomId = action.payload

      const classroom = state.classrooms.find(c => c.id === classroomId)
      const updatedSubjects = state.subjects

      for (let i = 0; i < classroom.layout.length; i++) {
        for (let j = 0; j < classroom.layout[i].length; j++) {
          if (classroom.layout[i][j] !== 0) {
            if (classroom.layout[i][j - 1] === classroom.layout[i][j]) {
              continue
            }

            const subjectIndex = state.subjects.map(s => s.id).indexOf(classroom.layout[i][j])
            updatedSubjects[subjectIndex].numberOfTermsRemaining++
          }
        }
      }

      return {
        ...state,
        subjects: updatedSubjects,
        classrooms: state.classrooms.filter(c => c.id !== classroomId),
      }
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
      const deletedSoftware = action.payload

      const updatedSubjects = state.subjects.map(subject => {
        const updatedSoftware = subject.software.filter(software => software !== deletedSoftware)

        return {
          ...subject,
          software: updatedSoftware,
        }
      })

      const updatedClassrooms = state.classrooms.map(classroom => {
        const updatedSoftware = classroom.software.filter(software => software !== deletedSoftware)

        return {
          ...classroom,
          software: updatedSoftware,
        }
      })

      return {
        ...state,
        subjects: updatedSubjects,
        classrooms: updatedClassrooms,
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

    case ACTION.SET_EDITING_CLASSROOM:
      return { ...state, editingClassroom: action.payload }

    case ACTION.EDIT_CLASSROOM: {
      const updatedClassroom = action.payload
      const classroomIndex = state.classrooms.map(c => c.id).indexOf(updatedClassroom.id)

      return {
        ...state,
        classrooms: [
          ...state.classrooms.slice(0, classroomIndex),
          updatedClassroom,
          ...state.classrooms.slice(classroomIndex + 1),
        ],
      }
    }

    case ACTION.SET_EDITING_SOFTWARE:
      return { ...state, editingSoftware: action.payload }

    case ACTION.EDIT_SOFTWARE: {
      const updatedSoftware = action.payload
      const softwareIndex = state.software.map(s => s.id).indexOf(updatedSoftware.id)

      return {
        ...state,
        software: [
          ...state.software.slice(0, softwareIndex),
          updatedSoftware,
          ...state.software.slice(softwareIndex + 1),
        ],
      }
    }

    case ACTION.SET_EDITING_STUDY:
      return { ...state, editingStudy: action.payload }

    case ACTION.EDIT_STUDY: {
      const updatedStudy = action.payload
      const studyIndex = state.studies.map(s => s.id).indexOf(updatedStudy.id)

      return {
        ...state,
        studies: [
          ...state.studies.slice(0, studyIndex),
          updatedStudy,
          ...state.studies.slice(studyIndex + 1),
        ],
      }
    }

    case ACTION.SET_EDITING_SUBJECT:
      return { ...state, editingSubject: action.payload }

    case ACTION.EDIT_SUBJECT: {
      const updatedSubject = action.payload
      const subjectIndex = state.subjects.map(s => s.id).indexOf(updatedSubject.id)

      return {
        ...state,
        subjects: [
          ...state.subjects.slice(0, subjectIndex),
          updatedSubject,
          ...state.subjects.slice(subjectIndex + 1),
        ],
      }
    }

    case ACTION.CLEAR_SUBJECT_SCHEDULE: {
      const subjectId = action.payload

      const updatedClassrooms = state.classrooms.map(classroom => {
        let updatedLayout = classroom.layout

        for (let i = 0; i < updatedLayout.length; i++) {
          for (let j = 0; j < updatedLayout[i].length; j++) {
            if (updatedLayout[i][j] === subjectId) {
              updatedLayout[i][j] = 0
            }
          }
        }

        return {
          ...classroom,
          layout: updatedLayout,
        }
      })

      return {
        ...state,
        classrooms: updatedClassrooms,
      }
    }

    case ACTION.SET_IS_TUTORIAL_VISIBLE:
      return {
        ...state,
        isTutorialVisible: action.payload,
      }

    case ACTION.SET_TUTORIAL_STEP:
      return {
        ...state,
        tutorialStep: action.payload,
      }

    default:
      return state
  }
}

export default reducer
