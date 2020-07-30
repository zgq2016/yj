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
// 供应商账目list接口;
export const supplierAccountList = (data) => {
  return axios({
    url: "?g=supplier_account_list",
    method: "post",
    data: data,
  });
};
// 结算账户select接口;
export const balanceAccountSelect = (data) => {
  return axios({
    url: "?g=balance_account_select",
    method: "post",
    data: data,
  });
};
// 新增供应商账目接口;
export const supplierAccountAdd = (data) => {
  return axios({
    url: "?g=supplier_account_add",
    method: "post",
    data: data,
  });
};
// 新增供应商账目接口;
export const factoryAccountAdd = (data) => {
  return axios({
    url: "?g=factory_account_add",
    method: "post",
    data: data,
  });
};
// 客户账目list接口;
export const customerAccountList = (data) => {
  return axios({
    url: "?g=customer_account_list",
    method: "post",
    data: data,
  });
};
// 新增客户账目接口;
export const customerAccountAdd = (data) => {
  return axios({
    url: "?g=customer_account_add",
    method: "post",
    data: data,
  });
};
// 账户余额接口;
export const balanceAccountBalance = (data) => {
  return axios({
    url: "?g=balance_account_balance",
    method: "post",
    data: data,
  });
};
// 1账户类型select接口;
export const accountTypeSelect = (data) => {
  return axios({
    url: "?g=account_type_select",
    method: "post",
    data: data,
  });
};
// 新增公司账目接口;
export const myAccountAdd = (data) => {
  return axios({
    url: "?g=my_account_add",
    method: "post",
    data: data,
  });
};
// 公司账目list接口;
export const myAccountList = (data) => {
  return axios({
    url: "?g=my_account_list",
    method: "post",
    data: data,
  });
};
// 结算方式select接口;
export const settlementModesSelect = (data) => {
  return axios({
    url: "?g=settlement_modes_select",
    method: "post",
    data: data,
  });
};
// 交易类型select接口;
export const transactionTypeSelect = (data) => {
  return axios({
    url: "?g=transaction_type_select",
    method: "post",
    data: data,
  });
};

// supplier_account_add;
// 新增供应商账目接口;

//   supplier_id,
//   account_no,
//   `user_id`,
//   balance_account_id,
//   account_type_id,
//   cope_price,
//   pay_price,
//   opay_price,
//   total_price,
//   remarks;

// 传入数值;

// customer_account_list;
// 客户账目list接口;

// customer_account_add;
// 新增客户账目接口;

// my_account_list;
// 公司账目list接口;

// my_account_add;
// 新增公司账目接口;
