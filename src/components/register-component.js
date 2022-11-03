import React from "react";
import AuthService from "../services/auth.service";
import { useState } from "react";
import { useHistory } from "react-router";

const RegisterComponent = () => {
  const history = useHistory();
  let [username,setUsername] = useState("");
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let [role,setRole] = useState("");
  let [message,setMessage] = useState("");

  const handleChangeUsername = (e) =>{
    setUsername(e.target.value); // get input value
  }

  const handleChangeEmail = (e) =>{
    setEmail(e.target.value); // get input value
  }

  const handleChangePassword = (e) =>{
    setPassword(e.target.value); // get input value
  }

  const handleChangeRole = (e) =>{
    console.log(e.target.value);
    setRole(e.target.value); // get input value
  }

  const handleRegister = () =>{
    console.log("handleRegister");
    AuthService.register(username,email,password,role).then(() =>{
      window.alert("Registration succeeds. You are now redirected to the login page");
      history.push("/login"); // redirect to login page
    })
    .catch(error =>{
      console.log(error.response);
      setMessage(error.response.data);
    })
  }
  
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
          {
            message && (
              <div className="alert alert-danger"> {message} </div>
            )
          }
        <div>
          <label htmlFor="username">Username</label>
          <input onChange={handleChangeUsername} type="text" className="form-control" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input onChange={handleChangeEmail} type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input  onChange={handleChangePassword} type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">role</label>
          <input list="rolelist" onChange={handleChangeRole} type="text" className="form-control" name="role" />
          <datalist id="rolelist">
                <option value="instructor">instructor</option>
                <option value="student">student</option>
          </datalist>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
