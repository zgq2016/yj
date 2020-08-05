<template>
  <div class="supplierReconciliationAndPayment" v-if="power.indexOf('F4000100')!=-1">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>供应商对账及付款</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="供应商：">
          <el-select v-model="formInline.supplier_id" placeholder="- 全部 -" clearable>
            <el-option
              v-for="item in SupplierList"
              :key="item.address"
              :label="item.value"
              :value="item.address"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            :start-placeholder="formInline.ctime_start"
            range-separator="至"
            :end-placeholder="formInline.ctime_end"
            style="width:100%"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="账目类型：">
          <el-select v-model="formInline.account_type" clearable>
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户：">
          <el-select v-model="formInline.balance_account_id" clearable>
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作者：">
          <el-select v-model="formInline.user_id" clearable>
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单号：" clearable>
          <el-input placeholder="单据编号" v-model="formInline.account_no" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button v-if="power.indexOf('F4000200')!=-1" type="primary" @click="handlePayment">付款</el-button>
          <el-button
            v-if="power.indexOf('F4000300')!=-1"
            type="primary"
            @click="beginninGbalanceAdjustment"
          >期初调整</el-button>
          <el-button
            v-if="power.indexOf('F4000400')!=-1"
            type="primary"
            v-print="'#printTest'"
            icon="el-icon-printer"
          >打印</el-button>
          <el-button v-if="power.indexOf('F4000500')!=-1" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div id="printTest">
      <div class="header">
        <h2 style="text-align:center;height:40px;">供应商对账单</h2>
        <div class="cont">
          <span>供应商：{{formInline.Supplier}}</span>
          <span>日期：{{formInline.ctime_start}} 至 {{formInline.ctime_end}}</span>
        </div>
        <div class="tb">
          <div class="dv">当前查询统计数据：</div>
          <div class="dv">
            应付金额
            <span style="color:orange;">{{cope_money}}</span>
          </div>
          <div class="dv">
            实付金额
            <span style="color:orange;">{{pay_money}}</span>
          </div>
          <div class="dv">
            应付余额
            <span style="color:orange;">{{opay_money}}</span>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" border size="mini">
          <el-table-column :show-overflow-tooltip="true" width="140" prop="ctime" label="业务时间"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="account_no" label="单据编号"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="80" prop="user_name" label="操作人"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="110"
            prop="account_name"
            label="结算账户"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="110"
            prop="account_type_name"
            label="账目类型"
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="110" prop="cope_money" label="应付金额"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="110" prop="pay_money" label="实付金额"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="110"
            prop="opay_money"
            label="本单应付余额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="110"
            prop="total_money"
            label="累计应付款余额"
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="110" prop="remarks" label="备注"></el-table-column>
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
    <!-- 供应商前期调整 -->
    <el-dialog
      title="账目类型信息"
      :visible.sync="dialogVisible"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-form">
        <el-form-item label="供应商" prop="supplier_companyname">
          <el-autocomplete
            class="inline-input"
            v-model="form.supplier_companyname"
            :fetch-suggestions="querySearch"
            placeholder="供应商"
            @select="handleSelect"
            style="width:70%;"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="操作人" prop="user_id">
          <el-select v-model="form.user_id" style="width:70%;">
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户" prop="balance_account_id">
          <el-select v-model="form.balance_account_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账目类型" prop="account_type_id">
          <el-select v-model="form.account_type_id" style="width:70%;">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实付金额" prop="pay_money">
          <el-input v-model="form.pay_money" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks" placeholder="请输入内容" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="附图" prop="picurl">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleSuccess1"
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
    <el-dialog
      title="账目类型信息"
      :visible.sync="dialogVisible1"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form1" :rules="rules1" ref="form1" label-width="140px" class="demo-form">
        <el-form-item label="供应商" prop="supplier_companyname">
          <el-autocomplete
            class="inline-input"
            v-model="form1.supplier_companyname"
            :fetch-suggestions="querySearch1"
            placeholder="供应商"
            @select="handleSelect1"
            style="width:70%;"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="操作人" prop="user_id">
          <el-select v-model="form1.user_id" style="width:70%;">
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实付金额" prop="pay_money">
          <el-input v-model="form1.pay_money" placeholder="请输入内容" style="width:70%;"></el-input>
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
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm1('form1')">提 交</el-button>
        <el-button @click="handleClose1('form1')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { getStylistList } from "@/api/researchDevelopment";
