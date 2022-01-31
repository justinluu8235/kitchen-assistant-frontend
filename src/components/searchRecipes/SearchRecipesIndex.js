import React, { useState, useEffect} from 'react';
import SearchRecipeResult from './SearchRecipeResult';
import './SearchRecipesIndex.css'
const { REACT_APP_SERVER_URL } = process.env;


const SearchRecipesIndex = (props) => {
    const {user} = props
    const [searchValue, setSearchVal] = useState('')
    const [recipeResults, setRecipeResults] = useState('')



   



    const handleChange = (e) => {
        setSearchVal(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('search value', searchValue)

        const query ={
            searchVal: searchValue
        }
        fetch(`${REACT_APP_SERVER_URL}/recipes/searchRecipes/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // 'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(query)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("RETURN DATA:", data)
            data = JSON.parse(data)
            console.log('return data type', typeof(data))
            setRecipeResults(data)
        })
        .catch((err) => {
            console.log('err', err);
        })
    }

    const displayRecipeResults = () => {
        if(recipeResults !== ''){
            let searchResultArr = recipeResults['search_results']
            let display = searchResultArr.map((recipe, idx) => {
                return <SearchRecipeResult key={idx} user={user} recipe_id={recipe['recipe_id']} recipe_name={recipe['recipe_title']} recipe_image={recipe['recipe_image_url']}/>
            })
            return display;
        }
        return null
       
    }

    return (
        <div class="container">

            <div class="section">
                <div class="columns" id="title-block">
                    <div class="column has-text-centered search-recipe">
                        {/* <h1 class="title" style="color: #EBF2FA;">Search for Recipes</h1><br/> */}
                        <h1 class="title search-recipe" >Search for Recipes</h1><br/>
                    </div>
                </div>
                <div  class='search-recipe-form-container'>
                    <form onSubmit={handleSubmit} id="searchRecipeInput" >
                        <input type="text" value={searchValue} onChange={handleChange} name="query" class="search-bar" />
                        <input type="submit" class="search-submit" />
                    </form>
                </div>
                

                <div id="app" class="row columns is-multiline">


                    {displayRecipeResults()}

                </div>
            </div>
        </div>
    )
}

export default SearchRecipesIndex