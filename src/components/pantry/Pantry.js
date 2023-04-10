import React, { useState, useEffect } from "react";
import PantryCategory from "./PantryCategory";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import CustomButton from "../shared/Button";
import "./Pantry.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addItemContainer: {
    
      backgroundColor: "var(--background)",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid black",
    },
    "@media screen and (max-width: 500px)": {
        addItemContainer: {
          width: "90%",
        },
    },
    pantryCategorySelect: {
        maxHeight: "30px",
      },
      pantrySectionContainer: {
        margin: "15px auto", 
        display: "flex",
        flexDirection: "row", 
        flexWrap: "wrap",
        justifyContent:"center",
        gap:"15px",
        width: "90%",
      },

  })
);

const Pantry = (props) => {
  const classes = useStyles();
  const [currentItem, setCurrentItem] = useState("");
  const [currentCategory, setCurrentCategory] = useState("fridge/freezer");
  const [pantryData, setPantryData] = useState();
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
      fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/${id}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("return data", data);
          setPantryData(data);
        });
    }
  }, [props]);

  const handleNameChange = (e) => {
    setCurrentItem(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };


  const handleSubmit = (e) => {

    e.preventDefault();
    if (currentItem === "" || currentItem === undefined){
        return
    }
    let newPantryItem = {
      item_name: currentItem,
      category_name: currentCategory,
      user_id: id,
    };
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/newPantryItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newPantryItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data", data);
        // setNewRecipeID(data['recipe']['id'])
        // setRedirect(true);
        let category = data["pantry_category"]["category_name"];
        let temp = { ...pantryData };
        if (temp[category] == undefined) {
          temp[category] = [data["pantry_item"]];
        } else {
          temp[category].push(data["pantry_item"]);
        }
        setPantryData(temp);
        setCurrentItem("");
        setCurrentCategory("fridge/freezer");
      })
      .catch((error) => {
        console.log("===> Error creating pantry item", error);
        alert("Error creating pantry item");
      });
  };

  const handleDeleteItemSubmit = (e, pantry_category, pantryId, index) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/delete/${pantryId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => {
        console.log("return data", data);
        let tempList = pantryData[pantry_category].slice();
        tempList.splice(index, 1);
        console.log('temo list', tempList)
        let tempObj = {...pantryData}
        tempObj[pantry_category] = tempList
        setPantryData(tempObj)
      })
      .catch((error) => {
        console.log("===> Error deleting pantry item", error);
        alert("Error deleting pantry item");
      });
  };


  return (
    <div class="container">
      <div class="header-wrapper pantry-list">
        <div class="columns">
          <div class="column has-text-centered">
            <h1 class="title" style={{ color: "#EBF2FA" }}>
              My Pantry
            </h1>
            <br />
          </div>
        </div>
        <div className={classes.addItemContainer}>
          <div>
            <h1>Add a new item</h1>
          </div>
          <div>
            <TextField
              variant="outlined"
              value={currentItem}
              onChange={handleNameChange}
              placeholder="Pantry Item"
              size="small"
            ></TextField>

            <Select
              name="quantity_unit"
              onChange={handleCategoryChange}
              value={currentCategory}
              variant="outlined"
              className={classes.pantryCategorySelect}
            >
              <MenuItem value="fridge/freezer">fridge/freezer</MenuItem>
              <MenuItem value="spices">spices</MenuItem>
              <MenuItem value="sauces/oils">sauces/oils</MenuItem>
              <MenuItem value="grains/noodles">grains/noodles</MenuItem>
              <MenuItem value="other">other</MenuItem>
            </Select>
            <CustomButton onClick={handleSubmit} text="Add"></CustomButton>

          </div>
        </div>
      </div>
      <div className={classes.pantrySectionContainer}>
          {pantryData && Object.keys(pantryData).map((category, idx) => {
            return (
                <PantryCategory
                  key={idx}
                  pantry_category={category}
                  pantry_item_list={pantryData[category]}
                  handleDeleteItemSubmit={handleDeleteItemSubmit}
                />
              );
            })}


      </div>
    </div>
  );
};

export default Pantry;
