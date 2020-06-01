import React from 'react'

const Notification = ({ message, error }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (error !== null)
  return (
    <div style={errorStyle}>
      <b>{error}</b>
    </div>
  )
  else if (message !== null)
    return (
      <div style={notificationStyle}>
        <b>{message}</b>
      </div>
    )
  else
    return null
}

export default Notification