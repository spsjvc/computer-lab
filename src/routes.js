import {
  Home,
  Studies,
  Subjects,
  Software,
  Classrooms,
  AddStudy,
  AddSubject,
  AddSoftware,
  AddClassroom,
} from './containers'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/studies',
    exact: true,
    component: Studies,
  },
  {
    path: '/subjects',
    exact: true,
    component: Subjects,
  },
  {
    path: '/software',
    exact: true,
    component: Software,
  },
  {
    path: '/classrooms',
    exact: true,
    component: Classrooms,
  },
  {
    path: '/add-study',
    exact: true,
    component: AddStudy,
  },
  {
    path: '/add-subject',
    exact: true,
    component: AddSubject,
  },
  {
    path: '/add-software',
    exact: true,
    component: AddSoftware,
  },
  {
    path: '/add-classroom',
    exact: true,
    component: AddClassroom,
  },
]

export default routes
