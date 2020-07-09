import axios from "axios";
import apiPath from "../common/constants";

const project = {
    findOne: (id) => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const options = {
        url: `${apiPath}/projects/${id}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${user.jwt}`
        },
      };
      
      return axios(options)
        .then(response => {
            return response.data;
        })
    }
}

export const issue = {
  issues: (filter) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/issues${filter}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${user.jwt}`
    },
  };
  
  return axios(options)
    .then(response => {
        return response.data;
    })
}
}

export default project;