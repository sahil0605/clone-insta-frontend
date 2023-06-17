
import React, { useState,useEffect } from "react";
import { useHistory   } from "react-router-dom";

import M from 'materialize-css'



const Signup = () => {
 
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [image,setImage]=useState("");
  // const[url ,setUrl]= useState(undefined);

  // useEffect(()=>{
  //     if(url){
  //       uploadFields();
  //     }
  // },[url])

  // const uploadPic=()=>{
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "insta-clone");
  //   data.append("cloud_name", "dv4a2jca4");
  //   fetch("https://api.cloudinary.com/v1_1/dv4a2jca4/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       //console.log(data.url);
  //       setUrl(data.url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const uploadFields=()=>{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({html: "Invalid email", classes:"#64b5f6 blue lighten-2"})
      return;
   }
   fetch("/signup", {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name,
       email,
       password,
      //  pic:url
     }),
   })
     .then((res) => res.json())
     .then((data) => {
       if(data.error){
         M.toast({html: data.error, classes:"#64b5f6 blue lighten-2"})
       }else{
         M.toast({html: data.message , classes:"#64b5f6 blue lighten-2"})
         history.push('./signin')
       
       }
     }).catch(err=>{
       console.log(err);
     });
  }
  const postData = () => {
    // if(image){
    //   uploadPic();
    
          uploadFields();
    
    
    
  };

  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
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
        {/* <div className="file-field input-field">
        <div className="btn">
          <span>Upload Profile</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div> */}
        <button className="btn " onClick={()=>postData()}>Signup</button>
        <h5>
          <a href="/signin">Already have an account ? </a>
        </h5>
      </div>
    </div>
  );
};
export default Signup;
