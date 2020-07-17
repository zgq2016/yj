<template>
  <div class="colorManagement" v-if="power.indexOf('H5000400')!=-1">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>季节管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加季节 -->
    <div class="addClassify" v-if="power.indexOf('H5000100')!=-1">
      <el-button type="primary" @click="addClassify">添加季节</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin: 20px 0;">
      <el-table-column prop="season_name" label="季节名称" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
          <div
            v-if="power.indexOf('H5000200')!=-1"
            class="el-icon-delete btn"
            @click="handleDelete(scope.$index, scope.row)"
          ></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 季节分类 -->
    <el-dialog
      title="季节分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="季节名称"
          prop="season_name"
          :rules="[ { required: true, message: '请输入季节名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.season_name" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑季节 -->
    <el-dialog
      title="编辑季节"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="季节名称"
          prop="season_name"
          :rules="[ { required: true, message: '请输入季节名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.season_name" style="width:80%;"></el-input>
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
import { seasonList, seasonAdd, seasonEdit, seasonDel } from "@/api/setting.js";

export default {
  data() {
    return {
      power: "",
      tableData: [],
      centerDialogVisible: false, //添加季节
      centerDialogVisible1: false, //编辑季节
      region: "",
      form: {
        season_name: "",
        id: ""
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    handleClose() {
      this.form.season_name = "";
      this.centerDialogVisible = false;
      this.init();
    },
    handleClose1() {
      this.form.season_name = "";
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleNewList() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await seasonAdd(this.form);
        console.log(res);
        this.form.season_name = "";
        this.init();
        this.centerDialogVisible = false;
      });
    },
    async handleEditList() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await seasonEdit(this.form);
        console.log(res);
        this.form.season_name = "";
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
      this.form.season_name = row.season_name;
      this.form.id = row.id;
      this.centerDialogVisible1 = true;
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await seasonDel({ id: row.id });
          this.init();
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
      let res = await seasonList({
        page: this.pageIndex,
        page_size: this.pageSize
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    }
  },
  mounted() {
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  }
};
</script>

<style lang="less" scoped>
.colorManagement {
  .addClassify {
    button {
      margin: 30px;
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

