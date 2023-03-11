import React, { useState, useEffect } from "react";
import EditIngredientInput from "./EditIngredientInput";
import EditInstructionInput from "./EditInstructionInput";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./EditRecipe.css";
import { useIsRecipeLoading } from "./hooks";
import Loading from "../shared/loading";
import store from "../../store";
import RecipeCategories from './categories'
import CustomButton from '../shared/Button'

const EditRecipe = (props) => {
  const isLoading = useIsRecipeLoading();
  const { handleLogout, user } = props;
  const { id, name, email, exp } = user;
  const [recipeData, setRecipeData] = useState();
  const [recipeName, setRecipeName] = useState("");
  const [imageFile, setImageFile] = useState();
  const [ingredients, setIngredients] = useState([
    {
      id: 0,
      ingredient_name: "",
      ingredient_quantity: "",
      quantity_unit: "grams",
      recipe: 0,
    },
  ]);
  const [instructions, setInstructions] = useState([
    {
      id: 0,
      step_number: 1,
      instructions: "",
      image: null,
      recipe: 0,
    },
  ]);
  const [newRecipeId, setNewRecipeId] = useState();
  const [redirect, setRedirect] = useState(false);
  const [availableCategories, setAvailableCategories] = useState();
  const [categories, setCategories] = useState([]);
  const { REACT_APP_SERVER_URL } = process.env;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime) {
    handleLogout();

    alert("Session has ended. Please login to continue.");
    window.location.href = "/login";
  }

  let temp = window.location.pathname.split("/");
  let recipeID = temp[3];
  console.log("recipe id", recipeID);

  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/recipes/view/${recipeID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("return data", data);
        setRecipeData(data);
        setRecipeName(data["recipe"]["recipe_name"]);
        setIngredients(data["ingredients"]);
        setInstructions(data["instructions"]);
        const initialCategoryObjs = data["recipe_categories"]
        const initialCategories = initialCategoryObjs.map((categoryObj) => {
          return categoryObj["category_name"]
        })

        setCategories(initialCategories)

      });

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

  }, [props]);

  const handleNameChange = (event) => {
    setRecipeName(event.target.value);
  };


  const handleAddIngredientClick = () => {
    setIngredients(
      ingredients.concat([
        {
          id: 0,
          ingredient_name: "",
          ingredient_quantity: "",
          quantity_unit: "grams",
          recipe: 0,
        },
      ])
    );
  };

  const handleChangeIngredients = (i, e) => {
    let temp = ingredients.slice();
    console.log('e', e)
    temp[i][e.target.name] = e.target.value;
    setIngredients(temp);
  };
  const handleDeleteIngredient = (i, e) => {
    let temp = ingredients.slice();
    temp.splice(i, 1);
    setIngredients(temp);
  };
  const displayIngredients = (ingredients) => {
    let display = ingredients.map((ingredient, idx) => {
      return (
        <EditIngredientInput
          key={idx}
          index={idx}
          name={ingredient["ingredient_name"]}
          quantity={ingredient["ingredient_quantity"]}
          unit={ingredient["quantity_unit"]}
          handleIngredientChange={handleChangeIngredients}
          handleDeleteIngredient={handleDeleteIngredient}
        />
      );
    });
    return display;
  };

  const handleAddInstructionClick = () => {
    let lastStep;
    instructions.length == 0
      ? (lastStep = 0)
      : (lastStep = instructions[instructions.length - 1]["step_number"]);
    setInstructions(
      instructions.concat([
        {
          id: 0,
          step_number: lastStep + 1,
          instructions: "",
          image: null,
          recipe: 0,
        },
      ])
    );
  };

  const handleDeleteInstruction = (i, e) => {
    console.log("index", i);
    let temp = instructions.slice();
    temp.splice(i, 1);
    setInstructions(temp);
  };
  const handleInstructionChange = (i, e) => {
    let temp = instructions.slice();
    temp[i]["instructions"] = e.target.value;
    setInstructions(temp);
  };

  const displayInstructions = (instructions) => {
    let display = instructions.map((instruction, idx) => {
      return (
        <EditInstructionInput
          key={idx}
          index={idx}
          step_number={instruction["step_number"]}
          instruction={instruction["instructions"]}
          handleInstructionChange={handleInstructionChange}
          handleDeleteInstruction={handleDeleteInstruction}
        />
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

    store.dispatch({ type: "recipes/isLoading" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let formdata = new FormData();
    formdata.append("image", imageFile ? imageFile["image"][0] : '');
    formdata.append("id", recipeID);
    formdata.append("recipe_name", recipeName)
    formdata.append("recipe_categories", JSON.stringify(categories))
    formdata.append("instructions_list", JSON.stringify(instructions))
    formdata.append("ingredients_list", JSON.stringify(ingredients))
    formdata.append("user_id", id)
    const URL = `${REACT_APP_SERVER_URL}/recipes/edit/${recipeID}`
    axios.post(URL, formdata, config)
    .then((response) => {
        console.log('response', response)
        setNewRecipeId(response.data["recipe"]["id"]);
        store.dispatch({ type: "recipes/doneLoading" });
        setRedirect(true);
    })
    .catch((error) => {
        console.log("===> Error editing recipe", error);
        alert("Error editing recipe");
        store.dispatch({ type: "recipes/doneLoading" });
    })  
  };

  const hangleImageFile = (e) => {
    setImageFile({
      image: e.target.files,
    });
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

  if (redirect) return <Navigate to={`/recipes/${newRecipeId}`} />;
  return (
    <div class="container">
      <div class="section">
        <div id="app" class="row columns is-multiline">
          <div
            v-for="card in cardData"
            key="card.id"
            class="column is-4 edit-recipe"
          >
            <div class="card large" id="card-large">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p
                      class="title is-4 no-padding edit-recipe"
                      style={{ color: "0d6efd" }}
                    >
                      Edit Recipe
                    </p>
                    <div class="list-item">
                      <p class="pantry-item">
                        <span class="title is-6">
                          <form
                            method="POST"
                            onSubmit={handleSubmit}
                            action="/recipes/<%=recipe.id%>/?_method=PUT"
                          >
                            <label for="recipeName">Recipe Name</label>
                            <input
                              type="text"
                              name="recipeName"
                              disabled={isLoading}
                              value={recipeName}
                              onChange={handleNameChange}
                            />
                            <br />
                            <label for="categoryName">Recipe Category</label>
                            <br />
                            <RecipeCategories
                              categories={categories}
                              availableCategories={availableCategories}
                              handleCategorySelect={handleCategorySelect}
                              handleAddCategory={handleAddCategory}
                              handleDeleteCategory={handleDeleteCategory}
                            />
                            <br />
                            <label for="image">
                              <p class="edit-recipe-image-label">
                                Recipe image
                              </p>
                              <input
                                type="file"
                                name="image"
                                id="post-image"
                                disabled={isLoading}
                                onChange={hangleImageFile}
                              ></input>
                            </label>

                            <div class="all-ingredients">
                              <label>Ingredients</label>
                              {recipeData
                                ? displayIngredients(ingredients)
                                : null}
                            </div>

                            <CustomButton  text="Add another ingredient" disabled={isLoading} onClick={handleAddIngredientClick}></CustomButton>


                            <div class="all-recipe-steps">
                              <label>Ingredients</label>
                              {recipeData
                                ? displayInstructions(instructions)
                                : null}
                            </div>

                            <CustomButton text="Add another step" disabled={isLoading} onClick={handleAddInstructionClick}></CustomButton>
       
                            <br />
                            <br />
                            <br />
                            {isLoading ? <Loading /> :  <CustomButton disabled={isLoading} text={"Save"} type={"submit"} />}
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

export default EditRecipe;
