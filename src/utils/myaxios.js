import axios from "axios";
import { Loading, Message } from "element-ui";
import _ from "lodash";

var myaxios = axios.create({
  baseURL: "https://yj.ppp-pay.top/webapi.php",
  timeout: 50000, //超时时长
});
//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "拼命加载中....",
      background: "#eee",
      target: target || "html",
    });
  }
  needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
  if (loading != null) {
    loading.close();
  }
  loading = null;
}, 100);

//添加请求拦截器
myaxios.interceptors.request.use(
  (config) => {
    //判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      showLoading(config.headers.loadingTarget);
    }
    return config;
  },
  (err) => {
    //判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      hideLoading();
    }
    Message.error("网络出错!");
    return Promise.resolve(err);
  }
);

//响应拦截器
myaxios.interceptors.response.use(
  (response) => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading();
    }
    return response;
  },
  (error) => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false) {
      hideLoading();
    }
    if (error.response && error.response.data && error.response.data.message) {
      // var jsonObj = JSON.parse(error.response.data.message);
      Message.error("网络出错！");
    } else {
      Message.error("网络出错！");
    }
    return Promise.reject(error);
  }
);

// 暴露成员
export default myaxios;
