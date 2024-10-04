import React from 'react'

function Toast(props) {
  return (
    props.show &&
    <div className='toast-container'>
        <p className='toast-text'>{props.text}</p>
    </div>
  )
}

export default Toast