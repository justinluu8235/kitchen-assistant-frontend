import React from 'react'
import { Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myButton: {
        fontSize: ".75rem",
        border: "1px solid black"
    },
  }),
);

const CustomButton = ({text, onClick, type, disabled }) => {
    
    const classes = useStyles()
    return (
        <Button className={classes.myButton} disabled={disabled} type={type} variant="contained" size="small" onClick={onClick}>{text}</Button>
    )
}

export default CustomButton