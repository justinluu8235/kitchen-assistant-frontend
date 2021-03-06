import React, { useState, useCallback } from 'react'
import './NewRecipe.css'
import IngredientInput from './IngredientInput';
import InstructionInput from './InstructionInput';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
// import cloudinary  from '../../utils/cloudinary'

const { REACT_APP_SERVER_URL } = process.env;




const NewRecipe = (props) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeCategory, setRecipeCategory] = useState('');
    const [ingredients, setIngredients] = useState([{
        ingredient_name: '',
        ingredient_quantity: '',
        quantity_unit: ''
    }]);
    const [instructions, setInstructions] = useState([{
        step_number: 1,
        instructions: ''
    }])
    const [redirect, setRedirect] = useState(false)
    const [newRecipeID, setNewRecipeID] = useState()
    const [imageFile, setImageFile] = useState()
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
        window.location.href = '/login';
    }



    const handleAddIngredientClick = () => {

        setIngredients(ingredients.concat([{
            ingredient_name: '',
            ingredient_quantity: '',
            quantity_unit: ''
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
        console.log(e.target.name)
        console.log('ingredient', e.target.value)
        let temp = ingredients.slice()
        temp[i][e.target.name] = e.target.value
        setIngredients(temp);
    }

    const displayIngredients = (ingredients) => {
        // console.log('in ingredients display' , ingredients)
        let display = ingredients.map((ingredient, idx) => {
            return <IngredientInput key={idx} index={idx} name={ingredient['ingredient_name']} quantity={ingredient['ingredient_quantity']} unit={ingredient['quantity_unit']}
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
        
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const URL = `${REACT_APP_SERVER_URL}/recipes/new`;

        let formdata = new FormData();
        formdata.append("recipe_name", recipeName);
        formdata.append("user", id);
        formdata.append("recipe_category", 1);
        if(imageFile){
            console.log('image file', imageFile[0])
            formdata.append("image", imageFile['image'][0]);
        }
        
        formdata.append("ingredients_list", ingredients);
        axios.post(URL, formdata, config)
            .then((res) => {
                let newRecipeData = {
                recipe_id: res.data['id'],
                recipe_category: recipeCategory,
                instructions_list: instructions,
                ingredients_list: ingredients,
                user_id: id,
            }
                console.log('new recipe data', newRecipeData)
                let csrftoken = getCookie('csrftoken');
                fetch(`${REACT_APP_SERVER_URL}/recipes/new-2`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(newRecipeData)
        
                })
                    .then(response => response.json())
                    .then((data) => {
                        setNewRecipeID(data['recipe']['id'])
                        setRedirect(true);
                    })
            })

            .catch(error => {
                console.log('===> Error creating recipe', error);
                alert('Error creating recipe');
            });
    }

    const hangleImageFile = (e) => {
        setImageFile(
            {
                image: e.target.files
            }
        );
        console.log(e.target.files)
        console.log(imageFile)

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
                                                        <label for="image"  >
                                                        <p class='new-recipe-image-label'>Recipe image</p>
                                                        <input type="file" name="image" id="post-image" onChange={hangleImageFile}></input>
                                                        </label>
                                                        <br />
                                                        <br />
                                                        <div class="all-ingredients" id="all-ingredients">

                                                            {displayIngredients(ingredients)}
                                                        </div>
                                                        <label for="button"></label>
                                                        <input type="button" name="button" onClick={handleAddIngredientClick} value="Add another Ingredient" id="addIngredientButton" />


                                                        <div class="all-recipe-steps">

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