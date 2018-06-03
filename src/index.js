import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import routes from './routes'
import { App } from './containers'
import { configureStoreWithHistory } from './store'

const history = createHistory()
const store = configureStoreWithHistory(history)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
