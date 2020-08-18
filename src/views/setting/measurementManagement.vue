<template>
  <div class="goodsCategory" v-if="power.indexOf('H3000400')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>尺码管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加尺码 -->
    <div class="addClassify" @click="addClassify" v-if="power.indexOf('H3000100')!=-1">添加尺码</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'size_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="size_name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="200"></el-table-column>
      <el-table-column
        align="right"
        label="操作"
        v-if="power.indexOf('H3000300')!=-1||power.indexOf('H3000200')!=-1"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
            class="el-icon-edit btn"
            v-if="power.indexOf('H3000300')!=-1"
          >
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
            class="el-icon-delete btn"
            v-if="power.indexOf('H3000200')!=-1"
          >
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 尺码分类 -->
    <el-dialog
      title="尺码分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" :rules="rules1" label-width="80px">
        <el-form-item label="尺码名称" prop="size_name">
          <el-input v-model="form.size_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="size_id">
          <el-select v-model="form.size_id" placeholder="可选/可不选" style="width:80%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.size_name"
              :value="item.id"
            ></el-option>
          </el-select>
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
      title="编辑尺码"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="obj" :model="obj" :rules="rules1" label-width="80px" resetFields>
        <el-form-item label="尺码名称" prop="size_name">
          <el-input v-model="obj.size_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" v-if="rowLevel==='1'">
          <el-select v-model="region" @change="get_goods_category_id($event)" style="width:80%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.size_name"
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
  sizeList,
  sizeAdd,
  sizeInfo,
  sizeEdit,
  sizeDel,
} from "@/api/setting.js";
export default {
  data() {
    return {
      power: "",
      rules: {
        size_name: [
          { required: true, message: "请输入尺码名称", trigger: "blur" },
        ],
      },
      rules1: {
        size_name: [
          { required: true, message: "请输入尺码名称", trigger: "blur" },
        ],
      },
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        size_name: "",
        size_id: "",
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
    };
  },
  methods: {
    handleClose() {
      this.$refs["form"].resetFields();
      this.centerDialogVisible = false;
      this.init();
    },
    handleClose1() {
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleEditList() {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
        delete this.obj.goods_category_data;
        delete this.obj.region;
        console.log(this.obj);
        let res = await sizeEdit(this.obj);
        console.log(res);
        this.$refs["obj"].resetFields();
        this.obj.size_id = 0;
        this.region = "";
        this.centerDialogVisible1 = false;
        this.init();
      });
    },
    async handleEdit(index, row) {
      let res = await sizeInfo({ id: row.size_id });
      console.log(res);
      this.region = res.data.data[0].size_name;
      console.log(row);
      this.rowLevel = row.level;
      let res1 = await sizeInfo();
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
          let res = await sizeDel({ id: row.id });
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
      this.form.size_id = e;
      this.obj.size_id = e;
    },
    async addClassify() {
      if (this.tableData.length === 0) {
        this.region = "";
        this.centerDialogVisible = true;
      }
      if (this.tableData.length > 0) {
        this.region = "";
        let res = await sizeInfo();
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
        if (this.tableData.length === 0) {
          let res = await sizeAdd(this.form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
        if (this.tableData.length > 0) {
          let res = await sizeAdd(this.form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
      });
    },
    async init() {
      let res = await sizeList({
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
    this.power = localStorage.getItem("power");
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