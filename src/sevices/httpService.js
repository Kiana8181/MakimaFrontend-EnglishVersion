import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectError) {
    logger.log(error);
    toast.error("خطای غیر منتظره ای رخ داده است");
  }

  return Promise.reject(error);
});

// export function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  //   setJwt,
};