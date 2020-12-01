<template>
  <div class="sc_shipment" v-if="permission.indexOf('shipment') != -1">
    <div class="add" v-if="active == 1">
      <div class="add_form" v-for="(item, index) in shipment_list" :key="index">
        <div>
          <div
            class="form_add"
            v-for="item1 in item.finished_list"
            :key="item1.timer"
          >
            <div class="form_data_add">
              <div class="tit">
                <div class="color" style="font-size: 20px">成品</div>
                <div v-for="(item2, index2) in item1.t_size" :key="index2">
                  <div class="size">{{ item2 }}</div>
                </div>
                <div class="color">数量</div>
                <div class="color">总数</div>
              </div>
              <div class="con">
                <div
                  class="color_list"
                  v-for="(item2, index2) in item1.t_color"
                  :key="index2"
                >
                  <div class="color">{{ item2.color }}</div>
                  <div
                    v-for="(item3, index3) in item1.t_color_size"
                    :key="index3"
                  >
                    <div
                      v-if="item2.color == item3.style_color_name"
                      class="color_size"
                    >
                      <el-input
                        v-model="item3.quantity"
                        placeholder="请输入"
                        style="width: 90px"
                        @input="get_finished_quantity(item3, index)"
                      ></el-input>
                    </div>
                  </div>
                  <div class="color">{{ item2.finished_num }}</div>
                  <div class="color" v-if="item1.t_color.length - 1 == index2">
                    {{ item2.finished_total_num }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="form_add"
            v-for="item1 in item.rejects_list"
            :key="item1.timer"
          >
            <div class="form_data_add">
              <div class="tit">
                <div class="color" style="font-size: 20px">次品</div>
                <div v-for="(item2, index2) in item1.t_size" :key="index2">
                  <div class="size">{{ item2 }}</div>
                </div>
                <div class="color">数量</div>
                <div class="color">总数</div>
              </div>
              <div class="con">
                <div
                  class="color_list"
                  v-for="(item2, index2) in item1.t_color"
                  :key="index2"
                >
                  <div class="color">{{ item2.color }}</div>
                  <div
                    v-for="(item3, index3) in item1.t_color_size"
                    :key="index3"
                  >
                    <div
                      v-if="item2.color == item3.style_color_name"
                      class="color_size"
                    >
                      <el-input
                        v-model="item3.quantity"
                        placeholder="请输入"
                        style="width: 90px"
                        @input="get_rejects_quantity(item3, index)"
                      ></el-input>
                    </div>
                  </div>
                  <div class="color">{{ item2.rejects_num }}</div>
                  <div class="color" v-if="item1.t_color.length - 1 == index2">
                    {{ item2.rejects_total_num }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-form label-width="80px">
            <el-form-item label="仓库:">
              <el-select
                size="mini"
                v-model="item.storehouse_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="items in wares"
                  :key="items.id"
                  :label="items.storehouse_name"
                  :value="items.id"
                ></el-option>
                <el-pagination
                  small
                  layout="prev, pager, next"
                  @size-change="handleSize"
                  @current-change="handleCurrent"
                  :total="total"
                ></el-pagination>
              </el-select>
            </el-form-item>
            <el-form-item label="工厂:">
              <el-select
                size="mini"
                v-model="item.factory_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in factory"
                  :key="item.id"
                  :label="item.factory_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="add_close"
          v-if="shipment_list.length > 1"
          @click="add_close(item, index)"
        >
          删除
        </div>
      </div>
      <div class="bom">
        <el-button @click="add_shipment">增加出货</el-button>
        <el-button @click="confirm_shipment">确定出货</el-button>
      </div>
    </div>

    <div v-if="active == 0">
      <div class="table" v-if="active_set == false">
        <div class="table_form">
          <div
            class="add_form"
            v-for="(item, index) in table_list"
            :key="index"
          >
            <div
              class="form_add"
              v-for="item1 in item.finished"
              :key="item1.timer"
            >
              <div class="form_data_add">
                <div class="tit">
                  <div class="color" style="font-size: 20px">成品</div>
                  <div
                    v-for="(item2, index2) in item1.finished_size"
                    :key="index2"
                  >
                    <div class="size">{{ item2 }}</div>
                  </div>
                  <div class="color">数量</div>
                  <div class="color">总数</div>
                </div>
                <div class="con">
                  <div
                    class="color_list"
                    v-for="(item2, index2) in item1.finished_color"
                    :key="index2"
                  >
                    <div class="color">{{ item2.color }}</div>
                    <div
                      v-for="(item3, index3) in item1.finished_color_size"
                      :key="index3"
                    >
                      <div
                        v-if="item2.color == item3.style_color_name"
                        class="color_size"
                      >
                        {{ item3.quantity }}
                      </div>
                    </div>
                    <div class="color">{{ item2.num }}</div>
                    <div
                      class="color"
                      v-if="item1.finished_color.length - 1 == index2"
                    >
                      {{ item2.total_num }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="form_add"
              v-for="item1 in item.rejects"
              :key="item1.timer"
            >
              <div class="form_data_add">
                <div class="tit">
                  <div class="color" style="font-size: 20px">次品</div>
                  <div
                    v-for="(item2, index2) in item1.rejects_size"
                    :key="index2"
                  >
                    <div class="size">{{ item2 }}</div>
                  </div>
                  <div class="color">数量</div>
                  <div class="color">总数</div>
                </div>
                <div class="con">
                  <div
                    class="color_list"
                    v-for="(item2, index2) in item1.rejects_color"
                    :key="index2"
                  >
                    <div class="color">{{ item2.color }}</div>
                    <div
                      v-for="(item3, index3) in item1.rejects_color_size"
                      :key="index3"
                    >
                      <div
                        v-if="item2.color == item3.style_color_name"
                        class="color_size"
                      >
                        {{ item3.quantity }}
                      </div>
                    </div>
                    <div class="color">{{ item2.num }}</div>
                    <div
                      class="color"
                      v-if="item1.rejects_color.length - 1 == index2"
                    >
                      {{ item2.total_num }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-form label-width="80px">
              <el-form-item label="仓库:">
                {{ item.storehouse_name }}
              </el-form-item>
              <el-form-item label="工厂:">
                {{ item.factory_name }}
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div
          class="table_edit"
          @click="table_edit"
          v-if="permission.indexOf('produce_complete_edit') != -1"
        >
          修改
        </div>
      </div>
      <div class="edit" v-if="active_set == true">
        <div class="add_form" v-for="(item, index) in table_list" :key="index">
          <div>
            <div
              class="form_add"
              v-for="item1 in item.finished"
              :key="item1.timer"
            >
              <div class="form_data_add">
                <div class="tit">
                  <div class="color" style="font-size: 20px">成品</div>
                  <div
                    v-for="(item2, index2) in item1.finished_size"
                    :key="index2"
                  >
                    <div class="size">{{ item2 }}</div>
                  </div>
                  <div class="color">数量</div>
                  <div class="color">总数</div>
                </div>
                <div class="con">
                  <div
                    class="color_list"
                    v-for="(item2, index2) in item1.finished_color"
                    :key="index2"
                  >
                    <div class="color">{{ item2.color }}</div>
                    <div
                      v-for="(item3, index3) in item1.finished_color_size"
                      :key="index3"
                    >
                      <div
                        v-if="item2.color == item3.style_color_name"
                        class="color_size"
                      >
                        <el-input
                          v-model="item3.quantity"
                          placeholder="请输入"
                          style="width: 90px"
                          @input="edit_finished_quantity(item3, index)"
                        ></el-input>
                        <!-- {{ item3.quantity }} -->
                      </div>
                    </div>
                    <div class="color">{{ item2.num }}</div>
                    <div
                      class="color"
                      v-if="item1.finished_color.length - 1 == index2"
                    >
                      {{ item2.total_num }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="form_add"
              v-for="item1 in item.rejects"
              :key="item1.timer"
            >
              <div class="form_data_add">
                <div class="tit">
                  <div class="color" style="font-size: 20px">次品</div>
                  <div
                    v-for="(item2, index2) in item1.rejects_size"
                    :key="index2"
                  >
                    <div class="size">{{ item2 }}</div>
                  </div>
                  <div class="color">数量</div>
                  <div class="color">总数</div>
                </div>
                <div class="con">
                  <div
                    class="color_list"
                    v-for="(item2, index2) in item1.rejects_color"
                    :key="index2"
                  >
                    <div class="color">{{ item2.color }}</div>
                    <div
                      v-for="(item3, index3) in item1.rejects_color_size"
                      :key="index3"
                    >
                      <div
                        v-if="item2.color == item3.style_color_name"
                        class="color_size"
                      >
                        <el-input
                          v-model="item3.quantity"
                          placeholder="请输入"
                          style="width: 90px"
                          @input="edit_rejects_quantity(item3, index)"
                        ></el-input>
                      </div>
                    </div>
                    <div class="color">{{ item2.num }}</div>
                    <div
                      class="color"
                      v-if="item1.rejects_color.length - 1 == index2"
                    >
                      {{ item2.total_num }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-form label-width="80px">
              <el-form-item label="仓库:">
                <el-select
                  size="mini"
                  v-model="item.storehouse_id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="items in wares"
                    :key="items.id"
                    :label="items.storehouse_name"
                    :value="items.id"
                  ></el-option>
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    @size-change="handleSize"
                    @current-change="handleCurrent"
                    :total="total"
                  ></el-pagination>
                </el-select>
              </el-form-item>
              <el-form-item label="工厂:">
                <el-select
                  size="mini"
                  v-model="item.factory_id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in factory"
                    :key="item.id"
                    :label="item.factory_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div
            class="add_close"
            @click="edit_close(item, index)"
            v-if="permission.indexOf('produce_complete_del') != -1"
          >
            删除
          </div>
        </div>
        <div class="bom">
          <el-button @click="edit_shipment">增加出货</el-button>
          <el-button
            @click="edit_confirm_shipment"
            v-if="permission.indexOf('produce_complete_add') != -1"
            >确定出货</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  produceOrderInfo, //显示批次下单信息
  getFactorySelect, //生产排单select工厂
  produceCompleteAdd, //新增出货信息
  produceCompleteList, //显示出货信息
  produceCompleteDel, //删除出货信息
  produceCompleteEdit, //编辑出货信息
  produceFactoryOrderList,
} from "@/api/production";
import { storehouseList } from "@/api/warehouse.js";
import { getFactoryModeSelect, factoryList } from "@/api/archives";
export default {
  data() {
    return {
      shipment_list: [], //出货
      finished_list: [], //成品
      rejects_list: [], //次品
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      wares: [],
      factory: [],
      active: 1,
      active_set: false,
      table_list: [],
      finished: [],
      rejects: [],
      permission: [],
    };
  },
  mounted() {
    this.permission = localStorage.getItem("permission").split(",");
    this.init();
    this.factory_init();
    this.ware_init();
    // this.add_init();
  },
  methods: {
    edit_rejects_quantity(item3, index) {
      this.table_list.map((v, i) => {
        if (index == i) {
          v.rejects.map((v1, i1) => {
            v1.rejects_color.map((v2, i2) => {
              v2["arr"] = [];
              v2["arr1"] = [];
              v1.rejects_color_size.map((v3, i3) => {
                v2["id"] = 0;
                if (v2.color == v3.style_color_name) {
                  v2.arr.push(v3);
                  v2.num = v2.arr.reduce((value, inde) => {
                    return value + Number(inde.quantity);
                  }, 0);
                }
                v2.arr1.push(Number(v3.quantity));
                v2.total_num = v2.arr1.reduce((value, inde) => {
                  return value + Number(inde);
                }, 0);
              });
            });
          });
        }
      });
    },
    edit_finished_quantity(item3, index) {
      this.table_list.map((v, i) => {
        if (index == i) {
          v.finished.map((v1, i1) => {
            v1.finished_color.map((v2, i2) => {
              v2["id"] = 0;
              v2["arr"] = [];
              v2["arr1"] = [];
              v1.finished_color_size.map((v3, i3) => {
                if (v2.color == v3.style_color_name) {
                  v2.arr.push(v3);
                  v2.num = v2.arr.reduce((value, inde) => {
                    return value + Number(inde.quantity);
                  }, 0);
                }
                v2.arr1.push(Number(v3.quantity));
                v2.total_num = v2.arr1.reduce((value, inde) => {
                  return value + Number(inde);
                }, 0);
              });
            });
          });
        }
      });
    },
    async edit_shipment() {
      this.finished = [];
      this.rejects = [];
      let { id, produce_no } = this.$route.query;
      this.edit_finished_init();
      this.edit_rejects_init();
      this.table_list.push({
        id: 0,
        finished: this.finished,
        rejects: this.rejects,
        factory_id: "",
        storehouse_id: "",
        produce_no,
        style_id: id,
      });
    },
    async edit_finished_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      let finished_size = [];
      let finished_color = [];
      let finished_color_size = [];
      res.data.data.map((v, i) => {
        v.produce_order_size.map((v1, i1) => {
          finished_size.push(v1.size);
          finished_size = [...new Set(finished_size)];
          finished_color.push(v1.style_color_name);
          finished_color = [...new Set(finished_color)];
        });
      });
      finished_color = finished_color.map((v, i) => {
        v = { color: v };
        v["num"] = 0;
        v["total_num"] = 0;
        return v;
      });
      finished_size.map((v2, i2) => {
        finished_color.map((v3, i3) => {
          finished_color_size.push({
            size: v2,
            style_color_name: v3.color,
            quantity: "",
            isproduct: 1,
            produce_no,
            style_id: id,
          });
        });
      });
      this.finished.push({
        finished_size,
        finished_color,
        finished_color_size,
        timer: Date.now(),
      });
    },
    async edit_rejects_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      let rejects_size = [];
      let rejects_color = [];
      let rejects_color_size = [];
      res.data.data.map((v, i) => {
        v.produce_order_size.map((v1, i1) => {
          rejects_size.push(v1.size);
          rejects_size = [...new Set(rejects_size)];
          rejects_color.push(v1.style_color_name);
          rejects_color = [...new Set(rejects_color)];
        });
      });
      rejects_color = rejects_color.map((v, i) => {
        v = { color: v };
        v["num"] = 0;
        v["total_num"] = 0;
        return v;
      });
      rejects_size.map((v2, i2) => {
        rejects_color.map((v3, i3) => {
          rejects_color_size.push({
            size: v2,
            style_color_name: v3.color,
            quantity: "",
            isproduct: 0,
            produce_no,
            style_id: id,
          });
        });
      });
      this.rejects.push({
        rejects_size,
        rejects_color,
        rejects_color_size,
        timer: Date.now(),
      });
      console.log(this.rejects_list);
    },
    edit_confirm_shipment() {
      this.$confirm("提交出货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id, produce_no } = this.$route.query;
          console.log(this.table_list);
          this.table_list.map((v, i) => {
            v["id"] = v.id || 0;
            v["produce_complete_size"] = [];
            v.finished.map((v1, i1) => {
              v1.finished_color_size.map((v2, i2) => {
                if (v2.quantity == "") {
                  v2.quantity = 0;
                }
                v.produce_complete_size.push(v2);
              });
            });
            v.rejects.map((v1, i1) => {
              v1.rejects_color_size.map((v2, i2) => {
                if (v2.quantity == "") {
                  v2.quantity = 0;
                }
                v.produce_complete_size.push(v2);
              });
            });
          });
          let obj = {
            produce_no,
            style_id: id,
            produce_complete: this.table_list,
          };
          let res = await produceCompleteEdit(obj);
          this.$message(res.data.msg);
          if (res.data.error_code == 0) {
            this.table_list = [];
            this.finished = [];
            this.rejects = [];
            this.init();
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async table_edit() {
      this.active_set = true;
      let { id, produce_no } = this.$route.query;
      let res = await produceCompleteList({
        produce_no,
        style_id: id,
      });
      res.data.data.produce_complete_data.map((v, i) => {
        v["factory_id"] = v.factory_id - 0;
        v["storehouse_id"] = v.storehouse_id - 0;
        v["finished"] = [
          { finished_size: [], finished_color: [], finished_color_size: [] },
        ];

        v.finished.map((v1, i1) => {
          v.produce_complete_size_a_data.map((v2, i2) => {
            if (v2.quantity == 0) {
              v2.quantity = "";
            }
            v1.finished_size.push(v2.size);
            v1.finished_size = [...new Set(v1.finished_size)];
            v1.finished_color.push(v2.style_color_name);
            v1.finished_color = [...new Set(v1.finished_color)];
            v1.finished_color_size = v.produce_complete_size_a_data;
          });
          v1.finished_color = v1.finished_color.map((v2, i2) => {
            v2 = { color: v2 };
            v2["num"] = 0;
            v2["total_num"] = 0;
            return v2;
          });
          v1.finished_color.map((v2, i2) => {
            v2["arr"] = [];
            v2["arr1"] = [];
            v1.finished_color_size.map((v3, i3) => {
              if (v2.color == v3.style_color_name) {
                v2.arr.push(v3);
                v2.num = v2.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v2.arr1.push(Number(v3.quantity));
              v2.total_num = v2.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        });
        v["rejects"] = [
          { rejects_size: [], rejects_color: [], rejects_color_size: [] },
        ];
        v.rejects.map((v1, i1) => {
          v.produce_complete_size_b_data.map((v2, i2) => {
            if (v2.quantity == 0) {
              v2.quantity = "";
            }
            v1.rejects_size.push(v2.size);
            v1.rejects_size = [...new Set(v1.rejects_size)];
            v1.rejects_color.push(v2.style_color_name);
            v1.rejects_color = [...new Set(v1.rejects_color)];
            v1.rejects_color_size = v.produce_complete_size_b_data;
          });
          v1.rejects_color = v1.rejects_color.map((v2, i2) => {
            v2 = { color: v2 };
            v2["num"] = 0;
            v2["total_num"] = 0;
            return v2;
          });
          v1.rejects_color.map((v2, i2) => {
            v2["arr"] = [];
            v2["arr1"] = [];
            v1.rejects_color_size.map((v3, i3) => {
              if (v2.color == v3.style_color_name) {
                v2.arr.push(v3);
                v2.num = v2.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v2.arr1.push(Number(v3.quantity));
              v2.total_num = v2.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        });
      });
      console.log(res.data.data.produce_complete_data);
      this.table_list = res.data.data.produce_complete_data;
    },
    add_close(item, index) {
      this.shipment_list.splice(index, 1);
    },
    async edit_close(item, index) {
      this.table_list.splice(index, 1);
      let res = await produceCompleteDel({ id: item.id });
      if (this.table_list.length == 0) {
        this.init();
      }
    },
    async init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceCompleteList({
        produce_no,
        style_id: id,
      });
      if (res.data.data.produce_complete_data.length == 0) {
        this.active = 1;
        this.add_init();
        return;
      }
      if (res.data.data.produce_complete_data.length > 0) {
        this.active = 0;
        this.active_set = false;
      }
      res.data.data.produce_complete_data.map((v, i) => {
        v["factory_id"] = v.factory_id - 0;
        v["storehouse_id"] = v.storehouse_id - 0;
        v["finished"] = [
          { finished_size: [], finished_color: [], finished_color_size: [] },
        ];

        v.finished.map((v1, i1) => {
          v.produce_complete_size_a_data.map((v2, i2) => {
            v1.finished_size.push(v2.size);
            v1.finished_size = [...new Set(v1.finished_size)];
            v1.finished_color.push(v2.style_color_name);
            v1.finished_color = [...new Set(v1.finished_color)];
            v1.finished_color_size = v.produce_complete_size_a_data;
          });
          v1.finished_color = v1.finished_color.map((v2, i2) => {
            v2 = { color: v2 };
            v2["num"] = 0;
            v2["total_num"] = 0;
            return v2;
          });
          v1.finished_color.map((v2, i2) => {
            v2["arr"] = [];
            v2["arr1"] = [];
            v1.finished_color_size.map((v3, i3) => {
              if (v2.color == v3.style_color_name) {
                v2.arr.push(v3);
                v2.num = v2.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v2.arr1.push(Number(v3.quantity));
              v2.total_num = v2.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        });
        v["rejects"] = [
          { rejects_size: [], rejects_color: [], rejects_color_size: [] },
        ];
        v.rejects.map((v1, i1) => {
          v.produce_complete_size_b_data.map((v2, i2) => {
            v1.rejects_size.push(v2.size);
            v1.rejects_size = [...new Set(v1.rejects_size)];
            v1.rejects_color.push(v2.style_color_name);
            v1.rejects_color = [...new Set(v1.rejects_color)];
            v1.rejects_color_size = v.produce_complete_size_b_data;
          });
          v1.rejects_color = v1.rejects_color.map((v2, i2) => {
            v2 = { color: v2 };
            v2["num"] = 0;
            v2["total_num"] = 0;
            return v2;
          });
          v1.rejects_color.map((v2, i2) => {
            v2["arr"] = [];
            v2["arr1"] = [];
            v1.rejects_color_size.map((v3, i3) => {
              if (v2.color == v3.style_color_name) {
                v2.arr.push(v3);
                v2.num = v2.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v2.arr1.push(Number(v3.quantity));
              v2.total_num = v2.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        });
      });
      console.log(res.data.data.produce_complete_data);
      this.table_list = res.data.data.produce_complete_data;
    },
    add_shipment() {
      this.finished_list = [];
      this.rejects_list = [];
      let { id, produce_no } = this.$route.query;
      this.finished_init();
      this.rejects_init();
      this.shipment_list.push({
        finished_list: this.finished_list,
        rejects_list: this.rejects_list,
        factory_id: "",
        storehouse_id: "",
        produce_no,
        style_id: id,
      });
    },
    confirm_shipment() {
      this.$confirm("提交出货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id, produce_no } = this.$route.query;
          this.shipment_list.map((v, i) => {
            v["produce_complete_size"] = [];
            v.finished_list.map((v1, i1) => {
              v1.t_color_size.map((v2, i2) => {
                if (v2.quantity == "") {
                  v2.quantity = 0;
                }
                v.produce_complete_size.push(v2);
              });
            });
            v.rejects_list.map((v1, i1) => {
              v1.t_color_size.map((v2, i2) => {
                if (v2.quantity == "") {
                  v2.quantity = 0;
                }
                v.produce_complete_size.push(v2);
              });
            });
          });
          let obj = {
            produce_no,
            style_id: id,
            produce_complete: this.shipment_list,
          };
          console.log(obj);
          let res = await produceCompleteAdd(obj);
          console.log(res);
          this.$message(res.data.msg);
          if (res.data.error_code == 0) {
            this.shipment_list = [];
            this.init();
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    get_rejects_quantity(item3, index) {
      this.shipment_list.map((v, i) => {
        if (index == i) {
          v.rejects_list.map((v1, i1) => {
            v1.t_color.map((v2, i2) => {
              v2["arr"] = [];
              v2["arr1"] = [];
              v1.t_color_size.map((v3, i3) => {
                if (v2.color == v3.style_color_name) {
                  v2.arr.push(v3);
                  v2.rejects_num = v2.arr.reduce((value, inde) => {
                    return value + Number(inde.quantity);
                  }, 0);
                }
                v2.arr1.push(Number(v3.quantity));
                v2.rejects_total_num = v2.arr1.reduce((value, inde) => {
                  return value + Number(inde);
                }, 0);
              });
            });
          });
        }
      });
    },
    get_finished_quantity(item3, index) {
      this.shipment_list.map((v, i) => {
        if (index == i) {
          v.finished_list.map((v1, i1) => {
            v1.t_color.map((v2, i2) => {
              v2["arr"] = [];
              v2["arr1"] = [];

              v1.t_color_size.map((v3, i3) => {
                if (v2.color == v3.style_color_name) {
                  v2.arr.push(v3);
                  console.log(v2.arr);
                  v2.finished_num = v2.arr.reduce((value, inde) => {
                    return value + Number(inde.quantity);
                  }, 0);
                }
                v2.arr1.push(Number(v3.quantity));
                v2.finished_total_num = v2.arr1.reduce((value, inde) => {
                  return value + Number(inde);
                }, 0);
              });
            });
          });
        }
      });
    },
    async add_init() {
      let { id, produce_no } = this.$route.query;
      this.finished_init();
      this.rejects_init();

      this.finished_list = [];
      this.rejects_list = [];
      this.shipment_list.push({
        finished_list: this.finished_list,
        rejects_list: this.rejects_list,
        factory_id: "",
        storehouse_id: "",
        produce_no,
        style_id: id,
      });
    },
    async finished_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      let t_size = [];
      let t_color = [];
      let t_color_size = [];
      res.data.data.map((v, i) => {
        v.produce_order_size.map((v1, i1) => {
          t_size.push(v1.size);
          t_size = [...new Set(t_size)];
          t_color.push(v1.style_color_name);
          t_color = [...new Set(t_color)];
        });
      });
      t_color = t_color.map((v, i) => {
        v = { color: v };
        v["finished_num"] = 0;
        v["finished_total_num"] = 0;
        return v;
      });
      t_size.map((v2, i2) => {
        t_color.map((v3, i3) => {
          t_color_size.push({
            size: v2,
            style_color_name: v3.color,
            quantity: "",
            isproduct: 1,
            produce_no,
            style_id: id,
          });
        });
      });
      this.finished_list.push({
        t_size,
        t_color,
        t_color_size,
        timer: Date.now(),
      });
    },
    async rejects_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      let t_size = [];
      let t_color = [];
      let t_color_size = [];
      res.data.data.map((v, i) => {
        v.produce_order_size.map((v1, i1) => {
          t_size.push(v1.size);
          t_size = [...new Set(t_size)];
          t_color.push(v1.style_color_name);
          t_color = [...new Set(t_color)];
        });
      });
      t_color = t_color.map((v, i) => {
        v = { color: v };

        v["rejects_num"] = 0;
        v["rejects_total_num"] = 0;
        return v;
      });
      t_size.map((v2, i2) => {
        t_color.map((v3, i3) => {
          t_color_size.push({
            size: v2,
            style_color_name: v3.color,
            quantity: "",
            isproduct: 0,
            produce_no,
            style_id: id,
          });
        });
      });
      this.rejects_list.push({
        t_size,
        t_color,
        t_color_size,
        timer: Date.now(),
      });
    },
    handleSize(val) {
      this.pageSize = val;
      this.ware_init();
    },
    handleCurrent(val) {
      this.pageIndex = val;
      this.ware_init();
    },
    async factory_init() {
      let { produce_no, id } = this.$route.query;
      let res = await produceFactoryOrderList({
        produce_no,
        style_id: id,
      });
      let res1 = await factoryList({
        page: 1,
        page_size: 999,
      });
      res.data.data.map((v, i) => {
        res1.data.data.map((v1, i1) => {
          if (v.factory_id == v1.id) {
            this.factory.push(v1);
          }
        });
      });
    },
    async ware_init() {
      let res = await storehouseList({
        page: this.pageIndex,
        page_size: this.pageSize,
        state: 1,
        storehouse_type: 1,
      });
      this.wares = res.data.data;
      this.total = res.data.data.count;
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
.sc_shipment {
  .add {
    .add_form {
      border-bottom: 1px dashed #000;
      display: flex;
      justify-content: space-between;
      .form_add {
        display: flex;
        justify-content: space-between;
        margin: 10px 0 10px 0;
        .form_data_add {
          .tit {
            display: flex;
            .color {
              width: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .size {
              width: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .con {
            .color_list {
              display: flex;
              .color {
                width: 100px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .color_size {
                width: 100px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
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
    .bom {
      margin: 10px 5px;
      display: flex;
      justify-content: space-between;
    }
  }
  .table {
    display: flex;
    justify-content: space-between;
    .table_form {
      flex: 1;
      .add_form {
        flex: 1;
        border-bottom: 1px dashed #000;
        .form_add {
          display: flex;
          justify-content: space-between;
          margin: 10px 0 10px 0;
          .form_data_add {
            .tit {
              display: flex;
              .color {
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .size {
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .con {
              .color_list {
                display: flex;
                .color {
                  width: 50px;
                  height: 50px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .color_size {
                  width: 50px;
                  height: 50px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
        .add_close {
          width: 50px;
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
        /deep/.el-form-item {
          margin-bottom: 0;
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
    }
  }
  .edit {
    .add_form {
      border-bottom: 1px dashed #000;
      display: flex;
      justify-content: space-between;
      .form_add {
        margin: 10px 0 10px 0;
        .form_data_add {
          .tit {
            display: flex;
            .color {
              width: 100px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .size {
              width: 100px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .con {
            .color_list {
              display: flex;
              .color {
                width: 100px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .color_size {
                width: 100px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
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
    .bom {
      margin: 10px 5px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>