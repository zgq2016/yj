<template>
  <div class="designCheck">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
      <el-breadcrumb-item>项目详细</el-breadcrumb-item>
    </el-breadcrumb>
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
        <!-- <img :src="obj.picurl" style="border-radius: 10px;" alt /> -->
      </div>
      <div class="right_content">
        <div class="name">项目名称：{{obj.projectname}}</div>
        <div class="client">客户：{{obj.customer_companyname}}</div>
        <div class="year">年份：{{obj.year}}</div>
        <div class="season">季节：{{obj.season}}</div>
        <div class="claim">要求：{{obj.detailed}}</div>
      </div>
      <div
        class="edit el-icon-edit-outline"
        @click="editOutline"
        v-if="power.indexOf('A1000300')!=-1||power.indexOf('A1000400')!=-1"
      ></div>
    </div>
    <!-- add -->
    <div class="addStyle" v-if="power.indexOf('A2000100')!=-1">
      <span class="add" @click="addTheStyle" v-if="power.indexOf('A2000200')!=-1">添加款式</span>
      <span
        class="el-dropdown-link el-icon-plus"
        @click="newTheStyle"
        v-if="power.indexOf('A2000200')!=-1"
      >新增款式</span>
    </div>
    <!-- table -->
    <div class="table">
      <el-table ref="singleTable" :data="tableData" highlight-current-row>
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

    <el-dialog title="款式搜索" :visible.sync="centerDialogVisible" width="60%" center>
      <div>
        <el-input
          v-model="input"
          placeholder="请填写款式名称或款号"
          clearable
          style="width:300px"
          @input="searchInput"
        ></el-input>
        <div style="display:flex;flex-wrap: wrap;">
          <div></div>
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
  projectStyleAddto
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

      power: ""
    };
  },
  methods: {
    handleSelectItem(item) {
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        console.log(item);
        this.$router.push({
          path: `/newTheStyle?id=${this.$route.query.id}&oldId=${item.id}`
        });
      });
    },
    async searchInput() {
      let res = await getProjectStyleList({
        keyword: this.input,
        page: this.pageIndex,
        page_size: this.pageSize
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
        path: `/development?id=${id}&TL=${30}&project_id=${this.obj.id}`
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
      this.obj = res.data.data;
      this.tableData = res.data.data.style_data;
      console.log(res);
    }
  },
  async mounted() {
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  }
};
</script>

<style lang="less" scoped>
.designCheck {
  .detail {
    padding: 40px 20px;
    display: flex;
    img {
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .right_content {
      flex: 1;
      .claim {
        width: 900px;
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
        margin: 10px 0;
      }
    }
    .edit {
      font-size: 40px;
      text-align: right;
      cursor: pointer;
      color: orange;
    }
  }
  .addStyle {
    margin: 0 30px 30px 0;
    text-align: right;
    .add {
      border-radius: 12px;
      padding: 8px 30px;
      color: #fff;
      background-color: orange;
      margin-right: 10px;
      &:hover {
        background-color: rgb(16, 182, 182);
        cursor: pointer;
      }
    }
    .el-dropdown-link {
      border-radius: 12px;
      padding: 10px 40px;
      color: #fff;
      background-color: orange;
      &:hover {
        background-color: rgb(16, 182, 182);
        cursor: pointer;
      }
    }
  }
  .check {
    cursor: pointer;
  }
  .search__card {
    display: flex;
    width: 30%;
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
    .img {
      width: 40px;
      height: 40px;
    }
    .color {
      width: 40px;
      height: 40px;
    }
  }
}
</style>