import React from 'react';


const IngredientInput = (props) => {

    const { name, quantity, unit, index, handleIngredientChange } = props


    return (
        <div class="new-ingredient">
            <label for="ingredientName"><p>Ingredient Name</p></label>
            <input type="text" name="ingredient_name" value={name} onChange={(e) => handleIngredientChange(index, e)} />
            <br />
            <label for="ingredientQuantity"><p>Ingredient Quantity</p></label>
            <input type="number" value={quantity} name="ingredient_quantity" onChange={(e) => handleIngredientChange(index, e)} />
            
            <br />
            <label for="quantityUnit"><p>Measurement Unit</p></label>
            {/* <input type="text" value={unit} name="quantity_unit" onChange={(e) => handleIngredientChange(index, e)} /> */}
            <select class="dropdown-new-recipe" name="quantity_unit" id="cars" onChange={(e) => handleIngredientChange(index, e)}>
                <option value="grams">grams</option>
                <option value="kilograms">kilograms</option>
                <option value="pound">pound</option>
                <option value="ouce">ouce</option>
                <option value="pound">teaspoon</option>
                <option value="ouce">tablespoon</option>
                <option value="pound">cup</option>
                <option value="ouce">liter</option>
                <option value="pound">fluid_oz</option>
                <option value="ouce">ml</option>
                <option value="ouce">gallon</option>
                <option value="ouce">serving</option>
                <option value="ouce">unit</option>
            </select>
            <br />
        </div>
    )


}

export default IngredientInput;