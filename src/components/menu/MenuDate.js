import React, {useState} from 'react';
import MenuItem from './MenuItem';

const MenuDate = (props) => {
    const {dayOfWeek, menuArr, date, username, user_id} = props
    const  [menuList, setMenuList] = useState(menuArr)
    const {REACT_APP_SERVER_URL} = process.env

    const displayMenuItems = (menuList) => {

        let display = menuList.map((menuItem, idx) => {

            return <MenuItem key={idx} index={idx} 
                         menuId={menuItem['id']} 
                         requester_username={menuItem['requester_username']}   
                         image={menuItem['image']}
                         recipe_name={menuItem['recipe_name']}
                         recipeId={menuItem['recipe']}
                         username={username}
                         handleDeleteSubmit={handleDeleteSubmit}
                         user_id={user_id}
                         />
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
    const handleDeleteSubmit = (e, menuId, index) =>{
        e.preventDefault();
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/menu/delete/${menuId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token,  // Include the JWT token in the request headers
            },
        })
        .then((data) => {
            console.log('return data', data)
            let temp = menuList.slice()
            temp.splice(index, 1);
            setMenuList(temp);
        })
        .catch(error => {
            console.log('===> Error deleting menu item', error);
            alert('Error deleting menu item');
        });

    }

    return(
        <div class="section">
             {/* <% let dateArr = Object.keys(menu) %> 
          <% dateArr.sort(); %> 
          <% for(let i=0; i<dateArr.length; i++){ %> 
              <% let menuItemArr = menu[dateArr[i]] %>  */}
                <div class="columns">
                    <div class="column has-text-centered menu-column-text">
                        <h1 class="head-title menu-column-text" > {dayOfWeek}, {date} </h1><br />
                    </div>
                </div>
                <div id="app" class="row columns is-multiline">
                    {/* <% for(let i=0; i<menuItemArr.length;i++){ %> 
                  <% let recipe = menuItemArr[i] %>  */}
                    {menuArr ? displayMenuItems(menuList) : null}
                    {/* <% } %>  */}


                </div>
            </div>
    )

}

export default MenuDate