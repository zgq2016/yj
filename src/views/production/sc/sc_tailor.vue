<template>
  <div class="sc_tailor" v-if="permission.indexOf('tailor') != -1">
    <div class="add" v-if="active == 1">
      <div class="form_add" v-for="(item, index) in cut_order_add" :key="index">
        <div class="form_data_add">
          <div class="tit">
            <div class="color">颜色</div>
            <div v-for="(item1, index1) in item.t_size" :key="index1">
              <div class="size">{{ item1 }}</div>
            </div>
            <div class="color">数量</div>
            <div class="color">总数</div>
          </div>
          <div class="con">
            <div
              class="color_list"
              v-for="(item1, index1) in item.t_color"
              :key="index1"
            >
              <div class="color">{{ item1.color }}</div>
              <div v-for="(item2, index2) in item.t_color_size" :key="index2">
                <div v-if="item1.color == item2.color" class="color_size">
                  <el-input
                    v-model="item2.quantity"
                    placeholder="请输入"
                    @input="get_quantity(item2, index, index1, index2)"
                    style="width: 90px"
                  ></el-input>
                </div>
              </div>
              <div class="color">{{ item1.num }}</div>
              <div class="color" v-if="item.t_color.length - 1 == index1">
                {{ item1.total_num }}
              </div>
            </div>
          </div>
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              @click="get_img(index)"
              v-if="item.picurl"
              :src="item.picurl"
              class="avatar"
            />
            <i
              @click="get_img(index)"
              v-else
              class="el-icon-upload avatar-uploader-icon"
            ></i>
          </el-upload>
        </div>
        <div
          class="add_close"
          v-if="cut_order_add.length > 1"
          @click="add_close(item, index)"
        >
          删除
        </div>
      </div>
      <div class="bom">
        <el-button @click="add_Bed_time">增加床次</el-button>
        <el-button @click="Determine_the_cutting" >确定裁剪</el-button>
      </div>
    </div>
    <div v-if="active == 0">
      <div class="table" v-if="active_set == false">
        <div class="table_form">
          <div
            class="table_con"
            v-for="(item, index) in table_list"
            :key="index"
          >
            <div class="form_data_add">
              <div class="tit">
                <div class="color">颜色</div>
                <div v-for="(item1, index1) in item.t_size" :key="index1">
                  <div class="size">{{ item1 }}</div>
                </div>
                <div class="color">数量</div>
                <div class="color">总数</div>
              </div>
              <div class="con">
                <div
                  class="color_list"
                  v-for="(item1, index1) in item.t_color"
                  :key="index1"
                >
                  <div class="color">{{ item1.color }}</div>
                  <div
                    v-for="(item2, index2) in item.t_color_size"
                    :key="index2"
                  >
                    <div
                      v-if="item1.color == item2.style_color_name"
                      class="color_size"
                    >
                      {{ item2.quantity }}
                    </div>
                  </div>
                  <div class="color">{{ item1.num }}</div>
                  <div class="color" v-if="item.t_color.length - 1 == index1">
                    {{ item1.total_num }}
                  </div>
                </div>
              </div>
              <img :src="item.picurl" class="avatar" />
            </div>
            <!-- <div
              class="add_close"
              v-if="cut_order_add.length > 1"
              @click="add_close(item, index)"
            >
              删除
            </div> -->
          </div>
        </div>
        <div
          class="table_edit"
          @click="table_edit"
          v-if="permission.indexOf('produce_cut_order_edit') != -1"
        >
          修改
        </div>
      </div>
      <div class="edit" v-if="active_set == true">
        <div class="form_add" v-for="(item, index) in table_list" :key="index">
          <div class="form_data_add">
            <div class="tit">
              <div class="color">颜色</div>
              <div v-for="(item1, index1) in item.t_size" :key="index1">
                <div class="size">{{ item1 }}</div>
              </div>
              <div class="color">数量</div>
              <div class="color">总数</div>
            </div>
            <div class="con">
              <div
                class="color_list"
                v-for="(item1, index1) in item.t_color"
                :key="index1"
              >
                <div class="color">{{ item1.color }}</div>
                <div v-for="(item2, index2) in item.t_color_size" :key="index2">
                  <div
                    v-if="item1.color == item2.style_color_name"
                    class="color_size"
                  >
                    <el-input
                      v-model="item2.quantity"
                      placeholder="请输入"
                      @input="get_quantity_edit(item2, index, index1, index2)"
                      style="width: 90px"
                    ></el-input>
                  </div>
                </div>
                <div class="color">{{ item1.num }}</div>
                <div class="color" v-if="item.t_color.length - 1 == index1">
                  {{ item1.total_num }}
                </div>
              </div>
            </div>
            <el-upload
              class="avatar-uploader"
              :action="url + '/uploadpic.php'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img
                @click="get_img(index)"
                v-if="item.picurl"
                :src="item.picurl"
                class="avatar"
              />
              <i
                @click="get_img(index)"
                v-else
                class="el-icon-upload avatar-uploader-icon"
              ></i>
            </el-upload>
          </div>
          <div
            class="add_close"
            v-if="permission.indexOf('produce_cut_order_del') != -1"
            @click="edit_close(item, index)"
          >
            删除
          </div>
        </div>
        <div class="bom">
          <el-button @click="edit_Bed_time">增加床次</el-button>
          <el-button
            @click="Determine_the_cutting_edit"
            v-if="permission.indexOf('produce_cut_order_add') != -1"
            >确定裁剪</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  produceOrderInfo,
  produceCutOrderAdd, //新增裁剪信息
  produceCutOrderList, //显示裁剪信息
  produceCutOrderEdit, //编辑裁剪信息
  produceCutOrderDel, //删除裁剪信息
} from "@/api/production";
import { url } from "@/api/configuration";
export default {
  data() {
    return {
      url: url,
      cut_order_add: [],
      produce_tailor_order: [],
      table_list: [],
      img_index: "",
      active: 1,
      active_set: false,
      permission: [],
    };
  },
  mounted() {
    this.permission = localStorage.getItem("permission").split(",");
    this.init();
  },
  methods: {
    async table_edit() {
      this.active_set = true;
      let { id, produce_no } = this.$route.query;
      let res = await produceCutOrderList({
        produce_no,
        style_id: id,
      });
      let t_size = [];
      let t_color = [];
      let t_color_size = [];
      this.cut_order_add = [];
      console.log(res.data.data);
      res.data.data.map((v, i) => {
        v.t_size = [];
        v.t_color = [];
        v.t_color_size = [];
        t_color_size = v.produce_cut_order_size_data;
        v.produce_cut_order_size_data.map((v1, i1) => {
          // v1["quantity"] = v1.quantity || "";
          if (v1.quantity == 0) {
            v1["quantity"] = "";
          }
          v.t_size.push(v1.size);
          v.t_size = [...new Set(v.t_size)];
          v.t_color.push(v1.style_color_name);
          v.t_color = [...new Set(v.t_color)];
        });
        v.t_color_size = v.produce_cut_order_size_data;
        v.t_color = v.t_color.map((v, i) => {
          v = { color: v };
          v["num"] = 0;
          v["total_num"] = 0;
          return v;
        });
        v.t_color.map((v1, i1) => {
          v1["arr"] = [];
          v1["arr1"] = [];
          v.t_color_size.map((v2, i2) => {
            if (v1.color == v2.style_color_name) {
              v1.arr.push(v2);
              v1.num = v1.arr.reduce((value, inde) => {
                return value + Number(inde.quantity);
              }, 0);
            }
            v1.arr1.push(Number(v2.quantity));
            v1.total_num = v1.arr1.reduce((value, inde) => {
              return value + Number(inde);
            }, 0);
          });
        });
      });
      this.table_list = res.data.data;
      console.log(this.table_list);
    },
    async init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceCutOrderList({
        produce_no,
        style_id: id,
      });
      if (res.data.data.length == 0) {
        this.active = 1;
        this.add_init();
        return;
      }
      if (res.data.data.length > 0) {
        this.active = 0;
        this.active_set = false;
      }
      let t_size = [];
      let t_color = [];
      let t_color_size = [];
      this.cut_order_add = [];
      this.table_list = [];
      console.log(res.data.data);
      res.data.data.map((v, i) => {
        v.t_size = [];
        v.t_color = [];
        v.t_color_size = [];
        // t_color_size = v.produce_cut_order_size_data;
        v.produce_cut_order_size_data.map((v1, i1) => {
          v.t_size.push(v1.size);
          v.t_size = [...new Set(v.t_size)];
          v.t_color.push(v1.style_color_name);
          v.t_color = [...new Set(v.t_color)];
        });
        v.t_color_size = v.produce_cut_order_size_data;
        v.t_color = v.t_color.map((v, i) => {
          v = { color: v };
          v["num"] = 0;
          v["total_num"] = 0;
          return v;
        });
        v.t_color.map((v1, i1) => {
          v1["arr"] = [];
          v1["arr1"] = [];
          v.t_color_size.map((v2, i2) => {
            if (v1.color == v2.style_color_name) {
              v1.arr.push(v2);
              v1.num = v1.arr.reduce((value, inde) => {
                return value + Number(inde.quantity);
              }, 0);
            }
            v1.arr1.push(Number(v2.quantity));
            v1.total_num = v1.arr1.reduce((value, inde) => {
              return value + Number(inde);
            }, 0);
          });
        });
      });
      this.table_list = res.data.data;
      console.log(this.table_list);
    },
    Determine_the_cutting_edit() {
      this.$confirm("提交裁剪订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id, produce_no } = this.$route.query;
          this.table_list.map((v, i) => {
            v["id"] = v.id || 0;
            v["produce_cut_order_size"] = v.t_color_size;
            v["produce_no"] = produce_no;
            v["style_id"] = id;
            v.produce_cut_order_size.map((v1, i1) => {
              v1["id"] = v1.id || 0;
              v1["produce_no"] = produce_no;
              v1["style_id"] = id;
              v1["quantity"] = v1.quantity || 0;
            });
          });
          let obj = {
            produce_no,
            style_id: id,
            produce_cut_order: this.table_list,
          };
          console.log(obj);
          let res = await produceCutOrderEdit(obj);
          this.$message(res.data.msg);
          if (res.data.error_code == 0) {
            this.active_set = false;
            this.table_list = [];
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
    Determine_the_cutting() {
      this.$confirm("提交裁剪订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id, produce_no } = this.$route.query;
          this.cut_order_add.map((v, i) => {
            v["produce_cut_order_size"] = v.t_color_size;
            v["produce_no"] = produce_no;
            v["style_id"] = id;
            v.produce_cut_order_size.map((v1, i1) => {
              v1["produce_no"] = produce_no;
              v1["style_id"] = id;
              v1["quantity"] = v1.quantity || 0;
              v1["style_color_name"] = v1.color;
            });
          });
          let obj = {
            produce_no,
            style_id: id,
            produce_cut_order: this.cut_order_add,
          };
          let res = await produceCutOrderAdd(obj);
          this.$message(res.data.msg);
          if (res.data.error_code == 0) {
            this.active_set = false;
            this.cut_order_add = [];
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
    get_img(index) {
      this.img_index = index;
    },
    handleAvatarSuccess(res, file) {
      this.cut_order_add[this.img_index].picurl = res.data.pic_file_url;
    },
    handleAvatarSuccess1(res, file) {
      this.table_list[this.img_index].picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async edit_Bed_time() {
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
        v["num"] = 0;
        v["total_num"] = 0;
        return v;
      });
      t_size.map((v2, i2) => {
        t_color.map((v3, i3) => {
          t_color_size.push({
            size: v2,
            style_color_name: v3.color,
            quantity: "",
          });
        });
      });
      this.table_list.push({
        picurl: "",
        t_size: t_size,
        t_color: t_color,
        t_color_size: t_color_size,
      });
    },
    async add_Bed_time() {
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
        v["num"] = 0;
        v["total_num"] = 0;
        return v;
      });
      t_size.map((v2, i2) => {
        t_color.map((v3, i3) => {
          t_color_size.push({
            size: v2,
            color: v3.color,
            quantity: "",
          });
        });
      });
      this.cut_order_add.push({
        picurl: "",
        t_size: t_size,
        t_color: t_color,
        t_color_size: t_color_size,
      });
    },
    add_close(item, index) {
      this.cut_order_add.splice(index, 1);
    },
    async edit_close(item, index) {
      this.table_list.splice(index, 1);
      let res = await produceCutOrderDel({ id: item.id });
      if (this.table_list.length == 0) {
        this.init();
      }
    },
    get_quantity_edit(item2, index, index1, index2) {
      this.table_list.map((v, i) => {
        if (index == i) {
          v.t_color.map((v1, i1) => {
            v1["arr"] = [];
            v1["arr1"] = [];
            v.t_color_size.map((v2, i2) => {
              if (v1.color == v2.style_color_name) {
                v1.arr.push(v2);
                v1.num = v1.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v1.arr1.push(Number(v2.quantity));
              v1.total_num = v1.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        }
      });
    },
    get_quantity(item2, index, index1, index2) {
      this.cut_order_add.map((v, i) => {
        if (index == i) {
          v.t_color.map((v1, i1) => {
            v1["arr"] = [];
            v1["arr1"] = [];
            v.t_color_size.map((v2, i2) => {
              if (v1.color == v2.color) {
                v1.arr.push(v2);
                v1.num = v1.arr.reduce((value, inde) => {
                  return value + Number(inde.quantity);
                }, 0);
              }
              v1.arr1.push(Number(v2.quantity));
              v1.total_num = v1.arr1.reduce((value, inde) => {
                return value + Number(inde);
              }, 0);
            });
          });
        }
      });
    },
    async add_init() {
      let { id, produce_no } = this.$route.query;
      let res = await produceOrderInfo({
        style_id: id,
        produce_no,
      });
      let t_size = [];
      let t_color = [];
      let t_color_size = [];
      this.cut_order_add = [];
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
        v["num"] = 0;
        v["total_num"] = 0;
        return v;
      });
      t_size.map((v2, i2) => {
        t_color.map((v3, i3) => {
          t_color_size.push({
            size: v2,
            color: v3.color,
            quantity: "",
          });
        });
      });
      this.cut_order_add.push({
        picurl: "",
        t_size: t_size,
        t_color: t_color,
        t_color_size: t_color_size,
      });
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
.sc_tailor {
  .add {
    .form_add {
      display: flex;
      justify-content: space-between;
      margin: 10px;
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
        .img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin: 10px;
          background-color: #ccc;
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
      border-bottom: 1px dashed #000;
    }
    .bom {
      margin: 10px 5px;
      display: flex;
      justify-content: space-between;
    }
  }
  .edit {
    .form_add {
      display: flex;
      justify-content: space-between;
      margin: 10px;
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
        .img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin: 10px;
          background-color: #ccc;
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
      border-bottom: 1px dashed #000;
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
    margin: 20px 0;
    .table_form {
      flex: 1;
      .table_con {
        border-bottom: 1px dashed #000;
        .form_data_add {
          margin: 10px;
          .tit {
            display: flex;
            .color {
              width: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .size {
              width: 50px;
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
          .img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            margin: 10px;
            background-color: #ccc;
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
    }
  }
}
</style>