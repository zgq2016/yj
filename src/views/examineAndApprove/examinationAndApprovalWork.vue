<template>
  <div
    class="platemaking"
    v-if="permission.indexOf('ExaminationAndApprovalWork') != -1"
  >
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>审批</el-breadcrumb-item>
          <el-breadcrumb-item>工作审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-input
        v-model="formInline.styleno"
        placeholder="款号"
        style="width: 200px"
      ></el-input>
      <el-button
        icon="el-icon-search"
        size="mini"
        circle
        class="search_button"
        @click="onSubmit"
      ></el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="position: relative"
    >
      <el-form-item>
        <el-select
          v-model="formInline.year"
          clearable
          placeholder="年份"
          style="width: 120px"
          @change="get_year($event)"
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
          style="width: 120px"
          @change="get_season($event)"
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
          placeholder="设计师"
          @change="handleUser_id($event)"
          clearable
          style="width: 120px"
        >
          <el-option
            v-for="item in stylists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.style_type"
          clearable
          placeholder="类别"
          style="width: 120px"
          @change="get_style_type($event)"
        >
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.style_type"
            :value="item.style_type"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-select v-model="formInline.state" clearable placeholder="状态" style="width:120px">
          <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>-->
      <div style="float: right">
        <el-button
          size="small"
          @click="approval(0)"
          v-if="is_approval"
          round
          type="info"
          >关闭审批</el-button
        >
        <el-button size="small" @click="approval(1)" v-else round type="info"
          >开启审批</el-button
        >
      </div>
    </el-form>
    <div class="table" v-if="permission.indexOf('get_style_approve') != -1">
      <el-table
        ref="singleTable"
        size="mini"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column align="center" label="图片" width="140">
          <template slot-scope="scope" property="style_pic_url">
            <el-image
              style="
                width: 50px;
                height: 50px;
                border-radius: 5px;
                margin-right: 5px;
              "
              :src="scope.row.style_pic_url"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="stylename"
          label="名称"
        ></el-table-column>
        <el-table-column
          align="center"
          property="styleno"
          label="款号"
        ></el-table-column>
        <el-table-column
          align="center"
          property="style_color"
          label="颜色"
        ></el-table-column>
        <el-table-column
          align="center"
          property="style_type"
          label="品类"
        ></el-table-column>
        <el-table-column
          align="center"
          property="year"
          label="年份"
        ></el-table-column>
        <el-table-column
          align="center"
          property="season"
          label="季节"
        ></el-table-column>
        <el-table-column
          align="center"
          property="name"
          label="设计师"
        ></el-table-column>
        <el-table-column
          align="center"
          property="aa"
          label="状态"
        ></el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <router-link
                v-if="scope.row.design_status === 2"
                :to="`/designNote?id=${scope.row.id}`"
                target="_blank"
              >
                <el-button class="elbtn" size="mini">查看</el-button>
              </router-link>
              <router-link
                v-if="scope.row.pattern_status === 3"
                :to="`/patternStatus?id=${scope.row.id}`"
                target="_blank"
              >
                <el-button class="elbtn" size="mini">查看</el-button>
              </router-link>
              <router-link
                v-if="scope.row.sample_status === 3"
                :to="`/sampleDress?id=${scope.row.id}`"
                target="_blank"
              >
                <el-button class="elbtn" size="mini">查看</el-button>
              </router-link>
              <el-button
                class="elbtn"
                size="mini"
                @click="pattern_agree1(scope.$index, scope.row, 1)"
                >通过</el-button
              >
              <el-button
                class="elbtn"
                size="mini"
                @click="pattern_agree2(scope.$index, scope.row, 0)"
                >不通过</el-button
              >
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
  getWestList,
  getStylistList,
  getCategoryList,
  getStyleList,
  sampleApply,
  cancelSampleApply,
  designApply,
  designAgree,
  patternAgree,
  sampleAgree,
  materialsAgree,
} from "@/api/researchDevelopment";
import {
  getStyleApprove,
  isApproval,
  approvalEdit,
} from "@/api/examineAndApprove";
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
        { name: "开始制版", id: 1 },
        { name: "制版中", id: 2 },
        { name: "完成上传", id: 3 },
      ],
      permission: [],
      is_approval: 0,
    };
  },
  methods: {
    async approval(is_approval) {
      let res = await approvalEdit({
        is_approval,
      });
      if (!res.data.error_code) {
        this.is_approval = is_approval;
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }
    },
    async pattern_agree1(index, row, e) {
      console.log(index, row, e);
      if (row.design_status == 2) {
        let res = await designAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.pattern_status == 3) {
        let res = await patternAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.sample_status == 3) {
        let res = await sampleAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.materials_status == 2) {
        let res = await materialsAgree({ style_id: row.id, agree: e });
        this.init();
      }
    },
    async pattern_agree2(index, row, e) {
      if (row.design_status == 2) {
        let res = await designAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.pattern_status == 3) {
        let res = await patternAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.sample_status == 3) {
        let res = await sampleAgree({ style_id: row.id, agree: e });
        this.init();
      } else if (row.materials_status == 2) {
        let res = await materialsAgree({ style_id: row.id, agree: e });
        this.init();
      }
    },
    get_year() {
      this.init();
    },
    get_season() {
      this.init();
    },
    get_style_type() {
      this.init();
    },
    onSubmit() {
      this.page = 1;
      this.init(this.formInline);
    },
    handleUser_id(e) {
      this.formInline.user_id = e;
      this.init();
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
    async init() {
      this.formInline["page"] = this.page;
      this.formInline["page_size"] = this.page_size;
      let res = await getStyleApprove(this.formInline);
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      this.tableData.map((v, i) => {
        if (v.design_status == 2) {
          v.aa = "版单审核中";
        } else if (v.pattern_status == 3) {
          v.aa = "纸样审核中";
        } else if (v.sample_status == 3) {
          v.aa = "样衣审核中";
        } else if (v.materials_status == 2) {
          v.aa = "采购单审核中";
        }
      });
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init();
    },
  },
  async mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.init();
    this.permission = localStorage.getItem("permission").split(",");
    let res = await isApproval();
    this.is_approval = res.data.data.is_approval;
  },
  computed: {
    userid() {
      return this.$store.state.userInfo.id;
    },
  },
};
</script>
<style lang="less" scoped>
.platemaking {
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
    // cropper-face cropper-move
  }
}
</style>