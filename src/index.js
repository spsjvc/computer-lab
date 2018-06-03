import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import 'antd/dist/antd.css'

import routes from './routes'
import { App } from './containers'
import { saveStateToStorage } from './storage'
import { configureStoreWithHistory } from './store'

const history = createHistory()
const store = configureStoreWithHistory(history)

store.subscribe(() => {
  saveStateToStorage(store.getState())
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
