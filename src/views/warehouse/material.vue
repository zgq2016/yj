<template>
  <div class="material">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>物料库存查询 或 采购</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="searchInput">
        <el-form :inline="true" :model="form">
          <el-form-item label="仓库:">
            <el-select v-model="form.warehouse" placeholder="请选择仓库" style="width:120px">
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

          <el-form-item label="物料名称:">
            <el-input style="width:130px" v-model="form.commodity" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="物料分类:">
            <el-select
              v-model="form.materials_class"
              placeholder="请选择物料分类"
              style="width:120px;margin-right:10px;"
              @change="handleClassDatasId($event)"
            >
              <el-option
                v-for="item in classData"
                :key="item.id"
                :label="item.classname"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.materials_class_name"
              placeholder="请选择物料分类"
              style="width:120px"
            >
              <el-option
                v-for="item in class_datas.class_data"
                :key="item.id"
                :label="item.classname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数量:">
            <el-input style="width:100px" v-model="form.beforenumber" placeholder="请输入数量"></el-input>&nbsp;至
            <el-input style="width:100px" v-model="form.afternumber" placeholder="请输入数量"></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.checked">过滤无库存</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary">展示统计数据</el-button>
            <el-button type="primary">导出</el-button>
            <el-button v-print="'#printTest'" type="primary">打印</el-button>
          </el-form-item>
          <el-button type="primary" style="float:right;margin-right:35px;" @click="handleCard">采购</el-button>
        </el-form>
      </div>
      <hr style="border:1px dashed #ccc" />
      <div class="table">
        <div class="box">
          <div class="child" @click="toMaterial()">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594964476331&di=3f3573c4fd9b0f2ca185560428315961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dde32eec79e13b07ebdbd50003cd59113%2F90ef76c6a7efce1bb8d6a12ca251f3deb58f6552.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594964476331&di=3f3573c4fd9b0f2ca185560428315961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dde32eec79e13b07ebdbd50003cd59113%2F90ef76c6a7efce1bb8d6a12ca251f3deb58f6552.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
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
        <div style="display:flex;align-items: center;">
          <el-input
            v-model="searchInput"
            @input="handleSearchInput"
            placeholder="查找"
            style="width:300px"
          ></el-input>
          <router-link :to="`/addRouteCard?`" style="margin-left:30px">新增主料卡</router-link>
        </div>
        <div class="searchCard">
          <div class="card" v-for="(item, index) in MaterialsList" :key="index">
            <div class="cardStyle">
              <div class="cardStyle_left" @click="addMaterialsList(item)">
                <div class="cardStyle_left_img">
                  <img :src="item.picurl" alt />
                </div>
                <div class="cardStyle_left_content">
                  <div style="font-weight: 600;font-size: 14px;">
                    {{item.materials_mainclass_name}}
                    <em
                      v-if="item.materials_class_name"
                    >({{item.materials_class_name}})</em>
                  </div>
                  <div>{{item.materialsname}}</div>
                  <div>内部编号:{{item.materialsno}}</div>
                  <div
                    v-if="item.supplier_data.length>0"
                  >{{item.supplier_data[0].supplier_companyname}}</div>
                </div>
              </div>
              <div class="cardStyle_right" @mouseleave="visible = false">
                <div style="cursor: pointer;" @click="handlePopoverId(item)">
                  <el-popover width="100" v-model="visible" v-if="popoverId===item.id">
                    <div class="colourNumberList">
                      <div
                        class="colourNumber"
                        @click.stop="handleColourNumber(item,item1)"
                        v-for="(item1, index1) in item.materials_color_data"
                        :key="index1"
                      >
                        <img :src="item1.picurl" alt />
                        <div>{{item1.color}} {{item1.color_no}}</div>
                      </div>
                    </div>
                  </el-popover>
                  <div>{{item.color||item.materials_color_data[0].color}}</div>
                  <div>{{item.color_no||item.materials_color_data[0].color_no}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChang"
          @current-change="handleCurrentChang"
          :current-page="pageIndex"
          :page-sizes="[9, 18, 27, 36]"
          :page-size="pageSize"
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
        <div class="userProfile" style="margin:20px 0px;text-align:center">
          <span style="padding:10px 15px">
            事件号：
            自动生成
          </span>
          <span>
            经办人：
            自动生成
          </span>
        </div>
        <el-form ref="form1" :model="form1" :rules="rules" label-width="100px">
          <el-form-item prop="amountPurchased" label="采购量:">
            <el-input style="width:60%;" v-model="form1.amountPurchased"></el-input>
          </el-form-item>
          <el-form-item prop="purchasePrice" label="采购单价:">
            <el-input style="width:60%;" v-model="form1.purchasePrice"></el-input>
          </el-form-item>
          <el-form-item prop="money" label="金额:">
            <el-input style="width:60%;" v-model="form1.money"></el-input>
          </el-form-item>
          <el-form-item prop="payManneItem" label="支付方式:">
            <el-select v-model="form1.payManneItem" style="width:60%;" placeholder="请选择支付方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="entrepot" label="仓库:">
            <el-select v-model="form1.entrepot" style="width:60%;" placeholder="请选择仓库类型">
              <el-option
                v-for="item in entrepots"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传凭证:">
            <el-upload
              class="avatar-uploader"
              action="https://yj.ppp-pay.top/uploadpic.php"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form1.picurl" :src="form1.picurl" class="avatar" />
              <i v-else class="el-icon-upload avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
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
      style="float:right"
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
  projectStyleMaterialsAdd
} from "@/api/researchDevelopment";
import { storehouseList } from "@/api/warehouse.js";
import { getMaterialsClass, getMaterialsClassInfo } from "@/api/archives.js";
export default {
  data() {
    return {
      entrepots: [],
      options: [
        //选择支付方式
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "微信",
          label: "微信"
        },
        {
          value: "支付宝",
          label: "支付宝"
        }
      ],
      popoverId: "",
      visible: false,
      MaterialsList: [], //物料数组
      searchInput: "", //物料搜索
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      input: "",
      form: {
        checked: true
      },
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      pageIndex1: 1,
      pageSize1: 9,
      pageIndex2: 1,
      pageSize2: 9,
      total1: 0,
      total2: 0,
      form1: { picurl: "" },
      rules: {
        amountPurchased: [
          { required: true, message: "请输入采购量", trigger: "blur" }
        ],
        purchasePrice: [
          { required: true, message: "请输入采购单价", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        payManneItem: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        entrepot: [
          { required: true, message: "请选择仓库类型", trigger: "change" }
        ]
      },
      classData: [],
      class_datas: [],
      classDatasId: "",
      ware: []
    };
  },
  methods: {
    // 获取分类
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId
      });
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class_name = "";
      this.form.materials_class_id = "";
      if (data.class_data.length > 0) {
        this.form.materials_class_name = this.class_datas.class_data[0].classname;
        // this.form.materials_class_id = this.class_datas.class_data[0].id;
      }
    },
    toMaterial(item) {
      this.$router.push({
        path: `/materialTable?materials_id=${112}`
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.init();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.init();
    },
    handleSizeChang(val) {
      this.pageSize1 = val;
      this.init();
    },
    handleCurrentChang(val) {
      this.pageIndex1 = val;
      this.init();
    },
    onSubmit() {
      console.log(this.form);
    },
    handleAvatarSuccess(res, file) {
      this.form1.picurl = res.data.pic_file_url;
      // console.log(this.picurl);
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    // 弹框输入
    async handleSearchInput() {
      let res = await getMaterialsList({
        keyword: this.searchInput,
        page: this.pageIndex,
        page_size: this.pageSize
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
    },
    // 增加物料
    async addMaterialsList(item) {
      console.log(item);
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.centerDialogVisible1 = false;
        this.centerDialogVisible2 = true;
        this.form1 = { picurl: "" };
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
        page_size: this.pageSize
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
    // 采购信息保存
    conserve() {
      this.$refs["form1"].validate(valid => {
        if (!valid) return;
        this.centerDialogVisible2 = false;
        console.log(this.form1);
      });
    },
    async init() {
      // 仓库
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;

    }
  },
  mounted() {
    this.getClassData();
    this.init();
  }
};
</script>
<style lang="less" scoped>
.material {
  .main {
    margin: 20px;
    /deep/.pagination {
      float: right;
    }
    .searchInput {
      overflow: hidden;
    }
    .table {
      .box {
        overflow: hidden;
        .child {
          cursor: pointer;
          overflow: hidden;
          float: left;
          width: 30%;
          margin-left: 3%;
          margin-top: 15px;

          .left {
            float: left;
            width: 80%;
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
            }
          }
          .right {
            border-radius: 12px;
            background: #f2f2f2;
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