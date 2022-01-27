import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './ShowRecipe.css';
const { REACT_APP_SERVER_URL } = process.env;


const ShowRecipe = (props) => {

    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    const [recipeData, setRecipeData] = useState()
    const [redirect, setRedirect] = useState(false)
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
    }

    let temp = window.location.pathname.split('/')
    let recipeID = temp[2];
    console.log('recipe id', recipeID);

    useEffect(() => {

        fetch(`${REACT_APP_SERVER_URL}/recipes/view/${recipeID}`)
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
                    <p class="instructions">Step Number:{instruction['step_number']} </p>
                    <p class="instructions">{instruction['instructions']}</p>
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
  

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/recipes/delete/${recipeID}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },

        })
        // .then(response => response.json())
        .then((data) => {
            console.log('return data', data)
            setRedirect(true);
        })
        .catch(error => {
            console.log('===> Error creating recipe', error);
            alert('Error creating recipe');
        });
    }



    if (redirect) return (<Navigate to={`/recipes`} />);
    const userData = user ?
        (
            <div class="container">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title" style={{ color: "#EBF2FA" }}>{recipeData ? recipeData['recipe']['recipe_name'] : null}</h1><br />
                        <img id="search-recipe-image" src={recipeData ? recipeData['recipe']['image'] : null} alt="" />
                    </div>
                </div>

                <form action={`/recipes/edit/${recipeID}`} method="GET">
                    <input type="submit" value="Edit Recipe" />
                </form>

                <form onSubmit={handleSubmit}>
                    <input type="submit" value="Delete Recipe" />
                </form>
                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4" id="column" >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding">Ingredients:</p>
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

                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4" id="column" >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding">Instructions:</p>
                                            {/* <span class="title is-6" > */}
                                                {recipeData ? displayInstructions() : null}
                                            {/* </span> */}
                                    </div>
                                </div>
                                <div class="content">

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


export default ShowRecipe 