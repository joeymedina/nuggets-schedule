import axios from "axios";
const url = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : "http://localhost:3000/"

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json"
  }
});