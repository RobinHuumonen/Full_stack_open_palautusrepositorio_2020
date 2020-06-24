import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div class="notification">
        {notification}
    </div>
  )

}

export default Notification