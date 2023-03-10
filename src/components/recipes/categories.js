import React, { useState, useEffect} from "react";
import { useIsRecipeLoading } from "./hooks";
import { createStyles, makeStyles } from '@material-ui/core';
import { Chip } from '@material-ui/core'
import CustomButton from '../shared/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categoryInput: {
      maxWidth: '200px',
      "&::placeholder": {
        color: "gray"
      },
    },
    categoryChips: {
        border: '1px solid black',
        marginRight: '5px',
    }
  }),
);

const RecipeCategories = ({ availableCategories, categories, handleAddCategory, handleCategorySelect, handleDeleteCategory}) => {
  const classes = useStyles()
  const isLoading = useIsRecipeLoading()
  const [categoryInput, setCategoryInput] = useState("")




const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value)
  }

  return (
    <>
      {
        categories && categories.map((category) => {
            return <Chip disabled={isLoading} size="small" className={classes.categoryChips} label={category} onDelete={() => handleDeleteCategory(category)} />
        })
      }
      <br/>
      <select
        // value={selectedOption}
        onChange={handleCategorySelect}
        disabled={isLoading}
      >
        <option value="">Select an category</option>
        {availableCategories &&
          availableCategories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select> 
      <label> OR </label>
      <input
        type="text"
        name="categoryName"
        placeholder="New Category"
        className={classes.categoryInput}
        disabled={isLoading}
        value={categoryInput}
        onChange={handleCategoryInputChange}
      />
      <CustomButton disabled={isLoading} onClick={() => {
        handleAddCategory(categoryInput)
        setCategoryInput("")
        }} text={"Add"}/>
    </>
  );
};

export default RecipeCategories;
