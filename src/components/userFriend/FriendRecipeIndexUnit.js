import React, {useState} from 'react';


const FriendRecipeIndexUnit = (props) => {
    const {recipeName, recipe_id, image, user_id, index, handleDateChange, date, categories, handleMenuSubmit} = props
    const {REACT_APP_SERVER_URL} = process.env

 
    return (

        <div v-for="card in cardData" key="card.id" class="column is-4 friend-recipe-index-card">

            <div class="card large">
            {image ? 
                <div class="card-image" class="recipe-image">
                <figure class="image is-16by9">
                    <img src={image ? image : ""}  />
                </figure>
            </div>
                : null
                }
 
                <div class="card-content">
                    <div class="media">
                        <div class="media-content friend-recipe-index">
                            <p class="title is-4 no-padding friend-recipe-index">{recipeName} </p>
                            <p> {categories ? categories.map(category => category.category_name).join(' ') : null} </p>
                            <br />
                            <div>
                                <span class="title is-6">
                                    <a href={`/userFriends/recipes/show/${recipe_id}`}>View Recipe</a> </span> </div>
                            <br /><br />
                            
                            <div class='input-container-friend-recipe'>
                                <br />
                               
                                    <form onSubmit={(e) => handleMenuSubmit(e,recipe_id, index)}>
                                        
                                        <input type="date" name="dateSelected" value={date} onChange={(e) => handleDateChange(e, index)}/>
                                        <input type="submit" value="Request" />
                                    </form></div>
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FriendRecipeIndexUnit;