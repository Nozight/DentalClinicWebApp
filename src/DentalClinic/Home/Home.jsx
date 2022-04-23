import axios from "axios";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

const Home = () => {
    // LOGGED ?
    const [logged, setLogged] = useState(false);

    //NOT LOGGED 
    const [section, setSection] = useState("");
    const sectLogin = () => { setSection("login") }
    const sectRegister = () => { setSection("register") }
    return (
        <div className="homeBg">
            {logged ?
                "in progress" :
                <div className="welcome">
                    <h1 className="m-3">Welcome the Dental Clinic App</h1>
                    {section === "login" ? <Login /> : section === "register" ? <Register /> :
                        <div>
                            <p>Please login to proceed</p>
                            <div className="welcome-btns-secc">
                                <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectLogin}>Login</button>
                                <button href="" className="btn btn-primary m-3 py-2 px-3" onClick={sectRegister}>Register</button>
                            </div>
                        </div>
                    }
                </div>
            }

        </div>

    )
}
export default Home;