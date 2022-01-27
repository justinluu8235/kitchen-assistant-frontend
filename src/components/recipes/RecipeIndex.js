import  React, {useState, useEffect} from 'react';
import './RecipeIndex.css';
import RecipeIndexUnit from './RecipeIndexUnit';



const RecipeIndex = (props) => {
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
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
        return <RecipeIndexUnit key={idx} recipeName={recipe['recipe_name']}  id={recipe['id']} image={recipe['image']}/>
        })
        return display;
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