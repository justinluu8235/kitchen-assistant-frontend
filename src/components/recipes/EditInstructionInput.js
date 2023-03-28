import React from "react";
import { createStyles, makeStyles, TextField} from "@material-ui/core";
import { useIsRecipeLoading } from "./hooks";
import CustomButton from "../shared/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      border: "1px solid black",
      borderRadius: "5px",
      marginTop: "10px",
      marginBottom: "5px",
      padding: "10px",
    },
    instructionInput: {
      backgroundColor: "#e0e0e0", 
      flex: 2,
      minWidth: "200px",
    },
    deleteInstructionButton: {
      maxHeight: "24px",
      border: "1px solid black",
      padding: "2px",
    },
  })
);

const EditIngredientInput = (props) => {
  const isLoading = useIsRecipeLoading();
  const classes = useStyles();
  const {
    step_number,
    instruction,
    index,
    handleInstructionChange,
    handleDeleteInstruction,
  } = props;

  return (
    <div className={classes.instructionContainer}>
      <TextField
        className={classes.instructionInput}
        variant="outlined"
        onChange={(e) => handleInstructionChange(index, e)}
        value={instruction}
        disabled={isLoading}
        multiline
        size="small"
      ></TextField>

      <label for="button"></label>
      <CustomButton
        id="deleteRecipeStepButton"
        className={classes.deleteInstructionButton}
        disabled={isLoading}
        text="Delete Step"
        onClick={(e) => handleDeleteInstruction(index, e)}
      ></CustomButton>
      <br />
    </div>
  );
};

export default EditIngredientInput;
