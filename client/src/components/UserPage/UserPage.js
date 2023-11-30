import axios from "axios";

const UserPage = (props) =>{

    axios.get("http://localhost:8080/user?id=1")
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

    return(
    <div className = "">
        Hello
    </div>
    );
};

export default UserPage