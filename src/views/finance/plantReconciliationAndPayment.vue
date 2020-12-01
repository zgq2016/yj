<template>
  <div
    class="supplierReconciliationAndPayment"
    v-if="permission.indexOf('plantReconciliationAndPayment') != -1"
  >
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>财务</el-breadcrumb-item>
          <el-breadcrumb-item>加工厂对账及付款</el-breadcrumb-item>
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
        @click="onSubmit"
      ></el-button>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="factory_id"
            placeholder="加工厂"
            clearable
            @change="get_factory_id($event)"
          >
            <el-option
              v-for="item in GetFactory"
              :key="item.id"
              :label="item.factory_name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            clearable
            class="timer"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="gte_date($event)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
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
        <el-form-item>
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
            v-model="user_id"
            clearable
            placeholder="操作者"
            @change="get_user_id($event)"
          >
            <el-option
              v-for="item in stylists"
              :key="item.id"
              :label="item.name"
              :value="item"
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
              v-if="permission.indexOf('factory_account_add') != -1"
              @click="handlePayment"
            >
              付款
            </div>
            <div
              class="addStyle"
              v-if="permission.indexOf('factory_account_add') != -1"
              @click="beginninGbalanceAdjustment"
              style="background-color: #e3e3e3; color: #fff"
            >
              期初调整
            </div>
            <div
              class="addStyle"
              style="background-color: #e3e3e3; color: #fff"
              v-print="'#printTest'"
            >
              打印
            </div>
            <div
              class="addStyle"
              style="background-color: #e3e3e3; color: #fff"
            >
              导出
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div id="printTest">
      <div class="header">
        <h2 style="text-align: center; height: 40px">工厂对账单</h2>
        <div class="cont">
          <span>工厂：{{ factory_id }}</span>
          <span
            >日期：{{ formInline.ctime_start }} 至
            {{ formInline.ctime_end }}</span
          >
        </div>
        <div class="tb">
          <div class="dv">当前查询统计数据：</div>
          <div class="dv">
            应付金额
            <span style="color: orange">{{ total_cope_money }}</span>
          </div>
          <div class="dv">
            实付金额
            <span style="color: orange">{{ total_pay_money }}</span>
          </div>
          <div class="dv">
            应付余额
            <span style="color: orange">{{ total_opay_money }}</span>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" border size="mini">
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
            prop="user_name"
            label="操作人"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="account_name"
            label="结算账户"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="account_type_name"
            label="账目类型"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="cope_money"
            label="应付金额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="pay_money"
            label="实付金额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="opay_money"
            label="本单应付余额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="total_money"
            label="累计应付款余额"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="remarks"
            label="备注"
          ></el-table-column>
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
    <!-- 工厂前期调整 -->
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
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="指派工厂" prop="factory_id">
          <el-select v-model="form.factory_id" clearable style="width: 70%">
            <el-option
              v-for="item in GetFactory"
              :key="item.id"
              :label="item.factory_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作人" prop="user_id">
          <el-select v-model="form.user_id" style="width:70%;">
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="结算账户" prop="balance_account_id">
          <el-select v-model="form.balance_account_id" style="width: 70%">
            <el-option
              v-for="item in BalanceAccount"
              :key="item.id"
              :label="item.account_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账目类型" prop="account_type_id">
          <el-select v-model="form.account_type_id" style="width: 70%">
            <el-option
              v-for="item in BalanceAccountType"
              :key="item.id"
              :label="item.account_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实付金额" prop="pay_money">
          <el-input
            v-model="form.pay_money"
            placeholder="请输入内容"
            style="width: 70%"
          ></el-input>
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
            :on-success="handleSuccess1"
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
      <el-form
        :model="form1"
        :rules="rules1"
        ref="form1"
        label-width="140px"
        class="demo-form"
      >
        <el-form-item label="指派工厂" prop="factory_id">
          <el-select v-model="form1.factory_id" clearable style="width: 70%">
            <el-option
              v-for="item in GetFactory"
              :key="item.id"
              :label="item.factory_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作人" prop="user_id">
          <el-select v-model="form1.user_id" style="width:70%;">
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="实付金额" prop="pay_money">
          <el-input
            v-model="form1.pay_money"
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
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm1('form1')"
          >提 交</el-button
        >
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
  factoryAccountAdd,
  balanceAccountTypeSelect,
  accountTypeSelect,
  factoryAccountList,
} from "@/api/finance";
import { getFactorySelect } from "@/api/production";
// import { getSupplierSelect } from "@/api/archives";
import { url } from "@/api/configuration";
import { bookStockOrderList } from "@/api/warehouse";
export default {
  data() {
    return {
      url: url,
      permission: [],
      total_cope_money: "",
      total_pay_money: "",
      total_opay_money: "",
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        factory_id: "",
        // user_id: "",
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
        factory_id: "",
        // user_id: "",
        cope_money: 0,
        pay_money: "",
        opay_money: 0,
        total_money: 0,
        service_time: "",
        remarks: "",
      },
      rules1: {
        factory_id: [{ required: true, message: "工厂", trigger: "change" }],
        user_id: [{ required: true, message: "操作人", trigger: "change" }],
        pay_money: [{ required: true, message: "实付金额", trigger: "change" }],
        service_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
      },
      rules: {
        factory_id: [{ required: true, message: "工厂", trigger: "change" }],
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
        factory_id: "",
        date: "",
        account_type_id: "",
        balance_account_id: "",
        user_id: "",
      },
      GetFactory: [],
      Suppliers: [],
      BalanceAccount: [],
      BalanceAccountType: [],
      SupplierList: [],
      stylists: [],
      status: "",
      factory_id: "",
      account_type_name: "",
      balance_account_id: "",
      user_id: "",
    };
  },
  methods: {
    get_factory_id(e) {
      console.log(e);
      this.pageIndex = 1;
      this.formInline.factory_id = e.id;
      this.factory_id = e.factory_name;
      this.supplierInit();
    },
    gte_date(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline["ctime_start"] = e === null ? "" : e[0];
      this.formInline["ctime_end"] = e === null ? "" : e[1];
      this.supplierInit();
    },
    get_account_name(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline.balance_account_id = e.id;
      this.balance_account_id = e.account_name;
      this.supplierInit();
    },
    get_user_id(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline.user_id = e.id;
      this.user_id = e.name;
      this.supplierInit();
    },
    get_account_type_name(e) {
      this.pageIndex = 1;
      console.log(e);
      this.formInline.account_type_id = e.id;
      this.account_type_name = e.account_type_name;
      this.supplierInit();
    },
    async handleSuccess1(response, file, fileList) {
      this.form.picurl = response.data.pic_file_url;
    },
    beforeUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async onSubmit() {
      this.pageIndex = 1;
      this.formInline["account_no"] = this.formInline.account_no.trim();
      this.supplierInit();
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
        this.form1.cope_money = Number(this.form1.cope_money);
        this.form1.opay_money = Number(this.form1.opay_money);
        this.form1.pay_money = Number(this.form1.pay_money);
        this.form1.total_money = Number(this.form1.total_money);
        this.form1.account_type_id = 5;
        this.form1.balance_account_id = 0;
        delete this.form1.supplier_companyname;
        let res = await factoryAccountAdd(this.form1);
        console.log(res);
        this.$refs[form].resetFields();
        this.supplierInit();

        this.dialogVisible1 = false;
      });
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      console.log(this.form1);
      this.dialogVisible1 = false;
    },
    async handleAddForm(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.form.cope_money = Number(this.form.cope_money);
        this.form.opay_money = Number(this.form.opay_money);
        this.form.pay_money = Number(this.form.pay_money);
        this.form.total_money = Number(this.form.total_money);
        this.form.account_type_id = Number(this.form.account_type_id);
        this.form.balance_account_id = Number(this.form.balance_account_id);
        delete this.form.supplier_companyname;
        let res = await factoryAccountAdd(this.form);
        console.log(res);
        this.$refs[form].resetFields();
        this.supplierInit();
        this.dialogVisible = false;
      });
    },
    handleClose(form) {
      this.$refs[form].resetFields();
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
    async getGetFactory() {
      let res = await getFactorySelect();
      let { data } = res.data;
      console.log(data);
      this.GetFactory = data;
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
    async supplierInit() {
      this.formInline.page = this.pageIndex;
      this.formInline.page_size = this.pageSize;
      // delete this.formInline.date;
      let res = await factoryAccountList(this.formInline);
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
  },
  async mounted() {
    // this.init();
    this.supplierInit();
    this.getStylist();
    this.getBalanceAccount();
    this.getBalanceAccountType();
    this.getGetFactory();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.supplierReconciliationAndPayment {
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