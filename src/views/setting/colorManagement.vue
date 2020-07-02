<template>
  <div class="colorManagement">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>颜色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加颜色 -->
    <div class="addClassify">
      <el-button type="primary" @click="addClassify">添加颜色</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'color_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="color_name" label="颜色名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
          <div class="el-icon-delete btn" @click="handl2eDelete(scope.$index, scope.row)"></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 颜色分类 -->
    <el-dialog title="颜色分类" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item label="颜色名称">
          <el-input v-model="form.color_name" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="颜色分组">
          <el-select
            v-model="region"
            @change="get_goods_category_id($event)"
            placeholder="可选/可不选"
            style="width:400px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.color_name "
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" style="width:400px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑颜色 -->
    <el-dialog title="编辑颜色" :visible.sync="centerDialogVisible1" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px" resetFields>
        <el-form-item label="颜色名称">
          <el-input v-model="form.color_name" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="颜色分组" v-if="rowLevel==='1'">
          <el-select v-model="region" @change="get_goods_category_id($event)" style="width:400px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.color_name "
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" style="width:400px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
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
  colorEdit
} from "@/api/setting.js";
// colorInfo,
// colorAdd,
// colorDel,
// colorEdit
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false, //添加颜色
      centerDialogVisible1: false, //编辑颜色
      region: "",
      form: {
        color_name: "",
        sort: ""
      },
      options: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      color_id: "",
      rowLevel: ""
    };
  },
  methods: {
    get_goods_category_id(e) {
      this.color_id = e;
    },
    async handleNewList() {
      this.form["color_id"] = this.color_id || 0;
      let res = await colorAdd(this.form);
      this.form.color_name = "";
      this.form.sort = "";
      this.region = "";
      this.init();
      this.centerDialogVisible = false;
    },
    async handleEditList() {
      delete this.form["color_data"];
      let res = await colorEdit(this.form);
      console.log(res);
      this.form.color_name = "";
      this.form.sort = "";
      this.region = "";
      this.init();
      this.centerDialogVisible1 = false;
    },
    async addClassify() {
      this.form.class_name = "";
      this.form.sort = "";
      this.region = "";
      let res = await colorInfo();
      let { data } = res.data;
      this.options = data;
      this.centerDialogVisible = true;
    },
    async handleEdit(index, row) {
      this.rowLevel = row.level;
      let res = await colorInfo({ id: row.color_id });
      this.form = row;
      this.region = res.data.data[0].color_name;
      let res1 = await colorInfo();
      let { data } = res1.data;
      this.options = data;
      this.centerDialogVisible1 = true;
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await colorDel({ id: row.id });
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
      let res = await colorList({
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
    width: 400px;
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

