<template>
  <div
    class="accountFlowAndBookkeeping"
    v-if="permission.indexOf('accountFlowAndBookkeeping') != -1"
  >
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>财务</el-breadcrumb-item>
          <el-breadcrumb-item>账户流水及记账</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="单据编号"
        v-model="formInline.account_no"
        clearable
        style="width: 200px"
      ></el-input>
      <el-button
        icon="el-icon-search"
        size="mini"
        circle
        class="search_button"
        @click="onsearch"
      ></el-button>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            class="timer"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="gte_date($event)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="account_type_name">
          <el-select
            v-model="account_type_name"
            clearable
            placeholder="账目类型"
            @change="get_account_type_name($event)"
          >
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="balance_account_id">
          <el-select
            v-model="balance_account_id"
            clearable
            placeholder="结算账户"
            @change="get_account_name($event)"
          >
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formInline.user_id"
            clearable
            placeholder="操作者"
            @change="get_user_id($event)"
          >
            <el-option
              v-for="item in stylists"
              :key="item.id"
              :label="item.name"
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
            <el-tooltip class="edit" content="更多" placement="top">
              <el-dropdown
                trigger="click"
                @command="handleCommand"
                placement="bottom"
              >
                <span class="el-icon-more"></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="permission.indexOf('my_account_add') != -1"
                    command="a"
                    >账户互转</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="permission.indexOf('balance_adjust') != -1"
                    command="b"
                    >期初调整</el-dropdown-item
                  >
                  <el-dropdown-item command="c" v-print="'#printTest'"
                    >打印</el-dropdown-item
                  >
                  <el-dropdown-item command="d">导出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
            <div
              class="addStyle"
              style="background-color: #e3e3e3; color: #000"
              v-if="permission.indexOf('my_account_add') != -1"
              @click="onexpend"
            >
              支出
            </div>
            <div
              class="addStyle"
              v-if="permission.indexOf('my_account_add') != -1"
              @click="onincome"
            >
              收入
            </div>
            <!-- <div
              class="addStyle"
              v-if="permission.indexOf('F2000400')!=-1"
              @click="onAccounttransfers"
            >账户互转</div>
            <div
              class="addStyle"
              v-if="permission.indexOf('F2000500')!=-1"
              @click="onbalanceadjustment"
            >期初调整</div>
            <div class="addStyle" v-if="permission.indexOf('F2000600')!=-1" v-print="'#printTest'">打印</div>
            <div class="addStyle" v-if="permission.indexOf('F2000700')!=-1">导出</div>-->
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div id="printTest">
      <div class="header">
        <h2 style="text-align: center; height: 40px">资金流水账</h2>
        <div class="cont">
          <span>账目类型：{{ account_type_name }}</span>
          <span>结算账户：{{ balance_account_id }}</span>
          <span
            >日期：{{ formInline.ctime_start }} 至
            {{ formInline.ctime_end }}</span
          >
        </div>
        <div class="tb">
          <div class="dv">当前查询统计数据：</div>
          <div class="dv">
            收入
            <span style="color: orange">{{ total_cope_money }}</span>
          </div>
          <div class="dv">
            支出
            <span style="color: orange">{{ total_pay_money }}</span>
          </div>
          <div class="dv">
            盈余
            <span style="color: orange">{{ total_opay_money }}</span>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table size="mini" :data="tableData" border>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="ctime"
            label="业务时间"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="account_no"
            label="单据编号"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="account_type_name"
            label="账目类型"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="account_name"
            label="结算账户"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="transaction_type"
            label="交易类型"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="counterparty"
            label="交易方"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="user_name"
            label="操作人"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="cope_money"
            label="收入"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="pay_money"
            label="支出"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="opay_money"
            label="盈余"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="total_money"
            label="账户余额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="remarks"
            label="备注"
          ></el-table-column>
          <el-table-column prop="data" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.origin != '' && scope.row.origin_code != 0"
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
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
      <el-form
        :model="form3"
        :rules="rules3"
        ref="form3"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="账户:" prop="balance_account_id">
          <el-select
            v-model="form3.balance_account_id"
            style="width: 70%"
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
          <div>{{ form3.balance }}</div>
        </el-form-item>
        <el-form-item label="期初金额:" prop="money">
          <el-input
            v-model="form3.money"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="业务时间" prop="business_time">
          <el-date-picker
            v-model="form3.business_time"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            v-model="form3.remarks"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm3('form3')"
          >提 交</el-button
        >
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
      <el-form
        :model="form2"
        :rules="rules2"
        ref="form2"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="转出账户:" prop="balance_account_id_to">
          <el-select
            v-model="form2.balance_account_id_to"
            style="width: 70%"
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
          <div>{{ form2.balance }}</div>
        </el-form-item>
        <el-form-item label="转入账户:" prop="balance_account_id">
          <el-select v-model="form2.balance_account_id" style="width: 70%">
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转账金额:" prop="total_money">
          <el-input
            v-model="form2.total_money"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form2.service_time"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            v-model="form2.remarks"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm2('form2')"
          >提 交</el-button
        >
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
      <el-form
        :model="form1"
        :rules="rules1"
        ref="form1"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="结算账户:" prop="balance_account_id">
          <el-select
            v-model="form1.balance_account_id"
            style="width: 70%"
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
          <div>{{ form1.balance }}</div>
        </el-form-item>
        <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form1.account_type_id" style="width: 70%">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出金额:" prop="total_money">
          <el-input
            v-model="form1.total_money"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form1.service_time"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            v-model="form1.remarks"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="附图" prop="picurl">
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
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
        <el-button type="primary" @click="handleAddForm1('form1')"
          >提 交</el-button
        >
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
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="结算账户:" prop="balance_account_id">
          <el-select
            v-model="form.balance_account_id"
            style="width: 70%"
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
          <div>{{ form.balance }}</div>
        </el-form-item>
        <el-form-item label="账目类型:" prop="account_type_id">
          <el-select v-model="form.account_type_id" style="width: 70%">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额:" prop="total_money">
          <el-input
            v-model="form.total_money"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务时间" prop="service_time">
          <el-date-picker
            v-model="form.service_time"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            v-model="form.remarks"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="附图" prop="picurl">
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
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
        <el-button type="primary" @click="handleAddForm('form')"
          >提 交</el-button
        >
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
import { url } from "@/api/configuration";
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
  balanceAdjust,
  getPurchaseById,
} from "@/api/finance";
export default {
  data() {
    return {
      url: url,
      permission: [],
      total_cope_money: "",
      total_pay_money: "",
      total_opay_money: "",
      account_type_name: "",
      balance_account_id: "",
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      stylists: [],
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      formInline: {
        date: [],
        account_type_name: "",
        balance_account_id: "",
        user_id: "",
        account_no: "",
        remark: "",
        ctime_start: "",
        ctime_end: "",
      },
      form: {
        balance_account_id: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: "",
        total_money: "",
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
        total_money: "",
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
        total_money: "",
        service_time: "",
        remarks: "",
      },
      form3: {
        balance_account_id: "",
        settlement_modes_id: 0,
        transaction_type_id: 0,
        balance: "",
        account_type_id: 0,
        total_money: "",
        service_time: "",
        remarks: "",
      },
      rules: {
        balance_account_id: [
          { required: true, message: "结算账户", trigger: "change" },
        ],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        total_money: [
          { required: true, message: "收入金额", trigger: "change" },
        ],
        service_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
      },
      rules1: {
        balance_account_id: [
          { required: true, message: "结算账户", trigger: "change" },
        ],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        total_money: [
          { required: true, message: "收入金额", trigger: "change" },
        ],
        service_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
      },
      rules2: {
        balance_account_id_to: [
          { required: true, message: "转出账户", trigger: "change" },
        ],
        balance_account_id: [
          { required: true, message: "转入账户", trigger: "change" },
        ],
        total_money: [
          { required: true, message: "收入金额", trigger: "change" },
        ],
        service_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
      },
      rules3: {
        balance_account_id: [
          { required: true, message: "账户", trigger: "change" },
        ],
        money: [{ required: true, message: "期初金额", trigger: "change" }],
        // business_time: [
        //   { required: true, message: "业务时间", trigger: "change" },
        // ],
      },
      BalanceAccount: [],
      BalanceAccountType: [],
      SettlementModes: [],
      TransactionType: [],
    };
  },
  methods: {
    async handleClick(e) {
      console.log(e);
      // return;
      let res = await getPurchaseById({ id: e.origin_code, type: e.origin });
      console.log(res);
      if (e.origin == "style_purchase") {
        this.$router.push({
          path: `materialPurchasing?id=${res.data.data.style_id}`,
        });
      }
      if (e.origin == "produce_order_procure") {
        this.$router.push({
          path: `sc_purchase?id=${res.data.data.style_id}&produce_no=${res.data.data.produce_no}`,
        });
      }
      if (e.origin == "materials_purchase") {
        this.$router.push({
          path: `/purchaseMaterial?origin=${e.origin}&origin_code=${e.origin_code}`,
        });
      }
    },
    get_account_type_name(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline.account_type_id = e.id;
      this.account_type_name = e.account_type_name;
      this.init();
    },
    get_account_name(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline.balance_account_id = e.id;
      this.balance_account_id = e.account_name;
      this.init();
    },
    gte_date(e) {
      this.pageIndex = 1;
      this.formInline["ctime_start"] = e === null ? "" : e[0];
      this.formInline["ctime_end"] = e === null ? "" : e[1];
      console.log(e);
      this.init();
    },
    get_user_id(e) {
      this.pageIndex = 1;
      if (e != "") {
        this.BalanceAccount = this.BalanceAccounts;
        this.BalanceAccount = this.BalanceAccount.filter((v, i) => {
          if (v.user.indexOf(String(e)) != -1) {
            return v;
          }
        });
      } else {
        this.BalanceAccount = this.BalanceAccounts;
      }
      this.init();
    },
    handleCommand(command) {
      // 新增意向订单 AddOpinionIndent
      if (command === "a") {
        this.onAccounttransfers();
      }
      // 新增阶段工作 AddPhase
      if (command === "b") {
        this.onbalanceadjustment();
      }
      // 新增企划系列 AddProjectSeries
    },
    // 打印
    // printEvent() {
    //   let html = printX(1, 3); // a,b是我打印页面需要用到的参数，我在这里省略了参数相关的代码
    //   let tempNode = document.createElement("div"); // 因为vue-print要求是object
    //   tempNode.innerHTML = html;
    //   this.$print(tempNode); // 开始调用插件
    // },
    onsearch() {
      this.pageIndex = 1;
      console.log(this.formInline);
      this.init();
    },
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
      this.$refs["form3"].validate(async (valid) => {
        if (!valid) return;
        this.form3.business_time = moment(this.form3.business_time).format(
          "YYYY-MM-DD"
        );
        let res = await balanceAdjust(this.form3);
        this.$refs[form].resetFields();
        this.init();
        this.dialogVisible3 = false;
      });
    },
    handleClose3(form) {
      this.$refs[form].resetFields();
      this.dialogVisible3 = false;
    },

    async handleAddForm2(form) {
      this.$refs["form2"].validate(async (valid) => {
        if (!valid) return;
        this.form2.service_time = moment(this.form2.service_time).format(
          "YYYY-MM-DD"
        );
        this.form2.total_money = Number(this.form2.total_money);
        this.form2["opay_money"] = this.form2.total_money;
        this.form2["cope_money"] = this.form2.total_money;
        this.form2["pay_money"] = this.form2.total_money;
        this.form2["user_id"] = localStorage.getItem("user_id");
        let res = await myAccountAdd(this.form2);
        this.$refs[form].resetFields();
        this.init();
        this.dialogVisible2 = false;
      });
    },
    handleClose2(form) {
      this.$refs[form].resetFields();
      this.dialogVisible2 = false;
    },

    async handleAddForm1(form) {
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return;
        this.form1.service_time = moment(this.form1.service_time).format(
          "YYYY-MM-DD"
        );
        this.form1.total_money = -Number(this.form1.total_money);
        this.form1["opay_money"] = this.form1.total_money;
        this.form1["cope_money"] = this.form1.total_money;
        this.form1["pay_money"] = this.form1.total_money;
        this.form1["user_id"] = localStorage.getItem("user_id");
        let res = await myAccountAdd(this.form1);
        this.$refs[form].resetFields();
        this.init();
        this.dialogVisible1 = false;
      });
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      this.dialogVisible1 = false;
    },

    async handleAddForm(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        this.form.service_time = moment(this.form.service_time).format(
          "YYYY-MM-DD"
        );
        this.form.total_money = Number(this.form.total_money);
        this.form["opay_money"] = this.form.total_money;
        this.form["cope_money"] = this.form.total_money;
        this.form["pay_money"] = this.form.total_money;
        this.form["user_id"] = localStorage.getItem("user_id");
        let res = await myAccountAdd(this.form);
        this.$refs[form].resetFields();
        this.init();
        this.dialogVisible = false;
      });
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
      this.BalanceAccounts = data;
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
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
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
      this.formInline["page"] = this.pageIndex;
      this.formInline["page_size"] = this.pageSize;
      this.formInline["account_no"] = this.formInline.account_no.trim();
      let res = await myAccountList(this.formInline);
      console.log(res);
      let {
        data,
        count,
        total_cope_money,
        total_pay_money,
        total_opay_money,
      } = res.data;
      this.tableData = data;
      this.total = count;
      this.total_cope_money = total_cope_money;
      this.total_pay_money = total_pay_money;
      this.total_opay_money = total_opay_money;
    },
    day() {
      this.permission = localStorage.getItem("permission").split(",");
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var d = new Date(year, month, 0);
      var day = d.getDate();
      this.formInline.date[0] = `${year}-${month}-${1}`;
      this.formInline.date[1] = `${year}-${month}-${day}`;
      this.formInline["ctime_start"] = `${year}-${month}-${1}`;
      this.formInline["ctime_end"] = `${year}-${month}-${day}`;
      this.init();
    },
  },
  mounted() {
    this.day();
    this.getStylist();
    this.getBalanceAccount();
    this.getBalanceAccountType();
    this.getSettlementModes();
    this.getTransactionType();
  },
};
</script>

<style lang="less" scoped>
.accountFlowAndBookkeeping {
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
  .timer {
    width: 300px !important;
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
  /deep/.el-date-editor /deep/.el-range-separator {
    padding: 0 0px;
    line-height: 25px;
    width: 5%;
    color: #303133;
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
}
</style>