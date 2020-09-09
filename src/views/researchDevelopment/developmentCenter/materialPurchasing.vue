<template>
  <div class="materialPurchasing">
    <div class="material_purchase_name" v-if="permission.indexOf('materialPurchasing')!=-1">
      <div
        v-for="(item, index) in obj.style_color_data"
        :key="index"
        style="display: flex;align-items: center;"
      >
        <el-divider direction="vertical"></el-divider>
        <div
          style="margin:0 10px;cursor: pointer;"
          @click="handleColorNum(item,index)"
          :class="active===index?'active':''"
        >{{item.style_color_name}}</div>
        <el-divider direction="vertical"></el-divider>
      </div>
    </div>
    <div v-if="permission.indexOf('get_style_purchase')!=-1">
      <div v-for="(item, index) in style_materials" :key="index">
        <div class="content" v-for="(item1, index1) in item.style_materials_data" :key="index1">
          <div class="card">
            <div class="cardStyle">
              <div class="cardStyle_left">
                <div class="cardStyle_left_img">
                  <img :src="item1.picurl" alt />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>{{item1.materials_mainclass_name}} ({{item1.materials_class_name}})</div>
                    <div
                      class="el-icon-close"
                      style="cursor: pointer;"
                      v-if="item1.style_purchase_log_data.length===0&&permission.indexOf('style_purchase_del')!=-1"
                      @click.stop="handleStyleMaterialsDel(item1)"
                    ></div>
                  </div>
                  <div>{{item1.materials_data[0].materialsname}}</div>
                  <div>内部编号:{{item1.materials_data[0].materialsno}}</div>
                  <div
                    v-if="item1.style_materials_supplier_data.length>0"
                  >{{item1.style_materials_supplier_data[0].companyname}}</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div>{{item1.color}}</div>
                  <span class="cardStyle_right_no">{{item1.color_no}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="orderInformation">
            <el-steps finish-status="wait" :active="item1.style_purchase_log_data.length-1">
              <el-step
                style="width:125px"
                v-for="(item_g, index_g) in item1.style_purchase_log_data"
                :key="index_g"
                title
                description
                icon="el-icon-success"
              >
                <template v-slot:title>
                  <div class="tt">
                    <span>
                      {{item_g.logname}}
                      <em>{{''}}</em>
                      <!-- <em v-if="item_g.state == '1'">{{item_g.quantity+"m"}}</em> -->
                    </span>
                    <span>{{item_g.ctime}}</span>
                  </div>
                </template>
                <template v-slot:description>
                  <div class="dt">
                    <!-- <span>{{item_g.logname}}</span> -->
                    <span v-if="index_g==0">{{"预计回料时间"}}</span>
                    <span v-if="item_g.state == '2'">{{"延迟回料时间"}}</span>
                    <span v-if="item_g.state == '1'">{{"部分回料时间"}}</span>
                    <span v-if="item_g.state == '3'">{{"回料总量"}}</span>
                    <span v-if="item_g.state == '3'">{{item1.quantity+'m'}}</span>
                    <span v-else>{{item_g.returntime}}</span>
                    <!-- ****************************************************************** -->
                    <!-- <span v-if="item_g.state == '2'">{{"延迟回料时间"}}</span>
                  <span v-if="item_g.state == '1'">{{"部分回料时间"}}</span>
                  <span v-if="item_g.state == '3'">{{"回料总量"}}</span>
                  <span v-else-if="item_g.state == '0'">{{item1.finishTime}}</span>
                    <span v-else>{{item_g.returntime}}</span>-->
                  </div>
                </template>
              </el-step>
            </el-steps>
            <div>
              <el-button
                size="mini"
                round
                @click="goPanelPurchase(item1)"
                v-if="item1.style_purchase_log_data.length===0&&permission.indexOf('purchase_edit')!=-1"
              >{{"采购录入"}}</el-button>

              <el-button
                size="mini"
                round
                @click="updateStatus(item1)"
                v-if="item1.style_purchase_log_data.length>0&&item1.style_purchase_log_data[item1.style_purchase_log_data.length-1].state!=='3'&&permission.indexOf('style_purchase_log_add')!=-1"
              >{{"更新状态"}}</el-button>
              <el-button
                size="mini"
                style="margin-left:10px"
                @click.stop="seeDetails1(item1)"
                v-if="item1.style_purchase_log_data.length>0 &&item1.style_purchase_log_data[item1.style_purchase_log_data.length-1].state=='3'"
                round
              >查看详情</el-button>
              <!-- &&item1.style_purchase_log_data[item1.style_purchase_log_data.length-1].logname!=='全部回料' -->
            </div>
          </div>
        </div>
        <el-divider content-position="right">{{item.mainclass}}</el-divider>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog width="30%" title="请选择更新后的状态" class="tan" :visible.sync="outerVisible" center>
      <!-- 全部回料 -->
      <el-dialog width="30%" title="请上传全部回料凭证" :visible.sync="innerVisibled1" append-to-body center>
        <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px">
          <el-form-item label="结算金额" prop="money">
            <el-input placeholder="请输入内容" style="width:50%" v-model="form2.money"></el-input>
          </el-form-item>
          <!-- <el-form-item label="仓库:" prop="storehouse_id">
            <el-select
              clearable
              v-model="form2.storehouse_id"
              placeholder="请选择仓库"
              style="width:50%"
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
                @size-change="handleSize1"
                @current-change="handleCurrent1"
                :total="total1"
              ></el-pagination>
            </el-select>
          </el-form-item>-->
          <el-upload
            class="avatar-uploader1"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form2.imageUrl" :src="form2.imageUrl" class="avatar1" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
          <div style="width:150px;margin:0 auto">
            <el-button @click="innerVisibled1 = false">取消</el-button>
            <el-button @click="allMaterial">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 部分回料 -->
      <el-dialog width="30%" title="部分回料" :visible.sync="innerVisible" append-to-body center>
        <el-form ref="form3" :model="form3" :rules="rules" label-width="120px">
          <el-form-item label="回料数量" prop="number">
            <el-input placeholder="请输入内容" style="width:50%" v-model="form3.number"></el-input>
          </el-form-item>
          <el-form-item label="结算金额" prop="money">
            <el-input placeholder="请输入内容" style="width:50%" v-model="form3.money"></el-input>
          </el-form-item>
          <el-form-item label="部分回料时间" prop="date">
            <el-date-picker v-model="form3.date" type="date" style="width:50%" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <!-- <el-form-item label="仓库:" prop="storehouse_id">
            <el-select
              clearable
              v-model="form3.storehouse_id"
              placeholder="请选择仓库"
              style="width:50%"
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
                @size-change="handleSize1"
                @current-change="handleCurrent1"
                :total="total1"
              ></el-pagination>
            </el-select>
          </el-form-item>-->
          <el-form-item label="余结金额">
            <span style="width:50%" :model="form3.money1"></span>
          </el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form3.imageUrl" :src="form3.imageUrl" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
          <div style="width:200px;margin:0 auto">
            <el-button @click="innerVisible = false">取消</el-button>
            <el-button @click="partBack()">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 延迟回料 -->
      <el-dialog width="30%" title="延迟回料" :visible.sync="innerVisibled" append-to-body center>
        <el-form ref="form4" :model="form4" :rules="rules1" label-width="80px">
          <el-form-item label="延迟时间" prop="date">
            <el-date-picker v-model="form4.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="原因" prop="reason">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form4.reason"></el-input>
          </el-form-item>
          <div style="width:200px;margin:0 auto">
            <el-button @click="innerVisibled = false">取消</el-button>
            <el-button @click="delayBack()">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div slot="footer" style="height:80px;" class="dialog-footer">
        <el-button @click="outerVisible = false;innerVisibled1 = true;">全部回料</el-button>
        <el-button @click="outerVisible = false;innerVisible = true;">部分回料</el-button>
        <el-button @click="outerVisible = false;innerVisibled = true;">延迟回料</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getStyle,
  styleMaterialsResume,
  getMaterialsProcureList,
  stylePurchaseDel,
  stylePurchaseLogAdd,
} from "@/api/researchDevelopment";
import { storehouseList } from "@/api/warehouse";

