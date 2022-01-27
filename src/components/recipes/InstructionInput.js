import React from 'react';

const InstructionInput = (props) =>{
    const { step_number, instruction,  index, handleInstructionChange } = props

    return(
        
        <div class="new-recipe-step">
            <label for="instructions" class="instructions">Step {step_number}: </label>
            <textarea name="instructions" cols="50" rows="5" value={instruction} onChange={(e) => handleInstructionChange(index, e)}></textarea>
            <br />
        </div>
    )

}

export default InstructionInput