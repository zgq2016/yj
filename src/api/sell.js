import axios from "../utils/myaxios.js";

// 获取数据列表 
export const getCustomerList = data => {
  return axios({
    url: "?g=get_customer_list",
    method: "post",
    data: data
  });
};
// 新增客户接口 
export const getCustomerAdd = data => {
  return axios({
    url: "?g=customer_add",
    method: "post",
    data: data
  });
};
// 编辑接口 
export const getEdit = data => {
  return axios({
    url: "?g=customer_edit",
    method: "post",
    data: data
  });
};
// 客户资料详细接口
export const getCustomer = data => {
  return axios({
    url: "?g=get_customer_info",
    method: "post",
    data: data
  });
};
// 客户资料详细接口
export const customerDel = data => {
  return axios({
    url: "?g=customer_del",
    method: "post",
    data: data
  });
};