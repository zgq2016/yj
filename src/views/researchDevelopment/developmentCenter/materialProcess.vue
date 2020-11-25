<template>
  <div class="materialProcess">
    <div class="main">
      <!-- 增加款式颜色 -->
      <div
        style="display: flex"
        v-if="permission.indexOf('get_style_materials_list') != -1"
      >
        <div v-if="style_color_data_length == 0" class="color_num">
          <div class="color_num">
            <div
              class="backg"
              @click="addKindColor"
              v-if="permission.indexOf('project_style_color_add') != -1"
            >
              <div class="color">增加颜色</div>
            </div>
          </div>
        </div>
        <div v-if="style_color_data_length > 0" class="color_num">
          <div
            class="color_num"
            v-for="(item, index) in obj.style_color_data"
            :key="index"
          >
            <div
              @click="handleColorNum(item, index)"
              :class="active === index ? 'active' : ''"
              class="backg"
            >
              <div class="color">{{ item.style_color_name }}</div>
              <div
                v-if="permission.indexOf('project_style_color_del') != -1"
                class="el-icon-close"
                @click.stop="styleColorDel(item)"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="addColor el-icon-plus"
          @click="addKindColor"
          v-if="
            permission.indexOf('project_style_color_add') != -1 &&
            style_color_data_length > 0
          "
        ></div>
        <!--  -->
        <el-select
          class="cardBtn"
          v-if="permission.indexOf('project_style_materials_add') != -1"
          v-model="value"
          placeholder="增加物料工艺卡"
          @change="handleMaterialsCard"
        >
          <el-option
            v-for="item in cardList"
            :key="item.id"
            :label="item.materialsCard"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <!-- 数据 -->
      <div
        v-if="
          style_color_data_length !== 0 &&
          permission.indexOf('get_style_materials_list') != -1
        "
        class="clearfix"
      >
        <div class="cardList">
          <div v-for="(item1, index1) in card" :key="index1">
            <div v-if="item1.style_materials_data.length != 0">
              <div
                class="cards"
                v-for="(item2, index2) in item1.style_materials_data"
                :key="index2"
                style="margin-right: 20px"
              >
                <!-- v-if="item.materials===item1.mainclass" -->
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

                          <div
                            v-if="
                              permission.indexOf(
                                'project_style_materials_del'
                              ) != -1
                            "
                            class="el-icon-close"
                            style="cursor: pointer"
                            @click.stop="handleStyleMaterialsDel(item2)"
                          ></div>
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
                          v-if="item2.id === popoverId2"
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
      <div class="del_purchase_note" v-if="card.length > 0">
        <el-checkbox
          class="checkbox"
          v-model="isAllCheck"
          @change="handleAllCheck"
          >全选</el-checkbox
        >
        <el-button
          size="mini"
          round
          @click="purchaseOrder"
          v-if="permission.indexOf('style_purchase_add') != -1"
          >生成采购单</el-button
        >
        <!-- &&this.obj.materials_status!=2&&this.obj.design_status==5 -->
        <el-button
          size="mini"
          round
          disabled
          v-if="this.obj.materials_status == 2"
          >采购单审核中</el-button
        >
      </div>
      <!-- 删除历史 -->
      <div class="del_history">
        <div class="operation">
          <div>删除历史</div>
        </div>
        <div v-for="(item, index) in delListData" :key="index">
          <div
            class="cardStyle"
            v-for="(item1, index1) in item.style_materials_data"
            :key="index1"
          >
            <div class="cardStyle_left">
              <div class="cardStyle_left_img">
                <img :src="item1.picurl" alt />
              </div>

              <div class="cardStyle_left_content">
                <div class="name">
                  {{ item1.materials_data.materialsname || "已删除" }}
                </div>
                <div>内部编号: {{ item1.materials_data.materialsno }}</div>
                <div v-if="item1.style_materials_supplier_data.length > 0">
                  {{ item1.style_materials_supplier_data[0].companyname }}
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
                {{ item1.color }}
                <div class="cardStyle_right_no">{{ item1.color_no }}</div>
              </div>
              <div
                class="restore"
                @click="handleRestore(item1)"
                v-if="permission.indexOf('project_style_materials_hfdel') != -1"
              >
                还原
              </div>
            </div>
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
      <el-cascader
        v-model="designColor"
        :options="options"
        :props="optionProps"
        :show-all-levels="false"
        @change="handleChange"
      ></el-cascader>
      <div
        style="position: relative"
        v-if="
          style_color_data_length !== 0 &&
          permission.indexOf('get_style_materials_list') != -1
        "
      >
        <div class="cardList">
          <div v-for="(item1, index1) in card" :key="index1">
            <div v-if="item1.style_materials_data.length != 0">
              <div
                class="cards"
                v-for="(item2, index2) in item1.style_materials_data"
                :key="index2"
                style="margin-right: 20px"
              >
                <span class="bos">{{
                  item2.materials_mainclass_name.slice(0, 1)
                }}</span>
                <!-- v-if="item.materials===item1.mainclass" -->
                <div class="card" style="margin: 10px 0">
                  <div class="cardStyle">
                    <div class="cardStyle_left">
                      <div class="cardStyle_left_img">
                        <img :src="item2.picurl" alt />
                      </div>
                      <div class="cardStyle_left_content">
                        <div class="cardStyle_left_content_name">
                          <div>
                            {{ item2.materials_data.materialsname || "已删除" }}
                          </div>

                          <div
                            v-if="
                              permission.indexOf(
                                'project_style_materials_del'
                              ) != -1
                            "
                            class="el-icon-close"
                            style="cursor: pointer"
                            @click.stop="handleStyleMaterialsDel(item2)"
                          ></div>
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
                    <div class="cardStyle_right" @mouseleave="visible1 = false">
                      <div
                        style="cursor: pointer"
                        @click.stop="handlePopoverId1(item2)"
                      >
                        <el-popover
                          placement="right"
                          v-model="visible1"
                          v-if="item2.id === popoverId1"
                        >
                          <div class="colourNumberList">
                            <div
                              class="colourNumber"
                              @click.stop="handleColourNumber1(item2, item3)"
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
                        v-model="item2.isCheckList"
                        @change="isCheckListBox(item2, item1)"
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
        <el-button @click="addDesignColor">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增物料 -->
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
          to="/addRouteCard"
          style="margin-left: 30px"
          v-if="permission.indexOf('materials_add') != -1"
          target="_blank"
          >新增主料卡</router-link
        >
        <el-select
          class="cardBtn"
          style="margin-left: 30px"
          v-model="Cardvalue"
          placeholder="物料工艺卡"
          @change="handleCardvalue"
        >
          <el-option
            v-for="item in cardList"
            :key="item.id"
            :label="item.materials"
            :value="item.id"
          ></el-option>
        </el-select>
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
                  {{ item.materialsname || "" }}
                </div>
                <div>内部编号:{{ item.materialsno }}</div>
                <div v-if="item.supplier_data.length > 0">
                  {{ item.supplier_data[0].supplier_companyname }}
                </div>
                <div>
                  {{ item.materials_mainclass_name }}
                  <em v-if="item.materials_class_name"
                    >({{ item.materials_class_name }})</em
                  >
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
                      <div>
                        <div>{{ item1.color }}</div>
                        <div class="cardStyle_right_no">
                          {{ item1.color_no }}
                        </div>
                      </div>
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
      <!-- 分页 -->
      <el-pagination
        v-if="total !== 0"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[9, 18, 27, 36]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {
  getStyle,
  projectStyleColorDel,
  projectStyleColorAdd,
  getStyleMaterialsList,
  getMaterialsList,
  projectStyleMaterialsAdd,
  getStyleMaterialsDellist,
  projectStyleMaterialsHfdel,
  materialsProcureAdd,
  projectStyleMaterialsDel,
  styleMaterialsListColorEdit,
  projectStyleMaterialsListAdd,
  stylePurchaseAdd,
  getColorSelect,
} from "@/api/researchDevelopment";
import {
  getMaterialsInfo, //物料
  getSupplierInfo, //供应商
} from "@/api/archives";
export default {
  data() {
    return {
      permission: [],
      optionProps: {
        value: "color_name",
        label: "color_name",
        children: "children",
      },
      designColor: "",
      obj: {},
      centerDialogVisible: false, //增加款式颜色
      centerDialogVisible1: false, //增加款式颜色
      value: "",
      cardList: [
        {
          materialsCard: "主料卡",
          materials: "主料",
          id: 3,
        },
        {
          materialsCard: "里料卡",
          materials: "里料",
          id: 4,
        },
        {
          materialsCard: "辅料卡",
          materials: "辅料",
          id: 5,
        },
        {
          materialsCard: "工艺卡",
          materials: "工艺",
          id: 6,
        },
      ], //首页大数据
      card: [], //首页数据
      searchCard: [], //搜索数据
      visible: false,
      visible1: false,
      visible2: false,
      colourNumberId: "",
      isCheckList: [], //复选框数组
      searchInput: "", //搜索值
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      MaterialsList: [], //物料数组
      style_color_data_length: "", //样式颜色数据长度
      popoverId: "", //弹出框id
      popoverId1: "", //弹出框id1
      popoverId2: "", //弹出框id1
      style_id: "", //样式ID
      style_color_name: "", //样式颜色id
      materials: "", //物料
      materials_color_id: "", //物料颜色id
      materials_color_id1: "", //物料颜色id
      materials_color_id2: "", //物料颜色id
      isCheckListBoxEvent: {},
      delListData: [],
      active: 0,
      options: [],
      activeItem: {},

      isAllCheck: false,
      checkNum: 0,
      card_length: 0,
      isCheckList1: [], //复选框数组1

      Cardvalue: "",
      active_index: 0,
      color_name_id: "",
    };
  },
  methods: {
    Add_color_no(item) {
      console.log(item);
      this.$router.push({
        path: `/editrouteCard?id=${item.materials_id}&back=1`,
      });
    },
    handleCardvalue(e) {
      console.log(e);
      this.Cardvalue = e;
      this.handleMaterialsCard();
    },
    go_routeCardDeital(e) {
      console.log(e);
      this.$router.push({ path: `/routeCardDeital?id=${e.materials_id}` });
    },
    handleChange() {
      this.designColor = this.designColor.pop();
    },

    async handleRestore(item1) {
      let res = await projectStyleMaterialsHfdel({ id: item1.id });
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      } else {
        this.init();
        this.delListInit();
      }
    },
    async addKindColor() {
      this.centerDialogVisible = true;
      // 列表数据
      if (this.obj.style_color_data.length > 0) {
        this.style_id = this.obj.style_color_data[0].style_id;
        this.style_color_name = this.obj.style_color_data[0].style_color_name;
        let res1 = await getStyleMaterialsList({
          style_id: this.style_id,
          style_color_name: this.style_color_name,
        });
        res1.data.data.forEach((v, i) => {
          v.style_materials_data.forEach((v, i) => {
            v["isCheckList"] = false;
          });
        });
        let { data } = res1.data;

        this.searchCard = data;
        console.log(this.searchCard);
        this.style_color_data_length = this.obj.style_color_data.length;
        this.designColor = "";
        this.isCheckList = [];
      }
    },
    async handleStyleMaterialsDel(item) {
      this.$confirm("此操作将永久删除该物料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await projectStyleMaterialsDel({ id: item.id });
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.active = 0;
            this.init();
            this.delListInit();
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
    async addMaterialsList(item) {
      console.log(item);
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let style_id =
          this.activeItem.style_id || this.obj.style_color_data[0].style_id;
        let style_color_name =
          this.activeItem.style_color_name ||
          this.obj.style_color_data[0].style_color_name;
        let mainclass = item.materials_mainclass_name;
        let materials_id = item.id;
        let materials_color_id =
          this.materials_color_id || item.materials_color_data[0].id;
        let res = await projectStyleMaterialsAdd({
          style_id,
          style_color_name,
          mainclass,
          materials_id,
          materials_color_id,
        });
        console.log(res);
        if (res.data.error_code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        } else {
          this.init();
          let style_id = this.$route.query.id;
          let e = {
            style_id: style_id,
            style_color_name: this.color_name_id,
          };
          console.log(e);
          let index = this.active;
          this.active_index = 1;
          this.handleColorNum(e, index);

          this.centerDialogVisible1 = false;
        }
      });
    },
    handleColourNumber(item, item1) {
      this.materials_color_id = item1.id;
      item["color"] = item1.color;
      item["color_no"] = item1.color_no;
      item.picurl = item1.picurl;
      this.visible = false;
    },
    handleColourNumber1(item2, item3) {
      this.materials_color_id1 = item3.id;
      item2["color"] = item3.color;
      item2["color_no"] = item3.color_no;
      this.visible1 = false;
    },
    async handleColourNumber2(item2, item3) {
      this.materials_color_id2 = item3.id;
      item2["color"] = item3.color;
      item2["color_no"] = item3.color_no;
      let res = await styleMaterialsListColorEdit({
        id: item2.id,
        materials_color_id: item3.id,
      });
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      } else {
        this.visible2 = false;
      }
    },
    handlePopoverId(item) {
      this.popoverId = item.id;
      this.visible = true;
    },
    handlePopoverId1(item) {
      this.popoverId1 = item.id;
      this.visible1 = true;
    },
    handlePopoverId2(item) {
      this.popoverId2 = item.id;
      this.visible2 = true;
    },
    async handleSearchInput() {
      let res = await getMaterialsList({
        class_id: this.Cardvalue,
        keyword: this.searchInput,
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
      this.MaterialsList.map((v, i) => {
        v.picurl = v.materials_color_data[0].picurl;
      });
      this.total = count;
    },
    async handleMaterialsCard(item) {
      console.log(item);
      if (item != undefined) {
        this.Cardvalue = item;
      }
      this.searchInput = "";
      this.value = "";
      this.materials = item;
      this.centerDialogVisible1 = true;
      let res = await getMaterialsList({
        class_id: this.Cardvalue,
        keyword: "",
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      this.MaterialsList = data;
      this.MaterialsList.map((v, i) => {
        v.picurl = v.materials_color_data[0].picurl;
      });

      this.total = count;
    },
    async styleColorDel(item) {
      this.$confirm("此操作将永久删除该颜色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res = await projectStyleColorDel({
            style_id: id,
            style_color_name: item.style_color_name,
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
    //增加物料颜色
    async addDesignColor() {
      if (this.designColor === "") {
        this.$message({
          showClose: true,
          message: "请选择颜色",
          type: "error",
        });
      } else {
        let { id } = this.$route.query;
        if (this.isCheckListBoxEvent.isCheckList !== true) {
          let res = await projectStyleColorAdd({
            style_id: id,
            style_color_name: this.designColor,
          });
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.init();
            this.centerDialogVisible = false;
            this.designColor = "";
            let e = {
              style_id: id,
              style_color_name: this.designColor,
            };
            let index = this.obj.style_color_data.length - 0;
            this.active_index = 1;
            this.handleColorNum(e, index);
          }
        }
        if (this.isCheckListBoxEvent.isCheckList === true) {
          let obj = {};
          obj["style_id"] = id;
          obj["style_color_name"] = this.designColor;
          obj["style_materials_list_data"] = this.isCheckList;

          let res = await projectStyleMaterialsListAdd(obj);
          console.log(res);
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.init();
            // this.active = 0;
            this.centerDialogVisible = false;
            let e = {
              style_id: id,
              style_color_name: this.designColor,
            };
            let index = this.obj.style_color_data.length - 0;
            this.active = index;
            this.activeItem = e;
            let res1 = await getStyleMaterialsList({
              style_id: e.style_id,
              style_color_name: e.style_color_name,
            });

            if (res1.data.data.length != 0) {
              res.data.data.forEach((v, i) => {
                v.style_materials_data.forEach((v1, i1) => {
                  v1["isCheckList1"] = false;
                  v1["isCheckList"] = false;
                });
              });
            }

            this.card = res1.data.data;

            console.log(this.card);
            this.handleAllCheck(false);
            this.active_index = 1;
          }
        }
      }
    },
    isCheckListBox(e, e1) {
      console.log(e, e1);
      this.isCheckListBoxEvent = e;
      if (e.isCheckList === true) {
        this.isCheckList.push({
          mainclass: e1.mainclass,
          id: e.id,
          materials_color_id: this.materials_color_id1 || e.style_color_id,
          materials_id: e.materials_id,
        });
      }
      if (e.isCheckList === false) {
        this.isCheckList.map((v, i) => {
          if (e.id === v.id) {
            this.isCheckList.splice(i, 1);
          }
        });
      }
    },
    handleAllCheck(e) {
      this.isAllCheck = e;
      this.card.map((v, i) => {
        v.style_materials_data.map((v1, i1) => {
          v1["isCheckList1"] = this.isAllCheck;
          if (this.isAllCheck === false) this.checkNum = 0;
          if (this.isAllCheck === false) this.checkNum = this.card.length;
        });
      });
    },
    // 选择的物料准备采购
    isCheckListBox1(e) {
      let arr = [];
      this.card.map((v, i) => {
        v.style_materials_data.map((v1, i1) => {
          if (v1.id === e.id) {
            v.isCheckList1 = !v.isCheckList1;
            v1.isCheckList1 ? this.checkNum++ : this.checkNum--;
          }
          arr.push({ id: v1.id });
        });
      });

      this.card_length = arr.length;
      this.card_length == this.checkNum
        ? this.handleAllCheck(true)
        : (this.isAllCheck = false);
    },
    // 切换颜色
    async handleColorNum(item, index) {
      this.color_name_id = item.style_color_name;
      this.active = index;
      console.log(item);
      this.activeItem = item;
      let res = await getStyleMaterialsList({
        style_id: item.style_id,
        style_color_name: item.style_color_name,
      });

      console.log(res);
      if (res.data.data.length !== 0) {
        res.data.data.forEach((v, i) => {
          v.style_materials_data.forEach((v1, i1) => {
            v1["isCheckList1"] = false;
            v1["isCheckList"] = false;
          });
        });
      }

      this.card = res.data.data;

      this.handleAllCheck(false);
    },
    colourNumber(item2) {
      this.colourNumberId = item2.id;
      this.visible = true;
    },
    // 生成采购单
    async purchaseOrder() {
      let { id } = this.$route.query;
      let style_materials_list_id_data = [];
      this.card.map((v, i) => {
        v.style_materials_data.map((v1, i1) => {
          if (v1.isCheckList1 === true) {
            style_materials_list_id_data.push({
              id: v1.id,
            });
          }
        });
      });
      if (style_materials_list_id_data.length === 0) {
        this.$message("请选择物料");
      } else {
        this.$confirm("确认生成采购单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let res = await stylePurchaseAdd({
            style_id: id,
            style_materials_list_id_data,
          });
          console.log(res);
          if (res.data.error_code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.$router.push({ path: `/materialPurchasing?id=${id}` });
            this.init();
          }
        });
      }
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      console.log(res);
      this.obj = res.data.data;
      this.style_color_data_length = res.data.data.style_color_data.length;
      if (this.style_color_data_length > 0) {
        this.color_name_id = this.obj.style_color_data[0].style_color_name;
        this.card_init();
      }
      let res2 = await getColorSelect();
      this.options = res2.data.data;
    },
    async card_init() {
      console.log(this.obj.style_color_data[0]);
      let res1 = await getStyleMaterialsList({
        style_id: this.obj.style_color_data[0].style_id,
        style_color_name: this.obj.style_color_data[0].style_color_name,
      });
      res1.data.data.forEach((v, i) => {
        v.style_materials_data.forEach((v1, i1) => {
          v1["isCheckList"] = false;
          v1["isCheckList1"] = false;
        });
      });

      let { data } = res1.data;
      this.card = data;
      this.active_index = 0;
    },
    async delListInit() {
      let { id } = this.$route.query;
      let res = await getStyleMaterialsDellist({ style_id: id });
      let { data } = res.data;
      this.delListData = data;
      console.log(this.delListData);
      // if (this.delListData[0].style_materials_data.length > 0) {
      //   this.delListData[0].style_materials_data.map(async (f, j) => {
      //     let ress = await getMaterialsInfo({
      //       id: f.materials_id,
      //     });
      //     let data1 = ress.data.data;

      //     f["materialsno"] = data1.materialsno;
      //     f["companyname"] =
      //       data1.materials_supplier_data[0].supplier_companyname;
      //   });
      // }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearchInput();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.handleSearchInput();
    },
  },
  mounted() {
    this.init();
    this.delListInit();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.materialProcess {
  .main {
    .color_num {
      display: flex;
      // margin-left: 20px;
      font-size: 14px;
      cursor: pointer;
      .color {
        margin-right: 10px;
      }
    }
    .addColor {
      cursor: pointer;
      font-size: 18px;
      // line-height: 30px;
      margin-left: 20px;
      background: #cccccc !important;
      border-radius: 50%;
      padding: 5px;
      color: #ffffff;
    }
    /deep/.el-input {
      width: 130px !important;
      height: 40px;
      line-height: 40px;
      margin-bottom: 5px;
    }
    /deep/.el-input__inner {
      width: 100%;
      height: 30px;
      background-color: #000;
      border-radius: 15px;
      border: none;

      font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
        \\5b8b\4f53, sans-serif;
      color: #ffffff;
    }
    /deep/input::-webkit-input-placeholder {
      text-align: center;
    }
    /deep/input::-moz-input-placeholder {
      text-align: center;
    }
    /deep/input::-ms-input-placeholder {
      text-align: center;
    }
    .cardBtn {
      margin-left: auto;
      height: 30px;
      width: 130px;
    }
    .cardList {
      margin: 30px 0;
      width: 80vw;
      .cards {
        float: left;
        .card {
          .cardStyle {
            width: 320px;
            height: 100px;
            display: flex;
            cursor: pointer;
            .cardStyle_left {
              width: 300px;
              display: flex;
              background-color: #f2f2f2;
              border-radius: 10px;
              overflow: hidden;
              .cardStyle_left_img {
                position: relative;
                img {
                  width: 100px;
                  height: 100px;
                }
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
                  font-size: 12px;
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
    .del_purchase_note {
      padding: 30px 0;
      text-align: right;
      border-bottom: 1px solid #dcdfe6;
      .checkbox {
        margin-right: 50px;
      }
    }
    .del_history {
      .operation {
        padding: 20px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cardStyle {
        width: 320px;
        height: 100px;
        display: flex;
        margin: 10px 0;
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
            div {
              margin: 5px;
            }
            .cardStyle_left_content_name {
              font-weight: 600;
              font-size: 14px;
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
          .restore {
            cursor: pointer;
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
  .dialog1 {
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
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 0;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      color: #000;
    }
  }
  .cardStyle_right_no {
    width: 36px;
    font-size: 12px;
    text-justify: newspaper;
    word-break: break-all;
    text-align: justify;
  }
  .Add_color_no {
    width: 124px;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>