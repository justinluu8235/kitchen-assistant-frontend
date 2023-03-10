import React, { useState, useEffect } from "react";
import "./NewRecipe.css";
import IngredientInput from "./IngredientInput";
import InstructionInput from "./InstructionInput";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useIsRecipeLoading } from "./hooks";
import store from "../../store";
import Loading from "../shared/loading";
import RecipeCategories from "./categories";
import CustomButton from "../shared/Button";

const { REACT_APP_SERVER_URL } = process.env;

const NewRecipe = (props) => {
  const isLoading = useIsRecipeLoading();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      ingredient_name: "",
      ingredient_quantity: "",
      quantity_unit: "grams",
    },
  ]);
  const [instructions, setInstructions] = useState([
    {
      step_number: 1,
      instructions: "",
    },
  ]);
  const [redirect, setRedirect] = useState(false);
  const [newRecipeID, setNewRecipeID] = useState();
  const [imageFile, setImageFile] = useState();
  const [availableCategories, setAvailableCategories] = useState();
  const [categories, setCategories] = useState([]);

  const { handleLogout, user } = props;
  const { id, name, email, exp } = user;
  // make a condition that compares exp and current time
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime) {
    handleLogout();

    alert("Session has ended. Please login to continue.");
    window.location.href = "/login";
  }

  useEffect(() => {
    if (id) {
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
  }, [id]);

  const handleAddIngredientClick = () => {
    setIngredients(
      ingredients.concat([
        {
          ingredient_name: "",
          ingredient_quantity: "",
          quantity_unit: "grams",
        },
      ])
    );
  };

  const handleAddInstructionClick = () => {
    let lastStep = instructions[instructions.length - 1]["step_number"];
    setInstructions(
      instructions.concat([
        {
          step_number: lastStep + 1,
          instructions: "",
        },
      ])
    );
  };

  const handleChangeIngredients = (i, e) => {
    let temp = ingredients.slice();
    temp[i][e.target.name] = e.target.value;
    setIngredients(temp);
  };

  const displayIngredients = (ingredients) => {
    // console.log('in ingredients display' , ingredients)
    let display = ingredients.map((ingredient, idx) => {
      return (
        <IngredientInput
          key={idx}
          index={idx}
          name={ingredient["ingredient_name"]}
          quantity={ingredient["ingredient_quantity"]}
          unit={ingredient["quantity_unit"]}
          handleIngredientChange={handleChangeIngredients}
        />
      );
    });
    return display;
  };

  const handleInstructionChange = (i, e) => {
    let temp = instructions.slice();
    temp[i]["instructions"] = e.target.value;
    setInstructions(temp);
  };

  const displayInstructions = (instructions) => {
    // console.log('in instructions display', instructions);
    let display = instructions.map((instruction, idx) => {
      return (
        <InstructionInput
          key={idx}
          index={idx}
          step_number={instruction["step_number"]}
          instruction={instruction["instruction"]}
          handleInstructionChange={handleInstructionChange}
        />
      );
    });
    return display;
  };

  const handleNameChange = (e) => {
    setRecipeName(e.target.value);
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

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
    }
  };

  const handleAddCategory = (categoryInput) => {
    const trimmedCategoryInput = categoryInput.trim();
    if (trimmedCategoryInput && !categories.includes(trimmedCategoryInput)) {
      setCategories([...categories, trimmedCategoryInput]);
    }
  };
  const handleDeleteCategory = (category) => {
    console.log("deleting category", category);
    const categoryList = [...categories]
    let index = categoryList.indexOf(category);
    if (index > -1) {
      categoryList.splice(index, 1);
    }
    setCategories(categoryList)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const URL = `${REACT_APP_SERVER_URL}/recipes/new`;

    let formdata = new FormData();
    formdata.append("recipe_name", recipeName);
    formdata.append("user", id);
    formdata.append("recipe_category", 1);
    formdata.append("instructions_list", JSON.stringify(instructions));
    formdata.append("ingredients_list", JSON.stringify(ingredients));
    formdata.append("recipe_categories", JSON.stringify(categories));

    if (imageFile) {
      formdata.append("image", imageFile["image"][0]);
    }

    store.dispatch({ type: "recipes/isLoading" });
    axios
      .post(URL, formdata, config)
      .then((res) => {
        setNewRecipeID(res.data["recipe"]["id"]);
        store.dispatch({ type: "recipes/doneLoading" });
        setRedirect(true);
      })
      .catch((error) => {
        console.log("===> Error creating recipe", error);
        store.dispatch({ type: "recipes/doneLoading" });
        alert("Error creating recipe");
      });
  };

  const hangleImageFile = (e) => {
    setImageFile({
      image: e.target.files,
    });
    console.log(e.target.files);
    console.log(imageFile);
  };

  if (redirect) return <Navigate to={`/recipes/${newRecipeID}`} />;
  return (
    <div class="container new-recipe">
      <div class="section">
        <div class="row columns is-multiline new-recipe">
          <div
            v-for="card in cardData"
            key="card.id"
            class="column is-4 new-recipe"
          >
            <div class="card large" id="card-large">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p
                      class="title is-4 no-padding"
                      style={{ color: "#0d6efd" }}
                    >
                      Add a Recipe
                    </p>

                    <div class="list-item">
                      <p class="pantry-item">
                        <span class="is-6">
                          <form onSubmit={handleSubmit}>
                            <label for="recipeName">
                              <p>Recipe Name</p>
                            </label>
                            <input
                              type="text"
                              name="recipeName"
                              disabled={isLoading}
                              value={recipeName}
                              onChange={handleNameChange}
                              required
                            />
                            <br />
                            <label for="categoryName">
                              <p>Recipe Category</p>
                            </label>
                            <RecipeCategories
                              categories={categories}
                              availableCategories={availableCategories}
                              handleCategorySelect={handleCategorySelect}
                              handleAddCategory={handleAddCategory}
                              handleDeleteCategory={handleDeleteCategory}
                            />

                            <label for="image">
                              <p class="new-recipe-image-label">Recipe image</p>
                              <input
                                type="file"
                                name="image"
                                id="post-image"
                                disabled={isLoading}
                                onChange={hangleImageFile}
                              ></input>
                            </label>
                            <br />
                            <br />
                            <div class="all-ingredients" id="all-ingredients">
                              <label>
                                <p>Ingredients:</p>
                              </label>
                              {displayIngredients(ingredients)}
                            </div>
                            <label for="button"></label>
                            <CustomButton
                              text={"Add another Ingredient"}
                              disabled={isLoading}
                              onClick={handleAddIngredientClick}
                            />

                            {/* <input
                              type="button"
                              name="button"
                              disabled={isLoading}
                              onClick={handleAddIngredientClick}
                              value="Add another Ingredient"
                              id="addIngredientButton"
                            /> */}

                            <div class="all-recipe-steps">
                              <label>
                                <p>Instructions:</p>
                              </label>
                              {displayInstructions(instructions)}
                            </div>
                            <label for="button"></label>
                            <CustomButton
                              text={"Add another step"}
                              onClick={handleAddInstructionClick}
                              disabled={isLoading}
                            />
                            {/* <input
                              type="button"
                              name="button"
                              disabled={isLoading}
                              onClick={handleAddInstructionClick}
                              value="Add another Step"
                              id="addRecipeStepButton"
                            /> */}

                            <br />
                            <br />
                            <br />
                            {isLoading ? (
                              <Loading />
                            ) : (
                              <CustomButton disabled={isLoading} text={"Save"} type={"submit"} />
                            )}
                          </form>
                        </span>
                      </p>
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
  );
};

export default NewRecipe;
