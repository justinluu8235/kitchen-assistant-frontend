import  React, {useState, useEffect} from 'react';
import './RecipeIndex.css';
import RecipeIndexUnit from './RecipeIndexUnit';



const RecipeIndex = (props) => {
    const { handleLogout, user } = props;
    const { id, username, email, exp } = user;
    const { REACT_APP_SERVER_URL } = process.env;
    const [recipes, setRecipes] = useState();


    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
    }

    useEffect(() => {

        if(user){
        fetch(`${REACT_APP_SERVER_URL}/recipes/${id}`)
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data);
                setRecipes(data)
            });
        }

    }, [props])

    const displayRecipes = () => {
        let display = recipes.map((recipe, idx) => {
        

        return <RecipeIndexUnit key={idx} index={idx} recipeName={recipe['recipe_name']}  
                                recipe_id={recipe['id']} image={recipe['image']}
                                date={recipe['date'] ? recipe['date'] : null}
                                user_id={id}
                                handleDateChange={handleDateChange}
                                handleMenuSubmit={handleMenuSubmit}
                                />
        })
        return display;
    }

    const handleDateChange = (e, index) => {
          let temp = recipes.slice()
          temp[index]['date']  = e.target.value
          setRecipes(temp);
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

    const handleMenuSubmit = (e, recipeId, index) => {
        e.preventDefault();
        console.log("recipe", recipes[index])
        let newMenuData = {
          recipe_owner_id: id,
          cook_date: recipes[index]['date'],
          recipe_id: recipeId,
          requester_username: username, 
      }
      console.log('new menu data', newMenuData);

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/menu/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newMenuData)
        })
        .then(response => response.json())
        .then((data) => {
            console.log('return data', data)
            alert(`${data['recipe']['recipe_name']} added to the menu to cook on ${data['menu_item']['cook_date']}`)
            // let temp = recipes.slice()
            // temp[index]['date'] = '' 
            // setRecipes(temp);
        })
        .catch(error => {
            console.log('===> Error creating menu item', error);
            alert('Error creating menu item');
        });

    }


    return(
        <div class="container">
      
        <div class="section">
          <div id="add-recipe">
          <a href="/recipes/new">Add a Recipe</a>
        </div>
          <div class="columns">
            <div class="column has-text-centered">
              <h1 class="title" style={{color: "#EBF2FA"}}>My Recipes</h1><br/>
            </div>
          </div>
          <div id="app" class="row columns is-multiline">
            {recipes ? displayRecipes() : null}
          </div>
        </div>
      </div>
    )

}

export default RecipeIndex