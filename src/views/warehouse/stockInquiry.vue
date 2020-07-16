<template>
  <div class="stockInquiry">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>产品入库</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 左边 -->
      <div class="left">
        <div class="left_nav">
          <ul>
            <li>默认</li>
            <li>已入库</li>
            <li>草稿</li>
            <li>已撤销</li>
          </ul>
        </div>
        <div class="left_submit">
          <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="日期:">
              <el-date-picker
                v-model="ruleForm.value1"
                size="mini"
                type="daterange"
                range-separator="一"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="厂商:">
              <el-select size="mini" v-model="ruleForm.region" placeholder="请选择厂商">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单号:">
              <el-input size="mini" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item class="sub">
              <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="mini" type="primary">批量打印</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="left_table">
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            size="mini"
            stripe
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            @cell-click="cellClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="25"></el-table-column>
            <el-table-column align="center" prop="name" label="状态" width="60"></el-table-column>
            <el-table-column align="center" label="日期" width="96">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              width="81"
              label="厂商名称"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 右边边 -->
      <div class="right">
        <div class="right_header">
          <div class="rh_left">
            <h4>入库单--{{'zaan'}}</h4>
          </div>
          <div class="rh_right">
            <el-button size="mini" type="primary">扫码</el-button>
            <el-button size="mini" type="primary">导入</el-button>
            <el-button size="mini" @click="addCreateWare" type="primary">新增入库单</el-button>
          </div>
        </div>
        <hr style="border:1px dashed #ccc;margin:0 10px" />
        <div class="right_main">
          <div class="right_form">
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item style="overflow: hidden;width:100%;">
                <div style="float:left;padding:10px 0 0 15px;">
                  尚欠厂商款:
                  <em style="color:red;">&yen;{{'0.00'}}</em>
                </div>
                <div class="cssa" style="float:right;padding:10px 15px 0 0;width:210px;">
                  <el-steps :space="110" align-center :active="1" finish-status="wait">
                    <el-step icon="el-icon-success" title="草稿"></el-step>
                    <el-step icon="el-icon-success" title="已入库"></el-step>
                  </el-steps>
                </div>
              </el-form-item>

              <el-form-item
                prop="manufacturer"
                style="display:inline-block;width:30%;margin-left:3%;"
                label="厂商:"
              >
                <el-select size="mini" v-model="form.manufacturer" placeholder="请选择厂商">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="ware"
                style="display:inline-block;width:30%;margin-left:2%;"
                label="仓库:"
              >
                <el-select size="mini" v-model="form.ware" placeholder="请选择仓库">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="display:inline-block;width:30%;margin-left:1%;" label="结算账户:">
                <el-select size="mini" v-model="form.user" placeholder="请选择结账账户">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="display:inline-block;width:26%;margin-left:3%;" label="实付金额:">
                <el-input size="mini" placeholder="请输入实付金额" style="width: 60%;" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item
                style="display:inline-block;width:30%;margin-left:2%;"
                label="日期:"
                prop="date1"
              >
                <el-date-picker
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 75%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                style="display:inline-block;width:35%;margin-left:1%;"
                label="备注:"
                prop="desc"
              >
                <el-input size="mini" style="width:75%;" type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="right_table">
            <el-table
              :data="weretable"
              show-summary
              :summary-method="getSummaries"
              row-key="id"
              size="mini"
              style="cursor: pointer;"
              @cell-click="cellClick1"
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
              <el-table-column prop="commodity" width="90" align="center" label="商品">
                <template slot-scope="scope">
                  <el-autocomplete
                    class="inline-input"
                    size="mini"
                    v-if="scope.row.showHidden1"
                    :title="scope.row.commodity"
                    v-model="scope.row.commodity"
                    :fetch-suggestions="querySearch"
                    placeholder="点击选择"
                    @blur="bblur(scope.row,scope.column)"
                    @select="handleSelect($event,scope.column, scope.row,scope.$index)"
                  ></el-autocomplete>
                  <span v-else>{{scope.row.commodity || "点击选择"}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="item_no" align="center" width="80" sum-text label="货号"></el-table-column>
              <el-table-column prop="bar_code" align="center" width="80" label="条码"></el-table-column>
              <el-table-column prop="color" width="70" align="center" label="颜色">
                <template slot-scope="scope">
                  <el-autocomplete
                    class="inline-input"
                    size="mini"
                    v-if="scope.row.showHidden2"
                    :title="scope.row.color"
                    v-model="scope.row.color"
                    :fetch-suggestions="querySearch1"
                    @blur="bblur(scope.row,scope.column)"
                    @select="handleSelect($event,scope.column, scope.row,scope.$index)"
                  ></el-autocomplete>
                  <span v-else>{{scope.row.color}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="size" width="70" align="center" label="尺码">
                <template slot-scope="scope">
                  <el-autocomplete
                    class="inline-input"
                    size="mini"
                    v-if="scope.row.showHidden3"
                    :title="scope.row.size"
                    v-model="scope.row.size"
                    :fetch-suggestions="querySearch2"
                    @blur="bblur(scope.row,scope.column)"
                    @select="handleSelect($event,scope.column, scope.row,scope.$index)"
                  ></el-autocomplete>
                  <span v-else>{{scope.row.size}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="monad" width="50" align="center" label="单位"></el-table-column>
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
              <el-table-column prop="univalence" width="60" align="center" label="单价">
                <template slot-scope="scope">
                  <input
                    v-model="scope.row.univalence"
                    @blur="bblur(scope.row,scope.column,scope.row.univalence)"
                    v-if="scope.row.showHidden5"
                    style="border:1px solid #ccc;width:30px;"
                  />
                  <span v-else>{{scope.row.univalence}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="discount" align="center" width="65" label="折扣(%)">
                <template slot-scope="scope">
                  <input
                    v-model="scope.row.discount"
                    @blur="bblur(scope.row,scope.column,scope.row.discount)"
                    v-if="scope.row.showHidden6"
                    style="border:1px solid #ccc;width:30px;"
                  />
                  <span v-else>{{scope.row.discount}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="discountPrice" align="center" label="折后价">
                <template slot-scope="scope">
                  <input
                    v-model="scope.row.discountPrice"
                    @blur="bblur(scope.row,scope.column,scope.row.discountPrice)"
                    v-if="scope.row.showHidden7"
                    style="border:1px solid #ccc;width:30px;"
                  />
                  <span v-else>{{scope.row.discountPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sum" width="60" align="center" label="金额"></el-table-column>
              <el-table-column prop="sumed" width="70" align="center" label="折后金额"></el-table-column>
              <el-table-column prop="remark" width="100" align="center" label="备注">
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
          <div class="right_table" v-if="false">
            <el-table
              :data="weretable"
              show-summary
              :summary-method="getSummaries"
              row-key="id"
              size="mini"
              style="cursor: pointer;"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column type="index" width="35"></el-table-column>
              <el-table-column prop="commodity" width="90" align="center" label="商品"></el-table-column>
              <el-table-column prop="item_no" align="center" width="80" sum-text label="货号"></el-table-column>
              <el-table-column prop="bar_code" align="center" width="80" label="条码"></el-table-column>
              <el-table-column prop="color" width="70" align="center" label="颜色"></el-table-column>
              <el-table-column prop="size" width="70" align="center" label="尺码"></el-table-column>
              <el-table-column prop="monad" width="50" align="center" label="单位"></el-table-column>
              <el-table-column prop="quantity" width="60" align="center" label="数量"></el-table-column>
              <el-table-column prop="univalence" width="60" align="center" label="单价"></el-table-column>
              <el-table-column prop="discount" align="center" width="65" label="折扣(%)"></el-table-column>
              <el-table-column prop="discountPrice" align="center" label="折后价"></el-table-column>
              <el-table-column prop="sum" width="60" align="center" label="金额"></el-table-column>
              <el-table-column prop="sumed" width="70" align="center" label="折后金额"></el-table-column>
              <el-table-column prop="remark" width="90" align="center" label="备注"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right_footer">
          <!-- style="position:realtive" -->
          <el-form :model="ruleForm" inline ref="ruleForm" class="demo-ruleForm">
            <div style="position: absolute;left:5px;">
              <el-form-item label="附图:"></el-form-item>
            </div>
            <div style="position: absolute;right:-40px;width:540px;">
              <el-form-item label="其他费用账目类型:">
                <el-select size="mini" v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="费用金额:">
                <el-input size="mini" v-model="ruleForm.name" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item label="抹零:">
                <el-input size="mini" v-model="ruleForm.name" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item label="总合计:">
                <span>&yen;{{'0.00'}}</span>
              </el-form-item>
            </div>
            <div style="position: absolute;bottom:5px;left:40%;">
              <el-form-item>
                <el-button size="mini" type="primary" @click="onSubmit">草稿</el-button>
                <el-button size="mini" type="primary">入库</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 填尺码 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      form1: {
        quantitys: []
      },

      dialogFormVisible: false,
      //选择商品

      restaurants: [
        { value: "三全鲜食1", item_no: "121356", bar_code: "a1213516" },
        { value: "三全鲜食2", item_no: "121356", bar_code: "b121355" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" }
      ],
      colors: [
        { value: "红色", quantitys: [] },
        { value: "白色", quantitys: [] },
        { value: "浅绿色", quantitys: [] }
      ],
      sizes: [{ value: "L" }, { value: "XL" }, { value: "M" }],

      // table数据
      weretable: [
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        },
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        },
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        },
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        },
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        },
        {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        }
      ],
      rules: {
        manufacturer: [
          { required: true, message: "请选择厂商", trigger: "change" }
        ],
        ware: [{ required: true, message: "请选择仓库", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      stylist: "", //设计师
      year: "", //年
      season: "", //季节
      category: "", //类别

      pageIndex: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {}, //查询表单
      form: {
        manufacturer: "",
        ware: "",
        date1: ""
      },
      //选择表单
      tableData: [
        {
          date: "2016-05-03 18:01",
          name: "已入库",
          address: "上海市普11111"
        },
        {
          date: "2016-05-02 18:01",
          name: "已入库",
          address: "上海市普2"
        },
        {
          date: "2016-05-04 18:01",
          name: "已入库",
          address: "上海市普3"
        },
        {
          date: "2016-05-01 18:01",
          name: "草稿",
          address: "上海市普4"
        },
        {
          date: "2016-05-08 18:01",
          name: "草稿",
          address: "上海市普5"
        },
        {
          date: "2016-05-06 18:01",
          name: "已撤销",
          address: "上海市普6"
        },
        {
          date: "2016-05-07 18:01",
          name: "已撤销",
          address: "上海市普7"
        }
      ],
      indexk: 0
    };
  },
  methods: {
    // table指定列合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "总计";
        } else if (index === 8 || index === 11 || index === 12) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // console.log(prev,curr);
                // let a = prev.toFixed(2) + curr.toFixed(2);
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "-";
        }
      });
      // console.log(sums);
      return sums;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleUser_id() {},
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      this.categorys = data;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //左边单元格被点击
    cellClick(row, column, cell, event) {
      console.log(row, column, cell, event);
    },
    //右边单元格被点击
    cellClick1(row, column, cell, event) {
      // console.log(row, column, cell, event);
      if (column.label == "商品") {
        row.showHidden1 = true;
      } else if (column.label == "颜色") {
        row.showHidden2 = true;
      } else if (column.label == "尺码") {
        row.showHidden3 = true;
      } else if (column.label == "数量") {
        row.showHidden4 = true;
      } else if (column.label == "单价") {
        row.showHidden5 = true;
      } else if (column.label == "折扣") {
        row.showHidden6 = true;
      } else if (column.label == "折后价") {
        row.showHidden7 = true;
      } else if (column.label == "备注") {
        row.showHidden8 = true;
      }
    },
    bblur(row, v, item) {
      // console.log(v.label);
      setTimeout(() => {
        if (v.label == "商品") {
          row.showHidden1 = false;
        } else if (v.label == "颜色") {
          row.showHidden2 = false;
        } else if (v.label == "尺码") {
          row.showHidden3 = false;
        } else if (v.label == "数量") {
          row.quantity = Math.round(Number(item));
          row.showHidden4 = false;
        } else if (v.label == "单价") {
          row.univalence = Number(item).toFixed(2);
          row.showHidden5 = false;
        } else if (v.label == "折扣") {
          row.discount = Number(item).toFixed(2);
          row.showHidden6 = false;
        } else if (v.label == "折后价") {
          row.discountPrice = Number(item).toFixed(2);
          row.showHidden7 = false;
        } else if (v.label == "备注") {
          row.showHidden8 = false;
        }
      }, 150);
    },
    // 右边新增table行
    handleAdd(index, row) {
      // console.log(index, row);
      let obj = {
        commodity: "",
        item_no: "",
        bar_code: "",
        monad: "件",
        color: "",
        size: "",
        quantity: "0",
        univalence: "0.00",
        discount: "100",
        discountPrice: "0.00",
        sum: "0.00",
        sumed: "0.00",
        remark: "",
        showHidden1: false,
        showHidden2: false,
        showHidden3: false,
        showHidden4: false,
        showHidden5: false,
        showHidden6: false,
        showHidden7: false,
        showHidden8: false
      };
      this.weretable.splice(index, 0, obj);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.weretable.splice(index, 1);
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
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 提示选框
    handleSelect(v, column, row, index) {
      // console.log(v,idnex,row);
      // console.log(column.label);
      if (column.label == "商品") {
        row.commodity = v.value;
        row.item_no = v.item_no;
        row.bar_code = v.bar_code;
        row.showHidden1 = false;
        this.dialogFormVisible = true;
        this.colors.forEach(item => {
          item.quantitys = [];
        });
        // console.log(index);
        this.indexk = index;
      } else if (column.label == "颜色") {
        row.color = v.value;
        row.showHidden2 = false;
      } else if (column.label == "尺码") {
        row.size = v.value;
        row.showHidden3 = false;
      }
      // console.log(row);
    },
    // 刷新新增入库单
    addCreateWare() {
      this.weretable = [];
      for (let i = 0; i < 6; i++) {
        let obj = {
          commodity: "",
          item_no: "",
          bar_code: "",
          monad: "件",
          color: "",
          size: "",
          quantity: "0",
          univalence: "0.00",
          discount: "100",
          discountPrice: "0.00",
          sum: "0.00",
          sumed: "0.00",
          remark: "",
          showHidden1: false,
          showHidden2: false,
          showHidden3: false,
          showHidden4: false,
          showHidden5: false,
          showHidden6: false,
          showHidden7: false,
          showHidden8: false
        };

        this.weretable.push(obj);
      }
    },
    //新增入库单数据
    determine() {
      console.log(this.colors);
      let bl = true;

      this.colors.map((v, i) => {
        if (v.quantitys.length > 0) {
          v.quantitys.map((j, k) => {
            if (bl && j != undefined && j != "") {
              this.weretable[this.indexk].color = v.value;
              this.weretable[this.indexk].size = this.sizes[k].value;
              this.weretable[this.indexk].quantity = j;
              bl = false;
              return;
            } else if (j != undefined && j != "") {
              let obj = {
                commodity: this.weretable[this.indexk].commodity,
                item_no: this.weretable[this.indexk].item_no,
                bar_code: this.weretable[this.indexk].bar_code,
                monad: "件",
                color: v.value,
                size: this.sizes[k].value,
                quantity: j,
                univalence: "0.00",
                discount: "100",
                discountPrice: "0.00",
                sum: "0.00",
                sumed: "0.00",
                remark: "",
                showHidden1: false,
                showHidden2: false,
                showHidden3: false,
                showHidden4: false,
                showHidden5: false,
                showHidden6: false,
                showHidden7: false,
                showHidden8: false
              };
              this.weretable.splice(this.indexk, 0, obj);
            }
          });
        }
      });
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
  }
};
</script>

<style lang="less" scoped>
.stockInquiry {
  list-style: none;
  .main {
    overflow: hidden;
    .left {
      overflow: hidden;
      margin: 10px 1% 10px 1%;
      border: 1px solid #cccccc;
      float: left;
      background: #fff;
      width: 22%;
      .left_nav {
        border-bottom: 1px solid #cccccc;
        margin-bottom: 10px;
        ul {
          overflow: hidden;
          li {
            // width: 25%;
            list-style: none;
            float: left;
            text-align: center;
            padding: 6px;
            cursor: pointer;
          }
        }
      }
      .left_submit {
        margin-bottom: 10px;
        .el-form {
          position: relative;
          padding: 3px 10px;
          .sub {
            text-align: center;
          }
          .el-form-item {
            margin-bottom: 5px;
            .el-form-item__content {
              .el-input {
                width: 178px;
              }
              .el-date-editor--daterange {
                width: 178px;
                position: absolute;
                top: 5px;
              }
            }
          }
        }
      }
      .left_table {
        cursor: pointer;
      }
      .tableStyle {
        background-color: #1989fa !important;
        color: #fff;
        font-weight: 400;
      }
    }
    .right {
      margin: 10px 1% 50px 0;
      border: 1px solid #cccccc;
      background: #fff;
      width: 75%;
      float: right;
      .right_header {
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
      .right_main {
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
      }
      .right_footer {
        .el-form {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          /deep/.el-form-item {
            float: left;
            margin-bottom: 8px;
            margin-right: 0;
            .el-form-item__content {
              /deep/.el-input {
                width: 70%;
              }
            }
          }
          /deep/.el-form-item:nth-child(3) {
            float: right;
          }
          /deep/.el-form-item:nth-child(4) {
            float: right;
            width: 100%;
            text-align: right;
            margin-right: 60px;
            .el-form-item__content {
              span {
                display: block;
                width: 100px;
                color: red;
                font-size: 16px;
              }
            }
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
  .pagination {
    margin: 10px 0;
    text-align: center;
    padding: 2px 0px;
  }
}
</style>