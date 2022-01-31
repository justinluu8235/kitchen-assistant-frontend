import React, { useState, useEffect } from 'react'
import './ShoppingList.css'
import ShoppingItem from './ShoppingItem'

const ShoppingList = (props) => {
    const [currentItem, setCurrentItem] = useState('')
    const [currentQuantity, setCurrentQuantity] = useState(0) 
    const [currentUnit, setCurrentUnit] = useState('')
    const [shoppingListData, setShoppingListData] = useState()
    const { REACT_APP_SERVER_URL } = process.env
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
        window.location.href = '/login';
    }



    useEffect(() => {
        if (user) {
            fetch(`${REACT_APP_SERVER_URL}/shoppinglist/${id}`)
                .then(response => response.json())
                .then((data) => {
                    console.log('return data', data);
                    setShoppingListData(data['shopping_list'])
                });
        }
    }, [props])

    const displayShoppingItems = (shoppingListData) => {
        
        let display = shoppingListData.map((shoppingItem, idx) => {

            return <ShoppingItem key={idx} index={idx}  shoppingItemId={shoppingItem['id']} 
                                ingredient_quantity={shoppingItem['ingredient_quantity']}  
                                item_name={shoppingItem['item_name']} 
                                 quantity_unit={shoppingItem['quantity_unit']}
                                 handleDeleteSubmit={handleDeleteSubmit}/> 
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


    const handleDeleteSubmit = (e, shoppingItemId, index) =>{
        e.preventDefault();

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/delete/${shoppingItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        .then((data) => {
            console.log('return data', data)
            let temp = shoppingListData.slice()
            temp.splice(index, 1);
            setShoppingListData(temp);
        })
        .catch(error => {
            console.log('===> Error deleting shopping item', error);
            alert('Error deleting shopping item');
        });

    }


    const handleNameChange = (e) => {
        setCurrentItem(e.target.value)
    }
    const handleQuantityChange = (e) => {
        setCurrentQuantity(e.target.value)
    }
    const handleUnitChange = (e) => {
        setCurrentUnit(e.target.value)
    }


    




    const handleSubmit = (e) => {
        e.preventDefault();
        let newShoppingItem = {
            item_name: currentItem,
            item_quantity: currentQuantity,
            quantity_unit: currentUnit,
            user_id: id,
        }
        console.log('new shopping item', newShoppingItem);

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newShoppingItem)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('creation return data', data)
                let temp = shoppingListData.slice()
                temp.push(data['shopping_item']);
                setShoppingListData(temp);
                
                setCurrentItem('')
                setCurrentQuantity(0)
                setCurrentUnit('')
                
            })
            .catch(error => {
                console.log('===> Error creating pantry item', error);
                alert('Error creating pantry item');
            });
    }

    return (
        <div class="container shopping-list">
            <div class="columns">
                <div class="column has-text-centered">
                    <h1 class="title" style={{ color: "#EBF2FA" }}>My Shopping List</h1><br />
                </div>
            </div>
            <div class="add-pantry-item shopping-list">
                <div><h1 class="new-item-text shopping-list">Add a new item</h1></div>
                <div class='input-container shopping-list'>
                <form class='input-container shopping-list' onSubmit={handleSubmit}>
                    <div>
                    <label for="shoppingListItem">Item Name:</label>
                    <input type="text" name="shoppingListItem" value={currentItem} onChange={handleNameChange}/>
                    </div>
                    <div>
                    <label for="ingredientQuantity">Quantity:</label>
                    <input type="number" name="ingredientQuantity" value={currentQuantity} onChange={handleQuantityChange} />
                    </div>
                    <div>
                    <label for="quantityUnit">Unit:</label>
                    <input type="text" name="quantityUnit" value={currentUnit} onChange={handleUnitChange}/>
                    </div>
                    <br></br>
                    <input type="submit" />
                </form>
                </div>
            </div>
            <div class="section">
                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4" id="shopping-list-column" >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding" style={{color:"#0d6efd"}}>Shopping List Items</p>

                                        <ul>
                                            {shoppingListData ? displayShoppingItems(shoppingListData) : null}
                                        </ul>
                                    </div>
                                </div>
                                <div class="content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default ShoppingList