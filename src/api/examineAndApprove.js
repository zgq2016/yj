import axios from "../utils/myaxios.js";

export const getStyleApprove = (data) => {
  return axios({
    url: "?g=get_style_approve",
    method: "post",
    data: data,
  });
};
