import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

const List = () => {
    //SEARCH ALL
    const [list, setList] = useState([{ "id": 1, "appointment_date": "2022-01-01", "patient": { "id": 1, "name": "Name", "last_name": "LastNAme", "dni": "123", "admission_date": "2022-01-01", "address": { "id": 1, "street": "street", "number": "123", "locality": "locality", "province": "province" } }, "dentist": { "id": 1, "enrollment": 123, "name": "Name", "last_name": "LastName" } }]);
    const [backUp, setBackUp] = useState([{ "id": 1, "appointment_date": "2022-01-01", "patient": { "id": 1, "name": "Name", "last_name": "LastNAme", "dni": "123", "admission_date": "2022-01-01", "address": { "id": 1, "street": "street", "number": "123", "locality": "locality", "province": "province" } }, "dentist": { "id": 1, "enrollment": 123, "name": "Name", "last_name": "LastName" } }]) //in case filter() dosent find anything and has already changed the og list
    // const [loading, setLoading] = useState(false); // Not enough time response to need it
    const refresh = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/appointment/all", requestOptions)
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

        const filtredList = list.filter(appointment => appointment.appointment_date === searchBar)//probar con ([_, v]) => v.name.includes(searchStr)
        filtredList.length === 0 ? setList(backUp) : setList(filtredList);
    }
    useEffect(() => {
        filter()
    }, [searchBar])


    return (

        <div className="card" style={{ width: "100%" }}>
            {/* SECTION LIST ------------------------------------------------------------------------*/}
            <div className="card-header flex space-between">
                <h2 className="mt-3">List of Appointments</h2>
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
                    {list.map((appointment, i) => {
                        return <ListItem key={"itemList" + i.toString()} appointment={appointment} i={i} />

                    })

                    }
                </ul>
            </div>
        </div>

    )
}

export default List;
