import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { useIsRecipeLoading } from "./hooks";
import CustomButton from "../shared/Button";
import {Select, MenuItem } from "@material-ui/core"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ingredientRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      border: "1px solid black",
      borderRadius: "5px",
      marginTop: "10px",
      marginBottom: "5px",
      alignItems: "center",
      padding:'5px',
    },
    ingredientNameInput: {
      maxWidth: "200px",
      "&::placeholder": {
        color: "gray",
      },
    },
    ingredientQuantityInput: {
      maxWidth: "100px",
      "&::placeholder": {
        color: "gray",
      },
    },
    ingredientUnitDropdown: {
      height: "30px",
    },
  })
);
const EditIngredientInput = (props) => {
  const classes = useStyles();
  const isLoading = useIsRecipeLoading();
  const {
    name,
    quantity,
    unit,
    index,
    handleIngredientChange,
    handleDeleteIngredient,
  } = props;
  return (
    <div className={classes.ingredientRow}>
      <input
        type="text"
        className={classes.ingredientNameInput}
        name="ingredient_name"
        disabled={isLoading}
        value={name}
        onChange={(e) => handleIngredientChange(index, e)}
      />
      <input
        type="number"
        className={classes.ingredientQuantityInput}
        disabled={isLoading}
        value={quantity}
        name="ingredient_quantity"
        onChange={(e) => handleIngredientChange(index, e)}
      />
      <Select
        name="quantity_unit"
        onChange={(e) => handleIngredientChange(index, e)}
        disabled={isLoading}
        value={unit}
        variant="filled"
        className={classes.ingredientUnitDropdown}
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
      <label for="button"></label>
      <CustomButton
        text="Delete Ingredient"
        disabled={isLoading}
        onClick={(e) => handleDeleteIngredient(index, e)}
      ></CustomButton>
      <br />
    </div>
  );
};

export default EditIngredientInput;
