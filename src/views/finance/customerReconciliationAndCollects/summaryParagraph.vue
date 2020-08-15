<template>
  <div class="summaryParagraph">
    <div class="form">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="position: relative;"
      >
        <el-form-item>
          <el-select clearable v-model="formInline.customer_id" placeholder="客户">
            <el-option
              v-for="item in wests"
              :key="item.id"
              :label="item.companyname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;justify-content: center;align-items: center;">
            <el-input
              clearable
              v-model="formInline.min"
              controls-position="right"
              @change="handleChange"
              placeholder="开始金额"
            ></el-input>
            <label for>至</label>
            <el-input
              clearable
              v-model="formInline.max"
              controls-position="right"
              @change="handleChange"
              placeholder="结束金额"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formInline.hide_empty">不显示无欠款客户</el-checkbox>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <el-button
              icon="el-icon-search"
              size="mini"
              circle
              class="search_button"
              @click="onSubmit"
            ></el-button>
            <div class="addStyle">收起统计数据</div>
            <div class="addStyle">导出</div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div class="main_top">
      <span>
        客户数：
        <em>{{n1}}</em>
      </span>
      <span>
        欠款客户数：
        <em>{{n2}}</em>
      </span>
      <span>
        欠款金额：
        <em>{{n1+n2}}</em>
      </span>
      <span>
        充值客户数：
        <em>{{n3}}</em>
      </span>
      <span>
        充值金额：
        <em>{{n1+n2}}</em>
      </span>
    </div>
    <div class="table">
      <el-table :data="tableData" border size="mini">
        <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="ctime" label="业务时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="companyname" label="客户"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="contacts" label="联系人"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="balance" label="欠款">
          <template slot-scope="scope">
            <div
              @click="handleDetail(scope.$index, scope.row)"
              style="cursor: pointer;color: blue;"
            >{{scope.row.balance}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getWestList } from "@/api/researchDevelopment";
import {
  // supplierAccountList,
  balanceAccountSelect,
  // supplierAccountAdd,
  customerAccountList,
  customerAccountAdd,
  balanceAccountTypeSelect,
  customerBalance,
} from "@/api/finance";
import { getSupplierSelect } from "@/api/archives";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      num1: 0,
      num2: 2,
      stylist: "",
      stylists: [],
      name: "",
      checked: false,
      n1: 465,
      n2: 65455,
      n3: 445,
      wests: [],
      tableData: [
        { data: 1 },
        { data: 2 },
        { data: 13 },
        { data: 14 },
        { data: 15 },
        { data: 15333333333333 },
      ],
      formInline: {
        customer_id: "",
        min: "",
        max: "",
        hide_empty: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formInline);
      this.supplierInit();
    },
    handleDetail(index, row) {
      console.log(row);
      this.$router.push({
        path: `/customerStatement?customer_id=${row.id}&companyname=${row.companyname}`,
      });
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      this.wests = data;
    },
    handleUser_id(e) {
      this.user_id = e;
    },
    handleChange(v) {
      console.log(v);
    },
    async supplierInit() {
      this.formInline["page"] = this.pageIndex;
      this.formInline["page_size"] = this.pageSize;
      let res = await customerBalance(this.formInline);
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.supplierInit();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.supplierInit();
    },
  },
  mounted() {
    this.getWest();
    this.supplierInit();
  },
};
</script>

<style lang="less" scoped>
.summaryParagraph {
  .main_top {
    margin-top: 15px;
    span {
      padding: 5px;
      float: left;
      width: 20%;
      text-align: center;
      border: 1px solid #cccccc;
      em {
        margin-left: 5px;
        font-size: 16px;
        color: crimson;
      }
    }
  }

  .el-icon-more {
    background-color: #f2f2f2;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  /deep/ .el-form-item__content {
    line-height: 30px;
  }
  /deep/ .el-range-editor /deep/ .el-range-input {
    background-color: #f2f2f2;
  }
  /deep/ .el-input__icon {
    line-height: 30px;
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
  .table {
    .img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
  }
  .form {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-pagination {
    margin: 20px;
    text-align: right;
  }
  .addStyle {
    margin: 0 0px 0px 30px;
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
}
</style>