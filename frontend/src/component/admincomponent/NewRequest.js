import React, { useEffect, useState } from 'react'

const NewRequest = () => {
  const [Data, setData] = useState([])
  const [reason, setreason] = useState({ reason: "" })
  const fetchdata = async () => {
    try {
      const response = await fetch("https://railway-backend-jaap.onrender.com/api/data/fetchdata", {
        method: "POST"
      })
      const json = await response.json()
      setData(json.data)
      console.log(json.data);
    } catch (error) {
      console.log("No User");
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])
  const handleApprove = async (_id,user_id) => {
    console.log(_id);
    try {
      const response = await fetch(`https://railway-backend-jaap.onrender.com/api/data/updateData/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "status": "Approve",
          "reason": "No Reason"
        })
      })
      const data = response.json()
      console.log("Approved:", data);
      setreason({ reason: "" })
      // Optionally, refresh the data after approval
      const Phno = await handlebyid(user_id);
      fetchdata();
      sendmsg(Phno, "Your Concession Application Is Approve")
    } catch (error) {
      console.log("unable");
    }
  }
  const handleReject = async (_id, user_id) => {
    console.log(user_id)
    try {
      const response = await fetch(`https://railway-backend-jaap.onrender.com/api/data/updateData/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "status": "Reject",
          "reason": reason.reason
        })
      })
      const data = response.json();
      setreason({ reason: "" })
      // Optionally, refresh the data after approval
      const Phno = await handlebyid(user_id);
      fetchdata();
      sendmsg(Phno, "Your Concession Application Is Rejected")
    } catch (error) {
      console.log("unable");
    }
  }

  const handlebyid = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`https://railway-backend-jaap.onrender.com/api/auth/fetchuser/${id}`, {
        method: "POST"
      })
      const data = await response.json();
      return data.user.Phno;
    } catch (error) {
      console.log(error);
    }
  }

  const sendmsg = async (to, message) => {
    console.log(to + "  " + message)
    try {
      const response = await fetch("https://railway-backend-jaap.onrender.com/api/data/send-msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, message })
      })
    } catch (error) {
      console.log(error);
    }
  }
  const onchange = (e) => {
    setreason({ ...reason, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div id="tablepage" style={{ overflow: "auto" }}>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>TUFID</th>
              <th>Address</th>
              <th>Branch</th>
              <th>Year</th>
              <th>From</th>
              <th>Destination</th>
              <th>Class</th>
              <th>Period</th>
              <th>Aadhar Card</th>
              <th>College ID</th>
              <th style={{ width: "30vmin" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Data.length > 0 ? (
              Data.map((data, index) => (
                <>
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.tufid}</td>
                    <td className="address-cell">{data.address}</td>
                    <td>{data.branch}</td>
                    <td>{data.year}</td>
                    <td>{data.from}</td>
                    <td>{data.to}</td>
                    <td>{data.Class}</td>
                    <td>{data.period}</td>
                    <td><a
                      href={`https://railway-backend-jaap.onrender.com/uploads/${data.aadhar}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn  btn-warning mx-2"
                      type="button"
                    >Aadhar</a></td>
                    <td><a
                      href={`https://railway-backend-jaap.onrender.com/uploads/${data.collegeid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn  btn-warning mx-2"
                      type="button"
                    >CollegeId</a>
                    </td>
                    {data.status === "Pending" ?
                      (<td>
                        <button className='mx-2 btn btn-success' onClick={() => handleApprove(data._id, data.user_id)}>Approve</button>
                        <button className='my-1 btn btn-danger' onClick={() => handleReject(data._id, data.user_id)}>Reject</button>
                      </td>
                      ) :
                      (
                        <td>
                          {data.status === "Approve" ?
                            (<><i className="fa-solid fa-check mx-2" style={{ color: "green" }} />{data.status}</>)
                            : (<><i className="fa-solid fa-xmark mx-2" style={{ color: "red" }} />{data.status}</>)}
                        </td>
                      )
                    }
                  </tr>
                  {data.status === "Pending" ?
                    <tr>
                      <td colSpan="13" >
                        <form>
                          <div className="container d-flex justify-content-center">
                            <input type="text" placeholder='Reason For Rejecting The Request' className="form-control" id="reason" name='reason' onChange={onchange} style={{ width: "70vmin", border: "1px solid red", color: "red" }} />
                            {/* <p type="submit" className="btn btn-primary mx-2" onClick={()=>{console.log(reason)}}>Submit</p> */}
                          </div>
                        </form>
                      </td>
                    </tr>
                    : ""}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="13">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default NewRequest
