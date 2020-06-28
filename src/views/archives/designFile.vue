<template>
  <div class="designFile">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>档案库</el-breadcrumb-item>
      <el-breadcrumb-item>款式档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="position: relative;"
      >
        <el-form-item label="商品">
          <el-input v-model="formInline.name" placeholder="款号"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-select v-model="year" placeholder="年份" style="width:120px">
            <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="季节">
          <el-select v-model="season" placeholder="季节" style="width:120px">
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
          <el-select v-model="category" placeholder="类别" style="width:120px">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button  type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          :data="tableData"
          @select="isCheckListBox"
          @select-all="Checkbox"
          highlight-current-row
          size="small"
          style="width:100%;"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template slot-scope="scope" property="style_pic_url">
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
          <el-table-column align="center" width="70"  label="操作">
            <template  slot-scope="scope">
              <el-button
                size="mini"
                style="float:left;"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" type="selection" width="55"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button v-print="'#printTest'" size="mini">打印</el-button>
        <el-button @click="OrderCreate" size="mini">生成下单表</el-button>
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
  getStyleList,
  produceOrderCreateAdd
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      formInline: {
        name: "",
        region: ""
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
      tableData: [],
      ids: []
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row);
      // console.log(index);

      this.$router.push({
        path:
          "/development?id=" + row.project_id
      });
    },
    async onSubmit() {
      // console.log("submit!");
      // let res = await getStyleList({
      //   page: this.page,
      //   page_size: this.count
      // });
      // console.log(res);
      // this.tableData =res.data.data

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
      let res = await getStyleList({
        page: this.page,
        page_size: this.page_size
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
      // console.log(val)
      this.page_size = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val;
      this.init();
    },
    // 随意勾选
    async isCheckListBox(selection, row) {
      this.ids = [];
      selection.map((v, i) => {
        this.ids.push({ id: v.id });
      });
    },
    // 全选
    Checkbox(selection) {
      this.ids = [];
      selection.map((v, i) => {
        this.ids.push({ id: v.id });
      });
    },
    // 确定下单
    async OrderCreate() {
      this.$confirm("提交已选下单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // console.log(this.ids);
          let res = await produceOrderCreateAdd({
            style_id_data: this.ids
          });
          // console.log(res);
          this.$router.push({ path: "/productionOrders" });
          this.$message({
            type: "success",
            message: "提交成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "提交失败"
          });
        });
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
.designFile {
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
