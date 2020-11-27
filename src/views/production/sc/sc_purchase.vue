<template>
  <div class="sc_purchase">
    <el-button @click="add_material">增加物料</el-button>
    <div class="materialPurchasing">
      <div
        class="content"
        v-for="(item1, index1) in order_material"
        :key="index1"
      >
        <div class="card">
          <div class="cardStyle">
            <span class="bos">{{ item1.mainclass.slice(0, 1) }}</span>
            <div class="cardStyle_left">
              <div class="cardStyle_left_img">
                <img :src="item1.picurl" alt />
              </div>
              <div class="cardStyle_left_content">
                <div class="cardStyle_left_content_name">
                  <div>
                    {{ item1.materialsname || "已删除" }}
                  </div>

                  <div
                    class="el-icon-close"
                    style="cursor: pointer"
                    v-if="item1.produce_order_procure_log_data.length === 0"
                    @click.stop="handleStyleMaterialsDel(item1)"
                  ></div>
                </div>
                <div>内部编号:{{ item1.materialsno }}</div>
                <div>
                  {{ item1.supplier_name }}
                </div>
                <div>
                  {{ item1.mainclass }} ({{ item1.materials_class_name }})
                </div>
              </div>
            </div>
            <div class="cardStyle_right">
              <div>
                <div>{{ item1.color }}</div>
                <span class="cardStyle_right_no">{{ item1.color_no }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="orderInformation">
          <el-steps
            finish-status="wait"
            :active="item1.produce_order_procure_log_data.length - 1"
          >
            <el-step
              style="width: 125px"
              v-for="(item_g, index_g) in item1.produce_order_procure_log_data"
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
                  <span v-if="item_g.state == '3'">{{ "延迟回料时间" }}</span>
                  <span v-if="item_g.state == '2'">{{ "部分回料时间" }}</span>
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
          <div>
            <el-button
              size="mini"
              round
              @click="goPanelPurchase(item1)"
              v-if="item1.state == 0 || item1.state == 5"
              >{{ "采购录入" }}</el-button
            >

            <el-button
              size="mini"
              round
              @click="updateStatus(item1)"
              v-if="item1.state == 1 || item1.state == 2 || item1.state == 3"
              >{{ "更新状态" }}</el-button
            >
            <el-button
              size="mini"
              style="margin-left: 10px"
              @click.stop="seeDetails1(item1)"
              v-if="item1.state == 4"
              round
              >查看详情</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="增加款式颜色"
      :visible.sync="centerDialogVisible"
      width="400"
      center
      class="dialog"
    >
      <el-select
        v-model="color_name"
        @change="select_color"
        placeholder="请选择"
      >
        <el-option
          v-for="item in color_list"
          :key="item.id"
          :label="item.style_color_name"
          :value="item.style_color_name"
        >
        </el-option>
      </el-select>
      <div style="position: relative">
        <div class="cardList">
          <div v-for="(item1, index1) in material_list" :key="index1">
            <div v-if="item1.style_materials_data.length != 0">
              <div
                class="cards"
                v-for="(item2, index2) in item1.style_materials_data"
                :key="index2"
                style="margin-right: 20px"
              >
                <div class="card" style="margin: 10px 0">
                  <div class="cardStyle">
                    <div
                      class="cardStyle_left"
                      @click="go_routeCardDeital(item2)"
                    >
                      <div class="cardStyle_left_img">
                        <img :src="item2.picurl" alt />
                        <span class="bos">{{
                          item2.materials_mainclass_name.slice(0, 1)
                        }}</span>
                      </div>
                      <div class="cardStyle_left_content">
                        <div class="cardStyle_left_content_name">
                          <div>
                            {{ item2.materials_data.materialsname || "已删除" }}
                          </div>
                        </div>
                        <div>
                          内部编号:{{ item2.materials_data.materialsno }}
                        </div>
                        <div
                          v-if="item2.style_materials_supplier_data.length > 0"
                        >
                          {{
                            item2.style_materials_supplier_data[0].companyname
                          }}
                        </div>
                        <div>
                          {{ item2.materials_mainclass_name }} ({{
                            item2.materials_class_name
                          }})
                        </div>
                      </div>
                    </div>
                    <div class="cardStyle_right" @mouseleave="visible2 = false">
                      <div
                        style="cursor: pointer"
                        @click="handlePopoverId2(item2)"
                      >
                        <el-popover
                          placement="right"
                          v-model="visible2"
                          v-if="item2.id == popoverId2"
                        >
                          <div class="colourNumberList">
                            <div
                              class="colourNumber"
                              @click.stop="handleColourNumber2(item2, item3)"
                              v-for="(item3,
                              index3) in item2.materials_color_data"
                              :key="index3"
                            >
                              <img :src="item3.picurl" alt />
                              <div>
                                <div>{{ item3.color }}</div>
                                <div class="cardStyle_right_no">
                                  {{ item3.color_no }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="Add_color_no"
                              @click="Add_color_no(item2)"
                            >
                              添加色号
                            </div>
                          </div>
                        </el-popover>
                        <div>
                          {{
                            item2.color || item2.materials_color_data[0].color
                          }}
                        </div>
                        <div class="cardStyle_right_no">
                          {{
                            item2.color_no ||
                            item2.materials_color_data[0].color_no
                          }}
                        </div>
                      </div>
                      <el-checkbox
                        v-model="item2.isCheckList1"
                        @change="isCheckListBox1(item2)"
                      ></el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="purchaseOrder">生成采购单</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="300"
      title="请选择更新后的状态"
      class="tan"
      :visible.sync="outerVisible"
      center
    >
      <!-- 全部回料 -->
      <el-dialog
        width="300"
        title="请上传全部回料凭证"
        :visible.sync="innerVisibled1"
        append-to-body
        center
      >
        <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px">
          <el-form-item label="采购量">
            {{ quantity }}
          </el-form-item>
          <el-form-item label="采购单价">
            {{ price }}
          </el-form-item>
          <el-form-item label="金额">
            {{ totalprice }}
          </el-form-item>
          <el-form-item label="已付">
            {{ paid_money }}
          </el-form-item>
          <el-form-item label="余结金额" prop="money">
            <el-input
              placeholder="请输入内容"
              style="width: 50%"
              v-model="form2.money"
              @change="get_form2_money(form2.money)"
            ></el-input>
          </el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form2.imageUrl" :src="form2.imageUrl" class="avatar" />
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
        width="300"
        title="部分回料"
        :visible.sync="innerVisible"
        append-to-body
        center
      >
        <el-form ref="form3" :model="form3" :rules="rules" label-width="120px">
          <el-form-item label="回料数量" prop="number">
            <el-input
              placeholder="请输入内容"
              style="width: 50%"
              v-model="form3.number"
            ></el-input>
          </el-form-item>
          <el-form-item label="本次结款" prop="money">
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
          <el-form-item label="余结金额">
            <span style="width: 50%">{{ totalprice - paid_money }}</span>
          </el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form3.imageUrl" :src="form3.imageUrl" class="avatar" />
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
        width="300"
        title="延迟回料"
        :visible.sync="innerVisibled"
        append-to-body
        center
      >
        <el-form ref="form4" :model="form4" :rules="rules1" label-width="80px">
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
            <el-button @click="delayBack">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div slot="footer" style="height: 80px" class="dialog-footer">
        <el-button
          v-if="item1_state.state == 1 || item1_state.state == 5"
          @click="handle_modify_order(item1_state)"
          >修改订单</el-button
        >
        <el-button
          v-if="item1_state.state == 1 || item1_state.state == 5"
          @click="handle_cancel_order(item1_state)"
          >取消订单</el-button
        >
        <el-button
          @click="
            outerVisible = false;
            innerVisibled = true;
          "
          >延迟回料</el-button
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
            innerVisibled1 = true;
          "
          >全部回料</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { produceOrderInfo, produceOrderProcureLogAdd } from "@/api/production";
import {
  getStyleMaterialsList,
  stylePurchaseAdd,
  projectStyleMaterialsDel,
  stylePurchaseDel,
  styleMaterialsListColorEdit,
} from "@/api/researchDevelopment";
import {
  produceOrderProcureAdd,
  produceOrderProcureList,
  produceOrderProcure_del,
} from "@/api/production";
import { url } from "@/api/configuration";
import moment from "moment";
export default {
  data() {
    return {
      url: url,
      color_list: [],
      material_list: [],
      order_material: [],

      centerDialogVisible: false, //增加款式颜色
      popoverId2: "", //弹出框id1

      color_name: "",
      isAllCheck: false,
      checkNum: 0,
      card_length: 0,
      visible2: false,

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
      quantity: "",
      price: "",
      totalprice: "",
      paid_money: "",
      item1_state: "",
    };
  },
  mounted() {
    this.color_init();
    this.order_material_init();
  },
  methods: {
    async seeDetails1(item) {
      this.$router.push({
        path: `/materialTable?materials_id=${item.materials_id}`,
      });
    },
    get_form2_money(e) {
      console.log(e);
      if (this.totalprice - this.paid_money != e) {
        this.$message("结算金额不匹配");
      }
    },
    handle_modify_order(e) {
      this.$router.push({
        path: `panelPurchase_edit?materials_id=${
          e.materials_id
        }&tabName=${"采购"}&id=${e.style_id}&style_purchase_id=${
          e.id
        }&produce_no=${e.produce_no}`,
      });
    },
    handle_cancel_order(e) {
      console.log(e);
      this.$confirm("是否取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(e);
          let res = await produceOrderProcure_del({
            id: e.id,
          });
          this.$message({
            showClose: true,
            message: res.data.msg,
          });
          if (res.data.error_code == 0) {
            this.outerVisible = false;
            this.order_material_init();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async allMaterial() {
      this.$refs["form2"].validate(async (valid) => {
        if (!valid) return;
        this.innerVisibled1 = false;
        let res = await produceOrderProcureLogAdd({
          produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
          logname: "全部回料", //日志名称
          returntime: "", //预计回料时间/部分回料时间/延迟时间
          state: "4", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form2.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: Number(this.form2.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form2.storehouse_id), //原因备注
        });
        console.log(res);
        this.form2.imageUrl = "";
        this.form2.money = "";
        this.order_material_init();
      });
    },
    // 部分回料
    partBack() {
      this.$refs["form3"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        this.innerVisible = false;
        this.form3.date = moment(this.form3.date).format("YYYY-MM-DD");
        let res = await produceOrderProcureLogAdd({
          produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
          logname: "部分回料", //日志名称
          returntime: this.form3.date, //预计回料时间/部分回料时间/延迟时间
          state: "2", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form3.imageUrl, //凭证图片
          quantity: Number(this.form3.number), //回料数量
          amount: Number(this.form3.money), //结算金额
          remarks: "", //原因备注
          // storehouse_id: Number(this.form3.storehouse_id), //原因备注
        });
        this.form3.date = "";
        this.form3.date = "";
        this.form3.imageUrl = "";
        this.form3.number = "";
        this.form3.money = "";
        this.order_material_init();
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
        let res = await produceOrderProcureLogAdd({
          produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
          logname: "延迟回料", //日志名称
          returntime: this.form4.date, //预计回料时间/部分回料时间/延迟时间
          state: "3", //回料状态 1部份回料 2延时回料 3全部回料
          picurl: this.form4.imageUrl, //凭证图片
          quantity: 0, //回料数量
          amount: 0, //结算金额
          remarks: this.form4.reason, //原因备注
        });
        this.form4.date = "";
        this.form4.date = "";
        this.form4.imageUrl = "";
        this.form4.reason = "";
        this.order_material_init();
        console.log(res);
      });
    },
    async updateStatus(item1) {
      console.log(item1);
      this.quantity = item1.amountPurchased;
      this.price = item1.purchasePrice;
      this.totalprice = item1.money;
      this.paid_money = item1.deposit;
      this.item1_state = item1;
      this.outerVisible = true;
      this.produce_order_procure_id = item1.id;
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
    async handleStyleMaterialsDel(item) {
      this.$confirm("此操作将永久删除该物料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await produceOrderProcure_del({ id: item.id });
          this.$message({
            showClose: true,
            message: res.data.msg,
          });
          console.log(res);
          if (res.data.error_code == 0) {
            this.order_material_init();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goPanelPurchase(e) {
      console.log(e);
      this.$router.push({
        path: `/PanelPurchase?materials_id=${
          e.materials_id
        }&tabName=${"采购"}&id=${e.id}&style_id=${e.style_id}&produce_no=${
          e.produce_no
        }`,
      });
    },
    handlePopoverId2(item) {
      this.popoverId2 = item.id;
      this.visible2 = true;
    },
    async handleColourNumber2(item2, item3) {
      this.materials_color_id2 = item3.id;
      item2["color"] = item3.color;
      item2["color_no"] = item3.color_no;
      let res = await styleMaterialsListColorEdit({
        id: item2.id,
        materials_color_id: item3.id,
      });
      this.$message({
        showClose: true,
        message: res.data.msg,
      });
      if (res.data.error_code == 0) {
        this.visible2 = false;
      }
    },
    async order_material_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderProcureList({ style_id: id, produce_no });
      // if (res.data.data.length < 1) {
      //   return;
      // }
      this.order_material = res.data.data;
      console.log(this.order_material);
    },
    async purchaseOrder() {
      let { id, produce_no } = this.$route.query;
      let produce_order_procure_materials = [];
      this.material_list.map((v, i) => {
        v.style_materials_data.map((v1, i1) => {
          if (v1.isCheckList1 === true) {
            console.log(v1);
            produce_order_procure_materials.push({
              style_id: Number(id),
              produce_no,
              style_color_name: this.color_name,
              mainclass: v1.materials_mainclass_name,
              materials_id: v1.materials_id,
              color: v1.color,
              color_no: v1.color_no,
              picurl: v1.picurl,
            });
          }
        });
      });
      if (produce_order_procure_materials.length === 0) {
        this.$message("请选择物料");
      } else {
        this.$confirm("确认生成采购单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let res = await produceOrderProcureAdd({
            produce_order_procure_materials,
          });
          console.log(res);
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.centerDialogVisible = false;
            this.material_init();
            this.order_material_init();
          }
        });
      }
    },
    isCheckListBox1(e) {
      let arr = [];
      this.material_list.map((v, i) => {
        v.style_materials_data.map((v1, i1) => {
          if (v1.id === e.id) {
            v.isCheckList1 = !v.isCheckList1;
          }
          arr.push({ id: v1.id });
        });
      });
    },
    async select_color() {
      let { id, produce_no } = this.$route.query;
      let res = await getStyleMaterialsList({
        style_id: id,
        style_color_name: this.color_name,
      });

      console.log(res);
      if (res.data.data.length !== 0) {
        res.data.data.forEach((v, i) => {
          v.style_materials_data.forEach((v1, i1) => {
            v1["isCheckList1"] = false;
          });
        });
      }

      this.material_list = res.data.data;
    },
    add_material() {
      this.centerDialogVisible = true;
    },
    handlePopoverId1(item) {
      this.popoverId1 = item.id;
      this.visible1 = true;
    },
    async material_init() {
      let { id, produce_no } = this.$route.query;
      let res = await getStyleMaterialsList({
        style_id: id,
        style_color_name: this.color_name,
      });
      res.data.data.forEach((v, i) => {
        v.style_materials_data.forEach((v1, i1) => {
          v1["isCheckList1"] = false;
        });
      });
      this.material_list = res.data.data;
      console.log(res);
    },
    async color_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      console.log(res);
      this.color_list = res.data.data;
      this.color_name = res.data.data[0].style_color_name;
      this.material_init();
    },
  },
  watch: {
    $route() {
      this.order_material_init();
    },
  },
};
</script>

<style lang="less" scoped>
.sc_purchase {
  .materialPurchasing {
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
        align-items: flex-end;
        height: 120px;
        padding: 10px;
        &::-webkit-scrollbar {
          // display: none;
        }
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
  .dialog {
    .cardList {
      margin: 30px 0;
      overflow: hidden;
      .cards {
        height: 110px;
        position: relative;
        float: left;
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
      }
      .card {
        .cardStyle {
          width: 320px;
          height: 100px;
          display: flex;
          .cardStyle_left {
            width: 300px;
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
            flex-direction: column;
            justify-content: space-around;
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
                border-bottom: 1px solid #ccc;
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