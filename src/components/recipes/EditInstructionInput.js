import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionTextArea: {
      maxWidth: '90%',
    },
  }),
);

const EditIngredientInput = (props) => {
    const classes = useStyles();
    const { step_number, instruction, index, handleInstructionChange, handleDeleteInstruction } = props
    console.log('instruction', instruction)

    return (
        <div class="new-recipe-step">
            <label for="instructions" class="instructions">Instructions</label>

            <textarea className={classes.instructionTextArea} name="instructions" cols="50" rows="5" value={instruction} onChange={(e) => handleInstructionChange(index, e)}></textarea>

            <label for="button"></label>
            <input type="button" name="button" value="Delete Step" id="deleteRecipeStepButton" onClick={(e) => handleDeleteInstruction(index, e)}/>
            <br />
        </div>
    )

}

export default EditIngredientInput