import moment from "moment";
export default {
  data() {
    return {
      pageIndex1: 1,
      pageSize1: 10,
      total1: 0,
      power: "",
      cardList: [
        {
          materialsCard: "主料卡",
          materials: "主料",
        },
        {
          materialsCard: "里料卡",
          materials: "里料",
        },
        {
          materialsCard: "辅料卡",
          materials: "辅料",
        },
        {
          materialsCard: "工艺卡",
          materials: "工艺",
        },
      ], //首页大数据
      activities_endlong: [
        {
          logname: "已下单",
          ctime: "",
        },
        {
          logname: "部分回料",
          ctime: "",
        },
        {
          logname: "延迟回料",
          ctime: "",
        },
        {
          logname: "回料",
          ctime: "",
        },
      ], //日志
      obj: {},
      style_materials: [],
      active: 0,
      tabItem: {},
      outerVisible: false,
      innerVisible: false,
      innerVisibled: false,
      innerVisibled1: false,
      form2: {
        imageUrl: "",
        // storehouse_id: "",
        money: "",
      },
      ware: [],
      form3: {
        number: "",
        money: "",
        money1: "",
        date: "",
        imageUrl: "",
        // storehouse_id: "",
      },
      form4: {
        date: "",
        reason: "",
      },
      // 表单规则
      rules: {
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        // storehouse_id: [
        //   { required: true, message: "请输入仓库", trigger: "blur" },
        // ],
      },
      rules1: {
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        reason: [{ required: true, message: "请输入原因", trigger: "blur" }],
      },
      rules2: {
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        // storehouse_id: [
        //   { required: true, message: "请输入仓库", trigger: "blur" },
        // ],
      },
      permission: [],
    };
  },
  methods: {
    // 采购查看
    async seeDetails1(item) {
      this.$router.push({
        path: `/materialTable?materials_id=${item.materials_id}`,
      });
    },
    // 全部回料
    async allMaterial() {
      this.innerVisibled1 = false;

      let res = await stylePurchaseLogAdd({
        style_purchase_id: this.produce_order_procure_id, //生产采购单id
        logname: "全部回料", //日志名称
        returntime: "", //预计回料时间/部分回料时间/延迟时间
        state: "3", //回料状态 1部份回料 2延时回料 3全部回料
        picurl: this.form2.imageUrl, //凭证图片
        quantity: 0, //回料数量
        amount: Number(this.form2.money), //结算金额
        remarks: "", //原因备注
        // storehouse_id: Number(this.form2.storehouse_id), //原因备注
      });
      console.log(res);
      this.init();
    },
    // 部分回料
    partBack() {
      this.$refs["form3"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.innerVisible = false;
        this.form3.date = moment(this.form3.date).format("YYYY-MM-DD");
        let res = await stylePurchaseLogAdd({
          style_purchase_id: this.produce_order_procure_id, //生产采购单id
          logname: "部分回料", //日志名称
          returntime: this.form3.date, //预计回料时间/部分回料时间/延迟时间
          state: "1", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form3.imageUrl, //凭证图片
          quantity: Number(this.form3.number), //回料数量
          amount: Number(this.form3.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form3.storehouse_id), //原因备注
        });
        this.init();
        console.log(res);
      });
    },
    // 延迟回料
    delayBack() {
      this.$refs["form4"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法

        this.innerVisibled = false;
        this.form4.date = moment(this.form4.date).format("YYYY-MM-DD");
        let res = await stylePurchaseLogAdd({
          style_purchase_id: this.produce_order_procure_id, //生产采购单id
          logname: "延迟回料", //日志名称
          returntime: this.form4.date, //预计回料时间/部分回料时间/延迟时间
          state: "2", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form4.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: 0, //结算金额
          remarks: this.form4.reason, //原因备注
        });
        this.init();
        console.log(res);
      });
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    handleAvatarSuccess(res, file) {
      this.form3.imageUrl = res.data.pic_file_url;
    },
    handleAvatarSuccess1(res, file) {
      this.form2.imageUrl = res.data.pic_file_url;
    },
    handleAvatarSuccess2(res, file) {
      this.tailorList[this.ac].imageUrl = res.data.pic_file_url;
    },
    updateStatus() {},
    async handleStyleMaterialsDel(e) {
      this.$confirm("此操作将永久删除该物料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(e);
          let res = await stylePurchaseDel({
            id: e.id,
          });
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.init();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handleColorNum(item, index) {
      this.active = index;
      this.tabItem = item;
      // let res1 = await getMaterialsProcureList({
      //   style_id: this.tabItem.style_id,
      //   style_color_name: this.tabItem.style_color_name
      // });
      // console.log(res1);
      // let { data } = res1.data;
      // this.style_materials = data;
      this.init();
    },
    goPanelPurchase(e) {
      console.log(e);
      this.$router.push({
        path: `/PanelPurchase?materials_id=${
          e.materials_id
        }&tabName=${"版料采购"}&id=${e.id}&style_id=${e.style_id}&project_id=${
          this.$route.query.project_id
        }`,
      });
    },
    // 更新状态
    async updateStatus(item) {
      this.outerVisible = true;
      this.produce_order_procure_id = item.id;
    },
    handleSize1(val) {
      this.pageSize1 = val;
    },
    handleCurrent1(val) {
      this.pageIndex1 = val;
    },
    async storehouseInit() {
      let res2 = await storehouseList({
        page: this.pageIndex1,
        page_size: this.pageSize1,
      });
      console.log(res2);
      let { data } = res2.data;
      this.ware = data;
      this.total1 = res2.data.count;
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      if (this.obj.style_color_data.length != 0) {
        let res1 = await getMaterialsProcureList({
          style_id:
            this.tabItem.style_id || this.obj.style_color_data[0].style_id,
          style_color_name:
            this.tabItem.style_color_name ||
            this.obj.style_color_data[0].style_color_name,
        });
        let { data } = res1.data;
        this.style_materials = data;
        // console.log(data);
      }
    },
  },
  mounted() {
    this.init();
    this.storehouseInit();
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
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
      justify-content: space-between;
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
              .el-icon-close {
                cursor: pointer;
              }
            }
          }
        }
        .cardStyle_right {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 100px;
          background-color: #f2f2f2;
          border-radius: 10px;
          .cardStyle_right_no {
            text-justify: newspaper;
            word-break: break-all;
            text-align: justify;
          }
        }
      }
    }
    .orderInformation {
      border-radius: 10px;
      background-color: #f2f2f2;
      flex: 1;
      // width: 600px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 100px;
      padding: 10px;
    }
  }
  .active {
    border-bottom: 1px solid aqua;
    color: aqua;
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
// 弹框上传照片
.el-dialog__wrapper {
  /deep/.el-form {
    position: relative;
    .avatar-uploader {
      position: absolute;
      top: 0px;
      right: 3%;
    }
    .avatar-uploader1 {
      position: relative;
      margin-bottom: 15px;
      top: 0px;
      left: 40%;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader1 {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    background: #ccc;
    width: 110px;
    height: 110px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader1 .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .avatar1 {
    width: 110px;
    height: 110px;
    display: block;
  }
}
// patternStatus
// PatternStatus
</style>