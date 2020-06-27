<template>
  <div class="addClient">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增客户</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- form -->
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyname"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" style="padding:10px 50px;border-radius: 15px;">保存</el-button>
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
      }
    };
  },
  methods: {
    async onSubmit() {
      let res = await getCustomerAdd(this.form);
      // console.log(res)
      this.$router.go(-1)
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