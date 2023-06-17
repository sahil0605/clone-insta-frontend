import React, { useEffect, useState ,useContext} from "react";
import {UserContext}from '../../App'
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const {state , dispatch} = useContext(UserContext);
  const [image,setImage]=useState("");
  const[url ,setUrl]= useState("");
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
       
       // console.log(state)
        setPics(result.mypost);
      });
  }, []);

  const updatePhoto=()=>{
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dv4a2jca4");
    fetch("https://api.cloudinary.com/v1_1/dv4a2jca4/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ?state.pic :"loading..."}
          ></img>
        </div>
        <div>
        
          <h4>{state ? state.name :"loading"}</h4>
          <h5>{state ? state.email :"loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "109%",
            }}
          >
            
            <h6>{mypics.length} posts </h6>
            <h6>{state && state.followers ? state.followers.length : "loading"} follower </h6>
          <h6>{state && state.following ? state.following.length : "loading"} following</h6>
          </div>
        </div>
        
      </div>
      {/* <div className="file-field input-field">
        <div className="btn">
          <span>Upload Profile</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div> */}
      
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            ></img>
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
