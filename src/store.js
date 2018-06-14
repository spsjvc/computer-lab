import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
import { retrieveStateFromStorage } from './storage'

const stateFromStorage = retrieveStateFromStorage()

const initialState =
  stateFromStorage !== null
    ? stateFromStorage
    : {
        selectedClassroom: '101',
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
            hasBoard: true,
            hasProjector: true,
            hasSmartBoard: false,
            operatingSystems: ['Windows'],
            software: ['A-1', 'A-2'],
          },
          {
            id: '102',
            description: '',
            numberOfSeats: '40',
            layout: [
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
              Array(60).fill(0),
            ],
            hasBoard: true,
            hasProjector: true,
            hasSmartBoard: true,
            operatingSystems: ['Linux'],
            software: ['A-1', 'A-2'],
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
            needsBoard: true,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: ['A-1', 'A-2'],
          },
          {
            id: 'A-2',
            name: 'Programski prevodioci',
            study: 'A-1',
            color: '#19d674',
            description: '',
            groupSize: '10',
            minimumLength: '1',
            numberOfTerms: '4',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: ['A-2'],
          },
          {
            id: 'A-3',
            name: 'Operativni sistemi',
            study: 'A-1',
            color: '#39f9a3',
            description: '',
            groupSize: '10',
            minimumLength: '4',
            numberOfTerms: '1',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Linux',
            software: ['A-1'],
          },
          {
            id: 'A-4',
            name: 'Operativni sistemi',
            study: 'A-2',
            color: '#14a084',
            description: '',
            groupSize: '15',
            minimumLength: '1',
            numberOfTerms: '4',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Linux',
            software: ['A-1'],
          },
        ],
        studies: [
          {
            id: 'A-1',
            name: 'Softversko inženjerstvo i informacione tehnologije',
            date: '01.09.2013.',
            description: '',
          },
          {
            id: 'A-2',
            name: 'Računarstvo i automatika',
            date: '01.09.2013.',
            description: '',
          },
        ],
        software: [
          {
            id: 'A-1',
            name: 'Microsoft Excel',
            manufacturer: 'Microsoft',
            operatingSystem: 'Windows',
            website: '-',
            year: '2018',
            price: '6000',
            description: '',
          },
          {
            id: 'A-2',
            name: 'Microsoft Word',
            manufacturer: 'Microsoft',
            operatingSystem: 'Windows',
            website: '-',
            year: '2018',
            price: '6000',
            description: '',
          },
        ],
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
