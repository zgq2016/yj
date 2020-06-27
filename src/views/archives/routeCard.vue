<template>
  <div class="distributor">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>档案库</el-breadcrumb-item>
      <el-breadcrumb-item>物料工艺卡</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左右侧边栏 -->
    <el-container>
      <el-aside style="width:inherit;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          :unique-opened="true"
          style="height:80vh;width:11vw;"
        >
          <el-submenu :index="item.id+''" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <div
                style="display: flex;justify-content: space-between;align-items: center;margin-right:10px;"
                @mouseenter="mouseenter(index)"
                @mouseleave="mouseleave"
              >
                <span class="classname">{{item.classname}}</span>
                <span
                  class="el-icon-edit-outline"
                  :class="active===index?'block':'none'"
                  @click.stop="aa(item)"
                ></span>
              </div>
            </template>
            <el-menu-item
              index="/routeCard_list"
              v-for="(item1,index1) in item.class_data"
              :key="index1"
              @click="handleIten(item1)"
            >
              <div
                style="display: flex;justify-content: space-between;align-items: center;"
                @mouseenter="mouseenter1(index1)"
                @mouseleave="mouseleave1"
              >
                <span class="classname">{{item1.classname}}</span>
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
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index @click="handelShow(level=0)">
            <span slot="title" class="el-icon-plus"></span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :data="itemList"></router-view>
      </el-main>
    </el-container>
    <!-- 弹出框1 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="50%" center>
      <el-input v-if="level===0" v-model="value" placeholder="添加level0" style="width:300px"></el-input>
      <el-input v-if="level===1" v-model="value" placeholder="添加level1" style="width:300px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLevel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出框2 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible1" width="50%" center>
      <div v-if="edit_id===0">
        <el-input
          v-model="getMaterialsClassInfoObj.classname"
          placeholder="分类名称"
          style="width:300px;padding:10px 10px"
        ></el-input>
        <el-input
          v-model="getMaterialsClassInfoObj.sort"
          placeholder="排序"
          style="width:300px;padding:10px 10px"
        ></el-input>
      </div>
      <div v-if="edit_id===1">
        <el-input
          v-model="getMaterialsClassInfoObj.classname"
          placeholder="分类名称"
          style="width:300px;padding:10px 10px"
        ></el-input>
        <el-input
          v-model="getMaterialsClassInfoObj.sort"
          placeholder="排序"
          style="width:300px;padding:10px 10px"
        ></el-input>
        <el-input
          v-model="getMaterialsClassInfoObj.class_id_classname"
          placeholder="上级分类"
          style="width:300px;padding:10px 10px"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDel">删除</el-button>
        <el-button type="primary" @click="handleEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMaterialsClass,
  materialsClassAdd,
  getMaterialsClassInfo,
  getMaterialsClassEdit,
  materialsClassDel
} from "@/api/archives";
export default {
  data() {
    return {
      menuList: [], //导航项
      itemList: {},
      centerDialogVisible: false,
      centerDialogVisible1: false,
      value: "",
      obj: {},
      item_id: {},
      id: 5,
      active: "",
      active1: "",
      level: "",
      edit_id: "",
      item: {},
      getMaterialsClassInfoObj: {}
    };
  },
  methods: {
    async handleEdit() {
      let obj = this.getMaterialsClassInfoObj;
      console.log(obj);
      delete obj["class_data"];
      delete obj["level"];
      delete obj["class_id_classname"];
      let res = await getMaterialsClassEdit(obj);
      console.log(res);
      this.init();
      this.centerDialogVisible1 = false;
    },
    async handleDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await materialsClassDel({ id: this.item.id });
          this.init();
          this.$router.push({ path: "/routeCard_list" });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      this.centerDialogVisible1 = false;
    },
    async aa(item) {
      this.edit_id = item.level;
      this.item = item;
      let res = await getMaterialsClassInfo({ id: item.id });
      console.log(res);
      this.getMaterialsClassInfoObj = res.data.data;
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
    async addLevel() {
      let obj = this.obj;
      if (this.level === 0) {
        let class_id = 0;
        obj["class_id"] = class_id;
        obj["level"] = this.level;
        obj["classname"] = this.value;
      }
      if (this.level === 1) {
        let item_id = this.item_id;
        console.log(item_id);
        obj["class_id"] = item_id.id;
        obj["level"] = this.level;
        obj["classname"] = this.value;
      }
      let res = await materialsClassAdd(obj);
      console.log(res);
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
    async init() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.menuList = data;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    itemList() {
      this.init();
    }
  }
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
}
</style>