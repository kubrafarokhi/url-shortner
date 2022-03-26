import React from 'react'
import './errorComponent.css'

const ErrorComponent = ({ errorMsg = 'Something went wrong, please try again later..' }) => {
  return (
    <div style={{ color: 'red' }}>{errorMsg}</div>
  )
}

export default ErrorComponent
