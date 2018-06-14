import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
import { retrieveStateFromStorage } from './storage'

const stateFromStorage = retrieveStateFromStorage()

const initialState =
  stateFromStorage !== null
    ? stateFromStorage
    : {
        classrooms: [
          {
            id: '101',
            description: '',
            numberOfSeats: '20',
            layout: [
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
            ],
            hasBoard: false,
            hasProjector: false,
            hasSmartBoard: false,
            operatingSystems: [],
            software: [],
          },
        ],
        subjects: [
          {
            id: 'A-1',
            name: 'Interakcija čovek računar',
            study: 'A-1',
            color: '#0faf4f',
            description: '',
            groupSize: '10',
            minimumLength: '2',
            numberOfTerms: '2',
            numberOfTermsRemaining: 2,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: [],
          },
          {
            id: 'A-2',
            name: 'Programski prevodioci',
            study: 'A-1',
            color: '#a6f282',
            description: '',
            groupSize: '10',
            minimumLength: '1',
            numberOfTerms: '4',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: [],
          },
        ],
        studies: [
          {
            id: 'A-1',
            name: 'Softversko inženjerstvo i informacione tehnologije',
            date: '01.09.2013.',
            description: '',
          },
        ],
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
