import { combineReducers } from 'redux'
import { createStore } from 'redux'
import UserList from './StorageManager'
import NumberGenerate from './NumberGeneration'

const reducer= combineReducers({
    UserList,
    NumberGenerate
  })

  
export const store = createStore(reducer)