import axios from "../utils/myaxios.js";
export const userlogin = data => {
  return axios({
    url: "?g=login",
    method: "post",
    data: data
  });
};
