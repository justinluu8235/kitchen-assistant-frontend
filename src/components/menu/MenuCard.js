import React, {useState} from 'react';
import { createStyles, makeStyles, Button} from "@material-ui/core";
import Modal from '@mui/material/Modal';
import CustomButton from '../shared/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
        position:"relative",
        height: "200px", 
        width: "150px", 

    },
    banner: {
        height: "30px", 
        width: "100%",
        position: "absolute", 
        backgroundColor: ({meal}) => {
            return meal === 'breakfast' ? "#ff7b25"  : meal === 'lunch' ? "#82b74b" : "#4040a1"
        },
        color: "white", 
        textAlign: "center", 
        top: 0,
    }, 
    recipeNameContainer: {
        position: "absolute", 
        bottom:0,
        left: 0,
        color: "yellow",
        fontWeight: "800"
    }, 
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        backgroundColor: "var(--background)",
    },
  })
);
const MenuCard = ({menuItem, handleDeleteSubmit}) => {
    const classes = useStyles({"meal": menuItem["meal_name"]})
    const [modalOpen, setModalOpen] = useState(false)    
    const {REACT_APP_SERVER_URL} = process.env


    const generateShoppingList = (e,user_id, recipeId) => {
        e.preventDefault();
        let recipeInfo = {
            user_id: user_id,
            recipe_id: recipeId
        }
        console.log('recipe info', recipeInfo);

        const token = localStorage.getItem("jwtToken")
        fetch(`${REACT_APP_SERVER_URL}/shoppinglist/generate`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify(recipeInfo)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('return data', data)
                alert(`ingredients for ${menuItem["recipe_name"]} has been added to your shopping list`)
            })
            .catch(error => {
                console.log('===> Error creating pantry item', error);
                alert('Error creating pantry item');
            });

    }

    console.log('menu card recipes', menuItem)
    return (
        <div>
            <div className={classes.imageContainer} onClick={() => setModalOpen(true)} >
                <img src={menuItem["image"]} />
                <div className={classes.banner}>
                    {menuItem["meal_name"]}
                </div>
                <div className={classes.recipeNameContainer}>{menuItem["recipe_name"]}</div>
            </div>
            {!!menuItem["note"] && <p style={{color:"white"}}>{menuItem["note"]}</p>}
            <Modal open={modalOpen} onClose={() => {setModalOpen(false)}}>
                <div className={classes.modalContainer}>
                <CustomButton text="Remove from menu" onClick={(e) => {
                    handleDeleteSubmit(e, menuItem["id"])
                    setModalOpen(false)
                    }}></CustomButton>
                <CustomButton text="Add to Shopping List" onClick={(e) => {
                    generateShoppingList(e, menuItem["user"], menuItem["recipe"] )
                    setModalOpen(false)
                }}></CustomButton>
                <CustomButton text={<a href={`/recipes/${menuItem["recipe"]}`}>View Recipe</a>}></CustomButton>

                </div>

            </Modal>
        </div>
    )

}

export default MenuCard