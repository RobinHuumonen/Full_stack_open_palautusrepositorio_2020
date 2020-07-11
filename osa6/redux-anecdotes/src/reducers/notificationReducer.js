const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      return action.data
    case 'REMOVE':
      return ''
    default: return state
  }
}

 export const ShowNotification = (notification) => {
  return {
    type: 'CREATE',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export const createNotification = (notification, timeout) => {
  return dispatch => {
    dispatch(ShowNotification(notification))

    setTimeout(() => {
      dispatch(removeNotification())
    }, Math.pow(timeout, 4))
  }
}

export default reducer