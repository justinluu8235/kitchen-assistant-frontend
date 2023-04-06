import React, {useState} from 'react';
import CustomButton from '../shared/Button'
import AddToMenuPopup from '../menu/AddToMenuPopup';


const FriendRecipeIndexUnit = (props) => {
    const {recipeName, recipe_id, image, user_id,  index, handleDateChange,  date, handleMenuSubmit} = props
    const [showAddMenuModule, setShowAddMenuModule] = useState(false)

 
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
                            <br />
                            <div>
                                <span class="title is-6">
                                    <a href={`/userFriends/recipes/show/${recipe_id}`}>View Recipe</a> </span> </div>
                            <br /><br />
                            
        
                                    <CustomButton text="Add to Menu" onClick={() => {setShowAddMenuModule(true)}}>
                                    </CustomButton>
                                    {showAddMenuModule && (
                                        <AddToMenuPopup  title={"Add Recipe to Menu"} recipe_id={recipe_id} handleMenuSubmit={handleMenuSubmit} handleDateChange={handleDateChange} index={index} onClose={() => {setShowAddMenuModule(false)}}>
                                        </AddToMenuPopup>
                                    )
                                    }
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