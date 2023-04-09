import React from "react";
import { createStyles, makeStyles, IconButton } from "@material-ui/core";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ShoppingItem = (props) => {
  const {
    ingredient_quantity,
    item_name,
    quantity_unit,
    handleDeleteSubmit,
    shoppingItemId,
    index,
  } = props;

  return (
    <div>
      <IconButton
        onClick={(e) => {
          handleDeleteSubmit(e, shoppingItemId, index);
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
      <span>{`${item_name}, ${ingredient_quantity} ${quantity_unit}`}</span>
    </div>
  );
};

export default ShoppingItem;
