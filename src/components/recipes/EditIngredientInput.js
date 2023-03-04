import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useIsRecipeLoading } from './hooks';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ingredientRow: {
       display: 'flex',
       flexDirection: 'row',
       flexWrap: 'wrap',
       border: '1px solid black',
       borderRadius: '5px',
       marginTop: '10px',
       marginBottom: '5px',
       alignItems: 'center',
    },
    ingredientNameInput: {

      maxWidth: '200px',
      "&::placeholder": {
        color: "gray"
      },
    },
    ingredientQuantityInput: {
      maxWidth: '100px',
      "&::placeholder": {
        color: "gray"
      },
    },
    ingredientUnitDropdown: {
      height: '20px',
    },
  }),
);
const EditIngredientInput = (props) => {
    const classes = useStyles()
    const isLoading = useIsRecipeLoading()
    const { name, quantity, unit, index, handleIngredientChange, handleDeleteIngredient} = props

    return (
        <div className={classes.ingredientRow}>
            <input type="text" className={classes.ingredientNameInput} name="ingredient_name" disabled={isLoading} value={name} onChange={(e) => handleIngredientChange(index,e)} />
            <input type="number" className={classes.ingredientQuantityInput} disabled={isLoading} value={quantity} name="ingredient_quantity" onChange={(e) => handleIngredientChange(index,e)} />
            <select name="quantity_unit" className={classes.ingredientUnitDropdown} disabled={isLoading} value={unit} onChange={(e) => handleIngredientChange(index, e)}>
                <option value="grams">grams</option>
                <option value="kilograms">kilograms</option>
                <option value="pound">pound</option>
                <option value="ounce">ounce</option>
                <option value="pound">teaspoon</option>
                <option value="tablespoon">tablespoon</option>
                <option value="cup">cup</option>
                <option value="liter">liter</option>
                <option value="fluid_oz">fluid_oz</option>
                <option value="ml">ml</option>
                <option value="gallon">gallon</option>
                <option value="serving">serving</option>
                <option value="unit">unit</option>
            </select>
            <br />
            <label for="button"></label>
            <input type="button" name="button" value="Delete Ingredient" id="deleteIngredientButton" disabled={isLoading} onClick={(e) => handleDeleteIngredient(index, e)}/>
            <br />
        </div>
    )

}

export default EditIngredientInput