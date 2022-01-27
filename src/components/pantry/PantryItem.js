import React from 'react'


const PantryItem = (props) => {
    const {item_name, in_stock} = props;


    return (
        <div class="pantry-item" class="pantry-item">

            {item_name}

            <form
                action="/pantry/<%=pantryItem.id%>/?_method=PUT"
                method="POST">

                <input type="submit"
                    value="<%=inStockString%>"
                    id="stockButton" />
            </form>
            <form
                action="/pantry/<%=pantryItem.id%>/?_method=DELETE"
                method="POST">
                <input type="submit" value="Remove" class="remove-input" />
            </form>


        </div>
    )

}

export default PantryItem;