import React, {useState, useEffect} from 'react'
import MenuDate from './MenuDate';
import './Menu.css'

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

        if(user){
        fetch(`${REACT_APP_SERVER_URL}/menu/${id}`)
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data);
                setMenuData(data)
            });
        }

    }, [props])


    const displayMenu = (menuData) => {
        let keyArr = Object.keys(menuData)
            console.log('menu data', menuData)
            keyArr.sort()
            console.log('keys', keyArr)

            let display = keyArr.map((date, idx) => {           
                let menuArr = menuData[date]
                let dayOfWeek = new Date(date).getDay()
                dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek]
           
                return <MenuDate key={idx} dayOfWeek={dayOfWeek} menuArr={menuArr} date={date} user_id={id} username={username}/>
            })
            return display;

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