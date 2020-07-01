import axios from "../utils/myaxios.js";

// 商品分类list接口
export const goodsCategoryList = data => {
  return axios({
    url: "?g=goods_category_list",
    method: "post",
    data: data
  });
};
// 商品分类新增接口
export const goodsCategoryAdd = data => {
  return axios({
    url: "?g=goods_category_add",
    method: "post",
    data: data
  });
};
// 商品分类详细接口
export const goodsCategoryInfo = data => {
  return axios({
    url: "?g=goods_category_info",
    method: "post",
    data: data
  });
};
// 商品分类详细接口
export const goodsCategoryDel = data => {
  return axios({
    url: "?g=goods_category_del",
    method: "post",
    data: data
  });
};
// 商品分类编辑接口
export const goodsCategoryEdit = data => {
  return axios({
    url: "?g=goods_category_edit",
    method: "post",
    data: data
  });
};
// 颜色list列表接口
export const colorList = data => {
  return axios({
    url: "?g=color_list",
    method: "post",
    data: data
  });
};
// 颜色新增接口
export const colorAdd = data => {
  return axios({
    url: "?g=color_add",
    method: "post",
    data: data
  });
};
// 颜色详细接口
export const colorInfo = data => {
  return axios({
    url: "?g=color_info",
    method: "post",
    data: data
  });
};
// 颜色编辑接口
export const colorEdit = data => {
  return axios({
    url: "?g=color_edit",
    method: "post",
    data: data
  });
};
// 颜色删除接口
export const colorDel = data => {
  return axios({
    url: "?g=color_del",
    method: "post",
    data: data
  });
};
// 尺码list列表接口
export const sizeList = data => {
  return axios({
    url: "?g=size_list",
    method: "post",
    data: data
  });
};
// 尺码新增接口
export const sizeAdd = data => {
  return axios({
    url: "?g=size_add",
    method: "post",
    data: data
  });
};
// 尺码详细接口
export const sizeInfo = data => {
  return axios({
    url: "?g=size_info",
    method: "post",
    data: data
  });
};
// 尺码编辑接口
export const sizeEdit = data => {
  return axios({
    url: "?g=size_edit",
    method: "post",
    data: data
  });
};
// 尺码删除接口
export const sizeDel = data => {
  return axios({
    url: "?g=size_del",
    method: "post",
    data: data
  });
};
// 材质list列表接口
export const materialList = data => {
  return axios({
    url: "?g=material_list",
    method: "post",
    data: data
  });
};
// 材质新增接口
export const materialAdd = data => {
  return axios({
    url: "?g=material_add",
    method: "post",
    data: data
  });
};
// 材质编辑接口
export const materialEdit = data => {
  return axios({
    url: "?g=material_edit",
    method: "post",
    data: data
  });
};
// 材质删除接口
export const materialDel = data => {
  return axios({
    url: "?g=material_del",
    method: "post",
    data: data
  });
};
// 季节list列表接口
export const seasonList = data => {
  return axios({
    url: "?g=season_list",
    method: "post",
    data: data
  });
};
// 季节新增接口
export const seasonAdd = data => {
  return axios({
    url: "?g=season_add",
    method: "post",
    data: data
  });
};
// 季节编辑接口
export const seasonEdit = data => {
  return axios({
    url: "?g=season_edit",
    method: "post",
    data: data
  });
};
// 季节删除接口
export const seasonDel = data => {
  return axios({
    url: "?g=season_del",
    method: "post",
    data: data
  });
};
// 单位list列表接口
export const unitList = data => {
  return axios({
    url: "?g=unit_list",
    method: "post",
    data: data
  });
};
// 单位新增接口
export const unitAdd = data => {
  return axios({
    url: "?g=unit_add",
    method: "post",
    data: data
  });
};
// 单位编辑接口
export const unitEdit = data => {
  return axios({
    url: "?g=unit_edit",
    method: "post",
    data: data
  });
};
// 单位删除接口
export const unitDel = data => {
  return axios({
    url: "?g=unit_del",
    method: "post",
    data: data
  });
};

// 用户list接口
export const userList = data => {
  return axios({
    url: "?g=user_list",
    method: "post",
    data: data
  });
};
// 用户密码更新接口
export const userPassEdit = data => {
  return axios({
    url: "?g=user_pass_edit",
    method: "post",
    data: data
  });
};
// 角色列表接口
export const roleList = data => {
  return axios({
    url: "?g=role_list",
    method: "post",
    data: data
  });
};




