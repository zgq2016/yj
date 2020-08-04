<template>
  <div class="stockInquiryDetails">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>产品入库</el-breadcrumb-item>
      <el-breadcrumb-item>产品入库详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="top">
        <div class="rh_left">
          <h4>入库单-{{form.no}}-{{'zaan'}}</h4>
        </div>
        <div class="rh_right">
          <el-button size="mini" type="primary" v-if="power.indexOf('C2000200')!=-1">扫码</el-button>
          <el-button size="mini" type="primary" v-if="power.indexOf('C2000300')!=-1">导入</el-button>
          <el-button
            size="mini"
            @click="addCreateWare"
            type="primary"
            v-if="power.indexOf('C2000400')!=-1"
          >新增入库单</el-button>
        </div>
      </div>
      <hr style="border:1px dashed #ccc;margin:0 10px" />
      <!-- 已入库/已撤销 -->
      <div class="table">
        <el-table
          :data="weretable"
          show-summary
          size="small"
          style="cursor: pointer;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :summary-method="getSummaries"
        >
          <el-table-column type="index" width="45"></el-table-column>
          <el-table-column prop="stylename" align="center" label="商品"></el-table-column>
          <el-table-column property="produce_no" align="center" label="货号"></el-table-column>
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
              <el-upload
                class="upload-demo"
                action="https://yj.ppp-pay.top/uploadpic.php"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="successFile"
                list-type="picture"
                style="float:left;"
              >
                <!-- v-if=" form.state!=1&&form.state!=4" -->
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
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
          <!-- <div style="position: absolute;bottom:5px;left:32%;">
              <el-form-item v-if="!vh4">
                <el-button
                  size="mini"
                  v-if="!vh3&&power.indexOf('C2000500')!=-1"
                  type="primary"
                  @click="sketch(0)"
                >草稿</el-button>
                <el-button
                  size="mini"
                  v-if="!vh3&&power.indexOf('C2000600')!=-1"
                  type="primary"
                  @click="sketch(1)"
                >入库</el-button>
                <el-button
                  size="mini"
                  v-if="vh2 && !vh3&&power.indexOf('C20001000')!=-1"
                  @click="delStock"
                  type="primary"
                >删除</el-button>
                <el-button size="mini" v-if="vh3" @click="backout" type="primary">撤销</el-button>
              </el-form-item>
          </div>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  storehouseList,
  bookStockOrderList,
  bookStockOrderInfo,
  balanceAccountSelect,
  bookStockOrderAdd,
  bookStockOrderEdit,
  bookStockOrderDel,
  bookStockOrderSizeDel,
} from "@/api/warehouse.js";
export default {
  data() {
    return {
      weretable: [],
      total_price: 0,
      ruleForm: {},
      fileList: [],
      power: "",
      form: {},
    };
  },
  methods: {
    addCreateWare() {
      this.$router.push({
        path: `/stockInquiryDetailsAdd`,
      });
    },
    successFile(response, file, fileList) {
      this.fileList = fileList;
      if (fileList.length >= 3) {
        // this.vh = false;
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
        } else if (index === 7 || index === 11 || index === 12) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // console.log(prev,curr);
                // let a = prev.toFixed(2) + curr.toFixed(2);
                if (index === 12) {
                  this.total_price = prev + curr;
                }
                return prev + curr;
              } else {
                if (index === 12) {
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
      let res = await bookStockOrderInfo({
        id: this.$route.query.id,
      });
      let { data } = res.data;
      this.form = data;
      this.weretable = data.size_data;
      console.log(this.form.images);
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
    this.power = localStorage.getItem("power");
    this.init();
  },
};
</script>

<style lang="less" scoped>
.stockInquiryDetails {
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
  }
  .main_footer {
    margin-top: 15px;
    width: 1210px;
    height: 200px;
    position: relative;
    .imgs {
      position: absolute;
      left: 5px;
    }
    .texconts {
      position: absolute;
      width: 190px;
      right: 5px;
    }
  }
}
</style>