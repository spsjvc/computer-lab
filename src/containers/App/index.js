import React from 'react'
import { Switch, Route } from 'react-router-dom'

const App = ({ routes }) => (
  <Switch>
    {routes.map((route, index) => {
      const { exact, path, component } = route
      return <Route key={index} exact={exact} path={path} component={component} />
    })}
  </Switch>
)

export default App
