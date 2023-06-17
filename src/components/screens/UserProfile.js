import React, { useEffect, useState ,useContext} from "react";
import {UserContext}from '../../App'
import { useParams } from "react-router";
const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
 
  const {state , dispatch} = useContext(UserContext);
  const {userid}=useParams();
  
  const [showFollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
 
  useEffect(()=>{
     fetch(`/user/${userid}`,{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         //console.log(result)
       
          setProfile(result)
     })
  },[])


 const followUser = ()=>{
     fetch('/follow',{
         method:"put",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem('jwt')
         },
         body:JSON.stringify({
             followId:userid
         })
     }).then(res=>res.json())
     .then(data=>{
     
         dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
          localStorage.setItem("user",JSON.stringify(data))
          console.log(data);
          setProfile((prevState)=>{
              return {
                  ...prevState,
                  user:{
                      ...prevState.user,
                      followers:[...prevState.user[0].followers,data._id]
                     }
              }
          })
          setShowFollow(false)
     })
 }
 const unfollowUser = ()=>{
     fetch('/unfollow',{
         method:"put",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem('jwt')
         },
         body:JSON.stringify({
             unfollowId:userid
         })
     }).then(res=>res.json())
     .then(data=>{
         
         dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
          localStorage.setItem("user",JSON.stringify(data))
          
         
          setProfile((prevState)=>{
             const newFollower = prevState.user[0].followers.filter(item=>item != data._id )
              return {
                  ...prevState,
                  user:{
                      ...prevState.user,
                      followers:newFollower
                     }
              }
          })
          setShowFollow(true)
          
     })
 }

  
  
  return (
    <>
    {userProfile ? <div style={{ maxWidth: "550px", margin: "0px auto" }}>
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
            src={userProfile.user[0].pic}
          ></img>
        </div>
        <div>
          <h4>{userProfile.user[0].name}</h4>
          <h5>{userProfile.user[0].email}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "109%",
            }}
          >
            <h6>{userProfile.posts.length} posts</h6>
            <h6>{userProfile.user[0].followers.length} follower</h6>
            <h6>{userProfile.user[0].following.length} following</h6>
          </div>
          {showFollow ?<button style={{margin:'10px'}} className="btn " onClick={()=>followUser()}>
        Follow
  </button>:<button style={{margin:'10px'}} className="btn " onClick={()=>unfollowUser()}>
        Unfollow
  </button>}
          
  
        </div>
      </div>

      <div className="gallery">
        {userProfile.posts.map((item) => {
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
    </div>:<h2>loading...</h2>}
    
    </>
  );
};
export default UserProfile;
