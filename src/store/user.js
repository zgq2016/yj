import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/myaxios.js";

import router from "../router/index";
Vue.use(Vuex);
// 保存user下的数据
const state = () => ({
  // name: "某jack"

  // 登录后的数据，包含token和user对象
  userInfo: {},
});

// 同步修改state的数据
const mutations = {
  // 自定义一个函数，修改name属性
  // mutations函数的第一个参数必须是state，state就是上面的state对象
  // setName(state, data){
  //     // 函数的修改方式是为了方便修改的其他逻辑
  //     state.name = data;
  // }

  // 修改userInfo
  setUserInfo(state, data) {
    state.userInfo = data;
  },
};

// 异步修改state的数据，存放公共的请求函数，并且该函数可能会修改state的数据（不一定要修改）
const actions = {
  // 登录函数可能会复用，会多个地方调用到，刚好该函数请求完成后修改state中userInfo
  login(store, data) {
    // 登录接口提交, (必要要添加return)
    return axios({
      url: "?g=login",
      method: "POST",
      data,
    }).then((res) => {
      console.log(res);
      // console.log(window.document.cookie)
      // console.log(window)
      // console.log(window.document);
      // router.push({ name: "homepage" });
      // 调用user下的mutations的方法
      store.commit("setUserInfo", res.data.data);
      localStorage.setItem("power", this.state.userInfo.power);
      localStorage.setItem("user_id", this.state.userInfo.id);
      localStorage.setItem("itcast_pro_token", res.data.data.token);
      localStorage.setItem("level", res.data.data.level);
      router.push({ name: "Index" });
      return true;
    });
    
  },
};
export const store = new Vuex.Store({ router, state, mutations, actions });
