<template>
  <div
    class="purchaseMaterial"
    v-if="permission.indexOf('advance_reimbursement_list') != -1"
  >
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>财务</el-breadcrumb-item>
          <el-breadcrumb-item>预支报销</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="mianA">
      <el-form :inline="true" :model="form1">
        <el-form-item>
          <el-date-picker
            v-model="form1.date"
            type="daterange"
            range-separator="至"
            class="timer"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="gte_date($event)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form1.type"
            placeholder="请选择类型"
            style="width: 140px; margin-right: 10px"
            size="small"
            clearable
            @change="onSubmit"
          >
            <el-option
              v-for="item in type_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-if="level != 2"
            v-model="form1.user_id"
            placeholder="请选择申请人"
            style="width: 140px; margin-right: 10px"
            size="small"
            clearable
            @change="onSubmit"
          >
            <el-option
              v-for="item in stylists"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
            v-if="permission.indexOf('advance_reimbursement_add') != -1"
          >
            <div
              class="addStyle"
              :style="
                active_show
                  ? 'background-color: #000;color: #fff;'
                  : 'background-color: #e3e3e3;color: #000;'
              "
              @click="handleShow"
            >
              展示统计数据
            </div>
            <div class="addStyle" @click="handleAdvance">预支</div>
            <div class="addStyle" @click="applyForReimbursement">报销</div>
          </div>
        </el-form-item>
      </el-form>
      <div class="account" v-show="active_show">
        <div class="tb">
          <div class="dv">
            账户进账
            <span style="color: orange"> {{ advance_money }}&yen; </span>
          </div>
          <div class="dv">
            支出
            <span style="color: orange">{{ advance_pay }}&yen;</span>
          </div>
          <div class="dv">
            结余
            <span style="color: orange"
              >{{ advance_money - advance_pay }}&yen;</span
            >
          </div>
          <div class="dv">
            账户余额
            <span style="color: orange">{{ advance_balance }}&yen;</span>
          </div>
        </div>
      </div>
      <el-dialog
        title="预支"
        :visible.sync="payment"
        width="30%"
        center
        class="dialog"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="pay_form"
          :rules="rules2"
          ref="pay_form"
          label-width="140px"
          class="demo-form"
        >
          <el-form-item label="结算账户:" prop="account">
            <el-select
              v-model="pay_form.account"
              style="width: 70%"
              @change="handle_balance_account_id2($event)"
            >
              <el-option
                v-for="item in BalanceAccount"
                :key="item.id"
                :label="item.account_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户余额:">
            <div>{{ pay_form.balance }}</div>
          </el-form-item>
          <el-form-item label="预支金额:" prop="money">
            <el-input
              v-model="pay_form.money"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="事由" prop="reason">
            <el-input
              type="textarea"
              v-model="pay_form.reason"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddpay_Form('pay_form')"
            >提 交</el-button
          >
          <el-button @click="handleClose2('pay_form')">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="报销"
        :visible.sync="reimbursement"
        width="30%"
        center
        class="dialog"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :model="re_form"
          :rules="rules1"
          ref="re_form"
          label-width="140px"
          class="demo-form"
        >
          <el-form-item label="结算账户:" prop="account">
            <el-select
              v-model="re_form.account"
              style="width: 70%"
              @change="handle_balance_account_id1($event)"
            >
              <el-option
                v-for="item in BalanceAccount"
                :key="item.id"
                :label="item.account_name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户余额:">
            <div>{{ re_form.balance }}</div>
          </el-form-item>
          <el-form-item label="账目类型:" prop="account_type_id">
            <el-select v-model="re_form.account_type_id" style="width: 70%">
              <el-option
                v-for="item in BalanceAccountType"
                :key="item.id"
                :label="item.account_type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报销金额:" prop="money">
            <el-input
              v-model="re_form.money"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务时间" prop="business_time">
            <el-date-picker
              v-model="re_form.business_time"
              type="date"
              placeholder="选择日期"
              style="width: 70%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="事由" prop="reason">
            <el-input
              type="textarea"
              v-model="re_form.reason"
              placeholder="请输入内容"
              style="width: 70%"
            ></el-input>
          </el-form-item>
          <el-form-item label="附图" prop="picurl">
            <el-upload
              class="avatar-uploader"
              :action="url + '/uploadpic.php'"
              :show-file-list="false"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload"
            >
              <img v-if="re_form.picurl" :src="re_form.picurl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddre_Form('re_form')"
            >提 交</el-button
          >
          <el-button @click="handleClose1('re_form')">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="mianB">
      <div class="materialPurchasing">
        <div v-if="style_materials != undefined">
          <div v-for="(item1, index) in style_materials" :key="index">
            <div class="content" v-if="item1.from == 'advance_reimbursement'">
              <div class="card">
                <div class="card_img">
                  <!-- <img :src="item1.picurl" alt /> -->
                  <div v-if="item1.type == 0">
                    <svg viewBox="0 0 32 32" width="120" height="120">
                      <path
                        d="M16 29.333c-7.364 0-13.333-5.969-13.333-13.333s5.969-13.333 13.333-13.333 13.333 5.969 13.333 13.333-5.969 13.333-13.333 13.333zM17.333 17.333v-1.333h4v-2.667h-3.448l2.829-2.828-1.887-1.887-2.828 2.829-2.828-2.829-1.887 1.888 2.829 2.827h-3.448v2.667h4v1.333h-4v2.667h4v2.667h2.667v-2.667h4v-2.667h-4z"
                      />
                    </svg>
                  </div>
                  <div v-if="item1.type == 1">
                    <svg viewBox="0 0 32 32" width="120" height="120">
                      <path
                        d="M7.164 6.013c2.333-2.077 5.426-3.347 8.815-3.347 0.007 0 0.015 0 0.022 0h-0.001c7.364 0 13.333 5.969 13.333 13.333 0 0.006 0 0.014 0 0.021 0 2.845-0.895 5.48-2.419 7.641l0.028-0.042-3.609-7.62h3.333c0-0 0-0 0-0 0-5.891-4.776-10.667-10.667-10.667-2.992 0-5.696 1.232-7.633 3.215l-0.002 0.002-1.2-2.536zM24.836 25.987c-2.333 2.077-5.426 3.347-8.815 3.347-0.007 0-0.015 0-0.022-0h0.001c-7.364 0-13.333-5.969-13.333-13.333 0-2.833 0.884-5.46 2.391-7.62l3.609 7.62h-3.333c0 0 0 0 0 0 0 5.891 4.776 10.667 10.667 10.667 2.992 0 5.696-1.232 7.633-3.215l0.002-0.002 1.2 2.536zM17.333 18.047h4v2.667h-4v2.667h-2.667v-2.667h-4v-2.667h4v-1.333h-4v-2.667h3.448l-2.829-2.828 1.888-1.885 2.827 2.828 2.828-2.828 1.887 1.885-2.829 2.829h3.448v2.667h-4v1.333z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="card_con">
                  <div
                    class="cardStyle_left_content_name"
                    v-if="item1.type == 0"
                  >
                    预支
                  </div>
                  <div
                    class="cardStyle_left_content_name"
                    v-if="item1.type == 1"
                  >
                    报销
                  </div>
                  <div>类型: {{ item1.account_type_name }}</div>
                  <div>金额: {{ item1.money }}</div>
                  <div>账户: {{ item1.user_name }}</div>
                </div>
              </div>
              <div class="orderInformation">
                <el-steps finish-status="wait">
                  <el-step
                    style="width: 125px"
                    v-for="(item_g, index_g) in item1.log"
                    :key="index_g"
                    title
                    description
                    icon="el-icon-success"
                  >
                    <template v-slot:title>
                      <div
                        class="tt"
                        @click="submit_applications(item1, item_g)"
                      >
                        <div v-if="item_g.status == 0">提交申请</div>
                        <div v-if="item_g.status == 1">退回</div>
                        <div v-if="item_g.status == 2">通过</div>
                        <div>{{ item_g.ctime }}</div>
                      </div>
                    </template>
                    <template v-slot:description>
                      <div
                        class="dt"
                        @click="submit_applications(item1, item_g)"
                      >
                        <div v-if="item_g.status == 0 || item_g.status == 1">
                          事由: {{ item_g.reason }}
                        </div>
                        <div v-if="item_g.status == 2">
                          {{ item1.pay_money }}
                        </div>
                      </div>
                    </template>
                  </el-step>
                </el-steps>
              </div>

              <div class="option_name">
                <!-- v-if="permission.indexOf('advance_reimbursement_handle') != -1" -->
                <div>
                  <el-button
                    size="mini"
                    round
                    @click="pass(item1)"
                    v-if="
                      item1.status < 1 &&
                      permission.indexOf('advance_reimbursement_handle') != -1
                    "
                    >通过</el-button
                  >
                </div>
                <div>
                  <el-button
                    size="mini"
                    round
                    @click="no_pass(item1)"
                    v-if="
                      item1.status < 1 &&
                      permission.indexOf('advance_reimbursement_handle') != -1
                    "
                    >退回</el-button
                  >
                </div>
                <div>
                  <el-button
                    size="mini"
                    round
                    @click="no_pass_close(item1)"
                    v-if="item1.status < 1 && user_id == item1.user_id"
                    >取消</el-button
                  >
                </div>
              </div>
            </div>
            <div class="contents" v-else>
              <div class="card">
                <div class="cardStyle">
                  <span class="bos">{{ item1.mainclass.slice(0, 1) }}</span>
                  <div class="cardStyle_left">
                    <div class="cardStyle_left_img">
                      <img :src="item1.picurl" alt />
                    </div>
                    <div class="cardStyle_left_content">
                      <div>
                        <div class="cardStyle_left_content_name">
                          {{ item1.materialsname || "已删除" }}
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
                <el-steps finish-status="wait">
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
                        <span v-if="index_g == 0">{{ "预计回料时间" }}</span>
                        <span v-if="item_g.state == '3'">{{
                          "延迟回料时间"
                        }}</span>
                        <span v-if="item_g.state == '2'">{{
                          "部分回料时间"
                        }}</span>
                        <span v-if="item_g.state == '4'">{{ "回料总量" }}</span>
                        <span v-if="item_g.state == '4'">{{
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
              </div>
              <div class="option_name">
                <div>
                  <el-button size="mini" @click.stop="seeDetails2(item1)" round
                    >采购事件</el-button
                  >
                </div>
                <div>
                  <el-button size="mini" @click.stop="seeDetails1(item1)" round
                    >查看账单</el-button
                  >
                </div>
              </div>
            </div>
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

        <el-dialog
          title="拒绝"
          :visible.sync="no_pass_lieva"
          width="30%"
          center
          class="dialog"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="no_pass_form"
            ref="no_pass_form"
            :rules="no_pass_rules"
            label-width="140px"
            class="demo-form"
          >
            <el-form-item label="理由" prop="reason">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="no_pass_form.reason"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="no_pass_now">提 交</el-button>
            <el-button @click="no_close_pass">取 消</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="通过"
          :visible.sync="pass_lieva"
          width="30%"
          center
          class="dialog"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="pass_form"
            ref="pass_form"
            :rules="pass_rules"
            label-width="140px"
            class="demo-form"
          >
            <el-form-item label="支付账户" prop="account_id">
              <el-select v-model="pass_form.account_id" style="width: 70%">
                <el-option
                  v-for="item in BalanceAccounts"
                  :key="item.id"
                  :label="item.account_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="money">
              <el-input
                v-model="pass_form.money"
                placeholder="请输入内容"
                style="width: 70%"
              ></el-input>
            </el-form-item>
            <el-form-item label="附图" prop="picurl">
              <el-upload
                class="avatar-uploader"
                :action="url + '/uploadpic.php'"
                :show-file-list="false"
                :on-success="handleSuccess2"
                :before-upload="beforeUpload"
              >
                <img
                  v-if="pass_form.picurl"
                  :src="pass_form.picurl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="pass_now">提 交</el-button>
            <el-button @click="close_pass">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <el-dialog
        :title="applications_form1.name"
        :visible.sync="applications1"
        width="30%"
        center
        class="dialog"
        :before-close="handle_applications"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form label-width="140px" class="demo-form">
          <el-form-item label="结算账户:" v-if="applications_form1.account">
            {{ applications_form1.account }}
          </el-form-item>
          <!-- <el-form-item label="账户余额:">
            <div>{{ applications_form1.balance }}</div>
          </el-form-item> -->
          <el-form-item
            label="账目类型:"
            v-if="applications_form1.account_type"
          >
            {{ applications_form1.account_type }}
          </el-form-item>
          <el-form-item label="报销金额:" v-if="applications_form1.money">
            {{ applications_form1.money }}
          </el-form-item>
          <el-form-item
            label="业务时间"
            v-if="applications_form1.business_time"
          >
            {{ applications_form1.business_time }}
          </el-form-item>
          <el-form-item
            label="事由"
            prop="reason"
            v-if="applications_form1.reason"
          >
            {{ applications_form1.reason }}
          </el-form-item>
          <img
            v-if="applications_form1.picurl"
            :src="applications_form1.picurl"
            alt=""
          />
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_applications"
            >确定</el-button
          >&yen;
        </span> -->
      </el-dialog>
      <el-dialog
        :title="applications_form.name"
        :visible.sync="applications"
        width="30%"
        center
        class="dialog"
        :before-close="handle_applications"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form label-width="140px" class="demo-form">
          <el-form-item label="结算账户:" v-if="applications_form.account">
            {{ applications_form.account }}
          </el-form-item>
          <!-- <el-form-item label="账户余额:">
            <div>{{ applications_form.balance }}</div>
          </el-form-item> -->
          <el-form-item label="账目类型:" v-if="applications_form.account_type">
            {{ applications_form.account_type }}
          </el-form-item>
          <el-form-item label="报销金额:" v-if="applications_form.money">
            {{ applications_form.money }}
          </el-form-item>
          <el-form-item label="业务时间" v-if="applications_form.business_time">
            {{ applications_form.business_time }}
          </el-form-item>
          <el-form-item
            label="事由"
            prop="reason"
            v-if="applications_form.reason"
          >
            {{ applications_form.reason }}
          </el-form-item>
          <img
            v-if="applications_form.picurl"
            :src="applications_form.picurl"
            alt=""
          />
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handle_applications"
            >确定</el-button
          >
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getMaterialsList,
  getMaterialsPurchaseList,
} from "@/api/researchDevelopment";
import { materialsPurchase } from "@/api/warehouse";
import { url } from "@/api/configuration";
import {
  accountTypeSelect,
  balanceAccountSelect,
  advanceReimbursementAdd,
  advanceReimbursementList,
  advanceReimbursementHandle,
  advanceReimbursementCancel,
} from "@/api/finance";
import { getStylistList } from "@/api/researchDevelopment";
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

      status_list: [
        { name: "申请中", id: 0 },
        { name: "拒绝", id: 1 },
        { name: "通过", id: 2 },
      ],
      type_list: [
        { name: "预支", id: 1 },
        { name: "报销", id: 2 },
        { name: "研发", id: 3 },
        { name: "生产", id: 4 },
        { name: "仓库", id: 5 },
      ],
      uploadDocuments: "",
      form1: { date: [] },

      form: {
        checked: false,
      },
      re_form: {
        account_id: "",
        account_type_id: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
        type: "",
      },
      pay_form: {
        account_id: "",
        // account_type_id: "",
        money: "",
        // business_time: "",
        reason: "",
        // picurl: "",
        type: "",
      },
      classData: [],
      class_datas: [],
      classDatasId: "",
      mianApageSize1: 9,
      mianApageIndex1: 1,
      searchInput: "",
      MaterialsList: [],
      total: 0,
      total2: 0,
      url: url,
      pageIndexB: 1,
      pageSizeB: 20,
      totalB: 0,
      obj: {},
      style_materials: [],
      active: 0,
      tabItem: {},
      BalanceAccountType: [],
      BalanceAccount: [],
      reimbursement: false,
      payment: false,
      rules1: {
        account: [{ required: true, message: "结算账户", trigger: "change" }],
        account_type_id: [
          { required: true, message: "账目类型", trigger: "change" },
        ],
        money: [{ required: true, message: "收入金额", trigger: "change" }],
        business_time: [
          { required: true, message: "业务时间", trigger: "change" },
        ],
        reason: [{ required: true, message: "事由", trigger: "change" }],
        picurl: [{ required: true, message: "附图", trigger: "change" }],
      },
      rules2: {
        account: [{ required: true, message: "结算账户", trigger: "change" }],
        // account_type_id: [
        //   { required: true, message: "账目类型", trigger: "change" },
        // ],
        money: [{ required: true, message: "收入金额", trigger: "change" }],
        // business_time: [
        //   { required: true, message: "业务时间", trigger: "change" },
        // ],
        reason: [{ required: true, message: "事由", trigger: "change" }],
        // picurl: [{ required: true, message: "附图", trigger: "change" }],
      },
      pass_rules: {
        account_id: [
          { required: true, message: "支付账户", trigger: "change" },
        ],
        money: [{ required: true, message: "金额", trigger: "change" }],
        picurl: [{ required: true, message: "凭证", trigger: "change" }],
      },
      no_pass_rules: {
        reason: [{ required: true, message: "事由", trigger: "change" }],
      },
      pass_form: {
        account_id: "",
        money: "",
        picurl: "",
      },
      pass_lieva: false,
      no_pass_form: { reason: "" },
      no_pass_lieva: false,
      BalanceAccounts: [],
      stylists: [],
      permission: [],
      level: "",
      advance_pay: "",
      advance_money: "",
      advance_balance: "",
      active_show: false,

      applications: false,
      applications1: false,
      applications_form: {
        name: "",
        account: "",
        account_type: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
      },
      applications_form1: {
        name: "",
        account: "",
        account_type: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
      },
      BalanceAccount_view: [],
    };
  },
  methods: {
    /**
     *
     */
    async no_pass_close(item1) {
      let res = await advanceReimbursementCancel({ id: item1.id });
      console.log(res);
      this.init();
    },
    handle_applications() {
      this.applications_form = {
        name: "",
        account: "",
        account_type: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
      };
      this.applications_form1 = {
        name: "",
        account: "",
        account_type: "",
        money: "",
        business_time: "",
        reason: "",
        picurl: "",
      };
      this.applications = false;
      this.applications1 = false;
      user_id: "";
    },

    submit_applications(item1, item_g) {
      if (item1.type == 0) {
        if (item_g.status == 0) {
          this.applications_form1.name = "预支申请";
          this.applications_form1.account = item1.account_name;
          this.applications_form1.money = item1.money;
          this.applications_form1.reason = item1.reason;
          this.applications1 = true;
        }
        if (item_g.status == 1) {
          this.applications_form1.name = "预支退回";
          this.applications_form1.reason = item_g.reason;
          this.applications1 = true;
        }
        if (item_g.status == 2) {
          this.applications_form1.name = "预支通过";
          this.BalanceAccount_view.map((v, i) => {
            if (v.id == item1.pay_account_id) {
              this.applications_form1.account = v.account_name;
            }
          });
          this.applications_form1.money = item1.pay_money;
          this.applications_form1.picurl = item_g.picurl;
          this.applications1 = true;
        }
      }
      if (item1.type == 1) {
        if (item_g.status == 0) {
          this.applications_form.name = "报销申请";
          this.applications_form.account = item1.account_name;
          this.applications_form.account_type = item1.account_type_name;
          this.applications_form.money = item1.money;
          this.applications_form.business_time = item1.uptime;
          this.applications_form.reason = item1.reason;
          this.applications_form.picurl = item1.picurl;
          this.applications = true;
        }
        if (item_g.status == 1) {
          this.applications_form.name = "报销退回";
          this.applications_form.reason = item_g.reason;
          this.applications = true;
        }
        if (item_g.status == 2) {
          this.applications_form.name = "报销通过";
          this.BalanceAccount_view.map((v, i) => {
            if (v.id == item1.pay_account_id) {
              this.applications_form.account = v.account_name;
            }
          });
          this.applications_form.money = item1.pay_money;
          this.applications_form.picurl = item_g.picurl;
          this.applications = true;
        }
      }
    },
    handleShow() {
      this.active_show = !this.active_show;
    },

    async seeDetails2(item) {
      console.log(item);
      if (item.type == "style_purchase") {
        this.$router.push({
          path: `materialPurchasing?id=${item.style_id}&project_id=0&TL=100`,
        });
      }
      if (item.type == "produce_order_procure") {
        this.$router.push({
          path: `sc_purchase?id=${item.style_id}&produce_no=${item.produce_no}`,
        });
      }
      if (item.type == "materials_purchase") {
        this.$router.push({
          path: `/purchaseMaterial?origin=${item.type}&origin_code=${item.id}`,
        });
      }
    },
    async seeDetails1(item) {
      this.$router.push({
        path: `/materialTable?materials_id=${item.materials_id}&type=${item.type}&id=${item.id}`,
      });
    },
    async no_pass_now() {
      this.$refs["no_pass_form"].validate(async (valid) => {
        if (!valid) return;
        let res = await advanceReimbursementHandle(this.no_pass_form);
        this.$message({
          showClose: true,
          message: res.data.msg,
        });
        if (res.data.error_code == 0) {
          this.no_pass_form.reason = "";
          this.init();
          this.no_pass_lieva = false;
        }
      });
    },
    no_close_pass() {
      this.no_pass_lieva = false;
      this.no_pass_form.reason = "";
    },
    async pass_now() {
      this.$refs["pass_form"].validate(async (valid) => {
        if (!valid) return;
        let res = await advanceReimbursementHandle(this.pass_form);
        this.$message({
          showClose: true,
          message: res.data.msg,
        });
        if (res.data.error_code == 0) {
          this.pass_form.account_id = "";
          this.pass_form.money = "";
          this.pass_form.picurl = "";
          this.init();
          this.pass_lieva = false;
        }
      });
    },
    close_pass() {
      this.pass_lieva = false;
      this.pass_form.account_id = "";
      this.pass_form.money = "";
      this.pass_form.picurl = "";
    },
    async pass(e) {
      console.log(e);
      // let res1 = await balanceAccountSelect();
      // this.BalanceAccounts = res1.data.data;
      this.pass_form["id"] = e.id;
      this.pass_form["status"] = 2;
      this.pass_form["money"] = e.money;
      this.pass_lieva = true;
    },
    no_pass(e) {
      this.no_pass_form["id"] = e.id;
      this.no_pass_form["status"] = 1;
      this.no_pass_lieva = true;
    },
    handleClose1(form) {
      this.$refs[form].resetFields();
      this.reimbursement = false;
      this.re_form.balance = "";
    },
    handleClose2(form) {
      this.$refs[form].resetFields();
      this.payment = false;
      this.pay_form.balance = "";
    },
    async handle_balance_account_id1(e) {
      this.re_form.account_id = e.id;
      this.re_form.balance = e.balance;
      this.re_form.account = e.account_name;
    },
    async handle_balance_account_id2(e) {
      this.pay_form.account_id = e.id;
      this.pay_form.balance = e.balance;
      this.pay_form.account = e.account_name;
    },
    async handleAddre_Form(form) {
      this.$refs["re_form"].validate(async (valid) => {
        if (!valid) return;
        this.re_form.business_time = moment(this.re_form.business_time).format(
          "YYYY-MM-DD"
        );
        this.re_form["type"] = 1;
        let res = await advanceReimbursementAdd(this.re_form);
        this.$refs[form].resetFields();
        this.re_form.balance = "";
        this.reimbursement = false;
        this.pageIndexB = 1;
        this.init();
      });
    },
    async handleAddpay_Form(form) {
      this.$refs["pay_form"].validate(async (valid) => {
        if (!valid) return;
        this.pay_form["type"] = 0;
        this.pay_form.business_time = "";
        this.pay_form.picurl = "";
        this.pay_form.account_type_id = "";
        let res = await advanceReimbursementAdd(this.pay_form);
        this.$refs[form].resetFields();
        this.pay_form.balance = "";
        this.payment = false;
        this.pageIndexB = 1;
        this.init();
      });
    },
    handleAdvance() {
      this.payment = true;
    },
    applyForReimbursement() {
      this.reimbursement = true;
    },
    async getBalanceAccount() {
      let res = await balanceAccountSelect({ type: 1 });
      this.BalanceAccount = res.data.data;
      this.BalanceAccounts = res.data.data;
    },
    async getBalanceAccount_view() {
      let res1 = await balanceAccountSelect();
      this.BalanceAccount_view = res1.data.data;
    },
    async getBalanceAccountType() {
      let res = await accountTypeSelect();
      let { data } = res.data;
      this.BalanceAccountType = data;
    },
    beforeUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async handleSuccess1(response, file, fileList) {
      this.re_form.picurl = response.data.pic_file_url;
    },
    async handleSuccess2(response, file, fileList) {
      this.pass_form.picurl = response.data.pic_file_url;
    },
    handleSizeChangB(val) {
      this.pageSizeB = val;
      this.init();
    },
    handleCurrentChangB(val) {
      this.pageIndexB = val;
      this.init();
    },
    onSubmit() {
      this.pageIndexB = 1;
      this.init();
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    gte_date(e) {
      this.pageIndex = 1;
      this.form1["ctime_start"] = e === null ? "" : e[0];
      this.form1["ctime_end"] = e === null ? "" : e[1];
      console.log(e);
      this.init();
    },
    async init() {
      this.form1["page"] = this.pageIndexB;
      this.form1["page_size"] = this.pageSizeB;
      let res1 = await advanceReimbursementList(this.form1);
      this.totalB = res1.data.count - 0;
      this.advance_pay = res1.data.data.pay;
      this.advance_money = res1.data.data.money;
      this.advance_balance = res1.data.data.balance;
      this.style_materials = res1.data.data.data;
    },
    day() {
      this.permission = localStorage.getItem("permission").split(",");
      this.level = localStorage.getItem("level");
      this.user_id = localStorage.getItem("user_id");
      console.log(this.level);
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var d = new Date(year, month, 0);
      var day = d.getDate();
      this.form1.date[0] = `${year}-${month}-${1}`;
      this.form1.date[1] = `${year}-${month}-${day}`;
      this.form1["ctime_start"] = `${year}-${month}-${1}`;
      this.form1["ctime_end"] = `${year}-${month}-${day}`;
      this.init();
    },
  },
  mounted() {
    this.day();
    this.getClassData();
    this.getBalanceAccount();
    this.getBalanceAccount_view();
    this.getBalanceAccountType();
    this.getStylist();
  },
};
</script>

