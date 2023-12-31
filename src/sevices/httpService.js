import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://makima-zue4.onrender.com/";

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectError) {
    logger.log(error);
    toast.error("An unexpected error has occurred");
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