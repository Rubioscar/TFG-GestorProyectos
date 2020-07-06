import React, {useState} from "react";
import { useDispatch } from "react-redux";
import SimpleInput from "../components/inputs/simpleInput";
import "../assets/scss/login.scss";
import usuario from "../api";
import singInAction from '../actions/user';

const Login = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const singIn = () => {
    /* await usuario.singIn({user, password});
    console.log("no llega")
    */
   dispatch(singInAction({user, password}));
  }

  return (
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
        onClick={() => singIn()}
      >
        Sign in
      </button>
      <p className="forgot-password text-right">
        Forgot 
        {' '}
        <a href="#">password?</a>
      </p>
    </form>
  );
};

export default Login;
