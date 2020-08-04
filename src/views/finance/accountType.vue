<template>
  <div class="accountType" v-if="power.indexOf('F6000400')!=-1">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>账目类型</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:10px 0;" v-if="power.indexOf('F6000100')!=-1">
      <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增项目类型</el-button>
    </div>

    <div class="table" style="width: 100%;margin:10px 0">
      <el-table :data="data" border style="width: 100%">
        <el-table-column fixed prop="account_type_name" label="类型名称"></el-table-column>
        <el-table-column prop="statusName" label="状态"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column
          label="操作"
          width="100"
          v-if="power.indexOf('F6000300')!=-1||power.indexOf('F6000200')!=-1"
        >
          <template slot-scope="scope">
            <div
              v-if="power.indexOf('F6000300')!=-1"
              class="el-icon-edit btn"
              @click="handleEdit(scope.$index, scope.row)"
            ></div>
            <div
              v-if="power.indexOf('F6000200')!=-1"
              class="el-icon-delete btn"
              @click="handleDelete(scope.$index, scope.row)"
            ></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="账目类型信息"
      :visible.sync="dialogVisible1"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="obj" :rules="rules1" ref="obj" label-width="100px" class="demo-form">
        <el-form-item label="类型名称" prop="account_type_name ">
          <el-input v-model="obj.account_type_name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="obj.status" style="width:80%">
            <el-radio :label="'1'">启用</el-radio>
            <el-radio :label="'0'">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="obj.remarks" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="obj.sort" style="width:80%" @input="handleObjInput"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditForm">提 交</el-button>
        <el-button @click="handleEditClose">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="账目类型信息"
      :visible.sync="dialogVisible"
      width="30%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="类型名称" prop="account_type_name">
          <el-input v-model="form.account_type_name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" style="width:80%">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" style="width:80%" @input="handleInput"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm">提 交</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  accountTypeAdd,
  accountTypeList,
  accountTypeEdit,
  accountTypeDel,
  accountTypeInfo
} from "@/api/finance";
export default {
  data() {
    return {
      power: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      data: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: { account_type_name: "", status: "", remarks: "", sort: "" },
      obj: {},
      rules: {
        account_type_name: [
          { required: true, message: "类型名称", trigger: "blur" }
        ]
      },
      rules1: {
        account_type_name: [
          { required: true, message: "类型名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleAddForm() {
      this.form.sort = Number(this.form.sort);
      let res = await accountTypeAdd(this.form);
      this.form.account_type_name = "";
      this.form.status = "";
      this.form.remarks = "";
      this.form.sort = "";
      this.init();
      this.dialogVisible = false;
    },
    async handleEditForm() {
      this.obj.sort = Number(this.obj.sort);
      let res = await accountTypeEdit(this.obj);
      console.log(res);
      this.obj.account_type_name = "";
      this.obj.status = "";
      this.obj.remarks = "";
      this.obj.sort = "";
      this.init();
      this.dialogVisible1 = false;
    },
    handleInput() {
      this.form.sort = this.form.sort.replace(/[^0-9-]+/, "");
    },
    handleObjInput() {
      this.obj.sort = this.obj.sort.replace(/[^0-9-]+/, "");
    },
    handleClose() {
      this.form.account_type_name = "";
      this.form.status = "";
      this.form.remarks = "";
      this.form.sort = "";
      this.dialogVisible = false;
    },
    handleEditClose() {
      this.form.account_type_name = "";
      this.form.status = "";
      this.form.remarks = "";
      this.form.sort = "";
      this.dialogVisible1 = false;
      this.form.sort = "";
    },
    async handleEdit(index, row) {
      let res = await accountTypeInfo({
        id: row.id
      });
      this.obj = res.data.data;
      this.dialogVisible1 = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await accountTypeDel({ id: row.id });
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
      let res = await accountTypeList({
        page: this.pageIndex,
        page_size: this.pageSize
      });
      console.log(res);
      res.data.data.map((v, i) => {
        if (v.status === "1") {
          v["statusName"] = "启用";
        }
        if (v.status === "0") {
          v["statusName"] = "禁用";
        }
      });
      let { data, count } = res.data;
      this.data = data;
      this.total = count;
    }
  },
  mounted() {
    this.init();
    this.power = localStorage.getItem("power");
  }
};
</script>

<style lang="less" scoped>
.accountType {
  .btn {
    cursor: pointer;
    margin: 0 10px;
    font-size: 16px;
  }
  .dialog {
  }
  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>