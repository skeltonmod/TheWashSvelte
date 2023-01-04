import "regenerator-runtime/runtime";
import axios from "axios";
// It just appends the API request
let cors_api_url = "https://thewashapi-production.up.railway.app/api";
export class Api {
  static instance;

  axiosInstance = null;

  constructor() {
    
    this.axiosInstance = axios.create({
      // timeout: 30000,
      baseURL: cors_api_url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Set interceptors
    this.axiosInstance.interceptors.request.use(
      (config) => {

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios() {
    return Api.getInstance().axiosInstance;
  }

  static get(url, params, config) {
    return Api.getAxios().get(url, { params, ...config });
  }

  static post(url, data, config) {
    // console.log("data req ====>", data);
    return Api.getAxios().post(url, data, config);
  }
  static delete(url, params = {}, config = {}) {
    return Api.getAxios().delete(url, { params, ...config });
  }
}
