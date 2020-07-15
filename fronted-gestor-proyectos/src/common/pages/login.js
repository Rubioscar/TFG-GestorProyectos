import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../components/inputs/simpleInput";
import UserContext from '../autentificacion/context/UserContext';
import history from "../helper/history";
import "../assets/scss/login.scss";
import { singInAction } from '../actions/user';
import Reset from "../components/login/resetPassword";
import Alert from 'react-bootstrap/Alert';
import Load from "../utils/Load";

const Login = () => {
  const isLoading = useSelector(state => state.userData.isLoading);
  const error = useSelector(state => state.userData.error);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [reset, setReset] = useState(null);
  const dispatch = useDispatch();

  const singIn = async (updateUser) => {
   await dispatch(singInAction({user, password, updateUser}));
   history.push("/home");
  }

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className="auth-wrapper">
          <div className="auth-inner">
            {!reset ? (
              <form>
                <h3>Sign In</h3>

                <div className="form-group">
                  <label>Usuario</label>
                  <br />
                  <SimpleInput
                    type="text"
                    value={user}
                    onChange={setUser}
                    classInputName="form-control"
                    placeholder="Introduce usuario"
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <br />
                  <SimpleInput
                    type="password"
                    value={password}
                    onChange={setPassword}
                    classInputName="form-control"
                    placeholder="Introduce contraseña"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block" 
                  onClick={() => singIn(value.updateUser)}
                >
                  Sign in
                </button>
                <p className="forgot-password text-right">
                  Forgot 
                  {' '}
                  <a href="" onClick={() => setReset(true)}>password?</a>
                </p>
              </form>
          ) : <Reset /> }
          { isLoading && (
            <Load />
          )}
          { error && (
            <Alert variant='danger'>Usuario o contrseña incorrectos</Alert>
          )}
          </div>
        </div>
    )}
    </UserContext.Consumer>
  );
};

export default Login;
