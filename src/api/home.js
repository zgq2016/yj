import axios from "../utils/myaxios.js";

// 快捷键信息
export const shortcutKeyList = data => {
  return axios({
    url: "?g=shortcut_key_list",
    method: "post",
    data: data
  });
};
// 
// 新增用户快捷键接口
export const shortcutKeyUserAdd = data => {
  return axios({
    url: "?g=shortcut_key_user_add",
    method: "post",
    data: data
  });
};
// 删除用户快捷键接口
export const shortcutKeyUserDel = data => {
  return axios({
    url: "?g=shortcut_key_user_del",
    method: "post",
    data: data
  });
};
// 用户快捷键信息
export const shortcutKeyUserList = data => {
  return axios({
    url: "?g=shortcut_key_user_list",
    method: "post",
    data: data
  });
};

// 首页公司公告接口
export const noticeIndexList = data => {
  return axios({
    url: "?g=notice_index_list",
    method: "post",
    data: data
  });
};

// 
// 提醒信息list接口
export const warnList = data => {
  return axios({
    url: "?g=warn_list",
    method: "post",
    data: data
  });
};
// 提醒信息list接口
export const mouthWorkStatus = data => {
  return axios({
    url: "?g=mouth_work_status",
    method: "post",
    data: data
  });
};
