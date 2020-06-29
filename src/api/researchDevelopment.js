import axios from "../utils/myaxios.js";

// 获取数据列表
export const getDataList = (data) => {
  return axios({
    url: "?g=get_project_list",
    method: "post",
    data: data,
  });
};
// 获取年
export const getYearList = (data) => {
  return axios({
    url: "?g=get_year_select",
    data: data,
  });
};
// 获取季节
export const getSeasonList = (data) => {
  return axios({
    url: "?g=get_season_select",
    data: data,
  });
};
// 获取设计师
export const getStylistList = (data) => {
  return axios({
    url: "?g=get_user_select",
    data: data,
  });
};
// 获取类别
export const getCategoryList = (data) => {
  return axios({
    url: "?g=get_style_type_select",
    data: data,
  });
};
// 获取西所
export const getWestList = (data) => {
  return axios({
    url: "?g=get_customer_select",
    data: data,
  });
};
// 新增项目接口
export const getAddProject = (data) => {
  return axios({
    url: "?g=project_add",
    method: "post",
    data: data,
  });
};
// 获取数据
export const getProject = (data) => {
  return axios({
    url: "?g=get_project",
    method: "post",
    data: data,
  });
};
// 编辑项目接口
export const projectEdit = (data) => {
  return axios({
    url: "?g=project_edit",
    method: "post",
    data: data,
  });
};
// 删除项目接口
export const projectDel = (data) => {
  return axios({
    url: "?g=project_del",
    method: "post",
    data: data,
  });
};
// 款式详细接口
export const getStyle = (data) => {
  return axios({
    url: "?g=get_style",
    method: "post",
    data: data,
  });
};
// 款式-基础信息编辑接口
export const styleEdit = (data) => {
  return axios({
    url: "?g=style_edit",
    method: "post",
    data: data,
  });
};
// 款式-备注图纸图片保存接口
export const styleDesignideaPicAdd = (data) => {
  return axios({
    url: "?g=style_designidea_pic_add",
    method: "post",
    data: data,
  });
};
// 款式-备注图纸图片保存接口
export const styleDesignideaPicDel = (data) => {
  return axios({
    url: "?g=style_designidea_pic_del",
    method: "post",
    data: data,
  });
};
// 款式-物料关键字搜索接口
export const getMaterialsSmalllist = (data) => {
  return axios({
    url: "?g=get_materials_smalllist",
    method: "post",
    data: data,
  });
};
// 款式-新增物料接口
export const styleMaterialsAdd = (data) => {
  return axios({
    url: "?g=style_materials_add",
    method: "post",
    data: data,
  });
};
// 项目-新增款式
export const projectStyleAdd = (data) => {
  return axios({
    url: "?g=project_style_add",
    method: "post",
    data: data,
  });
};
// 新增项目接口
export const getStyleno = (data) => {
  return axios({
    url: "?g=get_styleno",
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
// 项目-删除款式
export const styleDel = (data) => {
  return axios({
    url: "?g=style_del",
    method: "post",
    data: data,
  });
};
// 项目-获取款式
export const getProjectStyleList = (data) => {
  return axios({
    url: "?g=get_project_style_list",
    method: "post",
    data: data,
  });
};
// 项目-添加款式
export const projectStyleAddto = (data) => {
  return axios({
    url: "?g=project_style_addto",
    method: "post",
    data: data,
  });
};
// 项目-款式-物料列表(单颜色)
export const getStyleMaterialsList = (data) => {
  return axios({
    url: "?g=get_style_materials_list",
    method: "post",
    data: data,
  });
};
// 项目-款式-新增颜色
export const projectStyleColorAdd = (data) => {
  return axios({
    url: "?g=project_style_color_add",
    method: "post",
    data: data,
  });
};
// 项目-款式-新增颜色
export const projectStyleColorDel = (data) => {
  return axios({
    url: "?g=project_style_color_del",
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
// 项目-款式-新增物料
export const projectStyleMaterialsAdd = (data) => {
  return axios({
    url: "?g=project_style_materials_add",
    method: "post",
    data: data,
  });
};
// 项目-款式-新增物料
export const projectStyleMaterialsDel = (data) => {
  return axios({
    url: "?g=project_style_materials_del",
    method: "post",
    data: data,
  });
};
// 项目-款式-编辑物料(色号)
export const styleMaterialsListColorEdit = (data) => {
  return axios({
    url: "?g=style_materials_list_color_edit",
    method: "post",
    data: data,
  });
};
// 项目-款式-生成采购单
export const materialsProcureAdd = (data) => {
  return axios({
    url: "?g=materials_procure_add",
    method: "post",
    data: data,
  });
};
// 项目-款式-恢复物料
export const projectStyleMaterialsHfdel = (data) => {
  return axios({
    url: "?g=project_style_materials_hfdel",
    method: "post",
    data: data,
  });
};
// 项目-款式-已删除物料列表
export const getStyleMaterialsDellist = (data) => {
  return axios({
    url: "?g=get_style_materials_dellist",
    method: "post",
    data: data,
  });
};
// 项目-款式-物料采购列表(单颜色)
export const getMaterialsProcureList = (data) => {
  return axios({
    url: "?g=get_materials_procure_list",
    method: "post",
    data: data,
  });
};
// 项目-款式-恢复物料
export const styleMaterialsResume = (data) => {
  return axios({
    url: "?g=style_materials_resume",
    method: "post",
    data: data,
  });
};
// 项目-款式-恢复物料
export const projectStyleMaterialsListAdd = (data) => {
  return axios({
    url: "?g=project_style_materials_list_add",
    method: "post",
    data: data,
  });
};
// 项目-款式-恢复物料
export const stylePurchaseAdd = (data) => {
  return axios({
    url: "?g=style_purchase_add",
    method: "post",
    data: data,
  });
};
// 款式档案list列表
export const getStyleList = (data) => {
  return axios({
    url: "?g=get_style_list",
    method: "post",
    data: data,
  });
};
// 生成下单表
export const produceOrderCreateAdd = (data) => {
  return axios({
    url: "?g=produce_order_create_add",
    method: "post",
    data: data,
  });
};
// 生产下单list接口
export const getProduceOrderList = (data) => {
  return axios({
    url: "?g=get_produce_order_create_list",
    method: "post",
    data: data,
  });
};
// contacts、phone
// bank、bankid、name
