import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

const rootReducer = combineReducers({})

const configureStoreWithHistory = history => {
  const middleware = routerMiddleware(history)

  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware)
  )
}

export { configureStoreWithHistory }
