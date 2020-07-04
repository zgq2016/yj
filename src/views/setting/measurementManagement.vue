<template>
  <div class="goodsCategory">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>尺码管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加尺码 -->
    <div class="addClassify">
      <el-button type="primary" @click="addClassify">添加尺码</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'size_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="size_name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
          <div class="el-icon-delete btn" @click="handleDelete(scope.$index, scope.row)"></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 尺码分类 -->
    <el-dialog title="尺码分类" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="尺码名称" prop="size_name">
          <el-input v-model="form.size_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select
            v-model="region"
            placeholder="可选/可不选"
            style="width:80%;"
            @change="get_goods_category_id($event)"
          >
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
        <el-form-item>
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button type="primary" @click="handleNewList('form')">确 定</el-button>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleNewList">确 定</el-button>
        </span>-->
      </el-form>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog title="编辑尺码" :visible.sync="centerDialogVisible1" width="30%" center>
      <el-form ref="obj" :model="obj" label-width="80px" resetFields>
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
        <el-form-item label="排序" prop="sort">
          <el-input v-model="obj.sort" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm1('obj')">取 消</el-button>
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
  sizeDel
} from "@/api/setting.js";
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        level: 0,
        size_name: "",
        size_id: 0,
        sort: ""
      },
      region: "",
      obj: {},
      options: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      goods_category_id: "",
      rowLevel: ""
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.size_id = 0;
      this.region = "";
      console.log(this.form);
      this.centerDialogVisible = false;
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
      this.form.size_id = 0;
      this.region = "";
      console.log(this.form);
      this.centerDialogVisible1 = false;
    },
    async handleEditList() {
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
        type: "warning"
      })
        .then(async () => {
          let res = await sizeDel({ id: row.id });
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
    async handleNewList() {
      delete this.form.region;
      console.log(this.form);
      if (this.tableData.length === 0) {
        let res = await sizeAdd(this.form);
        this.$refs["form"].resetFields();
        this.form.size_id = 0;
        this.region = "";
        this.centerDialogVisible = false;
        this.init();
      }
      if (this.tableData.length > 0) {
        let res = await sizeAdd(this.form);
        this.$refs["form"].resetFields();
        this.form.size_id = 0;
        this.region = "";
        this.centerDialogVisible = false;
        this.init();
      }
    },
    async init() {
      let res = await sizeList({
        page: this.pageIndex,
        page_size: this.pageSize
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.goodsCategory {
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