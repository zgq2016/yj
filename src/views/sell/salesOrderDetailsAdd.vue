<template>
  <div class="salesOrderDetailsAdd">
    <el-breadcrumb separator="/" class="breadcrumb">
      <!-- <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" /> -->
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="top">
        <div class="rh_left">
          <h4>销售订单-{{form.no}}-{{'zaan'}}</h4>
        </div>
        <div class="rh_right">
          <el-button size="mini" type="primary" v-if="power.indexOf('C2000200')!=-1">扫码</el-button>
          <el-button size="mini" type="primary" v-if="power.indexOf('C2000300')!=-1">导入</el-button>
          <el-button size="mini" type="primary" @click="tables">新增销售订单</el-button>
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
              <el-steps :space="110" align-center :active="0" finish-status="wait">
                <el-step icon="el-icon-success" title="草稿"></el-step>
                <el-step icon="el-icon-success" title="已出售"></el-step>
              </el-steps>
            </div>
          </el-form-item>

          <!-- prop="factory_name" -->
          <el-form-item style="float:left;width:30%;margin-left:3%;" label="客户:">
            <el-select size="mini" clearable v-model="form.companyname" placeholder="请选择厂商">
              <el-option
                v-for="item in wests"
                :key="item.value"
                :label="item.companyname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- prop="storehouse_name" -->
          <el-form-item style="float:left;width:30%;margin-left:2%;" label="仓库:">
            <el-select size="mini" v-model="form.storehouse_name" placeholder="请选择仓库" clearable>
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
          <!-- prop="ctime" -->
          <el-form-item style="float:left;width:30%;margin-left:1%;" label="日期:">
            <el-date-picker
              type="date"
              size="mini"
              placeholder="选择日期"
              v-model="form.ctime"
              style="width: 150px;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="float:left;width:30%;margin-left:3%;" label="结算账户:">
            <el-select
              size="mini"
              clearable
              style="width: 150px;"
              v-model="form.account_name"
              placeholder="请选择结账账户"
            >
              <el-option
                v-for="item in settlement"
                :key="item.id"
                :label="item.account_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:left;width:30%;margin-left:2%;" label="实付金额:">
            <el-input
              size="mini"
              placeholder="请输入实付金额"
              style="width: 150px;"
              v-model="form.pay_money"
            ></el-input>
          </el-form-item>

          <el-form-item style="float:left;width:31%;margin-left:1%;" label="备注:" prop="desc">
            <el-input size="mini" style="width:200px;" type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
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
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div
                style="width:50%;float:left"
                class="el-icon-plus btn"
                @click="handleAdd(scope.$index, scope.row)"
              ></div>
              <div
                style="width:50%;float:right"
                class="el-icon-delete btn"
                @click="handleDelete(scope.$index, scope.row)"
              ></div>
            </template>
          </el-table-column>
          <el-table-column prop="stylename" align="center" label="商品">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.stylename"
                filterable
                size="mini"
                v-if="scope.row.showHidden1"
                @blur="bblur(scope.row,scope.column)"
                @visible-change="visibleChange($event,scope.row)"
                @change="handleSelect($event,scope.column, scope.row,scope.$index)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in shoppings"
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
              <span v-if="!scope.row.showHidden1">{{scope.row.stylename|| "点击选择"}}</span>
            </template>
            <!-- <template v-if="!scope.row.showHidden1 && !vh5" slot-scope="scope">
                  <span>{{scope.row.commodity || "点击选择"}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="produce_no" align="center" sum-text label="货号"></el-table-column>
          <el-table-column prop="bar_code" align="center" label="条码"></el-table-column>
          <el-table-column prop="style_color_name" align="center" label="颜色">
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
              <span v-else>{{scope.row.style_color_name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="size" align="center" label="尺码">
            <template slot-scope="scope">
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
          <el-table-column prop="unit" align="center" label="单位"></el-table-column>
          <el-table-column prop="quantity" align="center" label="数量">
            <template slot-scope="scope">
              <input
                v-model="scope.row.quantity"
                @blur="bblur(scope.row,scope.column,scope.row.quantity)"
                v-if="scope.row.showHidden4"
                style="border:1px solid #ccc;width:80%"
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
                style="border:1px solid #ccc;width:80%"
              />
              <span v-else>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discount" align="center" label="折扣(%)">
            <template slot-scope="scope">
              <input
                v-model="scope.row.discount"
                @blur="bblur(scope.row,scope.column,scope.row.discount)"
                v-if="scope.row.showHidden6"
                style="border:1px solid #ccc;width:80%"
              />
              <span v-else>{{scope.row.discount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discount_price" align="center" label="折后价">
            <template slot-scope="scope">
              <input
                v-model="scope.row.discount_price"
                @blur="bblur(scope.row,scope.column,scope.row.discount_price)"
                v-if="scope.row.showHidden7"
                style="border:1px solid #ccc;width:80%"
              />
              <span v-else>{{scope.row.discount_price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" align="center" label="金额"></el-table-column>
          <el-table-column prop="discount_money" align="center" label="折后金额"></el-table-column>
          <el-table-column prop="remark" align="center" label="备注">
            <template slot-scope="scope">
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
                <el-button size="mini" v-if="vh" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </div>
          <div class="texconts">
            <el-form-item label-width="80px" label="费用金额:">
              <el-input size="mini" v-model="total_price" placeholder="请输入金额"></el-input>
            </el-form-item>

            <el-form-item label-width="80px" label="总合计:">
              <span style="color:red;font-size:16px;">&yen;{{total_price}}</span>
            </el-form-item>
          </div>
          <div class="foote">
            <el-form-item>
              <el-button
                size="small"
                v-if="power.indexOf('C2000500')!=-1"
                type="primary"
                @click="sketch(0)"
              >草稿</el-button>
              <el-button
                v-if="power.indexOf('C2000600')!=-1"
                type="primary"
                size="small"
                @click="sketch(1)"
              >入库</el-button>
              <el-button
                size="small"
                v-if="this.$route.query.state==0&&power.indexOf('C20001000')!=-1"
                @click="delStock"
                type="primary"
              >删除</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 填尺码 -->
    <div v-if="this.weretable.length > 0">
      <el-dialog
        :title="this.weretable[indexk].stylename+'  '+this.weretable[indexk].produce_no"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form1">
          <div>
            <div class="table_nav">
              <span></span>
              <span v-for="(item_t,index_t) in sizes" :key="index_t">{{item_t.value}}</span>
            </div>
            <br />
            <div v-for="(item_c,index_c) in colors" :key="index_c" class="table_list">
              <span>{{item_c.value}}</span>
              <el-input
                size="mini"
                v-for="(item_t,index_t) in sizes"
                v-model="item_c.quantitys[index_t]"
                :key="index_t"
              ></el-input>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
  getProjectStyleList,
} from "@/api/researchDevelopment";
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
import {
  customerOrderList,
  customerOrderInfo,
  customerOrderAdd,
  customerOrderEdit,
  customerOrderDel,
  customerOrderSizeDel,
} from "@/api/sell";
import { getWestList } from "@/api/researchDevelopment";
import { factoryList } from "@/api/archives";
export default {
  data() {
    return {
      weretable: [],
      total_price: 0,
      ruleForm: {},
      fileList: [],
      power: "",
      form: {},
      form1: {},
      ware: [],
      factorys: [],
      settlement: [],
      pageIndex1: 1,
      pageSize1: 9,
      total1: 0,
      pageIndex2: 1,
      pageSize2: 9,
      total2: 0,
      pageIndex3: 1,
      pageSize3: 9,
      total3: 0,
      shoppings: [],
      vh: true,
      colors: [],
      sizes: [],
      indexk: 0,
      dialogFormVisible: false,
      wests: [],
    };
  },
  methods: {
    handleSize(val) {
      this.pageSize2 = val;
      this.store();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.store();
    },

    handleSize1(val) {
      this.pageSize1 = val;
      this.factory();
    },
    handleCurrent1(val) {
      this.pageIndex1 = val;
      this.factory();
    },
    async handleSize2(val) {
      this.pageSize3 = val;
      this.shopping();
    },
    async handleCurrent2(val) {
      this.pageIndex3 = val;
      this.shopping();
    },
    // 商品
    async shopping(item) {
      let res1 = await getProjectStyleList({
        keyword: item == undefined ? "" : item,
        page: this.pageIndex3,
        page_size: this.pageSize3,
      });
      // console.log(res1);
      this.shoppings = res1.data.data;
      this.total3 = res1.data.count;
    },
    successFile(response, file, fileList) {
      this.fileList = fileList;
      if (fileList.length >= 3) {
        this.vh = false;
      }
    },
    // 右边上传图片==>删除
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.vh = true;
    },
    handlePreview(file) {
      console.log(file);
    },
    // 商品信息下拉框显示隐藏
    visibleChange(item, row) {
      if (item == false) {
        row.showHidden1 = false;
      }
    },
    // 鼠标离开
    bblur(row, v, item) {
      setTimeout(() => {
        if (v.label == "商品") {
          // row.showHidden1 = false;
        } else if (v.label == "颜色") {
          row.showHidden2 = false;
        } else if (v.label == "尺码") {
          row.showHidden3 = false;
        } else if (v.label == "数量") {
          row.quantity = Math.round(Number(item));
          row.money = Number(row.quantity * row.price).toFixed(2);
          row.discount_money = Number(
            row.quantity * row.discount_price
          ).toFixed(2);
          row.showHidden4 = false;
        } else if (v.label == "单价") {
          row.price = Number(item).toFixed(2);
          row.discount_price = Number((row.discount / 100) * row.price).toFixed(
            2
          );
          row.money = Number(row.quantity * row.price).toFixed(2);
          row.discount_money = Number(
            row.quantity * row.discount_price
          ).toFixed(2);
          row.showHidden5 = false;
        } else if (v.label == "折扣(%)") {
          row.discount = Number(item);
          row.discount_price = Number((row.discount / 100) * row.price).toFixed(
            2
          );
          row.discount_money = Number(
            row.quantity * row.discount_price
          ).toFixed(2);
          row.showHidden6 = false;
        } else if (v.label == "折后价") {
          row.discount_price = Number(item).toFixed(2);
          row.discount = Number(row.discount_price / row.price) * 100;
          row.showHidden7 = false;
        } else if (v.label == "备注") {
          row.showHidden8 = false;
        }
      }, 150);
    },
    // 点击某个单元格
    cellClick(row, column, cell, event) {
      if (column.label == "商品") {
        row.showHidden1 = true;
      } else if (row.commodity == "") {
        row.showHidden2 = false;
        row.showHidden3 = false;
        row.showHidden4 = false;
        row.showHidden5 = false;
        row.showHidden6 = false;
        row.showHidden7 = false;
        row.showHidden8 = false;
      } else if (column.label == "颜色") {
        row.showHidden2 = true;
      } else if (column.label == "尺码") {
        row.showHidden3 = true;
      } else if (column.label == "数量") {
        row.showHidden4 = true;
      } else if (column.label == "单价") {
        row.showHidden5 = true;
      } else if (column.label == "折扣(%)") {
        row.showHidden6 = true;
      } else if (column.label == "折后价") {
        row.showHidden7 = true;
      } else if (column.label == "备注") {
        row.showHidden8 = true;
      }
      // this.shopping();
      this.dow = document.getElementsByClassName("el-input__inner");
      let arr = [];
      this.dow.forEach((el, index) => {
        if (el.placeholder == "请选择") {
          arr.push(el);
        }
      });
      arr.map((v, i) => {
        v.oninput = () => {
          this.shopping(v.value);
        };
      });
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
    // 初始化表格
    tables() {
      this.form = {};
      this.weretable = [];
      for (let i = 0; i < 6; i++) {
        this.weretable.push({
          bar_code: "",
          discount: "100",
          discount_money: "",
          discount_price: "",
          money: "",
          price: "",
          produce_no: "",
          quantity: "",
          remark: "",
          size: "",
          style_color_name: "",
          stylename: "",
          unit: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false,
        });
      }
    },
    // 新增table行
    handleAdd(index, row) {
      // console.log(index, row);
      let obj = {
        discount: "100",
        discount_money: "",
        discount_price: "",
        bar_code: "",
        id: "0",
        money: "",
        price: "",
        produce_no: "",
        quantity: "",
        remark: "",
        size: "",
        style_color_name: "",
        stylename: "",
        unit: "",
        showHidden1: false,
        showHidden2: false,
        showHidden3: false,
        showHidden4: false,
        showHidden5: false,
        showHidden6: false,
        showHidden7: false,
        showHidden8: false,
      };
      this.weretable.splice(index, 0, obj);
    },
    // 删除
    async handleDelete(index, row) {
      if (row.id == undefined) {
        this.weretable.splice(index, 1);
      } else {
        this.$confirm("此操作将永久删除该行数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await customerOrderSizeDel({
              id: row.id,
            });
            console.log(res);
            this.weretable.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch1(queryString, cb) {
      var restaurants = this.colors;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      var restaurants = this.sizes;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 获取焦点
    async focuss(v, column, row, index) {
      this.shoppings.map((item, i) => {
        if (row.produce_no == item.styleno) {
          this.sizes = [];
          this.colors = [];
          let arr = [];
          item.style_data.forEach((item1, index) => {
            for (let dd in item1.type_data) {
              arr.push(dd);
            }
            this.colors.push({
              value: item1.style_color_name,
              quantitys: [],
            });
          });
          arr = [...new Set(arr)];
          arr.map((j, k) => {
            this.sizes.push({ value: j });
          });
        }
      });
    },

    // 选择提示选框
    handleSelect(v, column, row, index) {
      if (column.label == "商品") {
        this.sizes = [];
        this.colors = [];
        let arr = [];
        this.shoppings.map((item, i) => {
          if (v == item.id) {
            v = item;
            item.style_data.forEach((item1, index) => {
              for (let dd in item1.type_data) {
                arr.push(dd);
              }
              this.colors.push({
                value: item1.style_color_name,
                quantitys: [],
              });
            });
          }
        });
        arr = [...new Set(arr)];
        arr.map((j, k) => {
          this.sizes.push({ value: j });
        });
        row.stylename = v.stylename;
        row.produce_no = v.styleno;
        row.bar_code = v.bar_code;
        row.unit = v.unit;
        row.price = v.price;
        row.discount_price = v.discount_price;
        row.style_id = v.style_data[0].style_id;

        row.showHidden1 = false;
        this.dialogFormVisible = true;
        this.indexk = index;
      } else if (column.label == "颜色") {
        row.style_color_name = v.value;
        row.showHidden2 = false;
      } else if (column.label == "尺码") {
        row.size = v.value;
        row.showHidden3 = false;
      }
    },
    //新增入库单数据
    determine() {
      // console.log(this.colors);
      let bl = true;
      this.colors.map((v, i) => {
        if (v.quantitys.length > 0) {
          v.quantitys.map((j, k) => {
            if (bl && j != undefined && j != "") {
              this.weretable[this.indexk].style_color_name = v.value;
              this.weretable[this.indexk].size = this.sizes[k].value;
              this.weretable[this.indexk].quantity = Number(j);
              this.weretable[this.indexk].money =
                j * this.weretable[this.indexk].price;
              this.weretable[this.indexk].discount_money =
                j * this.weretable[this.indexk].discount_price;
              bl = false;

              return;
            } else if (j != undefined && j != "") {
              let obj = {
                stylename: this.weretable[this.indexk].stylename,
                produce_no: this.weretable[this.indexk].produce_no,
                bar_code: this.weretable[this.indexk].bar_code,
                unit: this.weretable[this.indexk].unit,
                style_color_name: v.value,
                size: this.sizes[k].value,
                quantity: Number(j),
                price: this.weretable[this.indexk].price,
                discount: "100",
                discount_price: this.weretable[this.indexk].discount_price,
                money: j * this.weretable[this.indexk].price,
                discount_money: j * this.weretable[this.indexk].discount_price,
                remark: "",
                style_id: this.weretable[this.indexk].style_id,

                showHidden1: false,
                showHidden2: false,
                showHidden3: false,
                showHidden4: false,
                showHidden5: false,
                showHidden6: false,
                showHidden7: false,
                showHidden8: false,
              };
              this.weretable.splice(this.indexk, 0, obj);
            }
          });
        }
      });
      this.dialogFormVisible = false;
    },

    // 采购
    async sketch(state) {
      // console.log(this.weretable);
      let size_data = [];
      if (state == 0 || state == 1) {
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
              id: v.id || 0,
              style_id: v.style_id,
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
      console.log(this.form);
      //********* */
      if (
        this.form.companyname == undefined ||
        this.form.companyname == "" ||
        this.form.storehouse_name == undefined ||
        // this.form.storehouse_name == ''||
        // this.form.account_name == ''||
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
        if (!this.form.id) {
          // 新增
          let res = await customerOrderAdd({
            customer_id: this.form.companyname,
            storehouse_id: this.form.storehouse_name,
            balance_account_id: this.form.account_name,
            pay_money: this.form.pay_money,
            remarks: this.form.remarks,
            size_data,
            images,
            state,
            total_price: this.total_price,
          });
          console.log(res);
        } else {
          // 编辑
          let id1 = "";
          let id2 = "";
          let id3 = "";
          if (typeof this.form.companyname == "string") {
            this.wests.map((v, i) => {
              if (this.form.companyname == v.companyname) {
                id1 = v.id;
              }
            });
          }
          if (typeof this.form.storehouse_name == "string") {
            this.ware.map((v, i) => {
              if (this.form.storehouse_name == v.storehouse_name) {
                id2 = v.id;
              }
            });
          }
          if (typeof this.form.account_name == "string") {
            this.settlement.map((v, i) => {
              if (this.form.account_name == v.account_name) {
                id3 = v.id;
              }
            });
          }
          let res = await customerOrderEdit({
            customer_id: id1 || this.form.companyname,
            storehouse_id: id2 || this.form.storehouse_name,
            balance_account_id: id3 || this.form.account_name,
            pay_money: this.form.pay_money,
            remarks: this.form.remarks,
            id: this.form.id,
            size_data,
            images,
            state,
            total_price: this.total_price,
          });
          console.log(res);
        }
        this.form = {};
        this.fileList = [];
        this.$router.push({
          path: `/salesOrder`,
        });
      }
    },
    // 删除草稿
    delStock() {
      this.$confirm("此操作将永久删除该草稿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await customerOrderDel({
            id: this.form.id,
          });
          this.form = {};
          this.$router.push({
            path: `/stockInquiry`,
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 仓库
    async store() {
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2,
        state: 1,
        storehouse_type: 0,
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
    },
    // 厂商
    async factory() {
      let res2 = await factoryList({
        page_size: this.pageSize1,
        page: this.pageIndex1,
      });

      this.factorys = res2.data.data;
      this.total1 = res2.data.count;
      // this.factorys.unshift({ factory_name: "全部", id: "" });
    },
    // 结算账户
    async balance() {
      let res3 = await balanceAccountSelect();
      this.settlement = res3.data.data;
      // console.log(res3);
    },

    async init() {
      if (this.$route.query.id) {
        let res = await customerOrderInfo({
          id: this.$route.query.id,
        });
        let { data } = res.data;
        this.form = data;
        data.size_data.map((v, i) => {
          this.weretable.push({
            ...v,
            showHidden1: false,
            showHidden2: false,
            showHidden3: false,
            showHidden4: false,
            showHidden5: false,
            showHidden6: false,
            showHidden7: false,
            showHidden8: false,
          });
        });
        this.fileList = [];
        this.form.images.map((v, i) => {
          this.fileList.push({
            name: "图" + i,
            url: v,
          });
        });
      } else {
        this.tables();
      }
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      this.wests = data;
      console.log(this.wests);
    },
  },
  mounted() {
    this.power = localStorage.getItem("power");
    this.init();
    this.store();
    this.factory();
    this.balance();
    this.shopping();
    this.getWest();
  },
};
</script>

<style lang="less" scoped>
.salesOrderDetailsAdd {
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
    height: 300px;
    position: relative;
    .imgs {
      position: absolute;
      left: 5px;
    }
    .texconts {
      position: absolute;
      width: 260px;
      right: 5px;
    }
    .foote {
      position: absolute;
      bottom: 0px;
      left: 40%;
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
  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__body {
        .el-form {
          overflow: hidden;
          div {
            overflow: hidden;
          }
          /deep/.table_nav {
            span {
              display: block;
              float: left;
              width: 19.5%;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }
          /deep/.table_list {
            span {
              display: block;
              float: left;
              width: 20%;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-bottom: 15px;
            }
            .el-input {
              float: left;
              width: 19%;
              height: 30px;
              line-height: 30px;
              margin-bottom: 15px;
              input {
                text-align: center !important;
              }
            }
          }
        }
      }
      .el-dialog__footer {
        .dialog-footer {
          text-align: center !important;
        }
      }
    }
  }
  /deep/.upload-demo {
    .el-upload-list {
      li {
        width: 105px;
        float: left !important;
        margin-right: 10px;
      }
    }
  }
}
</style>