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
        </div>
      </div>
      <hr style="border:1px dashed #ccc;margin:0 10px" />

      <div class="able">
        <el-table
          :data="weretable"
          show-summary
          :summary-method="getSummaries"
          row-key="id"
          size="mini"
          style="cursor: pointer;"
          @cell-click="cellClick"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column type="index" width="35"></el-table-column>
          <el-table-column align="center" width="60" label="操作">
            <template slot-scope="scope">
              <div
                style="width:20px;float:left"
                class="el-icon-plus btn"
                @click="handleAdd(scope.$index, scope.row)"
              ></div>
              <div
                style="width:20px;float:right"
                class="el-icon-delete btn"
                @click="handleDelete(scope.$index, scope.row)"
              ></div>
            </template>
          </el-table-column>
          <el-table-column prop="stylename" width="90" align="center" label="商品">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.stylename"
                filterable
                v-if="scope.row.showHidden1"
                @blur="bblur(scope.row,scope.column)"
                @visible-change="visibleChange($event,scope.row)"
                @change="handleSelect($event,scope.column, scope.row,scope.$index)"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in shopppings"
                  :key="item.value"
                  :label="item.stylename+' '+item.styleno"
                  :value="item.id"
                ></el-option>
                <el-pagination
                  small
                  layout="prev, pager, next"
                  @size-change="handleSize2"
                  @current-change="handleCurrent2"
                  :total="total3"
                ></el-pagination>
              </el-select>
              <span v-if="!scope.row.showHidden1">{{scope.row.commodity|| "点击选择"}}</span>
            </template>
            <!-- <template v-if="!scope.row.showHidden1 && !vh5" slot-scope="scope">
                  <span>{{scope.row.commodity || "点击选择"}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="produce_no" align="center" width="80" sum-text label="货号"></el-table-column>
          <el-table-column prop="bar_code" align="center" width="80" label="条码"></el-table-column>
          <el-table-column prop="style_color_name" width="70" align="center" label="颜色">
            <template slot-scope="scope">
              <!-- :disabled="scope.row.commodity==''? true : false" -->
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-if="scope.row.showHidden2"
                :title="scope.row.style_color_name"
                v-model="scope.row.style_color_name"
                :fetch-suggestions="querySearch1"
                @focus="focuss($event,scope.column, scope.row,scope.$index)"
                @blur="bblur(scope.row,scope.column)"
                @select="handleSelect($event,scope.column, scope.row,scope.$index)"
              ></el-autocomplete>
              <span v-else>{{scope.row.color}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="size" width="60" align="center" label="尺码">
            <template slot-scope="scope" v-if="!vh5">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-if="scope.row.showHidden3"
                :title="scope.row.size"
                v-model="scope.row.size"
                @focus="focuss($event,scope.column, scope.row,scope.$index)"
                :fetch-suggestions="querySearch2"
                @blur="bblur(scope.row,scope.column)"
                @select="handleSelect($event,scope.column, scope.row,scope.$index)"
              ></el-autocomplete>
              <span v-else>{{scope.row.size}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unit" width="50" align="center" label="单位"></el-table-column>
          <el-table-column prop="quantity" width="60" align="center" label="数量">
            <template slot-scope="scope">
              <input
                v-model="scope.row.quantity"
                @blur="bblur(scope.row,scope.column,scope.row.quantity)"
                v-if="scope.row.showHidden4"
                style="border:1px solid #ccc;width:30px;"
              />
              <span v-else>{{scope.row.quantity}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" align="center" label="单价">
            <template slot-scope="scope">
              <input
                v-model="scope.row.price"
                @blur="bblur(scope.row,scope.column,scope.row.price)"
                v-if="scope.row.showHidden5"
                style="border:1px solid #ccc;width:40px;"
              />
              <span v-else>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discount" align="center" width="70" label="折扣(%)">
            <template slot-scope="scope" v-if="!vh5">
              <input
                v-model="scope.row.discount"
                @blur="bblur(scope.row,scope.column,scope.row.discount)"
                v-if="scope.row.showHidden6"
                style="border:1px solid #ccc;width:30px;"
              />
              <span v-else>{{scope.row.discount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discount_price" align="center" label="折后价">
            <template slot-scope="scope" v-if="!vh5">
              <input
                v-model="scope.row.discount_price"
                @blur="bblur(scope.row,scope.column,scope.row.discount_price)"
                v-if="scope.row.showHidden7"
                style="border:1px solid #ccc;width:40px;"
              />
              <span v-else>{{scope.row.discountPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" align="center" label="金额"></el-table-column>
          <el-table-column prop="discount_money" align="center" label="折后金额"></el-table-column>
          <el-table-column prop="remark" width="100" align="center" label="备注">
            <template slot-scope="scope" v-if="!vh5">
              <el-input
                type="text"
                maxlength="20"
                size="mini"
                placeholder="最多20字"
                v-model="scope.row.remark"
                @blur="bblur(scope.row,scope.column,scope.row.remark)"
                v-if="scope.row.showHidden8"
              ></el-input>
              <span v-else>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
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
    cellClick(){

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