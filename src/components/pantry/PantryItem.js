import React, {useState} from 'react'


const PantryItem = (props) => {
    const {pantryId, index, item_name, in_stock, handleDeleteSubmit, handleStockSubmit} = props;
 


    
    const handleItemSubmit =(e) => {
        handleDeleteSubmit(e, pantryId, index)
    }


    
    return (
        <div class="pantry-item" class="pantry-item">

            {item_name}

            <form
                onSubmit={(e) => handleStockSubmit(e, pantryId, index)}>

                <input type="submit"
                    value={in_stock ? "in stock" : "out of stock"}
                    id="stockButton" />
            </form>
            <form onSubmit={handleItemSubmit}>
                <input type="submit" value="Remove" class="remove-input" />
            </form>

            <br/>
        </div>
    )

}

export default PantryItem;