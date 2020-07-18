<template>
  <div class="shipment" v-if="power.indexOf('B5000300')!=-1">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>生产</el-breadcrumb-item>
      <el-breadcrumb-item>生产出货</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="款号:">
          <el-input v-model="formInline.styleno" placeholder="款号"></el-input>
        </el-form-item>
        <el-form-item label="年份:">
          <el-select v-model="formInline.year" placeholder="年份" style="width:120px">
            <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="季节:">
          <el-select v-model="formInline.season" placeholder="季节" style="width:120px">
            <el-option
              v-for="item in seasons"
              :key="item.id"
              :label="item.season"
              :value="item.season"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设计师:">
          <el-select
            v-model="stylist"
            placeholder="设计师"
            @change="handleUser_id($event)"
            style="width:120px"
          >
            <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别:">
          <el-select v-model="formInline.style_type" placeholder="类别" style="width:120px">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formInline.state" placeholder="状态" style="width:120px">
            <el-option v-for="item in states" :key="item.id" :label="item.v" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          size="small"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template align="center" slot-scope="scope" property="style_pic_url">
              <img :src="scope.row.style_pic_url" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column align="center" property="styleno" label="款号"></el-table-column>
          <el-table-column align="center" property="stylename" label="名称" width="90"></el-table-column>
          <el-table-column align="center" property="produce_no" label="批号"></el-table-column>
          <el-table-column align="center" property="style_color" label="颜色" width="90"></el-table-column>
          <el-table-column align="center" property="style_type" label="品类" width="90"></el-table-column>
          <el-table-column align="center" property="year" label="年份" width="90"></el-table-column>
          <el-table-column align="center" property="season" label="季节" width="90"></el-table-column>
          <el-table-column align="center" property="stylist" label="设计师"></el-table-column>
          <el-table-column width="80" align="center" property="state" label="状态"></el-table-column>
          <el-table-column align="center" width="80" label="操作">
            <template slot-scope="scope">
              <el-button
                class="elbtn"
                size="mini"
                v-if="scope.row.complete_status==1"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
              <el-button
                class="elbtn"
                size="mini"
                v-if="scope.row.complete_status==0"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"出货"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button v-print="'#printTest'" size="mini" v-if="power.indexOf('B5000500')!=-1">打印</el-button>
        <el-button size="mini" v-if="power.indexOf('B5000600')!=-1">导出</el-button>
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
  getProjectStyleList,
  getCategoryList,
  getWestList,
  getProduceOrderList
} from "@/api/researchDevelopment";
import { getProduceCompleteList } from "@/api/production";
export default {
  data() {
    return {
      power: "",
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: ""
      },
      page: 1,
      page_size: 9,
      total: 0,
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      year: "", //年
      season: "", //季节
      stylist: "", //设计师
      category: "", //类别
      west: "", //西所
      state: "", //状态
      states: [
        {
          v: "全部",
          id: 3
        },
        {
          v: "未出货",
          id: 0
        },
        {
          v: "出货中",
          id: 1
        },
        {
          v: "已完成",
          id: 2
        }
      ],
      tableData: [],
      count: 0,
      number: 123
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row);
      // console.log(index);

      // this.$router.push({
      //   path: "/productionStyle?id=" + row.style_id + "&activeNames=5"
      // });
      this.$router.push({
        path: `/productionStyle?id=${
          row.style_id
        }&activeNames=${5}&TL=${4}&produce_no=${row.produce_no}`
      });
    },
    onSubmit() {
      this.init(this.formInline);
    }, // 获取customer_id
    handleCustomer_id(e) {
      this.customer_id = e;
    },
    // state
    handelState(e) {
      this.stateId = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      // console.log(data);
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      // console.log(data);
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      // console.log(data);
      this.stylists = data;
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      // console.log(data);
      this.categorys = data;
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      // console.log(data);
      this.wests = data;
    },
    async handleUser_id(e) {
      this.formInline.user_id = e;
    },
    async init(obj) {
      let res = await getProduceCompleteList({
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
        if (v.complete_status == 0) {
          v.state = "未出货";
        } else if (v.complete_status == 1) {
          v.state = "已出货";
        }
      });
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
    }
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
  }
};
</script>

<style lang="less" scoped>
.shipment {
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