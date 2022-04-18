import { useEffect, useState } from "react";
import axios from 'axios';
const List = () => {
    //SEARCH ALL
    const [list, setList] = useState([{ name: "Name", last_name: "Lastname", enrollment: "-" }]);
    const [backUp, setBackUp] = useState([{ name: "Name", last_name: "Lastname", enrollment: "-" }]) //in case filter() dosent find anything and has already changed the og list
    // const [loading, setLoading] = useState(false); // Not enough time response to need it
    const refresh = () => {
        // setLoading(true);
        axios.get('http://localhost:8080/api/dentist/all')
            .then(response => {
                setList(response.data);
                setBackUp(response.data);
                //setLoading(false);
            })
            .catch(error => {
                console.log(error);
                //setLoading(false);

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

        const filtredList = list.filter(dentist => dentist.name.toLowerCase() === searchBar.toLowerCase())
        filtredList.length === 0 ? setList(backUp) : setList(filtredList);
    }
    useEffect(() => {
        filter()
    }, [searchBar])
    //EDIT 
    const editDentist = () =>{

    }
    //DELETE 
    const deleteDentist = () => {
        
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
                        return (
                            <li key={"dentist" + i.toString()} className="list-group-item d-flex justify-content-between align-items-start relative">
                                <div className="ms-2 me-auto ">
                                    <div className="fw-bold">{dentist.name + " " + dentist.last_name}</div>
                                    <ul>
                                        <li>Enrollment: {dentist.enrollment}</li>

                                    </ul>
                                    <div className="edit-btns">
                                        <button type="button" className="btn btn-warning mx-1 my-2" onClick={editDentist}><img src='/assets/icons/edit_black_24dp.svg' alt="update" /></button>
                                        <button type="button" className="btn btn-danger mx-1 my-2" onClick={deleteDentist}><img src='/assets/icons/delete_black_24dp.svg' alt="delete" /></button>
                                    </div>

                                </div>
                            </li>
                        )

                    })

                    }
                </ul>
            </div>
        </div>

    )
}

export default List;
