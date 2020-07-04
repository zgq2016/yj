<template>
  <div class="goodsCategory">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类 -->
    <div class="addClassify">
      <el-button type="primary" @click="addClassify">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'goods_category_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="goods_category_name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="describe" label="分类描述" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="200"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
          <div class="el-icon-delete btn" @click="handleDelete(scope.$index, scope.row)"></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称" prop="goods_category_name">
          <el-input v-model="form.goods_category_name" style="width:80%;"></el-input>
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
              :label="item.goods_category_name "
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述" prop="describe">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleNewList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :before-close="handleClose1"
    >
      <el-form ref="obj" :model="obj" label-width="80px" resetFields>
        <el-form-item label="分类名称" prop="goods_category_name">
          <el-input v-model="obj.goods_category_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" v-if="rowLevel==='1'">
          <el-select v-model="region" @change="get_goods_category_id($event)" style="width:80%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.goods_category_name "
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述" prop="describe">
          <el-input type="textarea" v-model="obj.describe"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="obj.sort" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
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
  goodsCategoryList,
  goodsCategoryInfo,
  goodsCategoryAdd,
  goodsCategoryDel,
  goodsCategoryEdit
} from "@/api/setting.js";
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        goods_category_id: 0,
        goods_category_name: "",
        describe: "",
        sort: "",
        level: 0
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
    handleClose() {
      this.form.goods_category_id = 0;
      this.form.goods_category_name = "";
      this.form.describe = "";
      this.form.sort = "";
      this.form.level = 0;
      this.region = "";
      this.centerDialogVisible = false;
      this.init();
    },
    handleClose1() {
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleEditList() {
      delete this.obj.goods_category_data;
      delete this.obj.region;
      console.log(this.obj);
      let res = await goodsCategoryEdit(this.obj);
      console.log(res);
      this.$refs["obj"].resetFields();
      this.obj.goods_category_id = 0;
      this.region = "";
      this.centerDialogVisible1 = false;
      this.init();
    },
    async handleEdit(index, row) {
      let res = await goodsCategoryInfo({ id: row.goods_category_id });
      console.log(res);
      this.region = res.data.data[0].goods_category_name;
      console.log(row);
      this.rowLevel = row.level;
      let res1 = await goodsCategoryInfo();
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
          let res = await goodsCategoryDel({ id: row.id });
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
      this.form.goods_category_id = e;
      this.obj.goods_category_id = e;
    },
    async addClassify() {
      if (this.tableData.length === 0) {
        this.region = "";
        this.centerDialogVisible = true;
      }
      if (this.tableData.length > 0) {
        this.region = "";
        let res = await goodsCategoryInfo();
        let { data } = res.data;
        this.options = data;
        this.centerDialogVisible = true;
      }
    },
    async handleNewList() {
      delete this.form.region;
      if (this.tableData.length === 0) {
        let res = await goodsCategoryAdd(this.form);
        this.$refs["form"].resetFields();
        this.form.goods_category_id = 0;
        this.region = "";
        this.centerDialogVisible = false;
        this.init();
      }
      if (this.tableData.length > 0) {
        let res = await goodsCategoryAdd(this.form);
        this.$refs["form"].resetFields();
        this.form.goods_category_id = 0;
        this.centerDialogVisible = false;
        this.init();
      }
    },
    async init() {
      let res = await goodsCategoryList({
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