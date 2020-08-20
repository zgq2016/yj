<template>
  <div class="colorManagement">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>加工分类与价格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加工厂 -->
    <div class="addClassify" @click="addClassify">添加类型</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      border
      row-key="Factory_id"
      :tree-props="{children: 'children' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="mode_name" label="加工类型"></el-table-column>
      <el-table-column prop="price" label="加工价格"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" class="el-icon-edit btn">
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" class="el-icon-delete btn">
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 工厂分类 -->
    <el-dialog
      title="工厂分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="工厂名称"
          prop="mode_name"
          :rules="[ { required: true, message: '请输入工厂名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.mode_name" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑工厂 -->
    <el-dialog
      title="编辑工厂"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="工厂名称"
          prop="mode_name"
          :rules="[ { required: true, message: '请输入工厂名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.mode_name" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose1">取 消</el-button>
        <el-button type="primary" @click="handleEditList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getFactoryModeData } from "@/api/setting.js";
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
      // aa(row) {
      //   console.log(row);
      //   return row.id + row.children;
      // },
      power: "",
      tableData: [],
      centerDialogVisible: false, //添加工厂
      centerDialogVisible1: false, //编辑工厂
      region: "",
      form: {
        mode_name: "",
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    handleClose() {
      this.form.mode_name = "";
      this.centerDialogVisible = false;
      this.init();
    },
    handleClose1() {
      this.form.mode_name = "";
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleNewList() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await factoryModeAdd(this.form);
        console.log(res);
        this.form.mode_name = "";
        this.init();
        this.centerDialogVisible = false;
      });
    },
    async handleEditList() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await factoryModeEdit(this.form);
        console.log(res);
        this.form.mode_name = "";
        this.form.id = "";
        this.init();
        this.centerDialogVisible1 = false;
      });
    },
    addClassify() {
      this.centerDialogVisible = true;
    },
    async handleEdit(index, row) {
      console.log(row);
      if (row.factory_mode_id == undefined) {
        this.form.mode_name = row.mode_name;
        this.form.id = row.id;
        this.centerDialogVisible1 = true;
      }
      if (row.factory_mode_id != undefined) {
        this.centerDialogVisible2 = true;
      }
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await factoryModeDel({ id: row.id });
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
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init() {
      let res = await getFactoryModeData({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      let aa = 1;
      this.tableData.map((v) => {
        v["Factory_id"] = aa++;
        v["price"] = "";
        v.children.map((v1) => {
          v1["Factory_id"] = aa++;
        });
      });
      this.total = count;
    },
  },
  mounted() {
    this.init();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.colorManagement {
  .addClassify {
    margin: 0 30px 30px 0;
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
  .btn {
    cursor: pointer;
    margin: 0 10px;
    font-size: 16px;
  }
  /deep/textarea {
    width: 80%;
    height: 150px;
    resize: none !important;
  }
  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
// materialManagement
</style>

