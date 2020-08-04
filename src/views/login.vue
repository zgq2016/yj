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
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <el-form-item label="账户：" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { userlogin } from "@/api/user.js";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/;
      // 正则下面的test方法返回布尔值
      if (reg.test(value)) {
        // 验证通过
        callback();
      } else {
        callback("手机号码格式错误");
      }
    };
    return {
      form: {
        // username: "13822113535",
        // password: "123456"
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.$store.dispatch("login", this.form).then((res) => {
          if (res === true) {
            this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
          }
        });
      });
    },
  },
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
    // margin: 0 auto;
    
    
  }
}
</style>