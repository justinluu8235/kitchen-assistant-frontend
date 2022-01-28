import React, {useState} from 'react';


const FriendRecipeIndexUnit = (props) => {
    const {recipeName, recipe_id, image, user_id,  index, handleDateChange,  date, handleMenuSubmit} = props
    const {REACT_APP_SERVER_URL} = process.env

 
    return (

        <div v-for="card in cardData" key="card.id" class="column is-4">

            <div class="card large">
             
                <div class="card-image" class="recipe-image">
                    <figure class="image is-16by9">
                        <img src={image ? image : ""}  />
                    </figure>
                </div>
 
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding">{recipeName} </p>
                            <br />
                            <p>
                                <span class="title is-6">
                                    <a href={`/userFriends/recipes/show/${recipe_id}`}>View Recipe</a> </span> </p>
                            <br /><br />
                            
                            <p>
                                <br />
                                <span class="title is-6">
                                    <form onSubmit={(e) => handleMenuSubmit(e,recipe_id, index)}>
                                        
                                        <input type="date" name="dateSelected" value={date} onChange={(e) => handleDateChange(e, index)}/>
                                        <input type="submit" value="Request" />
                                    </form> </span> </p>
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