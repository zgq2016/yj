import axios from "../utils/myaxios.js";

// 获取数据列表
export const getCustomerList = (data) => {
  return axios({
    url: "?g=get_customer_list",
    method: "post",
    data: data,
  });
};
// 新增客户接口
export const getCustomerAdd = (data) => {
  return axios({
    url: "?g=customer_add",
    method: "post",
    data: data,
  });
};
// 编辑接口
export const getEdit = (data) => {
  return axios({
    url: "?g=customer_edit",
    method: "post",
    data: data,
  });
};
// 客户资料详细接口
export const getCustomer = (data) => {
  return axios({
    url: "?g=get_customer_info",
    method: "post",
    data: data,
  });
};
// 客户资料详细接口
export const customerDel = (data) => {
  return axios({
    url: "?g=customer_del",
    method: "post",
    data: data,
  });
};
// 销售订单列表
export const customerOrderList = (data) => {
  return axios({
    url: "?g=customer_order_list",
    method: "post",
    data: data,
   
  });
};
// 订单详情
export const customerOrderInfo = (data) => {
  return axios({
    url: "?g=customer_order_info",
    method: "post",
    data: data,
  });
};
// 订单详情
export const customerOrderAdd = (data) => {
  return axios({
    url: "?g=customer_order_add",
    method: "post",
    data: data,
  });
};
// 订单详情
export const customerOrderEdit = (data) => {
  return axios({
    url: "?g=customer_order_edit",
    method: "post",
    data: data,
  });
};
// 订单详情
export const customerOrderDel = (data) => {
  return axios({
    url: "?g=customer_order_del",
    method: "post",
    data: data,
  });
};
// 订单详情
export const customerOrderSizeDel = (data) => {
  return axios({
    url: "?g=customer_order_size_del",
    method: "post",
    data: data,
  });
};


