<template>
  <div class="pattern" v-if="power.indexOf('A7000300')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>研发</el-breadcrumb-item>
        <el-breadcrumb-item>纸样</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input v-model="formInline.styleno" placeholder="款号" style="width:200px"></el-input>
      <el-button icon="el-icon-search" size="mini" circle class="search_button" @click="onSubmit"></el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="position: relative;"
    >
      <el-form-item>
        <el-select v-model="formInline.year" clearable placeholder="年份" style="width:120px">
          <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.season" clearable placeholder="季节" style="width:120px">
          <el-option
            v-for="item in seasons"
            :key="item.id"
            :label="item.season"
            :value="item.season"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="stylist"
          clearable
          placeholder="设计师"
          @change="handleUser_id($event)"
          style="width:120px"
        >
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.style_type" clearable placeholder="类别" style="width:120px">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="state" clearable placeholder="状态" style="width:120px">
          <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="图片" width="140">
          <template slot-scope="scope" property="style_pic_url">
            <div style="display: flex;">
              <img style="margin-right: 5px;" :src="scope.row.style_pic_url" class="img" alt />
              <img :src="scope.row.style_color_pic_url" class="img" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column property="stylename" label="名称"></el-table-column>
        <el-table-column property="styleno" label="款号"></el-table-column>
        <el-table-column property="style_color" label="颜色"></el-table-column>
        <el-table-column property="style_type" label="品类"></el-table-column>
        <el-table-column property="year" label="年份"></el-table-column>
        <el-table-column property="season" label="季节"></el-table-column>
        <el-table-column property="username" label="设计师"></el-table-column>
        <el-table-column property="pattern" label="状态"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <div style="display: flex;align-items: center;">
              <el-button
                class="elbtn"
                size="mini"
                v-if="scope.row.pattern_status==='2'||scope.row.pattern_status==='4'"
                @click="pattern_apply(scope.$index, scope.row)"
              >提交审核</el-button>
              <!-- 2 4 -->
              <el-button
                class="elbtn"
                size="mini"
                v-if="scope.row.pattern_status==='3'"
                @click="cancel_pattern_apply(scope.$index, scope.row)"
              >撤回审核</el-button>
              <el-button
                class="elbtn"
                size="mini"
                @click="pattern_agree1(scope.$index, scope.row,1)"
                v-if="scope.row.pattern_status==='3'"
              >通过</el-button>
              <el-button
                class="elbtn"
                size="mini"
                @click="pattern_agree2(scope.$index, scope.row,0)"
                v-if="scope.row.pattern_status==='3'"
              >不通过</el-button>
              <!-- 3 -->
              <el-button class="elbtn" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  // getProjectStyleList,
  getWestList,
  getStylistList,
  getCategoryList,
  getStyleList,
  patternApply,
  cancelPatternApply,
  patternAgree,
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      power: "",
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
      },
      user_id: "",
      tableData: [],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      obj: {},
      page: 1,
      page_size: 9,
      count: 0,
      stylist: "",
      state: "",
      states: [
        { name: "未开始", id: 0 },
        { name: "开始画图", id: 1 },
        { name: "完成上传", id: 2 },
      ],
    };
  },
  methods: {
    async pattern_apply(index, row) {
      let res = await patternApply({ style_id: row.id });
      console.log(res);
      this.init();
    },
    async pattern_agree1(index, row, e) {
      let res = await patternAgree({ style_id: row.id, agree: e });
      console.log(res);
      this.init();
    },
    async pattern_agree2(index, row, e) {
      let res = await patternAgree({ style_id: row.id, agree: e });
      console.log(res);
      this.init();
    },
    async cancel_pattern_apply(index, row) {
      let res = await cancelPatternApply({ style_id: row.id });
      console.log(res);
      this.init();
    },
    onSubmit() {
      this.init(this.formInline);
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ path: `/patternStatus?id=${row.id}&TL=${2}` });
    },
    handleUser_id(e) {
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
      /* 
      纸样状态 pattern_status: 0: 等待采购  1:等待纸样打版 2.纸样已上传 3 纸样审核中 4.取消审核 5 审阅不通过  6等待制版 */
      this.tableData.map((v, i) => {
        if (v.pattern_status == "0") {
          v.pattern = "等待采购";
        }
        if (v.pattern_status == "1") {
          v.pattern = "等待纸样打版";
        }
        if (v.pattern_status == "2") {
          v.pattern = "纸样已上传";
        }
        if (v.pattern_status == "3") {
          v.pattern = "纸样审核中";
        }
        if (v.pattern_status == "4") {
          v.pattern = "取消审核";
        }
        if (v.pattern_status == "5") {
          v.pattern = "审阅不通过";
        }
        if (v.pattern_status == "6") {
          v.pattern = "等待制版";
        }
      });
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.init(this.formInline);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init(this.formInline);
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
  },
};
</script>
<style lang="less" scoped>
.pattern {
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
  .table {
    .img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  .form {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>