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
