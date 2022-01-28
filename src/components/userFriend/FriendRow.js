import React, {useState} from 'react'
import { Link, Navigate} from 'react-router-dom';

const FriendRow = (props) => {
    const {friend_name, friend_id, user_id,index, handleUnfriend} = props;
    const [redirect, setRedirect] = useState(false)

    const handleViewFriendRecipe = (e, friend_id) => {
        e.preventDefault()
        setRedirect(true)
    }

    if (redirect) return (<Navigate to={`/userFriends/recipes/${friend_id}`} />);
    return (

        <div class="list-item">
            <p class="pantry-item">
                <span class="title is-6">
                    - {friend_name}
                </span>
            </p>

            <form onSubmit={(e) => handleViewFriendRecipe(e, friend_id)}>
                <input type="submit" value="View Recipes" />
            </form>

            <form  onSubmit={(e) => handleUnfriend(e, friend_id, index)}>
                <input type="submit" value="Remove Friend" />
            </form>
        </div>
    )

}


export default FriendRow