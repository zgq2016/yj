import axios from "../utils/myaxios.js";

// 账目类型新增接口
export const accountTypeAdd = (data) => {
  return axios({
    url: "?g=account_type_add",
    method: "post",
    data: data,
  });
};
// 账目类型list接口
export const accountTypeList = (data) => {
  return axios({
    url: "?g=account_type_list",
    method: "post",
    data: data,
  });
};
// 账目类型查看接口
export const accountTypeInfo = (data) => {
  return axios({
    url: "?g=account_type_info",
    method: "post",
    data: data,
  });
};
// 账目类型删除接口
export const accountTypeDel = (data) => {
  return axios({
    url: "?g=account_type_del",
    method: "post",
    data: data,
  });
};
// 账目类型编辑接口
export const accountTypeEdit = (data) => {
  return axios({
    url: "?g=account_type_edit",
    method: "post",
    data: data,
  });
};
// 账户类型select接口
export const balanceAccountTypeSelect = (data) => {
  return axios({
    url: "?g=balance_account_type_select",
    method: "post",
    data: data,
  });
};
// 新增结算账户接口
export const balanceAccountAdd = (data) => {
  return axios({
    url: "?g=balance_account_add",
    method: "post",
    data: data,
  });
};
// 结算账户list接口
export const balanceAccountList = (data) => {
  return axios({
    url: "?g=balance_account_list",
    method: "post",
    data: data,
  });
};
// 查看结算账户接口;
export const balanceAccountInfo = (data) => {
  return axios({
    url: "?g=balance_account_info",
    method: "post",
    data: data,
  });
};
// 编辑结算账户接口;
export const balanceAccountEdit = (data) => {
  return axios({
    url: "?g=balance_account_edit",
    method: "post",
    data: data,
  });
};
// 删除结算账户接口;
export const balanceAccountDel = (data) => {
  return axios({
    url: "?g=balance_account_del",
    method: "post",
    data: data,
  });
};

// balance_account_type_select;
// 账户类型select接口;

// balance_account_list;
// 结算账户list接口;

// balance_account_add;
// 新增结算账户接口;

// balance_account_info;
// 查看结算账户接口;

// balance_account_edit;
// 编辑结算账户接口;

// balance_account_del;
// 删除结算账户接口;
