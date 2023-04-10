import React from "react";
import MenuCard from "./MenuCard";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuDayContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "15px"
    },
    dayText: {
        fontSize:"20px", 
        color: "#f18973",
        fontWeight: 500,
    }
  })
);

const MenuDay = ({ day, menuItems, handleDeleteSubmit, username}) => {
  const classes = useStyles();

  const sortMenuItemsByMeal = (items) => {
      const mealOrder = { "breakfast": 1, "lunch": 2, "dinner": 3 };
      
      items.sort((a, b) => {
        const mealA = mealOrder[a["meal_name"]] || 4; // assign a higher value to undefined meal_names
        const mealB = mealOrder[b["meal_name"]] || 4; // so they appear at the end
        
        return mealA - mealB;
      });
      
      return items;
    
  }
  return (
    <>
      <p className={classes.dayText}>{day}</p>

      <div className={classes.menuDayContainer}>
        {sortMenuItemsByMeal(menuItems).map((menuItem) => {
          return <MenuCard handleDeleteSubmit={handleDeleteSubmit} 
          username={username}
          menuItem={menuItem}></MenuCard>;
        })}
      </div>
    </>
  );
};

export default MenuDay;
