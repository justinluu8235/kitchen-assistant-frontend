const initialState = {
    isLoading: false,
}

export default function recipesReducer(state = initialState, action) {
    switch(action.type){
        case 'recipes/isLoading': {
            return {
                ...state,
                isLoading: true,
            }
        }
        case 'recipes/doneLoading': {
            return {
                ...state, 
                isLoading: false,
            }
        }
        default:
            return state
    }
}