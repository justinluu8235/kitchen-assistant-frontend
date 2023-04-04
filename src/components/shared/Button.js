import React from 'react'
import { Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myButton: {
        fontSize: ".75rem",
        border: "1px solid black",
        
        width: "fit-content", 
    },
    defaultMargin: {
      margin: '10px',
    },
    defaultMaxHeight:{
      maxHeight: '25px', 
    }
  }),
);

const CustomButton = ({text, onClick, type, disabled, className, useDefaultMargin=true, useDefaultMaxHeight=true, size="small"}) => {
    
    const classes = useStyles()
    let allClasses = className ? [classes.myButton, className] : [classes.myButton]
    useDefaultMargin && allClasses.push(classes.defaultMargin)
    useDefaultMaxHeight && allClasses.push(classes.defaultMaxHeight)

    return (
        <Button className={allClasses.join(' ')} disabled={disabled} type={type} variant="contained" size={size} onClick={onClick}>{text}</Button>
    )
}

export default CustomButton