<template>
  <div class="addClient">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/clientManagement' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增客户</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- form -->
    <div class="form">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item prop="companyname" label="公司名称">
          <el-input v-model="form.companyname"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="联系人">
          <el-input v-model="form.contacts"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="padding:10px 50px;border-radius: 15px;"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCustomerAdd } from "@/api/sell.js";
export default {
  data() {
    return {
      form: {
        companyname: "",
        contacts: "",
        phone: ""
      },
      rules: {
        companyname: [
          { required: true, message: "请输入公司名字", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入长度为11位的电话号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;

        let res = await getCustomerAdd(this.form);
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addClient {
  .form {
    margin-top: 20px;
    /deep/.el-input__inner {
      width: 300px !important;
    }
  }
}
</style>