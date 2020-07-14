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
    },
    find: () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const options = {
      url: `${apiPath}/projects`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        'users.id': user.user.id
      }
    };
    
    return axios(options)
      .then(response => {
          return response.data;
      })
  },
    nuevo: (data) => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const options = {
      url: `${apiPath}/projects`,
      method: 'POST',
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
  },
  actualizar: (data, id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/projects/${id}`,
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
  findOne: (id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/issues/${id}`,
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
  nuevo: (data) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
      url: `${apiPath}/issues`,
      method: 'POST',
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
  },
  types: () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/issue-types`,
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

export const files = {
  save: (files, setProgress) => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const formPayload = new FormData()
      formPayload.append('files', files[0])
      const options = {
        url: `${apiPath}/upload`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`
        },
        data: formPayload,
        onUploadProgress: progress => {
          const { loaded, total } = progress

          const percentageProgress = Math.floor((loaded / total) * 100)
          setProgress(percentageProgress);
        },
      };
        
      return axios(options)
        .then(response => {
          return response.data;
      })
    },
  delete: (id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const options = {
    url: `${apiPath}/upload/files/${id}`,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${user.jwt}`
    }, 
  };
  
  return axios(options)
    .then(() => {
        return true;
    })
  }   
}

export const users = {
  all: () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const options = {
      url: `${apiPath}/users`,
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

export const workFlow = {
  all: () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const options = {
      url: `${apiPath}/work-flows`,
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