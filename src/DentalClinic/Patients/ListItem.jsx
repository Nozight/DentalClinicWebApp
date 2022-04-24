import { useToggle } from "../Utils/useToggle"
export function ListItem({ patient, i, editMethod}) {
    const [toggle, setToggle] = useToggle();
    const dni = patient.dni;
    //DELETE 
    const deletePatient = () => {
        // GETTING PATIENT
        var getHeaders = new Headers();
        getHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
            redirect: 'follow'
        };

        var oldPatient = {};
        var patientId = 0;

        fetch(`http://localhost:8080/api/patient/dni?dni=${dni}`, getRequestOptions)
            .then(response => response.json())
            .then(result => {
                oldPatient = result;
                console.log(result)
                patientId = oldPatient.id;
                delPatient()
               
            })
            .catch(error => console.log('error', error));
        //DELETING DENTIST
        var deleteHeaders = new Headers();
        deleteHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

        var requestOptions = {
            method: 'DELETE',
            headers: deleteHeaders,
            redirect: 'follow'
        };
        const delPatient = () => {
            console.log();
            fetch(`http://localhost:8080/api/patient/${patientId}`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }
    return (
        <li key={"patient" + i.toString()} className="list-group-item">
            <div className=" d-flex justify-content-between align-items-start ms-2 me-auto list-item">
                {/*PROPERTIES */}
                <div>
                    <div className="fw-bold">{patient.name + " " + patient.last_name}</div>
                    <ul>
                        <li id="dni" >Dni: {patient.dni}</li>
                        <li id="admission_date" >Admission date: {patient.admission_date}</li>
                        {/*Address */}
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Address
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <ul>
                                        <li id="street" >street: {patient.address.street}</li>
                                        <li id="number" >Number: {patient.address.number}</li>
                                        <li id="lcoality" >Locality: {patient.address.locality}</li>
                                        <li id="province" >Province: {patient.address.province}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

                <div className="align-self">
                    <button type="button" className="btn btn-warning mx-1 my-2" onClick={setToggle}><img src='/assets/icons/edit_black_24dp.svg' alt="update" /></button>
                    <button type="button" className="btn btn-danger mx-1 my-2" onClick={deletePatient}><img src='/assets/icons/delete_black_24dp.svg' alt="delete" /></button>
                </div>
            </div>
            {toggle ?
                <div>
                    <form action="update" onSubmit={editMethod}>
                        <div>
                            <div><input required type="text" className="" id="name" placeholder="Name"></input></div>
                            <div><input required type="text" className="" id="last_name" placeholder="LastName"></input></div>
                            <div><input required type="number" className="" id="dni" placeholder="DNI"></input></div>

                            <div className='addressForm'>
                                <div><input required type="text" className="" id="street" placeholder="Street"></input></div>
                                <div><input required type="number" className="" id="number" placeholder="Number"></input></div>
                                <div><input required type="text" className="" id="locality" placeholder="Locality"></input></div>
                                <div><input required type="text" className="" id="province" placeholder="Province"></input></div>
                            </div>
                            <input type="submit" value="update" className="btn btn-warning"/>
                        </div>
                    </form>
                </div> :
                null
            }
        </li>
    )
}
