import React, { useState, useCallback } from 'react'
import './NewRecipe.css'
import IngredientInput from './IngredientInput';
import InstructionInput from './InstructionInput';
import { Link, Navigate} from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;



const NewRecipe = (props) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeCategory, setRecipeCategory] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient_name: '',
        quantity_unit: '',
        quantity_unit: ''
    }]);
    const [instructions, setInstructions] = useState([{
        step_number: 1,
        instructions: ''
    }])
    const [redirect, setRedirect] = useState(false)
    const [newRecipeID, setNewRecipeID] = useState()
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
     let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
    }



    const handleAddIngredientClick = () => {

        setIngredients(ingredients.concat([{
            ingredient_name: '',
            quantity_unit: '',
            ingredient_unit: ''
        }]))

    }

    const handleAddInstructionClick = () => {

        let lastStep = instructions[instructions.length - 1]['step_number']
        setInstructions(instructions.concat([{
            step_number: lastStep + 1,
            instructions: ''
        }]))
    }


    const handleChangeIngredients = (i, e) => {
        let temp = ingredients.slice()
        temp[i][e.target.name] = e.target.value
        setIngredients(temp);
    }

    const displayIngredients = (ingredients) => {
        // console.log('in ingredients display' , ingredients)
        let display = ingredients.map((ingredient, idx) => {
            return <IngredientInput key={idx} index={idx} name={ingredient['ingredient_name']} quantity={ingredient['quantity_unit']} unit={ingredient['ingredient_unit']}
                handleIngredientChange={handleChangeIngredients} />
        })
        return display
    }

    const handleInstructionChange = (i, e) => {
        let temp = instructions.slice()
        temp[i]['instructions'] = e.target.value
        setInstructions(temp);
    }

    const displayInstructions = (instructions) => {
        // console.log('in instructions display', instructions);
        let display = instructions.map((instruction, idx) => {
            return <InstructionInput key={idx} index={idx} step_number={instruction['step_number']} instruction={instruction['instruction']} handleInstructionChange={handleInstructionChange} />
        })
        return display
    }


    const handleNameChange = (e) => {
        setRecipeName(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setRecipeCategory(e.target.value)
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
            recipe_name: recipeName,
            recipe_category: recipeCategory,
            instructions_list: instructions,
            ingredients_list: ingredients, 
            user_id: id,
        }
        console.log('new recipe data', newRecipeData);

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/recipes/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
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
    return (
        <div class="container">

            <div class="section">
                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4" id="column" >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding" style={{ color: "#0d6efd" }}>Add a Recipe</p>


                                        <div class="list-item">
                                            <p class="pantry-item">
                                                <span class="title is-6">
                                                    <form onSubmit={handleSubmit}>
                                                        <label for="recipeName"><p>Recipe Name</p></label>
                                                        <input type="text" name="recipeName" value={recipeName} onChange={handleNameChange} required />
                                                        <br />
                                                        <label for="categoryName"><p>Recipe Category</p></label>
                                                        <input type="text" name="categoryName" value={recipeCategory} onChange={handleCategoryChange} required />


                                                        <br />
                                                        <br />
                                                        <div class="all-ingredients" id="all-ingredients">
                                                            {/* <div class="first-ingredient">
                                                                <label for="ingredientName"><p>Ingredient Name</p></label>
                                                                <input type="text" name="ingredientName" required />
                                                                <br />
                                                                <label for="ingredientQuantity"><p>Ingredient Quantity</p></label>
                                                                <input type="text" name="ingredientQuantity" required />
                                                                <br />
                                                                <label for="quantityUnit"><p>Measurement Unit</p></label>
                                                                <input type="text" name="quantityUnit" required />
                                                            </div>


                                                            <div class="new-ingredient">
                                                                <label for="ingredientName"><p>Ingredient Name</p></label>
                                                                <input type="text" name="ingredientName" />
                                                                <br />
                                                                <label for="ingredientQuantity"><p>Ingredient Quantity</p></label>
                                                                <input type="text" name="ingredientQuantity" />
                                                                <br />
                                                                <label for="quantityUnit"><p>Measurement Unit</p></label>
                                                                <input type="text" name="quantityUnit" />
                                                                <br />
                                                            </div> */}
                                                            {displayIngredients(ingredients)}
                                                        </div>
                                                        <label for="button"></label>
                                                        <input type="button" name="button" onClick={handleAddIngredientClick} value="Add another Ingredient" id="addIngredientButton" />


                                                        <div class="all-recipe-steps">
                                                            {/* <div class="first-recipe-step">
                                                                <label for="instructions" class="instructions">Instructions</label>
                                                                <textarea name="instructions" cols="50" rows="5" required></textarea>

                                                            </div>


                                                            <div class="new-recipe-step">
                                                                <label for="instructions" class="instructions">Instructions</label>
                                                                <textarea name="instructions" cols="50" rows="5"></textarea>

                                                                <br />
                                                            </div> */}
                                                            {displayInstructions(instructions)}
                                                        </div>
                                                        <label for="button"></label>
                                                        <input type="button" name="button" onClick={handleAddInstructionClick} value="Add another Step" id="addRecipeStepButton" />


                                                        <br />
                                                        <br />
                                                        <br />
                                                        <input type="submit" />
                                                    </form>
                                                </span>
                                            </p>


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
    )

}

export default NewRecipe