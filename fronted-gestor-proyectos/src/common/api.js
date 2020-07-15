import axios from "axios";
import apiPath from "./constants";

const usuario = {
    singIn: (form) => {
        const options = {
        url: `${apiPath}/auth/local`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          identifier: form.user,
          password: form.password
        }
      };
      
      return axios(options)
        .then(response => {
            localStorage.setItem("userData", JSON.stringify(response.data));
            form.updateUser(true);
            return response.data;
        })
    },
    forgot: (mail) => {
        const options = {
            url: `${apiPath}/auth/forgot-password`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              email: mail
            }
          };
          
          return axios(options)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    },
    reset: (form) => {
        const options = {
            url: `${apiPath}/auth/reset-password`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              code: form.code,
              password: form.password,
              passwordConfirmation: form.passwordConfirmation
            }
          };
          
          return axios(options)
            .then(response => {
                localStorage.setItem("userData", JSON.stringify(response.data));
                form.updateUser(true);
                return response.data;
            })
    }
}

export const email = {
  send: (obj) => {
    const options = {
        url: `${apiPath}/email`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          to: obj.email,
          from: 'GPO_TFG@strapi.io',
          subject: "Actualización Issue",
          html: `<div style="border: 1px solid; width: 40%;background-color: #e6e6e6;">
          <h4 style="margin-left: 10px;"><b>Editado por ${obj.user}</b></h4>
          <div style="padding: 2px 16px; background-color: white; margin: 10px">
          <h4 style="color: #5555ff;"><b>${obj.project}/${obj.title}</b></h4> 
          <p>${obj.descripcion}</p>
          <p>Status: <span style="background-color: #8af780"> ${obj.status}</span></p>
          </div>
          <p>Revisa esta issue en la web parea ver los cambios completos de la misma</p>
          </div>`
        }
      };
      
      return axios(options)
        .then(() => {
            return true;
        })
  } 
}

export default usuario;