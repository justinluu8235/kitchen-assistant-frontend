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
    },
    dayText: {
        fontSize:"20px", 
        color: "#f18973",
        fontWeight: 300,
    }
  })
);

const MenuDay = ({ day, menuItems, handleDeleteSubmit, username}) => {
  const classes = useStyles();
  return (
    <>
      <p className={classes.dayText}>{day}</p>

      <div className={classes.menuDayContainer}>
        {menuItems.map((menuItem) => {
          return <MenuCard handleDeleteSubmit={handleDeleteSubmit} 
          username={username}
          menuItem={menuItem}></MenuCard>;
        })}
      </div>
    </>
  );
};

export default MenuDay;
