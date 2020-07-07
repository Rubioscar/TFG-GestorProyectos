import React, {useState} from "react";
import { useDispatch } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import SimpleInput from "../inputs/simpleInput";
import "../../assets/scss/login.scss";
import usuario from '../../api';
import UserContext from '../../autentificacion/context/UserContext';
import history from "../../helper/history";
import { changePass } from '../../actions/user';

const Reset = () => {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setpasswordConfirmation] = useState(null);
  const [olvidado, setOlvidado] = useState(false);
  const dispatch = useDispatch();

  const forgot = async () => {
   const res = await usuario.forgot(email);
   setOlvidado(res);
  }

  const changePas = async (updateUser) => {
    await dispatch(changePass({code, password,passwordConfirmation, updateUser}));
    history.push("/home");
  }

  return (
    <UserContext.Consumer>
      {(value) => (
        <div>
          {!olvidado ? (
            <form>
              <h3>Change Password</h3>
              <div className="form-group">
                <label>Correo</label>
                <br />
                <SimpleInput
                  type="email"
                  value={email}
                  onChange={setEmail}
                  classInputName="form-control"
                  placeholder="Introduce email"
                />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block" 
                onClick={() => forgot()}
              >
                Enviar
              </button>
            </form>
 ) : (
   <form>
     <h3>Change Password</h3>
     <Alert variant='primary'>Revisa el correo para obtener el código</Alert>
     <div className="form-group">
       <label>Codigo</label>
       <br />
       <SimpleInput
         type="text"
         value={code}
         onChange={setCode}
         classInputName="form-control"
         placeholder="Introduce codigo"
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

     <div className="form-group">
       <label>Repite Contraseña</label>
       <br />
       <SimpleInput
         type="password"
         value={passwordConfirmation}
         onChange={setpasswordConfirmation}
         classInputName="form-control"
         placeholder="Introduce contraseña de nuevo"
       />
     </div>

     <button
       type="button"
       className="btn btn-primary btn-block" 
       onClick={() => changePas(value.updateUser)}
     >
       Cambiar
     </button>
   </form>
  )}
        </div>
  )}
    </UserContext.Consumer>
  );
};

export default Reset;
