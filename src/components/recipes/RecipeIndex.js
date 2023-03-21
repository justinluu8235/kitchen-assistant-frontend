import React, { useState, useEffect } from "react";
import "./RecipeIndex.css";
import RecipeIndexUnit from "./RecipeIndexUnit";
import { Link, Navigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import RecipeCategories from "./categories";
import { ElasticInference } from "aws-sdk";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchAndFilterContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: 'center', 
      gap: '15px',
      flexWrap: 'wrap',
      justifyContent:"center"
    },
    recipeHeaderContainder:{
        display: "flex", 
        flexDirection: "column",
        alignItems:"center", 
    },
    searchInput: {
      backgroundColor: "#EBF2FA",
      width: "250px",
      borderRadius:"5px",
    },
  })
);

const RecipeIndex = (props) => {
  const classes = useStyles();
  const { handleLogout, user } = props;
  const { id, username, email, exp } = user;
  const { REACT_APP_SERVER_URL } = process.env;
  const [recipes, setRecipes] = useState();
  const [redirect, setRedirect] = useState(false);
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime) {
    handleLogout();

    alert("Session has ended. Please login to continue.");
    window.location.href = "/login";
    setRedirect(true);
  }

  useEffect(() => {
    if (user) {
      fetch(`${REACT_APP_SERVER_URL}/recipes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("return data", data);
          setRecipes(data);
        });

      fetch(`${REACT_APP_SERVER_URL}/recipes/categories/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const recipeCategoryObjList = data["recipe_categories"];
          const categoryNameList = recipeCategoryObjList.map(
            (category) => category["category_name"]
          );
          setAvailableCategories(categoryNameList);
        });
    }
  }, [props]);

  const displayRecipes = () => {
    const filteredRecipes = filterRecipes(recipes)

    let display = filteredRecipes.map((recipe, idx) => {
      return (
        <RecipeIndexUnit
          key={idx}
          index={idx}
          recipeName={recipe["recipe_name"]}
          recipe_id={recipe["id"]}
          image={recipe["image"]}
          date={recipe["date"] ? recipe["date"] : null}
          user_id={id}
          handleDateChange={handleDateChange}
          handleMenuSubmit={handleMenuSubmit}
        />
      );
    });
    return display;
  };

  const filterRecipes = (recipes) => {
    // Filter by name 
    const filteredRecipesByName = recipes.filter((recipe) => {
        const categoryList = recipe['categories'].map(recipe => recipe['category_name'])
        const recipeHasFilteredCategories = filterCategories.every(cat => categoryList.includes(cat))
        if(recipe["recipe_name"].toLowerCase().includes(recipeSearchInput.toLowerCase())){
            // Filter by categories -
            if(recipeHasFilteredCategories){
                return true
            }
            
        }        
    })

    return filteredRecipesByName
  }

  
  const handleDeleteCategory = (category) => {
    console.log("deleting category", category);
    const categoryList = [...filterCategories];
    let index = categoryList.indexOf(category);
    if (index > -1) {
      categoryList.splice(index, 1);
    }
    setFilterCategories(categoryList);
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !filterCategories.includes(selectedCategory)) {
      setFilterCategories([...filterCategories, selectedCategory]);
    }
  };

  const handleDateChange = (e, index) => {
    let temp = recipes.slice();
    temp[index]["date"] = e.target.value;
    setRecipes(temp);
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

  const handleMenuSubmit = (e, recipeId, index) => {
    e.preventDefault();
    console.log("recipe", recipes[index]);
    let newMenuData = {
      recipe_owner_id: id,
      cook_date: recipes[index]["date"],
      recipe_id: recipeId,
      requester_username: username,
    };
    console.log("new menu data", newMenuData);

    let csrftoken = getCookie("csrftoken");
    fetch(`${REACT_APP_SERVER_URL}/menu/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(newMenuData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data", data);
        alert(
          `${data["recipe"]["recipe_name"]} added to the menu to cook on ${data["menu_item"]["cook_date"]}`
        );
        // let temp = recipes.slice()
        // temp[index]['date'] = ''
        // setRecipes(temp);
      })
      .catch((error) => {
        console.log("===> Error creating menu item", error);
        alert("Error creating menu item");
      });
  };

  const userData = user ? (
    <div class="container">
      {redirect ? <Navigate to="/login" /> : null}
      <div class="section">
        <div id="add-recipe">
          <a href="/recipes/new">Add a Recipe</a>
        </div>
        <div class="columns">
          <div class="column has-text-centered" className={classes.recipeHeaderContainder}>
            <h1 class="title recipe-index" style={{ color: "#EBF2FA" }}>
              My Recipes
            </h1>
            <br />
            <div className={classes.searchAndFilterContainer}>

          <TextField
            variant="outlined"
            className={classes.searchInput}
            onChange={(e) => setRecipeSearchInput(e.target.value)}
            value={recipeSearchInput}
            placeholder="Search for recipe name"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setRecipeSearchInput("")}
                  aria-label="toggle password visibility"
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          ></TextField>

<RecipeCategories
            categories={filterCategories}
            availableCategories={availableCategories}
            handleCategorySelect={handleCategorySelect}
            handleDeleteCategory={handleDeleteCategory}
            onlyShowDropdown={true}
            selectPlaceholderText={"Filter by a category"}
          />
        </div>
          </div>
          
        </div>
        

        <div id="app" class="row columns is-multiline">
          {recipes ? displayRecipes() : null}
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

export default RecipeIndex;
