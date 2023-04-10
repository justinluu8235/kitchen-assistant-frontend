import React, { useState, useEffect } from "react";
import "./ShoppingList.css";
import ShoppingItem from "./ShoppingItem";
import CustomButton from "../shared/Button";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shoppingListContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap:"20px",
      width: "800px",
      margin: "0 auto",
    },
    "@media screen and (max-width: 768px)": {
      shoppingListContainer: {
        width: "90%",
      },
    },
    ingredientContainer: {
        backgroundColor: "var(--background)", 
        padding: "10px", 
        borderRadius: "10px", 
        border: "1px solid black",
    },
    ingredientRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      borderRadius: "5px",
      marginTop: "10px",
      marginBottom: "5px",
      padding: "5px",
      gap: "10px",
      alignItems: "center",
    },
    ingredientNameInput: {
      backgroundColor: "#e0e0e0",
      flex: 2,
      minWidth: "150px",
    },
    ingredientQuantityInput: {
      backgroundColor: "#e0e0e0",
      flex: 1,
      minWidth: "60px",
    },
    ingredientUnitSelect: {
      maxHeight: "30px",
    },
  })
);
const ShoppingList = (props) => {
  const classes = useStyles();
  const [currentItem, setCurrentItem] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [currentUnit, setCurrentUnit] = useState("unit");
  const [shoppingListData, setShoppingListData] = useState();
  const { REACT_APP_SERVER_URL } = process.env;
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
    if (user) {
      const token = localStorage.getItem("jwtToken");
      fetch(`${REACT_APP_SERVER_URL}/shoppinglist/${id}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setShoppingListData(data["shopping_list"]);
        });
    }
  }, [props]);

  const displayShoppingItems = (shoppingListData) => {
    let display = shoppingListData.map((shoppingItem, idx) => {
      return (
        <ShoppingItem
          key={idx}
          index={idx}
          shoppingItemId={shoppingItem["id"]}
          ingredient_quantity={shoppingItem["ingredient_quantity"]}
          item_name={shoppingItem["item_name"]}
          quantity_unit={shoppingItem["quantity_unit"]}
          handleDeleteSubmit={handleDeleteSubmit}
        />
      );
    });
    return display;
  };

  const handleDeleteSubmit = (e, shoppingItemId, index) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/delete/${shoppingItemId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => {
        let temp = shoppingListData.slice();
        temp.splice(index, 1);
        setShoppingListData(temp);
      })
      .catch((error) => {
        console.log("===> Error deleting shopping item", error);
        alert("Error deleting shopping item");
      });
  };

  const handleNameChange = (e) => {
    setCurrentItem(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setCurrentQuantity(e.target.value);
  };
  const handleUnitChange = (e) => {
    setCurrentUnit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!!currentItem == false){
        return
    }
    let newShoppingItem = {
      item_name: currentItem,
      item_quantity: currentQuantity,
      quantity_unit: currentUnit,
      user_id: id,
    };
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newShoppingItem),
    })
      .then((response) => response.json())
      .then((data) => {
        let temp = shoppingListData.slice();
        temp.push(data["shopping_item"]);
        setShoppingListData(temp);
        setCurrentItem("")
      })
      .catch((error) => {
        console.log("===> Error creating shopping list item", error);
        alert("Error creating shopping list item");
      });
  };

  return (
    <div className={classes.shoppingListContainer}>
      <div class="columns">
        <div class="column has-text-centered">
          <h1 class="title" style={{ color: "#EBF2FA" }}>
            My Shopping List
          </h1>
          <br />
        </div>
      </div>
      <div className={classes.ingredientContainer}>
        <div>
          <h1>Add a new item</h1>
        </div>
        <div className={classes.ingredientRow}>
          <TextField
            className={classes.ingredientNameInput}
            variant="outlined"
            name="ingredient_name"
            onChange={handleNameChange}
            value={currentItem}
            placeholder="Name"
            size="small"
          ></TextField>

          <TextField
            className={classes.ingredientQuantityInput}
            variant="outlined"
            name="ingredient_quantity"
            onChange={handleQuantityChange}
            value={currentQuantity}
            placeholder="Quantity"
            type="number"
            size="small"
          ></TextField>

          <br />
          <Select
            name="quantity_unit"
            onChange={handleUnitChange}
            value={currentUnit}
            variant="outlined"
            className={classes.ingredientUnitSelect}
          >
            <MenuItem value="grams">grams</MenuItem>
            <MenuItem value="kilograms">kilograms</MenuItem>
            <MenuItem value="pound">pound</MenuItem>
            <MenuItem value="ounce">ounce</MenuItem>
            <MenuItem value="pound">teaspoon</MenuItem>
            <MenuItem value="tablespoon">tablespoon</MenuItem>
            <MenuItem value="cup">cup</MenuItem>
            <MenuItem value="liter">liter</MenuItem>
            <MenuItem value="fluid_oz">fluid_oz</MenuItem>
            <MenuItem value="ml">ml</MenuItem>
            <MenuItem value="gallon">gallon</MenuItem>
            <MenuItem value="serving">serving</MenuItem>
            <MenuItem value="unit">unit</MenuItem>
          </Select>

          <br />
          <CustomButton text="Add" onClick={handleSubmit}></CustomButton>
        </div>
      </div>
      <div style={{width: "100%"}}>
        <div id="app">
            <div class="card large" id="card-large">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p
                      class="title is-4 no-padding"
                      style={{ color: "#0d6efd" }}
                    >
                      Shopping List Items
                    </p>

                    <ul>
                      {shoppingListData
                        ? displayShoppingItems(shoppingListData)
                        : null}
                    </ul>
                  </div>
                </div>
                <div class="content"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
