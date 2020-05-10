
import { useHistory } from "react-router-dom";


export default function Logout() {


const history = useHistory()
window.localStorage.clear()
alert("You have successfully logged out.")
history.push("/")
    return (null)
        
    }
    
    

