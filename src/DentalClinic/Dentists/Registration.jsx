import { useState } from 'react';
import axios from 'axios';
function Registration() {
  const [regSuccess, setSuccess] = useState(false)
  const [failedConn, setFailedConn] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  //REGISTER 
  const registerDentist = (e) => {
    e.preventDefault();
    setRegLoading(true)

    var raw = JSON.stringify({
      name: e.target[0].value,
      last_name: e.target[1].value,
      enrollment: e.target[2].value
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/dentist", requestOptions)
      .then(response => response.text())
      .then(result => {
        setSuccess(true)
        setRegLoading(false)
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        console.log(result)
        console.log(localStorage.getItem("jwt"))

      })
      .catch(error => {
        console.log('error', error)
        console.log(error);
        setFailedConn(true)
        setRegLoading(false)
        setTimeout(() => {
          setFailedConn(false);
        }, 6000); 
        setRegLoading(true)
        console.log(localStorage.getItem("jwt"))
      });
  }
  return (
    <div>
      {/* REGISTRATION ---------------------------------------------------------------- */}
      {/* FROM */}
      <form name="registerDentist" action="" onSubmit={registerDentist} method="post">
        <div className='form-container '>
          <div><input required type="text" className="" id="Name" placeholder="Name"></input></div>
          <div><input required type="text" className="" id="LastName" placeholder="LastName"></input></div>
          <div><input required type="number" className="" id="Enrollment" placeholder="Enrollment"></input></div>
          <div>{/* LOADING REGISTRATION */}
            {regLoading ?
              <div className="spinner-border text-info reg-loading" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> :
              <button type="submit" className='btn btn-primary reg-btn'>Register</button>}
          </div>
        </div>

        {/* ERROR / SUCSESS */}
        {regSuccess ? <div className='relative'><div className='flex align justify'><span className="badge bg-success reg-success">Registration Successful</span></div></div> : null}
        {failedConn ?
          <div className="alert alert-warning" role="alert">
            Couldn´t connect with the database 🤖
          </div> : null}
      </form>
    </div>
  )
}
export default Registration;