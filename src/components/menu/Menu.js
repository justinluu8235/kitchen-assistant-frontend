import React, {useState, useEffect} from 'react'
import './Menu.css'
import MenuWeek from './MenuWeek'

const Menu = (props) => {

    const { handleLogout, user } = props;
    const { id, username, email, exp } = user;
    const [menuData, setMenuData] = useState() 



    const { REACT_APP_SERVER_URL } = process.env;
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
        handleLogout();

        alert('Session has ended. Please login to continue.');
        window.location.href = '/login';
    }

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        if(user){
        fetch(`${REACT_APP_SERVER_URL}/menu/index/${id}`,{
            headers: {
                'Content-type': 'application/json',
              'Authorization': `${token}`, // Include the JWT token in the request headers
            }
          })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data);
                setMenuData(data)
            });
        }

    }, [props])



    const displayMenu = (menuData) => {
        const weekStartsArr = Object.keys(menuData)
        weekStartsArr.sort()
        console.log('week starts', weekStartsArr)

        const menu = weekStartsArr.map((date, idx) => {
            return <MenuWeek key={idx} weekStart={date} 
            weekEnd={menuData[date]["week_end_date"]} 
            menuWeekObj={menuData[date]} 
            handleDeleteSubmit={handleDeleteSubmit}
            ></MenuWeek>
        })


        return menu
    }

    const handleDeleteSubmit = (e, menuId, index) =>{
        e.preventDefault();
        const token = localStorage.getItem("jwtToken")
        fetch(`${REACT_APP_SERVER_URL}/menu/delete/${menuId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,  // Include the JWT token in the request headers
            },
        })
        .then(response => response.json())
        .then((data) => {
            console.log('return data', data)
            setMenuData(data)
        })
        .catch(error => {
            console.log('===> Error deleting menu item', error);
            alert('Error deleting menu item');
        });

    }

    return (
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered menu-column-text">
                    <h1 class="title" style={{ color: "#EBF2FA" }}>My Menu</h1><br />
                </div>
            </div>
                {menuData ? displayMenu(menuData) : null}
        </div>
    )
}

export default Menu