import { Home, AddStudy, AddSubject, AddSoftware, AddClassroom } from './containers'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
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
    path: '/add-classroom',
    exact: true,
    component: AddClassroom,
  },
  {
    path: '/add-software',
    exact: true,
    component: AddSoftware,
  },
]

export default routes
