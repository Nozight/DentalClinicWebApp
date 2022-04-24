
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

const Home = () => {
    // LOGGED ?
    const logged = sessionStorage.getItem("jwt") ===null ? false: true;
   
    //NOT LOGGED 
    const [section, setSection] = useState("");
    const sectLogin = () => { setSection("login") }
    const sectRegister = () => { setSection("register") }
    return (
        <div className="homeBg">
            {logged ?
                <div className="welcome">
                    <h1 className="m-3">Welcome the Dental Clinic App</h1>
                    <p>
                  This is a Beta version, all basic actions are functional but there known some bugs. 
                    </p>
                    <p>
                  Beware of the following malfunctions:
                    </p>
                    <ul>
                        <li>Avoid repeating unique keys DNI and Enrollment</li>
                        <li>Use the refresh button after each modification to the DB to see the data updated</li>
                        <li>USER is unable to access to apointments due to the use of methods of dentist and patients to avoid using id(maybe not the best choice)</li>
                    </ul>
                    <p>The users are ADMIN(username: root,pass:root) and USER(username:user,pass:user)</p>
                    <p>(You can navigate through funtionalitys from the nav)</p>
                    <p>Happy testing!</p>
                    {section === "login" ? <Login /> : section === "register" ? <Register /> :
                        <div>
                            
                            <div className="welcome-btns-secc">
                                <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectLogin}>Login</button>
                                {/* <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectRegister}>Register</button> */}
                            </div>
                        </div>
                    }
                </div>
                :
                <div className="welcome">
                    <h1 className="m-3">Welcome the Dental Clinic App</h1>
                    {section === "login" ? <Login /> : section === "register" ? <Register /> :
                        <div>
                            <p>Please login to proceed</p>
                            <div className="welcome-btns-secc">
                                <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectLogin}>Login</button>
                                {/* <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectRegister}>Register</button> */}
                            </div>
                        </div>
                    }
                </div>
            }

        </div>

    )
}
export default Home;