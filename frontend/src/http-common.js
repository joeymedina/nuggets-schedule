import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});