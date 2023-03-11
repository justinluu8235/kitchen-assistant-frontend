import React from 'react'
import { Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myButton: {
        fontSize: ".75rem",
        border: "1px solid black",
        maxHeight: '25px', 
    },
    defaultMargin: {
      margin: '10px',
    },
  }),
);

const CustomButton = ({text, onClick, type, disabled, className, useDefaultMargin=true}) => {
    
    const classes = useStyles()
    let allClasses = className ? [classes.myButton, className] : [classes.myButton]
    useDefaultMargin && allClasses.push(classes.defaultMargin)

    return (
        <Button className={allClasses.join(' ')} disabled={disabled} type={type} variant="contained" size="small" onClick={onClick}>{text}</Button>
    )
}

export default CustomButton