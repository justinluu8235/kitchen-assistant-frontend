import React from 'react'
import MenuDay from './MenuDay'

const MenuWeek = ({ weekStart, weekEnd, menuWeekObj}) => {
    const weekTitle = `Week of ${weekStart} - ${weekEnd}`
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]    

    
    
    return (
        <>
            <h1>{weekTitle}</h1>
            <div>
                {
                  daysOfWeek.map((day) => {

                    if(day in menuWeekObj){
                        return(<MenuDay day={day} recipes={menuWeekObj[day]}></MenuDay>)
                    }
                  })  
                }
            </div>
        </>
    )
}

export default MenuWeek