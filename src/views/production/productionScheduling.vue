<template>
  <div class="productionScheduling" v-if="permission.indexOf('productionScheduling')!=-1">
    <div class="aa">
      <div class="bb">

      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>生产</el-breadcrumb-item>
        <el-breadcrumb-item>生产排单</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom:10px">
      <el-input v-model="formInline.styleno" placeholder="款号" style="width:200px"></el-input>
      <el-button icon="el-icon-search" size="mini" circle class="search_button" @click="onSubmit"></el-button>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="formInline.year"
          @change="onSubmit"
          clearable
          placeholder="年份"
          style="width:120px"
        >
          <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.season"
          @change="onSubmit"
          clearable
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
          placeholder="设计师"
          clearable
          @change="handleUser_id($event)"
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
          @change="onSubmit(101)"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.factory_status"
          clearable
          placeholder="状态"
          @change="onSubmit"
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
        size="mini"
        :data="tableData"
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
            >
              <div slot="error" class="image-slot">
                <!-- <i class="el-icon-picture-outline"></i> -->
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" property="styleno" label="款号"></el-table-column>
        <el-table-column align="center" property="stylename" label="名称"></el-table-column>
        <el-table-column align="center" property="produce_no" label="批号"></el-table-column>
        <!-- <el-table-column align="center" property="style_color" label="颜色"></el-table-column> -->
        <el-table-column align="center" property="style_type" label="品类"></el-table-column>
        <el-table-column align="center" property="year" label="年份"></el-table-column>
        <el-table-column align="center" property="season" label="季节"></el-table-column>
        <el-table-column align="center" property="user_name" label="设计师"></el-table-column>
        <el-table-column align="center" property="state" label="状态"></el-table-column>
        <el-table-column align="center" v-if="permission.indexOf('produce_info')!=-1" label="操作">
          <template slot-scope="scope">
            <el-button
              class="elbtn"
              size="mini"
              v-if="scope.row.factory_status==1"
              @click="handleEdit(scope.$index, scope.row)"
            >{{"查看"}}</el-button>
            <el-button
              class="elbtn"
              size="mini"
              v-if="scope.row.factory_status==0&&permission.indexOf('produce_factory_order_add')!=-1"
              @click="handleEdit(scope.$index, scope.row)"
            >{{"排单"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  getProjectStyleList,
  getCategoryList,
  getWestList,
  getProduceOrderList,
} from "@/api/researchDevelopment";
import { getProduceFactoryList } from "@/api/production";
export default {
  data() {
    return {
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
        factory_status: "",
      },
      page: 1,
      page_size: 9,
      total: 0,
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
      year: "", //年
      season: "", //季节
      stylist: "", //设计师
      category: "", //类别
      west: "", //西所
      state: "", //状态
      states: [
        {
          v: "全部",
          id: 3,
        },
        {
          v: "未排单",
          id: 0,
        },
        {
          v: "已排单",
          id: 1,
        },
        {
          v: "已完成",
          id: 2,
        },
      ],
      tableData: [],
      count: 0,
      number: 123,
      permission: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row);
      // console.log(index);

      // this.$router.push({
      //   path: "/productionStyle?id=" + row.style_id + "&activeNames=3"
      // });
      this.$router.push({
        path: `/sc_materialPurchasing?id=${
          row.style_id
        }&TL=${2}&produce_no=${row.produce_no}`,
      });
    },
    onSubmit(val) {
      if (val == 101) {
        this.formInline.style_type = this.formInline.style_type.pop();
      }
      this.page = 1;
      this.init(this.formInline);
    }, // 获取customer_id
    handleCustomer_id(e) {
      this.customer_id = e;
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
      let res = await getStylistList({ department_id: 1 });
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
      this.formInline["styleno"] = this.formInline.styleno.trim();
      let res = await getProduceFactoryList(this.formInline);
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
        if (v.factory_status == 0) {
          v.state = "未排单";
        } else if (v.factory_status == 1) {
          v.state = "已排单";
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
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.productionScheduling {
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
  .addStyle {
    margin: 0 30px 30px 0;
    // text-align: right;

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

  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>