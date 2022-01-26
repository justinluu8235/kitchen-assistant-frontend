import React, { useEffect, useState } from 'react'
import './SearchRecipeShow.css'
const { REACT_APP_SERVER_URL } = process.env;




const SearchRecipeShow = (props) => {
    const [recipeData, setRecipeData] = useState()



    let temp = window.location.pathname.split('/')
    let apiRecipID = temp[3];
    console.log(apiRecipID)

    useEffect(()=>{
        getRecipeData()
    })

    const getRecipeData = async() => {

        try{
            let res = await fetch(`${REACT_APP_SERVER_URL}/recipes/searchRecipes/${apiRecipID}`)
            res = await res.json()
            console.log(JSON.parse(res))

        }
        catch(err){
            console.log(err);
        }

    }

    return (
        <div>
            <form action="/searchRecipes/getRecipe" method="POST">
                <div class="container">
                    <div class="columns">
                        <div class="column has-text-centered">
                            {/* <h1 class="title" style="color: #EBF2FA;">recipe name </h1><br /> */}
                            <h1 class="title" >recipe name </h1><br />
                            <img id="search-recipe-image" src="<%=image%>" alt="" />
                            <input type="text" name="imageURL" value="image" hidden />
                            <input type="text" name="recipeName" value="recipename" hidden />
                        </div>
                    </div>

                    <input type="submit" value="Save to My Recipes" />
                    <div id="app" class="row columns is-multiline">
                        <div v-for="card in cardData" key="card.id" class="column is-4" id="column" >
                            <div class="card large" id="card-large">
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4 no-padding">Ingredients:</p>
                                            <p>
                                                <span class="title is-6">
                                                    {/* <% for(let i=0; i<ingredientsObj.ingredientNameArr.length; i++){ %> 
                                <% let ingredientName = ingredientsObj.ingredientNameArr[i] %> 
                                <% let ingredientQuantity = ingredientsObj.ingredientQuantityArr[i] %> 
                                <% let quantityUnit = ingredientsObj.quantityUnitArr[i] %> 
                                <% let stringIngredient = ingredientName + " - " + ingredientQuantity + " " + quantityUnit %>  */}
                                                    <input type="text" name="ingredientName" value="<%=ingredientName%>" hidden />
                                                    <input type="text" name="ingredientQuantity" value="<%=ingredientQuantity%>" hidden />
                                                    <input type="text" name="quantityUnit" value="<%=quantityUnit%>" hidden />
                                                    <br />
                                                    {/* <%= stringIngredient %> 
                                <% } %>  */}
                                                </span>
                                            </p>


                                        </div>
                                    </div>
                                    <div class="content"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="app" class="row columns is-multiline">
                        <div v-for="card in cardData" key="card.id" class="column is-4" id="column" >
                            <div class="card large" id="card-large">
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4 no-padding">Instructions:</p>
                                            <p >
                                                <span class="title is-6" >
                                                    {/* <% for(let i=0; i<instructionsObj.stepNumberArr.length; i++){ %>  */}
                                                    {/* <% let stepNumber = instructionsObj.stepNumberArr[i] %> 
                                <% let instructions = instructionsObj.instructionsArr[i] %>  */}
                                                    <input type="text" name="instructions" value="<%=instructions%>" hidden />
                                                    <input type="text" name="stepNumber" value="<%=stepNumber%>" hidden />
                                                    <br />
                                                    <p class="instructions">Step Number: </p>

                                                    <p class="instructions">instruction1 </p>
                                                    <br />
                                                    {/* <% } %>  */}
                                                </span>
                                            </p>


                                        </div>
                                    </div>
                                    <div class="content"></div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
       
            </form >
        </div >
    )

}


export default SearchRecipeShow