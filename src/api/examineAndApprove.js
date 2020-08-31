import axios from "../utils/myaxios.js";

export const getStyleApprove = (data) => {
  return axios({
    url: "?g=get_style_approve",
    method: "post",
    data: data,
  });
};
export const isApproval = (data) => {
  return axios({
    url: "?g=is_approval",
    method: "post",
    data: data,
  });
};
export const approvalEdit = (data) => {
  return axios({
    url: "?g=approval_edit",
    method: "post",
    data: data,
  });
};
