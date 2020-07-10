const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.data
    default: return state
  }
}

export const search = (searchCondition) => {
  return {
    type: 'SEARCH',
    data: searchCondition
  }
}

export default reducer