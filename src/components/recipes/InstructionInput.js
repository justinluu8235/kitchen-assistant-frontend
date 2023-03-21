import React from "react";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import { useIsRecipeLoading } from "./hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionContainer: {
      display: "flex",
      flexDirection: "row",
      border: "1px solid black",
      borderRadius: "5px",
      marginTop: "10px",
      marginBottom: "5px",
      padding: "10px",
    },
    instructionTextArea: {
      backgroundColor: "#e0e0e0", 
      flex: 2,
      minWidth: "200px",    
    },
  })
);

const InstructionInput = (props) => {
  const isLoading = useIsRecipeLoading();
  const classes = useStyles();
  const { step_number, instruction, index, handleInstructionChange } = props;

  return (
    <div className={classes.instructionContainer}>
      <TextField
        className={classes.instructionTextArea}
        variant="outlined"
        onChange={(e) => handleInstructionChange(index, e)}
        value={instruction}
        disabled={isLoading}
        multiline
        size="small"
      ></TextField>
    </div>
  );
};

export default InstructionInput;
