import React, { useRef, useState } from 'react'

const CreateUser = () => {
  const ref = useRef()
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [credintials, setCredintials] = useState({ name: "", tufid: "", email: "", password: "", dob: "", Phno: "" })
  const reset = () => {
    setCredintials({ name: "", tufid: "", email: "", password: "", dob: "", Phno: "" })
    setBranch("")
    setYear("")
  }

  const handledbranch = (e) => {
    setBranch(e.target.value)
  }
  const handledyear = (e) => {
    setYear(e.target.value)
  }
  const onchange = (e) => {
    setCredintials({ ...credintials, [e.target.name]: e.target.value })
  }
  const style = {
    width: "30vmin"
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let tufid = document.getElementById("tufid").value;
    let Branch = document.getElementsByTagName("select").value;
    let Year = document.getElementsByTagName("select").value;
    let email = document.getElementById("email").value;
    let dob = document.getElementById("dob").value;
    let Phno = document.getElementById("Phno").value;
    let pass = document.getElementById("password").value;
    let valid = true
    if (name === "") {
      document.getElementById("nameerror").textContent = "Name is requried"
      valid = false
    }
    if (tufid === "") {
      document.getElementById("tufiderror").textContent = "Tufid is requried"
      valid = false
    }
    if (Branch === "") {
      document.getElementById("brancherror").textContent = "Branch is requried"
      valid = false
    }
    if (Year === "") {
      document.getElementById("yearerror").textContent = "Year is requried"
      valid = false
    }
    if (email === "") {
      document.getElementById("emailerror").textContent = "Email is requried"
      valid = false
    }
    if (dob === "") {
      document.getElementById("doberror").textContent = "DOB is requried"
      valid = false
    }
    if (Phno === "") {
      document.getElementById("pherror").textContent = "Phno. is requried"
      valid = false
    }
    if (pass === "") {
      document.getElementById("passerror").textContent = "Password is requried"
      valid = false
    }
    if (valid) {
      try {
        const response = await fetch("https://railway-backend-jaap.onrender.com/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: credintials.name,
            tufid: credintials.tufid,
            branch: branch,
            year: year,
            dob: credintials.dob,
            email: credintials.email,
            password: credintials.password,
            Phno: credintials.Phno
          })
        })
        const data = response.json()
        alert("User Created Succesfully")
        reset();
      } catch (error) {
        alert("Unable To Create User")
      }
    }
  }
  return (
    <div id="formpage">
      <div id="form">
        <p className='fs-1 fw-bolder'>Create User</p>
        <form onSubmit={handleSubmit} ref={ref}>
          <div id='div'>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input style={style} placeholder="USER NAME" type="text" value={credintials.name} className="form-control" id="name" name='name' onChange={onchange} />
              <p id='nameerror' style={{ color: "red" ,fontSize:"1.5vmin",textAlign:"center"}}></p>
            </div>
            <div className="mb-3">
              <label className="form-label">TUFID</label>
              <input style={style} type="text" placeholder="USER TUFID" value={credintials.tufid} className="form-control" id="tufid" name='tufid' onChange={onchange} />
              <p id='tufiderror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
          </div>
          <div id='div'>
            <div className="mb-3 ">
              <div className="form-label">Branch</div>
              <select value={branch}
                onChange={handledbranch}
                style={{
                  width: "30vmin",
                  padding: ".375rem .75rem",
                  borderRadius: "1vmin",
                  border: "1px solid #dee2e6",
                }}>
                <option value="" selected>Branch</option>
                <option value="IT">IT</option>
                <option value="CS">CS</option>
                <option value="EXTC">EXTC</option>
                <option value="MECH">MECH</option>
                <option value="ELEX">ELEX</option>
              </select>
              <p id='brancherror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
            <div className="mb-3 ">
              <div className="form-label">Year</div>
              <select value={year}
                onChange={handledyear}
                style={{
                  width: "30vmin",
                  padding: ".375rem .75rem",
                  borderRadius: "1vmin",
                  border: "1px solid #dee2e6",
                }}>
                <option value="" selected>Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>
              <p id='yearerror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
          </div>
          <div id='div'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input style={style} type="email" placeholder="USER EMAIL" value={credintials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
              <p id='emailerror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input style={style} type="date" value={credintials.dob} className="form-control" id="dob" name='dob' onChange={onchange} />
              <p id='doberror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
          </div>
          <div id='div'>
            <div className="mb-3">
              <label className="form-label">Phone No.</label>
              <input style={style} type="tel" placeholder="Phone No." value={credintials.Phno} className="form-control" id="Phno" name='Phno' onChange={onchange} />
              <p id='pherror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input style={style} type="password" placeholder="PASSWORD" value={credintials.password} className="form-control" id="password" name='password' onChange={onchange} />
              <p id='passerror' style={{ color: "red",fontSize:"1.5vmin",textAlign:"center" }}></p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div >
    </div>
  )
}

export default CreateUser
