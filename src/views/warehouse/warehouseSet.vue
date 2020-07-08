<template>
  <div class="warehouseSet">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>库存设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="header">
        <el-form style="float:left" :inline="true" :model="form">
          <el-form-item label="名称:">
            <el-input v-model="form.name" placeholder="请输入仓库名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form style="float:right">
          <el-button type="primary" @click="addWarehouse">+增加仓库</el-button>
        </el-form>
      </div>
      <hr style="border:1px dashed #ccc" />
    </div>
    <div class="center">
      <el-table :data="ware" row-key="id" size="mini">
        <el-table-column align="center" width="90" label="操作">
          <template slot-scope="scope">
            <div
              style="width:20px;float:left"
              class="el-icon-edit btn"
              @click="handleEdit(scope.$index, scope.row)"
            ></div>
            <div
              style="width:20px;float:right"
              class="el-icon-delete btn"
              @click="handleDelete(scope.$index, scope.row)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column property="name" align="center" label="仓库名称"></el-table-column>
        <el-table-column property="styleno" align="center" label="负责人"></el-table-column>
        <el-table-column property="styleno" align="center" label="仓库类型"></el-table-column>
        <el-table-column property="styleno" align="center" label="备注"></el-table-column>
        <el-table-column property="styleno" align="center" label="创建时间"></el-table-column>
        <el-table-column property="styleno" align="center" label="更新时间"></el-table-column>
        <el-table-column property="styleno" align="center" label="排序"></el-table-column>
        <el-table-column property="styleno" align="center" label="状态"></el-table-column>
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
      title="仓库信息"
      width="50%"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form1" :rules="rules1" :model="form1">
        <el-form-item prop="name" label="仓库名称：" label-width="25%">
          <el-input style="width:60%" v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item prop="man" label="仓库负责人：" label-width="25%">
          <el-select style="width:60%" v-model="form1.man" placeholder="请选择活动区域">
           <el-option v-for="item in user" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="warehouseType" label="仓库类型：" label-width="25%">
          <el-select style="width:60%" v-model="form1.warehouseType" placeholder="请选择活动区域">
            <el-option v-for="item in genre" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enable" label="启用：" label-width="25%">
          <el-select style="width:60%" v-model="form1.enable" placeholder="请选择活动区域">
            <el-option v-for="item in invoke" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" label-width="25%">
          <el-input style="width:60%" v-model="form1.rank"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="25%">
          <el-input style="width:60%" type="textarea" :rows="3" v-model="form1.remark"></el-input>
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
        <el-form-item prop="name" label="仓库名称：" label-width="25%">
          <el-input style="width:60%" v-model="form2.name"></el-input>
        </el-form-item>
        <el-form-item prop="man" label="仓库负责人：" label-width="25%">
          <el-select style="width:60%" v-model="form2.man" placeholder="请选择活动区域">
           <el-option v-for="item in user" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="warehouseType" label="仓库类型：" label-width="25%">
          <el-select style="width:60%" v-model="form2.warehouseType" placeholder="请选择活动区域">
            <el-option v-for="item in genre" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enable" label="启用：" label-width="25%">
          <el-select style="width:60%" v-model="form2.enable" placeholder="请选择活动区域">
            <el-option v-for="item in invoke" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" label-width="25%">
          <el-input style="width:60%" v-model="form2.rank"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="25%">
          <el-input style="width:60%" type="textarea" :rows="3" v-model="form2.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit1">提交</el-button>
        <el-button @click="dialogFormVisible1 = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList } from "@/api/setting.js";
import { getStylistList } from "@/api/researchDevelopment.js";
export default {
  data() {
    return {
      // 数据表
      form: {
        name: ""
      },
      // 新建
      form1: {
        name: "",
        man: "",
        warehouseType: "",
        enable: "",
        rank: "",
        remark: ""
      },
      // 编辑
      form2: {
        name: "",
        man: "",
        warehouseType: "",
        enable: "",
        rank: "",
        remark: ""
      },
      // 新建校对
      rules1: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        man: [
          { required: true, message: "请选择仓库负责人", trigger: "change" }
        ],
        warehouseType: [
          { required: true, message: "请选择仓库类型", trigger: "change" }
        ],
        enable: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ]
      },
      // 编辑校对
      rules2: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        man: [
          { required: true, message: "请选择仓库负责人", trigger: "change" }
        ],
        warehouseType: [
          { required: true, message: "请选择仓库类型", trigger: "change" }
        ],
        enable: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ]
      },
      ware: [{ name: "0" }],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      invoke: [
        { name: "启用", id: 1 },
        { name: "关闭", id: 0 }
      ],
      genre: [
        { name: "产品仓库", id: 0 },
        { name: "物料仓库", id: 1 }
      ],
      user: [],
      page: 1,
      page_size: 9,
      count:0
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    handleEdit(a, b) {
      this.dialogFormVisible1 = true;
    },
    handleDelete(a, b) {
      console.log(a, b);
    },
    addWarehouse() {
      this.dialogFormVisible = true;
    },
    Submit() {
      this.$refs["form1"].validate(valid => {
        if (!valid) return;
        this.dialogFormVisible = false;
        console.log(this.form1);
      });
    },
    Submit1() {
      this.$refs["form2"].validate(valid => {
        if (!valid) return;
        this.dialogFormVisible1 = false;
        console.log(this.form2);
      });
    },
    handleSizeChange(val) {
      // console.log(val)
      this.page_size = val;
      // this.init(this.form);
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val;
      // this.init(this.form);
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      // console.log(data);
      this.user = data;
      console.log(this.user);
      
    },
  },
  async mounted() {
   this.getStylist()
  }
};
</script>

<style lang="less" scoped>
.warehouseSet {
  .main {
    .header {
      overflow: hidden;
      margin-top: 20px;
    }
    .center {
    }
  }
  .pagination{
    float: right;
  }
}
</style>