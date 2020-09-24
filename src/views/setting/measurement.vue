<template>
  <div class="measurement" v-if="permission.indexOf('measurement')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>尺寸表管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 部位季节 -->
    <div class="addClassify" v-if="permission.indexOf('season_add')!=-1" @click="addClassify">添加部件</div>
    <el-table :data="tableData" style="width: 100%;margin: 20px 0;">
      <el-table-column prop="name" label="部位名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
            class="el-icon-edit btn"
            v-if="permission.indexOf('season_edit')!=-1"
          >
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
            class="el-icon-delete btn"
            v-if="permission.indexOf('season_del')!=-1"
          >
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 季节分类 -->
    <el-dialog
      title="增加部位"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="部位名称"
          prop="name"
          :rules="[ { required: true, message: '请输入部位名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.name" placeholder="请输入部位名称" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="排序" >
          <el-input type="text" placeholder="请输入序号" style="width:80%;" v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑季节 -->
    <el-dialog
      title="编辑部位"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item
          label="部位名称"
          prop="name"
          :rules="[ { required: true, message: '请输入部位名称', trigger: 'blur' },]"
        >
          <el-input v-model="form.name" placeholder="请输入部位名称" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="排序" >
          <el-input type="text" placeholder="请输入序号" style="width:80%;" v-model="form.sort"></el-input>
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
import { positionList, positionAdd, positionEdit, positionDel } from "@/api/setting.js";

export default {
  data() {
    return {
      power: "",
      tableData: [],
      centerDialogVisible: false, //添加部位
      centerDialogVisible1: false, //编辑部位
      region: "",
      form: {
        name: "",
        id: "",
        sort: "",
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      permission: [],
    };
  },
  methods: {
    handleClose() {
      // this.form.season_name = "";
      this.init();
      this.centerDialogVisible = false;
    },
    handleClose1() {
      // this.form.season_name = "";
      this.init();
      this.centerDialogVisible1 = false;
    },
    async handleNewList() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;

        let res = await positionAdd(this.form);
        console.log(res);
        this.form.name = "";
        this.form.sort = "";
        this.init();
        this.centerDialogVisible = false;
      });
    },
    async handleEditList() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;

        let res = await positionEdit(this.form);
        // console.log(res);
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
      // console.log(row);
      this.form = row;
      this.centerDialogVisible1 = true;
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await positionDel({ id: row.id });
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
      let res = await positionList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
  },
  mounted() {
    this.init();
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.measurement {
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

