import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { useIsRecipeLoading } from "./hooks";
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
      padding: '5px',
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
    ingredientUnitSelect: {
      maxHeight: '30px',
    }
  })
);

const IngredientInput = (props) => {
  const classes = useStyles();
  const isLoading = useIsRecipeLoading();

  const { name, quantity, unit, index, handleIngredientChange } = props;

  return (
    <div className={classes.ingredientRow}>
      <input
        className={classes.ingredientNameInput}
        type="text"
        name="ingredient_name"
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => handleIngredientChange(index, e)}
      />
      <br />
      <input
        className={classes.ingredientQuantityInput}
        type="number"
        disabled={isLoading}
        placeholder="Quantity"
        value={quantity}
        name="ingredient_quantity"
        onChange={(e) => handleIngredientChange(index, e)}
      />

      <br />
      <Select
        name="quantity_unit"
        onChange={(e) => handleIngredientChange(index, e)}
        disabled={isLoading}
        value={unit}
        variant="filled"
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
    </div>
  );
};

export default IngredientInput;
