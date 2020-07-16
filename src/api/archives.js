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



// 新增工厂接口
export const factoryAdd = (data) => {
  return axios({
    url: "?g=factory_add",
    method: "post",
    data: data,
  });
};
// 编辑工厂接口
export const factoryEdit = (data) => {
  return axios({
    url: "?g=factory_edit",
    method: "post",
    data: data,
  });
};
// 删除工厂接口
export const factoryDel = (data) => {
  return axios({
    url: "?g=factory_del",
    method: "post",
    data: data,
  });
};
// 工厂list接口
export const factoryList = (data) => {
  return axios({
    url: "?g=factory_list",
    method: "post",
    data: data,
  });
};

// 工厂加工方式select接口
export const getFactoryModeSelect = (data) => {
  return axios({
    url: "?g=get_factory_mode_select",
    method: "post",
    data: data,
  });
};

// 工厂加工方式
export const factoryModeAdd = (data) => {
  return axios({
    url: "?g=factory_mode_add",
    method: "post",
    data: data,
  });
};
// 工厂加工方式编辑接口
export const factoryModeEdit = (data) => {
  return axios({
    url: "?g=factory_mode_edit",
    method: "post",
    data: data,
  });
};
// 工厂加工方式删除接口
export const factoryModeDel = (data) => {
  return axios({
    url: "?g=factory_mode_del",
    method: "post",
    data: data,
  });
};
