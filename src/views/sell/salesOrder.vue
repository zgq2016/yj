<template>
  <div class="salesOrder" v-if="permission.indexOf('salesOrder') != -1">
    <!-- 面包屑 -->
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>销售</el-breadcrumb-item>
          <el-breadcrumb-item>销售订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="单据编号"
        v-model="formInline.no"
        clearable
        style="width: 200px"
      ></el-input>
      <el-button
        icon="el-icon-search"
        size="mini"
        circle
        class="search_button"
        @click="onSubmit"
      ></el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="position: relative"
    >
      <el-form-item>
        <el-date-picker
          v-model="formInline.ctime"
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
        <el-select
          v-model="formInline.customer_id"
          @change="onSubmit"
          size="small"
          clearable
          placeholder="客户"
        >
          <el-option
            v-for="item in wests"
            :key="item.value"
            :label="item.companyname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="formInline.state"
          @change="onSubmit"
          size="small"
          clearable
          placeholder="状态"
        >
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.state"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div
            class="addStyle"
            v-if="permission.indexOf('customer_order_add') != -1"
            @click="addSalesOrder"
          >
            新增订单
          </div>
          <div class="addStyle" style="background-color: #e3e3e3; color: #fff">
            批量打印
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        size="small"
        width="100%"
      >
        <el-table-column
          align="center"
          type="selection"
          width="45"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="states"
          label="状态"
        ></el-table-column>
        <el-table-column align="center" label="日期" width="90">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyname"
          label="客户"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="storehouse_name"
          label="仓库"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="account_name"
          label="结算账户"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="pay_money"
          label="实付金额"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注"
        ></el-table-column>
        <el-table-column
          fixed="right"
          v-if="permission.indexOf('customer_order_info') != -1"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getWestList,
  getStylistList,
  getCategoryList,
  getStyleList,
} from "@/api/researchDevelopment";
import {
  customerOrderList,
  customerOrderInfo,
  customerOrderAdd,
  customerOrderEdit,
  customerOrderDel,
  customerOrderSizeDel,
} from "@/api/sell";
export default {
  data() {
    return {
      formInline: {},
      user_id: "",
      tableData: [],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      obj: {},
      page: 1,
      page_size: 9,
      count: 0,
      stylist: "",
      states: [
        { state: "全部", id: 5 },
        { state: "草稿", id: 0 },
        { state: "已出售", id: 1 },
        { state: "已撤销", id: 4 },
      ],
      permission: [],
    };
  },
  methods: {
    onSubmit() {
      this.page = 1;
      this.formInline.ctime_start = "";
      this.formInline.ctime_end = "";
      if (this.formInline.ctime) {
        this.formInline.ctime_start = this.formInline.ctime[0];
        this.formInline.ctime_end = this.formInline.ctime[1];
      }
      this.init(this.formInline);
    },

    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
      // console.log(this.stylists);
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      this.categorys = data;
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      this.wests = data;
    },
    // 查看
    handleClick(row) {
      if (row.state == 1 || row.state == 4) {
        this.$router.push({
          path: `/salesOrderDetails?id=${row.id}&state=${row.state}`,
        });
      } else if (row.state == 0) {
        this.$router.push({
          path: `/salesOrderDetailsAdd?id=${row.id}&state=${row.state}`,
        });
      }
    },
    // 新增订单
    addSalesOrder() {
      this.$router.push({
        path: `/salesOrderDetailsAdd`,
      });
    },
    async init(obj) {
      let res = await customerOrderList({
        page: this.page,
        page_size: this.page_size,
        ...obj,
      });
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      // // console.log(this.tableData);
      this.tableData.map((v, i) => {
        v.ctime = v.ctime.substring(0, 10);
        if (v.state == 0) {
          v.states = "草稿";
        } else if (v.state == 1) {
          v.states = "已出售";
        } else if (v.state === 4) {
          v.states = "已撤销";
        }
      });
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.init(this.formInline);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init(this.formInline);
    },
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.init();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>
<style lang="less" scoped>
.salesOrder {
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