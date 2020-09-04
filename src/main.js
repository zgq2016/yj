import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/reset.css";
import myaxios from "./utils/myaxios.js";
Vue.prototype.axios = myaxios;
import App from "./App.vue";
import router from "./router";
import Print from "vue-print-nb";
import { store } from "./store/user";
// 注意 我使用的imageConversion版本为2.1.1，需要使用下面的形式导入
import * as imageConversion from "image-conversion";
import echarts from "echarts";
import VueCropper from "vue-cropper";
// *****************
import VueQuillEditor from "vue-quill-editor"; //调用编辑器
import Quill from "quill";
//加入以下引用
import ImageResize from "quill-image-resize-module"; // 引用
import { ImageDrop } from "quill-image-drop-module";
import { ImageExtend } from "quill-image-paste-module";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize); // 注册
Quill.register("modules/ImageExtend", ImageExtend); // 注册
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

// *********************
Vue.prototype.$echarts = echarts;
Vue.prototype.$elUploadBeforeUpload = function (file) {
  //图片大小超过4M,长度超过2000就压缩
  return new Promise((resolve, reject) => {
    let _URL = window.URL || window.webkitURL;
    let isLt2M = file.size / 1024 / 1024 > 0.5; // 判定图片大小是否小于0.5MB
    // 这里需要计算出图片的长宽
    let img = new Image();
    img.onload = function () {
      file.width = img.width; // 获取到width放在了file属性上
      file.height = img.height; // 获取到height放在了file属性上
      let valid = img.width > 1000; // 图片宽度大于2000
      console.log("压缩前", file);
      // 这里我只判断了图片的宽度,compressAccurately有多个参数时传入对象
      if (valid || isLt2M) {
        // 大小在500k以下，宽度1000以下
        imageConversion
          .compressAccurately(file, {
            size: 1000,
            width: 2000,
          })
          .then((res) => {
            console.log("压缩后", res);
            resolve(res);
          });
      } else {
        resolve(file);
      }
    }; // 需要把图片赋值
    img.src = _URL.createObjectURL(file);
  });
};
// 凡是路由请求都会经过这个前置导航守卫---中间件
router.beforeEach((to, from, next) => {
  // 判断是否有token，如果有，则继续，否则重定向到登陆
  var token = localStorage.getItem("itcast_pro_token");
  if (token || to.path == "/login") {
    next();
  } else {
    next({
      name: "Login",
    });
  }
});
Vue.config.productionTip = false;
Vue.use(Print);
Vue.use(ElementUI);
Vue.use(VueCropper);
new Vue({
  VueCropper,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
