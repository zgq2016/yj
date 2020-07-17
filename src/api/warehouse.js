import axios from "../utils/myaxios.js";

// 新增仓库接口
export const storehouseAdd = data => {
    return axios({
        url: "?g=storehouse_add",
        method: "post",
        data: data
    });
};
// 编辑仓库接口
export const storehouseEdit = data => {
    return axios({
        url: "?g=storehouse_edit",
        method: "post",
        data: data
    });
};
// 删除仓库接口
export const storehouseDel = data => {
    return axios({
        url: "?g=storehouse_del",
        method: "post",
        data: data
    });
};
// 查看仓库接口
export const storehouseList = data => {
    return axios({
        url: "?g=storehouse_list",
        method: "post",
        data: data
    });
};
// 物料入库list接口
export const materialStockOrderList = data => {
    return axios({
        url: "?g=material_stock_order_list",
        method: "post",
        data: data
    });
};

// 物料入库物料信息list接口
export const materialStockOrderListInfo = data => {
    return axios({
        url: "?g=material_stock_order_list_info",
        method: "post",
        data: data
    });
};
// 物料入库物料信息编辑接口
export const materialStockOrderListEdit = data => {
    return axios({
        url: "?g=material_stock_order_list_edit",
        method: "post",
        data: data
    });
};