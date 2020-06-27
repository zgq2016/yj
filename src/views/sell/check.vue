<template>
  <div class="Check">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看</el-breadcrumb-item>
    </el-breadcrumb>
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
          <!--   -->
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 15px;">保存</el-button>
          <el-button @click="handleDel" style="padding:10px 50px;border-radius: 15px;">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCustomer, getEdit, customerDel } from "@/api/sell.js";
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
    async handleEdit() {
      let res = await getEdit(this.form);
      console.log(res);
      this.$router.go(-1);
    },
    async handleDel() {
      let { id } = this.$route.query;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await customerDel({ id });
          this.$router.push({ name: "ClientManagement" });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  async mounted() {
    let id = this.$route.query.id - 0;

    let res = await getCustomer({ id });
    this.form = res.data.data;
    console.log(res);
  }
};
</script>

<style lang="less" scoped>
.Check {
  .form {
    margin-top: 20px;
    /deep/.el-input__inner {
      width: 300px !important;
    }
  }
}
</style>