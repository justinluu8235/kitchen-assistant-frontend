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
  }),
);


const IngredientInput = (props) => {
    const classes = useStyles()
    const isLoading = useIsRecipeLoading()

    const { name, quantity, unit, index, handleIngredientChange } = props


    return (
        <div className={classes.ingredientRow}>
            <input className={classes.ingredientNameInput} type="text" name="ingredient_name" 
            disabled={isLoading} placeholder="Name" value={name} onChange={(e) => handleIngredientChange(index, e)} />
            <br />
            <input className={classes.ingredientQuantityInput} type="number" 
            disabled={isLoading} placeholder="Quantity" value={quantity} name="ingredient_quantity" onChange={(e) => handleIngredientChange(index, e)} />
            
            <br />
            <select class="dropdown-new-recipe" name="quantity_unit" id="cars" disabled={isLoading} 
            onChange={(e) => handleIngredientChange(index, e)}>
                <option value="grams">grams</option>
                <option value="kilograms">kilograms</option>
                <option value="pound">pound</option>
                <option value="ounce">ounce</option>
                <option value="teaspoon">teaspoon</option>
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
        </div>
    )


}

export default IngredientInput;