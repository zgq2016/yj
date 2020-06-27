<template>
  <div class="itemDesign">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item>设计项目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件 -->
    <div class="condition clearfix">
      <div class="date fl">
        <label for>创建时间</label>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          :start-placeholder="ctime_start"
          :end-placeholder="ctime_end"
        ></el-date-picker>
      </div>
      <div class="name fl">
        <label for>项目</label>
        <el-input v-model="name" placeholder="项目"></el-input>
      </div>
      <div class="year fl">
        <label for>年份</label>
        <el-select v-model="year" placeholder="年份">
          <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
        </el-select>
      </div>
      <div class="season fl">
        <label for>季节</label>
        <el-select v-model="season" placeholder="季节">
          <el-option
            v-for="item in seasons"
            :key="item.id"
            :label="item.season"
            :value="item.season"
          ></el-option>
        </el-select>
      </div>
      <div class="stylist fl">
        <label for>设计师</label>
        <el-select v-model="stylist" placeholder="设计师" @change="handleUser_id($event)">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="category fl">
        <label for>类别</label>
        <el-select v-model="category" placeholder="类别">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </div>
      <div class="west fl">
        <label for>西所</label>
        <el-select v-model="west" placeholder="西所" @change="handleCustomer_id($event)">
          <el-option
            v-for="item in wests"
            :key="item.id"
            :label="item.companyname"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="state fl">
        <label for>状态</label>
        <el-select v-model="state" placeholder="状态" @change="handelState($event)">
          <el-option v-for="item in states" :key="item.id" :label="item.v" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="btn fl" @click="handlesearch">
        <el-button icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <!-- 新增项目 -->
    <div class="addStyle">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link el-icon-plus">新增项目</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">新增意向订单</el-dropdown-item>
          <el-dropdown-item command="b">新增阶段工作</el-dropdown-item>
          <el-dropdown-item command="c">新增企划系列</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 列表 -->
    <div class="dataList">
      <div class="list" v-for="(item, index) in data" :key="index">
        <router-link :to="`/designCheck?id=${item.id}`">
          <img :src="item.picurl" alt />
        </router-link>
        <div class="information">
          <div class="projecttype">{{item.projecttype}}</div>
          <div class="detailed">{{item.projectname}}</div>
          <div class="finishtime">完成时间：{{item.finishtime}}</div>
          <div class="user_name">{{item.user_name}}</div>
          <div class="updatetime">提交于 {{item.ctime}}</div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDataList,
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
  getWestList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      data: [],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      date: "", //日期
      name: "", //名称
      year: "", //年
      season: "", //季节
      stylist: "", //设计师
      category: "", //类别
      west: "", //西所
      state: "", //状态
      ctime_start: "",
      ctime_end: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      user_id: "",
      customer_id: "",
      stateId: "",
      states: [
        {
          v: "未下单",
          id: 0
        },
        {
          v: "已下单",
          id: 1
        }
      ]
    };
  },
  methods: {
    handleCommand(command) {
      // 新增意向订单 AddOpinionIndent
      if (command === "a") {
        this.$router.push({ path: "/addProject?id=a" });
      }
      // 新增阶段工作 AddPhase
      if (command === "b") {
        this.$router.push({ path: "/addProject?id=b" });
      }
      // 新增企划系列 AddProjectSeries
      if (command === "c") {
        this.$router.push({ path: "/addProject?id=c" });
      }
    },
    // 获取userid
    handleUser_id(e) {
      this.user_id = e;
    },
    // 获取customer_id
    handleCustomer_id(e) {
      this.customer_id = e;
    },
    // state
    handelState(e) {
      this.stateId = e;
    },
    // 搜索
    async handlesearch() {
      var obj = {};
      // console.log(...this.date)
      obj["ctime_start"] = moment(this.date[0]).format("YYYY-MM-DD");
      obj["ctime_end"] = moment(this.date[1]).format("YYYY-MM-DD");
      obj["stylekeyword"] = this.name;
      obj["year"] = this.year;
      obj["season"] = this.season;
      obj["user_id"] = this.user_id;
      obj["style_type"] = this.category;
      obj["customer_id"] = this.customer_id;
      obj["state"] = this.stateId;
      delete obj["0"];
      delete obj["1"];
      this.init(obj);
    },
    /* 获取数据 */
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init(obj) {
      console.log(obj);
      
      let res = await getDataList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj
      });
      let { data, count } = res.data;
      this.data = data;
      console.log(res);
      
      // console.log( this.data);
      for(let i=0;i<this.data.length;i++){
          if(this.data[i].projecttype === "0"){
              this.data[i].projecttype = '意向订单';
          }else if(this.data[i].projecttype === "1"){
              this.data[i].projecttype = '阶段工作';
          }else if(this.data[i].projecttype === "2"){
              this.data[i].projecttype = '企划系列';
          }
      }
      this.total = count;
      this.ctime_start = moment(this.date[0]).format("YYYY-MM-DD");
      this.ctime_end = moment(this.date[1]).format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.init();
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
  }
};
</script>

<style lang="less" scoped>
.itemDesign {
  label {
    width: 40px;
    margin-right: 10px;
  }
  .condition {
    padding: 20px 100px 30px 20px;
    /deep/.el-input__inner {
      width: 300px;
    }
    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/.el-input__inner {
        width: 230px !important;
      }
    }
    .year {
      /deep/.el-input__inner {
        width: 100px !important;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100px;
      }
    }
    .season {
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .stylist {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 140px !important;
      }
    }
    .category {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .west {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .state {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 100px !important;
      }
    }
    .btn {
      margin-top: 10px;
    }
  }
  .addStyle {
    margin: 0 30px 30px 0;
    text-align: right;

    .el-dropdown-link {
      border-radius: 12px;
      padding: 10px 40px;
      color: #fff;
      background-color: #ccc;
      &:hover {
        background-color: #000;
        cursor: pointer;
      }
    }
  }
  .dataList {
    display: flex;
    flex-wrap: wrap;
    .list {
      display: flex;
      width: 33%;
      margin: 20px 0;
      img {
        width: 130px;
        height: 130px;
        border-radius: 10px;
        overflow: hidden;
      }
      .information {
        margin: 12px 0 0 15px;
        .detailed {
          width: 11em;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        div {
          font-size: 14px;
        }
        .updatetime {
          margin-top: 20px;
          color: #ccc;
          font-size: 12px;
        }
      }
    }
  }
  .pagination {
    text-align: right;
  }
  /deep/.el-date-editor .el-range-separator {
    padding: 0px 0px;
    line-height: 32px;
    width: 5%;
    color: #303133;
  }
}
</style>