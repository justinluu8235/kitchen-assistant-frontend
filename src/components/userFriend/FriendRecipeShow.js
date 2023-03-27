import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import '../recipes/ShowRecipe.css';
import './FriendRecipeShow.css'
const { REACT_APP_SERVER_URL } = process.env;


const FriendRecipeShow = (props) => {

    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    const [recipeData, setRecipeData] = useState()
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
    let recipeID = temp[4];
    console.log('recipe id', recipeID);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        fetch(`${REACT_APP_SERVER_URL}/recipes/view/${recipeID}`, {
            headers: {
                'Authorization': token, 
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data);
                setRecipeData(data)
            });

    }, [props])


    const displayIngredients = () => {
        let ingredients = recipeData['ingredients'];
        let display = ingredients.map((ingredient, idx) => {
            let stringIngredient = `${ingredient['ingredient_name']} - ${ingredient['ingredient_quantity']} ${ingredient['quantity_unit']}`
            return (
                <div>
                    <br />
                    <p>{stringIngredient}</p>

                </div>

            )
        })
        return display;
    }

    const displayInstructions = () => {
        let instructions = recipeData['instructions'];
        let display = instructions.map((instruction, idx) => {
            return (
                <div>
                    <br />
                    <p class="instructions friendrecipe">Step Number:{instruction['step_number']} </p>
                    <p class="instructions friendrecipe">{instruction['instructions']}</p>
                    <br />
                </div>

            )
        })
        return display;
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
            recipe_name: recipeData['recipe']['recipe_name'],
            recipe_image: recipeData['recipe']['image'],
            recipe_category: "uncategorized",
            instructions_list: recipeData['instructions'],
            ingredients_list: recipeData['ingredients'], 
            user_id: id,
        }
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/recipes/searchRecipes/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(newRecipeData)
        })
        .then(response => response.json())
        .then((data) => {
            console.log('return data', data)
            setNewRecipeID(data['recipe']['id'])
            setRedirect(true);
        })
        .catch(error => {
            console.log('===> Error creating recipe', error);
            alert('Error creating recipe');
        });
    }



    if (redirect) return (<Navigate to={`/recipes/${newRecipeID}`} />);
    const userData = user ?
        (
            <div class="container friendrecipe-show">
                <div class="columns">
                    <div class="column has-text-centered friendrecipe-show">
                        <div>
                        <img id="search-recipe-image" src={recipeData ? recipeData['recipe']['image'] : null} alt="" />
                        </div>
                        <h1 class="title friendrecipe-show" style={{ color: "#EBF2FA" }}>{recipeData ? recipeData['recipe']['recipe_name'] : null}</h1><br />
                        <form onSubmit={handleSubmit}>
                    <input type="submit" value="Save to My Recipes" />
                </form>
                    </div>
                </div>

                <div class='ingredient-instruction-wrapper friendrecipe-show '>
                <div id="app" class="row columns is-multiline friendrecipe-show">
                    <div v-for="card in cardData" key="card.id" class="column is-4 friendrecipe-show" >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content friendrecipe-show">
                                        <p class="title is-4 no-padding friendrecipe-instruction-title">Ingredients:</p>
                                        <p>
                                            <span class="title is-6">
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

                <div id="app" class="row columns is-multiline friendrecipe-show">
                    <div v-for="card in cardData" key="card.id" class="column is-4 friendrecipe-show"  >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content friendrecipe-show">
                                        <div class="">
                                        <p class="title is-4 no-padding friendrecipe-instruction-title">Instructions:</p>
                                        </div>
                                        <div class='instruction-container friendrecipe-show '>
                                        {recipeData ? displayInstructions() : null}
                                        </div>
                                        
                                      
                                                
                                
                                    </div>
                                </div>
                                <div class="content">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>



            </div>

        ) : <Navigate to="/login" />

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };

    return (
        <div className="text-center pt-4">
            {user ? userData : errorDiv()}
        </div>
    );


}


export default FriendRecipeShow 