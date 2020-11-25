<template>
  <div class="platemaking" v-if="permission.indexOf('designStyle') != -1">
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>研发</el-breadcrumb-item>
          <el-breadcrumb-item>设计款式</el-breadcrumb-item>
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
    <div class="form">
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
          <el-cascader
            v-model="formInline.style_type"
            placeholder="类别"
            :options="categorys"
            :props="optionProps1"
            @change="get_style_type"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formInline.design_status"
            @change="designStatus($event)"
            clearable
            placeholder="状态"
            style="width: 120px"
          >
            <el-option
              v-for="item in states"
              :key="item.design_status"
              :label="item.design"
              :value="item.design_status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div
            class="addStyle"
            v-if="permission.indexOf('project_style_add') != -1"
            @click="addStyle"
          >
            <div>新增款式</div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="singleTable"
        size="mini"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column label="图片" align="center" width="140">
          <template slot-scope="scope" property="style_pic_url">
            <div style="display: flex">
              <el-image
                style="
                  width: 50px;
                  height: 50px;
                  border-radius: 5px;
                  margin-right: 5px;
                "
                :src="scope.row.style_pic_url"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <!-- <i class="el-icon-picture-outline"></i> -->
                </div>
              </el-image>
              <img
                v-if="scope.row.style_color_pic_url"
                :src="scope.row.style_color_pic_url"
                class="img"
                style="width: 50px; height: 50px; border-radius: 5px"
                alt
              />
              <div
                v-else
                class="imgSrc"
                style="width: 50px; height: 50px; border-radius: 5px"
                :style="`background-color:${scope.row.color_code};`"
              ></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="stylename"
          align="center"
          label="名称"
        ></el-table-column>
        <el-table-column
          property="styleno"
          align="center"
          label="款号"
        ></el-table-column>
        <!-- <el-table-column width="90" property="style_color" label="颜色"></el-table-column> -->
        <el-table-column
          property="style_type"
          align="center"
          label="品类"
        ></el-table-column>
        <el-table-column
          property="year"
          align="center"
          label="年份"
        ></el-table-column>
        <el-table-column
          property="season"
          align="center"
          label="季节"
        ></el-table-column>
        <el-table-column
          property="username"
          align="center"
          label="设计师"
        ></el-table-column>
        <el-table-column
          property="ctime"
          align="center"
          width="95"
          label="开始时间"
        ></el-table-column>
        <el-table-column
          property="design"
          align="center"
          label="状态"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template
            v-if="permission.indexOf('get_style') != -1"
            slot-scope="scope"
          >
            <div class="btn">
              <!-- <div
                v-if="scope.row.sample_status==='2'||scope.row.sample_status==='4'&&scope.row.user_id==userid"
                @click="sample_apply(scope.$index, scope.row)"
              >提交审核</div>
              <div
                v-if="scope.row.sample_status==='3'&&scope.row.user_id==userid"
                @click="cancel_sample_apply(scope.$index, scope.row)"
              >撤回审核</div>
              <div
                @click="sample_agree(scope.$index, scope.row,1)"
                v-if="scope.row.sample_status==='3'"
              >通过</div>
              <div
                @click="sample_agree(scope.$index, scope.row,0)"
                v-if="scope.row.sample_status==='3'"
              >不通过</div>-->
              <!-- 3 -->
              <div @click="handleEdit(scope.$index, scope.row)">查看</div>
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
      :current-page="pageIndex"
      :page-sizes="[9, 18, 27, 36]"
      :page-size="pageSize"
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
  getStyleAll,
  sampleApply,
  cancelSampleApply,
  sampleAgree,
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
        design_status: "",
      },
      user_id: "",
      tableData: [],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      optionProps1: {
        value: "style_type",
        label: "style_type",
        children: "children",
      },
      wests: [],
      obj: {},
      pageIndex: 1,
      pageSize: 9,
      count: 0,
      stylist: "",
      state: "",
      states: [
        { design: "等待设计", design_status: 0 },
        { design: "设计已上传", design_status: 1 },
        { design: "设计审核中", design_status: 2 },
        { design: "撤回审核", design_status: 3 },
        { design: "设计不通过", design_status: 4 },
        { design: "设计通过", design_status: 5 },
      ],
      permission: [],
    };
  },
  methods: {
    addStyle() {
      this.$router.push({ path: `/addDesignStyle` });
    },
    async sample_apply(index, row) {
      let res = await sampleApply({ style_id: row.id });
      console.log(res);
      this.init();
    },
    async sample_agree(index, row, e) {
      let res = await sampleAgree({ style_id: row.id, agree: e });
      console.log(res);
      this.init();
    },
    // async sample_agree2(index, row, e) {
    //   let res = await sampleAgree({ style_id: row.id, agree: e });
    //   console.log(res);
    //   this.init();
    // },
    async cancel_sample_apply(index, row) {
      let res = await cancelSampleApply({ style_id: row.id });
      console.log(res);
      this.init();
    },
    get_year() {
      this.pageIndex = 1;
      this.init();
    },
    get_season() {
      this.pageIndex = 1;
      this.init();
    },
    get_style_type() {
      // console.log(this.formInline);
      this.formInline.style_type = this.formInline.style_type.pop();
      this.pageIndex = 1;
      this.init();
    },
    onSubmit() {
      this.pageIndex = 1;
      this.init();
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ path: `/designNote?id=${row.id}&TL=${100}` });
    },
    handleUser_id(e) {
      this.pageIndex = 1;
      this.formInline.user_id = e;
      this.init();
    },
    designStatus(e) {
      this.pageIndex = 1;
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
      let res = await getStylistList({ department_id: 1 });
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
      this.formInline["page"] = this.pageIndex;
      this.formInline["page_size"] = this.pageSize;
      let res = await getStyleAll(this.formInline);
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      // console.log(this.tableData);
      this.tableData.map((v, i) => {
        if (v.design_status == "0") {
          v.design = "等待设计";
        }
        if (v.design_status == "1") {
          v.design = "设计已上传";
        }
        if (v.design_status == "2") {
          v.design = "设计审核中";
        }
        if (v.design_status == "3") {
          v.design = "撤回审核";
        }
        if (v.design_status == "4") {
          v.design = "设计不通过";
        }
        if (v.design_status == "5") {
          v.design = "设计通过";
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
    this.getWest();
    this.init();
    this.permission = localStorage.getItem("permission").split(",");
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
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin: 0 10px;
    }
  }
  .btn:hover {
    cursor: pointer;
  }
  .form {
    display: flex;
  }
  .addStyle {
    margin-left: 200px;
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
</style>