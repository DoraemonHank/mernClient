import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../services/auth.service";

const LoginComponent = ({currentUser,setCurrentUser}) => {
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () =>{
    AuthService.login(email,password).then(response =>{
      // response is an Object whitch has JWT
      console.log(response); // data => success , token(JWT) and user
      if(response.data.token){
        localStorage.setItem("user",JSON.stringify(response.data));
      }
      window.alert("Login successfully. Yor are now redirected to the profile page.");
      setCurrentUser(AuthService.getCurrentUser());
      history.push("/profile"); // when login success redirect to profile page
    })
    .catch(error =>{
      console.log(error.response);
      setMessage(error.response.data); // error handling like register 
    })
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
