import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useIsRecipeLoading } from './hooks';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionTextArea: {
      maxWidth: '90%',
    },
  }),
);

const InstructionInput = (props) =>{
  const isLoading = useIsRecipeLoading()

    const classes = useStyles();
    const { step_number, instruction,  index, handleInstructionChange } = props

    return(
        
        <div class="new-recipe-step">
            <label for="instructions" class="instructions">Step {step_number}: </label>
            <textarea className={classes.instructionTextArea} name="instructions" disabled={isLoading} cols="50" rows="5" value={instruction} onChange={(e) => handleInstructionChange(index, e)}></textarea>
            <br />
        </div>
    )

}

export default InstructionInput