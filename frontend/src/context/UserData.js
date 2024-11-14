import React, { useState } from 'react'
import userContxet from './UserContext'
const UserData = (props) => {
    const [loginuser, setloginuser] = useState([])
    const fetchloginuser = async()=>{
        try {
            const response = await fetch("https://railway-backend-isf5.onrender.com/api/auth/fetchuser",{
                method:"POST",
                headers:{
                    "auth-token":localStorage.getItem("token")
                }
            })
            const data = await response.json()
            setloginuser(data.user);
        } catch (error) {
            console.log("unable");
        }
    }
  return (
    <userContxet.Provider value={{fetchloginuser,loginuser}}>
        {props.children}
    </userContxet.Provider>
  )
}

export default UserData
