// import "regenerator-runtime/runtime";
import axios from "axios";
let cors_api_url = 'http://localhost:3001/';

async function APIRequest(options, timeout = 0) {
  let request = null;
  switch (options.method) {
    case "GET":
      request = await axios
        .get(`${cors_api_url}${options.url}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return response;
        });
      break;
    case "POST":
      request = await axios
        .post(`${cors_api_url}${options.url}`, options.data, {
          headers: {
            // form-encoded
            "Content-Disposition": "multipart/form-data",
            "Accept": "application/json",
          },
        })
        .then((response) => {
          return response;
        });
      break;
    case "PUT":
      request = await axios
        .put(`${cors_api_url}${options.url}`, options.data, {
          headers: {
            "Content-Disposition": "multipart/form-data",
          },
        })
        .then((response) => {
          return response;
        });
      break;
    case "DELETE":
      request = await axios
        .delete(`${cors_api_url}${options.url}`, {
          headers: {
            "Content-Disposition": "multipart/form-data",
          },
        })
        .then((response) => {
          return response;
        });
      break;
    default:
      return null;
  }
  return request;
}

export default APIRequest;
