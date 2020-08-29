<template>
  <div class="salesOrderDetails">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <!-- <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" /> -->
        <el-breadcrumb-item>销售</el-breadcrumb-item>
        <el-breadcrumb-item>销售订单</el-breadcrumb-item>
        <el-breadcrumb-item>销售订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="top">
        <div class="rh_left">
          <h4>销售订单-{{form.no}}-{{'zaan'}}</h4>
        </div>
        <div class="rh_right">
          <el-button size="mini" type="primary">扫码</el-button>
          <el-button size="mini" type="primary">导入</el-button>
          <el-button
            size="mini"
            @click="addCreateWare"
            type="primary"
            v-if="permission.indexOf('customer_order_add')!=-1"
          >新增销售订单</el-button>
        </div>
      </div>
      <hr style="border:1px dashed #ccc;margin:0 10px" />

      <div class="right_form">
        <el-form :model="form" ref="form">
          <el-form-item style="overflow: hidden;width:100%;">
            <div style="float:left;padding:10px 0 0 15px;">
              客户尚欠款:
              <em style="color:red;">&yen;{{'0.00'}}</em>
            </div>
            <div class="cssa" style="float:right;padding:10px 15px 0 0;width:210px;">
              <el-steps :space="110" align-center :active="actionsLenght" finish-status="wait">
                <el-step icon="el-icon-success" title="草稿"></el-step>
                <el-step icon="el-icon-success" title="已售出"></el-step>
                <el-step icon="el-icon-success" v-if="this.$route.query.state == 4" title="已撤销"></el-step>
              </el-steps>
            </div>
          </el-form-item>

          <!-- prop="factory_name" -->
          <el-form-item style="float:left;width:30%;margin-left:3%;" label="客户:">
            <span>{{form.companyname}}</span>
          </el-form-item>
          <!-- prop="storehouse_name" -->
          <el-form-item style="float:left;width:30%;margin-left:2%;" label="仓库:">
            <span>{{form.storehouse_name}}</span>
          </el-form-item>
          <!-- prop="ctime" -->
          <el-form-item style="float:left;width:30%;margin-left:1%;" label="日期:">
            <span>{{form.ctime}}</span>
          </el-form-item>
          <el-form-item style="float:left;width:30%;margin-left:3%;" label="结算账户:">
            <span>{{form.account_name}}</span>
          </el-form-item>
          <el-form-item style="float:left;width:30%;margin-left:2%;" label="实付金额:">
            <span>{{form.pay_money}}</span>
          </el-form-item>
          <el-form-item style="float:left;width:31%;margin-left:1%;" label="备注:" prop="desc">
            <span>{{form.remarks}}</span>
          </el-form-item>
        </el-form>
      </div>

      <!-- 已入库/已撤销 -->
      <div class="table">
        <el-table
          :data="weretable"
          show-summary
          size="small"
          style="cursor: pointer;"
          :summary-method="getSummaries"
        >
          <el-table-column type="index" width="45"></el-table-column>
          <el-table-column align="center" width="80" label="图片">
            <template align="center" slot-scope="scope" property="style_pic_url">
              <el-image
                style="width: 50px; height: 50px;border-radius: 5px;margin-right: 5px;"
                :src="scope.row.style_pic_url"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="stylename" align="center" label="商品"></el-table-column>
          <el-table-column property="produce_no" align="center" label="款号"></el-table-column>
          <el-table-column prop="bar_code" align="center" label="条码"></el-table-column>
          <el-table-column prop="style_color_name" align="center" label="颜色"></el-table-column>
          <el-table-column prop="size" align="center" label="尺码"></el-table-column>
          <el-table-column prop="unit" align="center" label="单位"></el-table-column>
          <el-table-column prop="quantity" align="center" label="数量"></el-table-column>
          <el-table-column prop="price" align="center" label="单价"></el-table-column>
          <el-table-column prop="discount" align="center" label="折扣(%)"></el-table-column>
          <el-table-column prop="discount_price" align="center" label="折后价"></el-table-column>
          <el-table-column prop="money" align="center" label="金额"></el-table-column>
          <el-table-column prop="discount_money" align="center" label="折后金额"></el-table-column>
          <el-table-column prop="remark" align="center" label="备注"></el-table-column>
        </el-table>
      </div>

      <div class="main_footer">
        <!-- style="position:realtive" -->
        <el-form :model="ruleForm" inline ref="ruleForm" class="demo-ruleForm">
          <div class="imgs">
            <el-form-item label="附图:">
              <ul>
                <li v-for="(item,index) in fileList" :key="index">
                  <img :src="item.url" alt srcset />
                </li>
              </ul>
            </el-form-item>
          </div>
          <div class="texconts">
            <el-form-item label-width="80px" label="费用金额:">
              <span>&yen;{{total_price}}</span>
            </el-form-item>

            <el-form-item label-width="80px" label="总合计:">
              <span style="color:red;font-size:16px;">&yen;{{total_price}}</span>
            </el-form-item>
          </div>
          <div style="position: absolute;bottom:5px;left:40%;">
            <el-form-item>
              <el-button
                size="small"
                v-if="this.$route.query.state==1&& permission.indexOf('customer_order_edit')!=-1"
                @click="sketch(4)"
                type="primary"
              >撤销</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  customerOrderList,
  customerOrderInfo,
  customerOrderAdd,
  customerOrderEdit,
  customerOrderDel,
  customerOrderSizeDel,
} from "@/api/sell";
export default {
  data() {
    return {
      weretable: [],
      total_price: 0,
      ruleForm: {},
      fileList: [],
      power: "",
      form: {},
      actionsLenght: 0,
      permission: [],
    };
  },
  methods: {
    addCreateWare() {
      this.$router.push({
        path: `/salesOrderDetailsAdd`,
      });
    },
    successFile(response, file, fileList) {
      this.fileList = fileList;
      if (fileList.length >= 3) {
        // this.vh = false;
      }
    },
    // 采购
    async sketch(state) {
      // console.log(this.weretable);
      let size_data = [];
      if (state == 4) {
        this.weretable.map((v, i) => {
          // console.log(v);
          if (v.color != "" && v.size != "" && v.quantity != "") {
            size_data.push({
              stylename: v.stylename,
              produce_no: v.produce_no,
              style_color_name: v.style_color_name,
              size: v.size,
              unit: v.unit,
              quantity: v.quantity,
              price: v.price,
              discount: v.discount,
              discount_price: v.discount_price,
              money: v.money,
              discount_money: v.discount_money,
              id: v.id,
              style_id: v.style_id,
              style_pic_url: v.style_pic_url,
            });
          }
        });
      }
      let images = [];
      this.fileList.map((v, i) => {
        if (v.response) {
          images.push(v.response.data.pic_file_url);
        } else {
          images.push(v.url);
        }
      });
      //********* */
      if (
        this.form.companyname == undefined ||
        this.form.companyname == "" ||
        this.form.storehouse_name == undefined ||
        this.form.account_name == undefined ||
        size_data.length <= 0
      ) {
        let str = "请填写完整数据";
        if (this.form.companyname == undefined || this.form.companyname == "") {
          str = "请选择客户";
        }
        this.$message({
          showClose: true,
          message: "请填写完整数据",
          type: "error",
        });
      } else {
        //******* */
        let res = await customerOrderEdit({
          customer_id: this.form.customer_id,
          storehouse_id: this.form.storehouse_id,
          balance_account_id: this.form.account_id,
          pay_money: this.form.pay_money,
          remarks: this.form.remarks,
          ctime: this.form.ctime,
          id: this.form.id,
          size_data,
          images,
          state,
          total_price: this.total_price,
        });
        console.log(res);

        this.form = {};
        this.fileList = [];
        this.$router.push({
          path: `/salesOrder`,
        });
      }
    },
    // 右边上传图片==>删除
    handleRemove(file, fileList) {
      this.fileList = fileList;
      // this.vh = true;
    },
    handlePreview(file) {
      console.log(file);
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "总计";
        } else if (index === 8 || index === 12 || index === 13) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // console.log(prev,curr);
                // let a = prev.toFixed(2) + curr.toFixed(2);
                if (index === 13) {
                  this.total_price = prev + curr;
                }
                return prev + curr;
              } else {
                if (index === 13) {
                  this.total_price = prev;
                }
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "0";
          }
        } else {
          sums[index] = "-";
        }
      });
      // console.log(sums);
      return sums;
    },
    async init() {
      if (this.$route.query.state == 1) {
        this.actionsLenght = 1;
      } else if (this.$route.query.state == 4) {
        this.actionsLenght = 2;
      }
      let res = await customerOrderInfo({
        id: this.$route.query.id,
      });
      console.log(res);
      let { data } = res.data;
      this.form = data;
      this.weretable = data.size_data;
      this.fileList = [];
      this.form.images.map((v, i) => {
        this.fileList.push({
          name: "图" + i,
          url: v,
        });
      });
    },
  },
  mounted() {
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
    this.init();
  },
};
</script>

