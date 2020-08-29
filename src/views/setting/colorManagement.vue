<template>
  <div class="goodsCategory" v-if="permission.indexOf('colorManagement')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>颜色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加颜色 -->
    <div class="addClassify" v-if="permission.indexOf('color_add')!=-1" @click="addClassify">添加颜色</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'color_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="color_name" label="分类名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="sort"  v-if="permission.indexOf('color_status_edit')!=-1" label="启用/禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="get_switch_active(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200px"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
            class="el-icon-edit btn"
            v-if="permission.indexOf('color_edit')!=-1"
          >
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
            class="el-icon-delete btn"
            v-if="permission.indexOf('color_del')!=-1"
          >
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 颜色分类 -->
    <el-dialog
      title="颜色分类"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级分类" prop="color_id">
          <el-select v-model="form.color_id" placeholder="可选/可不选" style="width:80%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.color_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色名称" prop="color_name" v-if="form.color_id!==''">
          <el-input v-model="form.color_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="颜色分类" prop="color_name" v-if="form.color_id===''">
          <el-input v-model="form.color_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose('form')">取 消</el-button>
        <el-button type="primary" @click="handleNewList('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="编辑颜色"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="obj" :model="obj" :rules="rules1" label-width="80px" resetFields>
        <el-form-item label="颜色名称" prop="color_name">
          <el-input v-model="obj.color_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" v-if="rowLevel==='1'">
          <el-select v-model="region" @change="get_goods_category_id($event)" style="width:80%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.color_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="obj.sort" style="width:80%;"></el-input>
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
import {
  colorList,
  colorInfo,
  colorAdd,
  colorDel,
  colorEdit,
  colorStatusEdit,
} from "@/api/setting.js";
export default {
  data() {
    return {
      power: "",
      switch_active: "",
      rules: {
        color_name: [
          { required: true, message: "请输入颜色名称", trigger: "blur" },
        ],
      },
      rules1: {
        color_name: [
          { required: true, message: "请输入颜色名称", trigger: "blur" },
        ],
      },
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        color_name: "",
        color_id: "",
        sort: "",
      },
      region: "",
      obj: {},
      options: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      goods_category_id: "",
      rowLevel: "",
      permission:[]
    };
  },
  methods: {
    async get_switch_active(index, row) {
      let res = await colorStatusEdit({ id: row.id, status: row.status });
      this.init();
    },
    handleClose() {
      this.$refs["form"].resetFields();
      this.centerDialogVisible = false;
    },
    handleClose1() {
      this.centerDialogVisible1 = false;
    },
    async handleEditList() {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
        delete this.obj.goods_category_data;
        delete this.obj.region;
        console.log(this.obj);
        let res = await colorEdit(this.obj);
        console.log(res);
        this.$refs["obj"].resetFields();
        this.obj.color_id = 0;
        this.region = "";
        this.centerDialogVisible1 = false;
        this.init();
      });
    },
    async handleEdit(index, row) {
      let res = await colorInfo({ id: row.color_id });
      console.log(res);
      this.region = res.data.data[0].color_name;
      console.log(row);
      this.rowLevel = row.level;
      let res1 = await colorInfo();
      let { data } = res1.data;
      this.options = data;
      this.obj = row;

      this.centerDialogVisible1 = true;
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await colorDel({ id: row.id });
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
    get_goods_category_id(e) {
      this.form.color_id = e;
      this.obj.color_id = e;
    },
    async addClassify() {
      if (this.tableData.length === 0) {
        this.region = "";
        this.centerDialogVisible = true;
      }
      if (this.tableData.length > 0) {
        this.region = "";
        let res = await colorInfo();
        console.log(res);
        let { data } = res.data;
        this.options = data;
        this.centerDialogVisible = true;
      }
    },
    async handleNewList(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        delete this.form.region;
        console.log(this.form);
        if (this.tableData.length === 0) {
          let res = await colorAdd(this.form);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
        if (this.tableData.length > 0) {
          let res = await colorAdd(this.form);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
      });
    },
    async init() {
      let res = await colorList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
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
.goodsCategory {
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