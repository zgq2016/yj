<template>
  <div
    class="sc_materialPurchasing"
    v-if="permission.indexOf('productionScheduling') != -1"
  >
    <div v-if="active == 1">
      <div class="form_add">
        <div class="form_data_add">
          <el-form
            :inline="true"
            :model="form_data"
            ref="form_data"
            label-width="100px"
          >
            <div
              class="form_data"
              v-for="(item, index) in form_data.produce_factory_order"
              :key="index"
            >
              <div class="form_data_close">
                <el-form-item label="指派方式：">
                  <el-select v-model="item.factory_id" disabled>
                    <el-option
                      v-for="item in plants"
                      :key="item.id"
                      :label="item.factory_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="指派工厂："
                  :prop="'produce_factory_order.' + index + '.mode'"
                  :rules="inspection.mode"
                >
                  <el-select v-model="item.mode" placeholder="请选择">
                    <el-option
                      v-for="item in modes"
                      :key="item.id"
                      :label="item.mode_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="指派数量："
                  :prop="'produce_factory_order.' + index + '.quantity'"
                  :rules="inspection.quantity"
                >
                  <el-input
                    v-model.number="item.quantity"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="加工价格："
                  :prop="'produce_factory_order.' + index + '.price'"
                  :rules="inspection.price"
                >
                  <el-input
                    v-model.number="item.price"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button>加工费对比</el-button>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input type="textarea" v-model="item.remarks"></el-input>
                </el-form-item>
              </div>
              <div class="add_close" @click="add_close(item, index)">删除</div>
            </div>
          </el-form>
        </div>
        <div class="bom">
          <div class="add_color">
            <div>新增指派工厂：</div>
            <el-select
              v-model="plant"
              placeholder="请选择"
              @change="stylePlantSelect"
            >
              <el-option
                v-for="item in plants"
                :key="item.id"
                :label="item.factory_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button
              @click="Confirm_scheduling"
              v-if="
                form_data.produce_factory_order.length > 0 &&
                permission.indexOf('produce_factory_order_add') != -1
              "
              >确认排单</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="active == 0">
      <div class="table" v-if="active_set == false">
        <div class="tableData">
          <div class="table_list" v-for="(item, index) in table" :key="index">
            <div class="list">
              <div class="len">
                <div class="lable">指派工厂：</div>
                {{ item.factory_name }}
              </div>
              <div class="len">
                <div class="lable">指派方式：</div>
                {{ item.mode_name }}
              </div>
              <div class="len">
                <div class="lable">指派数量：</div>
                {{ item.quantity }}
              </div>
              <div class="len">
                <div class="lable">加工价格：</div>
                {{ item.price }}
              </div>
            </div>
            <div class="remarks">
              <div class="lable">备注：</div>
              {{ item.remarks }}
            </div>
          </div>
        </div>
        <div class="table_edit" @click="table_edit">修改</div>
      </div>
      <div class="form_add" v-if="active_set == true">
        <div class="form_data_add">
          <el-form
            :inline="true"
            :model="form_data"
            ref="form_data"
            label-width="100px"
          >
            <div
              class="form_data"
              v-for="(item, index) in form_data.produce_factory_order"
              :key="index"
            >
              <div class="form_data_close">
                <el-form-item label="指派方式：">
                  <el-select v-model="item.factory_id" disabled>
                    <el-option
                      v-for="item in plants"
                      :key="item.id"
                      :label="item.factory_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="指派工厂："
                  :prop="'produce_factory_order.' + index + '.mode'"
                  :rules="inspection.mode"
                >
                  <el-select v-model="item.mode" placeholder="请选择">
                    <el-option
                      v-for="item1 in item.modes"
                      :key="item1.id"
                      :label="item1.mode_name"
                      :value="item1.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="指派数量："
                  :prop="'produce_factory_order.' + index + '.quantity'"
                  :rules="inspection.quantity"
                >
                  <el-input
                    v-model.number="item.quantity"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="加工价格："
                  :prop="'produce_factory_order.' + index + '.price'"
                  :rules="inspection.price"
                >
                  <el-input
                    v-model.number="item.price"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button>加工费对比</el-button>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input type="textarea" v-model="item.remarks"></el-input>
                </el-form-item>
              </div>
              <div
                class="add_close"
                v-if="permission.indexOf('produce_factory_order_del') != -1"
                @click="edit_close(item, index)"
              >
                删除
              </div>
            </div>
          </el-form>
        </div>
        <div class="bom">
          <div class="add_color">
            <div>新增指派工厂：</div>
            <el-select
              v-model="plant"
              placeholder="请选择"
              @change="stylePlantSelect_edit"
            >
              <el-option
                v-for="item in plants"
                :key="item.id"
                :label="item.factory_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button
              @click="Confirm_scheduling_edit"
              v-if="
                form_data.produce_factory_order.length > 0 &&
                permission.indexOf('produce_factory_order_add') != -1
              "
              >确认排单</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFactorySelect, //生产排单select工厂
  produceFactoryOrderAdd, //新增排单信息
  produceFactoryOrderList, //显示排单信息
  produceFactoryOrderEdit, //编辑排单信息
  produceFactoryOrderDel, //删除排单信息
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
import {
  getMaterialsInfo, //物料
  getSupplierInfo, //供应商
  factoryList,
  getFactoryModeSelect,
} from "@/api/archives";
import moment from "moment";
export default {
  data() {
    return {
      form_data: {
        produce_no: "",
        style_id: "",
        produce_factory_order: [],
      },
      plant: "",
      plants: [],
      modes: [],
      inspection: {
        mode: [
          { required: true, message: "请选择指派方式", trigger: "change" },
        ],
        quantity: [
          { required: true, message: "请输入指派数量", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        price: [
          { required: true, message: "请输入加工费", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        // remarks: [
        //   { required: true, message: "请填写备注", trigger: "blur" },
        //   { type: "number", message: "必须为数字值" },
        // ],
      },
      active: 1,
      active_set: false,
      table: [],
      permission: [],
    };
  },
  mounted() {
    this.permission = localStorage.getItem("permission").split(",");
    let { produce_no, id } = this.$route.query;
    this.form_data.produce_no = produce_no;
    this.form_data.style_id = id;
    this.form_data.produce_factory_order = [];
    this.get_plants();
    this.init();
  },
  methods: {
    async table_edit() {
      this.active_set = true;
      let { produce_no, id } = this.$route.query;
      let res = await produceFactoryOrderList({
        produce_no,
        style_id: id,
      });
      res.data.data.map((v, i) => {
        v["factory_id"] = v.factory_id - 0;
        v["price"] = v.price - 0;
        let modes = [];
        modes = this.plants.filter((v1, i1) => {
          if (v.factory_id == v1.id) {
            return v1;
          }
        });
        v.modes = modes[0].modes;
        v.modes.map((v1, i1) => {
          v1["id"] = v1.id - 0;
        });
      });
      this.form_data.produce_no = produce_no;
      this.form_data.style_id = id;
      this.form_data.produce_factory_order = res.data.data;
    },
    async init() {
      let { produce_no, id } = this.$route.query;
      let res = await produceFactoryOrderList({
        produce_no,
        style_id: id,
      });
      if (res.data.data.length == 0) {
        this.active = 1;
        return;
      }
      if (res.data.data.length > 0) {
        this.active = 0;
        this.active_set = false;
      }
      this.table = res.data.data;
    },
    Confirm_scheduling_edit() {
      this.$refs["form_data"].validate(async (valid) => {
        if (!valid) return;
        this.$confirm("是否确定排单！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await produceFactoryOrderEdit(this.form_data);
            this.active_set = false;
            this.form_data.produce_factory_order = [];
            this.init();
          })
          .catch((err) => {
            this.$message({
              type: "success",
              message: "取消排单",
            });
          });
      });
    },
    Confirm_scheduling() {
      this.$refs["form_data"].validate(async (valid) => {
        if (!valid) return;
        this.$confirm("是否确定排单！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await produceFactoryOrderAdd(this.form_data);
            this.active_set = false;
            this.form_data.produce_factory_order = [];
            this.init();
          })
          .catch((err) => {
            this.$message({
              type: "success",
              message: "取消排单",
            });
          });
      });
    },
    add_close(item, index) {
      this.form_data.produce_factory_order.splice(index, 1);
    },
    async edit_close(item, index) {
      this.form_data.produce_factory_order.splice(index, 1);
      let res = await produceFactoryOrderDel({ id: item.id });
      if (this.form_data.produce_factory_order.length == 0) {
        this.init();
      }
    },
    stylePlantSelect() {
      let { produce_no, id } = this.$route.query;
      this.form_data.produce_factory_order.push({
        factory_id: this.plant,
        mode: "",
        quantity: "",
        price: "",
        remarks: "",
        produce_no,
        style_id: id,
      });
      this.get_plants();
    },
    async get_plants() {
      let res = await factoryList({
        page: 1,
        page_size: 999,
      });
      this.plants = res.data.data;
      let modes = [];
      modes = this.plants.filter((v, i) => {
        if (this.plant == v.id) {
          return v;
        }
      });
      if (modes.length != 0) {
        this.modes = modes[0].modes;
      }
      this.plant = "";
    },
    stylePlantSelect_edit() {
      let { produce_no, id } = this.$route.query;
      this.form_data.produce_factory_order.push({
        factory_id: this.plant,
        mode: "",
        quantity: "",
        price: "",
        remarks: "",
        produce_no,
        style_id: id,
      });
      this.get_plants_edit();
    },
    async get_plants_edit() {
      let res = await factoryList({
        page: 1,
        page_size: 999,
      });
      this.plants = res.data.data;
      let modes = [];
      this.form_data.produce_factory_order.map((v) => {
        let modes = [];
        modes = this.plants.filter((v1, i1) => {
          if (v.factory_id == v1.id) {
            return v1;
          }
        });
        v.modes = modes[0].modes;
        v.modes.map((v1, i1) => {
          v1["id"] = v1.id - 0;
        });
      });
      this.plant = "";
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
.sc_materialPurchasing {
  .form_add {
    .form_data_add {
      .form_data {
        border-bottom: 1px dashed #000;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
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
        .form_data_close {
          /deep/textarea {
            min-width: 800px;
            height: 150px;
            resize: none !important;
          }
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
    display: flex;
    justify-content: space-between;
    .tableData {
      flex: 1;
      .table_list {
        flex: 1;
        border-bottom: 1px dashed #000;
        margin: 20px 0;
        .list {
          display: flex;
          .len {
            display: flex;
            align-items: center;
            margin: 10px 20px;
            .lable {
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
        .remarks {
          margin: 10px 20px;
          display: flex;
          align-items: center;
          margin: 10px 20px;
          .lable {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
    }
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
      margin-left: 30px;
    }
  }
}
</style>