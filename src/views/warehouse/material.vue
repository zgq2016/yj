<template>
  <div class="material" v-if="permission.indexOf('material') != -1">
    <!-- 面包屑 -->
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>仓库</el-breadcrumb-item>
          <el-breadcrumb-item>物料库存查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <div style="margin-bottom: 10px">
        <el-input
          size="small"
          style="width: 170px; margin-right: 10px"
          v-model="form.materialsname"
          placeholder="请输入商品名称"
        ></el-input>
        <el-input
          style="width: 115px"
          size="small"
          type="number"
          v-model="form.min"
          placeholder="请输入数量"
        ></el-input
        >&nbsp;至
        <el-input
          style="width: 115px"
          size="small"
          type="number"
          v-model="form.max"
          placeholder="请输入数量"
        ></el-input>
        <el-button
          icon="el-icon-search"
          size="mini"
          circle
          class="search_button"
          @click="onSubmit"
        ></el-button>
      </div>
      <el-form :inline="true" :model="form">
        <el-form-item>
          <el-select
            v-model="form.storehouse_id"
            size="small"
            placeholder="请选择仓库"
            @change="onSubmit"
            clearable
            style="width: 110px"
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
        <el-form-item>
          <el-select
            size="small"
            v-model="form.materials_class_name"
            @change="handleClassDatasId($event)"
            placeholder="请选择物料分类"
            style="width: 140px; margin-right: 10px"
            clearable
          >
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.materials_class"
            @change="handleClassDatasId1($event)"
            placeholder="请选择物料小分类"
            style="width: 140px"
            size="small"
          >
            <el-option
              v-for="item in class_datas.class_data"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-checkbox @change="onSubmit" v-model="form.checked"
            >过滤无库存</el-checkbox
          >
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
          >
            <div class="addStyle">展示统计数据</div>
            <!-- <div class="addStyle" @click="handleCard">采购</div> -->
            <!-- v-if="permission.indexOf('C3000200')!=-1" -->
          </div>
        </el-form-item>
      </el-form>

      <div class="table">
        <div class="box">
          <div
            class="child"
            v-for="(item, index) in materials"
            :key="index"
            @click.stop="toMaterial(item)"
          >
            <div class="left">
              <img :src="item.picurl" alt />
              <div class="left_n">
                <span
                  class="hide"
                  :title="
                    item.classname + '(' + item.materials_class_name + ')'
                  "
                  >{{ item.classname }}({{ item.materials_class_name }})</span
                >
                <!-- <span>{{item.materialsname}}</span> -->
                <span>{{ item.color }}</span>
                <span>内部编号:{{ item.materialsno }}</span>
                <span>{{ item.companyname }}</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>{{ item.quantity }}</em>
            </div>
          </div>
        </div>
      </div>

      <!-- 新增物料 -->
      <el-dialog
        title="添加物料"
        :visible.sync="centerDialogVisible1"
        width="60%"
        center
        class="dialog1"
      >
        <div style="display: flex; align-items: center">
          <el-input
            v-model="searchInput"
            @input="handleSearchInput"
            placeholder="查找"
            style="width: 300px"
          ></el-input>
          <router-link
            :to="`/addRouteCard?`"
            style="margin-left: 30px"
            v-if="permission.indexOf('materials_add') != -1"
            >新增主料卡</router-link
          >
        </div>
        <div class="searchCard">
          <div class="card" v-for="(item, index) in MaterialsList" :key="index">
            <div class="cardStyle">
              <div class="cardStyle_left" @click="addMaterialsList(item)">
                <div class="cardStyle_left_img">
                  <img :src="item.picurl" alt />
                </div>
                <div class="cardStyle_left_content">
                  <div style="font-weight: 600; font-size: 14px">
                    {{ item.materials_mainclass_name }}
                    <em v-if="item.materials_class_name"
                      >({{ item.materials_class_name }})</em
                    >
                  </div>
                  <div>{{ item.materialsname }}</div>
                  <div>内部编号:{{ item.materialsno }}</div>
                  <div v-if="item.supplier_data.length > 0">
                    {{ item.supplier_data[0].supplier_companyname }}
                  </div>
                </div>
              </div>
              <div class="cardStyle_right" @mouseleave="visible = false">
                <div style="cursor: pointer" @click="handlePopoverId(item)">
                  <el-popover
                    width="100"
                    v-model="visible"
                    v-if="popoverId === item.id"
                  >
                    <div class="colourNumberList">
                      <div
                        class="colourNumber"
                        @click.stop="handleColourNumber(item, item1)"
                        v-for="(item1, index1) in item.materials_color_data"
                        :key="index1"
                      >
                        <img :src="item1.picurl" alt />
                        <div>{{ item1.color }} {{ item1.color_no }}</div>
                      </div>
                    </div>
                  </el-popover>
                  <div>
                    {{ item.color || item.materials_color_data[0].color }}
                  </div>
                  <div>
                    {{ item.color_no || item.materials_color_data[0].color_no }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChang"
          @current-change="handleCurrentChang"
          :current-page="pageIndex1"
          :page-sizes="[9, 18, 27, 36]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
        ></el-pagination>
      </el-dialog>
      <!-- 采购信息 -->
      <el-dialog
        title="采购信息"
        :visible.sync="centerDialogVisible2"
        width="40%"
        center
        class="dialog2"
      >
        <div class="userProfile" style="margin: 20px 0px; text-align: center">
          <span style="padding: 10px 15px"> 事件号： 自动生成 </span>
          <span> 经办人： 自动生成 </span>
        </div>
        <el-form ref="form1" :model="form1" :rules="rules" label-width="110px">
          <el-form-item prop="amountPurchased" label="采购量:">
            <el-input
              style="width: 60%"
              @input="sum"
              v-model.number="form1.amountPurchased"
            ></el-input>
          </el-form-item>
          <el-form-item prop="purchasePrice" label="采购单价:">
            <el-input
              style="width: 60%"
              @input="sum"
              v-model.number="form1.purchasePrice"
            ></el-input>
          </el-form-item>
          <el-form-item prop="money" label="金额:">
            <el-input
              style="width: 60%"
              v-model.number="form1.money"
            ></el-input>
          </el-form-item>
          <el-form-item prop="payManneItem" label="结算账户:">
            <el-select
              v-model="form1.balance_account_id"
              style="width: 60%"
              placeholder="请选择支付方式"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.account_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="storehouse_id" label="仓库:">
            <el-select
              v-model="form1.storehouse_id"
              style="width: 60%"
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
          <el-form-item label="预计回料时间" prop="finishTime">
            <el-date-picker
              v-model="form1.finishTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="上传凭证:">
            <el-upload
              class="avatar-uploader"
              :action="url + '/uploadpic.php'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form1.uploadDocuments"
                :src="form1.uploadDocuments"
                style="width: 150px; height: 150px"
                class="avatar"
              />
              <i v-else class="el-icon-upload avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.remark"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="conserve">保存</el-button>
            <el-button @click="backtrack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getMaterialsList,
  projectStyleMaterialsAdd,
} from "@/api/researchDevelopment";
import { url } from "@/api/configuration";
import {
  storehouseList,
  materialStoreList,
  materialsPurchase,
  balanceAccountSelect,
} from "@/api/warehouse.js";
import { getMaterialsClass, getMaterialsClassInfo } from "@/api/archives.js";
export default {
  data() {
    return {
      url: url,
      materials: 0,
      materials: [],
      entrepots: [],
      options: [
        //选择支付方式
        {
          value: "中国农业银行",
          label: "中国农业银行",
        },
        {
          value: "中国工商银行",
          label: "中国工商银行",
        },
        {
          value: "微信",
          label: "微信",
        },
        {
          value: "支付宝",
          label: "支付宝",
        },
      ],
      popoverId: "",
      visible: false,
      MaterialsList: [], //物料数组
      searchInput: "", //物料搜索
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      input: "",
      form: {
        checked: false,
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      pageIndex1: 1,
      pageSize1: 9,
      pageIndex2: 1,
      pageSize2: 10,
      total1: 0,
      total2: 0,
      form1: { uploadDocuments: "" },
      rules: {
        amountPurchased: [
          { required: true, message: "请输入采购量", trigger: "blur" },
          { type: "number", message: "采购量必须为数字值" },
        ],
        purchasePrice: [
          { required: true, message: "请输入采购单价", trigger: "blur" },
          { type: "number", message: "采购必须为数字值" },
        ],
        money: [
          { required: true, message: "请输入金额", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" },
        ],
        balance_account_id: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        storehouse_id: [
          { required: true, message: "请选择仓库类型", trigger: "change" },
        ],
        finishTime: [
          {
            type: "date",
            required: true,
            message: "请输入时间",
            trigger: "blur",
          },
        ],
      },
      classData: [],
      class_datas: [],
      classDatasId: "",
      ware: [],
      permission: [],
    };
  },
  methods: {
    async balanc() {
      // 结算账户
      let res3 = await balanceAccountSelect();
      this.options = res3.data.data;
      console.log(res3);
    },
    // 获取分类
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async handleClassDatasId(e) {
      // console.log(e);
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId,
      });
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class = "";
      this.form.materials_class_id = "";
      if (e != "") {
        if (data.class_data.length > 0) {
          this.form.materials_class = this.class_datas.class_data[0].classname;
          this.form.materials_class_id = this.class_datas.class_data[0].id;
        }
      }
      this.onSubmit();
    },
    async handleClassDatasId1(e) {
      // console.log(this.class_datas);
      this.form.materials_class = "";
      this.form.materials_class_id = "";
      this.class_datas.class_data.map((v, i) => {
        if (e == v.id) {
          this.form = Object.assign({}, this.form, {
            materials_class: v.classname,
            materials_class_id: v.id,
          });
        }
      });
      this.onSubmit();
      console.log(this.form);
    },
    toMaterial(item) {
      console.log(item);
      this.$router.push({
        path: `/materialTable?materials_id=${item.id}`,
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init(this.form);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.form);
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.stock();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.stock();
    },
    handleSizeChang(val) {
      this.pageSize1 = val;
      this.handleSearchInput();
    },
    handleCurrentChang(val) {
      this.pageIndex1 = val;
      this.handleSearchInput();
    },
    onSubmit() {
      if (this.form.checked == true) {
        this.form.hide_empty = 1;
      } else {
        this.form.hide_empty = 0;
      }
      this.pageIndex = 1;
      // console.log(this.form);
      this.init(this.form);
    },
    handleAvatarSuccess(res, file) {
      this.form1.uploadDocuments = res.data.pic_file_url;
      // console.log(this.picurl);
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    // 弹框输入
    async handleSearchInput() {
      let res = await getMaterialsList({
        keyword: this.searchInput,
        page: this.pageIndex1,
        page_size: this.pageSize1,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
    },
    // 增加物料
    async addMaterialsList(item) {
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.centerDialogVisible1 = false;
        this.centerDialogVisible2 = true;
        this.form1 = {};
        this.form1.uploadDocuments = "";
        this.materials_id = item.id;
      });
    },
    handlePopoverId(item) {
      this.popoverId = item.id;
      this.visible = true;
    },
    handleColourNumber(item, item1) {
      this.materials_color_id = item1.id;
      item["color"] = item1.color;
      item["color_no"] = item1.color_no;
      this.visible = false;
    },
    async handleCard() {
      this.searchInput = "";
      // this.materials = item.materials;
      this.centerDialogVisible1 = true;
      let res = await getMaterialsList({
        keyword: "",
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
      this.total1 = count;
    },
    // 采购信息返回
    backtrack() {
      this.centerDialogVisible1 = true;
      this.centerDialogVisible2 = false;
    },
    // 输入计算
    sum(value) {
      console.log(this.form1.amountPurchased, this.form1.purchasePrice);
      if (
        this.form1.amountPurchased != undefined &&
        this.form1.purchasePrice != undefined &&
        this.form1.amountPurchased != "" &&
        this.form1.purchasePrice != ""
      ) {
        this.form1.money =
          this.form1.amountPurchased * this.form1.purchasePrice;
      } else {
        this.form1.money = 0;
      }
    },
    // 采购信息保存
    conserve() {
      console.log(this.form1);
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return;
        this.centerDialogVisible2 = false;
        let res = await materialsPurchase({
          materials_id: this.materials_id,
          amountPurchased: this.form1.amountPurchased,
          money: this.form1.money,
          balance_account_id: this.form1.balance_account_id,
          purchasePrice: this.form1.purchasePrice,
          storehouse_id: this.form1.storehouse_id,
          uploadDocuments: this.form1.picurl,
          finishTime: moment(this.form1.finishTime).format("YYYY-MM-DD"),
          remark: this.form1.remark,
        });
        console.log(res);
      });
    },
    async init(obj) {
      let res = await materialStoreList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj,
      });
      console.log(res);
      let { data } = res.data;
      this.materials = data;
      this.total = res.data.count;
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
  },
  mounted() {
    this.getClassData();
    this.init();
    this.stock();
    this.balanc();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>
<style lang="less" scoped>
.material {
  .main {
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
    .table {
      .img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
      }
    }
    .form {
      width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    @media screen and (max-width: 1440px) {
      .table {
        width: 1440px;
      }
    }
    .table {
      .box {
        overflow: hidden;
        .child {
          cursor: pointer;
          overflow: hidden;
          float: left;
          width: 370px;
          margin-top: 20px;
          .left {
            float: left;
            width: 270px;
            overflow: hidden;
            border-radius: 12px;
            background: #f2f2f2;
            img {
              width: 100px;
              height: 100px;
              float: left;
            }
            .left_n {
              float: left;

              span {
                display: block;
                padding: 3px;
              }
              span:first-of-type {
                font-size: 14px;
                font-weight: 900;
                color: #000;
              }
              .hide {
                width: 170px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
              }
            }
          }
          .right {
            border-radius: 12px;
            background: #f2f2f2;
            width: 100px;
            height: 104px;
            line-height: 40px;
            float: left;
            width: 20%;
            text-align: center;
          }
        }
      }
    }
  }
  .dialog2 {
    /deep/.el-dialog__body {
      padding: 25px 80px 30px;
      .el-form {
        // /deep/.avatar-uploader{
        //   width: 150px;
        //   height: 150px;
        // }
        .el-form-item:last-of-type {
          .el-form-item__content {
            margin-left: 0 !important;
            text-align: center;
          }
        }
      }
    }
  }
  .dialog1 {
    /deep/.el-dialog__body {
      overflow: hidden;
    }
    .searchCard {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .card {
        margin: 10px 20px;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .cardStyle {
          width: 320px;
          height: 100px;
          display: flex;
          .cardStyle_left {
            width: 270px;
            display: flex;
            background-color: #f2f2f2;
            border-radius: 10px;
            overflow: hidden;
            .cardStyle_left_img {
              img {
                width: 100px;
                height: 100px;
              }
            }
            .cardStyle_left_content {
              flex: 1;
              div {
                margin: 3px;
              }
              .cardStyle_left_content_name {
                font-weight: 600;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
              }
            }
          }
          .cardStyle_right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            background-color: #f2f2f2;
            border-radius: 10px;
            .colourNumberList {
              .colourNumber {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 10px;
                cursor: pointer;
              }
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>