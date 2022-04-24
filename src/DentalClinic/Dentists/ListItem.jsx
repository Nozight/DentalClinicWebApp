import { useToggle } from "../Utils/useToggle"
export function ListItem({ dentist, i, editMethod }) {
    const [toggle, setToggle] = useToggle();
    const dEnrollment = dentist.enrollment;
    //DELETE 
    const deleteDentist = () => {
        // GETTING DENTIST
        var getHeaders = new Headers();
        getHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
            redirect: 'follow'
        };

        var oldDentist = {};
        var dentistId = 0;

        fetch(`http://localhost:8080/api/dentist/enrollment?enrollment=${dEnrollment}`, getRequestOptions)
            .then(response => response.json())
            .then(result => {
                oldDentist = result;
                console.log(result)
                dentistId = oldDentist.id;
                delDentist()
            })
            .catch(error => console.log('error', error));
        //DELETING DENTIST
        var deleteHeaders = new Headers();
        deleteHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

        var requestOptions = {
            method: 'DELETE',
            headers: deleteHeaders,
            redirect: 'follow'
        };
        const delDentist = () => {
console.log();
            fetch(`http://localhost:8080/api/dentist/${dentistId}`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
   }
    return (
        <li key={"dentist" + i.toString()} className="list-group-item">
            <div className=" d-flex justify-content-between align-items-start ms-2 me-auto list-item">
                <div>
                    <div className="fw-bold">{dentist.name + " " + dentist.last_name}</div>
                    <ul>
                        <li id="" >Enrollment: {dentist.enrollment}</li>
                    </ul>
                </div>

                <div className="align-self">
                    <button type="button" className="btn btn-warning mx-1 my-2" onClick={setToggle}><img src='/assets/icons/edit_black_24dp.svg' alt="update" /></button>
                    <button type="button" className="btn btn-danger mx-1 my-2" onClick={deleteDentist}><img src='/assets/icons/delete_black_24dp.svg' alt="delete" /></button>
                </div>
            </div>
            {toggle ?
                <div>
                <form action="update" onSubmit={editMethod}>
                    <input id="name" type="text" placeholder="Name"/>
                    <input id="lastName" type="text" placeholder="Lastname"/>
                    <input id="enrollment" type="number" placeholder={dEnrollment} value={dEnrollment} disabled/>
                    <input type="submit" value="update" className="btn btn-warning"/>
                </form>
            </div>:
            null
            }
        </li>
    )
}
