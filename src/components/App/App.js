import React from 'react'
import EditPage from '../EditPage'
import HomePage from '../HomePage'
import { connect } from 'react-redux'
import {MuiThemeProvider} from 'material-ui'

const App = ({route}) => (
  <MuiThemeProvider>
    {route === 'edit' ? <EditPage/> : <HomePage/>}
  </MuiThemeProvider>
)

export default connect(
    ({route}) => ({route})
)(App)