<template>
  <div class="itemDesign" v-if="permission.indexOf('itemDesign') != -1">
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>研发</el-breadcrumb-item>
          <el-breadcrumb-item>设计项目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-input
        v-model="formInline.stylekeyword"
        placeholder="项目"
        class="project"
        style="width: 200px"
      ></el-input>
      <el-button
        icon="el-icon-search"
        size="mini"
        circle
        class="search_button"
        @click="handlesearch"
      ></el-button>
    </div>
    <div class="form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="formInline.year"
            clearable
            placeholder="年份"
            style="width: 100px"
            @change="get_year"
          >
            <el-option
              v-for="item in years"
              :key="item.id"
              :label="item.year"
              :value="item.year"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formInline.season"
            clearable
            placeholder="季节"
            style="width: 100px"
            @change="get_seasons"
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
            v-model="formInline.user_id"
            clearable
            placeholder="设计师"
            @change="handleUser_id($event)"
            style="width: 100px"
          >
            <el-option
              v-for="item in stylists"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-select
            v-model="formInline.style_type"
            clearable
            placeholder="类别"
            style="width:100px"
            @change="get_style_type"
          >
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-select
            v-model="formInline.customer_id"
            clearable
            placeholder="西所"
            @change="handleCustomer_id($event)"
            style="width: 100px"
          >
            <el-option
              v-for="item in wests"
              :key="item.id"
              :label="item.companyname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formInline.state"
            clearable
            placeholder="状态"
            @change="handelState($event)"
            style="width: 100px"
          >
            <el-option
              v-for="item in states"
              :key="item.id"
              :label="item.v"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="addStyle" v-if="permission.indexOf('project_add') != -1">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">新增项目</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">新增意向订单</el-dropdown-item>
                <el-dropdown-item command="b">新增阶段工作</el-dropdown-item>
                <el-dropdown-item command="c">新增企划系列</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-form-item>
      </el-form>
      <!-- 新增项目 -->
    </div>

    <!-- 列表 -->
    <div class="dataList" v-if="permission.indexOf('get_project_list') != -1">
      <div class="list" v-for="(item, index) in data" :key="index">
        <div @click="handleEdit(item)">
          <el-image
            v-if="item.picurl"
            style="width: 150px; height: 150px; border-radius: 10px"
            :src="item.picurl"
            fit="cover"
          ></el-image>
          <div v-if="item.picurl === ''">
            <img
              style="width: 150px; height: 150px"
              v-if="item.projecttype === '意向订单'"
              src="../../assets/意向.jpg"
              alt
            />
            <img
              style="width: 150px; height: 150px"
              v-if="item.projecttype === '阶段工作'"
              src="../../assets/阶段.jpg"
              alt
            />
            <img
              style="width: 150px; height: 150px"
              v-if="item.projecttype === '企划系列'"
              src="../../assets/系列.jpg"
              alt
            />
          </div>
        </div>
        <div class="information">
          <div class="projecttype">{{ item.projecttype }}</div>
          <div class="detailed">{{ item.projectname }}</div>
          <div class="finishtime">完成时间：{{ item.finishtime }}</div>
          <div class="user_name">{{ item.user_name }}</div>
          <div class="updatetime">提交于 {{ item.ctime }}</div>
        </div>
      </div>
      <!-- 无数据 -->
      <!-- <div class="message" v-if="message!==''">{{message}}</div> -->
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
    <!-- <router-link to="/addProject?id=a" target="_blank">百度</router-link> -->
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
  getWestList,
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      permission: [],
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
      message: "",
      states: [
        {
          v: "未下单",
          id: 0,
        },
        {
          v: "已下单",
          id: 1,
        },
      ],
      obj: {},
      formInline: {
        stylekeyword: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
        customer_id: "",
        state: "",
      },
    };
  },
  methods: {
    handleEdit(e) {
      console.log(e);
      let { id } = e;
      this.$router.push({
        path: `/designCheck?id=${id}`,
      });
      document.body.style = null;
    },
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
      this.formInline.user_id = e;
      this.pageIndex = 1;
      this.init();
    },
    // 获取customer_id
    handleCustomer_id(e) {
      this.formInline.customer_id = e;
      this.pageIndex = 1;
      this.init();
    },
    // state
    handelState(e) {
      this.formInline.state = e;
      this.pageIndex = 1;
      this.init();
    },
    // 搜索
    handlesearch() {
      this.pageIndex = 1;
      this.init();
    },
    get_style_type() {
      this.pageIndex = 1;
      this.init();
    },
    get_year() {
      this.pageIndex = 1;
      this.init();
    },
    get_seasons() {
      this.pageIndex = 1;
      this.init();
    },
    /* 获取数据 */
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
      let res = await getStylistList({ department_id: 1 });
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init() {
      this.formInline["page"] = this.pageIndex;
      this.formInline["page_size"] = this.pageSize;
      this.formInline["stylekeyword"] = this.formInline.stylekeyword.trim();
      let res = await getDataList(this.formInline);
      // if (res.data.error_code === 0) {
      console.log(res);
      let { data, count } = res.data;
      this.data = data;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].projecttype === "0") {
          this.data[i].projecttype = "意向订单";
        } else if (this.data[i].projecttype === "1") {
          this.data[i].projecttype = "阶段工作";
        } else if (this.data[i].projecttype === "2") {
          this.data[i].projecttype = "企划系列";
        }
      }
      this.total = count;
      // }
      // if (res.data.error_code === 1) {

      //  }
    },
  },
  mounted() {
    this.init();
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.permission = localStorage.getItem("permission").split(",");
  },
  watch: {
    data() {
      if (this.data.length == 0) {
        this.message = "无数据";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.itemDesign {
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
  .form {
    display: flex;
  }
  .addStyle {
    margin-left: 200px;
    .el-dropdown-link {
      border-radius: 15px;
      width: 120px;
      height: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .dataList {
    display: flex;
    flex-wrap: wrap;
    .message {
      font-size: 20px;
      font-weight: 600;
      width: 100%;
      margin: 20px;
      background-color: #f2f2f2;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list {
      display: flex;
      width: 350px;
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
          text-overflow: ellipsis;
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
    margin: 20px;
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