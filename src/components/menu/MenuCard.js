import React, { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  ButtonGroup,
  Button,
  TextField,
} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import CustomButton from "../shared/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      width: "160px",
      overflowX: "clip",
    },
    imageContainer: {
      position: "relative",
      height: "200px",
      width: "150px",
      border: "1px solid gold",
    },
    banner: {
      height: "30px",
      width: "100%",
      position: "absolute",
      backgroundColor: ({ meal }) => {
        return meal === "breakfast"
          ? "#ff7b25"
          : meal === "lunch"
          ? "#82b74b"
          : "#4040a1";
      },
      color: "white",
      textAlign: "center",
      top: 0,
    },
    recipeNameContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      color: "yellow",
      fontWeight: "800",
      backgroundColor: "var(--bg)",
      width: "fit-content",
    },
    modalContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      backgroundColor: "var(--background)",
      minWidth: "250px",
      padding: "10px",
    },
    cardImage: {
      paddingTop: "35px", // for banner
      width: "99%",
      height: "100%",
    },
    editContainer: {
        marginTop:"10px",
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        gap:"10px",
    },
    buttonContainer: {
        border: "1px solid black",
    }
  })
);
const MenuCard = ({
  menuItem,
  handleDeleteSubmit,
  username,
  refreshMenuData,
}) => {
  const classes = useStyles({ meal: menuItem["meal_name"] });
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState("");
  const { REACT_APP_SERVER_URL } = process.env;
  const friendRequestedUsername =
    username === menuItem["requester_username"]
      ? null
      : menuItem["requester_username"];

  useEffect(() => {
    setNote(menuItem["note"]);
    setMeal(menuItem["meal_name"]);
    setDate(menuItem["cook_date"]);
  }, [menuItem]);

  const generateShoppingList = (e, user_id, recipeId) => {
    e.preventDefault();
    let recipeInfo = {
      user_id: user_id,
      recipe_id: recipeId,
    };

    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/generate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(recipeInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(
          `ingredients for ${menuItem["recipe_name"]} has been added to your shopping list`
        );
      })
      .catch((error) => {
        console.log("===> Error creating pantry item", error);
        alert("Error creating pantry item");
      });
  };

  const updateMenuItem = () => {
    const updatedMenuObj = {
      menu_updated_note: note,
      updated_meal_name: meal,
      updated_date: date,
    };

    const token = localStorage.getItem("jwtToken");

    fetch(`${REACT_APP_SERVER_URL}/menu/update/${menuItem["id"]}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedMenuObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("return data", data);
        refreshMenuData(data["updated_menu_data"]);
      })
      .catch((error) => {
        console.log("===> Error updating menu item", error);
        alert("Error updating menu item");
      });
  };

  return (
    <div>
      <div className={classes.cardContainer}>
        <div
          className={classes.imageContainer}
          onClick={() => setModalOpen(true)}
        >
          <img
            className={classes.cardImage}
            src={
              menuItem["image"] ? menuItem["image"] : "/img/kitchen-icon.png"
            }
          />
          <div className={classes.banner}>{menuItem["meal_name"]}</div>
          <div className={classes.recipeNameContainer}>
            {menuItem["recipe_name"]}
          </div>
        </div>
        {!!menuItem["note"] && (
          <p style={{ color: "white" }}>{menuItem["note"]}</p>
        )}
        {friendRequestedUsername && (
          <p style={{ color: "red" }}>
            Requested by: {friendRequestedUsername}
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditMode(false);
        }}
      >
        <div className={classes.modalContainer}>
          <div className={classes.buttonContainer}>
            <CustomButton
              text="Remove from menu"
              onClick={(e) => {
                handleDeleteSubmit(e, menuItem["id"]);
                setModalOpen(false);
                setEditMode(false);
              }}
            ></CustomButton>
            <CustomButton
              text="Add to Shopping List"
              onClick={(e) => {
                generateShoppingList(e, menuItem["user"], menuItem["recipe"]);
                setModalOpen(false);
                setEditMode(false);
              }}
            ></CustomButton>
            <CustomButton
              text={<a href={`/recipes/${menuItem["recipe"]}`}>View Recipe</a>}
            ></CustomButton>
          </div>

          <div className={classes.editContainer}>
            {editMode ? (
                <>
                <TextField
                  value={date}
                  size="small"
                  type="date"
                  variant="outlined"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />

                <ButtonGroup
                  size="large"
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    variant="outlined"
                    style={meal === "breakfast" ? {backgroundColor: "#ff7b25"} : null}
                    onClick={() => {
                      setMeal("breakfast");
                    }}
                  >
                    Breakfast
                  </Button>
                  <Button
                    variant="outlined"
                    style={meal === "lunch" ? {backgroundColor: "#82b74b"} : null}

                    onClick={() => {
                      setMeal("lunch");
                    }}
                  >
                    Lunch
                  </Button>
                  <Button
                    variant="outlined"
                    style={meal === "dinner" ? {backgroundColor: "#4040a1"} : null}
                    onClick={() => {
                      setMeal("dinner");
                    }}
                  >
                    Dinner
                  </Button>
                </ButtonGroup>
                <TextField
                  size="small"
                  variant="outlined"
                  value={note}
                  helperText="Optional"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                ></TextField>
                <CustomButton
                  text="Update menu item"
                  onClick={() => {
                    updateMenuItem()
                    setModalOpen(false)
                    setEditMode(false);
                }}
                ></CustomButton>
                </>
            ) : (
              <CustomButton
                text="Edit Menu Item"
                onClick={() => {
                  setEditMode(true);
                }}
              ></CustomButton>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuCard;
