import React from 'react'

const MenuItem = (props) => {
    const {index,menuId,requester_username, image, recipe_name, username, 
        recipeId, handleDeleteSubmit, user_id } = props;
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

    const generateShoppingList = (e,user_id, recipeId) => {
        e.preventDefault();
        let recipeInfo = {
            user_id: user_id,
            recipe_id: recipeId
        }
        console.log('recipe info', recipeInfo);

        let csrftoken = getCookie('csrftoken');
        const token = localStorage.getItem("jwtToken")
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/generate`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                "Authorization": token
            },
            body: JSON.stringify(recipeInfo)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                alert(`ingredients for ${recipe_name} has been added to your shopping list`)
            })
            .catch(error => {
                console.log('===> Error creating pantry item', error);
                alert('Error creating pantry item');
            });

    }

    return(
        <div v-for="card in cardData" key="card.id" class="column is-4 menu-item">
                        <div class="card large menu-item">
                            {image ? 
                            <div class="card-image" class="recipe-image">
                                <figure class="image is-16by9">
                                    <img src={image} alt="" />
                                </figure>
                            </div>
                            : null
                            }
                            <div class="card-content">
                                <div class="media">

                                    <div class="media-content menu-item">


                                        <p class="title is-4 no-padding" style={{ color: "#0d6efd" }}>{recipe_name} </p>
                                        <br />

                                        <p style={{ color: "#0d6efd" }}>
                                            <span class="title is-6">
                                                Requested by:  {requester_username == username ? "Myself !" : requester_username}  </span>
                                        </p>
                                        <p>

                                            <div>
                                                <span class="title is-6">
                                                    <a href={`/recipes/${recipeId}`}>View Recipe</a> </span>
                                            </div>
                                        </p>
                                        <br /><br />

                                        <span class="title is-6"> <form onSubmit={(e) =>generateShoppingList(e,user_id, recipeId)}>
                                            <input type="submit" value="Add Ingredients to Shopping List" />
                                        </form>
                                        </span>

                                        <div>
                                            <span class="title is-6"><form onSubmit={(e) => handleDeleteSubmit(e,menuId, index )}>
                                                <input type="submit" value="Remove from Menu" />
                                            </form>
                                            </span>
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

export default MenuItem;