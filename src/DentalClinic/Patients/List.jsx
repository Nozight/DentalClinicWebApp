import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

const List = () => {
    //SEARCH ALL
    const [list, setList] = useState([{ name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }, { name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }, { name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }]);
    const [backUp, setBackUp] = useState([{ name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }, { name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }, { name: "Name", last_name: "Lastname", dni: "4100568", admission_date: "2022-01-01", address: { street: "street", number: 123, locality: "locality", province: "province" } }]) //in case filter() dosent find anything and has already changed the og list
    // const [loading, setLoading] = useState(false); // Not enough time response to need it
    const refresh = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/patient/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setList(result)
                setBackUp(result)

            })
            .catch(error => {
                //setLoading(false);
                console.log('error', error)
                console.log(localStorage.getItem("jwt"));
            });
    }
    useEffect(() => {
        refresh()//start with the list updated
    }, [])//when the whole component List is updated

    //FILTER 
    const [searchBar, setSearchBar] = useState("")
    const updateSearch = (e) => { setSearchBar(e.target.value) }
    const filter = () => {
        console.log("searchBar update");

        const filtredList = list.filter(patient => patient.name.toLowerCase() === searchBar.toLowerCase())//probar con ([_, v]) => v.name.includes(searchStr)
        filtredList.length === 0 ? setList(backUp) : setList(filtredList);
    }
    useEffect(() => {
        filter()
    }, [searchBar])

    //EDIT 
    const editPatient = (e) => {
        e.preventDefault()

        let dni = e.target.dni.value

        // GETTING PATIENT
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
                updatePatient()
            })
            .catch(error => console.log('error', error));


        //UPDATING PATIENT 
        var patientId = 0;
        
        const updatePatient = () => {
            var putHeaders = new Headers();
        putHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
        putHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": patientId,
                "name": `${e.target.name.value}`,
                "last_name": `${e.target.last_name.value}`,
                "dni": e.target.dni.value,
                "address": {
                    "street": `${e.target.street.value}`,
                    "number": e.target.number.value,
                    "locality": `${e.target.locality.value}`,
                    "province": `${e.target.province.value}`
                }
            });

            var requestOptions = {
                method: 'PUT',
                headers: putHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:8080/api/patient", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(raw);
                    console.log(result)
                    refresh()
                })
                .catch(error => {
                    console.log(raw);
                    console.log('error', error)
                });
        }
    }

    return (

        <div className="card" style={{ width: "100%" }}>
            {/* SECTION LIST ------------------------------------------------------------------------*/}
            <div className="card-header flex space-between">
                <h2 className="mt-3">List of Patients</h2>
                {/* FILTER */}
                <div className="flex align">
                    <div className="collapse" id="collapseSearch">
                        <input required type="search" onChange={updateSearch} className="" id="searchBar" placeholder="Search"></input>
                    </div>
                    <p>
                        <button className="btn btn-dark mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSearch" aria-expanded="false" aria-controls="collapseExample">
                            <img src='/assets/icons/person_search_white_24dp.svg' alt="asd" />
                        </button>

                    </p>
                </div>
            </div>
            {/* LIST */}
            <div>
                <button onClick={refresh} className="btn btn-dark mt-2 mx-2 "><img src='/assets/icons/refresh_white_24dp.svg' alt="asd" /></button>
                <ul className="p-4">
                    {/* {loading? // Not enough time response to need it
                <div className="spinner-border text-info reg-loading" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>: */}
                    {list.map((patient, i) => {
                        return <ListItem key={"itemList" + i.toString()} patient={patient} i={i} editMethod={editPatient} />

                    })

                    }
                </ul>
            </div>
        </div>

    )
}

export default List;
