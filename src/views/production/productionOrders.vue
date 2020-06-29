<template>
  <div class="productionOrders">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>生产</el-breadcrumb-item>
      <el-breadcrumb-item>生产下单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
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
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <el-form-item>
          <el-button type="info" round @click="addOrders">新增下单</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          :data="tableData"
          size="small"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template align="center" slot-scope="scope" property="style_pic_url">
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
          <!-- <el-table-column width="80" align="center" property="state" label="状态"></el-table-column> -->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                class="elbtn"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
              <!-- <el-button
                class="elbtn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
              >{{"下单"}}</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button v-print="'#printTest'" size="mini">打印</el-button>
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
  getProduceOrderList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
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
      states: [
        {
          v: "未下单",
          id: 0
        },
        {
          v: "已下单",
          id: 1
        }
      ],
      tableData: []
    };
  },
  methods: {
    // 查看
    handleEdit(index, row) {
      console.log(row);
      // console.log(index);
      this.$router.push({
        path: "/productionStyle?id=" + row.style_id + "&activeNames=1"
      });
    },
    // 下单
    handleAdd(index, row) {
      this.$router.push({
        path: "/productionStyle?id=" + row.style_id + "&activeNames=1"
      });
    },
    // 查询
    async onSubmit() {
      // console.log(this.formInline);

      this.init(this.formInline);
    },
    handleUser_id(v) {
      console.log(v);
    },
    //  增加下单
    addOrders() {
      this.$router.push({ path: "/designFile" });
    },
    // 更新状态
    handelState(e) {
      this.stateId = e;
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
      let res = await getProduceOrderList({
        page: this.page,
        page_size: this.page_size,
        ...obj
      });
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      this.tableData.map((v, i) => {
        this.stylists.map((j, k) => {
          if (v.user_id == j.id) {
            v.stylist = j.name;
          }
        });
      });
    },
    async handleUser_id(e){
      this.formInline.user_id = e
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
.productionOrders {
  .main {
    margin: 20px;
    .table {
      .img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>