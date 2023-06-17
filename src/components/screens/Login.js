import React ,{useState , useContext}from "react";
import {Link, useHistory } from "react-router-dom";
import M from 'materialize-css'
import {UserContext} from '../../App'


const Login = () => {
  const {state , dispatch}= useContext(UserContext)
  const history = useHistory();
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = () => {
    
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       M.toast({html: "Invalid email", classes:"#64b5f6 blue lighten-2"})
       return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        if(data.error){
          M.toast({html: data.error, classes:"#64b5f6 blue lighten-2"})
        }else{
          console.log(data)
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:'USER' , payload:data.user})
          M.toast({html: "Signed in successfully" , classes:"#64b5f6 blue lighten-2"})
          history.push('./')
          
        
        }
      }).catch(err=>{
        console.log(err);
      });
    
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
       <h2 className="brand-logo">Instagram</h2>
       <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
       <button className="btn " onClick={()=>postData()}>
        Login
  </button>
  <h5><Link to="/signup">Don't have an account ? </Link></h5>
      </div> 
    </div>
  );
};
export default Login;
