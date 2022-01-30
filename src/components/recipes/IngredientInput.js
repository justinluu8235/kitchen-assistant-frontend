import React from 'react';


const IngredientInput = (props) => {

    const { name, quantity, unit, index, handleIngredientChange } = props


    return (
        <div class="new-ingredient">
            <label for="ingredientName"><p>Ingredient Name</p></label>
            <input type="text" name="ingredient_name" value={name} onChange={(e) => handleIngredientChange(index,e)}/>
            <br />
            <label for="ingredientQuantity"><p>Ingredient Quantity</p></label>
            <input type="text" value={quantity} name="ingredient_quantity" onChange={(e) => handleIngredientChange(index,e)}/>
            <br />
            <label for="quantityUnit"><p>Measurement Unit</p></label>
            <input type="text" value={unit} name="quantity_unit" onChange={(e) => handleIngredientChange(index,e)}/>
            <br />
        </div>
    )


}

export default IngredientInput;