import {
  supplierAccountList,
  balanceAccountSelect,
  supplierAccountAdd,
  balanceAccountTypeSelect,
  accountTypeSelect,
} from "@/api/finance";
import { getSupplierSelect } from "@/api/archives";
export default {
  data() {
    return {
      power: "",
      cope_money: 999,
      pay_money: 999,
      opay_money: 999,
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        supplier_companyname: "",
        supplier_id: "",
        user_id: "",
        balance_account_id: "",
        cope_money: 0,
        pay_money: "",
        opay_money: 0,
        total_money: 0,
        remarks: "",
        account_type_id: "",
        picurl: "",
      },
      form1: {
        supplier_id: "",
        supplier_companyname: "",
        user_id: "",
        cope_money: 0,
        pay_money: "",
        opay_money: 0,
        total_money: 0,
        service_time: "",
        remarks: "",
      },
      rules1: {
        supplier_companyname: [
          { required: true, message: "供应商", trigger: "change" },
        ],
        user_id: [{ required: true, message: "操作人", trigger: "change" }],
        pay_money: [{ required: true, message: "实付金额", trigger: "change" }],
        service_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
      },
      rules: {
        supplier_companyname: [
          { required: true, message: "供应商", trigger: "change" },
        ],
        user_id: [{ required: true, message: "操作人", trigger: "change" }],
        balance_account_id: [
          { required: true, message: "结算账户", trigger: "change" },
        ],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        pay_money: [{ required: true, message: "实付金额", trigger: "change" }],
      },
      formInline: {
        supplier_id: "",
        date: "",
        account_type: "",
        balance_account_id: "",
        user_id: "",
        account_no: "",
      },
      Suppliers: [],
      BalanceAccount: [],
      BalanceAccountType: [],
      SupplierList: [],
      stylists: [],
      status: "",
    };
  },
  methods: {
    async handleSuccess1(response, file, fileList) {
      this.form.picurl = response.data.pic_file_url;
    },
    beforeUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async onSubmit() {
      //

      this.supplierInit();
    },
    async querySearch(value, cb) {
      this.form.supplier_companyname = value;

      let res = await getSupplierSelect({
        keyword: this.form.supplier_companyname,
      });
      let { data } = res.data;
      cb(data);
    },
    async querySearch1(value, cb) {
      this.form1.supplier_companyname = value;
      let res = await getSupplierSelect({
        keyword: this.form1.supplier_companyname,
      });
      let { data } = res.data;
      cb(data);
    },
    handleSelect(item) {
      this.form.supplier_id = item.address;
      this.form.supplier_companyname = item.value;
    },
    handleSelect1(item) {
      this.form1.supplier_id = item.address;
      this.form1.supplier_companyname = item.value;
    },
    handlePayment() {
      this.dialogVisible = true;
    },
    beginninGbalanceAdjustment() {
      this.dialogVisible1 = true;
    },
    async handleAddForm1(form) {
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.form1.service_time = moment(this.form1.service_time).format(
          "YYYY-MM-DD"
        );
        this.form1.supplier_id = Number(this.form1.supplier_id);
        this.form1.cope_money = Number(this.form1.cope_money);
        this.form1.opay_money = Number(this.form1.opay_money);
        this.form1.pay_money = Number(this.form1.pay_money);
        this.form1.total_money = Number(this.form1.total_money);
        this.form1.account_type_id = 0;
        this.form1.balance_account_id = 0;
        delete this.form1.supplier_companyname;
        let res = await supplierAccountAdd(this.form1);

        this.$refs[form].resetFields();
        this.form1.supplier_id = "";
        this.supplierInit();

        this.dialogVisible1 = false;
      });
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      this.form1.supplier_id = "";

      this.dialogVisible1 = false;
    },
    async handleAddForm(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.form.cope_money = Number(this.form.cope_money);
        this.form.supplier_id = Number(this.form.supplier_id);
        this.form.opay_money = Number(this.form.opay_money);
        this.form.pay_money = Number(this.form.pay_money);
        this.form.total_money = Number(this.form.total_money);
        this.form.account_type_id = Number(this.form.account_type_id);
        this.form.balance_account_id = Number(this.form.balance_account_id);
        delete this.form.supplier_companyname;
        let res = await supplierAccountAdd(this.form);

        this.$refs[form].resetFields();
        this.form.supplier_id = "";
        this.supplierInit();
        this.dialogVisible = false;
      });
    },
    handleClose(form) {
      this.$refs[form].resetFields();
      this.form.supplier_id = "";
      this.dialogVisible = false;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    async getBalanceAccount() {
      let res = await balanceAccountSelect();
      let { data } = res.data;
      this.BalanceAccount = data;
    },
    async getBalanceAccountType() {
      let res = await accountTypeSelect();
      let { data } = res.data;
      this.BalanceAccountType = data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.supplierInit();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.supplierInit();
    },
    async init() {
      let res1 = await getSupplierSelect({
        keyword: "",
      });
      this.SupplierList = res1.data.data;
    },
    async supplierInit() {
      this.formInline["ctime_start"] =
        this.formInline.date === ""
          ? ""
          : moment(this.formInline.date[0]).format("YYYY-MM-DD");
      this.formInline["ctime_end"] =
        this.formInline.date === ""
          ? ""
          : moment(this.formInline.date[1]).format("YYYY-MM-DD");
      this.formInline["page"] = this.pageIndex;
      this.formInline["page_size"] = this.pageSize;
      console.log(this.formInline);
      let res = await supplierAccountList(this.formInline);

      res.data.data.map((v) => {
        if (v.pay_money !== 0) {
          v.opay_money = v.cope_money - v.pay_money;
        }
      });
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
  },
  async mounted() {
    this.init();
    this.supplierInit();
    this.getStylist();
    this.getBalanceAccount();
    this.getBalanceAccountType();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.supplierReconciliationAndPayment {
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

  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>