import React, {useState} from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import UserContext from './common/autentificacion/context/UserContext';
import PrivateRoute from './common/autentificacion/PrivateRoutes';
import Login from "./common/pages/login";
import store from "./store";

function App() {
  const [signedIn, updateUser] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <UserContext.Provider value={{signedIn, updateUser}}>
          <Route exact path="/">
            {!signedIn ? <Redirect to="/login" /> : <Login />}
          </Route>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Route path="/login" component={Login} />
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    </Provider>
  );
}

export default App;
