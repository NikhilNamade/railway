import React, { useContext, useEffect, useState } from 'react'
import userContxet from '../../context/UserContext';

const Apply = (props) => {
  const context = useContext(userContxet);
  const { fetchloginuser, loginuser } = context
  useEffect(() => {
    fetchloginuser()
  }, [])
  const [credintials, setCredintials] = useState({ address: "", from: "", to: "" })
  const [Class, setClass] = useState("")
  const [period, setPeriod] = useState("")
  const [aadhar, setAadhar] = useState("")
  const [collegeid, setCollegeid] = useState("")
  const [Data, setData] = useState([])
  const resetinput = () => {
    setCredintials({ address: "", from: "", to: "" })
    setClass("")
    setPeriod("")
    setAadhar("")
    setCollegeid("")
  }

  const onchange = (e) => {
    setCredintials({ ...credintials, [e.target.name]: e.target.value })
  }
  const handledperiod = (e) => {
    setPeriod(e.target.value)
  }
  const handledclass = (e) => {
    setClass(e.target.value)
  }
  const onchangeaadhar = (e) => {
    const file = e.target.files[0]
    setAadhar(file)
    console.log(file);
  }
  const onchangecollegeid = (e) => {
    const file = e.target.files[0]
    setCollegeid(file)
    console.log(file);
  }
  const style = {
    width: "30vmin",
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    {props.setProgress(20)}
    const fetchdata = async () => {
      try {
        const response = await fetch(`https://railway-backend-jaap.onrender.com/api/data/fetchdatabyid`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token")
          }
        })
        const json = await response.json()
        setData(json.data)
      } catch (error) {
        console.log("No User");
      }
    }
    await fetchdata();
    {props.setProgress(40)}
    let Address = document.getElementById("address").value;
    let Aadhar = document.getElementById("aadhar").value;
    let Collegeid = document.getElementById("collegeid").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let classuser = document.getElementsByTagName("select").value;
    let perioduser = document.getElementsByTagName("select").value;
    let valid = true
    if (Aadhar === "") {
      document.getElementById("aadharerror").textContent = "Aadhar Card is required"
      valid = false;
    }
    if (Collegeid === "") {
      document.getElementById("collegeiderror").textContent = "CollegeId  is required"
      valid = false;
    }
    if (Address === "") {
      document.getElementById("addresserror").textContent = "Address  is required"
      valid = false;
    }
    if (from === "") {
      document.getElementById("fromerror").textContent = "From Station  is required"
      valid = false;
    }
    if (to === "") {
      document.getElementById("toerror").textContent = "To Station  is required"
      valid = false;
    }
    if (classuser === "") {
      document.getElementById("classerror").textContent = "Class  is required"
      valid = false;
    }
    if (perioduser === "") {
      document.getElementById("perioderror").textContent = "Period  is required"
      valid = false;
    }
    if (Data && valid) {
      const currentDate = Date.now();
      const nextConcessionDate = new Date(loginuser.nextConcessionDate).getTime();
      if (!isNaN(nextConcessionDate) && currentDate >= nextConcessionDate) {
        console.log("User can request a concession.");
        try {
          await fetch(`https://railway-backend-jaap.onrender.com/api/data/updateStatus/${loginuser._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              canRequestConcession: true,
              concessionRejectedCount: 0,
            }),
          });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
        {props.setProgress(60)}
        try {
          const formdata = new FormData();
          formdata.append("name", loginuser.name);
          formdata.append("tufid", loginuser.tufid);
          formdata.append("email", loginuser.email);
          formdata.append("address", credintials.address);
          formdata.append("from", credintials.from);
          formdata.append("to", credintials.to);
          formdata.append("branch", loginuser.branch);
          formdata.append("year", loginuser.year);
          formdata.append("Class", Class);
          formdata.append("period", period);
          formdata.append("aadhar", aadhar);
          formdata.append("collegeid", collegeid);

         const response = await fetch("https://railway-backend-jaap.onrender.com/api/data/adddata", {
    method: "POST",
    headers: {
      "auth-token": localStorage.getItem("token"), // No need for "Content-Type"
    },
    body: formdata,
  });


          const data = await response.json();
          console.log(data);
          if (data.error) {
            const timeDiff = nextConcessionDate - currentDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
            alert(`You have to wait ${daysDiff} more day(s) to request a concession.`);
          } else {
            alert("Applied Successfully");
          }
          resetinput();

        } catch (error) {
          alert("Unable to apply");
        }
        {props.setProgress(80)}
      } else {
        const timeDiff = nextConcessionDate - currentDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (!isNaN(daysDiff)) {
          alert(`You have to wait ${daysDiff} more day(s) to request a concession.`);
        } else {
          console.log("Invalid next concession date.");
        }
      }
    } else {
      try {
        const formdata = new FormData();
        formdata.append("name", loginuser.name);
        formdata.append("tufid", loginuser.tufid);
        formdata.append("email", loginuser.email);
        formdata.append("address", credintials.address);
        formdata.append("from", credintials.from);
        formdata.append("to", credintials.to);
        formdata.append("branch", loginuser.branch);
        formdata.append("year", loginuser.year);
        formdata.append("Class", Class);
        formdata.append("period", period);
        formdata.append("aadhar", aadhar);
        formdata.append("collegeid", collegeid);

         const response = await fetch("https://railway-backend-jaap.onrender.com/api/data/adddata", {
    method: "POST",
    headers: {
      "auth-token": localStorage.getItem("token"), // No need for "Content-Type"
    },
    body: formdata,
  });


        const data = await response.json();
        console.log(data);
        if (data.error) {
          alert("Unable to apply");
        } else {
          alert("Applied Successfully");
        }
        resetinput();

      } catch (error) {
        alert("Unable to apply");
      }
    }
    {props.setProgress(100)}
  };
  return (
    <>
      <div id="formpage" style={{ marginTop: "2vmin" }}>
        <div id="form" >
          <p className='fs-3 fw-bolder'>Apply For Concession</p>
          <form style={{ marginTop: "1vmin" }} onSubmit={handleSubmit}>
            <div id="div">
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input style={style} type="text" placeholder="USER NAME" value={loginuser.name} disabled className="form-control" id="name" name='name' onChange={onchange} />
              </div>
              <div className="mb-3">
                <label className="form-label">TUFID</label>
                <input style={style} type="text" placeholder="USER TUFID" value={loginuser.tufid} disabled className="form-control" id="tufid" name='tufid' onChange={onchange} />
              </div>
            </div>
            <div id='div'>
              <div className="mb-3 ">
                <div className="form-label">Branch</div>
                <select value={loginuser.branch}
                  disabled
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
              </div>
              <div className="mb-3 ">
                <div className="form-label">Year</div>
                <select value={loginuser.year}
                  disabled
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
              </div>
            </div>
            <div id='div'>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input style={style} type="email" placeholder="USER EMAIL" value={loginuser.email} disabled className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                <textarea className="form-control" placeholder="USER ADDRESS" value={credintials.address} style={{ width: "30vmin", resize: "none" }} id="address" name='address' onChange={onchange} ></textarea>
                <p id="addresserror" style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
            </div>
            <div id="div">
              <div className="mb-3">
                <label className="form-label">Aadhar Card</label>
                <input style={style} type="file" accept='pdf/*' className="form-control" id="aadhar" name='aadhar' onChange={onchangeaadhar} />
                <p id='aadharerror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
              <div className="mb-3">
                <label className="form-label">College Id</label>
                <input style={style} type="file" accept='pdf/*' className="form-control" id="collegeid" name='collegeid' onChange={onchangecollegeid} />
                <p id='collegeiderror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
            </div>
            <div id="div">
              <div className="mb-3">
                <label className="form-label">From</label>
                <input style={style} type="text" value={credintials.from} placeholder="FROM STATION" className="form-control" id="from" name='from' onChange={onchange} />
                <p id='fromerror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
              <div className="mb-3">
                <label className="form-label">To</label>
                <input style={style} type="text" value={credintials.to} placeholder="TO STATION" className="form-control" id="to" name='to' onChange={onchange} />
                <p id='toerror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
            </div>
            <div id='div'>
              <div className="mb-3 ">
                <div className="form-label">Class</div>
                <select value={Class}
                  onChange={handledclass}
                  style={{
                    width: "30vmin",
                    padding: ".375rem .75rem",
                    borderRadius: "1vmin",
                    border: "1px solid #dee2e6",
                  }}>
                  <option value="" selected>Class</option>
                  <option value="First Class">First Class</option>
                  <option value="Second Class">Second Class</option>
                </select>
                <p id='classerror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
              <div className="mb-3 ">
                <div className="form-label">Period</div>
                <select value={period}
                  onChange={handledperiod}
                  style={{
                    width: "30vmin",
                    padding: ".375rem .75rem",
                    borderRadius: "1vmin",
                    border: "1px solid #dee2e6",
                  }}>
                  <option value="" selected>Period</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quaterly">Quaterly</option>
                </select>
                <p id='perioderror' style={{ color: "red", fontSize: "1.5vmin", textAlign: "center" }}></p>
              </div>
            </div>
            <div style={{textAlign:"center"}}>
            <button type="submit" className="btn btn-primary" style={{backgroundColor:"#ec5040",border:"none",width:"40vmin",marginTop:"1vmin"}}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Apply
