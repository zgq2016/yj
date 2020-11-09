<template>
  <div class="panelPurchase">
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>版料采购单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <!-- 物料卡信息 供应商信息 -->
      <div class="info">
        <div style="display: flex">
          <div class="cardInfo">
            <div class="cardInfoTitle">物料卡信息</div>
            <div class="cardInfoContent">
              <div v-if="header.color_data" class="cardInfoContentImg">
                <img :src="header.color_data[0].picurl" alt />
              </div>
              <div class="cardInfoContentText">
                <div class="cardInfoContentTextName">
                  {{ header.materialsname }}
                </div>
                <div style="display: flex">
                  <div style="margin-right: 100px">
                    <div>内部编号：{{ header.materialsno }}</div>
                    <div>编号：{{ header.materialsno }}</div>
                    <div>
                      面料分类：{{ header.materials_mainclass_name
                      }}{{ `(${header.materials_class_name})` }}
                    </div>
                    <div>
                      料 属 性 ：
                      <span
                        style="
                          margin-right: 10px;
                          text-align: center;
                          width: 50px;
                          display: inline-block;
                        "
                        v-for="(item, index) in header.material_data"
                        :key="index"
                        >{{ item.material_name }}</span
                      >
                    </div>
                    <div style="display: flex">
                      <div>
                        面料成分：
                        <span
                          style="
                            margin-right: 10px;
                            text-align: center;
                            width: 50px;
                            display: inline-block;
                          "
                          v-for="(item, index) in header.material_data"
                          :key="index"
                          >{{ item.content }}%</span
                        >
                      </div>
                    </div>
                  </div>
                  <div style="width: 150px">
                    <div>色号：{{ colors.color_no }}</div>
                    <div>颜色：{{ colors.color }}</div>
                    <div>大货单价：{{ header.wsale_price }}</div>
                    <div>幅宽：{{ header.unit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="supplierInfo">
            <div class="supplierInfoTitle">供应商信息</div>
            <div class="supplierInfoContent" ref="supplier">
              <div class="supplierInfoContentImg">
                <img :src="supplier.cardpicurl" alt />
              </div>
              <div class="supplierInfoContentText">
                <div class="supplierInfoContentTextName">
                  {{ supplier.companyname }}
                </div>
                <div
                  v-for="(item, index) in supplier.contact_data"
                  :key="index"
                >
                  {{ item.phone }}
                </div>
                <div>账号信息：</div>
                <div style="width: 155px">{{ supplier.address }}</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 信息部分 -->
        <div class="purchaseInfo">
          <div class="purchaseInfoTitle">采购信息</div>
          <div class="userProfile">
            <span style="padding: 10px 30px"> 事件号： 自动生成 </span>
            <span> 经办人： 自动生成 </span>
          </div>
          <div class="form">
            <el-form
              :model="form"
              ref="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="用量" prop="dosage">
                <el-col :span="6">
                  <el-input
                    v-model="form.dosage"
                    placeholder="请输入用量(以米为单位)"
                    style="width: 200px"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button size="small" round @click="readyforTheCall"
                    >备货调用</el-button
                  >
                </el-col>
              </el-form-item>
              <el-form-item label="采购量" prop="amountPurchased">
                <el-input
                  v-model="form.amountPurchased"
                  @input="changed()"
                  placeholder="请输入采购量(以米为单位)"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="采购单价" prop="purchasePrice">
                <el-input
                  v-model="form.purchasePrice"
                  @input="changed()"
                  placeholder="请输入采购单价"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="金额" prop="money">
                <el-input
                  v-model="form.money"
                  @input="changed1()"
                  placeholder="请输入金额"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="付款" prop="payment">
                <el-radio-group @change="selectPayment" v-model="form.payment">
                  <el-radio :label="0">订金</el-radio>
                  <el-radio :label="1">全额付款</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="form.payment == 0"
                label="订金"
                prop="deposit"
              >
                <el-input
                  v-model="form.deposit"
                  placeholder="请输入订金"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="form.payment == 1"
                label="全额付款"
                prop="fullPayout"
              >
                <el-input
                  v-model="form.fullPayout"
                  disabled
                  placeholder="请输入金额"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="结算账户" prop="balance_account_id">
                <el-select
                  v-model="form.balance_account_id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.account_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预计回料时间" prop="finishTime">
                <el-date-picker
                  v-model="form.finishTime"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="storehouse_id" label="仓库:">
                <el-select
                  v-model="form.storehouse_id"
                  placeholder="请选择仓库类型"
                >
                  <el-option
                    v-for="item in ware"
                    :key="item.id"
                    :label="item.storehouse_name"
                    :value="item.id"
                  ></el-option>
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    @size-change="handleSize"
                    @current-change="handleCurrent"
                    :total="total2"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="上传凭证">
                <el-upload
                  class="avatar-uploader"
                  :action="url + '/uploadpic.php'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.picurl" :src="form.picurl" class="avatar" />
                  <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.remark"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button round @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="增加款式颜色"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      class="dialog"
    >
      aa
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { storehouseList } from "@/api/warehouse.js";
import { url } from "@/api/configuration";
import {
  getMaterialsInfo, //物料
  getSupplierInfo, //供应商
  getMaterialsList,
} from "@/api/archives";
import {
  produceOrderProcureEdit, //编辑物料
  produceOrderInfo,
} from "@/api/production";
import {
  purchaseEdit, //编辑物料
} from "@/api/researchDevelopment";
import { balanceAccountSelect } from "@/api/finance";
export default {
  data() {
    return {
      url: url,
      ware: [],
      pageIndex2: 1,
      pageSize2: 10,
      total2: 0,
      form: {
        dosage: "", //用量
        amountPurchased: "", //采购量
        purchasePrice: "", //单价
        money: "", //金额
        balance_account_id: "", //支付方式
        payment: 0, //付款
        finishTime: "", //预计完成时间
        deposit: "", //订金
        fullPayout: "", //全额支付
        picurl: "", //图片
        remark: "", //备注
      },
      centerDialogVisible: false,
      header: [], //物料信息
      supplier: [], //供应商
      colors: {},
      radio: 0,
      options: [], //选择支付方式
      // 表单规则
      rules: {
        dosage: [
          // { required: true, message: "请输入用量",trigger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入用量"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
                console.log(value);
                callback(new Error("请输入正确的数值(最多保留小数点后两位)"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        amountPurchased: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入采购量"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
                console.log(value);
                callback(new Error("请输入正确的数值(最多保留小数点后两位)"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        purchasePrice: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入采购单价"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
                console.log(value);
                callback(new Error("请输入正确的数值(最多保留小数点后两位)"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入金额"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
                console.log(value);
                callback(new Error("请输入正确的数值(最多保留小数点后两位)"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        balance_account_id: [
          { required: true, message: "请选择支付方式", trigger: "blur" },
        ],
        payment: [
          { required: true, message: "请选择付款方式 ", trigger: "blur" },
        ],
        finishTime: [
          {
            type: "date",
            required: true,
            message: "请输入时间",
            trigger: "blur",
          },
        ],
        deposit: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入定金"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
                console.log(value);
                callback(new Error("请输入正确的数值(最多保留小数点后两位)"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        fullPayout: [
          { required: true, message: "请输入全部金额", trigger: "blur" },
        ],
        storehouse_id: [
          { required: true, message: "请选择仓库类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    readyforTheCall() {
      this.centerDialogVisible = true;
    },
    async changed() {
      this.form.money = (
        this.form.amountPurchased * this.form.purchasePrice
      ).toFixed(2);
      // this.form.money = String(this.form.money);
      this.form.fullPayout = this.form.money;
    },
    async changed1() {
      this.form.purchasePrice = (
        this.form.money / this.form.amountPurchased
      ).toFixed(2);
      // this.form.purchasePrice = String(this.form.purchasePrice);
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.stock();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.stock();
    },
    async onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法

        if (this.$route.query.tabName === "采购") {
          this.form.finishTime = moment(this.form.finishTime).format(
            "YYYY-MM-DD"
          );
          let e1 = this.$route.query.e;
          let e = JSON.parse(e1);
          let res = await produceOrderProcureEdit({
            id: e.id,
            style_id: Number(e.style_id),
            produce_no: e.produce_no,
            style_color_name: e.style_color_name,
            mainclass: e.mainclass,

            materials_id: this.colors.materials_id,
            color: this.colors.color,
            color_no: this.colors.color_no,
            picurl: this.colors.picurl,
            //
            amountPurchased: this.form.amountPurchased,
            deposit: this.form.deposit,
            dosage: this.form.dosage,
            finishTime: this.form.finishTime,
            balance_account_id: this.form.balance_account_id,
            money: this.form.money,
            payment: this.form.payment,
            purchasePrice: this.form.purchasePrice,
            remark: this.form.remark,
            uploadDocuments: this.form.picurl,
            storehouse_id: this.form.storehouse_id,
          });
          console.log(res);
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.$router.push({
              path: `/ProductionStyle?id=${e.style_id}&activeNames=2`,
            });
          }
        }
        if (this.$route.query.tabName === "版料采购") {
          this.form.finishTime = moment(this.form.finishTime).format(
            "YYYY-MM-DD"
          );
          let res = await purchaseEdit({
            id: this.$route.query.id,
            amountPurchased: this.form.amountPurchased,
            deposit: this.form.deposit,
            dosage: this.form.dosage,
            finishTime: this.form.finishTime,
            balance_account_id: this.form.balance_account_id,
            money: this.form.money,
            payment: this.form.payment,
            purchasePrice: this.form.purchasePrice,
            remark: this.form.remark,
            uploadDocuments: this.form.picurl,
            storehouse_id: this.form.storehouse_id,
          });
          console.log(res);
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.$router.push({
              path: `/materialPurchasing?id=${this.$route.query.style_id}`,
            });
          }
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.picurl = res.data.pic_file_url;

      // console.log(this.picurl);
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async stock() {
      // 仓库
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2,
        state: 1,
        storehouse_type: 1,
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
    },
    async init() {
      // 物料
      let { materials_id } = this.$route.query;
      let res = await getMaterialsInfo({
        id: Number(materials_id),
      });
      console.log(res);
      let { data } = res.data;
      this.header = data;
      this.colors = this.header.color_data[0];
      //  {
      //   color: this.header.color_data[0].color,
      //   color_no: this.header.color_data[0].color_no,
      // };

      // 供应商
      let res1 = await getSupplierInfo({
        id: Number(data.materials_supplier_data[0].supplier_id),
      });
      let data1 = res1.data.data;
      this.supplier = data1;

      //
    },
    async selectPayment(value) {
      if (value == 1) {
        this.form.deposit = this.form.fullPayout;
      } else {
        this.form.deposit = "";
      }
    },
    async getBalanceAccount() {
      let res = await balanceAccountSelect({ type: 1 });
      let { data } = res.data;
      this.options = data;
      console.log(data);
    },
  },
  async mounted() {
    this.init();
    this.stock();
    this.getBalanceAccount();
  },
};
</script>

<style lang="less" scoped>
.panelPurchase {
  .main {
    .info {
      .cardInfo {
        margin-right: 80px;
        .cardInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
        .cardInfoContent {
          display: flex;
          .cardInfoContentImg {
            margin-right: 30px;
            img {
              width: 200px;
              height: 200px;
            }
          }
          .cardInfoContentText {
            div {
              margin: 3px 0;
              font-size: 14px;
            }
            .cardInfoContentTextName {
              font-size: 16px;
              font-weight: 600;
              margin-top: 10px;
            }
          }
        }
      }
      .supplierInfo {
        .supplierInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
        .supplierInfoContent {
          display: flex;
          .supplierInfoContentImg {
            img {
              width: 200px;
              height: 200px;
            }
          }
          .supplierInfoContentText {
            margin: 10px 30px;
            div {
              margin: 3px 0;
              font-size: 14px;
            }
            .supplierInfoContentTextName {
              font-size: 16px;
              font-weight: 600;
              margin-top: 10px;
            }
          }
        }
      }
      .purchaseInfo {
        .purchaseInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
      }
      .form {
        margin: 30px 10px;
      }
    }
  }
}
</style>