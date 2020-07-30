import axios from "../utils/myaxios.js";
// 新增生产批次
export const produceAdd = (data) => {
  return axios({
    url: "?g=produce_add",
    method: "post",
    data: data,
  });
};
// 新增生产批次(数组格式)
export const produceLotAdd = (data) => {
  return axios({
    url: "?g=produce_lotadd",
    method: "post",
    data: data,
  });
};
// 删除生产批次
export const produceDel = (data) => {
  return axios({
    url: "?g=produce_del",
    method: "post",
    data: data,
  });
};
// 新增生产明细
export const produceInfo = (data) => {
  return axios({
    url: "?g=produce_info",
    method: "post",
    data: data,
  });
};
// 款式颜色select
export const getStyleColorSelect = (data) => {
  return axios({
    url: "?g=get_style_color_select",
    method: "post",
    data: data,
  });
};
// 尺码select
export const getSizeSelect = (data) => {
  return axios({
    url: "?g=get_size_select",
    method: "post",
    data: data,
  });
};
// 增加批次下单信息
export const produceOrderAdd = (data) => {
  return axios({
    url: "?g=produce_order_add",
    method: "post",
    data: data,
  });
};
// 编辑批次下单信息
export const produceOrderEdit = (data) => {
  return axios({
    url: "?g=produce_order_edit",
    method: "post",
    data: data,
  });
};
// 删除批次下单信息
export const produceOrderDel = (data) => {
  return axios({
    url: "?g=produce_order_del",
    method: "post",
    data: data,
  });
};
// 显示批次下单信息
export const produceOrderInfo = (data) => {
  return axios({
    url: "?g=produce_order_info",
    method: "post",
    data: data,
  });
};
// 采购列表
export const produceOrderProcureList = (data) => {
  return axios({
    url: "?g=produce_order_procure_list",
    method: "post",
    data: data,
  });
};
// 新增采购物料信息
export const produceOrderProcureAdd = (data) => {
  return axios({
    url: "?g=produce_order_procure_add",
    method: "post",
    data: data,
  });
};
// 删除采购物料信息
export const produceOrderProcure_del = (data) => {
  return axios({
    url: "?g=produce_order_procure_del",
    method: "post",
    data: data,
  });
};
// 编辑采购物料信息
export const produceOrderProcureEdit = (data) => {
  return axios({
    url: "?g=produce_order_procure_edit",
    method: "post",
    data: data,
  });
};
// 新增采购日志信息
export const produceOrderProcureLogAdd = (data) => {
  return axios({
    url: "?g=produce_order_procure_log_add",
    method: "post",
    data: data,
  });
};
// 排单工厂select接口
export const getFactorySelect = (data) => {
  return axios({
    url: "?g=get_factory_select",
    method: "post",
    data: data,
  });
};
// 新增排单信息
export const produceFactoryOrderAdd = (data) => {
  return axios({
    url: "?g=produce_factory_order_add",
    method: "post",
    data: data,
  });
};
// 显示排单信息
export const produceFactoryOrderList = (data) => {
  return axios({
    url: "?g=produce_factory_order_list",
    method: "post",
    data: data,
  });
};
// 编辑排单信息
export const produceFactoryOrderEdit = (data) => {
  return axios({
    url: "?g=produce_factory_order_edit",
    method: "post",
    data: data,
  });
};
// 删除排单信息
export const produceFactoryOrderDel = (data) => {
  return axios({
    url: "?g=produce_factory_order_del",
    method: "post",
    data: data,
  });
};
// 新增裁剪信息
export const produceCutOrderAdd = (data) => {
  return axios({
    url: "?g=produce_cut_order_add",
    method: "post",
    data: data,
  });
};
// 显示裁剪信息
export const produceCutOrderList = (data) => {
  return axios({
    url: "?g=produce_cut_order_list",
    method: "post",
    data: data,
  });
};
// 编辑裁剪信息
export const produceCutOrderEdit = (data) => {
  return axios({
    url: "?g=produce_cut_order_edit",
    method: "post",
    data: data,
  });
};
// 删除裁剪信息
export const produceCutOrderDel = (data) => {
  return axios({
    url: "?g=produce_cut_order_del",
    method: "post",
    data: data,
  });
};
// 新增出货信息
export const produceCompleteAdd = (data) => {
  return axios({
    url: "?g=produce_complete_add",
    method: "post",
    data: data,
  });
};
// 显示出货信息
export const produceCompleteList = (data) => {
  return axios({
    url: "?g=produce_complete_list",
    method: "post",
    data: data,
  });
};
// 删除出货信息
export const produceCompleteDel = (data) => {
  return axios({
    url: "?g=produce_complete_del",
    method: "post",
    data: data,
  });
};
// 编辑出货信息
export const produceCompleteEdit = (data) => {
  return axios({
    url: "?g=produce_complete_edit",
    method: "post",
    data: data,
  });
};

// 显示生产下单批次list接口
export const getProduceList = (data) => {
  return axios({
    url: "?g=get_produce_list",
    method: "post",
    data: data,
  });
};
// 显示生产采购list接口
export const getProduceProcureList = (data) => {
  return axios({
    url: "?g=get_produce_procure_list",
    method: "post",
    data: data,
  });
};
// 显示生产排单list接口
export const getProduceFactoryList = (data) => {
  return axios({
    url: "?g=get_produce_factory_list",
    method: "post",
    data: data,
  });
};
// 显示生产裁剪list接口
export const getProduceCutList = (data) => {
  return axios({
    url: "?g=get_produce_cut_list",
    method: "post",
    data: data,
  });
};
// 显示生产出货list接口
export const getProduceCompleteList = (data) => {
  return axios({
    url: "?g=get_produce_complete_list",
    method: "post",
    data: data,
  });
};

// // 批次日志
// export const produceLogData = data => {
//     return axios({
//       url: "?g=produce_log_data",
//       method: "post",
//       data: data
//     });
//   };
