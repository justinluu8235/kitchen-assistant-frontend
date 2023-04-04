import React, {useState} from "react";
import { createStyles, makeStyles, TextField, ButtonGroup, Button} from "@material-ui/core";
import CustomButton from '../shared/Button'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popup: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease-in-out",
      opacity: 0,
      pointerEvents: "none",
      zIndex: 999, 
    },
    open: {
      opacity: 1,
      pointerEvents: "auto",
    },
    closed: {
      opacity: 0,
      pointerEvents: "none",
    },
    popupContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
      maxWidth: "90%",
      maxHeight: "90%",
      overflow: "auto",
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      gap:"10px",

    },
    "@media screen and (min-width: 768px)": {
      popupContent: {
        maxWidth: "50%",
      },
    },
  })
);

const AddToMenuPopup = ({ title, onClose, index, recipe_id, handleDateChange, handleMenuSubmit, isOpen=true}) => {
    const classes = useStyles()
    const [meal, setMeal] = useState("breakfast")
    const [note, setNote] = useState("")


  return (
    <div
      className={`${classes.popup} ${isOpen ? classes.open : classes.closed}`}
      onClick={onClose}
    >
      <div
        className={classes.popupContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <TextField size="small" type="date" variant="outlined" onChange={(e) => handleDateChange(e, index)}/>
        <ButtonGroup size="large" variant="outlined" aria-label="outlined button group">
          <Button variant={meal === "breakfast" ? "contained" : "outlined"} onClick={() => {setMeal("breakfast")}}>Breakfast</Button>
          <Button variant={meal === "lunch" ? "contained" : "outlined"} onClick={() => {setMeal("lunch")}}>Lunch</Button>
          <Button variant={meal === "dinner" ? "contained" : "outlined"} onClick={() => {setMeal("dinner")}}>Dinner</Button>
        </ButtonGroup>
        <TextField size="small" variant="outlined" label="Note" helperText="Optional" onChange={(e) => {setNote(e.target.value)}}>{note}</TextField>

        <div>
        <CustomButton text="Add" onClick={(e) => {
          handleMenuSubmit(e,recipe_id, index, meal, note);
          onClose()
        }}></CustomButton>
        <CustomButton text="Close" onClick={onClose}></CustomButton>


        </div>

      </div>
    </div>
  );
};

export default AddToMenuPopup;
