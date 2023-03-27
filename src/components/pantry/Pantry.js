import React, { useState, useEffect } from 'react'
import PantryCategory from './PantryCategory'
import './Pantry.css'


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
        window.location.href = '/login';
    }

    useEffect(() => {

        if (user) {
            const token = localStorage.getItem("jwtToken")
            fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/${id}`,{
                headers: {
                    "Authorization": token,
                }
            })
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
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/newPantryItem`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                "Authorization": token,
            },
            body: JSON.stringify(newPantryItem)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                // setNewRecipeID(data['recipe']['id'])
                // setRedirect(true);
                let category = data['pantry_category']['category_name']
                let temp = { ...pantryData }
                if (temp[category] == undefined) {
                    temp[category] = [data['pantry_item']]
                }
                else {
                    temp[category].push(data['pantry_item'])
                }
                setPantryData(temp)
                setCurrentItem('')
                setCurrentCategory('')

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
                console.log('pantry list', pantryItemList)
                return <PantryCategory key={idx} pantry_category={category} pantry_item_list={pantryItemList} />
            })
            return display;
        }

    }

    return (
        <div class="container">
            <div class="header-wrapper pantry-list">
                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title" style={{ color: "#EBF2FA" }}>My Pantry</h1><br />
                    </div>
                </div>
                <div class="add-pantry-item pantry-list">
                    <div>
                        <h1 class="new-item-text pantry-list">Add a new item</h1>
                    </div>
                    <div class='input-container pantry-list'>
                        <form  class='input-container pantry-list' onSubmit={handleSubmit}>
                            <div>
                                <label for="itemName">Item Name:</label>
                                <input type="text" name="itemName" value={currentItem} onChange={handleNameChange} />
                            </div>
                            <div>
                                <label for="categoryName">Category Name:</label>
                                <input type="text" name="categoryName" value={currentCategory} onChange={handleCategoryChange} />
                            </div>
                            <input type="submit" />
                        </form>
                    </div>

                </div>
            </div>
            <div class="section">

                <div id="app" class="row columns is-multiline pantry-list">

                    {pantryData ? displayPantryCategories(pantryData) : null}

                </div>
            </div>

        </div>
    )
}

export default Pantry