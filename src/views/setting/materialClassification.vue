<template>
  <div class="goodsCategory">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>物料分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加分类 -->
    <div class="addClassify" @click="addClassify">添加分类</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
      :tree-props="{children: 'class_data' , hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="classname" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
            class="el-icon-edit btn"
            v-if="scope.row.is_origin!==1"
          >
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
            class="el-icon-delete btn"
            v-if="scope.row.is_origin!==1"
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
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="上级分类" prop="class_id">
          <el-select v-model="form.class_id" placeholder="可选/可不选" style="width:80%;" clearable>
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料名称" prop="classname" v-if="form.class_id!==''">
          <el-input v-model="form.classname" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="物料分类" prop="classname" v-if="form.class_id===''">
          <el-input v-model="form.classname" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose(form)">取 消</el-button>
        <el-button type="primary" @click="handleNewList(form)">确 定</el-button>
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
      <el-form ref="obj" :model="obj" :rules="rules1" label-width="80px" resetFields>
        <el-form-item label="分类名称" prop="classname">
          <el-input v-model="obj.classname" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="class_id" v-if="obj.level==1">
          <el-select v-model="obj.class_id" placeholder="可选/可不选" style="width:80%;" clearable>
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose1('obj')">取 消</el-button>
        <el-button type="primary" @click="handleEditList('obj')">确 定</el-button>
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
import {
  getMaterialsClass,
  materialsClassAdd,
  getMaterialsClassInfo,
  getMaterialsClassEdit,
  materialsClassDel,
} from "@/api/archives";
export default {
  data() {
    return {
      classData: [],
      power: "",
      rules: {
        classname: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      rules1: {
        classname: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        classname: "",
        class_id: "",
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
    },
    handleClose1(obj) {
      this.$refs["obj"].resetFields();
      this.centerDialogVisible1 = false;
    },
    handleEditList(obj) {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
        let res = await getMaterialsClassEdit(this.obj);
        console.log(res);
        this.$refs["obj"].resetFields();
        this.centerDialogVisible1 = false;
        this.init();
      });
    },
    async handleEdit(index, row) {
      console.log(index, row);
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
          let res = await materialsClassDel({ id: row.id });
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
    async addClassify() {
      this.centerDialogVisible = true;
    },
    async handleNewList(form) {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        if (this.form.class_id === "") {
          let form = {};
          form.classname = this.form.classname;
          form.class_id = 0;
          form.level = 0;
          let res = await materialsClassAdd(form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
        if (this.form.class_id !== "") {
          let form = {};
          form.classname = this.form.classname;
          form.class_id = this.form.class_id;
          form.level = 1;
          let res = await materialsClassAdd(form);
          console.log(res);
          this.$refs["form"].resetFields();
          this.centerDialogVisible = false;
          this.init();
        }
      });
    },
    async init() {
      let res = await getMaterialsClass();
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
      this.getClassData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
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