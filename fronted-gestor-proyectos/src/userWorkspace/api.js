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
  },
  actualizar: (issueId,data) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
      url: `${apiPath}/issues/${issueId}`,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${user.jwt}`
      },
      data
    };
    
    return axios(options)
      .then(() => {
          return true;
      })
      .catch(() => {
          return false;
      })
  },
  status: () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/issue-statuses`,
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