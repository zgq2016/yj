<template>
  <div class="warehouseSet" v-if="power.indexOf('C5000400')!=-1">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>库存设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="header">
        <el-form style="float:left" :inline="true" :model="form">
          <el-form-item>
            <el-input v-model="form.storehouse_name" size="small" placeholder="请输入仓库名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              size="mini"
              circle
              class="search_button"
              @click="onSubmit"
            ></el-button>
          </el-form-item>
        </el-form>
        <el-form style="float:right">
          <el-button
            size="small"
            type="primary"
            @click="addWarehouse"
            v-if="power.indexOf('C5000100')!=-1"
          >+增加仓库</el-button>
        </el-form>
      </div>
    </div>
    <div class="center table">
      <el-table :data="ware" row-key="id" size="mini"> 
        <el-table-column align="center" width="90" label="操作">
          <template slot-scope="scope">
            <div
              style="width:20px;float:left"
              class="el-icon-edit btn"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="power.indexOf('C5000300')!=-1"
            ></div>
            <div
              style="width:20px;float:right"
              class="el-icon-delete btn"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="power.indexOf('C5000200')!=-1"
            ></div>
          </template>
        </el-table-column>
        <el-table-column property="storehouse_name" align="center" label="仓库名称"></el-table-column>
        <el-table-column property="contacts" align="center" label="负责人"></el-table-column>
        <el-table-column property="storehouse_type" align="center" label="仓库类型"></el-table-column>
        <el-table-column property="remarks" align="center" label="备注"></el-table-column>
        <el-table-column property="ctime" width="90" align="center" label="创建时间"></el-table-column>
        <el-table-column property="utime" width="90" align="center" label="更新时间"></el-table-column>
        <el-table-column property="sort" align="center" label="排序"></el-table-column>
        <el-table-column property="state" align="center" label="状态"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
    <!-- 新建 -->
    <el-dialog
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="新增仓库"
      width="50%"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form1" :rules="rules1" :model="form1">
        <el-form-item prop="storehouse_name" label="仓库名称：" label-width="25%">
          <el-input style="width:60%" placeholder="请输入仓库名称" v-model="form1.storehouse_name"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="仓库负责人：" label-width="25%">
          <el-select style="width:60%" v-model="form1.contacts" placeholder="请选择仓库负责人">
            <el-option v-for="item in user" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="storehouse_type" label="仓库类型：" label-width="25%">
          <el-select style="width:60%" v-model="form1.storehouse_type" placeholder="请选择仓库类型">
            <el-option v-for="item in genre" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state" label="状态：" label-width="25%">
          <el-select style="width:60%" v-model="form1.state" placeholder="请选择状态">
            <el-option v-for="item in invoke" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" label-width="25%">
          <el-input style="width:60%" v-model="form1.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="25%">
          <el-input style="width:60%" type="textarea" :rows="3" v-model="form1.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit">提交</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="仓库信息"
      width="50%"
      :visible.sync="dialogFormVisible1"
    >
      <el-form ref="form2" :rules="rules2" :model="form2">
        <el-form-item prop="storehouse_name" label="仓库名称：" label-width="25%">
          <el-input style="width:60%" placeholder="请输入仓库名称" v-model="form2.storehouse_name"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="仓库负责人：" label-width="25%">
          <el-select style="width:60%" v-model="form2.contacts" placeholder="请选择仓库负责人">
            <el-option v-for="item in user" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="storehouse_type" label="仓库类型：" label-width="25%">
          <el-select style="width:60%" v-model="form2.storehouse_type" placeholder="请选择仓库类型">
            <el-option v-for="item in genre" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state" label="状态：" label-width="25%">
          <el-select style="width:60%" v-model="form2.state" placeholder="请选择状态">
            <el-option v-for="item in invoke" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" label-width="25%">
          <el-input style="width:60%" v-model="form2.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="25%">
          <el-input style="width:60%" type="textarea" :rows="3" v-model="form2.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit1">提交</el-button>
        <el-button @click="backtrack">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList } from "@/api/setting.js";
