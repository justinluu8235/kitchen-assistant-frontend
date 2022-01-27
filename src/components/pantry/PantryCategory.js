import React from 'react'
import PantryItem from './PantryItem'


const PantryCategory = (props) => {
    const{pantry_category, pantry_item_list} = props

    const displayPantryItems = () => {
        console.log(pantry_item_list)
        let display = pantry_item_list.map((pantryItem, idx) => {
            return <PantryItem key={idx} in_stock={pantryItem['in_stock']}   item_name={pantryItem['item_name']}/> 
        })
        return display;
    }

    return (
        <div v-for="card in cardData" key="card.id" class="column is-4">
            <div class="card large">

                <div class="card-content">
                    <div class="media">

                        <div class="media-content">


                            <p class="title is-4 no-padding" id="category">
                                {pantry_category}
                            </p>
                            <br />

                            <PantryItem/>

                            {pantry_item_list ? displayPantryItems() : null}
                        </div>
                    </div>
                    <div class="content">


                    </div>
                </div>
            </div>
        </div>

    )

}


export default PantryCategory