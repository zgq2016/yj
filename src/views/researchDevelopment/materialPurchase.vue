<template>
  <div class="materialPurchase" v-if="permission.indexOf('materialPurchasing')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>研发</el-breadcrumb-item>
        <el-breadcrumb-item>版料采购</el-breadcrumb-item>
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
        <el-select
          v-model="formInline.year"
          clearable
          placeholder="年份"
          style="width:120px"
          @change="get_year($event)"
        >
          <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.season"
          clearable
          placeholder="季节"
          style="width:120px"
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
          style="width:120px"
        >
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
      <!-- <el-form-item>
        <el-select v-model="formInline.state" clearable placeholder="状态" style="width:120px">
          <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>-->
    </el-form>
    <div class="table">
      <el-table
        ref="singleTable"
        size="mini"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column align="center" label="图片" width="140">
          <template slot-scope="scope" property="style_pic_url">
            <div style="display: flex;">
              <el-image
                style="width: 50px; height: 50px;border-radius: 5px;margin-right: 5px;"
                :src="scope.row.style_pic_url"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <!-- <i class="el-icon-picture-outline"></i> -->
                </div>
              </el-image>
              <img
                :src="scope.row.style_color_pic_url"
                class="img"
                style="width: 50px; height: 50px;border-radius: 5px;"
                alt
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" property="stylename" label="名称"></el-table-column>
        <el-table-column align="center" property="styleno" label="款号"></el-table-column>
        <el-table-column align="center" width="90" property="style_color" label="颜色"></el-table-column>
        <el-table-column align="center" property="style_type" label="品类"></el-table-column>
        <el-table-column align="center" property="year" label="年份"></el-table-column>
        <el-table-column align="center" property="season" label="季节"></el-table-column>
        <el-table-column align="center" property="username" label="设计师"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <div
              style="background:url('https://yj.ppp-pay.top/upload/20200905/20200905182549.png') no-repeat;background-position: 100% 50%;
              background-size: 49px;"
              v-if="scope.row.is_urgent"
            >
              <em>{{scope.row.purchase}}</em>
              <!-- <div ></div> -->
            </div>
            <div v-else>
              <em>{{scope.row.purchase}}</em>
              <!-- <div ></div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="btn">
              <div
                @click="materials_agree(scope.$index, scope.row,1)"
                v-if="scope.row.materials_status==='2'&&permission.indexOf('materials_agree')!=-1"
              >通过</div>
              <div
                @click="materials_agree(scope.$index, scope.row,0)"
                v-if="scope.row.materials_status==='2'&&permission.indexOf('materials_agree')!=-1"
              >不通过</div>
              <div
                v-if="scope.row.materials_status !='2'&&permission.indexOf('get_style_purchase')!=-1"
                @click="handleEdit(scope.$index, scope.row)"
              >查看</div>
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
  getStyleList,
  getStylePurchase,
  materialsAgree,
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
        { name: "未下单", id: 0 },
        { name: "已下单", id: 1 },
        { name: "部份回料", id: 2 },
        { name: "延时回料", id: 3 },
        { name: "全部回料", id: 4 },
      ],
      permission: [],
    };
  },
  methods: {
    async materials_agree(index, row, e) {
      console.log();
      let res = await materialsAgree({ style_id: row.id, agree: e });
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
      this.formInline.style_type = this.formInline.style_type.pop();
      this.pageIndex = 1;
      this.init();
    },
    onSubmit() {
      this.pageIndex = 1;
      this.init();
    },
    handleEdit(index, row) {
      this.$router.push({ path: `/materialPurchasing?id=${row.id}&TL=${1}` });
    },
    handleUser_id(e) {
      this.pageIndex = 1;
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
      let res = await getStylePurchase(this.formInline);
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      this.tableData.map((v, i) => {
        if (v.purchase_status == "0") {
          v.purchase = "未生成采购单";
        }
        if (v.purchase_status == "1") {
          v.purchase = "等待采购";
        }
        if (v.purchase_status == "2") {
          v.purchase = "部分主料已下单";
        }
        if (v.purchase_status == "3") {
          v.purchase = "全部主料已下单";
        }
        if (v.purchase_status == "4") {
          v.purchase = "部分辅料已下单";
        }
        if (v.purchase_status == "5") {
          v.purchase = "全部辅料已下单";
        }
        if (v.purchase_status == "6") {
          v.purchase = "全部回料完成";
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
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>
<style lang="less" scoped>
.materialPurchase {
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
}
</style>