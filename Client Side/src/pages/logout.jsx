import { useHistory } from "react-router-dom";


// Function to logout user and clear JWT token
export default function Logout() {

const history = useHistory()
window.localStorage.clear()

alert("You have successfully logged out.")
history.push("/")
window.location.reload()

    return (null)
    }
     
