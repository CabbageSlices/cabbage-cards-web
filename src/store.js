import { createStore } from 'redux'
import path from 'object-path'

function reducer(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_STATE': {
    state = { ...state }
    path.set(state, action.payload.path, action.payload.value)
    return state
    break
  }
  }

  return state
}

export default createStore(reducer)
