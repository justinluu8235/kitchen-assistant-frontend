import React, { useEffect, useState, useRef } from 'react'
import './SearchRecipeShow.css'
import axios from 'axios';
import { Link, Navigate} from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;




const SearchRecipeShow = (props) => {
    const [recipeData, setRecipeData] = useState()
    const firstRenderRef = useRef(true);
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    const [redirect, setRedirect] = useState(false)
    const [newRecipeID, setNewRecipeID] = useState()
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
     let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
        window.location.href = '/login';
    }


    let temp = window.location.pathname.split('/')
    let apiRecipID = temp[3];
    console.log(apiRecipID)

    useEffect(() => {
        fetch(`${REACT_APP_SERVER_URL}/recipes/searchRecipes/${apiRecipID}`)
            .then(response => response.json())
            .then((data) => {
                data = JSON.parse(data)
                setRecipeData(data)
                console.log('recipedata', recipeData)
            });

    }, [props])



    const displayIngredients = () => {
        if (recipeData !== null) {
            console.log('Recipe data', recipeData)
            let ingredientsArr = recipeData['ingredient_list']
            let display = ingredientsArr.map((ingredient, idx) => {
                let string = `${ingredient["ingredient_name"]} - ${ingredient["ingredient_quantity"]} ${ingredient["quantity_unit"]}`
                return (
                    <div key={idx}><p >{string}</p><br/></div>
                )
            })
            return display;
        }
        return null
    }

    const displayInstructions = () => {
        console.log('recipe instructions',)
        if (recipeData !== null) {
            console.log('Recipe data', recipeData)
            let instructionsArr = recipeData['instructions_list']
            let display = instructionsArr.map((instruction, idx) => {

                return (
                    <div key={idx}>
                        <p class="instructions search-recipe-show">Step Number: {instruction["step_number"]} </p>

                        <p class="instructions search-recipe-show">{instruction['instructions']} </p>
                        <br></br>
                    </div>
                )

            })
            return display;
        }
        return null
    }
    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newRecipeData = {
            recipe_name: recipeData['recipe_title'],
            recipe_image: recipeData['recipe_image'],
            recipe_category: "uncategorized",
            instructions_list: recipeData['instructions_list'],
            ingredients_list: recipeData['ingredient_list'], 
            user_id: id,
        }
        console.log('new recipe data', newRecipeData);

        let csrftoken = getCookie('csrftoken');
        console.log(csrftoken)
        const token = localStorage.getItem("jwtToken")
        fetch(`${REACT_APP_SERVER_URL}/recipes/searchRecipes/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token, 
                // 'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newRecipeData)
        })
        .then(response => response.json())
        .then((data) => {
            setNewRecipeID(data['recipe']['id'])
            setRedirect(true);
        })
        .catch(error => {
            console.log('===> Error creating recipe', error);
            alert('Error creating recipe');
        });
    }

    if (redirect) return (<Navigate to={`/recipes/${newRecipeID}`} />);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="container search-recipe-show">
                    <div class="columns search-recipe-show">
                        
                    {recipeData && recipeData['recipe_image'] ?
                        <img id="search-recipe-image" src={recipeData['recipe_image']} alt="" />
                        : null
                        }
                        <h1 class="title search-recipe-show" >{recipeData ? recipeData['recipe_title'] : null}</h1><br />
                        <input type="submit" value="Save to My Recipes" />
                    </div>


                    <div class='ingredient-instruction-wrapper search-recipe-show '>

                    
                    <div id="app" class="row columns is-multiline search-recipe-show">
                        <div v-for="card in cardData" key="card.id" class="column is-4 search-recipe-show" >
                            <div class="card large" id="card-large">
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content search-recipe-show">
                                            <p class="title is-4 no-padding">Ingredients:</p>
                                            <p>
                                                <span class="title is-6">
                                                    <input type="text" name="ingredientName" value="<%=ingredientName%>" hidden />
                                                    <input type="text" name="ingredientQuantity" value="<%=ingredientQuantity%>" hidden />
                                                    <input type="text" name="quantityUnit" value="<%=quantityUnit%>" hidden />
                                                    <br />
                                                    {recipeData ? displayIngredients() : null}
                                                </span>
                                            </p>


                                        </div>
                                    </div>
                                    <div class="content"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="app" class="row columns is-multiline search-recipe-show instruction">
                        <div v-for="card in cardData" key="card.id" class="column is-4 search-recipe-show "  >
                            <div class="card large" id="card-large">
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content search-recipe-show">
                                            <div>
                                                <p class="title is-4 no-padding">Instructions:</p>
                                            </div>
                                            
                                            <div class='instruction-container search-recipe-show '>
                                                
                                                  
                                                    {recipeData ? displayInstructions() : null}
                                                
                                            </div>


                                        </div>
                                    </div>
                                    <div class="content"></div>
                                </div>
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