import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

const List = () => {
    //SEARCH ALL
    const [list, setList] = useState([{ name: "Name", last_name: "Lastname", enrollment: "123456" }, { name: "Name", last_name: "Lastname", enrollment: "123456" }, { name: "Name", last_name: "Lastname", enrollment: "123456" }]);
    const [backUp, setBackUp] = useState([{ name: "Name", last_name: "Lastname", enrollment: "123456" }, { name: "Name", last_name: "Lastname", enrollment: "123456" }, { name: "Name", last_name: "Lastname", enrollment: "123456" }]) //in case filter() dosent find anything and has already changed the og list
    // const [loading, setLoading] = useState(false); // Not enough time response to need it
    const refresh = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/dentist/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setList(result)
                setBackUp(result)

            })
            .catch(error => {
                //setLoading(false);
                console.log('error', error)
                console.log(sessionStorage.getItem("jwt"));
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

        const filtredList = list.filter(dentist => dentist.name.toLowerCase() === searchBar.toLowerCase())//probar con ([_, v]) => v.name.includes(searchStr)
        filtredList.length === 0 ? setList(backUp) : setList(filtredList);
    }
    useEffect(() => {
        filter()
    }, [searchBar])
    //EDIT 
    const editDentist = (e) => {
        e.preventDefault()
        var dentistId = 0;
        let enrollment = e.target.enrollment.value
        console.log(e.target.enrollment.value);

        // GETTING DENTIST
        var getHeaders = new Headers();
        getHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

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
                updateDentist()
            })
            .catch(error => console.log('error', error));
        //UPDATING DENTIST 
        const updateDentist = () => {

            var putHeaders = new Headers();
            putHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
            putHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": dentistId,
                "name": `${e.target.name.value}`,
                "last_name": `${e.target.lastName.value}`,
                "enrollment": e.target.enrollment.value
            });

            var requestOptions = {
                method: 'PUT',
                headers: putHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:8080/api/dentist", requestOptions)
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

    return (

        <div className="card" style={{ width: "100%" }}>
            {/* SECTION LIST ------------------------------------------------------------------------*/}
            <div className="card-header flex space-between">
                <h2 className="mt-3">List of Dentists</h2>
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
                    {list.map((dentist, i) => {
                        return <ListItem key={"itemList" + i.toString()} dentist={dentist} i={i} editMethod={editDentist} />

                    })

                    }
                </ul>
            </div>
        </div>

    )
}

export default List;
