<template>
  <div class="accountFlowAndBookkeeping">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>账户流水及记账</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <div class="condition clearfix">
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

      <div class="their fl">
        <label for>账户所属门店：</label>
        <el-select v-model="category" placeholder="- 全部 -">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </div>

      <div class="category fl">
        <label for>交易类型：</label>
        <el-select v-model="category" placeholder="- 全部 -">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </div>

      <div class="remark fl">
        <label for>备注：</label>
        <el-input placeholder="备注" v-model="remark" clearable></el-input>
      </div>

      <div class="btn fl" @click="handlesearch">
      </div>
      <div class="btn fl">
      </div>
      <div class="btn fl">
      </div>
      <div class="btn fl">
      </div>
      <div class="btn fl">
        
      </div>
      <div class="btn fl">

      </div>
      <div class="btn fl">
      </div>
    </div>-->
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" @click="onincome">收入</el-button>
    <el-button type="primary" @click="onexpend">支出</el-button>
    <el-button type="primary" @click="onAccounttransfers">账户互转</el-button>
    <el-button type="primary" @click="onbalanceadjustment">期初调整</el-button>
    <el-button type="primary" v-print="'#printTest'" icon="el-icon-printer">打印</el-button>
    <el-button type="primary" icon="el-icon-upload2">导出</el-button>
    <!-- <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期：">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            :start-placeholder="ctime_start"
            :end-placeholder="ctime_end"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="账目类型：">
          <el-select v-model="category" placeholder="类别">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户：">
          <el-select v-model="category" placeholder="-请选择-">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作者：">
          <el-select v-model="category" placeholder="-请选择-">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单号：">
          <el-select v-model="category" placeholder="-请选择-">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易类型：">
          <el-select v-model="category" placeholder="-请选择-">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="备注" v-model="remark" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <el-divider></el-divider>
    <div id="printTest">
      <div class="header">
        <h2 style="text-align:center;height:40px;">资金流水账</h2>
        <div class="cont">
          <span>结算账户：所有</span>
          <span>账目类型：999</span>
          <span>日期：999 至 999</span>
        </div>
        <div class="tb">
          <div class="dv">当前查询统计数据：</div>
          <div class="dv">
            收入
            <span style="color:orange;">999</span>
          </div>
          <div class="dv">
            支出
            <span style="color:orange;">999</span>
          </div>
          <div class="dv">
            盈余
            <span style="color:orange;">999</span>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" size="mini" border>
          <el-table-column :show-overflow-tooltip="true" width="130" prop="ctime" label="业务时间"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="90" prop="account_no" label="单据编号"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="90"
            prop="account_type_name"
            label="账目类型"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="70"
            prop="account_name"
            label="结算账户"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="90"
            prop="transaction_type"
            label="交易类型"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="70"
            prop="settlement_modes"
            label="结算方式"
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="90" prop="data" label="交易方"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="user_name" label="操作人"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="income" label="收入"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="expend" label="支出"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="surplus" label="盈余"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="balance" label="账户余额"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="90" prop="remarks" label="备注"></el-table-column>
          <el-table-column prop="data" label="操作"></el-table-column>
        </el-table>
      </div>
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

    <el-dialog
      title="期初调整"
      :visible.sync="dialogVisible3"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form3" :rules="rules3" ref="form3" label-width="140px" class="demo-form">
        <el-form-item label="账户:" prop="balance_account_id">
          <el-select
            v-model="form3.balance_account_id"
            style="width:70%;"
            @change="handle_balance_account_id3($event)"
          >
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户余额:" prop="balance">
          <div>{{form3.balance}}</div>
        </el-form-item>
        <!-- <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form3.account_type_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!-- <el-form-item label="转入账户:" prop="balance_account_id">
          <el-select v-model="form3.balance_account_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="期初金额:" prop="total_price">
          <el-input v-model="form3.total_price" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form3.service_time"
            type="date"
            placeholder="选择日期"
            style="width:70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form3.remarks" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm3('form3')">提 交</el-button>
        <el-button @click="handleClose3('form3')">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="账户互转"
      :visible.sync="dialogVisible2"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form2" :rules="rules2" ref="form2" label-width="140px" class="demo-form">
        <el-form-item label="转出账户:" prop="balance_account_id_to">
          <el-select
            v-model="form2.balance_account_id_to"
            style="width:70%;"
            @change="handle_balance_account_id2($event)"
          >
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户余额:" prop="balance">
          <div>{{form2.balance}}</div>
        </el-form-item>
        <!-- <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form2.account_type_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="转入账户:" prop="balance_account_id">
          <el-select v-model="form2.balance_account_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额:" prop="total_price">
          <el-input v-model="form2.total_price" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form2.service_time"
            type="date"
            placeholder="选择日期"
            style="width:70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form2.remarks" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm2('form2')">提 交</el-button>
        <el-button @click="handleClose2('form2')">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="支出"
      :visible.sync="dialogVisible1"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form1" :rules="rules1" ref="form1" label-width="140px" class="demo-form">
        <el-form-item label="结算账户:" prop="balance_account_id">
          <el-select
            v-model="form1.balance_account_id"
            style="width:70%;"
            @change="handle_balance_account_id1($event)"
          >
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户余额:" prop="balance">
          <div>{{form1.balance}}</div>
        </el-form-item>
        <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form1.account_type_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额:" prop="total_price">
          <el-input v-model="form1.total_price" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form1.service_time"
            type="date"
            placeholder="选择日期"
            style="width:70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form1.remarks" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="附图" prop="picurl">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleSuccess1"
            :before-upload="beforeUpload"
          >
            <img v-if="form1.picurl" :src="form1.picurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm1('form1')">提 交</el-button>
        <el-button @click="handleClose1('form1')">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="收入"
      :visible.sync="dialogVisible"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-form">
        <el-form-item label="结算账户:" prop="balance_account_id">
          <el-select
            v-model="form.balance_account_id"
            style="width:70%;"
            @change="handle_balance_account_id($event)"
          >
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户余额:" prop="balance">
          <div>{{form.balance}}</div>
        </el-form-item>
        <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form.account_type_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额:" prop="total_price">
          <el-input v-model="form.total_price" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form.service_time"
            type="date"
            placeholder="选择日期"
            style="width:70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="附图" prop="picurl">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="form.picurl" :src="form.picurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm('form')">提 交</el-button>
        <el-button @click="handleClose('form')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDataList,
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
} from "@/api/researchDevelopment";

