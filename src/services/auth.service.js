import axios from "axios";
const API_URL = "https://hankmern.herokuapp.com/api/user";

class AuthService{

    login(email,password){
        // return the Promise
        return axios.post(
            API_URL + "/login",
            {email,password}
        );
    }

    // remove the user storage,
    // No user that mean dosen't have JWT
    // No JWT No login
    logout(){
        localStorage.removeItem("user");
    }

    register(username,email,password,role){
        // return the Promise
        return axios.post(
            API_URL + "/reqister",
            {
                username,
                email,
                password,
                role
            }
        );
    }

    // for control nav bar depand on login or not
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();