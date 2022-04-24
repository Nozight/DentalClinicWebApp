import { useState } from 'react';
function Registration() {
  const [regSuccess, setSuccess] = useState(false)
  const [failedConn, setFailedConn] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  //REGISTER 
  const registerAppointment = (e) => {
    e.preventDefault();
    setRegLoading(true)

    // GETTING DENTIST
    let enrollment = e.target[1].value
    var dentistId = 0;

    var getHeaders = new Headers();
    getHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

    var getRequestOptions = {
      method: 'GET',
      headers: getHeaders,
      redirect: 'follow'
    };

    var oldDentist = {};

    fetch(`http://localhost:8080/api/dentist/enrollment?enrollment=${enrollment}`, getRequestOptions)
      .then(response => response.json())
      .then(result => {
        oldDentist = result;
        console.log(result)
        dentistId = oldDentist.id;
        getPatient()
      })
      .catch(error => console.log('error', error));



    // GETTING PATIENT
    var patientId = 0;
    const getPatient = () => {

      let dni = e.target[2].value


      var getHeaders = new Headers();
      getHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

      var getRequestOptions = {
        method: 'GET',
        headers: getHeaders,
        redirect: 'follow'
      };

      var oldPatient = {};

      fetch(`http://localhost:8080/api/patient/dni?dni=${dni}`, getRequestOptions)
        .then(response => response.json())
        .then(result => {
          oldPatient = result;
          console.log(result)
          patientId = oldPatient.id;
          sendRequest()
        })
        .catch(error => console.log('error', error));
    }


    const sendRequest = () => {

      var raw = JSON.stringify({
        appointment_date: e.target[0].value,
        patient: {id:dentistId},
        dentist: {id:patientId}
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

      fetch("http://localhost:8080/api/appointment", requestOptions)
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
  }
  return (
    <div>
      {/* REGISTRATION ---------------------------------------------------------------- */}
      {/* FROM */}
      <form name="registerAppointment" action="" onSubmit={registerAppointment} method="post">
        <div className='form-container '>
          <div><input required type="date" className="" id="admission_date" ></input></div>
          <div><input required type="number" className="" id="dentistEnrollment" placeholder="Dentist Enrollment"></input></div>
          <div><input required type="number" className="" id="patientDni" placeholder="Patient DNI"></input></div>
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