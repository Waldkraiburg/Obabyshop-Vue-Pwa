import axios from "axios";

const baseUrl = "http://obabyshop-backend.test/wp/wp-json";

export default {
  get: (path) => {
    // redirect if 401 error
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.data.data.status === 401) {
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
    const token = localStorage.getItem("user-token");
    // Pass token as Bearer Authentification header to every API call
    let headers = {};
    if (token !== null) {
      headers = {
        Authorization: "Bearer " + token,
      };
    }
    return axios.get(baseUrl + path, {
      headers,
    });
  },
  post: (path, data) => {
    const token = localStorage.getItem("user-token");
    let headers = {};
    if (token !== null) {
      headers = {
        Authorization: "Bearer " + token,
      };
    }
    return axios.post(baseUrl + path, data, {
      headers,
    });
  },
  delete: (path, data) => {
    const token = localStorage.getItem("user-token");
    let headers = {};
    if (token !== null) {
      headers = {
        Authorization: "Bearer " + token,
      };
    }
    return axios.delete(
      baseUrl + path,
      {
        headers,
      },
      data
    );
  },
  postfile: (path, data) => {
    const token = localStorage.getItem("user-token");
    let headers = {};
    if (token !== null) {
      headers = {
        Authorization: "Bearer " + token,
        "Content-Disposition": 'form-data; filename="' + data.name + '"',
        "Content-Type": "multipart/form-data",
      };
    }
    var formData = new FormData();
    formData.append("file", data);
    return axios.post(baseUrl + path, formData, {
      headers,
    });
  },
};
