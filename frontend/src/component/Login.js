import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    
    const [login, setLogin] = useState({ user: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://railway-backend-jaap.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tufid: login.user, password: login.password })
            })
            const data = await response.json()
            localStorage.setItem("token", data.jwttoken)

            if (data.user.tufid === "TU4Fadmin@terna" && localStorage.getItem("token") === data.jwttoken) {
                navigate("/admin/createuser")
            } else {
                navigate("/user/apply")
            }
        } catch (error) {
            alert("Unable to login")
        }

    }
    const onchange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    return (
        <div id="formpage">
            <div className='logo'><i class="fa-solid fa-train-subway" style={{fontSize:"20vmin"}}></i>
                <p className='fs-4 fw-light' style={{letterSpacing:"1vmin"}}>Railway Concession</p></div>
            <div id='form'>
                <form onSubmit={handleSubmit}>
                    <p className='fs-1 fw-bolder text-center'>Login</p>
                    <div className="mb-3">
                        <label className="form-label">UserName</label>
                        <input type="text" placeholder='USER TUFID' className="form-control" id="user" name='user' value={login.user} onChange={onchange} style={{ width: "50vmin",  }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder='PASSWORD' className="form-control" id="password" name='password' onChange={onchange} value={login.password} style={{ width: "50vmin", }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
