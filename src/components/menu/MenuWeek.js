import React from 'react'
import MenuDay from './MenuDay'
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    weekTitle: {
        fontSize:"20px", 
        color: "var(--background)",
        fontWeight: 700,
    },

  }))

const MenuWeek = ({ weekStart, weekEnd, menuWeekObj, handleDeleteSubmit, username}) => {
    const classes = useStyles()
    const weekTitle = `Week of ${weekStart} - ${weekEnd}`
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]    

    
    
    return (
        <>
            <h1 className={classes.weekTitle}>{weekTitle}</h1>
            <div >
                {
                  daysOfWeek.map((day) => {

                    if(day in menuWeekObj){
                        return(<MenuDay 
                            day={day} 
                            menuItems={menuWeekObj[day]}
                            handleDeleteSubmit={handleDeleteSubmit}
                            username={username}
                            ></MenuDay>)
                    }
                  })  
                }
            </div>
        </>
    )
}

export default MenuWeek