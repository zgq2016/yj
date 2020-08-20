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
// 个人工作
export const myWork = data => {
  return axios({
    url: "?g=my_work",
    method: "post",
    data: data
  });
};
// 协助工作
export const myAssistWork = data => {
  return axios({
    url: "?g=my_assist_work",
    method: "post",
    data: data
  });
};
// 生产排单列表
export const getProduceFactoryList = data => {
  return axios({
    url: "?g=get_produce_factory_list",
    method: "post",
    data: data
  });
};
 
// 生产裁剪
export const getProduceCutList = data => {
  return axios({
    url: "?g=get_produce_cut_list",
    method: "post",
    data: data
  });
};
// 出货
export const getProduceCompleteList = data => {
  return axios({
    url: "?g=get_produce_complete_list",
    method: "post",
    data: data
  });
};
// 采购
export const getProduceProcureList = data => {
  return axios({
    url: "?g=get_produce_procure_list",
    method: "post",
    data: data
  });
};
