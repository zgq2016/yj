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


// 
// 产品入库订单list接口
export const bookStockOrderList = data => {
    return axios({
        url: "?g=book_stock_order_list",
        method: "post",
        data: data
    });
};
// 
// 产品入库订单详细接口
export const bookStockOrderInfo = data => {
    return axios({
        url: "?g=book_stock_order_info",
        method: "post",
        data: data
    });
};
// 结算账户select接口
export const balanceAccountSelect = data => {
    return axios({
        url: "?g=balance_account_select",
        method: "post",
        data: data
    });
};
// 新增产品入库订单接口
export const bookStockOrderAdd = data => {
    return axios({
        url: "?g=book_stock_order_add",
        method: "post",
        data: data
    });
};
// 编辑产品入库订单接口
export const bookStockOrderEdit = data => {
    return axios({
        url: "?g=book_stock_order_edit",
        method: "post",
        data: data
    });
};
// 
// 删除产品入库订单接口
export const bookStockOrderDel = data => {
    return axios({
        url: "?g=book_stock_order_del",
        method: "post",
        data: data
    });
};
// 删除产品入库订单指定商品接口
export const bookStockOrderSizeDel = data => {
    return axios({
        url: "?g=book_stock_order_size_del",
        method: "post",
        data: data
    });
};
// 产品库存查询
export const bookStockList = data => {
    return axios({
        url: "?g=book_stock_list",
        method: "post",
        data: data
    });
};
// 物料查询
export const materialStoreList = data => {
    return axios({
        url: "?g=material_store_list",
        method: "post",
        data: data
    });
};

// 物料采购查询
export const materialStoreDetail = data => {
    return axios({
        url: "?g=material_store_detail",
        method: "post",
        data: data
    });
};
// 物料库存的采购接口
export const materialsPurchase = data => {
    return axios({
        url: "?g=materials_purchase",
        method: "post",
        data: data
    });
};
// 物料流水
export const materialStoreRecord = data => {
    return axios({
        url: "?g=material_store_record",
        method: "post",
        data: data
    });
};