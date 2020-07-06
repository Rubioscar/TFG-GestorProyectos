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
          return response.data;
        })
        .catch(e => {
            return false;
        })
    }
}

export default usuario;