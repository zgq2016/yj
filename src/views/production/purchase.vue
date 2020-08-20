<template>
  <div class="purchase" v-if="power.indexOf('B2000300')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>生产</el-breadcrumb-item>
        <el-breadcrumb-item>采购列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input v-model="formInline.styleno" placeholder="款号" style="width:200px"></el-input>
      <el-button icon="el-icon-search" size="mini" circle class="search_button" @click="onSubmit"></el-button>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="formInline.year"
          clearable
          placeholder="年份"
          @change="onSubmit"
          style="width:120px"
        >
          <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.season"
          clearable
          @change="onSubmit"
          placeholder="季节"
          style="width:120px"
        >
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
        <el-select
          v-model="formInline.style_type"
          @change="onSubmit"
          clearable
          placeholder="类别"
          style="width:120px"
        >
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.procure_status"
          @change="onSubmit"
          clearable
          placeholder="状态"
          style="width:120px"
        >
          <el-option v-for="item in states" :key="item.id" :label="item.v" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table
        id="printTest"
        ref="singleTable"
        :data="tableData"
        size="mini"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column align="center" label="图片">
          <template align="center" slot-scope="scope" property="style_pic_url">
            <el-image
              style="width: 50px; height: 50px;border-radius: 5px;margin-right: 5px;"
              :src="scope.row.style_pic_url"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" property="styleno" label="款号"></el-table-column>
        <el-table-column align="center" property="stylename" label="名称"></el-table-column>
        <el-table-column align="center" property="produce_no" label="批号"></el-table-column>
        <el-table-column align="center" property="style_color" label="颜色"></el-table-column>
        <el-table-column align="center" property="style_type" label="品类"></el-table-column>
        <el-table-column align="center" property="year" label="年份"></el-table-column>
        <el-table-column align="center" property="season" label="季节"></el-table-column>
        <el-table-column align="center" property="user_name" label="设计师"></el-table-column>
        <el-table-column align="center" property="state" label="状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              class="elbtn"
              size="mini"
              v-if="scope.row.procure_status==1||scope.row.procure_status==2"
              @click="handleEdit(scope.$index, scope.row)"
            >{{"查看"}}</el-button>
            <el-button
              class="elbtn"
              size="mini"
              v-if="scope.row.procure_status==0"
              @click="handleEdit(scope.$index, scope.row)"
            >{{"采购"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button v-print="'#printTest'" size="mini" v-if="power.indexOf('B2000500')!=-1">打印</el-button>
        <el-button size="mini" v-if="power.indexOf('B2000600')!=-1">导出</el-button>
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
  getProduceOrderList,
} from "@/api/researchDevelopment";
import { getProduceProcureList } from "@/api/production";
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
        procure_status: "",
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
      count: 0,
      number: 123,
      states: [
        {
          v: "全部",
          id: 3,
        },
        {
          v: "未采购",
          id: 0,
        },
        {
          v: "采购中",
          id: 1,
        },
        {
          v: "已完成",
          id: 2,
        },
      ],
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
        path: `/productionStyle?id=${
          row.style_id
        }&activeNames=${2}&TL=${1}&produce_no=${row.produce_no}`,
      });
    },
    onSubmit() {
      this.page = 1;
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
    async init(obj) {
      this.formInline.page = this.page;
      this.formInline.page_size = this.page_size;
      let res = await getProduceProcureList(this.formInline);
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
        if (v.procure_status == 0) {
          v.state = "未采购";
        } else if (v.procure_status == 1) {
          v.state = "采购中";
        } else if (v.procure_status == 2) {
          v.state = "已采购";
        }
      });
    },
    async handleUser_id(e) {
      this.formInline.user_id = e;
      this.onSubmit();
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
};
</script>

<style lang="less" scoped>
.purchase {
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
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
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