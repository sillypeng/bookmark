import React from 'react'
import EditPage from '../EditPage'
import HomePage from '../HomePage'

const Route = ({route}) => (
  route === 'edit' ? <EditPage/> : <HomePage/>
)

export default Route