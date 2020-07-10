import axios from "../utils/myaxios.js";

// 物料分类接口
export const getMaterialsClass = (data) => {
  return axios({
    url: "?g=get_materials_class",
    method: "post",
    data: data,
  });
};
// 新增物料分类接口
export const materialsClassAdd = (data) => {
  return axios({
    url: "?g=materials_class_add",
    method: "post",
    data: data,
  });
};
// 供应商list接口
export const getSupplierList = (data) => {
  return axios({
    url: "?g=get_supplier_list",
    method: "post",
    data: data,
  });
};
// 新增供应商接口
export const supplierAdd = (data) => {
  return axios({
    url: "?g=supplier_add",
    method: "post",
    data: data,
  });
};
// 银行名称select接口
export const getBankNameSelect = (data) => {
  return axios({
    url: "?g=get_bank_name_select",
    method: "post",
    data: data,
  });
};
// 银行名称select接口
export const getSupplierInfo = (data) => {
  return axios({
    url: "?g=get_supplier_info",
    method: "post",
    data: data,
  });
};
// 物料分类资料接口
export const getMaterialsClassInfo = (data) => {
  return axios({
    url: "?g=get_materials_class_info",
    method: "post",
    data: data,
  });
};
// 物料分类编辑接口
export const getMaterialsClassEdit = (data) => {
  return axios({
    url: "?g=get_materials_class_edit",
    method: "post",
    data: data,
  });
};
// 删除物料分类接口
export const materialsClassDel = (data) => {
  return axios({
    url: "?g=materials_class_del",
    method: "post",
    data: data,
  });
};
// 编辑供应商接口
export const supplierEdit = (data) => {
  return axios({
    url: "?g=supplier_edit",
    method: "post",
    data: data,
  });
};
// 编辑供应商接口
export const supplierDel = (data) => {
  return axios({
    url: "?g=supplier_del",
    method: "post",
    data: data,
  });
};
// 物料卡list接口
export const getMaterialsList = (data) => {
  return axios({
    url: "?g=get_materials_list",
    method: "post",
    data: data,
  });
};
// 计量单位select接口
export const getUnitSelect = (data) => {
  return axios({
    url: "?g=get_unit_select",
    method: "post",
    data: data,
  });
};
// 供应商select接口
export const getSupplierSelect = (data) => {
  return axios({
    url: "?g=get_supplier_select",
    method: "post",
    data: data,
  });
};
// 颜色select接口
export const getColorSelect = (data) => {
  return axios({
    url: "?g=get_color_select",
    method: "post",
    data: data,
  });
};
// 新增工艺卡接口
export const materialsAdd = (data) => {
  return axios({
    url: "?g=materials_add",
    method: "post",
    data: data,
  });
};
// 详细工艺卡接口
export const getMaterialsInfo = (data) => {
  return axios({
    url: "?g=get_materials_info",
    method: "post",
    data: data,
  });
};
// 删除工艺卡接口
export const materialsDel = (data) => {
  return axios({
    url: "?g=materials_del",
    method: "post",
    data: data,
  });
};
// 编辑工艺卡接口
export const materialsEdit = (data) => {
  return axios({
    url: "?g=materials_edit",
    method: "post",
    data: data,
  });
};
// 材质select接口
export const getMaterialSelect = (data) => {
  return axios({
    url: "?g=get_material_select",
    method: "post",
    data: data,
  });
};
