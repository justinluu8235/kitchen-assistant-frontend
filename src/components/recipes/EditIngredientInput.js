import React from 'react';

const EditIngredientInput = (props) => {
    const { name, quantity, unit, index, handleIngredientChange, handleDeleteIngredient} = props

    return (
        <div class="new-ingredient">
            <label for="ingredientName">Ingredient Name</label>
            <input type="text" name="ingredient_name" value={name} onChange={(e) => handleIngredientChange(index,e)} />
            <br />
            <label for="ingredientQuantity">Ingredient Quantity</label>
            <input type="text" value={quantity} name="ingredient_quantity" onChange={(e) => handleIngredientChange(index,e)} />
            <br />
            <label for="quantityUnit">Measurement Unit</label>
            <input type="text" value={unit} name="quantity_unit" onChange={(e) => handleIngredientChange(index,e)}/>

            <br />
            <label for="button"></label>
            <input type="button" name="button" value="Delete Ingredient" id="deleteIngredientButton" onClick={(e) => handleDeleteIngredient(index, e)}/>
            <br />
        </div>
    )

}

export default EditIngredientInput