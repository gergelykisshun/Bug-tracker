import React from 'react'
import './ErrorMsg.css'

const ErrorMsg = ({msg, setError}) => {

  const toggleError = () => {
    setError({
      isVisible: false,
      msg: ''
    })
  };


  return (
    <div className='error-msg-container fade-in'>
      {msg}
      <p onClick={toggleError}>X</p>
    </div>
  )
}

export default ErrorMsg