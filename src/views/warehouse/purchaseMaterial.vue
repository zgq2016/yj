<template>
  <div class="purchaseMaterial">
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>仓库</el-breadcrumb-item>
          <el-breadcrumb-item>物料采购</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="mianA">
      <div style="margin-bottom: 10px">
        <el-input
          size="small"
          style="width: 170px; margin-right: 10px"
          v-model="form1.materialsname"
          placeholder="请输入商品名称"
        ></el-input>
        <el-button
          icon="el-icon-search"
          size="mini"
          circle
          class="search_button"
          @click="onSubmit"
        ></el-button>
      </div>
      <el-form :inline="true" :model="form1">
        <el-form-item>
          <el-select
            size="small"
            v-model="form1.materials_class_name"
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
            v-model="form1.materials_class"
            @change="handleClassDatasId1($event)"
            placeholder="请选择物料小分类"
            style="width: 140px; margin-right: 10px"
            size="small"
          >
            <el-option
              v-for="item in class_datas.class_data"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form1.purchaseOptionname"
            @change="handlepurchaseOption_id($event)"
            placeholder="请选择分类"
            style="width: 140px; margin-right: 10px"
            size="small"
            clearable
          >
            <el-option
              v-for="item in purchaseOption"
              :key="item.id"
              :label="item.option"
              :value="item.id"
            ></el-option>
          </el-select>
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
            <div class="addStyle" @click="handleCard">采购</div>
            <!-- v-if="permission.indexOf('C3000200')!=-1" -->
          </div>
        </el-form-item>
      </el-form>
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
            target="_blank"
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
      <el-dialog
        title="采购信息"
        :visible.sync="centerDialogVisible2"
        width="40%"
        center
        class="dialog2"
      >
        <div class="purchaseInfo">
          <div class="purchaseInfoTitle">采购信息</div>
          <div class="userProfile">
            <span style="padding: 10px 30px"> 事件号： 自动生成 </span>
            <span> 经办人： 自动生成 </span>
          </div>
          <div class="form">
            <el-form
              :model="form_no"
              ref="form_no"
              :rules="rules_no"
              label-width="120px"
            >
              <el-form-item label="采购量" prop="amountPurchased">
                <el-input
                  v-model="form_no.amountPurchased"
                  @input="changed()"
                  placeholder="请输入采购量(以米为单位)"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="采购单价" prop="purchasePrice">
                <el-input
                  v-model="form_no.purchasePrice"
                  @input="changed()"
                  placeholder="请输入采购单价"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="金额" prop="money">
                <el-input
                  v-model="form_no.money"
                  @input="changed1()"
                  placeholder="请输入金额"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="付款" prop="payment">
                <el-radio-group
                  @change="selectPayment"
                  v-model="form_no.payment"
                >
                  <el-radio :label="0">订金</el-radio>
                  <el-radio :label="1">全额付款</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="form_no.payment == 0"
                label="订金"
                prop="deposit"
              >
                <el-input
                  v-model="form_no.deposit"
                  placeholder="请输入订金"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="form_no.payment == 1"
                label="全额付款"
                prop="fullPayout"
              >
                <el-input
                  v-model="form_no.fullPayout"
                  disabled
                  placeholder="请输入金额"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="结算账户" prop="balance_account_id">
                <el-select
                  v-model="form_no.balance_account_id"
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
                  v-model="form_no.finishTime"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="storehouse_id" label="仓库:">
                <el-select
                  v-model="form_no.storehouse_id"
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
                  :on-success="handleAvatarSuccess_no"
                  :before-upload="beforeAvatarUpload_no"
                >
                  <img
                    v-if="form_no.picurl"
                    :src="form_no.picurl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form_no.remark"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button round @click="onSubmit_no">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="mianB">
      <div class="materialPurchasing">
        <div v-if="permission.indexOf('get_style_purchase') != -1">
          <div v-for="(item1, index) in style_materials" :key="index">
            <div class="content">
              <div class="card">
                <div class="cardStyle">
                  <span class="bos">{{ item1.mainclass.slice(0, 1) }}</span>
                  <div class="cardStyle_left">
                    <div class="cardStyle_left_img">
                      <img :src="item1.picurl" alt />
                    </div>
                    <div class="cardStyle_left_content">
                      <div class="cardStyle_left_content_name">
                        <div>{{ item1.materialsname || "已删除" }}</div>

                        <div
                          class="el-icon-close"
                          style="cursor: pointer"
                          v-if="
                            item1.purchase_log.length === 0 &&
                            permission.indexOf('style_purchase_del') != -1
                          "
                          @click.stop="handleStyleMaterialsDel(item1)"
                        ></div>
                      </div>
                      <div>内部编号:{{ item1.materialsno }}</div>
                      <div>
                        {{ item1.companyname }}
                      </div>
                      <div>
                        {{ item1.materials_mainclass_name }} ({{
                          item1.materials_class_name
                        }})
                      </div>
                    </div>
                  </div>
                  <div class="cardStyle_right">
                    <div>
                      <div>{{ item1.color }}</div>
                      <span class="cardStyle_right_no">{{
                        item1.color_no
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="orderInformation">
                <el-steps
                  finish-status="wait"
                  :active="item1.purchase_log.length - 1"
                >
                  <el-step
                    style="width: 125px"
                    v-for="(item_g, index_g) in item1.purchase_log"
                    :key="index_g"
                    title
                    description
                    icon="el-icon-success"
                  >
                    <template v-slot:title>
                      <div class="tt">
                        <span>
                          {{ item_g.logname }}
                          <em>{{ "" }}</em>
                          <!-- <em v-if="item_g.state == '1'">{{item_g.quantity+"m"}}</em> -->
                        </span>
                        <span>{{ item_g.ctime }}</span>
                      </div>
                    </template>
                    <template v-slot:description>
                      <div class="dt">
                        <!-- <span>{{item_g.logname}}</span> -->
                        <span v-if="index_g == 0">{{ "预计回料时间" }}</span>
                        <span v-if="item_g.state == '2'">{{
                          "延迟回料时间"
                        }}</span>
                        <span v-if="item_g.state == '1'">{{
                          "部分回料时间"
                        }}</span>
                        <span v-if="item_g.state == '3'">{{ "回料总量" }}</span>
                        <span v-if="item_g.state == '3'">{{
                          item1.quantity + "m"
                        }}</span>
                        <span v-else>{{ item_g.returntime }}</span>
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
                <div class="option_name">
                  <el-button
                    size="mini"
                    class="option_name_id"
                    round
                    @click="goPanelPurchase(item1)"
                    v-if="
                      item1.purchase_log.length === 0 &&
                      permission.indexOf('purchase_edit') != -1
                    "
                    >{{ "采购录入" }}</el-button
                  >
                  <el-button
                    size="mini"
                    class="option_name_id"
                    round
                    @click="updateStatus(item1)"
                    v-if="
                      item1.purchase_log.length > 0 &&
                      item1.purchase_log[item1.purchase_log.length - 1]
                        .state !== '3' &&
                      permission.indexOf('style_purchase_log_add') != -1
                    "
                    >{{ "更新状态" }}</el-button
                  >
                  <el-button
                    size="mini"
                    class="option_name_id"
                    @click.stop="seeDetails2(item1)"
                    v-if="
                      item1.purchase_log.length > 0 &&
                      item1.purchase_log[item1.purchase_log.length - 1].state ==
                        '3' &&
                      item1.type != 'materials_purchase'
                    "
                    round
                    >查看内容</el-button
                  >
                  <el-button
                    size="mini"
                    class="option_name_id"
                    @click.stop="seeDetails1(item1)"
                    v-if="
                      item1.purchase_log.length > 0 &&
                      item1.purchase_log[item1.purchase_log.length - 1].state ==
                        '3'
                    "
                    round
                    >查看详情</el-button
                  >

                  <!-- &&item1.style_purchase_log_data[item1.style_purchase_log_data.length-1].logname!=='全部回料' -->
                </div>
              </div>
            </div>
            <!-- <el-divider content-position="right">{{item.mainclass}}</el-divider> -->
          </div>
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChangB"
          @current-change="handleCurrentChangB"
          :current-page="pageIndexB"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pageSizeB"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalB"
        ></el-pagination>
        <!-- 弹框 -->
        <el-dialog
          width="30%"
          title="请选择更新后的状态"
          class="tan"
          :visible.sync="outerVisible"
          center
        >
          <!-- 全部回料 -->
          <el-dialog
            width="30%"
            title="请上传全部回料凭证"
            :visible.sync="innerVisibled1"
            append-to-body
            center
          >
            <el-form
              ref="form2"
              :model="form2"
              :rules="rules2"
              label-width="100px"
            >
              <el-form-item label="结算金额" prop="money">
                <el-input
                  placeholder="请输入内容"
                  style="width: 50%"
                  v-model="form2.money"
                ></el-input>
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
                :action="url + '/uploadpic.php'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="form2.imageUrl"
                  :src="form2.imageUrl"
                  class="avatar1"
                />
                <i v-else class="el-icon-upload avatar-uploader-icon"></i>
              </el-upload>
              <div style="width: 150px; margin: 0 auto">
                <el-button @click="innerVisibled1 = false">取消</el-button>
                <el-button @click="allMaterial">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 部分回料 -->
          <el-dialog
            width="30%"
            title="部分回料"
            :visible.sync="innerVisible"
            append-to-body
            center
          >
            <el-form
              ref="form3"
              :model="form3"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="回料数量" prop="number">
                <el-input
                  placeholder="请输入内容"
                  style="width: 50%"
                  v-model="form3.number"
                ></el-input>
              </el-form-item>
              <el-form-item label="结算金额" prop="money">
                <el-input
                  placeholder="请输入内容"
                  style="width: 50%"
                  v-model="form3.money"
                ></el-input>
              </el-form-item>
              <el-form-item label="部分回料时间" prop="date">
                <el-date-picker
                  v-model="form3.date"
                  type="date"
                  style="width: 50%"
                  placeholder="选择日期"
                ></el-date-picker>
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
                <span style="width: 50%" :model="form3.money1"></span>
              </el-form-item>
              <el-upload
                class="avatar-uploader"
                :action="url + '/uploadpic.php'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="form3.imageUrl"
                  :src="form3.imageUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-upload avatar-uploader-icon"></i>
              </el-upload>
              <div style="width: 200px; margin: 0 auto">
                <el-button @click="innerVisible = false">取消</el-button>
                <el-button @click="partBack()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 延迟回料 -->
          <el-dialog
            width="30%"
            title="延迟回料"
            :visible.sync="innerVisibled"
            append-to-body
            center
          >
            <el-form
              ref="form4"
              :model="form4"
              :rules="rules1"
              label-width="80px"
            >
              <el-form-item label="延迟时间" prop="date">
                <el-date-picker
                  v-model="form4.date"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="原因" prop="reason">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="form4.reason"
                ></el-input>
              </el-form-item>
              <div style="width: 200px; margin: 0 auto">
                <el-button @click="innerVisibled = false">取消</el-button>
                <el-button @click="delayBack()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <div slot="footer" style="height: 80px" class="dialog-footer">
            <el-button
              @click="
                outerVisible = false;
                innerVisibled1 = true;
              "
              >全部回料</el-button
            >
            <el-button
              @click="
                outerVisible = false;
                innerVisible = true;
              "
              >部分回料</el-button
            >
            <el-button
              @click="
                outerVisible = false;
                innerVisibled = true;
              "
              >延迟回料</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMaterialsList,
  projectStyleMaterialsAdd,
  getStyle,
  styleMaterialsResume,
  getMaterialsPurchaseList,
  stylePurchaseDel,
  stylePurchaseLogAdd,
} from "@/api/researchDevelopment";
import {
  storehouseList,
  balanceAccountSelect,
  materialsPurchase,
  materialsPurchaseLog,
} from "@/api/warehouse";
import { produceOrderProcureLogAdd } from "@/api/production";
import { url } from "@/api/configuration";
import moment from "moment";
import { getMaterialsClass, getMaterialsClassInfo } from "@/api/archives.js";
export default {
  data() {
    return {
      purchaseOption: [
        {
          option: "研发",
          id: 1,
        },
        {
          option: "生产",
          id: 2,
        },
        {
          option: "仓库",
          id: 3,
        },
      ],
      uploadDocuments: "",
      form1: { materialsname: "" },
      form_no: {
        amountPurchased: "", //采购量
        purchasePrice: "", //单价
        money: "", //金额
        balance_account_id: "", //支付方式
        payment: 0, //付款
        finishTime: "", //预计完成时间
        deposit: 0, //订金
        fullPayout: 0, //全额支付
        picurl: "", //图片
        remark: "", //备注
      },
      form: {
        checked: false,
      },
      classData: [],
      class_datas: [],
      classDatasId: "",
      mianApageSize1: 9,
      mianApageIndex1: 1,
      searchInput: "",
      MaterialsList: [],
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      popoverId: "",
      total: 0,
      total2: 0,
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

      url: url,
      pageIndexB: 1,
      pageSizeB: 20,
      totalB: 0,

      produce_order_procure_item: {},
      pageIndex1: 1,
      pageSize1: 10,
      total1: 0,
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
      rules_no: {
        amountPurchased: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入采购量"));
              } else if (!/^[0-9]+\.?[0-9]{0,2}$/.test(value)) {
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
      code: 0,
    };
  },
  methods: {
    /**
     *
     */
    async onSubmit_no() {
      this.$refs["form_no"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.form_no.finishTime = moment(this.form_no.finishTime).format(
          "YYYY-MM-DD"
        );
        let res = await materialsPurchase({
          // id: this.$route.query.id,
          materials_id: this.materials_id,
          amountPurchased: this.form_no.amountPurchased,
          deposit: this.form_no.deposit,
          finishTime: this.form_no.finishTime,
          balance_account_id: this.form_no.balance_account_id,
          money: this.form_no.money,
          payment: this.form_no.payment,
          purchasePrice: this.form_no.purchasePrice,
          remark: this.form_no.remark,
          uploadDocuments: this.form_no.picurl,
          storehouse_id: this.form_no.storehouse_id,
        });
        if (res.data.error_code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
        this.centerDialogVisible2 = false;
        // else {
        //   this.$router.push({
        //     path: `/materialPurchasing?id=${this.$route.query.style_id}`,
        //   });
        // }
      });
    },
    async selectPayment(value) {
      if (value == 1) {
        this.form1_no.deposit = this.form1_no.fullPayout;
      } else {
        this.form1_no.deposit = "";
      }
    },
    handlepurchaseOption_id(e) {
      this.form1.purchaseOption_id = e;
      this.code = 1;
      this.init();
    },
    handleAvatarSuccess_no(res, file) {
      this.form_no.picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload_no(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async balanc() {
      // 结算账户
      let res3 = await balanceAccountSelect();
      this.options = res3.data.data;
    },
    backtrack() {
      this.centerDialogVisible1 = true;
      this.centerDialogVisible2 = false;
    },
    conserve() {
      this.$refs["form1_no"].validate(async (valid) => {
        if (!valid) return;
        this.centerDialogVisible2 = false;
        let res = await materialsPurchase({
          materials_id: this.materials_id,
          amountPurchased: this.form1_no.amountPurchased,
          money: this.form1_no.money,
          balance_account_id: this.form1_no.balance_account_id,
          purchasePrice: this.form1_no.purchasePrice,
          storehouse_id: this.form1_no.storehouse_id,
          uploadDocuments: this.uploadDocuments,
          payment: this.form1_no.payment,
          finishTime: moment(this.form1_no.finishTime).format("YYYY-MM-DD"),
          remark: this.form1_no.remark,
        });
      });
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.stock();
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.stock();
    },
    async changed1() {
      this.form_no.purchasePrice = (
        this.form_no.money / this.form_no.amountPurchased
      ).toFixed(2);
      // this.form_no.purchasePrice = String(this.form_no.purchasePrice);
    },
    changed(value) {
      this.form_no.money = (
        this.form_no.amountPurchased * this.form_no.purchasePrice
      ).toFixed(2);
      // this.form_no.money = String(this.form_no.money);
      this.form_no.fullPayout = this.form_no.money;
    },
    async addMaterialsList(item) {
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.centerDialogVisible1 = false;
        this.centerDialogVisible2 = true;
        this.form1_no = {};
        this.uploadDocuments = "";
        this.materials_id = item.id;
      });
    },
    async handleSearchInput() {
      let res = await getMaterialsList({
        keyword: this.searchInput,
        page: this.mianApageIndex1,
        page_size: this.mianApageSize1,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
    },
    handleSizeChang(val) {
      this.mianApageSize1 = val;
      this.handleSearchInput();
    },
    handleCurrentChang(val) {
      this.mianApageIndex1 = val;
      this.handleSearchInput();
    },
    handleSizeChangB(val) {
      this.pageSizeB = val;
      this.init();
    },
    handleCurrentChangB(val) {
      this.pageIndexB = val;
      this.init();
    },
    async handleCard() {
      this.searchInput = "";
      // this.materials = item.materials;
      this.centerDialogVisible1 = true;
      let res = await getMaterialsList({
        keyword: "",
        page: this.mianApageIndex1,
        page_size: this.mianApageSize1,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
      this.total1 = count;
    },
    onSubmit() {
      this.code = 1;
      this.init();
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId,
      });
      let { data } = res.data;
      this.class_datas = data;
      this.form1.materials_class = "";
      this.form1.materials_class_id = "";
      if (e != "") {
        if (data.class_data.length > 0) {
          this.form1.materials_class = this.class_datas.class_data[0].classname;
          this.form1.materials_class_id = this.class_datas.class_data[0].id;
        }
      }
      this.form1.materials_class_id_id = this.class_datas.class_data[0].id;
      this.onSubmit();
    },
    async handleClassDatasId1(e) {
      this.form1.materials_class_id_id = e;
      this.form1.materials_class = "";
      this.form1.materials_class_id = "";
      this.class_datas.class_data.map((v, i) => {
        if (e == v.id) {
          this.form1 = Object.assign({}, this.form1, {
            materials_class: v.classname,
            materials_class_id: v.id,
          });
        }
      });
      this.onSubmit();
    },
    /**
     *
     */

    // 采购查看
    async seeDetails1(item) {
      this.$router.push({
        path: `/materialTable?materials_id=${item.materials_id}&type=${item.type}&id=${item.id}`,
      });
    },
    async seeDetails2(item) {
      if (item.type == "style_purchase") {
        this.$router.push({
          path: `materialPurchasing?id=${item.style_id}&project_id=0&TL=100`,
        });
      }
      if (item.type == "produce_order_procure") {
        this.$router.push({
          path: `productionStyle?id=${item.s}&activeNames=2&TL=1`,
        });
      }
    },
    // 全部回料
    async allMaterial() {
      this.innerVisibled1 = false;
      if (this.produce_order_procure_item.type == "style_purchase") {
        let res = await stylePurchaseLogAdd({
          style_purchase_id: this.produce_order_procure_item.id, //生产采购单id
          logname: "全部回料", //日志名称
          returntime: "", //预计回料时间/部分回料时间/延迟时间
          state: "3", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form2.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: Number(this.form2.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form2.storehouse_id), //原因备注
        });
        this.init();
      }
      if (this.produce_order_procure_item.type == "produce_order_procure_log") {
        let res = await produceOrderProcureLogAdd({
          produce_order_procure_id: this.produce_order_procure_item.id, //生产采购单id
          logname: "全部回料", //日志名称
          returntime: "", //预计回料时间/部分回料时间/延迟时间
          state: "3", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form2.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: Number(this.form2.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form2.storehouse_id), //原因备注
        });
        this.init();
      }
      if (this.produce_order_procure_item.type == "materials_purchase") {
        let res = await materialsPurchaseLog({
          materials_purchase_id: this.produce_order_procure_item.id, //生产采购单id
          logname: "全部回料", //日志名称
          returntime: "", //预计回料时间/部分回料时间/延迟时间
          state: "3", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form2.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: Number(this.form2.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form2.storehouse_id), //原因备注
        });
        this.init();
      }
    },
    // 部分回料
    partBack() {
      this.$refs["form3"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.innerVisible = false;
        this.form3.date = moment(this.form3.date).format("YYYY-MM-DD");
        if (this.produce_order_procure_item.type == "style_purchase") {
          // stylePurchaseLogAdd
          let res = await stylePurchaseLogAdd({
            style_purchase_id: this.produce_order_procure_item.id, //生产采购单id
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
        }
        if (
          this.produce_order_procure_item.type == "produce_order_procure_log"
        ) {
          // produceOrderProcureLogAdd
          let res = await produceOrderProcureLogAdd({
            produce_order_procure_id: this.produce_order_procure_item.id, //生产采购单id
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
        }
        if (this.produce_order_procure_item.type == "materials_purchase") {
          // materialsPurchaseLog
          let res = await materialsPurchaseLog({
            materials_purchase_id: this.produce_order_procure_item.id, //生产采购单id
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
        }
      });
    },
    // 延迟回料
    delayBack() {
      this.$refs["form4"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        if (this.form1.purchaseOption_id == 0) {
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
        }
        if (this.form1.purchaseOption_id == 1) {
          this.innerVisibled = false;
          this.form4.date = moment(this.form4.date).format("YYYY-MM-DD");
          let res = await produceOrderProcureLogAdd({
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
        }
        if (this.form1.purchaseOption_id == 2) {
          this.innerVisibled = false;
          this.form4.date = moment(this.form4.date).format("YYYY-MM-DD");
          let res = await materialsPurchaseLog({
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
        }
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
    async handleStyleMaterialsDel(e) {
      this.$confirm("此操作将永久删除该物料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
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
      // let res1 = await getMaterialsPurchaseList({
      //   style_id: this.tabItem.style_id,
      //   style_color_name: this.tabItem.style_color_name
      // });
      // let { data } = res1.data;
      // this.style_materials = data;
      this.init();
    },
    goPanelPurchase(e) {
      this.$router.push({
        path: `/PanelPurchase?materials_id=${
          e.materials_id
        }&tabName=${"仓库采购"}&id=${e.id}&style_id=${e.style_id}`,
      });
    },
    // 更新状态
    async updateStatus(item) {
      this.outerVisible = true;
      this.produce_order_procure_item = item;
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
      let { data } = res2.data;
      this.ware = data;
      this.total1 = res2.data.count;
    },
    async init() {
      console.log(this.code);
      this.pageIndexB = 1;
      let { origin, origin_code } = this.$route.query;
      let obj = { page: this.pageIndexB, page_size: this.pageSizeB };
      if (origin !== "" && origin_code != 0) {
        obj["origin"] = origin;
        obj["origin_code"] = origin_code;
      }
      if (this.code == 1) {
        let {
          materialsname,
          purchaseOption_id,
          materials_class_id_id,
        } = this.form1;
        obj["materialsname"] = materialsname;
        obj["type"] = purchaseOption_id;
        obj["materials_class_id"] = materials_class_id_id;
        obj["origin"] = "";
        obj["origin_code"] = "";
      }
      let res1 = await getMaterialsPurchaseList(obj);

      let { data, count } = res1.data;
      this.totalB = count;
      this.style_materials = data;
    },
  },
  mounted() {
    this.init();
    this.getClassData();
    this.storehouseInit();
    this.balanc();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.purchaseMaterial {
  .mianA {
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
    .dialog2 {
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

  .mianB {
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
            position: relative;
            width: 320px;
            height: 100px;
            display: flex;
            .bos {
              position: absolute;
              bottom: 3px;
              left: 3px;
              border-radius: 50%;
              background: rgba(15, 15, 15, 0.8);
              display: block;
              text-align: center;
              color: #fff;
              width: 25px;
              height: 25px;
              padding: 4px 5px;
              font-size: 10px;
            }
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
        background: #000 !important;
        color: #ffffff !important;
        .el-icon-close {
          color: #ffffff !important;
        }
      }
      .backg {
        position: relative;
        text-align: center;
        background: #f2f2f2;
        border-radius: 15px;
        height: 30px;
        line-height: 30px;
        color: #000;
        width: 130px;
        .color {
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 0 !important;
        }
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
          width: 200px;
          height: 200px;
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
  }
  .option_name {
    width: 100px;
    height: 70px;
    display: flex;
    flex-direction: column;
    /deep/ .option_name_id {
      margin: 5px 0px !important;
    }
  }
}
</style>