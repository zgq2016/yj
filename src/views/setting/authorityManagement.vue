<template>
  <div class="authorityManagement">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="left">
        <el-table
          :data="role_list"
          row-key="id"
          border
          size="mini"
          @cell-click="cellclick"
          :tree-props="{children: 'color_data' , hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="role_name" label="名称" width="90" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="remarks" :show-overflow-tooltip="true" label="备注" width="160"></el-table-column>
          <el-table-column align="center" label="操作">
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
      </div>
      <div class="right" v-if="status===1">
        <div class="role_info">
          <div class="role_info_name">
            <div class="role_info_tit">角色信息</div>
            <div class="role_info_con">提示: 员工的角色权限修改后需要退出重新登录才会生效。</div>
          </div>
          <el-button type="primary" size="mini" @click="handleAddRole">新增角色</el-button>
        </div>
        <div class="role_form">
          <el-form :inline="true" :model="form" ref="form" :rules="rules" class="demo-form-inline">
            <el-form-item prop="role_name">
              <el-input v-model="form.role_name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
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
          <div>
            <div v-for="(item, index) in form.power" :key="index" style="display:flex;">
              <div class="stair" :style="item.children*height">
                <el-checkbox
                  v-model="item.checked"
                  @change="stair_checked_add(item,index)"
                >{{item.power_name}}</el-checkbox>
              </div>
              <div>
                <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                  <div class="second_level" :style="height">
                    <el-checkbox
                      v-model="item1.checked"
                      v-if="item1.power_name!=='0'"
                      @change="second_checked_add(item,index,item1,index1)"
                    >{{item1.power_name}}</el-checkbox>
                  </div>
                  <div class="three_level_A">
                    <div v-for="(item2, index2) in item1.children" :key="index2">
                      <div class="three_level_B">
                        <el-checkbox
                          v-model="item2.checked"
                          v-if="item2.power_name!=='0'"
                          @change="three_checked_add(item,index,item1,index1,item2,index2)"
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
      <div class="right" v-if="status===2">
        <div class="role_info">
          <div class="role_info_name">
            <div class="role_info_tit">角色信息</div>
            <div class="role_info_con">提示: 员工的角色权限修改后需要退出重新登录才会生效。</div>
          </div>
          <el-button type="primary" size="mini" @click="handleEditRole">保存修改</el-button>
        </div>
        <div class="role_form">
          <el-form :inline="true" :model="obj" ref="obj" :rules="rules1" class="demo-form-inline">
            <el-form-item label="名称" prop="role_name">
              <el-input v-model="obj.role_name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="obj.remarks" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="power_list">
          <div class="power_list_tlt">
            <div class="power_list_tlt_A">一级</div>
            <div class="power_list_tlt_B">二级</div>
            <div class="power_list_tlt_C">三级</div>
          </div>
          <div v-for="(item, index) in obj.power.power" :key="index" style="display:flex;">
            <div class="stair" :style="item.children*height">
              <el-checkbox
                v-model="item.checked"
                @change="stair_checked_edit1(item,index)"
              >{{item.power_name}}</el-checkbox>
            </div>
            <div>
              <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                <div class="second_level" :style="height">
                  <el-checkbox
                    v-model="item1.checked"
                    v-if="item1.power_name!=='0'"
                    @change="second_checked_edit1(item,index,item1,index1)"
                  >{{item1.power_name}}</el-checkbox>
                </div>
                <div class="three_level_A">
                  <div v-for="(item2, index2) in item1.children" :key="index2">
                    <div class="three_level_B">
                      <el-checkbox
                        v-model="item2.checked"
                        v-if="item2.power_name!=='0'"
                        @change="three_checked_edit1(item,index,item1,index1,item2,index2)"
                      >{{item2.power_name}}</el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in obj.power" :key="index" style="display:flex;">
            <div class="stair" :style="item.children*height">
              <el-checkbox
                v-model="item.checked"
                @change="stair_checked_edit(item,index)"
              >{{item.power_name}}</el-checkbox>
            </div>
            <div>
              <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                <div class="second_level" :style="height">
                  <el-checkbox
                    v-model="item1.checked"
                    v-if="item1.power_name!=='0'"
                    @change="second_checked_edit(item,index,item1,index1)"
                  >{{item1.power_name}}</el-checkbox>
                </div>
                <div class="three_level_A">
                  <div v-for="(item2, index2) in item1.children" :key="index2">
                    <div class="three_level_B">
                      <el-checkbox
                        v-model="item2.checked"
                        v-if="item2.power_name!=='0'"
                        @change="three_checked_edit(item,index,item1,index1,item2,index2)"
                      >{{item2.power_name}}</el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-if="status===3">
        <div class="role_info">
          <div class="role_info_name">
            <div class="role_info_tit">角色信息</div>
            <div class="role_info_con">提示: 员工的角色权限修改后需要退出重新登录才会生效。</div>
          </div>
          <!-- <el-button type="primary" size="mini" @click="handleEditRole">编辑角色</el-button> -->
        </div>
        <div class="role_form">
          <el-form :inline="true" :model="obj" ref="obj" :rules="rules1" class="demo-form-inline">
            <el-form-item label="名称" prop="role_name">
              <div>{{obj.role_name}}</div>
            </el-form-item>
            <el-form-item label="备注">
              <div>{{obj.remarks}}</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="power_list">
          <div class="power_list_tlt">
            <div class="power_list_tlt_A">一级</div>
            <div class="power_list_tlt_B">二级</div>
            <div class="power_list_tlt_C">三级</div>
          </div>
          <div v-for="(item, index) in obj.power.power" :key="index" style="display:flex;">
            <div class="stair" :style="item.children*height">
              <el-checkbox v-model="item.checked" disabled>{{item.power_name}}</el-checkbox>
            </div>
            <div>
              <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                <div class="second_level" :style="height">
                  <el-checkbox
                    v-model="item1.checked"
                    disabled
                    v-if="item1.power_name!=='0'"
                  >{{item1.power_name}}</el-checkbox>
                </div>
                <div class="three_level_A">
                  <div v-for="(item2, index2) in item1.children" :key="index2">
                    <div class="three_level_B">
                      <el-checkbox
                        v-model="item2.checked"
                        disabled
                        v-if="item2.power_name!=='0'"
                      >{{item2.power_name}}</el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in obj.power" :key="index" style="display:flex;">
            <div class="stair" :style="item.children*height">
              <el-checkbox v-model="item.checked" disabled>{{item.power_name}}</el-checkbox>
            </div>
            <div>
              <div v-for="(item1, index1) in item.children" :key="index1" style="display:flex">
                <div class="second_level" :style="height">
                  <el-checkbox
                    v-model="item1.checked"
                    v-if="item1.power_name!=='0'"
                    disabled
                  >{{item1.power_name}}</el-checkbox>
                </div>
                <div class="three_level_A">
                  <div v-for="(item2, index2) in item1.children" :key="index2">
                    <div class="three_level_B">
                      <el-checkbox
                        v-model="item2.checked"
                        v-if="item2.power_name!=='0'"
                        disabled
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
  getRole,
  roleEdit,
  roleDel,
} from "@/api/setting.js";
import loginVue from "../login.vue";
export default {
  data() {
    return {
      role_list: [],
      form: {
        role_name: "",
        remarks: "",
        power: [],
      },
      obj: {},
      // 表单规则
      rules: {
        role_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
      },
      // 表单规则
      rules1: {
        role_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
      },
      checked: false,
      height: "100px",
      status: 1,
    };
  },
  methods: {
    three_checked_edit1(e, i, e1, i1, e2, i2) {
      console.log(e, i, e1, i1, e2, i2);
      this.obj.power.power.map((x, y) => {
        if (i === y && e2.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === true) {
              x1.checked = true;
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === true) {
                  // x2.checked = true;
                }
              });
            }
          });
        }
        if (i === y && e2.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === false) {
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === false) {
                  x2.checked = false;
                }
              });
            }
          });
        }
      });
    },
    second_checked_edit1(e, i, e1, i1) {
      console.log(e, e1, i, i1);
      this.obj.power.power.map((x, y) => {
        if (i === y && e1.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === true) {
              x1.children.map((x2, y2) => {
                x2.checked = true;
              });
            }
          });
        }
        if (i === y && e1.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === false) {
              x1.children.map((x2, y2) => {
                x2.checked = false;
              });
            }
          });
        }
      });
    },
    stair_checked_edit1(e, i) {
      this.obj.power.power.map((x, y) => {
        if (i === y && e.checked === true) {
          x.children.map((x1, y1) => {
            x1.checked = true;
            x1.children.map((x2, y2) => {
              x2.checked = true;
            });
          });
        }
        if (i === y && e.checked === false) {
          x.children.map((x1, y1) => {
            x1.checked = false;
            x1.children.map((x2, y2) => {
              x2.checked = false;
            });
          });
        }
      });
    },
    three_checked_edit(e, i, e1, i1, e2, i2) {
      console.log(e, i, e1, i1, e2, i2);
      this.obj.power.map((x, y) => {
        if (i === y && e2.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === true) {
              x1.checked = true;
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === true) {
                  // x2.checked = true;
                }
              });
            }
          });
        }
        if (i === y && e2.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === false) {
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === false) {
                  x2.checked = false;
                }
              });
            }
          });
        }
      });
    },
    second_checked_edit(e, i, e1, i1) {
      console.log(e, e1, i, i1);
      this.obj.power.map((x, y) => {
        if (i === y && e1.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === true) {
              x1.children.map((x2, y2) => {
                x2.checked = true;
              });
            }
          });
        }
        if (i === y && e1.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === false) {
              x1.children.map((x2, y2) => {
                x2.checked = false;
              });
            }
          });
        }
      });
    },
    stair_checked_edit(e, i) {
      this.obj.power.map((x, y) => {
        if (i === y && e.checked === true) {
          x.children.map((x1, y1) => {
            x1.checked = true;
            x1.children.map((x2, y2) => {
              x2.checked = true;
            });
          });
        }
        if (i === y && e.checked === false) {
          x.children.map((x1, y1) => {
            x1.checked = false;
            x1.children.map((x2, y2) => {
              x2.checked = false;
            });
          });
        }
      });
    },
    three_checked_add(e, i, e1, i1, e2, i2) {
      console.log(e, i, e1, i1, e2, i2);
      this.form.power.map((x, y) => {
        if (i === y && e2.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === true) {
              x1.checked = true;
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === true) {
                  // x2.checked = true;
                }
              });
            }
          });
        }
        if (i === y && e2.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e2.checked === false) {
              x1.children.map((x2, y2) => {
                if (i2 === y2 && e2.checked === false) {
                  x2.checked = false;
                }
              });
            }
          });
        }
      });
    },
    second_checked_add(e, i, e1, i1) {
      console.log(e, e1, i, i1);
      this.form.power.map((x, y) => {
        if (i === y && e1.checked === true) {
          x.checked = true;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === true) {
              x1.children.map((x2, y2) => {
                x2.checked = true;
              });
            }
          });
        }
        if (i === y && e1.checked === false) {
          // x.checked = false;
          x.children.map((x1, y1) => {
            if (i1 === y1 && e1.checked === false) {
              x1.children.map((x2, y2) => {
                x2.checked = false;
              });
            }
          });
        }
      });
    },
    stair_checked_add(e, i) {
      this.form.power.map((x, y) => {
        if (i === y && e.checked === true) {
          x.children.map((x1, y1) => {
            x1.checked = true;
            x1.children.map((x2, y2) => {
              x2.checked = true;
            });
          });
        }
        if (i === y && e.checked === false) {
          x.children.map((x1, y1) => {
            x1.checked = false;
            x1.children.map((x2, y2) => {
              x2.checked = false;
            });
          });
        }
      });
    },
    cellclick(row, column, cell, event) {
      getRole({ id: row.id }).then((res) => {
        let obj = {};
        obj["power"] = JSON.parse(res.data.data[0].power);
        obj["remarks"] = res.data.data[0].remarks;
        obj["role_name"] = res.data.data[0].role_name;
        obj["id"] = res.data.data[0].id;
        this.obj = obj;
        // console.log(this.obj);
        this.status = 3;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await roleDel({ id: row.id });
          this.status = 1;
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
    handleEdit(index, row) {
      getRole({ id: row.id }).then((res) => {
        // console.log(res);
        let obj = {};
        obj["power"] = JSON.parse(res.data.data[0].power);
        obj["remarks"] = res.data.data[0].remarks;
        obj["role_name"] = res.data.data[0].role_name;
        obj["id"] = res.data.data[0].id;
        this.obj = obj;
        // console.log(this.obj);
        this.status = 2;
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
          v1["checked"] = false;
          v1.children.map((v2, i2) => {
            v2["checked"] = false;
          });
        });
      });
      this.form.power = res.data.data;
      // console.log(this.form.power);
      this.status = 1;
    },
    async handleAddRole() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        let res = await roleAdd(this.form);
        console.log(res);
        this.form.role_name = "";
        this.form.remarks = "";
        this.form.power.map((v, i) => {
          v["checked"] = false;
          v.children.map((v1, i1) => {
            v1["checked"] = false;
            v1.children.map((v2, i2) => {
              v2["checked"] = false;
            });
          });
        });
        this.status = 1;
        this.init();
      });
    },
    async handleEditRole() {
      this.$refs["obj"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        let obj = {};
        // console.log(this.obj);
        if (this.obj.power.length != undefined) {
          obj["power"] = this.obj.power;
        }
        if (this.obj.power.length == undefined) {
          obj["power"] = this.obj.power.power;
        }
        // obj["power"] = this.obj.power;
        obj["remarks"] = this.obj.remarks;
        obj["role_name"] = this.obj.role_name;
        obj["id"] = this.obj.id;
        let res = await roleEdit(obj);
        console.log(res);
        this.obj.role_name = "";
        this.obj.remarks = "";
        if (this.obj.power.length != undefined) {
          this.obj.power.map((v, i) => {
            v["checked"] = false;
            v.children.map((v1, i1) => {
              v["checked"] = false;
              v1.children.map((v2, i2) => {
                v2["checked"] = false;
              });
            });
          });
        }
        if (this.obj.power.length == undefined) {
          this.obj.power.power.map((v, i) => {
            v["checked"] = false;
            v.children.map((v1, i1) => {
              v["checked"] = false;
              v1.children.map((v2, i2) => {
                v2["checked"] = false;
              });
            });
          });
        }

        this.status = 1;
        this.init();
        this.getPowerList();
      });
    },
    async init() {
      let res = await roleList();
      let { data } = res.data;
      this.role_list = data;
    },
  },
  mounted() {
    this.init();
    this.getPowerList();
  },
};
</script>

<style lang="less" scoped>
.authorityManagement {
  .main {
    display: flex;
    min-height: 800px;
    /deep/ .el-input__inner {
      width: 100%;
      height: 30px;
      background-color: #f2f2f2;
      border-radius: 15px;
      border: none;
      color: #5e5e5e;
      font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
        \\5b8b\4f53, sans-serif;
    }

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
            width: 150px;
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
          width: 150px;
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