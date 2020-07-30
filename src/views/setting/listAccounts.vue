<template>
  <div class="listAccounts">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>账户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <el-button type="primary">增加账户</el-button> -->
    <el-table :data="tableData" style="width: 100%;margin: 20px 0;" row-key="id" border>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="role_name" label="权限角色"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="Access" label="权限等级"></el-table-column>
      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <div class="el-icon-s-tools btn" @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置权限" placement="top-start">
            <div class="el-icon-edit btn" @click="handleEditUser(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑分类 -->
    <el-dialog title="修改密码" :visible.sync="centerDialogVisible1" width="30%" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" resetFields>
        <el-form-item label="用户名:">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="账号:">
          <span>{{form.username}}</span>
        </el-form-item>
        <el-form-item prop="pwd" label="原密码:">
          <el-input
            v-model="form.pwd"
            placeholder="请输入原密码"
            show-password
            id="pwd"
            @blur="pwdblur"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passworded" label="修改后密码:">
          <el-input
            v-model="form.passworded"
            placeholder="请输入修改后密码"
            show-password
            style="width:80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleEditList">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加权限" :visible.sync="centerDialogVisible2" width="30%" center>
      <el-form ref="form1" :model="form1" :rules="rules1" label-width="80px">
        <el-form-item label="权限角色" prop="role_name">
          <el-select v-model="form1.role_name" placeholder="请选择">
            <el-option
              v-for="item in userRoleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.role_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级" prop="level">
          <el-select v-model="form1.level" placeholder="请选择">
            <el-option
              v-for="item in Access_level"
              :key="item.id"
              :label="item.access"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEditUserListClose('form1')">取 消</el-button>
        <el-button type="primary" @click="handleEditUserList('form1')">确 定</el-button>
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
  userList,
  userPassEdit,
  getRoleSelect,
  userEdit,
} from "@/api/setting.js";
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      centerDialogVisible2: false, //编辑分类
      region: "",
      form: {
        goods_category_name: "",
        describe: "",
        sort: "",
      },
      form1: { role_name: "", level: "" },
      options: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      goods_category_id: "",
      rowLevel: "",
      rules: {
        pwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        passworded: [
          { required: true, message: "请输入修改后密码", trigger: "blur" },
        ],
      },
      vb: false,
      userRoleList: [],
      row: {},

      Access_level: [
        // {
        //   id: 0,
        //   access: "注册人",
        // },
        {
          id: 1,
          access: "管理",
        },
        {
          id: 2,
          access: "普通",
        },
      ],
      rules1: {},
    };
  },
  methods: {
    handleEditUserListClose(form) {
      this.$refs[form].resetFields();
      this.centerDialogVisible2 = false;
    },
    async handleEditUserList(form) {
      let res = await userEdit(this.form1);
      console.log(res);
      this.$refs[form].resetFields();
      this.centerDialogVisible2 = false;
      this.init();
    },
    async handleEditUser(index, row) {
      this.form1.name = row.name;
      this.form1.id = row.id;
      let res = await getRoleSelect();
      console.log(res);
      this.userRoleList = res.data.data;
      this.centerDialogVisible2 = true;
    },
    get_goods_category_id(e) {
      this.goods_category_id = e;
    },
    pwdblur() {
      let pd = document.getElementById("pwd");
      if (this.form.pwd != this.form.password) {
        this.centerDialogVisible1 = true;
        pd.style.border = "1px solid #F56C6C";
        this.vb = true;
      } else {
        pd.style.border = "1px solid #DCDFE6";
        this.vb = false;
      }
    },
    handleEditList() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        if (!this.vb) {
          let res = await userPassEdit({
            id: this.form.id,
            newpass: this.form.passworded,
          });
          console.log(res);

          this.centerDialogVisible1 = false;
        }
      });
    },

    async handleEdit(index, row) {
      this.form.pwd = "";
      this.form.passworded = "";
      this.form = row;
      this.centerDialogVisible1 = true;
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
      let res = await userList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      res.data.data.map((v) => {
        if (v.level === "0") {
          v["Access"] = "注册人";
        }
        if (v.level === "1") {
          v["Access"] = "管理";
        }
        if (v.level === "2") {
          v["Access"] = "普通";
        }
        console.log(v);
      });
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.listAccounts {
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