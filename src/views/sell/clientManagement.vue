<template>
  <div class="clientManagement" v-if="permission.indexOf('clientManagement')!=-1">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>销售</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 条件 -->
    <div class="form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.keyword" placeholder="公司名称关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.contacts" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button> -->
          <el-button
            icon="el-icon-search"
            size="mini"
            circle
            class="search_button"
            @click="onSubmit"
          ></el-button>
        </el-form-item>
      </el-form>
      <!-- 新增项目 -->
      <div class="addStyle" v-if="permission.indexOf('customer_add')!=-1">
        <div @click="addClient">新增客户</div>
      </div>
    </div>

    <!-- table -->
    <div class="table" v-if="permission.indexOf('get_customer_list')!=-1">
      <el-table ref="singleTable" :data="tableData" highlight-current-row>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="companyname" label="公司" width="200"></el-table-column>
        <el-table-column property="contacts" label="联系人" width="200"></el-table-column>
        <el-table-column property="phone" label="电话" width="200"></el-table-column>
        <el-table-column
          label="操作"
          v-if="permission.indexOf('get_customer_info')!=-1"
          align="right"
        >
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
      total: 0,
      permission: [],
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
        ...obj,
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
  },
  mounted() {
    this.init();
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
    console.log(this.power);
  },
};
</script>

<style lang="less" scoped>
.clientManagement {
  .form {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/ .el-input__inner {
      width: 100%;
      height: 30px;
      background-color: #f2f2f2;
      border-radius: 15px;
      border: none;
      color: #5e5e5e;
      font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
        \\5b8b\4f53, sans-serif;
    }
    .search_button {
      margin-left: 10px;
      background-color: #000;
    }
    /deep/ .el-icon-search {
      color: #fff;
    }
    /deep/.el-button {
      border: none;
    }
  }
  .addStyle {
    margin: 0 30px 0px 0px;
    border-radius: 15px;
    width: 120px;
    height: 30px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    &:hover {
      cursor: pointer;
    }
  }
  .table {
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
  }
  .check {
    cursor: pointer;
  }
  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>