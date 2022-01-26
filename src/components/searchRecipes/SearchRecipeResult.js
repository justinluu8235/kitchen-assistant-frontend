import React, { useEffect } from 'react';
import axios from 'axios'


const SearchRecipeResult = (props) => {
    let {recipe_id, recipe_name, recipe_image, user} = props
    recipe_id = recipe_id.toString()
    useEffect(() => {
        
    })

    return(
        <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">
                            <div class="card-image" class="recipe-image">
                                <figure class="image is-16by9">
                                    <img src={recipe_image} alt="" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding" id="recipe-name">{recipe_name}</p>
                                        <br />
                                        <p >

                                            <a href={`/searchRecipe/view/${recipe_id}`} class="view-recipe-text">View Recipe</a></p>
                                    </div>
                                </div>
                                <div class="content">


                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default SearchRecipeResult