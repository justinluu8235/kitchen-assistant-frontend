import React from 'react';


const ShoppingItem = (props) => {
    const{ingredient_quantity, item_name, quantity_unit, handleDeleteSubmit, shoppingItemId, index} = props

    return (
        <div class="list-item">


            <p class="pantry-item">
                <span class="title is-6">
                    {`- ${item_name}, ${ingredient_quantity} ${quantity_unit}`}
                </span>
            </p>

            <form onSubmit={(e) => {handleDeleteSubmit(e, shoppingItemId, index)}}>
                <input type="submit" value="Remove" />
            </form>
        </div>
    )

}

export default ShoppingItem