<template>
  <div class="clientManagement" v-if="power.indexOf('D1000400')!=-1">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件 -->
    <div class="form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="公司">
          <el-input v-model="form.companyname" placeholder="公司名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增项目 -->
    <div class="addStyle" v-if="power.indexOf('D1000100')!=-1">
      <div @click="addClient">新增客户</div>
    </div>
    <!-- table -->
    <div class="table">
      <el-table ref="singleTable" :data="tableData" highlight-current-row>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="companyname" label="公司" width="200"></el-table-column>
        <el-table-column property="contacts" label="联系人" width="200"></el-table-column>
        <el-table-column property="phone" label="电话" width="200"></el-table-column>
        <el-table-column label="操作" align="right">
          <!-- 插槽：匿名插槽，具名插槽，数据插槽 -->
          <template v-slot="scope">
            <div @click="handleEdit(scope.row)" class="check">查看</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getCustomerList } from "@/api/sell.js";
export default {
  data() {
    return {
      power: "",
      form: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 9,
      total: 0
    };
  },
  methods: {
    addClient() {
      this.$router.push({ name: "AddClient" });
    },
    handleEdit(e) {
      let { id } = e;
      this.$router.push({ path: `/check?id=${id}` });
    },
    onSubmit() {
      // console.log(this.form);
      this.init(this.form);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init(obj) {
      let res = await getCustomerList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    }
  },
  mounted() {
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  }
};
</script>

<style lang="less" scoped>
.clientManagement {
  .form {
    padding: 20px 100px 30px 20px;
  }
  .addStyle {
    margin: 0 30px 30px 0;
    text-align: right;
    div {
      width: 140px;
      height: 30px;
      background-color: #ccc;
      border-radius: 12px;
      padding: 10px 40px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #000;
        cursor: pointer;
      }
    }
  }
  .check {
    cursor: pointer;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>