import {
  supplierAccountList,
  balanceAccountSelect,
  supplierAccountAdd,
  balanceAccountTypeSelect,
  balanceAccountBalance,
  accountTypeSelect,
  myAccountAdd,
  myAccountList,
  settlementModesSelect,
  transactionTypeSelect,
} from "@/api/finance";
export default {
  data() {
    return {
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      form: {
        balance_account_id: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: "",
        total_price: "",
        service_time: "",
        remarks: "",
        picurl: "",
      },
      form1: {
        balance_account_id: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: "",
        total_price: "",
        service_time: "",
        remarks: "",
        picurl: "",
      },
      form2: {
        balance_account_id: "",
        balance_account_id_to: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: 0,
        total_price: "",
        service_time: "",
        remarks: "",
      },
      form3: {
        balance_account_id: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: 0,
        total_price: "",
        service_time: "",
        remarks: "",
      },
      rules: {},
      rules1: {},
      rules2: {},
      rules3: {},
      BalanceAccount: [],
      BalanceAccountType: [],
      SettlementModes: [],
      TransactionType: [],
    };
  },
  methods: {
    // 打印
    // printEvent() {
    //   let html = printX(1, 3); // a,b是我打印页面需要用到的参数，我在这里省略了参数相关的代码
    //   let tempNode = document.createElement("div"); // 因为vue-print要求是object
    //   tempNode.innerHTML = html;
    //   this.$print(tempNode); // 开始调用插件
    // },
    onincome() {
      this.dialogVisible = true;
    },
    onexpend() {
      this.dialogVisible1 = true;
    },
    onAccounttransfers() {
      this.dialogVisible2 = true;
    },
    onbalanceadjustment() {
      this.dialogVisible3 = true;
    },
    async handleAddForm3(form) {
      this.form3.service_time = moment(this.form3.service_time).format(
        "YYYY-MM-DD"
      );
      this.form3.total_price = Number(this.form3.total_price);
      this.form3["opay_price"] = this.form3.total_price;
      this.form3["cope_price"] = this.form3.total_price;
      this.form3["pay_price"] = this.form3.total_price;
      this.form3["user_id"] = localStorage.getItem("user_id");
      let res = await myAccountAdd(this.form3);
      this.$refs[form].resetFields();
      console.log(res);
      this.init();
      this.dialogVisible3 = false;
    },
    handleClose3(form) {
      this.$refs[form].resetFields();
      this.dialogVisible3 = false;
    },

    async handleAddForm2(form) {
      this.form2.service_time = moment(this.form2.service_time).format(
        "YYYY-MM-DD"
      );
      this.form2.total_price = Number(this.form2.total_price);
      this.form2["opay_price"] = this.form2.total_price;
      this.form2["cope_price"] = this.form2.total_price;
      this.form2["pay_price"] = this.form2.total_price;
      this.form2["user_id"] = localStorage.getItem("user_id");
      let res = await myAccountAdd(this.form2);
      this.$refs[form].resetFields();
      console.log(res);
      this.init();
      this.dialogVisible2 = false;
    },
    handleClose2(form) {
      this.$refs[form].resetFields();
      this.dialogVisible2 = false;
    },

    async handleAddForm1(form) {
      this.form1.service_time = moment(this.form1.service_time).format(
        "YYYY-MM-DD"
      );
      this.form1.total_price = -Number(this.form1.total_price);
      this.form1["opay_price"] = this.form1.total_price;
      this.form1["cope_price"] = this.form1.total_price;
      this.form1["pay_price"] = this.form1.total_price;
      this.form1["user_id"] = localStorage.getItem("user_id");
      let res = await myAccountAdd(this.form1);
      this.$refs[form].resetFields();
      console.log(res);
      this.init();
      this.dialogVisible1 = false;
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      this.dialogVisible1 = false;
    },

    async handleAddForm(form) {
      this.form.service_time = moment(this.form.service_time).format(
        "YYYY-MM-DD"
      );
      this.form.total_price = Number(this.form.total_price);
      this.form["opay_price"] = this.form.total_price;
      this.form["cope_price"] = this.form.total_price;
      this.form["pay_price"] = this.form.total_price;
      this.form["user_id"] = localStorage.getItem("user_id");
      let res = await myAccountAdd(this.form);
      this.$refs[form].resetFields();
      console.log(res);
      this.init();
      this.dialogVisible = false;
    },
    handleClose(form) {
      this.$refs[form].resetFields();
      this.dialogVisible = false;
    },

    async handleSuccess(response, file, fileList) {
      this.form.picurl = response.data.pic_file_url;
    },
    async handleSuccess1(response, file, fileList) {
      this.form1.picurl = response.data.pic_file_url;
    },
    beforeUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async handle_balance_account_id(e) {
      let res = await balanceAccountBalance({ id: e });
      this.form.balance = res.data.data[0].balance;
    },
    async handle_balance_account_id1(e) {
      let res = await balanceAccountBalance({ id: e });
      this.form1.balance = res.data.data[0].balance;
    },
    async handle_balance_account_id2(e) {
      let res = await balanceAccountBalance({ id: e });
      this.form2.balance = res.data.data[0].balance;
    },
    async handle_balance_account_id3(e) {
      let res = await balanceAccountBalance({ id: e });
      this.form3.balance = res.data.data[0].balance;
    },
    async getBalanceAccount() {
      let res = await balanceAccountSelect();
      let { data } = res.data;
      this.BalanceAccount = data;
    },
    async getSettlementModes() {
      let res = await settlementModesSelect();
      let { data } = res.data;
      this.SettlementModes = data;
    },
    async getBalanceAccountType() {
      let res = await accountTypeSelect();
      let { data } = res.data;
      this.BalanceAccountType = data;
    },
    async getTransactionType() {
      let res = await transactionTypeSelect();
      let { data } = res.data;
      this.TransactionType = data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init() {
      let res = await myAccountList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      res.data.data.map((v) => {
        // console.log(v);
        if (v.account_type === "0") {
          v["expend"] = Math.abs(v.total_price);
          v["income"] = 0;
        }
        if (v.account_type === "1") {
          v["income"] = v.total_price;
          v["expend"] = 0;
        }

        v["surplus"] = Number(v["income"]) - Number(v["expend"]);
        v["income"] += v["income"];
        console.log(v["income"]);
      });
      console.log(data);
      this.tableData = data;
      this.total = count;
    },
  },
  mounted() {
    this.init();
    this.getBalanceAccount();
    this.getBalanceAccountType();
    this.getSettlementModes();
    this.getTransactionType();
  },
};
</script>

<style lang="less" scoped>
.accountFlowAndBookkeeping {
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
      width: 33%;
      text-align: center;
      margin: 10px 0;
    }
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>