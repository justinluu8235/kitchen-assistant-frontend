import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer, undefined)

export default store