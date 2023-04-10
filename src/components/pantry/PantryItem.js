import React, { useState } from "react";
import CustomButton from "../shared/Button";
import { createStyles, makeStyles, IconButton } from "@material-ui/core";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from '@mui/material/Tooltip';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pantryRowContainer: {
        border: "1px solid black",
        display:"flex", 
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "5px", 


    }
  })
);
const PantryItem = (props) => {
  const {
    pantryId,
    index,
    item_name,
    in_stock,
    handleDeleteItemSubmit,
    pantry_category,
    handleStockSubmit,
  } = props;
  const classes = useStyles()

  const handleItemSubmit = (e) => {
    e.preventDefault();
    handleDeleteItemSubmit(e, pantry_category, pantryId, index);
  };

  return (
    <div class="pantry-item" class="pantry-item pantry-list">
      <div className={classes.pantryRowContainer}>

        <span>{item_name}</span>

        <div>
        <Tooltip title="Add to shopping list">
        <IconButton style={{paddingLeft:"7px", marginLeft:"7px"}} onClick={(e) => handleStockSubmit(e, pantryId, index)}>
          <ShoppingCartIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="Remove pantry item">
        <IconButton style={{paddingLeft:"7px", marginLeft:"7px"}} onClick={handleItemSubmit}>
          <RemoveCircleIcon />
        </IconButton>

        </Tooltip>

        </div>


        {/* <CustomButton text="Add to Shopping List" onClick={(e) => handleStockSubmit(e, pantryId, index)}></CustomButton> */}
        {/* <CustomButton text="Remove" onClick={handleItemSubmit}></CustomButton> */}
      </div>
      <br />
    </div>
  );
};

export default PantryItem;
