<template>
  <div class="colorManagement">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>单位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加单位 -->
    <div class="addClassify">
      <el-button type="primary" @click="addClassify">添加单位</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin: 20px 0;">
      <el-table-column prop="unit_name" label="单位名称" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
          <div class="el-icon-delete btn" @click="handleDelete(scope.$index, scope.row)"></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 单位分类 -->
    <el-dialog
      title="单位分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="单位名称"
          prop="unit_name"
          :rules="[ { required: true, message: '请输入单位名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.unit_name" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑单位 -->
    <el-dialog
      title="编辑单位"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :before-close="handleClose1"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="单位名称"
          prop="unit_name"
          :rules="[ { required: true, message: '请输入单位名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.unit_name" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible1 = false">取 消</el-button> -->
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
import { unitList, unitAdd, unitEdit, unitDel } from "@/api/setting.js";
// unitList, unitAdd, unitEdit, unitDel
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false, //添加单位
      centerDialogVisible1: false, //编辑单位
      region: "",
      form: {
        unit_name: "",
        id: ""
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    handleClose() {
      this.form.unit_name = "";
      this.centerDialogVisible = false;
      this.init();
    },
    handleClose1() {
      this.form.unit_name = "";
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleNewList() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await unitAdd(this.form);
        console.log(res);
        this.form.unit_name = "";
        this.init();
        this.centerDialogVisible = false;
      });
    },
    async handleEditList() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        let res = await unitEdit(this.form);
        console.log(res);
        this.form.unit_name = "";
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
      this.form.unit_name = row.unit_name;
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
          let res = await unitDel({ id: row.id });
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
      let res = await unitList({
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

