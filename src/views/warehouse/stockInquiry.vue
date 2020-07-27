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
            <li
              v-for="(item,index) in valueElement"
              :key="index"
              :class="active===index?'active':''"
              @click.stop="changed(item,index)"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="left_submit">
          <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="日期:">
              <el-date-picker
                v-model="ruleForm.ctime"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="厂商:">
              <el-select size="mini" clearable v-model="ruleForm.factory_name" placeholder="请选择厂商">
                <el-option
                  v-for="item in factorys"
                  :key="item.id"
                  :label="item.factory_name"
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
        <!-- 表格 -->
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
            <el-table-column align="center" prop="state_name" label="状态" width="70"></el-table-column>
            <el-table-column align="center" label="日期" width="90">
              <template slot-scope="scope">{{ scope.row.ctime }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="factory_name"
              width="75"
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
                  <el-steps :space="110" align-center :active="actionsLenght" finish-status="wait">
                    <el-step icon="el-icon-success" title="草稿"></el-step>
                    <el-step icon="el-icon-success" title="已入库"></el-step>
                    <el-step icon="el-icon-success" v-if="form.state==4" title="已撤销"></el-step>
                  </el-steps>
                </div>
              </el-form-item>

              <!-- prop="factory_name" -->
              <el-form-item style="float:left;width:30%;margin-left:3%;" label="厂商:">
                <el-select
                  v-if="vh1"
                  size="mini"
                  clearable
                  v-model="form.factory_name"
                  placeholder="请选择厂商"
                >
                  <el-option
                    v-for="item in factorys"
                    :key="item.id"
                    :label="item.factory_name"
                    :value="item.id"
                    :disabled="item.factory_name=='全部'? true:false"
                  ></el-option>
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    @size-change="handleSize1"
                    @current-change="handleCurrent1"
                    :total="total1"
                  ></el-pagination>
                </el-select>
                <span v-if="!vh1">{{form.factory_name}}</span>
              </el-form-item>
              <!-- prop="storehouse_name" -->
              <el-form-item style="float:left;width:30%;margin-left:2%;" label="仓库:">
                <el-select
                  v-if="vh1"
                  size="mini"
                  v-model="form.storehouse_name"
                  placeholder="请选择仓库"
                  clearable
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
                <span v-if="!vh1">{{form.storehouse_name}}</span>
              </el-form-item>
              <!-- prop="ctime" -->
              <el-form-item style="float:left;width:30%;margin-left:1%;" label="日期:">
                <el-date-picker
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  v-model="form.ctime"
                  style="width: 75%;"
                  v-if="vh1"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span v-if="!vh1">{{form.ctime}}</span>
              </el-form-item>
              <el-form-item style="float:left;width:30%;margin-left:3%;" label="结算账户:">
                <el-select
                  v-if="vh1"
                  size="mini"
                  clearable
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
                <span v-if="!vh1">{{form.account_name}}</span>
              </el-form-item>
              <el-form-item style="float:left;width:26%;margin-left:2%;" label="实付金额:">
                <el-input
                  size="mini"
                  placeholder="请输入实付金额"
                  style="width: 60%;"
                  v-model="form.pay_price"
                  v-if="vh1"
                ></el-input>
                <span v-if="!vh1">{{form.pay_price}}</span>
              </el-form-item>

              <el-form-item style="float:left;width:35%;margin-left:1%;" label="备注:" prop="desc">
                <el-input
                  size="mini"
                  v-if="vh1"
                  style="width:75%;"
                  type="textarea"
                  v-model="form.remarks"
                ></el-input>
                <span v-if="!vh1">{{form.remarks}}</span>
              </el-form-item>
            </el-form>
          </div>
          <!-- 草稿 -->
          <div class="right_table" v-if="!vh5">
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
                <template slot-scope="scope" v-if="!vh3">
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
                  <!-- <el-autocomplete
                    class="inline-input"
                    size="mini"
                    v-if="scope.row.showHidden1"
                    :title="scope.row.commodity"
                    v-model="scope.row.commodity"
                    :fetch-suggestions="querySearch"
                    placeholder="点击选择"
                    @blur="bblur(scope.row,scope.column)"
                    @select="handleSelect($event,scope.column, scope.row,scope.$index)"
                  ></el-autocomplete>-->
                  <el-select
                    v-show="scope.row.showHidden1"
                    v-model="scope.row.commodity"
                    filterable
                    @blur="bblur(scope.row,scope.column)"
                    @change="handleSelect($event,scope.column, scope.row,scope.$index)"
                    placeholder="请选择"
                    size="mini"
                  >
                    <!-- style="width:120px" -->
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
                  <span v-if="!scope.row.showHidden1&&!vh5">{{scope.row.commodity || "点击选择"}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="item_no" align="center" width="80" sum-text label="货号"></el-table-column>
              <el-table-column prop="bar_code" align="center" width="80" label="条码"></el-table-column>
              <el-table-column prop="color" width="70" align="center" label="颜色">
                <template slot-scope="scope">
                  <el-autocomplete
                    class="inline-input"
                    size="mini"
                    :disabled="scope.row.commodity==''? true : false"
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
              <el-table-column prop="size" width="60" align="center" label="尺码">
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
              <el-table-column prop="univalence" align="center" label="单价">
                <template slot-scope="scope">
                  <input
                    v-model="scope.row.univalence"
                    @blur="bblur(scope.row,scope.column,scope.row.univalence)"
                    v-if="scope.row.showHidden5"
                    style="border:1px solid #ccc;width:40px;"
                  />
                  <span v-else>{{scope.row.univalence}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="discount" align="center" width="70" label="折扣(%)">
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
                    style="border:1px solid #ccc;width:40px;"
                  />
                  <span v-else>{{scope.row.discountPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sum" align="center" label="金额"></el-table-column>
              <el-table-column prop="sumed" align="center" label="折后金额"></el-table-column>
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
          <!-- 已入库/已撤销 -->
          <div class="right_table" v-if="vh5">
            <el-table
              :data="weretable1"
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
                  <el-button size="mini" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div>
            <div v-if="vh5" style="position: absolute;width:190px;right:10px;">
              <el-form-item label-width="100px" label="费用金额:">
                <span>&yen;{{ruleForm.money1||'0.00'}}</span>
              </el-form-item>
              <el-form-item label-width="100px" label="抹零:">
                <span>&yen;{{ruleForm.money2||'0.00'}}</span>
              </el-form-item>
              <el-form-item label-width="100px" label="总合计:">
                <span style="color:red;font-size:16px;">&yen;{{'0.00'}}</span>
              </el-form-item>
            </div>
            <div v-if="!vh5" style="position: absolute;right:-40px;width:540px;">
              <el-form-item label="其他费用账目类型:">
                <el-select size="mini" v-model="ruleForm.region" clearable placeholder="账目类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="费用金额:">
                <el-input size="mini" v-model="ruleForm.money1" placeholder="请输入金额"></el-input>
                <span>{{ruleForm.money1}}</span>
              </el-form-item>
              <el-form-item label="抹零:">
                <el-input size="mini" v-model="ruleForm.name2" placeholder="请输入金额"></el-input>
                <span>{{ruleForm.money2}}</span>
              </el-form-item>
              <el-form-item label="总合计:">
                <span>&yen;{{'0.00'}}</span>
              </el-form-item>
            </div>
            <div style="position: absolute;bottom:5px;left:30%;">
              <el-form-item v-if="!vh4">
                <el-button size="mini" v-if="!vh3" type="primary" @click="sketch">草稿</el-button>
                <el-button size="mini" v-if="!vh3" type="primary">入库</el-button>
                <el-button size="mini" v-if="vh2 && !vh3" @click="delStock" type="primary">删除</el-button>
                <el-button size="mini" v-if="vh3" @click="backout" type="primary">撤销</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 填尺码 -->
    <el-dialog
      :title="this.weretable[indexk].commodity+'  '+this.weretable[indexk].item_no"
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
} from "@/api/warehouse.js";
import { factoryList } from "@/api/archives";
export default {
  data() {
    return {
      shopppings: [], //商品
      settlement: [], //结算账户
      fileList: [],
      active: 0,
      form1: {
        quantitys: [],
      },
      valueElement: [
        { name: "默认" },
        { name: "已入库", state: 1 },
        { name: "草稿", state: 0 },
        { name: "已撤销", state: 4 },
      ],
      dialogFormVisible: false,
      //选择商品

      restaurants: [
        { value: "三全鲜食1", item_no: "121356", bar_code: "a1213516" },
        { value: "三全鲜食2", item_no: "121356", bar_code: "b121355" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
        { value: "三全鲜食4", item_no: "121356", bar_code: "d121353" },
        { value: "三全鲜食3", item_no: "121a36", bar_code: "c121354" },
      ],
      colors: [
        { value: "红色", quantitys: [] },
        { value: "白色", quantitys: [] },
        { value: "浅绿色", quantitys: [] },
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
          univalence: "100.00",
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
          showHidden8: false,
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
          showHidden8: false,
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
          showHidden8: false,
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
          showHidden8: false,
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
          showHidden8: false,
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
          showHidden8: false,
        },
      ],
      weretable1: [{}],
      rules: {
        factory_name: [
          { required: true, message: "请选择厂商", trigger: "change" },
        ],
        storehouse_name: [
          { required: true, message: "请选择仓库", trigger: "change" },
        ],
        ctime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
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
      pageIndex2: 1,
      pageSize2: 10,
      total2: 0,
      pageIndex3: 1,
      pageSize3: 10,
      total3: 0,
      pageIndex1: 1,
      pageSize1: 10,
      total1: 0,
      factorys: [],
      ware: [],
      ruleForm: {}, //查询表单
      form: {},
      //选择表单
      tableData: [],
      indexk: 0,
      vh: true,
      vh1: true,
      vh2: false,
      vh3: false,
      vh4: false,
      vh5: false,
      stated: 1,
      obj: {},
      actionsLenght: 0,
      dow: [],
    };
  },
  methods: {
    successFile(response, file, fileList) {
      if (fileList.length >= 3) {
        this.vh = false;
      }
    },
    // 右边上传图片==>删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.vh = true;
    },
    handlePreview(file) {
      console.log(file);
    },
    // 左边切换状态
    async changed(item, index) {
      this.active = index;
      this.stated = item;
      let res = await bookStockOrderList({
        page: this.pageIndex,
        page_size: this.pageSize,
        state: item.state,
      });
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.map((v, i) => {
        if (v.state == 0) {
          v.state_name = "草稿";
        } else if (v.state == 1) {
          v.state_name = "已入库";
        } else if (v.state == 4) {
          v.state_name = "已撤销";
        }
      });
    },
    // table指定列合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (!this.vh5) {
          if (index === 1) {
            sums[index] = "总计";
          } else if (index === 8 || index === 12 || index === 13) {
            const values = data.map((item) => Number(item[column.property]));
            if (!values.every((value) => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } else {
              sums[index] = "0";
            }
          } else {
            sums[index] = "-";
          }
        } else {
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
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } else {
              sums[index] = "0";
            }
          } else {
            sums[index] = "-";
          }
        }
      });
      // console.log(sums);
      return sums;
    },
    // 查询
    onSubmit() {
      // console.log(this.stated, this.ruleForm);
      this.obj = {
        factory_id: this.ruleForm.factory_name,
        state: this.stated.state,
      };
      if (this.ruleForm.ctime) {
        this.obj.ctimea = this.ruleForm.ctime[0];
        this.obj.ctimeb = this.ruleForm.ctime[1];
      }
      this.init(this.obj);
    },
    handleUser_id() {},
    // 点击切换分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.init(this.obj);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.obj);
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
    async cellClick(row, column, cell, event) {
      // console.log(row, column, cell, event);
      let res = await bookStockOrderInfo({
        id: row.id,
      });
      let { data } = res.data;
      this.form = data;
      if (this.form.state == 0) {
        this.actionsLenght = 0;
        this.vh1 = true;
        this.vh2 = true;
        this.vh3 = false;
        this.vh4 = false;
        this.vh5 = false;
      } else if (this.form.state == 1) {
        this.actionsLenght = 1;
        this.vh1 = false;
        this.vh2 = false;
        this.vh4 = false;
        this.vh3 = true;
        this.vh5 = true;
      } else if (this.form.state == 4) {
        this.actionsLenght = 2;
        this.vh1 = false;
        this.vh2 = false;
        this.vh3 = false;
        this.vh4 = true;
        this.vh5 = true;
      }
      console.log(res);
    },
    //右边单元格被点击
    cellClick1(row, column, cell, event) {
      // console.log(row, column, cell, event);

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
      this.shopping()
      this.dow = document.getElementsByClassName("el-input__inner");
      let arr = [];
      this.dow.forEach((el, index) => {
        if (el.placeholder == "请选择") {
          arr.push(el);
        }
      });
      console.log(arr);
      arr.map((v, i) => {
        v.oninput = () => {
          this.shopping(v.value);
        };
      });
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
          row.sum = Number(row.quantity * row.univalence).toFixed(2);
          row.sumed = Number(row.quantity * row.discountPrice).toFixed(2);
          row.showHidden4 = false;
        } else if (v.label == "单价") {
          row.univalence = Number(item).toFixed(2);
          row.discountPrice = Number(
            (row.discount / 100) * row.univalence
          ).toFixed(2);
          row.sum = Number(row.quantity * row.univalence).toFixed(2);
          row.sumed = Number(row.quantity * row.discountPrice).toFixed(2);
          row.showHidden5 = false;
        } else if (v.label == "折扣(%)") {
          row.discount = Number(item);
          row.discountPrice = Number(
            (row.discount / 100) * row.univalence
          ).toFixed(2);
          row.sumed = Number(row.quantity * row.discountPrice).toFixed(2);
          row.showHidden6 = false;
        } else if (v.label == "折后价") {
          row.discountPrice = Number(item).toFixed(2);
          row.discount = Number(row.discountPrice / row.univalence) * 100;
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
        showHidden8: false,
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
      return (restaurant) => {
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
      console.log(v, column, row, index);
      if (column.label == "商品") {
        row.commodity = v.stylename;
        row.item_no = v.styleno;
        row.bar_code = v.bar_code;
        row.showHidden1 = false;
        this.dialogFormVisible = true;
        this.colors.forEach((item) => {
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
      this.actionsLenght = 0;
      this.vh1 = true;
      this.vh2 = false;
      this.vh3 = false;
      this.vh4 = false;
      this.vh5 = false;

      this.form = {};
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
          showHidden8: false,
        };

        this.weretable.push(obj);
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
                showHidden8: false,
              };
              this.weretable.splice(this.indexk, 0, obj);
            }
          });
        }
      });
      this.dialogFormVisible = false;
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.information();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.information();
    },
    async handleSize2(val) {
      this.pageSize3 = val;
      this.shopping();
    },
    async handleCurrent2(val) {
      this.pageIndex3 = val;
      this.shopping();
    },

    handleSize1(val) {
      this.pageSize1 = val;
      this.information();
    },
    handleCurrent1(val) {
      this.pageIndex1 = val;
      this.information();
    },
    // 商品
    async shopping(item) {
      
      let res1 = await getProjectStyleList({
        keyword: item == undefined ? "a" : item,
        page: this.pageIndex3,
        page_size: this.pageSize3,
      });
      console.log(res1);
      this.shopppings = res1.data.data;
      this.total3 = res1.data.count;
    },
    // 数据
    async information() {
      // 仓库
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2,
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
      // 厂商
      let res2 = await factoryList({
        page_size: this.pageSize1,
        page: this.pageIndex1,
      });

      this.factorys = res2.data.data;
      this.total1 = res2.data.count;
      this.factorys.unshift({ factory_name: "全部", id: "" });
      // 结算账户
      let res3 = await balanceAccountSelect();
      this.settlement = res3.data.data;
      // console.log(res3);
    },
    // 采购
    async sketch() {
      console.log(this.weretable);
      // 新增
      if (!this.form.id) {
        let res = await bookStockOrderAdd({
          factory_id: this.form.factory_name,
          storehouse_id: this.form.storehouse_name,
          balance_account_id: this.form.account_name,
          pay_price: this.form.pay_price,
          remarks: this.form.remarks,
        });
        console.log(res);
        this.form = {};
        this.init(this.obj);
      } else {
        // 编辑
        let id1 = "";
        let id2 = "";
        let id3 = "";
        if (typeof this.form.factory_name == "string") {
          this.factorys.map((v, i) => {
            if (this.form.factory_name == v.factory_name) {
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
        let res = await bookStockOrderEdit({
          factory_id: id1 || this.form.factory_name,
          storehouse_id: id2 || this.form.storehouse_name,
          balance_account_id: id3 || this.form.account_name,
          pay_price: this.form.pay_price,
          remarks: this.form.remarks,
          id: this.form.id,
        });
        console.log(res);
        this.form = {};
        this.init(this.obj);
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
          let res = await bookStockOrderDel({
            id: this.form.id,
          });
          this.vh2 = false;
          this.form = {};
          this.init(this.obj);
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
    // 撤销
    async backout() {
      this.vh3 = false;
      this.form = {};
      this.init(this.obj);
    },
    async init(obj) {
      // 数据类型 0草稿 1已入库 4已撤销
      let res = await bookStockOrderList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj,
      });
      this.tableData = res.data.data;
      this.total = res.data.count;
      this.tableData.map((v, i) => {
        if (v.state == 0) {
          v.state_name = "草稿";
        } else if (v.state == 1) {
          v.state_name = "已入库";
        } else if (v.state == 4) {
          v.state_name = "已撤销";
        }
      });
    },
  },
  async mounted() {
    this.shopping();
    this.init();
    this.information();
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
  },
};
</script>

<style lang="less" scoped>
.stockInquiry {
  list-style: none;
  .active {
    color: royalblue;
  }
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
          padding: 3px 5px;

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
                width: 210px;
                position: absolute;
                top: 5px;
                /deep/.el-range-separator {
                  padding: 0 !important;
                  width: auto;
                }
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
        margin-top: 10px;
        .el-form {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          /deep/.el-form-item {
            float: left;
            margin-bottom: 8px;
            margin-right: 0;
            .el-form-item__content {
              span {
                display: block;
                width: 90px;
              }
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