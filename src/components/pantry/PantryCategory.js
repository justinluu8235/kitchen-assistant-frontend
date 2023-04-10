import React, { useEffect, useState } from "react";
import PantryItem from "./PantryItem";
import { createStyles, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pantryCategoryContainer: {
        minWidth: "300px", 
        backgroundColor: "var(--background)",
        padding:"10px",
        borderRadius: "10px",

    }
  })
);

const PantryCategory = (props) => {
    const classes = useStyles()
  const { pantry_category, pantry_item_list, handleDeleteItemSubmit} = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [pantryList, setPantryList] = useState(pantry_item_list);

  useEffect(()=> {
    setPantryList(pantry_item_list)

  }, [pantry_item_list])



  const handleStockSubmit = (e, pantryId, index) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    fetch(`${REACT_APP_SERVER_URL}/shoppinglist/pantry/edit/${pantryId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => {
        console.log("return data", data);

        let temp = pantryList.slice();
        temp[index]["in_stock"] = !temp[index]["in_stock"];

        setPantryList(temp);
      })
      .catch((error) => {
        console.log("===> Error updating pantry item", error);
        alert("Error updating pantry item");
      });
  };
  return (
    <div >
      {pantryList.length > 0 && (
              <div className={classes.pantryCategoryContainer}>
                <p class="title is-4 no-padding" id="category">
                  {pantry_category}
                </p>
                <br />
                {pantry_item_list &&
                  pantryList.map((pantryItem, idx) => {
                    return (
                      <PantryItem
                        key={idx}
                        index={idx}
                        handleStockSubmit={handleStockSubmit}
                        handleDeleteItemSubmit={handleDeleteItemSubmit}
                        pantryId={pantryItem["id"]}
                        in_stock={pantryItem["in_stock"]}
                        item_name={pantryItem["item_name"]}
                        pantry_category={pantry_category}
                      />
                    );
                  })}
              </div>
      )}
    </div>
  );
};

export default PantryCategory;
