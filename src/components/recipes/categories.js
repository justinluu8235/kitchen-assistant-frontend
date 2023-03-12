import React, { useState, useEffect } from "react";
import { useIsRecipeLoading } from "./hooks";
import { createStyles, makeStyles } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import CustomButton from "../shared/Button";
import {Select, MenuItem } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categoryInputRow: {
      display: "flex", 
      flexDirection: "row", 
      alignItems: "center", 
      flexWrap: "wrap", 
      gap: "10px",
    }, 
    categoryInput: {
      maxWidth: "200px",
      "&::placeholder": {
        color: "gray",
      },
      margin: '0px'
    },
    categoryChips: {
      border: "1px solid black",
      marginRight: "5px",
      marginBottom: "10px"
    },
    categorySelect: {
      maxHeight: "30px",
      backgroundColor: "#EBF2FA",
      borderRadius:"5px",
    }
  })
);

const RecipeCategories = ({
  availableCategories,
  categories,
  handleAddCategory,
  handleCategorySelect,
  handleDeleteCategory,
  onlyShowDropdown=false,
  selectPlaceholderText="Select a category"
}) => {
  const classes = useStyles();
  const isLoading = useIsRecipeLoading();
  const [categoryInput, setCategoryInput] = useState("");
  const [allowNewCategory, setAllowNewCategory] = useState(false);

  const handleCategoryInputChange = (e) => {
    const validationRegex = /^[A-Za-z]+$/;
    if (e.target.value.match(validationRegex)) {
      setCategoryInput(e.target.value);
    }
  };

  return (
    <div >
      {categories &&
        categories.map((category) => {
          return (
            <Chip
              disabled={isLoading}
              size="small"
              className={classes.categoryChips}
              label={category}
              onClick={() => handleDeleteCategory(category)}
              onDelete={() => handleDeleteCategory(category)}
            />
          );
        })}
      <br />
      <div className={classes.categoryInputRow}>
      <Select         
        onChange={handleCategorySelect}
        disabled={isLoading}
        value="start"
        variant="outlined"
        className={classes.categorySelect}
        >
          <MenuItem value="start">{selectPlaceholderText}</MenuItem>
        {availableCategories &&
          availableCategories.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}      
      </Select>
 
      {!onlyShowDropdown && (
        
        allowNewCategory ? (
        <>
          <label> OR </label>
          <input
            type="text"
            name="categoryName"
            placeholder="New Category"
            className={classes.categoryInput}
            disabled={isLoading}
            value={categoryInput}
            onChange={handleCategoryInputChange}
            pattern="[a-zA-Z]+"
          />

          <CustomButton
            disabled={isLoading}
            onClick={() => {
              handleAddCategory(categoryInput);
              setCategoryInput("");
            }}
            text={"Add"}
          />
        </>
      ) : (
        <>
          <label> OR </label>
          <CustomButton
          text="Add new category"
          onClick={() => {
            setAllowNewCategory(true);
          }}
        ></CustomButton>
        </>

      
      ))}
      </div>
    </div>
  );
};

export default RecipeCategories;
