<template>
  <div class="listAccounts" v-if="permission.indexOf('listAccounts')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button type="primary" v-if="permission.indexOf('register')!=-1" @click="addAccounts">增加账户</el-button>
    <el-table
      :data="tableData"
      @cell-mouse-enter="setUser"
      style="width: 100%;margin: 20px 0;"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="no" label="编号"></el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="role_name" label="权限角色"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="Access" label="权限等级"></el-table-column>
      <el-table-column label="启用/禁用" v-if="permission.indexOf('user_status_edit')!=-1" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="get_switch_active(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            v-if="permission.indexOf('user_info_edit')!=-1"
            placement="top-start"
          >
            <div class="el-icon-s-tools btn" @click="handleEdit(scope.$index, scope.row)"></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="设置权限"
            v-if="permission.indexOf('user_edit')!=-1"
            placement="top-start"
          >
            <div class="el-icon-edit btn" @click="handleEditUser(scope.$index, scope.row)"></div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑分类 -->
    <el-dialog
      title="修改密码"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" resetFields>
        <el-form-item label="用户名:">
          <el-input v-model="form.name" placeholder="请输入用户名" style="width:80%"></el-input>
          <!-- <span>{{form.name}}</span> -->
        </el-form-item>
        <el-form-item label="编号" prop="no">
          <el-input
            type="text"
            placeholder="请输入编号"
            style="width:80%;"
            v-model.number="form.no"
            maxlength="2"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="账号:">
          <!-- <span>{{form.username}}</span> -->
          <el-input v-model="form.username" placeholder="请输入账号" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item v-if="level >= form.level" label="原密码:">
          <el-input
            v-model="form.pwd"
            placeholder="请输入原密码"
            show-password
            id="pwd"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改后密码:">
          <el-input
            v-model="form.passworded"
            placeholder="请输入修改后密码"
            show-password
            style="width:80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlecloses">取 消</el-button>
        <el-button type="primary" @click="handleEditList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加权限" :visible.sync="centerDialogVisible2" width="30%" center>
      <el-form ref="form1" :model="form1" :rules="rules1" label-width="100px">
        <el-form-item label="权限角色：" prop="role_name">
          <el-select v-model="form1.role_name" @change="role" placeholder="请选择">
            <el-option
              v-for="item in userRoleList"
              :key="item.value"
              :label="item.role_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级：" prop="Access">
          <el-select v-model="form1.Access" placeholder="请选择">
            <el-option
              v-for="item in Access_level"
              :key="item.id"
              :label="item.access"
              :value="item.access"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门：">
          <el-select v-model="form1.department_id" placeholder="请选择部门">
            <el-option v-for="item in branch" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEditUserListClose('form1')">取 消</el-button>
        <el-button type="primary" @click="handleEditUserList('form1')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加账户"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="centerDialogVisible3"
      width="30%"
      center
    >
      <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px">
        <el-form-item label="用户名：" prop="name">
          <el-input v-model="form2.name" style="width:80%" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="no">
          <el-input
            type="text"
            placeholder="请输入编号"
            style="width:80%;"
            v-model.number="form2.no"
            maxlength="2"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="department">
          <el-select v-model="form2.department_id" placeholder="请选择部门">
            <el-option v-for="item in branch" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="username">
          <el-input v-model="form2.username" style="width:80%" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form2.password" style="width:80%" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="权限等级：" prop="level">
          <el-select v-model="form2.level" placeholder="权限等级">
            <el-option
              v-for="item in Access_level"
              :key="item.id"
              :label="item.access"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色：" prop="role">
          <el-select v-model="form2.role" placeholder="用户角色">
            <el-option
              v-for="item in userRoleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlecloseAccounts('form2')">取 消</el-button>
        <el-button type="primary" @click="handleaddAccounts('form2')">确 定</el-button>
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
  register,
  userStatusEdit,
  departmentSelect,
} from "@/api/setting.js";
export default {
  data() {
    return {
      permission: [],
      tableData: [],
      centerDialogVisible: false, //添加分类
      centerDialogVisible1: false, //编辑分类
      centerDialogVisible2: false, //编辑分类
      centerDialogVisible3: false, //编辑分类
      region: "",
      form: {
        goods_category_name: "",
        describe: "",
        sort: "",
      },
      form2: {
        name: "",
        username: "",
        password: "",
        level: "",
        role: "",
      },
      form1: { role_name: "", Access: "" },
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
        no: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" },
        ],
      },
      rules2: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        level: [
          { required: true, message: "请选择权限等级", trigger: "change" },
        ],
        department_id: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
        role: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        no: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" },
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
      level: 0,
      branch: [],
    };
  },
  methods: {
    async department() {
      let res = await departmentSelect();
      this.branch = res.data.data;
    },
    async get_switch_active(index, row) {
      let res = await userStatusEdit({ user_id: row.id, status: row.status });
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }

      this.init();
    },
    handlecloseAccounts(form) {
      this.$refs[form].resetFields();
      this.centerDialogVisible3 = false;
    },
    handlecloses() {
      this.$refs["form"].resetFields();
      this.form = {};
      this.init()
      this.centerDialogVisible1 = false;
    },
    async handleaddAccounts(form) {
      this.$refs["form2"].validate(async (valid) => {
        if (!valid) return;
        if (this.form2.no < 0) {
          this.$message({
            showClose: true,
            message: "请输入大于0的编号",
            type: "error",
          });
        } else {
          let res = await register(this.form2);
          console.log(res);
          if (res.data.error_code === 1) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.centerDialogVisible3 = false;
            this.$refs[form].resetFields();
            this.init();
          }
        }
      });
    },
    async addAccounts() {
      this.centerDialogVisible3 = true;
    },
    handleEditUserListClose(form) {
      this.$refs[form].resetFields();
      this.centerDialogVisible2 = false;
    },
    role(val) {
      this.userRoleList.map((v, i) => {
        if (val == v.id) {
          this.form1.role_id = val;
          this.form1.role_name = v.role_name;
        }
      });
    },
    async handleEditUserList(form) {
      if (this.form1.Access === "管理") {
        this.form1.level = 1;
      }
      if (this.form1.Access === "普通") {
        this.form1.level = 2;
      }
      delete this.form1.Access;
      let res = await userEdit(this.form1);
      this.$refs[form].resetFields();
      this.centerDialogVisible2 = false;
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }
      this.init();
    },
    setUser(row, column, cell, event) {
      if (
        localStorage.getItem("level") >= row.level &&
        column.label == "操作"
      ) {
        if (localStorage.getItem("user_id") != row.id) {
          cell.childNodes[0].childNodes[0].style.cursor = "not-allowed";
          cell.childNodes[0].childNodes[1].style.cursor = "not-allowed";
        } else if (localStorage.getItem("user_id") == row.id) {
          cell.childNodes[0].childNodes[1].style.cursor = "not-allowed";
        }
      }
    },
    async handleEditUser(index, row) {
      //  localStorage.getItem("level")
      // localStorage.setItem("user_id");
      // if (localStorage.getItem("level") == 0) {
      console.log(row);
      if (localStorage.getItem("level") < row.level) {
        this.form1.role_name = row.role_name;
        this.form1.Access = row.Access;
        this.form1.name = row.name;
        this.form1.id = row.id;
        this.form1.role_id = row.role;
        this.form1.department_id = row.department_id;
        this.centerDialogVisible2 = true;
      }

      // }
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
    async handleEditList() {
      // this.$refs["form"].validate(async (valid) => {
      //   if (!valid) return;
      let srt = "";
      // this.branch.map((v,i)=>{
      //   if(this.form.department==v.name)
      // })
      if (this.form.no < 0) {
        this.$message({
          showClose: true,
          message: "请输入大于0的编号",
          type: "error",
        });
      } else {
        let res = await userPassEdit({
          id: this.form.id,
          username: this.form.username,
          name: this.form.name,
          oldpass: this.form.pwd,
          newpass: this.form.passworded,
          no: this.form.no,
        });

        if (res.data.error_code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      }

      console.log(res);
      this.centerDialogVisible1 = false;
      // });
    },
    async handleEdit(index, row) {
      if (
        localStorage.getItem("level") < row.level ||
        localStorage.getItem("user_id") == row.id
      ) {
        this.form.pwd = "";
        this.form.passworded = "";
        this.form = row;
        this.form.no = Number(row.no);
        this.centerDialogVisible1 = true;
      }
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
      });
      let { data, count } = res.data;
      this.tableData = data;
      this.total = count;
    },
  },
  async mounted() {
    this.init();
    let res = await getRoleSelect();
    this.userRoleList = res.data.data;
    this.department();
    this.level = localStorage.getItem("level");
    this.permission = localStorage.getItem("permission").split(",");
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
  /deep/.el-dialog__body {
    padding: 25px 90px 30px;
  }
}
// materialManagement
</style>