import React, { useEffect, useState } from 'react'
import FriendRow from './FriendRow';
import './UserFriend.css'


const UserFriend = (props) => {
    const [searchVal, setSearchVal] = useState()
    const { REACT_APP_SERVER_URL } = process.env
    const { handleLogout, user } = props;
    const { id, name, email, exp } = user;
    const [currentlyFriends, setCurrentlyFriends] = useState()
    const [requestPending, setRequestPending] = useState()
    const [userQueried, setUserQueried] = useState()
    const [friendData, setFriendData] = useState()
    const [friendRequestsReceived, setFriendRequestsReceived] = useState()
    const [friendRequestsSent, setFriendRequestsSent] = useState()
    const [friendList, setFriendList] = useState([])

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
            fetch(`${REACT_APP_SERVER_URL}/userFriends/${id}`, {
                headers: {
                    "Authorization": token,
                }
            })
                .then(response => response.json())
                .then((data) => {
                    console.log('return data', data);
                    setFriendData(data)
                    setFriendRequestsReceived(data['request_received_list'])
                    setFriendRequestsSent(data['request_pending_list'])
                    setFriendList(data['friend_list'])
                });
        }
    }, [props])

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

    const handleChange = (e) => {
        setSearchVal(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchFriend = {
            'search_username': searchVal,
            'user_id': id
        }
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/userFriends/search`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(searchFriend)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                if (data['friend_status'] == 404) {
                    alert('Username does not exist. Please try again')
                }
                else {
                    setCurrentlyFriends(data['friend_status']['currently_friends'])
                    setRequestPending(data['friend_status']['request_pending'])
                    setUserQueried(searchVal)
                }

            })
            .catch(error => {
                console.log('===> Error searching username', error);
                alert('Error searching username');
            });
    }
    const handleAcceptRequest = (e, requester_id, receiver_name, index) => {
        e.preventDefault();
        let acceptFriend = {
            'requester_id': requester_id,
            'receiver_name': receiver_name
        }
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/userFriends/accept`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(acceptFriend)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                let temp = friendRequestsReceived.slice()
                temp.splice(index, 1);
                setFriendRequestsReceived(temp);

                // let temp2 = friendList.slice()
                // temp2.push(data);
                // console.log('temp2', temp2)
                // setFriendList(temp2)

                setFriendList(friendList.concat([data['friend_status']]))


            })
            .catch(error => {
                console.log('===> Error searching username', error);
                alert('Error searching username');
            });

    }
    const displayRequestsReceived = (friendRequestsReceived) => {
        let display = friendRequestsReceived.map((requestRecieved, idx) => {
            return (
                <div key={idx} >
                    <form onSubmit={(e) => handleAcceptRequest(e, requestRecieved['user'], requestRecieved['friend_name'], idx)}>
                        <div class='userfriend-receive-row'>
                        <p>- {requestRecieved['username']}</p>
                        <input type="submit" value="Accept Request"></input>
                        </div>
                    </form>
                    <br />
                </div>
            )
        })
        return display;
    }

    const displayFriends = (friendList) => {
        let display;
        if (friendList.length != 0) {
            display = friendList.map((friend, idx) => {
                return <FriendRow key={idx} index={idx} user_id={id} friend_name={friend['friend_name']}
                    friend_id={friend['friend_id']}
                    handleUnfriend={handleUnfriend}

                />
            })
        }
        return display;
    }


    const handleUnfriend = (e, friend_id, index) => {
        e.preventDefault();
        let userInfo = {
            friend_id: friend_id,
            user_id: id,
        }
        console.log('user info', userInfo);
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/userFriends/delete`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(userInfo)
        })
            .then((data) => {
                console.log('return data', data)
                let temp = friendList.slice()
                temp.splice(index, 1);
                setFriendList(temp);
                alert("Friend Removed")
            })
            .catch(error => {
                console.log('===> Error deleting shopping item', error);
                alert('Error deleting shopping item');
            });

    }

    const handleSendFriendRequest = (e) => {
        e.preventDefault();
        let addFriend = {
            'friend_username': userQueried,
            'user_id': id
        }
        const token = localStorage.getItem("jwtToken")
        let csrftoken = getCookie('csrftoken');
        fetch(`${REACT_APP_SERVER_URL}/userFriends/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': token, 
            },
            body: JSON.stringify(addFriend)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                if (data['friend_status'] == 404) {
                    alert('Username does not exist. Please try again')
                }
                else {
                    alert(`Friend request sent to ${userQueried} !`)
                }

            })
            .catch(error => {
                console.log('===> Error searching username', error);
                alert('Error searching username');
            });
    }

    return (
        <div class="container">
            <div class='title-input-wrapper userfriend'>

                <div class="columns">
                    <div class="column has-text-centered">
                        <h1 class="title" style={{ color: "#EBF2FA" }}>My Friends</h1><br />
                    </div>
                </div>
                <div class="add-pantry-item userfriend">
                    <div class='search-container-userfriend'>
                        <form onSubmit={handleSubmit}>

                            <input type="text" name="query" class="search-bar "
                                placeholder="search for friends by username"
                                value={searchVal} onChange={handleChange} />

                            <input type="submit" class="search-submit" />

                        </form>
                    </div>
                    <div>
                        {currentlyFriends ? `${userQueried} is already your friend` :
                            requestPending ? `A friend request has already been sent to ${userQueried}` :
                                userQueried ?
                                    <div class='friend-found-container'>
                                        <p>User {userQueried} Found! </p>
                                        <form onSubmit={handleSendFriendRequest}>
                                            <input type="submit" value="Add Friend" />
                                        </form>
                                    </div>
                                    : null
                        }

                    </div>

                </div>
            </div>
            <div class="section">
                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4 userfriend"  >
                        <div class="card large" id="card-large">
                            <div class="card-content">
                                <div class="media userfriend">
                                    <div>
                                        <p class="title is-4 no-padding" style={{ color: "#0d6efd" }}>

                                            Friend Requests Received: </p>
                                      
                                        {friendRequestsReceived && friendRequestsReceived.length > 0 ? displayRequestsReceived(friendRequestsReceived) : <p>No friend requests received</p>}
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4 no-padding" style={{ color: "#0d6efd" }}>

                                            Friend List: </p>
                                        <ul>
                                            {friendList && friendList.length > 0? displayFriends(friendList) : <p>Currently no friends..</p>}
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

export default UserFriend;