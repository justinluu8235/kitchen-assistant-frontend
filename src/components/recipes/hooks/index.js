import {useSelector} from 'react-redux'

export const useIsRecipeLoading = () => useSelector((state) => state.recipes.isLoading)