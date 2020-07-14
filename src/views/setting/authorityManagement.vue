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
          <el-table-column prop="role_name" label="名称" width="90" :show-overflow-tooltip="true"></el-table-column>
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
        <div class="power_list">
          <div class="power_list_tlt">
            <div class="power_list_tlt_A">一级</div>
            <div class="power_list_tlt_B">二级</div>
            <div class="power_list_tlt_C">三级</div>
          </div>
          <div v-for="(item, index) in form.power" :key="index" style="display:flex;">
            <div class="stair" :style="item.children*height">
              <el-checkbox v-model="item.checked">{{item.power_name}}</el-checkbox>
            </div>
            <div>
              <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                <div class="second_level" :style="height">
                  <el-checkbox
                    v-model="item1.checked"
                    v-if="item1.power_name!=='0'"
                  >{{item1.power_name}}</el-checkbox>
                </div>
                <div class="three_level_A">
                  <div v-for="(item2, index2) in item1.children" :key="index2">
                    <div class="three_level_B">
                      <el-checkbox
                        v-model="item2.checked"
                        v-if="item2.power_name!=='0'"
                      >{{item2.power_name}}</el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  roleList,
  roleAdd,
  powerList,
  getPower,
  getRole
} from "@/api/setting.js";
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
      checked: false,
      height: "60px"
    };
  },
  methods: {
    handleEdit(index, row) {
      getRole({ id: row.id }).then(res => {
        //console.log(JSON.parse(res.data.data[0].power));
        //let power =JSON.parse(res.data.data[0].power);
        //let powers =JSON.parse(res.data);
        console.log(res.data);
         //powers.map((v, i) => {
         //  console.log(v);
         //});
        //console.log(res.data.data[0].power)
      });
    },
    async getPowerList() {
      let res = await getPower();
      res.data.data.map((v, i) => {
        if (v.children.length === 0) {
          v.children.push({ power_name: "0", children: [] });
          v.children.map((v1, i1) => {
            v1.children.push({ power_name: "0" });
          });
        }
      });
      res.data.data.map((v, i) => {
        v["checked"] = false;
        v.children.map((v1, i1) => {
          v["checked"] = false;
          v1.children.map((v2, i2) => {
            v2["checked"] = false;
          });
        });
      });
      this.form.power = res.data.data;
    },
    async handleAddRole() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        let res = await roleAdd(this.form);
        console.log(res);
        this.form.role_name = "";
        this.form.remarks = "";
        this.init();
      });
    },
    async init() {
      let res = await roleList();
      let { data } = res.data;
      this.role_list = data;
    }
  },
  mounted() {
    this.init();
    this.getPowerList();
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
        border-bottom: 1px solid #ccc;
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
      .power_list {
        .power_list_tlt {
          display: flex;
          .power_list_tlt_A {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 30px;
            border: 1px solid #ccc;
          }
          .power_list_tlt_B {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 120px;
            height: 30px;
            border: 1px solid #ccc;
          }
          .power_list_tlt_C {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 600px;
            height: 30px;
            border: 1px solid #ccc;
          }
        }
        .stair {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
        }
        .second_level {
          width: 120px;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .three_level_A {
          width: 600px;
          height: 60px;
          border: 1px solid #ccc;
          .three_level_B {
            float: left;
            height: 20px;
            line-height: 20px;
            padding: 0 5px;
          }
        }
      }
    }
  }
}
</style>