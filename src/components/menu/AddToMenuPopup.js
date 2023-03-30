import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";

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
      zIndex: 999, // Add this line
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
    },
    "@media screen and (min-width: 768px)": {
      popupContent: {
        maxWidth: "50%",
      },
    },
  })
);

const AddToMenuPopup = ({ title, onClose, isOpen=true}) => {
    const classes = useStyles()
  

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
        <button onClick={onClose}>Close</button>
        
      </div>
    </div>
  );
};

export default AddToMenuPopup;
