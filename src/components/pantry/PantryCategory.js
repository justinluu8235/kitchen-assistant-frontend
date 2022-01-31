import React, {useState} from 'react'
import PantryItem from './PantryItem'


const PantryCategory = (props) => {
    const{pantry_category, pantry_item_list} = props
    const {REACT_APP_SERVER_URL} = process.env
    const [pantryList, setPantryList] = useState(pantry_item_list);

    const displayPantryItems = (pantryList) => {

        let display = pantryList.map((pantryItem, idx) => {

            return <PantryItem key={idx} index={idx} handleStockSubmit={handleStockSubmit} handleDeleteSubmit={handleDeleteSubmit} pantryId={pantryItem['id']} in_stock={pantryItem['in_stock']}   item_name={pantryItem['item_name']}/> 
        })
        return display;
    }

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleStockSubmit = (e, pantryId, index) => {

        e.preventDefault();

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/edit/${pantryId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        .then((data) => {
            console.log('return data', data)

            let temp = pantryList.slice()
            temp[index]['in_stock'] = !temp[index]['in_stock']
            
            setPantryList(temp);
        })
        .catch(error => {
            console.log('===> Error updating pantry item', error);
            alert('Error updating pantry item');
        });
    }

    const handleDeleteSubmit = (e, pantryId, index) =>{
        e.preventDefault();

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/delete/${pantryId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        .then((data) => {
            console.log('return data', data)
            let temp = pantryList.slice()
            temp.splice(index, 1);
            setPantryList(temp);
        })
        .catch(error => {
            console.log('===> Error deleting pantry item', error);
            alert('Error deleting pantry item');
        });

    }

    return (
        <div v-for="card in cardData" key="card.id" class="column is-4 pantry-list">
            <div class="card large">

                <div class="card-content">
                    <div class="media">

                        <div class="media-content pantry-list">


                            <p class="title is-4 no-padding" id="category">
                                {pantry_category}
                            </p>
                            <br />


                            {pantry_item_list ? displayPantryItems(pantryList) : null}
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