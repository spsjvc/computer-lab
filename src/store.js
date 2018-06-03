import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
import { retrieveStateFromStorage } from './storage'

const stateFromStorage = retrieveStateFromStorage()

const initialState =
  stateFromStorage !== null
    ? stateFromStorage
    : {
        classrooms: [],
        subjects: [],
        studies: [],
        software: [],
      }

const configureStoreWithHistory = history => {
  const middleware = routerMiddleware(history)

  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware)
  )
}

export { initialState, configureStoreWithHistory }
