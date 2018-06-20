import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
import { retrieveStateFromStorage } from './storage'

const stateFromStorage = retrieveStateFromStorage()

const initialState =
  stateFromStorage !== null
    ? stateFromStorage
    : {
        isTutorialVisible: true,
        tutorialStep: 0,
        selectedClassroom: '101',
        editingClassroom: null,
        editingStudy: null,
        editingSoftware: null,
        editingSubject: null,
        classrooms: [
          {
            id: '101',
            description: 'Učionica sa tablom i projektorom',
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
            description: 'Učionica sa tablom i pametnom tablom',
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
            hasProjector: false,
            hasSmartBoard: true,
            operatingSystems: ['Linux'],
            software: ['A-1', 'A-3'],
          },
        ],
        subjects: [
          {
            id: 'A-1',
            name: 'Interakcija čovek računar',
            study: 'A-1',
            color: '#0faf4f',
            description: '-',
            groupSize: '10',
            minimumLength: '2',
            numberOfTerms: '2',
            numberOfTermsRemaining: 2,
            needsBoard: true,
            needsProjector: false,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: ['A-3'],
          },
          {
            id: 'A-2',
            name: 'Programski prevodioci',
            study: 'A-1',
            color: '#19d674',
            description: '-',
            groupSize: '10',
            minimumLength: '1',
            numberOfTerms: '4',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: true,
            needsSmartBoard: false,
            operatingSystem: 'Windows',
            software: ['A-1'],
          },
          {
            id: 'A-3',
            name: 'Operativni sistemi',
            study: 'A-3',
            color: '#39f9a3',
            description: '-',
            groupSize: '20',
            minimumLength: '2',
            numberOfTerms: '2',
            numberOfTermsRemaining: 2,
            needsBoard: false,
            needsProjector: false,
            needsSmartBoard: true,
            operatingSystem: 'Windows',
            software: ['A-2'],
          },
          {
            id: 'A-4',
            name: 'Operativni sistemi',
            study: 'A-2',
            color: '#14a084',
            description: '-',
            groupSize: '30',
            minimumLength: '1',
            numberOfTerms: '4',
            numberOfTermsRemaining: 4,
            needsBoard: false,
            needsProjector: true,
            needsSmartBoard: false,
            operatingSystem: 'true',
            software: ['A-1', 'A-3'],
          },
        ],
        studies: [
          {
            id: 'A-1',
            name: 'Softversko inženjerstvo i informacione tehnologije',
            date: '01.09.2013.',
            description: '-',
          },
          {
            id: 'A-2',
            name: 'Računarstvo i automatika',
            date: '01.09.2005.',
            description: '-',
          },
          {
            id: 'A-3',
            name: 'Mehatronika',
            date: '01.09.2005.',
            description: '-',
          },
        ],
        software: [
          {
            id: 'A-1',
            name: 'Excel',
            manufacturer: 'Microsoft',
            operatingSystem: 'Windows',
            website: 'https://office.live.com/start/Excel.aspx',
            year: '2017',
            price: '6000',
            description: '-',
          },
          {
            id: 'A-2',
            name: 'Photoshop',
            manufacturer: 'Adobe',
            operatingSystem: 'Linux',
            website: 'https://www.adobe.com/products/photoshop.html',
            year: '2018',
            price: '12000',
            description: '-',
          },
          {
            id: 'A-3',
            name: 'Visual Studio',
            manufacturer: 'Microsoft',
            operatingSystem: 'Windows',
            website: 'https://visualstudio.microsoft.com/',
            year: '2018',
            price: '10000',
            description: '-',
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
