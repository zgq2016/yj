<template>
  <div class="goodsCategory" v-if="permission.indexOf('goodsCategory')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加分类 -->
    <div class="addClassify" v-if="permission.indexOf('goods_category_add')!=-1" @click="addClassify">添加分类</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'goods_category_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="goods_category_name" label="分类名称"></el-table-column>
      <el-table-column prop="describe" label="分类描述"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
            v-if="permission.indexOf('goods_category_edit')!=-1"
            class="el-icon-edit btn"
          >
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
            v-if="permission.indexOf('goods_category_del')!=-1"
            class="el-icon-delete btn"
          >
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :rules="rules1" :model="form" label-width="80px">
        <el-form-item label="上级分类" prop="goods_category_id">
          <el-select
            v-model="form.goods_category_id"
            placeholder="可选/可不选"
            style="width:80%;"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.goods_category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_category_name" v-if="form.goods_category_id!==''">
          <el-input v-model="form.goods_category_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_category_name" v-if="form.goods_category_id===''">
          <el-input v-model="form.goods_category_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item v-if="form.goods_category_id != ''" label="计量单位" prop="unit">
          <el-select v-model="form.unit" clearable placeholder="请选择" style="width:80%;">
            <el-option
              v-for="item in units"
              :key="item.id"
              :label="item.unit_name"
              :value="item.unit_name"
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
        <el-button type="primary" @click="handleClose('form')">取 消</el-button>
        <el-button type="primary" @click="handleNewList('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="obj" :model="obj" :rules="rules" label-width="80px" resetFields>
        <el-form-item label="分类名称" prop="goods_category_name">
          <el-input v-model="obj.goods_category_name" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" v-if="rowLevel==='1'">
          <el-select
            v-model="region"
            clearable
            @change="get_goods_category_id($event)"
            style="width:80%;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.goods_category_name "
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="region != ''&&rowLevel==='1'" label="计量单位">
          <el-select v-model="obj.unit" clearable placeholder="请选择">
            <el-option
              v-for="item in units"
              :key="item.id"
              :label="item.unit_name"
              :value="item.unit_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" v-model="obj.describe"></el-input>
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
  goodsCategoryList,
  goodsCategoryInfo,
  goodsCategoryAdd,
  goodsCategoryDel,
  goodsCategoryEdit,
} from "@/api/setting.js";
import { getUnitSelect } from "@/api/archives";
export default {
  data() {
    return {
      permission:[],
      units: [],
      power: "",
      rules: {
        goods_category_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      rules1: {
        goods_category_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        goods_category_name: "",
        goods_category_id: "",
        unit: "",
        describe: "",
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
      vh1: false,
    };
  },
  methods: {
    handleClose(form) {
      this.$refs["form"].resetFields();
      this.centerDialogVisible = false;
      this.vh1 = false;
    },
    handleClose1() {
      this.centerDialogVisible1 = false;
      this.vh1 = false;
    },
    handleEditList() {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
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
      });
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
        type: "warning",
      })
        .then(async () => {
          let res = await goodsCategoryDel({ id: row.id });
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
      this.form.goods_category_id = e;
      this.obj.goods_category_id = e;
      this.vh1 = true;
    },
    async addClassify() {
      if (this.tableData.length === 0) {
        this.region = "";
        this.centerDialogVisible = true;
      }
      if (this.tableData.length > 0) {
        this.region = "";
        let res = await goodsCategoryInfo();
        console.log(res);
        let { data } = res.data;
        this.options = data;
        this.centerDialogVisible = true;
      }
    },
    async handleNewList(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        if (this.tableData.length === 0) {
          let res = await goodsCategoryAdd(this.form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
        if (this.tableData.length > 0) {
          let res = await goodsCategoryAdd(this.form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
      });
    },
    async init() {
      let res = await goodsCategoryList({
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
    async getUnit() {
      let res = await getUnitSelect();
      let { data } = res.data;
      this.units = data;
    },
  },
  mounted() {
    this.init();
    this.getUnit();
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