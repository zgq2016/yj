<template>
  <div class="designFile" v-if="power.indexOf('E3000100')!=-1">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===1" :to="{ path: '/productionOrders' }">生产下单</el-breadcrumb-item>
        <el-breadcrumb-item>款式档案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="position: relative;"
      >
        <el-form-item>
          <el-input v-model="formInline.styleno" placeholder="款号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.year" clearable placeholder="年份">
            <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.season" clearable placeholder="季节">
            <el-option
              v-for="item in seasons"
              :key="item.id"
              :label="item.season"
              :value="item.season"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="stylist" placeholder="设计师" clearable @change="handleUser_id($event)">
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.style_type" clearable placeholder="类别">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" size="mini" circle class="search_button"></el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          :data="tableData"
          @select="isCheckListBox"
          @select-all="Checkbox"
          highlight-current-row
          size="small"
          style="width:100%;"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template slot-scope="scope" property="style_pic_url">
              <img :src="scope.row.style_pic_url" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column align="center" property="stylename" label="名称"></el-table-column>
          <el-table-column align="center" property="styleno" label="款号"></el-table-column>
          <el-table-column align="center" property="style_color" label="颜色"></el-table-column>
          <el-table-column align="center" property="style_type" label="品类"></el-table-column>
          <el-table-column align="center" property="year" label="年份"></el-table-column>
          <el-table-column align="center" property="season" label="季节"></el-table-column>
          <el-table-column align="center" property="stylist" label="设计师"></el-table-column>
          <el-table-column align="center" width="70" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="float:left;"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" type="selection" width="55"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button v-print="'#printTest'" size="mini">打印</el-button>
        <el-button @click="OrderCreate" size="mini">生成下单表</el-button>
        <el-button size="mini">导出</el-button>
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
    </div>
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
  getProjectStyleList,
  getWestList,
  getStyleList,
  produceOrderCreateAdd,
} from "@/api/researchDevelopment";
import { produceLotAdd } from "@/api/production";
export default {
  data() {
    return {
      power: "",
      TL: "",
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
      },
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      page: 1,
      page_size: 9,
      total: 0,
      year: "", //年
      season: "", //季节
      stylist: "", //设计师
      category: "", //类别
      west: "", //西所
      state: "", //状态
      number: 123,
      count: 0,
      tableData: [],
      ids: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row);
      // console.log(index);
      if (this.TL === 1) {
        this.$router.push({
          // path: "/development?id=" + row.id
          path: `/development?id=${row.id}&TL=${20}`,
        });
      } else {
        this.$router.push({
          path: `/development?id=${row.id}&TL=${21}`,
        });
      }
    },
    async onSubmit() {
      this.init(this.formInline);
    },
    handleUser_id(v) {
      this.formInline.user_id = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
      // console.log(this.stylists);
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      this.categorys = data;
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      this.wests = data;
    },
    async init(obj) {
      let res = await getStyleList({
        page: this.page,
        page_size: this.page_size,
        ...obj,
      });
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      // console.log(this.tableData);

      this.tableData.map((v, i) => {
        this.stylists.map((j, k) => {
          if (v.user_id == j.id) {
            v.stylist = j.name;
          }
        });
      });
      this.TL = this.$route.query.TL - 0;
    },
    handleSizeChange(val) {
      // console.log(val)
      this.page_size = val;
      this.init(this.formInline);
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val;
      this.init(this.formInline);
    },
    // 随意勾选
    async isCheckListBox(selection, row) {
      this.ids = [];
      selection.map((v, i) => {
        this.ids.push({ id: v.id });
      });
    },
    // 全选
    Checkbox(selection) {
      this.ids = [];
      selection.map((v, i) => {
        this.ids.push({ id: v.id });
      });
    },
    // 确定下单
    async OrderCreate() {
      this.$confirm("提交已选下单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // console.log(this.ids);
          let res = await produceOrderCreateAdd({
            style_id_data: this.ids,
          });
          let sid = [];
          this.ids.map((v, i) => {
            sid.push({ style_id: v.id });
          });
          let res1 = await produceLotAdd({
            style_id_data: sid,
          });
          console.log(res1);
          this.$router.push({ path: "/productionOrders" });
          this.$message({
            type: "success",
            message: "提交成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "提交失败",
          });
        });
    },
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.designFile {
  .main {
    margin: 20px;

    .table {
      // margin-top: -40px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        
      }
    }
  }
  /deep/ .el-input__inner {
    width: 100px;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 15px;
    border: none;
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
  }
  // /deep/ .el-icon-arrow-up:before {
  //   margin-right: -40px;
  // }
  .search_button {
    background-color: #000;
  }
  /deep/ .el-icon-search {
    color: #fff;
  }
  /deep/.el-button {
    border: none;
  }
  .el-table th,
  .el-table tr {
    background-color: #fff;
    height: 72px;
  }
  /deep/ .el-table th > .cell {
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
  }
  /deep/ .el-table tr {
    height: 10px;
  }
}
</style>
