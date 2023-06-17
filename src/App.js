import React, { useEffect, createContext , useReducer ,useContext} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch ,useHistory} from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/Createpost";
import UserProfile from "./components/screens/UserProfile"
import SubscribedUserPost from "./components/screens/SuscribedUserPost"
import {initialState, reducer} from './reducers/userReducer'

export const UserContext = createContext();
const Routing = () => {

  const history = useHistory();
  const {state , dispatch}= useContext(UserContext)
  useEffect(()=>{
const user = JSON.parse(localStorage.getItem('user'))
if(user){
  dispatch({type :'USER' , payload :user})
  
}else{
  history.push('./signin')
}

  } , [])
  return (
    <Switch>
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route path="/signin">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route exact path="/profile">
        <Profile></Profile>
      </Route>
      <Route path="/createpost">
        <CreatePost></CreatePost>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile></UserProfile>
      </Route>
      <Route path="/myfollowingsposts">
       <SubscribedUserPost></SubscribedUserPost>
      </Route>
    </Switch>
  );
};

function App() {
  const [state , dispatch] = useReducer(reducer , initialState)
  return (
    <UserContext.Provider  value={{state , dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing></Routing>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
