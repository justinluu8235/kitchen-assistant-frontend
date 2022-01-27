import React, { useState, useEffect } from 'react'
import PantryCategory from './PantryCategory'


const Pantry = (props) => {
    const [currentItem, setCurrentItem] = useState('')
    const [currentCategory, setCurrentCategory] = useState('')
    const [pantryData, setPantryData] = useState()
    const { REACT_APP_SERVER_URL } = process.env
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    // make a condition that compares exp and current time
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
    }

    useEffect(() => {

        if (user) {
            fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/${id}`)
                .then(response => response.json())
                .then((data) => {
                    console.log('return data', data);
                    setPantryData(data)
                });
        }

    }, [props])


    const handleNameChange = (e) => {
        setCurrentItem(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setCurrentCategory(e.target.value)
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


    const handleSubmit = (e) => {
        e.preventDefault();
        let newPantryItem = {
            item_name: currentItem,
            category_name: currentCategory,
            user_id: id,
        }
        console.log('new pantry item', newPantryItem);

        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/newPantryItem`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newPantryItem)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                // setNewRecipeID(data['recipe']['id'])
                // setRedirect(true);
            })
            .catch(error => {
                console.log('===> Error creating pantry item', error);
                alert('Error creating pantry item');
            });
    }

    const displayPantryCategories = (pantryData) => {
        if (pantryData) {
            let keyArr = Object.keys(pantryData)
            console.log('pantry data', pantryData)
            console.log('keys', keyArr)
            let display = keyArr.map((category, idx) => {
                let pantryItemList = pantryData[category]
                console.log('pantry list' , pantryItemList)
                return <PantryCategory key={idx} pantry_category={category} pantry_item_list={pantryItemList} />
            })
            return display;
        }

    }

    return (
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <h1 class="title" style={{ color: "#EBF2FA" }}>My Pantry</h1><br />
                </div>
            </div>
            <div class="add-pantry-item">
                <div>
                    <h1 class="new-item-text">Add a new item</h1>
                </div>

                <form onSubmit={handleSubmit}>


                    <label for="itemName">Item Name:</label>
                    <input type="text" name="itemName" value={currentItem} onChange={handleNameChange} />

                    <label for="categoryName">Category Name:</label>
                    <input type="text" name="categoryName" value={currentCategory} onChange={handleCategoryChange} />

                    <input type="submit" />
                </form>

            </div>
            <div class="section">

                <div id="app" class="row columns is-multiline">

                    {pantryData ? displayPantryCategories(pantryData) : null}

                </div>
            </div>

        </div>
    )
}

export default Pantry