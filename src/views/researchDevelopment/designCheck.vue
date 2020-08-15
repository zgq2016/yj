<template>
  <div class="designCheck">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>研发</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
        <el-breadcrumb-item>项目详细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <div class="left_img">
        <div v-if="obj.picurl!==''">
          <img :src="obj.picurl" alt />
        </div>
        <div v-if="obj.picurl===''">
          <img v-if="obj.projecttype==='0'" src="../../assets/意向.jpg" alt />
          <img v-if="obj.projecttype==='1'" src="../../assets/阶段.jpg" alt />
          <img v-if="obj.projecttype==='2'" src="../../assets/系列.jpg" alt />
        </div>
      </div>
      <div class="right_content">
        <div style="height:160px">
          <div class="name">{{obj.projectname}}</div>
          <div class="client">客户：{{obj.customer_companyname}}</div>
          <div class="year">年份：{{obj.year}}</div>
          <div class="season">季节：{{obj.season}}</div>
          <div class="claim">要求：{{obj.detailed}}</div>
        </div>
        <div style="display:flex">
          <div
            @click="editOutline"
            class="edit"
            style="margin-right: 12px;background-color: #f2f2f2;"
            v-if="power.indexOf('A1000300')!=-1||power.indexOf('A1000400')!=-1"
          >
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
          <div class="add">
            <span
              style="background-color: #f2f2f2;color: #5e5e5e;"
              class="addStyle"
              @click="addTheStyle"
              v-if="power.indexOf('A2000200')!=-1"
            >添加款式</span>
            <span class="addStyle" @click="newTheStyle" v-if="power.indexOf('A2000200')!=-1">新增款式</span>
            <span class="addStyle" @click="switchover">切换</span>
          </div>
        </div>
      </div>
    </div>
    <!-- add -->

    <!-- table -->
    <div class="table" v-if="power.indexOf('A2000100')!=-1">
      <div v-if="switchover_active===false">
        <el-table ref="singleTable" size='mini' :data="tableData" highlight-current-row>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="图片" width="70">
            <template slot-scope="scope">
              <img :src="scope.row.style_pic_url" class="img" width="100" alt />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <img
                v-if="scope.row.style_color_pic_url!==''"
                :src="scope.row.style_color_pic_url"
                class="img"
                alt
              />
              <div
                v-if="scope.row.style_color_pic_url===''"
                :style="`background-color:${scope.row.color_code};`"
                class="color"
              ></div>
            </template>
          </el-table-column>
          <el-table-column property="style_color" label="颜色"></el-table-column>
          <el-table-column property="stylename" label="款式名称"></el-table-column>
          <el-table-column property="styleno" label="款号"></el-table-column>
          <el-table-column property="style_type" label="品类"></el-table-column>
          <el-table-column label="操作" align="right">
            <!-- 插槽：匿名插槽，具名插槽，数据插槽 -->
            <template v-slot="scope">
              <div @click="handleEdit(scope.row)" class="check">查看</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="switchover_active===true">
        <div class="card" v-for="(item, index) in tableData" :key="index">
          <div @click="handleEdit(item)">
            <img :src="item.style_pic_url" alt />
            <div style="color:#000">{{item.style_type}}</div>
            <div style="color:#000">{{item.stylename}}</div>
            <div style="color:#000">{{item.styleno}}</div>
            <div style="color:#ccc">{{item.user_name}}</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="款式搜索" :visible.sync="centerDialogVisible" width="60%" center>
      <div>
        <el-input
          v-model="input"
          placeholder="请填写款式名称或款号"
          clearable
          style="width:300px"
          @input="searchInput"
        ></el-input>
        <div style="display:flex;flex-wrap: wrap;width:100%">
          <div class="search__card" v-for="(item, index) in styleList" :key="index">
            <div @click="handleSelectItem(item)">
              <!-- router-link :to="`/newTheStyle?id=${$route.query.id}&oldId=${item.id}`" -->
              <div class="search_card_left">
                <div class="search_card_left_img">
                  <img :src="item.style_pic_url" alt />
                </div>
                <div class="search_card_left_content">
                  <div class="search_card_left_content_name">{{item.stylename}}</div>
                  <div>{{item.style_type}}</div>
                  <div>{{item.year}}</div>
                  <div>{{item.season}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        v-if="total!==0"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[9, 18, 27, 36]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProject,
  getProjectStyleList,
  projectStyleAddto,
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      obj: {},
      tableData: [],
      centerDialogVisible: false,
      input: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      styleList: [],

      power: "",
      switchover_active: false,
    };
  },
  methods: {
    switchover() {
      this.switchover_active = !this.switchover_active;
    },
    handleSelectItem(item) {
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        console.log(item);
        this.$router.push({
          path: `/newTheStyle?id=${this.$route.query.id}&oldId=${item.id}`,
        });
      });
    },
    async searchInput() {
      let res = await getProjectStyleList({
        keyword: this.input,
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.styleList = data;
      this.total = count;
    },
    newTheStyle() {
      let { id } = this.$route.query;
      this.$router.push({ path: `/newTheStyle?id=${id}` });
    },
    addTheStyle() {
      this.centerDialogVisible = true;
    },
    handleEdit(e) {
      console.log(e);
      let { id } = e;
      this.$router.push({
        path: `/development?id=${id}&TL=${30}&project_id=${this.obj.id}`,
      });
    },
    editOutline() {
      let { id } = this.$route.query;
      this.$router.push({ path: `/detailEdit?id=${id}` });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchInput();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.searchInput();
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getProject({ id });
      // console.log(res);
      this.obj = res.data.data;
      this.tableData = res.data.data.style_data;
      console.log(this.tableData);
    },
  },
  async mounted() {
    this.init();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.designCheck {
  .add {
    display: flex;
    .addStyle {
      margin-right: 12px;
      border-radius: 15px;
      width: 120px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #000;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .detail {
    padding: 0 0 15px 0;
    display: flex;
    img {
      width: 200px;
      height: 200px;
      border-radius: 15px;
      margin-right: 20px;
    }
    .right_content {
      flex: 1;
      .claim {
        width: 1200px;
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
      }

      .name {
        font-size: 20px;
        font-weight: 600;
      }
      div {
        font-size: 14px;
        margin: 0 0 10px 0;
      }
    }
    .edit {
      width: 30px;
      height: 30px;
      background-color: #000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 15px;
    }
  }

  .check {
    cursor: pointer;
  }
  .search__card {
    display: flex;
    width: 300px;
    margin: 10px;
    .search_card_left {
      width: 300px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      background-color: #f2f2f2;
      .search_card_left_img {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .search_card_left_content {
        padding-top: 3px;
        .search_card_left_content_name {
          font-weight: 700;
        }
        div {
          margin: 5px;
        }
      }
    }
    .search_card_right {
      background-color: #f2f2f2;
      width: 50px;
      height: 100px;
      border-radius: 10px;
    }
  }
  .table {
    // margin-top: -40px;
    .img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
    .color {
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
  .card {
    margin: 0 25px 20px 0;
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
    width: 130px;
    height: 300px;
    float: left;
    img {
      width: 130px;
      height: 230px;
      border-radius: 10px;
      margin-bottom: 3px;
    }
    div {
      margin: 1px 5px;
    }
  }
  // .el-table th,
  // .el-table tr {
  //   background-color: #fff;
  //   height: 72px;
  // }
  // /deep/ .el-table th > .cell {
  //   font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
  //     \\5b8b\4f53, sans-serif;
  // }
  // /deep/ .el-table tr {
  //   height: 10px;
  // }
}
</style>