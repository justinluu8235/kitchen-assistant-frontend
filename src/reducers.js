import { combineReducers } from 'redux'
import recipesReducer from './components/recipes/slices/recipeSlice'


const rootReducer = combineReducers({
    recipes: recipesReducer,
  })


export default rootReducer