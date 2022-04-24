import { useState } from 'react';

function Registration() {
  const [regSuccess, setSuccess] = useState(false)
  const [failedConn, setFailedConn] = useState(false)
  const [regLoading, setRegLoading] = useState(false)

  //REGISTER 
  const registerPatient = (e) => {
    e.preventDefault();
    setRegLoading(true)

    var raw = JSON.stringify({
      name: e.target[0].value,
      last_name: e.target[1].value,
      dni: e.target[2].value,
      address: {
        street: e.target[3].value,
        number: e.target[4].value,
        locality: e.target[5].value,
        province: e.target[6].value
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + sessionStorage.getItem("jwt")
      },
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/patient", requestOptions)
      .then(response => response.text())
      .then(result => {
        setSuccess(true)
        setRegLoading(false)
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        console.log(result)
        console.log(sessionStorage.getItem("jwt"))

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
        console.log(sessionStorage.getItem("jwt"))
      });
  }
  return (
    <div>
      {/* REGISTRATION ---------------------------------------------------------------- */}
      {/* FROM */}
      <form name="registerPatient" action="" onSubmit={registerPatient} method="post">
        <div className='form-container '>
          <div><input required type="text" className="" id="Name" placeholder="Name"></input></div>
          <div><input required type="text" className="" id="LastName" placeholder="LastName"></input></div>
          <div><input required type="number" className="" id="dni" placeholder="DNI"></input></div>

          <div className='addressForm'>
            <div><input required type="text" className="" id="street" placeholder="Street"></input></div>
            <div><input required type="number" className="" id="number" placeholder="Number"></input></div>
            <div><input required type="text" className="" id="locality" placeholder="Locality"></input></div>
            <div><input required type="text" className="" id="province" placeholder="Province"></input></div>
          </div>

          <div>
            {/* SUBMIT-LOADING  */}
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