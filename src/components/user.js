import { useSelector,useDispatch } from "react-redux";
import {useState} from 'react'
import "./user.css";
import {Navigate } from "react-router-dom";

export default function User() {
  const user = useSelector((state)=> state.user)
  const auth = useSelector((state)=> state.token)
  const [firstName,SetFirstName] = useState('')
  const [lastName,SetLastName] = useState('')
  const [changeInfo,setChangeInfo] = useState(false)
  const dispatch = useDispatch();
  if(auth == undefined){
    return <Navigate to='/index'/>
  }
  if(user == undefined){
    GetUser()
  
  function GetUser(){
    return fetch('http://localhost:3001/api/v1/user/profile',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + auth,
        'Content-Type': 'application/json'},
    })
    .then ((response) => response.json()).then((result)=>{
      dispatch({type: "setUser", payload:result.body})
    }).catch((err)=> console.log(err))
  }}
  if(user != undefined){
  return (
    <main className="main bg-dark">
      
      {changeInfo == false ?(
        <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}
        </h1>
        <button className="edit-button" onClick={()=> setChangeInfo(true)}>Edit Name</button>
        </div>
      ) : (
        <div className="header">
        <h1>
        Welcome back
          <br />
          <input type="text" id="firstName" onChange={(event)=>SetFirstName(event.target.value)} placeholder={user.firstName}/>
          <input type="text" id="lastName" onChange={(event)=>SetLastName(event.target.value)} placeholder={user.lastName}/>
          </h1>
          <button className="edit-button" onClick={()=>{
            return fetch('http://localhost:3001/api/v1/user/profile',{
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer' + auth,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      })
    })
    .then ((response) => response.json()).then((result)=>{
      dispatch({type: "setUser", payload:result.body})
    }).catch((err)=> console.log(err)).finally(setChangeInfo(false))
  }
          }>Save</button> <button className="edit-button" onClick={()=> setChangeInfo(false)}>Cancel</button>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="184.30"
        description="Current Balance"
      />
    </main>
  );}
}

function Account(props) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.title}</h3>
        <p className="account-amount">${props.amount}</p>
        <p className="account-amount-description">{props.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
