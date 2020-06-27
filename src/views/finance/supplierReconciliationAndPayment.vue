<template>
  <div class="supplierReconciliationAndPayment">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>供应商对账及付款</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main clearfix">
      <div class="supplier fl">
        <label for>供应商：</label>
        <el-select v-model="stylist" placeholder="- 全部 -" @change="handleUser_id($event)">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="date fl">
        <label for>日期：</label>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          :start-placeholder="ctime_start"
          :end-placeholder="ctime_end"
        ></el-date-picker>
      </div>
      <div class="accountType fl">
        <label for>账目类型：</label>
        <el-select v-model="category" placeholder="类别">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </div>
      <div class="settlement fl">
        <label for>结算账户：</label>
        <el-select v-model="category" placeholder="-请选择-">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </div>

      <div class="stylist fl">
        <label for>操作者：</label>
        <el-select v-model="stylist" placeholder="- 全部 -" @change="handleUser_id($event)">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="odd fl">
        <label for>单号：</label>
        <el-input placeholder="单据编号" v-model="odd" clearable></el-input>
      </div>

      <div class="btn fl" @click="handlesearch">
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <div class="btn fl">
        <el-button type="primary">付款</el-button>
      </div>
      <div class="btn fl">
        <el-button type="primary">期初调整</el-button>
      </div>
      <div class="btn fl">
        <el-button type="primary" v-print="'#printTest'" icon="el-icon-printer">打印</el-button>
      </div>
      <div class="btn fl">
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div id="printTest">
      <div class="header">
        <h2 style="text-align:center;height:40px;">供应商对账单</h2>
        <div class="cont">
          <span>供应商：何老板</span>
          <span>日期：{{this.ctime_start}} 至 {{this.ctime_end}}</span>
        </div>
        <div class="tb">
          <div class="dv">当前查询统计数据：</div>
          <div class="dv">
            应付金额
            <span style="color:orange;">{{money}}</span>
          </div>
          <div class="dv">
            实付金额
            <span style="color:orange;">{{money-900000009}}</span>
          </div>
          <div class="dv">
            应付余额
            <span style="color:orange;">{{money}}</span>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column fixed prop="data" label="操作"></el-table-column>
          <el-table-column fixed prop="data" label="业务时间"></el-table-column>
          <el-table-column fixed prop="data" label="单据编号"></el-table-column>
          <el-table-column fixed prop="data" label="操作人"></el-table-column>
          <el-table-column fixed prop="data" label="结算账户"></el-table-column>
          <el-table-column fixed prop="data" label="账目类型"></el-table-column>
          <el-table-column fixed prop="data" label="应付金额"></el-table-column>
          <el-table-column fixed prop="data" label="实付金额"></el-table-column>
          <el-table-column fixed prop="data" label="本单应付余额"></el-table-column>
          <el-table-column fixed prop="data" label="累计应付款余额"></el-table-column>
          <el-table-column fixed prop="data" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDataList,
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      data: [],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      date: "", //日期
      name: "", //名称
      year: "", //年
      season: "", //季节
      stylist: "", //设计师
      category: "", //类别
      west: "", //西所
      state: "", //状态
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      user_id: "",
      customer_id: "",
      stateId: "",
      odd: "", //单据编号
      their_name: "aaa", //账户所属门店
      remark: "", //备注
      tableData: [
        {
          data: "aa"
        },
        {
          data: "abcdefg"
        }
      ],
      money: "999999999"
    };
  },
  methods: {
    handleUser_id(e) {
      this.user_id = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      console.log(data);
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      console.log(data);
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      console.log(data);
      this.stylists = data;
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      console.log(data);
      this.categorys = data;
    },
    // 搜索
    async handlesearch() {
      var obj = {};
      // console.log(...this.date)
      obj["ctime_start"] = moment(this.date[0]).format("YYYY-MM-DD");
      obj["ctime_end"] = moment(this.date[1]).format("YYYY-MM-DD");
      obj["stylekeyword"] = this.name;
      obj["year"] = this.year;
      obj["season"] = this.season;
      obj["user_id"] = this.user_id;
      obj["style_type"] = this.category;
      obj["customer_id"] = this.customer_id;
      obj["state"] = this.stateId;
      obj["their_name"] = this.their_name;
      obj["odd"] = this.odd;
      obj["remark"] = this.remark;
      delete obj["0"];
      delete obj["1"];
      this.init(obj);
    },
    async init(obj) {
      let res = await getDataList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj
      });
      console.log(res);
      let { data, count } = res.data;
      this.data = data;
      this.total = count;
      this.ctime_start = moment(this.date[0]).format("YYYY-MM-DD");
      this.ctime_end = moment(this.date[1]).format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.init();
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
  }
};
</script>

<style lang="less" scoped>
.supplierReconciliationAndPayment {
  label {
    width: 40px;
    margin-right: 10px;
  }
  .tb {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 15px 0;
    .dv {
      border: 1px solid rgb(173, 219, 173);
      width: 25%;
      text-align: center;
      span {
        font-size: 18px;
      }
    }
  }
  .cont {
    span {
      float: left;
      width: 50%;
      text-align: center;
      margin: 10px 0;
    }
  }
  .main {
    padding: 20px 100px 30px 20px;
    /deep/.el-input__inner {
      width: 380px;
    }
    .stylist {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }
    .category {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .odd {
      display: flex;
      margin-top: 10px;
      label {
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /deep/.el-input__inner {
        width: 200px !important;
        margin-left: -4px;
      }
    }
    .remark {
      display: flex;
      margin-top: 10px;
      label {
        width: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /deep/.el-input__inner {
        width: 150px !important;
      }
    }
    .their {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .accountType {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .settlement {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .supplier {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }

    .btn,
    .date {
      margin-top: 10px;
    }
  }
  .table {
    /deep/table {
      th {
        .cell {
          text-align: center;
        }
      }
    }
  }
}
</style>