import "./signin.css";
import {Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {useState} from 'react';
export default function SignIn() {
  const dispatch = useDispatch();
  const [username,SetUsername] = useState('')
  const [password,SetPassword] = useState('')
  const loggedIn = useSelector((state) => state.isLoggedIn)
  function login(){
    return fetch('http://localhost:3001/api/v1/user/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:username,
        password:password
      })
    })
    .then ((response) => response.json()).then((result)=>{
      dispatch({type: "setToken", payload:result.body.token})
    }).catch((err)=> console.log(err))
  }
  if(loggedIn){
    return(
      <Navigate to='/user'/>
    )
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
      <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(event)=>SetUsername(event.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(event)=>SetPassword(event.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
            <button
              className="sign-in-button"
              type="button"
              onClick={login}>
              Sign In
            </button>
        </form>
      </section>
    </main>
  );
}

