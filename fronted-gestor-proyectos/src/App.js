import React, {useState } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import UserContext from './common/autentificacion/context/UserContext';
import PrivateRoute from './common/autentificacion/PrivateRoutes';
import Login from "./common/pages/login";
import Home from "./userWorkspace/pages/home";

function App() {
  const [signedIn, updateUser] = useState(JSON.parse(localStorage.getItem("userData")) ? true : false);

  return (
    <UserContext.Provider value={{signedIn, updateUser}}>
      <Switch>
        <Route exact path="/">
          {signedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>        
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
