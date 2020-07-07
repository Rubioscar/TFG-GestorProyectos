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

export default usuario;