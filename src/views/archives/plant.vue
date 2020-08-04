<template>
  <div class="distributor">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>档案库</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>物料工艺卡</el-breadcrumb-item> -->
      <el-breadcrumb-item>工厂</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左右侧边栏 -->
    <el-container>
      <el-aside style="width:inherit;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          :unique-opened="true"
          style="height:240px;width:11vw;"
        >
          <!-- <el-submenu :index="item.id+''" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <div
                style="display: flex;justify-content: space-between;align-items: center;margin-right:10px;"
                @mouseenter="mouseenter(index)"
                @mouseleave="mouseleave"
              >
                <span class="classname">{{item.mode_name}}</span>
                <span
                  class="el-icon-edit-outline"
                  :class="active===index?'block':'none'"
                  @click.stop="aa(item)"
                ></span>
              </div>
            </template>
            <el-menu-item
              v-for="(item1,index1) in item.class_data"
              :key="index1"
              @click="handleIten(item1)"
            >
              <div
                style="display: flex;justify-content: space-between;align-items: center;"
                @mouseenter="mouseenter1(index1)"
                @mouseleave="mouseleave1"
              >
                <span class="classname">{{item1.mode_name}}</span>
                <span
                  class="el-icon-edit-outline"
                  :class="active1===index1?'block':'none'"
                  @click.stop="aa1(item1)"
                ></span>
              </div>
            </el-menu-item>
            <el-menu-item @click="handelShow(level=1,item)">
              <template slot="title">
                <span class="el-icon-plus"></span>
                <span>新增工厂二级分类</span>
              </template>
            </el-menu-item>
          </el-submenu>-->
          <el-menu-item v-for="(item,index) in menuList" :key="index">
            <div
              @mouseenter="mouseenter(index)"
              @mouseleave="mouseleave"
              @click="clickMenu(item)"
              style="display: flex;justify-content: space-between;align-items: center;margin-right:10px;"
            >
              <span slot="title" style="color:#000;">{{item.mode_name}}</span>
              <span
                class="el-icon-edit-outline"
                :class="active===index?'block':'none'"
                @click.stop="aa(item)"
              ></span>
            </div>
          </el-menu-item>
          <el-menu-item index @click="handelShow(level=0)">
            <template slot="title">
              <span class="el-icon-plus"></span>
              <span>新增工厂方式</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右边 -->
      <div>
        <div class="form" style="margin:15px">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="工厂名称:">
              <el-input v-model="form.companyname" style="width:120px" placeholder="工厂名称"></el-input>
            </el-form-item>
            <el-form-item label="联系人:">
              <el-input v-model="form.contacts" style="width:120px" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="电话:">
              <el-input v-model="form.phone" style="width:125px" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="指派方式:">
              <el-select v-model="form.mode_id" clearable placeholder="请选择指派方式">
                <el-option
                  v-for="item in menuList"
                  :key="item.value"
                  :label="item.mode_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="addStyle" style="margin:0 0 10px 15px;">
          <el-button type="primary" @click="addClient">新增工厂</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          style=" width:960px;margin:5px;cursor: pointer;"
        >
          <el-table-column prop="factory_name" align="center" label="工厂名称"></el-table-column>
          <el-table-column prop="contacts" align="center" label="联系人"></el-table-column>
          <el-table-column prop="phone" align="center" label="电话"></el-table-column>
          <el-table-column prop="mode_name" align="center" label="指派方式"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <div @click="handleEdit1(scope.row)" class="check">查看</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </el-container>

    <!-- 弹出框1 -->
    <el-dialog title="新增工厂方式" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="value" placeholder="请输入工厂方式" style="width:300px"></el-input>
      <!-- <el-input v-if="level===1" v-model="value" placeholder="请输入工厂分类名称" style="width:300px"></el-input> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLevel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出框2 -->
    <el-dialog title="编辑工厂方式" :visible.sync="centerDialogVisible1" width="50%" center>
      <div>
        <el-input
          v-model="row_mode.mode_name"
          placeholder="分类名称"
          style="width:300px;padding:10px 10px"
        ></el-input>
      </div>
      <!-- <div v-if="edit_id===1">
        <el-input
          v-model="getMaterialsClassInfoObj.mode_name"
          placeholder="分类名称"
          style="width:300px;padding:10px 10px"
        ></el-input>
        <el-input
          v-model="getMaterialsClassInfoObj.sort"
          placeholder="排序"
          style="width:300px;padding:10px 10px"
        ></el-input>
        <el-input
          v-model="getMaterialsClassInfoObj.class_id_mode_name"
          placeholder="上级分类"
          style="width:300px;padding:10px 10px"
        ></el-input>
      </div>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDel">删除</el-button>
        <el-button type="primary" @click="handleEdit">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增工厂" :visible.sync="centerDialogVisible2" width="450px" center>
      <el-form
        ref="form1"
        :rules="rules1"
        :model="form1"
        class="demo-form-inline"
        label-width="90px"
      >
        <el-form-item prop="factory_name" label="工厂名称:">
          <el-input v-model="form1.factory_name" style="width:75%" placeholder="工厂名称关键字"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="联系人:">
          <el-input v-model="form1.contacts" style="width:75%" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话:">
          <el-input v-model="form1.phone" style="width:75%" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="mode_name" label="指派方式:">
          <el-select v-model="form1.mode_id" style="width:75%" multiple placeholder="请选择指派方式">
            <el-option
              v-for="item in menuList"
              :key="item.value"
              :label="item.mode_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:20px;">
          <el-button type="primary" @click="addfrot">确定</el-button>
          <el-button type="primary" @click="centerDialogVisible2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="工厂信息"
      :visible.sync="centerDialogVisible3"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="450px"
      center
    >
      <el-form
        ref="form2"
        :rules="rules2"
        :model="form2"
        class="demo-form-inline"
        label-width="90px"
      >
        <el-form-item prop="factory_name" label="工厂名称:">
          <el-input v-model="form2.factory_name" style="width:75%" placeholder="工厂名称关键字"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="联系人:">
          <el-input v-model="form2.contacts" style="width:75%" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话:">
          <el-input v-model="form2.phone" style="width:75%" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="mode_name" label="指派方式:">
          <el-select v-model="form2.mode_name" style="width:75%" multiple placeholder="请选择指派方式">
            <el-option
              v-for="item in menuList"
              :key="item.value"
              :label="item.mode_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:20px;">
          <el-button type="primary" @click="editadd">保存</el-button>
          <el-button type="primary" @click="deleteFactory">删除</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMaterialsClass,
  materialsClassAdd,
  getMaterialsClassInfo,
  getMaterialsClassEdit,
  materialsClassDel,
  factoryAdd, //新增工厂接口
  factoryEdit, //编辑工厂接口
  factoryDel, //删除工厂接口
  factoryList, //工厂list接口
  getFactoryModeSelect, //左边栏
  factoryModeAdd, //工厂加工方式
  factoryModeEdit, //工厂加工方式编辑接口
  factoryModeDel, //工厂加工方式删除接口
} from "@/api/archives";
export default {
  data() {
    return {
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      form: {},
      form1: {},
      form2: {},
      rules1: {
        factory_name: [
          { required: true, message: "请输入工厂名称", trigger: "blur" },
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        mode_id: [
          { required: true, message: "请选择指派方式", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            min: 11,
            max: 12,
            message: "请输入长度为 11-12 的电话号码",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        factory_name: [
          { required: true, message: "请输入工厂名称", trigger: "blur" },
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        mode_id: [
          { required: true, message: "请选择指派方式", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            min: 11,
            max: 12,
            message: "请输入长度为 11-12 的电话号码",
            trigger: "blur",
          },
        ],
      },
      tableData: [],
      menuList: [], //导航项
      itemList: {},
      centerDialogVisible: false,
      centerDialogVisible1: false,
      value: "",
      obj: {},
      item_id: {},
      id: 0,
      id_NO: 0,
      active: "",
      active1: "",
      level: "",
      edit_id: "",
      item: {},
      getMaterialsClassInfoObj: {},
      page: 1,
      page_size: 10,
      count: 0,
      TL: "",
      row_mode: {},
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(val)
      this.page_size = val;
      this.init(this.form);
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val;
      this.init(this.form);
    },
    // 编辑工厂指派方式保存
    async handleEdit() {
      let res = await factoryModeEdit({
        mode_name: this.row_mode.mode_name,
        id: this.row_mode.id,
      });
      // console.log(res);
      this.init();

      this.centerDialogVisible1 = false;
    },
    // 编辑工厂指派方式删除
    async handleDel() {
      this.$confirm("此操作将永久删除该指派方式, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await factoryModeDel({
            id: this.row_mode.id,
          });
          // console.log(res);
          this.init();
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
      this.centerDialogVisible1 = false;
    },
    // 编辑工厂方式
    async aa(item) {
      // console.log(item);
      this.row_mode = item;
      this.centerDialogVisible1 = true;
    },
    async aa1(item) {
      this.edit_id = item.level;
      this.item = item;
      let res = await getMaterialsClassInfo({ id: item.id });
      console.log(res);
      this.getMaterialsClassInfoObj = res.data.data;
      this.centerDialogVisible1 = true;
    },
    mouseenter1(index1) {
      this.active1 = index1;
    },
    mouseleave1() {
      this.active1 = "";
    },
    mouseenter(index) {
      this.active = index;
    },
    mouseleave() {
      this.active = "";
    },
    // 新增分类
    async addLevel() {
      let res = await factoryModeAdd({
        mode_name: this.value,
      });
      // console.log(res);
      this.value = "";
      this.init();
      this.centerDialogVisible = false;
    },
    handelShow(level, item_id) {
      this.level = level;
      console.log(this.level);
      this.item_id = item_id;
      this.centerDialogVisible = true;
    },
    handleIten(item1) {
      this.itemList = item1;
    },
    // 初始化
    async init(obj) {
      let res = await factoryList({
        page_size: this.page_size,
        page: this.page,
        ...obj,
      });
      let { data } = res.data;
      this.tableData = data;
      this.count = res.data.count;
      console.log(res);
      let res1 = await getFactoryModeSelect();
      this.menuList = res1.data.data;
      // console.log(res1);
    },
    // 点击查看
    handleEdit1(row) {
      this.form2 = row;
      console.log(row);
      let arr = row.mode_name.split(",");
      this.form2.mode_name = [];
      arr.map((v, i) => {
        this.menuList.map((j, k) => {
          if (v == j.mode_name) {
            this.form2.mode_name.push(j.id);
          }
        });
      });
      this.centerDialogVisible3 = true;
    },
    onSubmit() {
      // console.log(this.form);
      this.init(this.form);
    },
    // 点击menu
    clickMenu(item) {
      console.log(item);
      this.init(item);
    },
    // 新增工厂触发事件
    addClient() {
      this.centerDialogVisible2 = true;
      this.form1 = {};
    },

    // 新增工厂
    addfrot(item) {
      console.log(item);
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return;
        this.centerDialogVisible2 = false;
        let res = await factoryAdd({
          factory_name: this.form1.factory_name,
          contacts: this.form1.contacts,
          phone: this.form1.phone,
          mode_id: this.form1.mode_id,
        });
        console.log(res);
        this.init();
      });
    },
    // 编辑工厂
    editadd() {
      this.$refs["form2"].validate(async (valid) => {
        if (!valid) return;
        this.centerDialogVisible3 = false;
        // this.form2.mode_id = [];
        // this.form2.mode_name.map((v, i) => {
        //   if (typeof v != "number") {
        //     this.menuList.map((j, k) => {
        //       if (v == j.mode_name) {
        //         this.form2.mode_id.push(j.id);
        //       }
        //     });
        //   } else {
        //     this.form2.mode_id.push(v);
        //   }
        // });
        let res = await factoryEdit({
          factory_name: this.form2.factory_name,
          contacts: this.form2.contacts,
          phone: this.form2.phone,
          id: this.form2.id,
          mode_id: this.form2.mode_name,
        });
        console.log(res);
        this.init();
      });
    },
    // 删除工厂
    async deleteFactory() {
      this.centerDialogVisible3 = false;
      let res = await factoryDel({ id: this.form2.id });
      //   console.log(res);
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    itemList() {
      this.init();
    },
    $route() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.distributor {
  height: 100%;
  /deep/.el-container {
    height: 100%;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .block {
    display: block;
  }
  .none {
    display: none;
  }
  .classname {
    width: 100px;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .pagination {
    float: right;
  }
}
</style>