<template>
  <div class="menus">
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>菜单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 添加分类 -->
    <div class="addClassify" @click="addClassify">添加菜单</div>
    <el-table
      :data="tableData"
      style="width: 100%; margin: 20px 0"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="route" label="路由地址"></el-table-column>
      <el-table-column prop="url" label="请求地址"></el-table-column>
      <el-table-column
        prop="auth_name"
        label="是否需要验证权限"
      ></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" class="el-icon-edit btn">
            <div @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" class="el-icon-delete btn">
            <div @click="handleDelete(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类 -->
    <el-dialog
      title="添加菜单"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :rules="rules1" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-cascader
            v-model="form.pid"
            :options="pids"
            clearable
            @change="handleChange"
            :props="optionProps"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="路由地址">
          <el-input v-model="form.route" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input v-model="form.url" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="权限验证">
          <el-radio-group v-model="form.auth">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose('form')">取 消</el-button>
        <el-button type="primary" @click="handleNewList('form')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="编辑菜单"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="obj"
        :model="obj"
        :rules="rules"
        label-width="80px"
        resetFields
      >
        <el-form-item label="名称">
          <el-input v-model="obj.name" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="上级分类" v-if="obj.id > 10">
          <!-- <el-select v-model="obj.pid" clearable style="width:80%;">
            <el-option v-for="item in pids" :key="item.value" :label="item.name " :value="item.id"></el-option>
          </el-select>-->
          <el-cascader
            v-model="obj.pid"
            :options="pids"
            clearable
            @change="handleChange"
            :props="optionProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input v-model="obj.route" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input v-model="obj.url" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="权限验证">
          <el-radio-group v-model="obj.auth">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="obj.sort" style="width: 80%"></el-input>
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
  getMenuList,
  menuEdit,
  menuAdd,
  menuDel,
} from "@/api/setting.js";
import { getUnitSelect } from "@/api/archives";
export default {
  data() {
    return {
      units: [],
      optionProps: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      rules1: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      form: {
        auth: 1,
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
      pids: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleClose(form) {
      this.centerDialogVisible = false;
      this.vh1 = false;
      this.form = { auth: 1 };
      // this.$refs[form].resetFields();
      // console.log(this.$refs[form]);
    },
    handleClose1() {
      this.$refs["obj"].resetFields();
      this.centerDialogVisible1 = false;
      this.vh1 = false;
    },
    handleEditList() {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
        delete this.obj.auth_name;
        delete this.obj.level;
        delete this.obj.children;
        if (this.obj.pid == "无") {
          this.obj.pid = 0;
        }
        if (this.obj.pid.length > 0) {
          this.obj.pid = this.obj.pid.pop();
        }
        let res = await menuEdit(this.obj);
        console.log(res);
        this.centerDialogVisible1 = false;
        this.init();
      });
    },
    async handleEdit(index, row) {
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
          let res = await menuDel({ id: row.id });
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
        if (this.form.pid.length > 0) {
          this.form.pid = this.form.pid.pop();
        }

        if (this.form.pid == "" || this.form.pid == undefined) {
          this.form.pid = 0;
        }
        let res = await menuAdd(this.form);
        // this.$refs["form"].resetFields();
        this.form = { auth: 1 };
        this.centerDialogVisible = false;
        this.init();
      });
    },
    async init() {
      let res = await getMenuList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
      this.pids = [];
      this.tableData.map((v, i) => {
        if (v.id <= 12) {
          this.pids.push(v);
        } else {
          if (v.pid == 0) {
            v.pid = "无";
          }
        }
        if (v.auth) {
          v["auth_name"] = "是";
        } else {
          v["auth_name"] = "否";
        }
        v.children.map((j, k) => {
          if (j.auth) {
            j["auth_name"] = "是";
          } else {
            j["auth_name"] = "否";
          }
          j.children.map((q, w) => {
            if (q.auth) {
              q["auth_name"] = "是";
            } else {
              q["auth_name"] = "否";
            }
          });
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
    async getUnit() {
      let res = await getUnitSelect();
      let { data } = res.data;
      this.units = data;
    },
  },
  mounted() {
    this.init();
    this.getUnit();
  },
};
</script>

<style lang="less" scoped>
.menus {
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