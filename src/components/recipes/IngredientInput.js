import React from "react";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
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
      gap: "10px",
      alignItems: 'center',
    },
    ingredientNameInput: {
      backgroundColor: "#e0e0e0", 
      flex:2,
      minWidth: "150px",
    },
    ingredientQuantityInput: {
      backgroundColor: "#e0e0e0", 
      flex:1,
      minWidth: "60px",
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
      <TextField
        className={classes.ingredientNameInput}
        variant="outlined"
        name="ingredient_name"
        onChange={(e) => handleIngredientChange(index, e)}
        value={name}
        disabled={isLoading}
        placeholder="Name"
        size="small"
      ></TextField>

                  <TextField
        className={classes.ingredientQuantityInput}
        variant="outlined"
        name="ingredient_quantity"
        onChange={(e) => handleIngredientChange(index, e)}
        value={quantity}
        placeholder="Quantity"
        type="number"
        disabled={isLoading}
        size="small"
      ></TextField>

      <br />
      <Select
        name="quantity_unit"
        onChange={(e) => handleIngredientChange(index, e)}
        disabled={isLoading}
        value={unit}
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
    </div>
  );
};

export default IngredientInput;
