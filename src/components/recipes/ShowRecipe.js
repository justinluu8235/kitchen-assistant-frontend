import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";
import "./ShowRecipe.css";
import CustomButton from "../shared/Button";
import { useNavigate } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
        categoryChipsContainer: {
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            gap: '10px',
        }
    
  })
);

const ShowRecipe = (props) => {
  const { handleLogout, user } = props;
  const { id, name, email, exp } = user;
  const [recipeData, setRecipeData] = useState();
  const [redirect, setRedirect] = useState(false);
  const [recipeCategories, setRecipeCategories] = useState();
  const classes = useStyles()
  const navigate = useNavigate();

  // make a condition that compares exp and current time
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime) {
    handleLogout();

    alert("Session has ended. Please login to continue.");
    window.location.href = "/login";
  }

  let temp = window.location.pathname.split("/");
  let recipeID = temp[2];

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    fetch(`${REACT_APP_SERVER_URL}/recipes/view/${recipeID}`, {
      headers: {
        'Authorization': token,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        const recipeCategoryObjList = data["recipe_categories"];
        const categoryNameList = recipeCategoryObjList.map(
          (category) => category["category_name"]
        );
        setRecipeCategories(categoryNameList);
      });
  }, [props]);

  const displayIngredients = () => {
    let ingredients = recipeData["ingredients"];
    let display = ingredients.map((ingredient, idx) => {
      let stringIngredient = `${ingredient["ingredient_name"]} - ${ingredient["ingredient_quantity"]} ${ingredient["quantity_unit"]}`;
      return (
        <div>
          <br />
          <p>{stringIngredient}</p>
        </div>
      );
    });
    return display;
  };

  const displayInstructions = () => {
    let instructions = recipeData["instructions"];
    let display = instructions.map((instruction, idx) => {
      return (
        <div>
          <br />
          <span class="instructions recipe">
            {instruction["step_number"]}.{" "}
          </span>
          <span class="instructions recipe">{instruction["instructions"]}</span>
          <br />
        </div>
      );
    });
    return display;
  };

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken")
    let csrftoken = getCookie("csrftoken");
    fetch(`${REACT_APP_SERVER_URL}/recipes/delete/${recipeID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        'Authorization': token, 
      },
    })
      .then((data) => {
        setRedirect(true);
      })
      .catch((error) => {
        console.log("===> Error deleting recipe", error);
        alert("Error deleting recipe");
      });
  };


  if (redirect) return <Navigate to={`/recipes`} />;
  const userData = user ? (
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered recipe-show">
          {recipeData && recipeData["recipe"]["image"] ? (
            <img
              id="search-recipe-image"
              src={recipeData["recipe"]["image"]}
              alt=""
            />
          ) : null}
          <h1 class="title" style={{ color: "#EBF2FA" }}>
            {recipeData && recipeData["recipe"]["recipe_name"]}
          </h1>
          <br />
          <br />
          {recipeCategories && recipeCategories.length > 0 && (
            <div className={classes.categoryChipsContainer}>
              <span style={{ color: "#EBF2FA" }}>Categories: </span>
              {recipeCategories.map((category) => {
                return <Chip size="small" label={category} />;
              })}
            </div>
          )}

          <div>
            <CustomButton text="Edit Recipe" onClick={() => {navigate(`/recipes/edit/${recipeID}`);}}></CustomButton>
            <CustomButton text="Delete Recipe" onClick={handleSubmit}></CustomButton>

          </div>
        </div>
      </div>

      <div class="ingredient-instruction-wrapper recipe-show ">
        <div id="app" class="row columns is-multiline recipe-show">
          <div
            v-for="card in cardData"
            key="card.id"
            class="column is-4 recipe-show"
          >
            <div class="card large" id="card-large">
              <div class="card-content">
                <div class="media">
                  <div class="media-content recipe-show">
                    <p class="title is-4 no-padding recipe-instruction-title">
                      Ingredients:
                    </p>
                    <p>
                      <span class="title is-6">
                        {recipeData ? displayIngredients() : null}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="content"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="app" class="row columns is-multiline recipe-show ">
          <div
            v-for="card in cardData"
            key="card.id"
            class="column is-4 recipe-show"
          >
            <div class="card large" id="card-large">
              <div class="card-content">
                <div class="media">
                  <div class="media-content recipe-show">
                    <div>
                      <p class="title is-4 no-padding recipe-instruction-title">
                        Instructions:
                      </p>
                    </div>

                    <div class="instruction-container recipe-show ">
                      {recipeData ? displayInstructions() : null}
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
  ) : (
    <Navigate to="/login" />
  );

  const errorDiv = () => {
    return (
      <div className="text-center pt-4">
        <h3>
          Please <Link to="/login">login</Link> to view this page
        </h3>
      </div>
    );
  };

  return <div className="text-center pt-4">{user ? userData : errorDiv()}</div>;
};

export default ShowRecipe;
