<template>
  <div class="authorityManagement">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="left">
        <el-table
          :data="role_list"
          row-key="id"
          border
          size="mini"
          :tree-props="{children: 'color_data' , hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="role_name" label="名称" width="90"></el-table-column>
          <el-table-column prop="remarks" :show-overflow-tooltip="true" label="备注" width="210"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
              <div class="el-icon-delete btn" @click="handleDelete(scope.$index, scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <div class="role_info">
          <div class="role_info_name">
            <div class="role_info_tit">角色信息</div>
            <div class="role_info_con">提示: 员工的角色权限修改后需要退出重新登录才会生效。</div>
          </div>
          <el-button type="primary" size="mini" @click="handleAddRole">新增角色</el-button>
        </div>
        <div class="role_form">
          <el-form :inline="true" :model="form" ref="form" :rules="rules" class="demo-form-inline">
            <el-form-item label="名称" prop="role_name">
              <el-input v-model="form.role_name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remarks" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="role_table">
          <!-- <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="姓名" width="180">
              <template slot-scope="scope">
                <div>aa</div>
                <div>bb</div>
              </template>
            </el-table-column>
            <el-table-column label="地址">
              <template slot-scope="scope">
                <div>aa</div>
                <div>bb</div>
                <div>cc</div>
              </template>
            </el-table-column>
          </el-table>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roleList, roleAdd } from "@/api/setting.js";
export default {
  data() {
    return {
      role_list: [],
      form: {
        role_name: "",
        remarks: "",
        power: []
      },
      // 表单规则
      rules: {
        role_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      },
      tableData: [
        {
          id: ""
        },
        {
          id: ""
        }
      ]
    };
  },
  methods: {
    async handleAddRole() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        let res = await roleAdd(this.form);
        console.log(res);
        this.init();
      });
    },
    async init() {
      let res = await roleList();
      console.log(res);
      let { data } = res.data;
      this.role_list = data;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.authorityManagement {
  .main {
    display: flex;
    min-height: 800px;

    .left {
      padding: 10px 5px 0 0;
      width: 400px;
      position: relative;
      .pagination {
        position: absolute;
        left: -50px;
        bottom: 360px;
      }
      .btn {
        margin: 0 10px;
      }
    }
    .right {
      padding: 10px 0 0 5px;
      flex: 1;
      .role_info {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #000;
        .role_info_name {
          display: flex;
          align-items: center;
          .role_info_tit {
            font-size: 14px;
            font-weight: 600;
            margin-right: 10px;
          }
          .role_info_con {
            font-size: 10px;
            color: #ccc;
          }
        }
      }
      .role_form {
        padding: 5px;
      }
      .role_table {
      }
    }
  }
}
</style>