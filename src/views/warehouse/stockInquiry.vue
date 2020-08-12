<template>
  <!--  v-if="power.indexOf('C2000100')!=-1" -->
  <div class="stockInquiry">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>产品入库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input v-model="ruleForm.no" size="small" style="width:170px" placeholder="请输入单号"></el-input>
      <el-button icon="el-icon-search" size="mini" circle class="search_button" @click="onSubmit"></el-button>
    </div>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline" style="position: relative;">
      <el-form-item>
        <el-date-picker
          v-model="ruleForm.ctime"
          size="small"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="onSubmit"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select clearable size="small"  @change="onSubmit" v-model="ruleForm.factory_id" placeholder="请选择厂商">
          <el-option
            v-for="item in factorys"
            :key="item.id"
            :label="item.factory_name"
            :value="item.id"
          ></el-option>
          <el-pagination
            small
            layout="prev, pager, next"
            @size-change="handleSize1"
            @current-change="handleCurrent1"
            :total="total1"
          ></el-pagination>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select clearable  @change="onSubmit" v-model="ruleForm.state" size="small" placeholder="请选择状态">
          <el-option
            v-for="item in valueElement"
            :key="item.value"
            :label="item.name"
            :value="item.state"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="状态:"></el-form-item> -->
      <el-form-item>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <div class="addStyle" v-if="power.indexOf('C2000900')!=-1">批量打印</div>
          <div class="addStyle" v-if="power.indexOf('C2000400')!=-1" @click="addCreateWare">新增入库单</div>
        </div>
      </el-form-item>
    </el-form>
    <!-- <div class="box" style="margin-bottom:10px;">
      <el-button
        size="mini"
        @click="addCreateWare"
        type="primary"
        v-if="power.indexOf('C2000400')!=-1"
      >新增入库单</el-button>
    </div>-->
    <div class="table">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        size="small"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        width="100%"
      >
        <el-table-column align="center" type="selection" width="45"></el-table-column>
        <el-table-column align="center" prop="state_name" label="状态"></el-table-column>
        <el-table-column align="center" label="日期" width="90">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column align="center" prop="storehouse_name" label="仓库"></el-table-column>
        <el-table-column align="center" prop="factory_name" label="厂商名称"></el-table-column>
        <el-table-column align="center" prop="account_name" label="结算账户"></el-table-column>
        <el-table-column align="center" prop="pay_price" label="实付金额"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        style="float: right;"
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
  getProjectStyleList,
} from "@/api/researchDevelopment";
import {
  storehouseList,
  bookStockOrderList,
  bookStockOrderInfo,
  balanceAccountSelect,
  bookStockOrderAdd,
  bookStockOrderEdit,
  bookStockOrderDel,
  bookStockOrderSizeDel,
} from "@/api/warehouse.js";
import { factoryList } from "@/api/archives";
export default {
  data() {
    return {
      ruleForm: {},
      factorys: [], //厂商
      pageIndex1: 1,
      pageSize1: 10,
      total1: 0,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      power: "",
      valueElement: [
        { name: "全部", state: 5 },
        { name: "已入库", state: 1 },
        { name: "草稿", state: 0 },
        { name: "已撤销", state: 4 },
      ],
      tableData: [],
    };
  },
  methods: {
    // 厂商
    async factory() {
      let res = await factoryList({
        page_size: this.pageSize1,
        page: this.pageIndex1,
      });

      this.factorys = res.data.data;
      this.total1 = res.data.count;
      this.factorys.unshift({ factory_name: "全部", id: 0 });
    },
    handleSize1(val) {
      this.pageSize1 = val;
      this.factory();
    },
    handleCurrent1(val) {
      this.pageIndex1 = val;
      this.factory();
    },
    // 点击切换分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.init(this.ruleForm);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.ruleForm);
    },
    // 查看
    handleClick(row) {
      if (row.state == 1 || row.state == 4) {
        this.$router.push({
          path: `/stockInquiryDetails?id=${row.id}&state=${row.state}`,
        });
      } else {
        this.$router.push({
          path: `/stockInquiryDetailsAdd?id=${row.id}&state=${row.state}`,
        });
      }
    },
    // 查询
    onSubmit() {
      // console.log(this.ruleForm);
      this.pageIndex = 1;
      this.ruleForm.ctime_start = "";
      this.ruleForm.ctime_end = "";
      if (this.ruleForm.ctime) {
        this.ruleForm.ctime_start = this.ruleForm.ctime[0];
        this.ruleForm.ctime_end = this.ruleForm.ctime[1];
      }
      this.init(this.ruleForm);
    },
    // 新建入库单
    addCreateWare() {
      this.$router.push({
        path: `/stockInquiryDetailsAdd`,
      });
    },
    async init(obj) {
      // 数据类型 0草稿 1已入库 4已撤销
      let res = await bookStockOrderList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj,
      });
      this.tableData = res.data.data;
      this.total = res.data.count;
      console.log(res);
      this.tableData.map((v, i) => {
        v.ctime = v.ctime.substring(0, 10);
        if (v.state == 0) {
          v.state_name = "草稿";
        } else if (v.state == 1) {
          v.state_name = "已入库";
        } else if (v.state == 4) {
          v.state_name = "已撤销";
        }
      });
    },
  },
  mounted() {
    this.power = localStorage.getItem("power");
    this.factory();
    this.init();
  },
};
</script>

<style lang="less" scoped>
.stockInquiry {
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
}
</style>