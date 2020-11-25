 <template>
  <div
    class="productionOrders"
    v-if="permission.indexOf('productionOrders') != -1"
  >
    <div class="aa">
      <!-- 面包屑 -->
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>生产</el-breadcrumb-item>
          <el-breadcrumb-item>生产下单</el-breadcrumb-item>
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
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="formInline.year"
            clearable
            placeholder="年份"
            style="width: 120px"
            @change="onSubmit"
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
            @change="onSubmit"
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
            @change="onSubmit(101)"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="formInline.order_status"
            clearable
            placeholder="状态"
            style="width: 120px"
            @change="onSubmit"
          >
            <el-option
              v-for="item in states"
              :key="item.id"
              :label="item.v"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="addStyle" v-if="permission.indexOf('produce_lotadd') != -1">
        <div @click="addOrders">新增下单</div>
      </div>
    </div>
    <div class="table">
      <el-table
        id="printTest"
        ref="singleTable"
        :data="tableData"
        size="mini"
        highlight-current-row
        @cell-click="cellClick"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column align="center" label="图片">
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
            >
              <div slot="error" class="image-slot">
                <!-- <i class="el-icon-picture-outline"></i> -->
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="styleno"
          label="款号"
        ></el-table-column>
        <el-table-column
          align="center"
          property="stylename"
          label="名称"
        ></el-table-column>
        <el-table-column
          align="center"
          property="produce_no"
          label="批号"
        ></el-table-column>
        <!-- <el-table-column align="center" property="style_color" label="颜色"></el-table-column> -->
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
          property="user_name"
          label="设计师"
        ></el-table-column>
        <el-table-column
          align="center"
          property="state"
          label="状态"
        ></el-table-column>
        <el-table-column
          align="center"
          v-if="permission.indexOf('produce_info') != -1"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              class="elbtn"
              size="mini"
              v-if="scope.row.order_status == 1"
              @click="handleEdit(scope.$index, scope.row)"
              >{{ "查看" }}</el-button
            >
            <el-button
              class="elbtn"
              size="mini"
              v-if="
                scope.row.order_status == 0 &&
                permission.indexOf('produce_info') != -1
              "
              @click="handleAdd(scope.$index, scope.row)"
              >{{ "下单" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
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
  getProduceOrderList,
} from "@/api/researchDevelopment";
import { produceAdd, getProduceList } from "@/api/production";
export default {
  data() {
    return {
      formInline: {
        styleno: "",
        year: "",
        season: "",
        user_id: "",
        style_type: "",
        order_status: "",
      },
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
          v: "全部",
          id: 3,
        },
        {
          v: "未下单",
          id: 0,
        },
        {
          v: "已下单",
          id: 1,
        },
        {
          v: "已完成",
          id: 2,
        },
      ],
      tableData: [],
      permission: [],
    };
  },
  methods: {
    cellClick(row, column, cell, event) {
      // console.log(row, column, cell, event);
      if (
        column.label == "图片" ||
        column.label == "名称" ||
        column.label == "款号"
      ) {
        // this.$router.push({
        //   path: "/designNote?id=" + row.style_id+TL
        // });
        this.$router.push({ path: `/designNote?id=${row.style_id}&TL=20` });
      }
    },
    // 查看
    handleEdit(index, row) {
      // console.log(row);
      // console.log(index);
      this.$router.push({
        path: `/sc_Order_information?id=${row.style_id}&TL=${0}&produce_no=${
          row.produce_no
        }`,
      });
    },
    // 下单
    async handleAdd(index, row) {
      // let res = await produceAdd({style_id: row.style_id})
      // console.log(res);

      this.$router.push({
        path: `/productionStyle?id=${
          row.style_id
        }&activeNames=1&TL=${0}&produce_no=${row.produce_no}`,
      });
    },
    // 查询
    async onSubmit(val) {
      if (val == 101) {
        this.formInline.style_type = this.formInline.style_type.pop();
      }
      this.page = 1;
      this.init();
    },
    //  增加下单
    addOrders() {
      this.$router.push({ path: `/designFile?TL=${1}` });
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
    async init() {
      this.formInline.page = this.page;
      this.formInline.page_size = this.page_size;
      let res = await getProduceList(this.formInline);
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      this.tableData.map((v, i) => {
        // this.stylists.map((j, k) => {
        //   if (v.user_id == j.id) {
        //     v.stylist = j.name;
        //   }
        // });
        if (v.order_status == 0) {
          v.state = "未下单";
        } else if (v.order_status == 1) {
          v.state = "已下单";
        }
      });
    },
    async handleUser_id(e) {
      this.formInline.user_id = e;
      this.onSubmit();
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
.productionOrders {
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
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .addStyle {
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

  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>