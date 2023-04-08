import React, {useState} from 'react'
import { Link, Navigate} from 'react-router-dom';
import { createStyles, makeStyles } from "@material-ui/core";
import CustomButton from "../shared/Button"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    friendRowContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "10px",
      border: "1px solid black",
      padding: "10px",
    },
  })
);

const FriendRow = (props) => {
    const {friend_name, friend_id, user_id,index, handleUnfriend} = props;
    const [redirect, setRedirect] = useState(false)
    const classes = useStyles()

    const handleViewFriendRecipe = (e, friend_id) => {
        e.preventDefault()
        setRedirect(true)
    }

    if (redirect) return (<Navigate to={`/userFriends/recipes/${friend_id}`} />);
    return (

        <div className={classes.friendRowContainer}>
            <div><p class="pantry-item">{friend_name}</p></div>
            <div><CustomButton text="View Recipes" useDefaultMargin={false} onClick={(e) => handleViewFriendRecipe(e, friend_id)}></CustomButton>
            <CustomButton text="Remove Friend" useDefaultMargin={false} onClick={(e) => handleUnfriend(e, friend_id, index)}></CustomButton></div>
        </div>
    )

}


export default FriendRow