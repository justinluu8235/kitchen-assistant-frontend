import React, { useState, useEffect } from 'react'
import EditIngredientInput from './EditIngredientInput';
import EditInstructionInput from './EditInstructionInput'
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios'
import './EditRecipe.css'
import { useIsRecipeLoading } from './hooks';
import Loading from '../shared/loading'
import store from '../../store';

const EditRecipe = (props) => {
    const isLoading = useIsRecipeLoading()
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    const [recipeData, setRecipeData] = useState()
    const [recipeName, setRecipeName] = useState('')
    const [imageFile, setImageFile] = useState()
    const [ingredients, setIngredients] = useState([{
        id: 0,
        ingredient_name: '',
        ingredient_quantity: '',
        quantity_unit: '',
        recipe: 0,
    }]);
    const [instructions, setInstructions] = useState([{
        id: 0,
        step_number: 1,
        instructions: '',
        image: null,
        recipe: 0,
    }])
    const [recipeCategory, setRecipeCategory] = useState('')
    const [newRecipeId, setNewRecipeId] = useState()
    const [redirect, setRedirect] = useState(false)
    const { REACT_APP_SERVER_URL } = process.env
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
        window.location.href = '/login';
    }

    let temp = window.location.pathname.split('/')
    let recipeID = temp[3];
    console.log('recipe id', recipeID);

    useEffect(() => {

        fetch(`${REACT_APP_SERVER_URL}/recipes/view/${recipeID}`)
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data);
                setRecipeData(data)
                setRecipeName(data['recipe']['recipe_name'])
                setRecipeCategory(data['recipe_category']['category_name'])
                setIngredients(data['ingredients'])
                setInstructions(data['instructions'])
            });

    }, [props])


    const handleNameChange = (event) => {
        setRecipeName(event.target.value)
    }
    
    const handleCategoryChange = (event) => {
        setRecipeCategory(event.target.value)
    }


    const handleAddIngredientClick = () => {

        setIngredients(ingredients.concat([{
            id: 0,
            ingredient_name: '',
            ingredient_quantity: '',
            quantity_unit: '',
            recipe: 0,
        }]))

    }

    const handleChangeIngredients = (i, e) => {
        let temp = ingredients.slice()
        temp[i][e.target.name] = e.target.value
        setIngredients(temp);
    }
    const handleDeleteIngredient = (i, e) => {
        console.log('index', i)
        let temp = ingredients.slice()
        temp.splice(i, 1);
        setIngredients(temp);
    }
    const displayIngredients = (ingredients) => {
        let display = ingredients.map((ingredient, idx) => {
            return <EditIngredientInput key={idx} index={idx} name={ingredient['ingredient_name']} quantity={ingredient['ingredient_quantity']} unit={ingredient['quantity_unit']}
                handleIngredientChange={handleChangeIngredients} handleDeleteIngredient={handleDeleteIngredient} />
        })
        return display
    }


    const handleAddInstructionClick = () => {
        let lastStep;
        instructions.length == 0? lastStep = 0 : lastStep = instructions[instructions.length - 1]['step_number']
        setInstructions(instructions.concat([{
            id: 0,
            step_number: lastStep + 1,
            instructions: '',
            image: null,
            recipe: 0,
        }]))
    }

    const handleDeleteInstruction = (i, e) => {
        console.log('index', i)
        let temp = instructions.slice()
        temp.splice(i, 1);
        setInstructions(temp);
    }
    const handleInstructionChange = (i, e) => {
        let temp = instructions.slice()
        temp[i]['instructions'] = e.target.value
        setInstructions(temp);
    }

    const displayInstructions = (instructions) => {
        // console.log('in instructions display', instructions);
        console.log(instructions)
        let display = instructions.map((instruction, idx) => {
            return <EditInstructionInput key={idx} index={idx} step_number={instruction['step_number']}
                instruction={instruction['instructions']} handleInstructionChange={handleInstructionChange} 
                handleDeleteInstruction={handleDeleteInstruction}/>
        })
        return display
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
        store.dispatch({type: 'recipes/isLoading'})
        fetch(`${REACT_APP_SERVER_URL}/recipes/edit/${recipeID}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newRecipeData)
        })
        .then(response => response.json())
        .then((data) => {
            if(imageFile != undefined){
                console.log('in image')
                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                const URL = `${REACT_APP_SERVER_URL}/recipes/edit-2`;
                let formdata = new FormData();
                formdata.append("image", imageFile['image'][0]);
                formdata.append("id", recipeID);
                axios.post(URL, formdata, config)
            .then((res) => {
                console.log('return data after image', data)

                setNewRecipeId(data['recipe']['id'])
                store.dispatch({type: 'recipes/doneLoading'})

                setRedirect(true);

            });

            }
            else{
                console.log('return data', data)

                setNewRecipeId(data['recipe']['id'])
                store.dispatch({type: 'recipes/doneLoading'})

                setRedirect(true);

            }
        })
        .catch(error => {
            console.log('===> Error editing recipe', error);
            alert('Error editing recipe');
            store.dispatch({type: 'recipes/doneLoading'})

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

    if (redirect) return (<Navigate to={`/recipes/${newRecipeId}`} />);
    return (
        <div class="container">
            <div class="section">
                <div id="app" class="row columns is-multiline">

                    <div v-for="card in cardData" key="card.id" class="column is-4 edit-recipe" >
                        <div class="card large" id="card-large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding edit-recipe" style={{ color: "0d6efd" }}>Edit Recipe</p>
                                        <div class="list-item">
                                            <p class="pantry-item">
                                                <span class="title is-6">
                                                    <form method="POST" onSubmit={handleSubmit} action="/recipes/<%=recipe.id%>/?_method=PUT">

                                                        <label for="recipeName">Recipe Name</label>
                                                        <input type="text" name="recipeName" disabled={isLoading} value={recipeName} onChange={handleNameChange} />
                                                        <br />
                                                        <label for="categoryName">Recipe Category</label>
                                                        <input type="text" name="categoryName" disabled={isLoading} value={recipeCategory} onChange={handleCategoryChange} />
                                                        <br />
                                                        <label for="image"  >
                                                        <p class='edit-recipe-image-label'>Recipe image</p>
                                                        <input type="file" name="image" id="post-image" disabled={isLoading} onChange={hangleImageFile}></input>
                                                        </label>

                                                        <div class="all-ingredients">
                                                        <label>Ingredients</label>
                                                            {recipeData ? displayIngredients(ingredients) : null}
                                                        </div>

                                                        <label for="button"></label>
                                                        <input class="add-button edit-recipe" type="button" name="button" disabled={isLoading} value="Add another Ingredient" id="addIngredientButton" onClick={handleAddIngredientClick} />


                                                        <div class="all-recipe-steps">
                                                            {recipeData ? displayInstructions(instructions) : null}
                                                        </div>

                                                        <label for="button"></label>
                                                        <input  class="add-button edit-recipe"  type="button" name="button" disabled={isLoading} value="Add another Step" id="addRecipeStepButton" onClick={handleAddInstructionClick}/>
                                                        <br /><br /><br />
                                                        {isLoading ? (
                                                             <Loading/>
                                                        ) : (
                                                            <input type="submit" />
                                                        )}
                                                       
                                                        
                                                    </form>
                                                    <form action="/recipes/<%=recipe.id%>/?_method=DELETE" method="POST">
                                                        <input type="submit" disabled={isLoading} value="DELETE RECIPE" />
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

export default EditRecipe