<style lang="less" scoped>
.purchaseMaterial {
  .mianA {
    .account {
      display: flex;
      justify-content: flex-end;
      .tb {
        display: flex;
        // width: 500px;
        height: 30px;
        line-height: 30px;
        margin: 15px 0;
        .dv {
          width: 150px;
          // margin: 0 10px;
          span {
            font-size: 18px;
          }
        }
      }
    }
    overflow: hidden;

    .el-pagination {
      margin: 20px;
      text-align: right;
    }
    .timer {
      width: 300px !important;
    }
    /deep/.el-date-editor /deep/.el-range-separator {
      padding: 0 0px;
      line-height: 25px;
      width: 5%;
      color: #303133;
    }
    /deep/ .el-input__icon {
      line-height: 25px !important;
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
          // justify-content: space-between;
          // align-items: flex-end;
          width: 320px;
          background-color: #f2f2f2;
          display: flex;
          border-radius: 10px;
          overflow: hidden;
          .card_img {
            img {
              width: 120px;
              height: 120px;
            }
          }
          .card_con {
            flex: 1;
            div {
              margin: 5px;
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
        .orderInformation {
          border-radius: 10px;
          background-color: #f2f2f2;
          flex: 1;
          overflow-x: scroll;
          overflow-y: hidden;
          display: flex;
          justify-content: space-between;
          word-spacing: normal;
          // align-items: flex-end;
          height: 120px;
          padding: 15px;
        }
        .option_name {
          width: 100px;
          height: 120px;
          background-color: #f2f2f2;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
      }
      .contents {
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
            height: 120px;
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
                  width: 120px;
                  height: 120px;
                }
              }
              .cardStyle_left_content {
                flex: 1;
                div {
                  margin: 5px;
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
              height: 120px;
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
          overflow-x: scroll;
          overflow-y: hidden;
          display: flex;
          justify-content: space-between;
          word-spacing: normal;
          // align-items: flex-end;
          height: 120px;
          padding: 15px;
        }
        .option_name {
          width: 100px;
          height: 120px;
          background-color: #f2f2f2;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
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
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>