import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userContxet from '../context/UserContext';
import {animateHeader} from "./animation/script"
const AdminNav = (props) => {
    const context = useContext(userContxet);
    const {fetchloginuser,loginuser} = context
    const navigate = useNavigate()
    const location = useLocation()
    const logout = () => {
        {props.setProgress(25)}
        localStorage.removeItem("token")
        navigate("/")
        {props.setProgress(100)}
    }
    useEffect(() => {
      fetchloginuser()
    }, [])
    useEffect(() => {
        animateHeader();
    },[]);
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#f98251"}}>
            <div className="container-fluid">
                <a className="navbar-brand link" style={{color:'white'}} ><i className="fa-solid fa-user mx-2"></i>{location.pathname.startsWith('/admin') ? "Admin" : `${loginuser.name}`}</a>
                <button className="navbar-toggler" style={{color:"white"}}  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{color:"white"}}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {location.pathname.startsWith("/admin") ?
                                (<Link  className={`nav-link link ${location.pathname === "/admin/createuser" ? "active" : ""}`} aria-current="page" to="/admin/createuser" onClick={()=>props.setProgress(100)} style={{color:'white'}}>Create User <i className="fa-solid fa-plus"></i></Link>) :
                                (<Link  className={`nav-link link ${location.pathname === "/user/apply" ? "active" : ""}`} aria-current="page" to="/user/apply" onClick={()=>props.setProgress(100)} style={{color:'white'}}>Apply<i className="fa-solid fa-hand-point-up mx-2"></i></Link>)}
                        </li>
                        <li className="nav-item">
                            {location.pathname.startsWith("/admin") ?
                                (<Link  className={`nav-link link ${location.pathname === "/admin/newrequest" ? "active" : ""}`} to="/admin/newrequest" onClick={()=>props.setProgress(100)} style={{color:'white'}}>New Request <i className="fa-solid fa-comments"></i></Link>
                                ) : (<Link id='link' className={`nav-link link ${location.pathname === "/user/requestStatus" ? "active" : ""}`} to="/user/requestStatus" onClick={()=>props.setProgress(100)} style={{color:'white'}}>Request Status <i className="fa-solid fa-square-poll-vertical mx-2"></i></Link>
                                )}</li>
                    </ul>
                    <div className='btn btn-secondary' onClick={logout} style={{backgroundColor:"#fd5948",color:"white",border:'none'}}><i className="fa-solid fa-right-from-bracket mx-2" style={{fontSize:"2vmin"}}></i>Logout</div>
                </div>

            </div>

        </nav>
    )
}

export default AdminNav