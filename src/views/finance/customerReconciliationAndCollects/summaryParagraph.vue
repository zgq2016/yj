<template>
  <div class="summaryParagraph">
    <div class="headers clearfix">
      <div class="client fl">
        <label for>客户：</label>
        <el-select v-model="stylist" placeholder="- 请选择 -" @change="handleUser_id($event)">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="classification fl">
        <label for>客户分类：</label>
        <el-select v-model="stylist" placeholder="- 请选择 -">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="arear fl">
        <label for>欠款金额：</label>
        <el-input-number v-model="num1" controls-position="right" @change="handleChange"></el-input-number>
        <label for>至</label>
        <el-input-number v-model="num2" controls-position="right" @change="handleChange"></el-input-number>
      </div>

      <div class="chenckb fl">
        <el-checkbox v-model="checked">不显示无欠款客户</el-checkbox>
      </div>

      <div class="btn fl" @click="handlesearch">
        <el-button type="primary">查询</el-button>
      </div>

      <div class="btn1 fl">
        <el-button type="primary" icon="el-icon-message">收起统计数据</el-button>
      </div>

      <div class="btn1 fl">
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
      </div>
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
        <el-table-column :show-overflow-tooltip="true" width="140" prop="ctime" label="业务时间"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="120" prop="account_no" label="单据编号"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="80" prop="user_name" label="操作人"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="100" prop="account_name" label="结算账户"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          width="90"
          prop="account_type_name"
          label="账目类型"
        ></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="90" prop="cope_price" label="应付金额"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="90" prop="pay_price" label="实付金额"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="100" prop="opay_price" label="本单应付余额"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          width="110"
          prop="total_price"
          label="累计应付款余额"
        ></el-table-column>
        <el-table-column :show-overflow-tooltip="true" width="130" prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="data" label="操作"></el-table-column>
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
import { getStylistList } from "@/api/researchDevelopment";
import {
  // supplierAccountList,
  balanceAccountSelect,
  // supplierAccountAdd,
  customerAccountList,
  customerAccountAdd,
  balanceAccountTypeSelect,
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
      tableData: [
        { data: 1 },
        { data: 2 },
        { data: 13 },
        { data: 14 },
        { data: 15 },
        { data: 15333333333333 },
      ],
    };
  },
  methods: {
    handleUser_id(e) {
      this.user_id = e;
    },
    handleChange(v) {
      console.log(v);
    },
    handlesearch() {
      var obj = {};
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      console.log(data);
      this.stylists = data;
    },
    async supplierInit() {
      let res = await customerAccountList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      // let { cope_price, pay_price, opay_price } = res.data.data;
      this.tableData = data;
      this.total = count;
      // this.ctime_start = moment(this.formInline.date[0]).format("YYYY-MM-DD");
      // this.ctime_end = moment(this.formInline.date[1]).format("YYYY-MM-DD");
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
    this.getStylist();
    this.supplierInit();
  },
};
</script>

<style lang="less" scoped>
.summaryParagraph {
  label {
    width: 40px;
    margin-right: 10px;
  }
  .headers {
    padding: 0px 10px 10px 5px;
    .client {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }
    .classification {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }
    .arear {
      margin-top: 10px;
      label {
        margin-left: 10px;
      }
    }
    .chenckb {
      margin-top: 20px;
      margin-right: 100px;
    }
    .btn {
      margin-top: 10px;
    }
  }
  .btn1 {
    margin-top: 15px;
    float: right;
  }

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

  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>