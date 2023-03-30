import React, {useState} from 'react';
import RecipeIndex from './RecipeIndex';
import './RecipeIndexUnit.css'
import CustomButton from '../shared/Button'
import AddToMenuPopup from '../menu/AddToMenuPopup'

const RecipeIndexUnit = (props) => {
    const {recipeName, recipe_id, image, user_id,  index, handleDateChange,  date, handleMenuSubmit} = props
    const [showAddMenuModule, setShowAddMenuModule] = useState(false)
    const {REACT_APP_SERVER_URL} = process.env
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
    console.log('show popup?', showAddMenuModule)

    const generateShoppingList = (e,user_id, recipeId) => {
        e.preventDefault();
        let recipeInfo = {
            user_id: user_id,
            recipe_id: recipeId
        }
        console.log('recipe info', recipeInfo);
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/generate`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(recipeInfo)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                alert(`ingredients for ${recipeName} has been added to your shopping list`)
            })
            .catch(error => {
                console.log('===> Error generating shopping list', error);
                alert('Error generating shopping list');
            });

    }

    return (

        <div v-for="card in cardData" key="card.id" class="column is-4 recipe-index-card">
            {/* <% for( let i = 0; i < allRecipes.length; i++ ) { %> 
              <% let recipe = allRecipes[i].toJSON() %> */}
            <div class="card large recipe-index-card">
                <div class="card-image" class="recipe-image">
                <figure class="image is-16by9">
                    
                    <img src={image ? image : "/img/kitchen-icon.png"}  />
                </figure>
            </div>
                
                
 
                <div class="card-content ">
                    <div class="media">
                        <div class="media-content recipe-index-card-content">
                            <p class="title is-4 no-padding recipe-index-name">{recipeName} </p>
                            <br />
                            <p>
                                <span class="title is-6">
                                    <a href={`/recipes/${recipe_id}`}>View Recipe</a> </span> </p>
                            <br /><br />
                            <div >
                                <span class="title is-6">
                                    <form onSubmit={(e) =>generateShoppingList(e,user_id, recipe_id)}>
                                        <input class="recipe-index-card-button" type="submit" value="Add Ingredients to Shopping List" />
                                    </form> </span> 
                            </div>
                            <div>
                                <br />
                                <span class="title is-6">
                                    <form onSubmit={(e) => handleMenuSubmit(e,recipe_id, index)}>
                                        
                                        <input class="recipe-index-card-button" type="date" name="dateSelected" value={date} onChange={(e) => handleDateChange(e, index)}/>
                                        <input type="submit" value="Request" />
                                    </form> </span> 
                                    <CustomButton text="Add to Menu" onClick={() => {setShowAddMenuModule(true)}}>

                                    </CustomButton>
                                    {showAddMenuModule && (
                                        <AddToMenuPopup  children={null} onClose={() => {setShowAddMenuModule(false)}}>
                                        </AddToMenuPopup>
                                    )
                                    }
                                
                                    
                            </div>
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecipeIndexUnit;