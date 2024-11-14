import React, { useContext, useEffect, useState } from 'react'
import UserPDF from '../UserPDF'
import userContxet from '../../context/UserContext'
const RequestStatus = () => {
  const context = useContext(userContxet)
  const { fetchloginuser, loginuser } = context
  const [Data, setData] = useState([])
  const fetchdata = async () => {
    try {
      const response = await fetch(`https://railway-backend-isf5.onrender.com/api/data/fetchdatabyid`, {
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
  useEffect(() => {
    fetchdata()
    fetchloginuser()
  }, [fetchdata, fetchloginuser])
  return (
    <>
      <div id="tablepage">
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Data ?
              (<>
                <tr>
                  <td>{Data.name}</td>
                  <td>{Data.email}</td>
                  <td>{Data.tufid}</td>
                  <td className="address-cell">{Data.address}</td>
                  <td>{Data.branch}</td>
                  <td>{Data.year}</td>
                  <td>{Data.from}</td>
                  <td>{Data.to}</td>
                  <td>{Data.Class}</td>
                  <td>{Data.period}</td>
                  <td>
                    {Data.aadhar && (
                      <a
                        href={`/uploads/${Data.aadhar}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning mx-2"
                      >
                        Aadhar
                      </a>
                    )}
                  </td>
                  <td>
                    {Data.collegeid && (
                      <a
                        href={`/uploads/${Data.collegeid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning mx-2"
                      >
                        CollegeId
                      </a>
                    )}
                  </td>
                  <td>
                    {Data.status === "Approve" ? (
                      <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                    ) : Data.status === "Pending" ? (
                      <i className="fa-regular fa-clock mx-2" style={{ color: "orange" }}></i>
                    ) : (
                      <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
                    )}
                    <p className='fs-6'>{Data.status}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={13}>
                    {Data.status === "Approve" ? (<UserPDF from={Data.from} to={Data.to} Class={Data.Class} period={Data.period} />) : ("")}
                    {Data.status === "Reject" ? (<p className='fs-6 fw-light' style={{ color: "red" }}>*{Data.reason}<br />{"concessionRejectedCount : " + loginuser.concessionRejectedCount+" If Your Request Is Rejected Atleast 3 Times Then You Not Allowed To Aply For Next 1Month"}</p>) : ("")}
                  </td>
                </tr>
              </>)
              :
              (<tr><td colSpan={13}><p className='fs-2 fw-bolder text-center' style={{ width: "100%" }}>Request Is Not Available</p></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RequestStatus
