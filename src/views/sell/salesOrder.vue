<template>
  <div class="salesOrder" v-if="power.indexOf('D2000100')!=-1">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="search_condition">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          style="position: relative;"
        >
          <el-form-item label="日期:">
            <el-date-picker
              v-model="formInline.ctime"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="客户:">
            <el-select v-model="formInline.user" size="small" clearable placeholder="客户">
              <el-option
                v-for="item in wests"
                :key="item.value"
                :label="item.companyname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="单号:">
            <el-input v-model="formInline.no" size="small" style="width:170px" placeholder="请输入单号"></el-input>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select v-model="formInline.state" size="small" clearable placeholder="状态">
              <el-option
                v-for="item in states"
                :key="item.value"
                :label="item.state"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            <el-button type="primary" size="small">批量打印</el-button>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="small"
          style="margin-bottom:15px;"
          @click="addSalesOrder"
        >新增订单</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          size="small"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          width="100%"
        >
          <el-table-column align="center" type="selection" width="45"></el-table-column>
          <el-table-column align="center" prop="states" label="状态"></el-table-column>
          <el-table-column align="center" label="日期" width="90">
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
          </el-table-column>
          <el-table-column align="center" prop="companyname" label="客户"></el-table-column>
          <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
          <el-table-column align="center" prop="storehouse_name" label="仓库"></el-table-column>
          <el-table-column align="center" prop="account_name" label="结算账户"></el-table-column>
          <el-table-column align="center" prop="pay_money" label="实付金额"></el-table-column>
          <el-table-column align="center" prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      power: "",
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
      },
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
        { state: "全部" },
        { state: "草稿", id: 0 },
        { state: "已出售", id: 1 },
        { state: "已撤销", id: 4 },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.init(this.formInline);
    },

    handleUser_id(e) {
      this.formInline.user_id = e;
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
        if (v.state == 0) {
          v.states = "草稿";
        } else if (v.state == 1) {
          v.states = "已出售";
        } else if (v.state === 4) {
          v.states = "已撤销";
          console.log(1);
        }
        this.wests.map((j, k) => {
          if (v.customer_id == j.id) {
            v.companyname = j.companyname;
            v.phone = j.phone;
          }
        });
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
    this.power = localStorage.getItem("power");
  },
};
</script>
<style lang="less" scoped>
.salesOrder {
  .main {
    margin: 20px;
    // .search_condition {
    //   .inquire {
    //     width: 100px;
    //     height: 40px;
    //     background-color: #000;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     border-radius: 50px;
    //     color: #fff;
    //     cursor: pointer;
    //     &:hover {
    //       background-color: blue;
    //     }
    //   }

    //   // /deep/.el-input__inner {
    //   //   width: 150px;
    //   // }
    // }
    .search_condition {
      .el-form {
        overflow: hidden;
      }
      .el-form-item {
        float: left;
      }
      .el-form-item:nth-child(1) {
        width: 300px;
      }
      .el-form-item:nth-child(2) {
        width: 250px;
      }
      .el-form-item:nth-child(3) {
        width: 220px;
      }
      .el-form-item:nth-child(4) {
        width: 250px;
      }
      margin-top: 20px;
      // /deep/.el-input {
      //   width: 80%;
      // }
      /deep/.el-date-editor--daterange {
        width: 250px;
        .el-range-separator {
          padding: 0;
        }
      }
      .table {
        overflow: hidden;
      }
    }
    // .elbtn {
    //   padding: 5px 30px;
    //   border-radius: 10px;
    // }
    .table {
      .img {
        width: 40px;
        height: 40px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>