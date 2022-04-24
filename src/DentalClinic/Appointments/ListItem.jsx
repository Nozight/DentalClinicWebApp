import { useToggle } from "../Utils/useToggle"
export function ListItem({ appointment, i }) {
    const [toggle, setToggle] = useToggle();
    
    //EDIT 
    const editAppointment = (e) => {
        e.preventDefault()

        var dentistId = 0;
        var patientId = 0;
        // GETTING DENTIST
        let enrollment = e.target.enrollment.value

        var getHeaders = new Headers();
        getHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
            redirect: 'follow'
        };

        var oldDentist = {};

        fetch("http://localhost:8080/api/dentist/enrollment?enrollment="+enrollment, getRequestOptions)
            .then(response => response.json())
            .then(result => {
                oldDentist = result;
                console.log(result)
                dentistId = oldDentist.id;
                getPatient()
            })
            .catch(error => console.log('error', error));

        // GETTING PATIENT
        const getPatient = () => {

            let dni = e.target.dni.value


            var getHeaders = new Headers();
            getHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

            var getRequestOptions = {
                method: 'GET',
                headers: getHeaders,
                redirect: 'follow'
            };

            var oldPatient = {};

            fetch("http://localhost:8080/api/patient/dni?dni="+dni, getRequestOptions)
                .then(response => response.json())
                .then(result => {
                    oldPatient = result;
                    console.log(result)
                    patientId = oldPatient.id;
                    sendRequest()
                })
                .catch(error => console.log('error', error));
        }
       
        //UPDATING APPOINTMENT 
        const sendRequest = () => {

            var putHeaders = new Headers();
            putHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
            putHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": appointment.id,
                "appointment_date": e.target[0].value,
                "dentist": { "id": dentistId },
                "patient": { "id": patientId }
            });

            var requestOptions = {
                method: 'PUT',
                headers: putHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8080/api/appointment", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(raw);
                    console.log(result)
                })
                .catch(error => {
                    console.log(raw);
                    console.log('error', error)
                });

        }
    }

    //DELETE 
    const deleteAppointment = () => {
        //GETTING APPOINTMENT
        
        //DELETING DENTIST
        var deleteHeaders = new Headers();
        deleteHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

        var requestOptions = {
            method: 'DELETE',
            headers: deleteHeaders,
            redirect: 'follow'
        };
        
            console.log(appointment.id);
            fetch("http://localhost:8080/api/appointment/"+appointment.id, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        
   }
    return (
        <li key={"dentist" + i.toString()} className="list-group-item">
            <div className=" d-flex justify-content-between align-items-start ms-2 me-auto list-item">
                <div>
                    <div className="fw-bold">{appointment.appointment_date}</div>
                    <ul>
                    <li id={"id" + i} >id: {appointment.id}</li>
                        <li id="" >Dentist name: {appointment.dentist.name}</li>
                        <li id="" >Dentist enrollment: {appointment.dentist.enrollment}</li>
                        <li id="" >Patient name: {appointment.patient.name}</li>
                        <li id="" >Patient dni: {appointment.patient.dni}</li>
                    </ul>
                </div>

                <div className="align-self">
                    <button type="button" className="btn btn-warning mx-1 my-2" onClick={setToggle}><img src='/assets/icons/edit_black_24dp.svg' alt="update" /></button>
                    <button type="button" className="btn btn-danger mx-1 my-2" onClick={deleteAppointment}><img src='/assets/icons/delete_black_24dp.svg' alt="delete" /></button>
                </div>
            </div>
            {toggle ?
                <div>
                <form action="update" onSubmit={editAppointment}>
                    <input id="appointment_date" type="date" />
                    <input id="enrollment" type="number" placeholder="Dentist Enrollment"/>
                    <input id="dni" type="number" placeholder="Patient DNI"/>
                    <input type="submit" value="update" className="btn btn-warning"/>
                </form>
            </div>:
            null
            }
        </li>
    )
}
