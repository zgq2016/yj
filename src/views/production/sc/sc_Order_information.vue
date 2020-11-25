<template>
  <div class="sc_Order_information">
    <div v-if="active == 1">
      <div class="form_add">
        <div class="form_data_add">
          <el-form :model="form_data" ref="form_data" label-width="100px">
            <div
              class="form_data"
              v-for="(item, index) in form_data.produce_order"
              :key="index"
            >
              <div class="form_data_close">
                <div style="display: flex" v-if="index == 0">
                  <el-form-item
                    label="客户"
                    :prop="'produce_order.' + index + '.customer_id'"
                    :rules="inspection.customer_id"
                  >
                    <el-select
                      v-model="item.customer_id"
                      placeholder="客户"
                      @change="get_customer_id"
                    >
                      <el-option
                        v-for="item in users"
                        :key="item.id"
                        :label="item.companyname"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="出货时间"
                    :prop="'produce_order.' + index + '.expect_date'"
                    :rules="inspection.expect_date"
                  >
                    <el-date-picker
                      v-model="item.expect_date"
                      @change="get_expect_date"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <el-form-item label="颜色">
                  <div>{{ item.style_color_name }}</div>
                </el-form-item>
                <el-form-item
                  label="总量"
                  :prop="'produce_order.' + index + '.total'"
                  :rules="inspection.total"
                >
                  <el-input
                    @input="get_total(item, index)"
                    v-model.number="item.total"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="尺码"
                  :prop="'produce_order.' + index + '.produce_order_size'"
                  :rules="inspection.size"
                >
                  <div class="size">
                    <div
                      class="size_list"
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                    >
                      <div v-if="itemS.checked">
                        {{ itemS.size }}
                      </div>
                    </div>
                    <el-popover
                      placement="bottom"
                      title="请选择尺码"
                      width="450"
                      trigger="click"
                      style="margin: 0 20px"
                    >
                      <el-checkbox-group
                        v-model="item.size"
                        @change="handleCheckedCitiesChange(item, index)"
                      >
                        <el-checkbox
                          v-for="(itemc, indexc) in sizes"
                          :label="itemc.size_name"
                          :key="indexc"
                          >{{ itemc.size_name }}</el-checkbox
                        >
                      </el-checkbox-group>
                      <el-button slot="reference">选择尺码</el-button>
                    </el-popover>
                  </div>
                </el-form-item>
                <el-form-item label="比例">
                  <div class="ratio">
                    <div
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                      class="ratio_list"
                    >
                      <el-form-item
                        v-if="itemS.checked"
                        :prop="
                          'produce_order.' +
                          index +
                          '.produce_order_size.' +
                          indexS +
                          '.ratio'
                        "
                        :rules="inspection.ratio"
                      >
                        <el-input
                          v-model.number="itemS.ratio"
                          @input="get_ratio(item, itemS, index, indexS)"
                          class="input"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="数量">
                  <div class="ratio">
                    <div
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                      class="ratio_list"
                    >
                      <el-input
                        v-model="itemS.quantity"
                        v-if="itemS.checked"
                        class="input"
                        disabled
                      ></el-input>
                    </div>
                  </div>
                </el-form-item>
              </div>
              <div class="add_close" @click="add_close(item, index)">删除</div>
            </div>
          </el-form>
        </div>
        <div class="bom">
          <div class="add_color">
            <div>增加颜色</div>
            <el-select
              v-model="color"
              @change="styleColorSelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in colors"
                :key="item.id"
                :label="item.style_color_name"
                :value="item.style_color_name"
              ></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button
              @click="Confirm_the_order"
              v-if="form_data.produce_order.length > 0"
              >确认下单</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="active == 0">
      <div class="table" v-if="active_set == false">
        <div class="tableData">
          <div class="time">
            <div>出货时间: {{ expect_date }}</div>
            <div class="table_edit" @click="table_edit">修改</div>
          </div>
          <div class="tableList">
            <div class="table_header">
              <div class="table_nav">
                <span>颜色</span>
                <span v-for="item in t_size" :key="item.id">{{ item }}</span>
                <span>数量</span>
                <span>总量</span>
              </div>
              <div
                class="table_list"
                v-for="(item, index) in produceOrderInfo"
                :key="item.id"
              >
                <span>{{ item.style_color_name }}</span>
                <span v-for="item1 in all[index]" :key="item1.id">{{
                  item1
                }}</span>
                <span>{{ item.total }}</span>
                <span v-if="produceOrderInfo.length - 1 == index">{{
                  total
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form_edit" v-if="active_set == true">
        <div class="form_data">
          <el-form :model="form_data" ref="form_data" label-width="100px">
            <div
              class="form_data"
              v-for="(item, index) in form_data.produce_order"
              :key="index"
            >
              <div class="form_data_close">
                <div style="display: flex" v-if="index == 0">
                  <el-form-item
                    label="客户"
                    :prop="'produce_order.' + index + '.customer_id'"
                    :rules="inspection.customer_id"
                  >
                    <el-select
                      v-model="item.customer_id"
                      placeholder="客户"
                      @change="get_customer_id"
                    >
                      <el-option
                        v-for="item in users"
                        :key="item.id"
                        :label="item.companyname"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="出货时间"
                    :prop="'produce_order.' + index + '.expect_date'"
                    :rules="inspection.expect_date"
                  >
                    <el-date-picker
                      v-model="item.expect_date"
                      type="date"
                      placeholder="选择日期"
                      @change="get_expect_date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <el-form-item label="颜色">
                  <div>{{ item.style_color_name }}</div>
                </el-form-item>
                <el-form-item
                  label="总量"
                  :prop="'produce_order.' + index + '.total'"
                  :rules="inspection.total"
                >
                  <el-input
                    @input="get_total(item, index)"
                    v-model.number="item.total"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="尺码"
                  :prop="'produce_order.' + index + '.produce_order_size'"
                  :rules="inspection.size"
                >
                  <div class="size">
                    <div
                      class="size_list"
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                    >
                      <div v-if="itemS.checked">
                        {{ itemS.size }}
                      </div>
                    </div>
                    <el-popover
                      placement="bottom"
                      title="请选择尺码"
                      width="450"
                      trigger="click"
                      style="margin: 0 20px"
                    >
                      <el-checkbox-group
                        v-model="item.size"
                        @change="handleCheckedCitiesChange(item, index)"
                      >
                        <el-checkbox
                          v-for="(itemc, indexc) in sizes"
                          :label="itemc.size_name"
                          :key="indexc"
                          >{{ itemc.size_name }}</el-checkbox
                        >
                      </el-checkbox-group>
                      <el-button slot="reference">选择尺码</el-button>
                    </el-popover>
                  </div>
                </el-form-item>
                <el-form-item label="比例">
                  <div class="ratio">
                    <div
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                      class="ratio_list"
                    >
                      <el-form-item
                        v-if="itemS.checked"
                        :prop="
                          'produce_order.' +
                          index +
                          '.produce_order_size.' +
                          indexS +
                          '.ratio'
                        "
                        :rules="inspection.ratio"
                      >
                        <el-input
                          v-model.number="itemS.ratio"
                          @input="get_ratio(item, itemS, index, indexS)"
                          class="input"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="数量">
                  <div class="ratio">
                    <div
                      v-for="(itemS, indexS) in item.produce_order_size"
                      :key="indexS"
                      class="ratio_list"
                    >
                      <el-input
                        v-model="itemS.quantity"
                        v-if="itemS.checked"
                        class="input"
                        disabled
                      ></el-input>
                    </div>
                  </div>
                </el-form-item>
              </div>
              <div class="edit_close" @click="edit_close_edit(item, index)">
                删除
              </div>
            </div>
          </el-form>
        </div>
        <div class="bom">
          <div class="edit_color">
            <div>增加颜色</div>
            <el-select
              v-model="color"
              @change="styleColorSelect_edit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in colors"
                :key="item.id"
                :label="item.style_color_name"
                :value="item.style_color_name"
              ></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button
              @click="Confirm_the_order_edit"
              v-if="form_data.produce_order.length > 0"
              >确认下单</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  produceLogData, //批次日志
  produceAdd, // 新增生产批次
  produceDel, // 删除生产批次
  produceInfo, // 生产批次明细
  getStyleColorSelect, // 款式颜色select
  getSizeSelect, // 尺码select
  produceOrderAdd, // 增加批次下单信息
  produceOrderEdit, // 编辑批次下单信息
  produceOrderDel, // 删除批次下单信息
  produceOrderInfo, //显示批次下单信息
  produceFactoryProcessPrice,
} from "@/api/production";
import {
  projectStyleMaterialsAdd,
  getStyle,
  projectStyleColorDel,
  getWestList,
  getMaterialsList,
  getStyleMaterialsList,
} from "@/api/researchDevelopment";
import moment from "moment";
export default {
  data() {
    return {
      form_data: {
        produce_order: [],
      },
      child: {},
      color: "",
      colors: [],
      users: [],
      sizes: [],
      checkList: [],
      produce_order_size: [],
      OrderForm: {},
      inspection: {
        customer_id: [
          { required: true, message: "请选择客户", trigger: "blur" },
        ],
        expect_date: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        total: [
          { required: true, message: "请输入总数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        size: [
          {
            type: "array",
            required: true,
            message: "选择至少一个尺码",
            trigger: "blur.",
          },
        ],
        ratio: [{ type: "number", message: "必须为数字值" }],
      },
      active: 1,
      active_set: false,
      total: 0,
      colorList: [],
      produceOrderInfo: [],
      t_size: [],
      expect_date: "",
    };
  },
  mounted() {
    this.init();
    this.color_init();
    this.size_init();
    this.westList();
  },
  methods: {
    /**
     * 新增
     */
    get_customer_id(e) {
      this.form_data.produce_order.map((v, i) => {
        v.customer_id = e;
      });
    },
    get_expect_date(e) {
      this.form_data.produce_order.map((v, i) => {
        v.expect_date = moment(e).format("YYYY-MM-DD");
      });
    },
    async table_edit() {
      this.active_set = true;
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      this.form_data = {
        produce_no,
        style_id: id,
        produce_order: res.data.data,
      };
      this.form_data.produce_order.map((v, i) => {
        v["size"] = [];

        let size_arr = [];
        this.sizes.map((v1, i1) => {
          size_arr.push({
            size: v1.size_name,
            quantity: 0,
            ratio: 0,
            checked: false,
          });
        });
        size_arr.map((v2, i2) => {
          v.produce_order_size.map((v3, i3) => {
            v3.ratio = v3.ratio - 0;
            if (v2.size == v3.size) {
              v3.checked = true;
              size_arr.splice(i2, 1, v3);
              v.size.push(v3.size);
            }
          });
        });
        v.produce_order_size = size_arr;
      });
    },
    async init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      if (res.data.data.length == 0) {
        this.active = 1;
        return;
      }
      if (res.data.data.length > 0) {
        this.active = 0;
        this.active_set = false;
      }
      let t_size = [];
      let t_quantity = [];
      let all = [];
      res.data.data.map((v, i) => {
        v.produce_order_size.map((a, j) => {
          a["size_names_id"] = a.id;
          t_size.push(a.size);
          t_size = [...new Set(t_size)];
        });
      });
      res.data.data.map((v, i) => {
        v.produce_order_size.map((a, j) => {
          let quant = [];
          t_size.map((x, y) => {
            if (x == a.size) {
              quant.push(a.quantity);
            } else {
              quant.push(0);
            }
          });
          t_quantity.push(quant);
        });
        let al = [];
        al = t_quantity.reduce((pre, cur, index) => {
          pre.forEach((item, index) => {
            if (pre[index] === cur[index]) {
              pre[index] += 0;
            } else {
              pre[index] += cur[index];
            }
          });
          return pre;
        });
        all.push(al);
        t_quantity = [];
      });
      this.produceOrderInfo = res.data.data;
      this.expect_date = res.data.data[0].expect_date;
      this.t_size = t_size;
      this.t_quantity = t_quantity;
      this.all = all;
      let total = res.data.data.reduce((value, index) => {
        return value + Number(index.total);
      }, 0);
      this.total = total;
      this.colorList = this.colorList;
    },
    add_close(item, index) {
      this.form_data.produce_order.splice(index, 1);
    },
    async edit_close_edit(item, index) {
      this.form_data.produce_order.splice(index, 1);
      let res = await produceOrderDel({ id: item.id });
      if (this.form_data.produce_order.length == 0) {
        this.init();
      }
    },
    get_ratio(item, item1, index, index1) {
      this.form_data.produce_order.map((v, i) => {
        if (index == i) {
          v.produce_order_size.map((v1, i1) => {
            if (i1 == index1) {
              let res = v.produce_order_size.reduce((v1, i1) => {
                return v1 + Number(i1.ratio);
              }, 0);
              v.produce_order_size.map((value, index) => {
                value.quantity = Math.round((v.total / res) * value.ratio);
              });
            }
          });
        }
      });
    },
    Confirm_the_order_edit() {
      this.$refs["form_data"].validate(async (valid) => {
        if (!valid) return;
        this.$confirm("是否确定下单！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let form_data = this.form_data;
            this.form_data.produce_order.map((v, i) => {
              v.produce_order_size = v.produce_order_size.filter((v1, i1) => {
                return v1.checked;
              });
            });
            // form_data.produce_order.map((v, i) => {
            //     v.produce_order_size = v.produce_order_size.map((v1, i1) => {
            //       return v1;
            //     });
            // });
            let res = await produceOrderEdit(form_data);
            this.$message({
              type: "success",
              message: "下单成功!",
            });
            if (res.data.error_code == 0) {
              this.active_set = false;
              this.form_data.produce_order = [];
              this.init();
            }
          })
          .catch((err) => {
            this.$message({
              type: "success",
              message: "取消下单",
            });
          });
      });
    },
    Confirm_the_order() {
      this.$refs["form_data"].validate(async (valid) => {
        if (!valid) return;
        this.$confirm("请你确定下单！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            this.form_data.produce_order.map((v, i) => {
              v.produce_order_size = v.produce_order_size.filter((v1, i1) => {
                return v1.checked;
              });
            });
            let res = await produceOrderAdd(this.form_data);
            this.$message({
              type: "success",
              message: "下单成功!",
            });
            this.active_set = false;
            this.form_data.produce_order = [];
            this.init();
          })
          .catch((err) => {
            this.$message({
              type: "success",
              message: "已取消下单",
            });
          });
      });
    },
    get_total(item, index) {
      let arr = [];
      this.form_data.produce_order[index].produce_order_size.map((v, i) => {
        if (item.size.indexOf(v.size) > -1) {
          v.checked = true;
        } else {
          v.checked = false;
        }
        if (v.checked == false) {
          v.quantity = 0;
          v.ratio = 0;
        }
        if (v.checked == true && v.ratio != "") {
          arr.push({ v });
        }
      });
      let res = this.form_data.produce_order[index].produce_order_size.reduce(
        (v1, i1) => {
          return arr.length + Number(i1.ratio);
        },
        0
      );
      this.form_data.produce_order.map((v, i) => {
        if (index == i) {
          v.produce_order_size.map((v1, i1) => {
            v1.quantity = Math.round((v.total / res) * v1.ratio);
          });
        }
      });
    },
    handleCheckedCitiesChange(item, index) {
      let arr = [];
      this.form_data.produce_order[index].produce_order_size.map((v, i) => {
        if (item.size.indexOf(v.size) > -1) {
          v.checked = true;
        } else {
          v.checked = false;
        }
        if (v.checked == false) {
          v.quantity = 0;
          v.ratio = 0;
        }
        if (v.checked == true && v.ratio != "") {
          arr.push({ v });
        }
      });
      let res = this.form_data.produce_order[index].produce_order_size.reduce(
        (v1, i1) => {
          return arr.length + Number(i1.ratio);
        },
        0
      );
      this.form_data.produce_order.map((v, i) => {
        if (index == i) {
          v.produce_order_size.map((v1, i1) => {
            v1.quantity = Math.round((v.total / res) * v1.ratio);
          });
        }
      });
    },
    styleColorSelect_edit(e) {
      for (
        let index = 0;
        index < this.form_data.produce_order.length;
        index++
      ) {
        if (this.form_data.produce_order[index].style_color_name == e) {
          this.$message({
            type: "error",
            message: "颜色不能重复!",
          });

          this.color = "";
          return;
        }
      }
      let { produce_no, id } = this.$route.query;
      let produce_order_size = [];
      this.sizes.map((v, i) => {
        produce_order_size.push({
          id: 0,
          produce_no: produce_no,
          quantity: "",
          ratio: "",
          size: v.size_name,
          style_color_name: e,
          style_id: id,
          checked: false,
        });
      });
      this.form_data.produce_order.push({
        customer_id: this.form_data.produce_order[0].customer_id,
        expect_date: this.form_data.produce_order[0].expect_date,
        id: 0,
        produce_no,
        produce_order_size: produce_order_size,
        style_color_name: e,
        style_id: id,
        total: "",
        size: [],
        size_list: this.sizes,
      });

      this.color = "";
    },
    async styleColorSelect(e) {
      for (
        let index = 0;
        index < this.form_data.produce_order.length;
        index++
      ) {
        if (this.form_data.produce_order[index].style_color_name == e) {
          this.$message({
            type: "error",
            message: "颜色不能重复!",
          });

          this.color = "";
          return;
        }
      }
      let { produce_no, id } = this.$route.query;
      let produce_order_size = [];
      this.sizes.map((v, i) => {
        produce_order_size.push({
          id: 0,
          produce_no: produce_no,
          quantity: "",
          ratio: "",
          size: v.size_name,
          style_color_name: e,
          style_id: id,
          checked: false,
        });
      });
      if (this.form_data.produce_order.length == 0) {
        this.form_data.produce_order.push({
          customer_id: "",
          expect_date: "",
          id: 0,
          produce_no,
          produce_order_size: produce_order_size,
          style_color_name: e,
          style_id: id,
          total: "",
          size: [],
          size_list: this.sizes,
        });
      } else {
        this.form_data.produce_order.push({
          customer_id: this.form_data.produce_order[0].customer_id,
          expect_date: this.form_data.produce_order[0].expect_date,
          id: 0,
          produce_no,
          produce_order_size: produce_order_size,
          style_color_name: e,
          style_id: id,
          total: "",
          size: [],
          size_list: this.sizes,
        });
      }

      this.color = "";
    },
    /**
     * 初始化
     */
    async size_init() {
      let res = await getSizeSelect();
      let { data } = res.data;
      this.sizes = data;
    },
    async color_init() {
      let style_id = this.$route.query.id;
      let res = await getStyleColorSelect({ style_id: Number(style_id) });
      let { data } = res.data;
      this.colors = data;
    },
    async westList() {
      let res = await getWestList();
      let { data } = res.data;
      this.users = data;
    },
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.sc_Order_information {
  .form_edit {
    .form_data {
      .form_data {
        border-bottom: 1px dashed #000;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .form_data_close {
          .size {
            display: flex;
            align-items: center;
            .size_list {
              div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
              }
            }
          }
          .ratio {
            display: flex;
            .ratio_list {
              .input {
                width: 90px;
                margin: 0 5px;
              }
            }
          }
        }
        .edit_close {
          width: 100px;
          height: 40px;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: red;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .bom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .edit_color {
        display: flex;
        align-items: center;
        margin: 10px 0;
        div {
          margin-right: 10px;
        }
      }
    }
  }
  .form_add {
    .form_data_add {
      .form_data {
        border-bottom: 1px dashed #000;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .form_data_close {
          .size {
            display: flex;
            align-items: center;
            .size_list {
              div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
              }
            }
          }
          .ratio {
            display: flex;
            .ratio_list {
              .input {
                width: 90px;
                margin: 0 5px;
              }
            }
          }
        }
        .add_close {
          width: 100px;
          height: 40px;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: red;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .bom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .add_color {
        display: flex;
        align-items: center;
        margin: 10px 0;
        div {
          margin-right: 10px;
        }
      }
    }
  }
  .table {
    .tableData {
      .time {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .table_edit {
          width: 100px;
          height: 40px;
          background-color: #ccc;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .tableList {
        .table_header {
          .table_nav {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            overflow: hidden;
            display: flex;

            span {
              width: 50px;
            }
          }

          .table_list {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            overflow: hidden;
            display: flex;

            span {
              width: 50px;
            }
          }
        }
      }
    }
  }
}
</style>