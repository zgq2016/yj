<template>
  <div class="salesOrder">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>销售</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- search_condition -->
      <div class="search_condition">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          style="position: relative;"
        >
          <el-form-item label="款号">
            <el-input v-model="formInline.styleno" placeholder="款号"></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <el-select v-model="formInline.year" placeholder="年份" style="width:120px">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节">
            <el-select v-model="formInline.season" placeholder="季节" style="width:120px">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设计师">
            <el-select
              v-model="stylist"
              placeholder="设计师"
              @change="handleUser_id($event)"
              style="width:120px"
            >
              <el-option
                v-for="item in stylists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="formInline.style_type" placeholder="类别" style="width:120px">
              <el-option
                v-for="item in categorys"
                :key="item.id"
                :label="item.style_type"
                :value="item.style_type"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="图片" width="110">
            <template slot-scope="scope" property="style_pic_url">
              <img style="float:left" :src="scope.row.style_pic_url" class="img" alt />
              <img style="float:right" :src="scope.row.style_color_pic_url" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column align="center" property="stylename" label="名称"></el-table-column>
          <el-table-column align="center" property="styleno" label="款号"></el-table-column>
          <el-table-column align="center" width="90" property="style_color" label="颜色"></el-table-column>
          <el-table-column align="center" property="style_type" label="品类"></el-table-column>
          <el-table-column align="center" property="year" label="年份"></el-table-column>
          <el-table-column align="center" property="season" label="季节"></el-table-column>
          <el-table-column align="center" property="stylist" label="设计师"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                class="elbtn"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  getStyleList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: ""
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
      stylist: ""
    };
  },
  methods: {
    onSubmit() {
      this.init(this.formInline);
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ path: `/sampleDress?id=${row.id}` });
    },
    handleUser_id(e) {
      this.formInline.user_id = e
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
        ...obj
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
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.init(this.formInline);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init(this.formInline);
    }
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.init();
  }
};
</script>
<style lang="less" scoped>
.salesOrder {
  .main {
    margin: 20px;
    .search_condition {
      .inquire {
        width: 100px;
        height: 40px;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
        &:hover {
          background-color: blue;
        }
      }
      // /deep/.el-input__inner {
      //   width: 150px;
      // }
    }
    // .elbtn {
    //   padding: 5px 30px;
    //   border-radius: 10px;
    // }
    .table {
      .img {
        width: 40px;
        height: 40px;
      }
    }
  }
  .el-pagination{
    text-align: right;
  }
}
</style>