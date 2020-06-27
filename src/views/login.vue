<template>
  <div class="login">
    <div class="main">
      <div class="logo">
        <img src="../assets/logo.jpg" alt />
        <div>
          <div class="title">衣家</div>
          <div class="comtent">服装行业Saas模式管理系统</div>
        </div>
      </div>
      <div class="form">
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <el-form-item label="账户：">
            <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    aaa
  </div>
</template>

<script>
import { userlogin } from "@/api/user.js";
export default {
  data() {
    return {
      loginForm: {
        // username: "13822113535",
        // password: "123456"
      }
    };
  },
  methods: {
    async login() {
      let res = await userlogin(this.loginForm);
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(!myreg.test(this.loginForm.username)){
        this.$message.error("请输入正确的账号！");
      }else{
        if (res.data.error_code === 0) {
          this.$message.success(res.data.msg);
          this.$router.push({ name: "Index" });
        } else {
          this.$message.error(res.data.msg);
        }

      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  .main {
    width: 500px;
    height: 400px;
    margin: 200px auto;
    .logo {
      width: 300px;
      height: 100px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      .title {
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .comtent {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
    }
    .form {
      padding: 50px 40px;
      /deep/ button {
        padding: 10px 50px;
        background-color: #000;
        border-radius: 50px;
        color: #fff;
        &:hover {
          background-color: blue;
        }
      }
     
    }
  }
  /deep/ .el-form-item__content {
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
 
}
</style>