<style lang="less" scoped>
.salesOrderDetails {
  .top {
    overflow: hidden;

    .rh_left {
      float: left;
      padding: 10px 0 0 10px;
      font-size: 14px;
      line-height: 48px;
    }
    .rh_right {
      padding: 10px 10px 0 0;
      float: right;
      line-height: 48px;
    }
  }
  .table {
    margin-top: 15px;
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
  }
  .right_form {
    /deep/.cssa {
      .el-steps {
        position: relative;
        // margin-bottom: 40px;
        /deep/.el-step__icon {
          width: 12px;
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
          // top: 30px;
          // color: #000;
          // border-color: #000;
        }

        /deep/.el-step__line {
          // width: auto;
          // margin-right: 20px;
          margin-top: 9px;
        }

        /deep/.el-step {
          // width: 100px;
          // display: inline-block;
        }
        /deep/.el-step__main {
          position: relative;
          bottom: 10px;
          .el-step__description {
            padding-top: 20%;
          }
        }
      }
    }
  }
  .main_footer {
    margin-top: 15px;
    // width: 1210px;
    height: 300px;
    position: relative;
    .imgs {
      position: absolute;
      left: 5px;
      /deep/.el-form-item__content {
        ul {
          overflow: hidden;
          li {
            list-style: none;
            float: left;
            display: block;
            width: 10%;
            margin-right: 10px;
            height: auto;
            img {
              width: 100%;
              height: auto;
              max-height: 140px;
            }
          }
        }
      }
    }
    .texconts {
      position: absolute;
      width: 190px;
      right: 5px;
    }
  }
}
</style>