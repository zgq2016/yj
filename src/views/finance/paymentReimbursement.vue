<template>
  <div
    class="purchaseMaterial"
    v-if="permission.indexOf('advance_reimbursement_list') != -1"
  >
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>财务</el-breadcrumb-item>
          <el-breadcrumb-item>预支报销</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="mianA">
      <el-form :inline="true" :model="form1">
        <el-form-item>
          <el-select
            size="small"
            v-model="form1.status"
            placeholder="请选择状态"
            style="width: 140px; margin-right: 10px"
            clearable
            @change="onSubmit"
          >
            <el-option
              v-for="item in status_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form1.type"
            placeholder="请选择类型"
            style="width: 140px; margin-right: 10px"
            size="small"
            @change="onSubmit"
          >
            <el-option
              v-for="item in type_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form1.user_id"
            placeholder="请选择申请人"
            style="width: 140px; margin-right: 10px"
            size="small"
            clearable
            @change="onSubmit"
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
          <!-- <el-button type="primary">导出</el-button> -->
          <!-- <el-button v-print="'#printTest'" type="primary">打印</el-button> -->
        </el-form-item>
        <el-form-item>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
            v-if="permission.indexOf('advance_reimbursement_add') != -1"
          >
            <div class="addStyle">展示统计数据</div>
            <div class="addStyle" @click="handleAdvance">预支</div>
            <div class="addStyle" @click="applyForReimbursement">报销</div>
          </div>
        </el-form-item>
      </el-form>
      <el-dialog
        title="预支"
        :visible.sync="payment"
        width="30%"
        center
        class="dialog"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="pay_form"
          :rules="rules2"
          ref="pay_form"
          label-width="140px"
          class="demo-form"
        >
          <el-form-item label="结算账户:" prop="account">
            <el-select
              v-model="pay_form.account"
              style="width: 70%"
              @change="handle_balance_account_id2($event)"
            >
              <el-option
                v-for="item in BalanceAccount"
                :key="item.id"
                :label="item.account_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户余额:">
            <div>{{ pay_form.balance }}</div>
          </el-form-item>
          <el-form-item label="账目类型:" prop="account_type_id">
            <el-select v-model="pay_form.account_type_id" style="width: 70%">
              <el-option
                v-for="item in BalanceAccountType"
                :key="item.id"
                :label="item.account_type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预支金额:" prop="money">
            <el-input
              v-model="pay_form.money"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务时间" prop="business_time">
            <el-date-picker
              v-model="pay_form.business_time"
              type="date"
              placeholder="选择日期"
              style="width: 70%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="事由" prop="reason">
            <el-input
              type="textarea"
              v-model="pay_form.reason"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="附图" prop="picurl">
            <el-upload
              class="avatar-uploader"
              :action="url + '/uploadpic.php'"
              :show-file-list="false"
              :on-success="handleSuccess2"
              :before-upload="beforeUpload"
            >
              <img
                v-if="pay_form.picurl"
                :src="pay_form.picurl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddpay_Form('pay_form')"
            >提 交</el-button
          >
          <el-button @click="handleClose2('pay_form')">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="报销"
        :visible.sync="reimbursement"
        width="30%"
        center
        class="dialog"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="re_form"
          :rules="rules1"
          ref="re_form"
          label-width="140px"
          class="demo-form"
        >
          <el-form-item label="结算账户:" prop="account">
            <el-select
              v-model="re_form.account"
              style="width: 70%"
              @change="handle_balance_account_id1($event)"
            >
              <el-option
                v-for="item in BalanceAccount"
                :key="item.id"
                :label="item.account_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户余额:">
            <div>{{ re_form.balance }}</div>
          </el-form-item>
          <el-form-item label="账目类型:" prop="account_type_id">
            <el-select v-model="re_form.account_type_id" style="width: 70%">
              <el-option
                v-for="item in BalanceAccountType"
                :key="item.id"
                :label="item.account_type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报销金额:" prop="money">
            <el-input
              v-model="re_form.money"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务时间" prop="business_time">
            <el-date-picker
              v-model="re_form.business_time"
              type="date"
              placeholder="选择日期"
              style="width: 70%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="事由" prop="reason">
            <el-input
              type="textarea"
              v-model="re_form.reason"
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
              <img v-if="re_form.picurl" :src="re_form.picurl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddre_Form('re_form')"
            >提 交</el-button
          >
          <el-button @click="handleClose1('re_form')">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="mianB">
      <div class="materialPurchasing">
        <div v-if="style_materials.length > 0">
          <div
            v-for="(item1, index) in style_materials"
            :key="index"
            class="content"
          >
            <div class="card">
              <div class="card_img">
                <img :src="item1.picurl" alt />
              </div>
              <div class="card_con">
                <div class="cardStyle_left_content_name">
                  {{ item1.account_type_name }}
                </div>
                <div v-if="item1.type == 0">类型: 预支</div>
                <div v-if="item1.type == 1">类型: 报销</div>
                <div>金额: {{ item1.money }}</div>
                <div>账户: {{ item1.user_name }}</div>
              </div>
            </div>
            <div class="orderInformation">
              <el-steps finish-status="wait">
                <el-step
                  style="width: 125px"
                  v-for="(item_g, index_g) in item1.log"
                  :key="index_g"
                  title
                  description
                  icon="el-icon-success"
                >
                  <template v-slot:title>
                    <div class="tt">
                      <div v-if="item_g.status == 0">申请中</div>
                      <div v-if="item_g.status == 1">拒绝</div>
                      <div v-if="item_g.status == 2">通过</div>
                    </div>
                  </template>
                  <template v-slot:description>
                    <div class="dt">
                      <div>{{ item_g.reason }}</div>
                      <div>{{ item_g.ctime }}</div>
                    </div>
                  </template>
                </el-step>
              </el-steps>
            </div>
            <div
              class="option_name"
              v-if="permission.indexOf('advance_reimbursement_handle') != -1"
            >
              <div>
                <el-button
                  size="mini"
                  round
                  @click="pass(item1)"
                  v-if="item1.status < 1"
                  >通过</el-button
                >
              </div>
              <div>
                <el-button
                  size="mini"
                  round
                  @click="no_pass(item1)"
                  v-if="item1.status < 1"
                  >拒绝</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChangB"
          @current-change="handleCurrentChangB"
          :current-page="pageIndexB"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pageSizeB"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalB"
        ></el-pagination>

        <el-dialog
          title="通过"
          :visible.sync="pass_lieva"
          width="30%"
          center
          class="dialog"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="pass_form"
            ref="pass_form"
            :rules="pass_rules"
            label-width="140px"
            class="demo-form"
          >
            <el-form-item
              label="支付账户"
              v-if="pass_form.status == 2"
              prop="account_id"
            >
              <el-select v-model="pass_form.account_id" style="width: 70%">
                <el-option
                  v-for="item in BalanceAccounts"
                  :key="item.id"
                  :label="item.account_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="理由" prop="reason">
              <el-input
                type="textarea"
                v-model="pass_form.reason"
                placeholder="请输入内容"
                style="width: 70%"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="pass_now">提 交</el-button>
            <el-button @click="close_pass">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMaterialsList,
  getMaterialsPurchaseList,
} from "@/api/researchDevelopment";
import { materialsPurchase } from "@/api/warehouse";
import { url } from "@/api/configuration";
import {
  accountTypeSelect,
  balanceAccountSelect,
  advanceReimbursementAdd,
  advanceReimbursementList,
  advanceReimbursementHandle,
} from "@/api/finance";
import { getStylistList } from "@/api/researchDevelopment";
import moment from "moment";
import { getMaterialsClass, getMaterialsClassInfo } from "@/api/archives.js";
export default {
  data() {
    return {
      purchaseOption: [
        {
          option: "研发",
          id: 1,
        },
        {
          option: "生产",
          id: 2,
        },
        {
          option: "仓库",
          id: 3,
        },
      ],

      status_list: [
        { name: "申请中", id: 0 },
        { name: "拒绝", id: 1 },
        { name: "通过", id: 2 },
      ],
      type_list: [
        { name: "预支", id: 0 },
        { name: "报销", id: 1 },
      ],
      uploadDocuments: "",
      form1: {},

      form: {
        checked: false,
      },
      re_form: {
        account_id: "",
        account_type_id: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
        type: "",
      },
      pay_form: {
        account_id: "",
        account_type_id: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
        type: "",
      },
      classData: [],
      class_datas: [],
      classDatasId: "",
      mianApageSize1: 9,
      mianApageIndex1: 1,
      searchInput: "",
      MaterialsList: [],
      total: 0,
      total2: 0,
      url: url,
      pageIndexB: 1,
      pageSizeB: 20,
      totalB: 0,
      obj: {},
      style_materials: [],
      active: 0,
      tabItem: {},
      BalanceAccountType: [],
      BalanceAccount: [],
      reimbursement: false,
      payment: false,
      rules1: {
        account: [{ required: true, message: "结算账户", trigger: "change" }],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        money: [{ required: true, message: "收入金额", trigger: "change" }],
        business_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
        reason: [{ required: true, message: "事由", trigger: "change" }],
        picurl: [{ required: true, message: "附图", trigger: "change" }],
      },
      rules2: {
        account: [{ required: true, message: "结算账户", trigger: "change" }],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        money: [{ required: true, message: "收入金额", trigger: "change" }],
        business_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
        reason: [{ required: true, message: "事由", trigger: "change" }],
        picurl: [{ required: true, message: "附图", trigger: "change" }],
      },
      pass_rules: {
        account_id: [
          { required: true, message: "支付账户", trigger: "change" },
        ],
        reason: [{ required: true, message: "事由", trigger: "change" }],
      },
      pass_form: {},
      pass_lieva: false,
      BalanceAccounts: [],
      stylists: [],
    };
  },
  methods: {
    /**
     *
     */
    async pass_now() {
      this.$refs["pass_form"].validate(async (valid) => {
        if (!valid) return;
        let res = await advanceReimbursementHandle(this.pass_form);
        this.$message({
          showClose: true,
          message: res.data.msg,
        });
        if (res.data.error_code == 0) {
          this.pass_form = {};
          this.init();
          this.pass_lieva = false;
        }
      });
    },
    close_pass() {
      this.pass_lieva = false;
      this.pass_form = {};
    },
    async pass(e) {
      let res1 = await balanceAccountSelect();
      this.BalanceAccounts = res1.data.data;
      this.pass_form["id"] = e.id;
      this.pass_form["status"] = 2;
      this.pass_lieva = true;
    },
    no_pass(e) {
      this.pass_form["id"] = e.id;
      this.pass_form["status"] = 1;
      this.pass_lieva = true;
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      this.reimbursement = false;
      this.re_form.balance = "";
    },
    handleClose2(form) {
      this.$refs[form].resetFields();
      this.payment = false;
      this.pay_form.balance = "";
    },
    async handle_balance_account_id1(e) {
      this.re_form.account_id = e.id;
      this.re_form.balance = e.balance;
      this.re_form.account = e.account_name;
    },
    async handle_balance_account_id2(e) {
      this.pay_form.account_id = e.id;
      this.pay_form.balance = e.balance;
      this.pay_form.account = e.account_name;
    },
    async handleAddre_Form(form) {
      this.$refs["re_form"].validate(async (valid) => {
        if (!valid) return;
        this.re_form.business_time = moment(this.re_form.business_time).format(
          "YYYY-MM-DD"
        );
        this.re_form["type"] = 1;
        let res = await advanceReimbursementAdd(this.re_form);
        this.$refs[form].resetFields();
        this.re_form.balance = "";
        this.reimbursement = false;
        this.init();
      });
    },
    async handleAddpay_Form(form) {
      this.$refs["pay_form"].validate(async (valid) => {
        if (!valid) return;
        this.pay_form["type"] = 0;
        this.pay_form.business_time = moment(
          this.pay_form.business_time
        ).format("YYYY-MM-DD");
        let res = await advanceReimbursementAdd(this.pay_form);
        this.$refs[form].resetFields();
        this.pay_form.balance = "";
        this.payment = false;
        this.init();
      });
    },
    handleAdvance() {
      this.payment = true;
    },
    applyForReimbursement() {
      this.reimbursement = true;
    },
    async getBalanceAccount() {
      let res = await balanceAccountSelect({ type: 1 });
      this.BalanceAccount = res.data.data;
    },
    async getBalanceAccountType() {
      let res = await accountTypeSelect();
      let { data } = res.data;
      this.BalanceAccountType = data;
    },
    beforeUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async handleSuccess1(response, file, fileList) {
      this.re_form.picurl = response.data.pic_file_url;
    },
    async handleSuccess2(response, file, fileList) {
      this.pay_form.picurl = response.data.pic_file_url;
    },

    handleSizeChangB(val) {
      this.pageSizeB = val;
      this.init();
    },
    handleCurrentChangB(val) {
      this.pageIndexB = val;
      this.init();
    },
    onSubmit() {
      this.pageIndexB = 1;
      this.init();
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    async init() {
      this.form1["page"] = this.pageIndexB;
      this.form1["page_size"] = this.pageSizeB;
      let res1 = await advanceReimbursementList(this.form1);
      this.totalB = res1.data.count;
      this.style_materials = res1.data.data;
    },
  },
  mounted() {
    this.init();
    this.getClassData();
    this.getBalanceAccount();
    this.getBalanceAccountType();
    this.getStylist();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.purchaseMaterial {
  .mianA {
    overflow: hidden;

    .el-pagination {
      margin: 20px;
      text-align: right;
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

  .mianB {
    .materialPurchasing {
      .material_purchase_name {
        font-size: 16px;
        margin-bottom: 10px;
        display: flex;
      }

      .content {
        width: 100%;
        display: flex;
        margin: 10px 0px;
        .card {
          display: flex;
          // justify-content: space-between;
          // align-items: flex-end;
          width: 320px;
          background-color: #f2f2f2;
          display: flex;
          border-radius: 10px;
          overflow: hidden;
          .card_img {
            img {
              width: 120px;
              height: 120px;
            }
          }
          .card_con {
            flex: 1;
            div {
              margin: 5px;
            }
            .cardStyle_left_content_name {
              font-weight: 600;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              .el-icon-close {
                cursor: pointer;
              }
            }
          }
        }
        .orderInformation {
          border-radius: 10px;
          background-color: #f2f2f2;
          flex: 1;
          overflow-x: scroll;
          overflow-y: hidden;
          display: flex;
          justify-content: space-between;
          word-spacing: normal;
          // align-items: flex-end;
          height: 120px;
          padding: 15px;
        }
        .option_name {
          width: 100px;
          height: 120px;
          background-color: #f2f2f2;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
      }
      .active {
        background: #000 !important;
        color: #ffffff !important;
        .el-icon-close {
          color: #ffffff !important;
        }
      }
      .backg {
        position: relative;
        text-align: center;
        background: #f2f2f2;
        border-radius: 15px;
        height: 30px;
        line-height: 30px;
        color: #000;
        width: 130px;
        .color {
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 0 !important;
        }
      }

      .orderInformation {
        .el-steps {
          position: relative;
          margin-bottom: 40px;
          /deep/.el-step__icon {
            width: 12px;
            background-color: transparent;
          }
          .tt {
            position: absolute;
            span:first-of-type {
              display: block;
              font-size: 10px;
              color: #666666;
              em {
                margin-left: 3px;
                color: #999999;
              }
            }
            span:last-of-type {
              display: block;
              font-size: 10px;
              -webkit-transform: scale(0.8);
              color: #999999;
              margin-left: -10px;
            }
          }
          .dt {
            position: absolute;
            top: 50px;
            span {
              display: block;
              font-size: 10px;
              float: left;
            }
          }
          /deep/.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
            font-size: 12px;
            font-weight: 400;
            position: relative;
          }
          /deep/.el-step__title {
            font-size: 12px;
            line-height: 14px;
          }
          /deep/.el-step__icon {
            width: 12px;
          }
          /deep/.el-step__head {
            top: 30px;
          }

          /deep/.el-step__line {
            width: auto;
            margin-right: 20px;
          }

          /deep/.el-step {
            width: 100px;
            display: inline-block;
          }
          /deep/.el-step__main {
            position: relative;
            bottom: 20px;
            .el-step__description {
              padding-top: 20%;
            }
          }
        }
      }
    }
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>