const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      return action.data
    case 'REMOVE':
      return initialState
    default: return state
  }
}

 const ShowNotification = (notification) => {
  return {
    type: 'CREATE',
    data: notification
    
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

let oldTimeoutID, currentTimeoutID
export const createNotification = (notification, timeout) => {
  return dispatch => {
    
    if (currentTimeoutID) {
      oldTimeoutID = currentTimeoutID
      clearTimeout(oldTimeoutID)
    }
    
    dispatch(ShowNotification(notification))

    currentTimeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * Math.pow(10, 3))

  }
}

export default reducer