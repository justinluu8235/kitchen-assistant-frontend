import React from 'react';
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
        position:"relative",
        height: "200px", 
        width: "150px", 

    },
    banner: {
        height: "30px", 
        width: "100%",
        position: "absolute", 
        backgroundColor: ({meal}) => {
            return meal === 'breakfast' ? "#f18973" : meal === 'lunch' ? "#b1cbbb" : "#4040a1"
        },
        color: "white", 
        textAlign: "center", 
        top: 0,
    }, 
    recipeNameContainer: {
        position: "absolute", 
        bottom:0,
        left: 0,
        color: "yellow",
        fontWeight: "800"
    }

  })
);
const MenuCard = ({recipe}) => {
    const classes = useStyles({"meal": recipe["meal_name"]})
    console.log('menu card recipes', recipe)
    return (
        <>
            <div className={classes.imageContainer} >
                <img src={recipe["image"]} />
                <div className={classes.banner}>{recipe["meal_name"]}</div>
                <div className={classes.recipeNameContainer}>{recipe["recipe_name"]}</div>
            </div>
        </>
    )

}

export default MenuCard