import { getStylistList } from "@/api/researchDevelopment.js";
import {
  storehouseAdd, //新增仓库接口
  storehouseEdit, //编辑仓库接口
  storehouseDel, //删除仓库接口
  storehouseList, // 查看仓库接口
} from "@/api/warehouse.js";
export default {
  data() {
    return {
      power: "",
      // 数据表
      form: {
        name: "",
      },
      // 新建
      form1: {},
      // 编辑
      form2: {},
      // 新建校对
      rules1: {
        storehouse_name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
        ],
        contacts: [
          { required: true, message: "请选择仓库负责人", trigger: "change" },
        ],
        storehouse_type: [
          { required: true, message: "请选择仓库类型", trigger: "change" },
        ],
        state: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
      },
      // 编辑校对
      rules2: {
        storehouse_name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
        ],
        contacts: [
          { required: true, message: "请选择仓库负责人", trigger: "change" },
        ],
        storehouse_type: [
          { required: true, message: "请选择仓库类型", trigger: "change" },
        ],
        state: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
      },
      ware: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      invoke: [
        { name: "启用", id: 1 },
        { name: "关闭", id: 0 },
      ],
      genre: [
        { name: "产品仓库", id: 0 },
        { name: "物料仓库", id: 1 },
      ],
      user: [],
      page: 1,
      page_size: 9,
      count: 0,
    };
  },
  methods: {
    onSubmit() {
      this.init(this.form);
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.form2 = row;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该行数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await storehouseDel({
            id: row.id,
          });
          // console.log(res);
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
    addWarehouse() {
      this.form1 = {};
      this.dialogFormVisible = true;
    },
    // 新增仓库
    Submit() {
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return;
        this.dialogFormVisible = false;
        let res = await storehouseAdd({
          storehouse_name: this.form1.storehouse_name,
          contacts: this.form1.contacts,
          storehouse_type: this.form1.storehouse_type,
          state: this.form1.state,
          sort: this.form1.sort,
          remarks: this.form1.remarks,
        });
        // console.log(res);
        this.init();
      });
    },
    // 编辑库存设置
    Submit1() {
      this.$refs["form2"].validate(async (valid) => {
        if (!valid) return;
        this.dialogFormVisible1 = false;
        let cont1 = "";
        let cont2 = "";
        let cont3 = "";
        this.user.map((v, i) => {
          if (v.name == this.form2.contacts) {
            cont1 = v.id;
          }
        });
        this.genre.map((v, i) => {
          if (v.name == this.form2.storehouse_type) {
            cont2 = v.id;
          }
        });
        this.invoke.map((v, i) => {
          if (v.name == this.form2.state) {
            cont3 = v.id;
          }
        });
        // console.log(cont1, cont2, cont3, this.form2.state);
        let res = await storehouseEdit({
          storehouse_name: this.form2.storehouse_name,
          contacts: cont1 === "" ? this.form2.contacts : cont1,
          storehouse_type: cont2 === "" ? this.form2.storehouse_type : cont2,
          state: cont3 === "" ? this.form2.state : cont3,
          sort: this.form2.sort,
          remarks: this.form2.remarks,
          id: this.form2.id,
        });
        this.init();
      });
    },
    // 编辑返回
    backtrack() {
      this.dialogFormVisible1 = false;
      // this.user.map((v, i) => {
      //   this.ware.map((j, k) => {
      //     if (v.id == j.contacts) {
      //       j.contacts = v.name;
      //     }
      //   });
      // });
      // this.genre.map((v, i) => {
      //   this.ware.map((j, k) => {
      //     if (v.id == j.storehouse_type) {
      //       j.storehouse_type = v.name;
      //     }
      //   });
      // });
      // this.invoke.map((v, i) => {
      //   this.ware.map((j, k) => {
      //     if (v.id == j.state) {
      //       j.state = v.name;
      //     }
      //   });
      // });
      this.init();
    },
    handleSizeChange(val) {
      // console.log(val)
      this.page_size = val;
      this.init(this.form);
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val;
      this.init(this.form);
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      // console.log(data);
      this.user = data;
      // console.log(this.user);
    },
    // 初始化
    async init(obj) {
      let res = await storehouseList({
        page: this.page,
        page_size: this.page_size,
        ...obj,
      });
      console.log(res);
      let { data } = res.data;
      this.ware = data;
      this.count = res.data.count;
      this.user.map((v, i) => {
        this.ware.map((j, k) => {
          if (v.id == j.contacts) {
            j.contacts = v.name;
          }
        });
      });
      this.genre.map((v, i) => {
        this.ware.map((j, k) => {
          if (v.id == j.storehouse_type) {
            j.storehouse_type = v.name;
          }
        });
      });
      this.invoke.map((v, i) => {
        this.ware.map((j, k) => {
          if (v.id == j.state) {
            j.state = v.name;
          }
        });
      });

      // console.log(res);
    },
  },
  async mounted() {
    this.getStylist();
    this.init();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.warehouseSet {
  .main {
    .header {
      overflow: hidden;
    }
    .center {
    }
  }
  .pagination {
    margin: 20px;
    float: right;
  }
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
  .table {
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
  }
  .search_button {
    margin-left: 10px;
    background-color: #000;
  }
  /deep/ .el-icon-search {
    color: #fff;
  }
  /deep/.el-button {
    border: none;
  }
}
</style>