import React, { useState, useEffect } from "react";
import "../recipes/RecipeIndex.css";
import FriendRecipeIndexUnit from "./FriendRecipeIndexUnit";
import "./FriendRecipeIndex.css";
import { TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import RecipeCategories from "../recipes/categories";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchAndFilterContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    recipeHeaderContainder: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    searchInput: {
      backgroundColor: "#EBF2FA",
      width: "250px",
      borderRadius: "5px",
    },
  })
);

const FriendRecipeIndex = (props) => {
    const classes = useStyles()
  const { handleLogout, user } = props;
  console.log("user", user);
  const { id, username, email, exp } = user;
  const { REACT_APP_SERVER_URL } = process.env;
  const [recipes, setRecipes] = useState();
  const [friendName, setFriendName] = useState();
  const [availableCategories, setAvailableCategories] = useState([]);
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);



  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime) {
    handleLogout();

    alert("Session has ended. Please login to continue.");
    window.location.href = "/login";
  }

  let temp = window.location.pathname.split("/");
  let friendId = temp[3];
  console.log("friend id", friendId);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (user) {
      fetch(`${REACT_APP_SERVER_URL}/recipes/${friendId}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("return data", data);
          setRecipes(data);
        });
    }
    fetch(`${REACT_APP_SERVER_URL}/name/${friendId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFriendName(data);
      });

      fetch(`${REACT_APP_SERVER_URL}/recipes/categories/${friendId}`, {
        headers: {
          'Authorization': token, 
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const recipeCategoryObjList = data["recipe_categories"];
          const categoryNameList = recipeCategoryObjList.map(
            (category) => category["category_name"]
          );
          setAvailableCategories(categoryNameList);
        });
  }, [props]);

  const displayRecipes = () => {
    const filteredRecipes = filterRecipes(recipes);

    let display = filteredRecipes.map((recipe, idx) => {
      return (
        <FriendRecipeIndexUnit
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
      const categoryList = recipe["categories"].map(
        (recipe) => recipe["category_name"]
      );
      const recipeHasFilteredCategories = filterCategories.every((cat) =>
        categoryList.includes(cat)
      );
      if (
        recipe["recipe_name"]
          .toLowerCase()
          .includes(recipeSearchInput.toLowerCase())
      ) {
        // Filter by categories -
        if (recipeHasFilteredCategories) {
          return true;
        }
      }
    });

    return filteredRecipesByName;
  };


  const handleDeleteCategory = (category) => {
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

  const handleMenuSubmit = (e, recipeId, index, meal, note) => {
    e.preventDefault();
    console.log("recipe", recipes[index]);
    let newMenuData = {
      recipe_owner_id: friendId,
      cook_date: recipes[index]["date"],
      recipe_id: recipeId,
      requester_username: username,
      meal_name: meal,
      note: note,
    };
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/menu/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newMenuData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data", data);
        alert(
          `Requested ${friendName} to make ${data["recipe"]["recipe_name"]} on ${data["menu_item"]["cook_date"]}`
        );
      })
      .catch((error) => {
        console.log("===> Error creating menu item", error);
        alert("Error creating menu item");
      });
  };

  return (
    <div class="container">
      <div class="section">
        <div id="add-recipe"></div>
        <div class="columns">
          <div class="column has-text-centered" className={classes.recipeHeaderContainder}>
            <h1
              class="title userfriend-recipe-index"
              style={{ color: "#EBF2FA" }}
            >
              {friendName}'s Recipes
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
        <div id="app" class="row columns is-multiline userfriend-recipe-index">
          {recipes ? displayRecipes() : null}
        </div>
      </div>
    </div>
  );
};

export default FriendRecipeIndex;
