import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './DentalClinic/Home/Home'
import Nav from "./DentalClinic/Nav/Nav";
import Dentists from './DentalClinic/Dentists/Dentists';
import Patients from './DentalClinic/Patients/Patients';
import Appointments from './DentalClinic/Appointments/Appointments';

function ViewDentalClinic() {
    // const [dentists,setDentists] = useState({});
    // const [patients,setPatients] = useState({});
    // const [appointments,setAppointments] = useState({});
   
    // async request(){// Esto es para avisarle que vamos a usar promesas
    //     await axios('https://pruebagcd.herokuapp.com/paquetes') //Same fetch pero ya lo parsea automaticamente a json
    //     .then(res => this.setState({
    //         paquetes:res.data
    //     }))
    // }
    
        return(
        <div className="App">
            <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dentists" element={ <Dentists/>}/> 
                <Route path="/patients" element={<Patients/>}/>
                <Route path="/patients" element={<Appointments/>}/>
            </Routes>
            </BrowserRouter>
        </div>
        )
    }


export default ViewDentalClinic;