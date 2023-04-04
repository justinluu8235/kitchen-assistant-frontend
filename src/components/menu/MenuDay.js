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
  })
);

const MenuDay = ({ day, recipes }) => {
  const classes = useStyles();
  return (
    <>
      <p>{day}</p>

      <div className={classes.menuDayContainer}>
        {recipes.map((recipe) => {
          return <MenuCard recipe={recipe}></MenuCard>;
        })}
      </div>
    </>
  );
};

export default MenuDay;
