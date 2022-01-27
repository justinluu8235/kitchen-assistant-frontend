import React from 'react';

const EditIngredientInput = (props) => {
    const { step_number, instruction, index, handleInstructionChange, handleDeleteInstruction } = props
    console.log('instruction', instruction)

    return (
        <div class="new-recipe-step">
            <label for="instructions" class="instructions">Instructions</label>

            <textarea name="instructions" cols="50" rows="5" value={instruction} onChange={(e) => handleInstructionChange(index, e)}></textarea>

            <label for="button"></label>
            <input type="button" name="button" value="Delete Step" id="deleteRecipeStepButton" onClick={(e) => handleDeleteInstruction(index, e)}/>
            <br />
        </div>
    )

}

export default EditIngredientInput