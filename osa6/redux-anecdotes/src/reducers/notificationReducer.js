const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      const notification = `You voted '${action.data.content}'`
      return notification
    case 'REMOVE':
      return ''
    default: return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'CREATE',
    data: {
      content
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default reducer