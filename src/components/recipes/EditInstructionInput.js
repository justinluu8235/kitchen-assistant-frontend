import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useIsRecipeLoading } from './hooks';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionContainer:{
      display: 'flex', 
      flexDirection: 'row', 
      border: '1px solid black', 
      borderRadius: '5px',
      marginTop: '10px', 
      marginBottom: '5px', 
      padding: '10px', 
    },
    instructionTextArea: {
      maxWidth: '90%',
    },
    deleteInstructionButton: {
      maxHeight: '24px', 
      border: '1px solid black', 
      padding: '2px',
    }
  }),
);

const EditIngredientInput = (props) => {
    const isLoading = useIsRecipeLoading()
    const classes = useStyles();
    const { step_number, instruction, index, handleInstructionChange, handleDeleteInstruction } = props
    console.log('instruction', instruction)

    return (
        <div className={classes.instructionContainer}>
            <label for="instructions" class="instructions">{index+1}. </label>

            <textarea className={classes.instructionTextArea} name="instructions"
             cols="50" rows="5" value={instruction} 
             onChange={(e) => handleInstructionChange(index, e)}
             disabled={isLoading}
             ></textarea>

            <label for="button"></label>
            <input type="button" className={classes.deleteInstructionButton} disabled={isLoading} value="Delete Step" id="deleteRecipeStepButton" onClick={(e) => handleDeleteInstruction(index, e)}/>
            <br />
        </div>
    )

}

export default EditIngredientInput