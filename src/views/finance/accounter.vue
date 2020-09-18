<template>
  <div class="accounter" v-if="permission.indexOf('accounter')!=-1">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>财务</el-breadcrumb-item>
        <el-breadcrumb-item>结算帐户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
      @click="dialogVisible = true"
      v-if="permission.indexOf('balance_account_add')!=-1"
      class="addStyle"
    >新增帐户</div>

    <div class="table" style="width: 100%;margin:10px 0">
      <el-table size="mini" :data="data" border style="width: 100%">
        <el-table-column fixed prop="account_name" label="账户名称"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="开户人"></el-table-column>
        <el-table-column prop="user_name" label="使用人"></el-table-column>
        <el-table-column prop="account_type" label="帐户类型"></el-table-column>
        <el-table-column prop="balance" label="当前余额"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="statusName" label="状态"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip
              content="编辑"
              placement="top"
              v-if="permission.indexOf('balance_account_edit')!=-1&&scope.row.is_origin!=1"
              class="el-icon-edit btn"
            >
              <div @click="handleEdit(scope.$index, scope.row)"></div>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
              v-if="permission.indexOf('balance_account_del')!=-1&&scope.row.is_origin!=1"
              class="el-icon-delete btn"
            >
              <div @click="handleDelete(scope.$index, scope.row)"></div>
            </el-tooltip>
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
      <el-form :model="obj" :rules="rules" ref="obj" label-width="100px" class="demo-form">
        <el-form-item label="账户名称" prop="account_name">
          <el-input v-model="obj.account_name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="obj.account" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="开户人" prop="name">
          <el-input v-model="obj.name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="使用人">
          <el-select v-model="obj.user_id" style="width:80%">
            <el-option v-for="item in userlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="obj.status" style="width:80%">
            <el-radio :label="'1'">启用</el-radio>
            <el-radio :label="'0'">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账户类型" prop="account_type">
          <el-select v-model="obj.account_type" style="width:80%">
            <el-option
              v-for="item in balance"
              :key="item.id"
              :label="item.balance_account_type"
              :value="item.balance_account_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="obj.remarks" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="obj.sort" style="width:80%" @input="handleInput"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditForm('obj')">提 交</el-button>
        <el-button @click="handleEditClose('obj')">取 消</el-button>
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
        <el-form-item label="账户名称" prop="account_name">
          <el-input v-model="form.account_name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="开户人" prop="name">
          <el-input v-model="form.name" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="使用人">
          <el-select v-model="form.user_id" style="width:80%">
            <el-option v-for="item in userlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status" style="width:80%">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账户类型" prop="account_type">
          <el-select v-model="form.account_type" style="width:80%">
            <el-option
              v-for="item in balance"
              :key="item.id"
              :label="item.balance_account_type"
              :value="item.balance_account_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" style="width:80%" @input="handleInput"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddForm('form')">提 交</el-button>
        <el-button @click="handleClose('form')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import {
  balanceAccountTypeSelect,
  balanceAccountAdd,
  balanceAccountInfo,
  balanceAccountEdit,
  balanceAccountDel,
  balanceAccountList,
} from "@/api/finance";
import { getStylistList } from "@/api/researchDevelopment";
export default {
  data() {
    return {
      power: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      data: [],
      balance: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        account_name: "",
        account: "",
        name: "",
        user_id: "",
        account_type: "",
        remarks: "",
        sort: "",
        status: 1,
      },
      obj: {
        account_name: "",
        account: "",
        name: "",
        user_id: "",
        account_type: "",
        remarks: "",
        sort: "",
        status: 1,
      },
      rules: {
        account_name: [
          { required: true, message: "账户名称", trigger: "blur" },
        ],
      },
      userlist: [],
      permission: [],
    };
  },
  methods: {
    async handleAddForm(form) {
      // console.log(this.form);
      this.form.sort = Number(this.form.sort);
      let res = await balanceAccountAdd(this.form);
      console.log(res);
      this.$refs[form].resetFields();
      this.init();
      this.dialogVisible = false;
    },
    async handleEditForm(form) {
      // console.log(this.obj);
      delete this.obj.balance;
      this.obj.sort = Number(this.obj.sort);
      let res = await balanceAccountEdit(this.obj);
      console.log(res);
      this.$refs[form].resetFields();
      this.init();
      this.dialogVisible1 = false;
    },
    handleEditClose(form) {
      this.$refs[form].resetFields();
      this.dialogVisible1 = false;
      this.init();
    },
    async handleEdit(index, row) {
      // let res = await balanceAccountInfo({
      //   id: row.id,
      // });
      this.obj = row;
      this.obj.user_id = Number(row.user_id);
      console.log(this.obj);
      this.dialogVisible1 = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await balanceAccountDel({ id: row.id });
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
    handleClose(form) {
      this.$refs[form].resetFields();
      this.form = {
        account_name: "",
        account: "",
        name: "",
        account_type: "",
        remarks: "",
        sort: "",
        status: 1,
      };
      this.dialogVisible = false;
    },
    handleInput() {
      this.form.sort = this.form.sort.replace(/[^0-9-]+/, "");
    },
    handleClick(row) {},
    async get_balance() {
      let res = await balanceAccountTypeSelect();
      console.log(res);
      this.balance = res.data.data;
    },
    handleInput() {
      this.form.sort = this.form.sort.replace(/[^0-9-]+/, "");
    },
    handleObjInput() {
      this.obj.sort = this.obj.sort.replace(/[^0-9-]+/, "");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async user() {
      let res = await getStylistList();
      this.userlist = res.data.data;
    },
    async init() {
      let res = await balanceAccountList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      res.data.data.map((v, i) => {
        if (v.status === "1") {
          v["statusName"] = "启用";
        }
        if (v.status === "0") {
          v["statusName"] = "停用";
        }
      });
      let { data, count } = res.data;
      this.data = data;
      this.total = count;
    },
  },
  mounted() {
    this.get_balance();
    this.init();
    this.user();
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.accounter {
  .addStyle {
    margin: 0 30px 0px 0px;
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
  .pagination {
    margin-top: 10px;
    text-align: right;
  }
  .table {
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
  }
}
</style>