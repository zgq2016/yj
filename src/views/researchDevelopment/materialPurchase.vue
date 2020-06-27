<template>
  <div class="materialPurchase">
    <!-- 面
    包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item>版料采购</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- search_condition -->
      <div class="search_condition">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="款式">
            <el-input v-model="formInline.name" placeholder="名称、款号"></el-input>
          </el-form-item>
          <span @click.capture="getStylist">
            <el-form-item label="设计师">
              <el-select
                v-model="formInline.stylist"
                placeholder="设计师"
                @change="handleUser_id($event)"
                clearable 
              >
                <el-option
                  v-for="item in stylists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>
          <span @click.capture="getCategory">
            <el-form-item label="状态">
              <el-select v-model="formInline.category" clearable  placeholder="类别">
                <el-option
                  v-for="item in categorys"
                  :key="item.id"
                  :label="item.style_type"
                  :value="item.style_type"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>
          <el-form-item>
            <div @click="handleInquire" class="inquire">查询</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="图片" width="60">
            <template slot-scope="scope" property="style_pic_url">
              <img :src="scope.row.style_pic_url" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column property="style_color_pic_url">
            <template slot-scope="scope">
              <img :src="scope.row.style_color_pic_url" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column property="style_color" label="颜色"></el-table-column>
          <el-table-column property="stylename" label="名称"></el-table-column>
          <el-table-column property="styleno" label="款号"></el-table-column>
          <el-table-column property="style_type" label="品类"></el-table-column>
          <el-table-column property="正在进行中" label="状态">{{"正在进行中"}}</el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                class="elbtn"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >{{"查看"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  getStylistList,
  getCategoryList,
  getProjectStyleList
  // getCategoryList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      formInline: {
        name: "",
        category: "",
        stylist: ""
      },
      user_id: "",
      tableData: [],
      categorys: [],
      stylists: [],
      categorys: [],
      state:'正在进行中',
      obj:{},
      page: 1,
      page_size: 9,
      count:0,
    };
  },
  methods: {
    async handleInquire() {
      this.init(this.page,this.page_size)
    },
    handleEdit(index, row) {
      // console.log(row);
      let id = row.id
      this.$router.push({ path: `materialPurchasing?id=${id}` });
    },
    handleUser_id(e) {
      this.user_id = e;
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
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      // console.log(data);
      this.categorys = data;
    },
   
    async init(p,s){
      let res = await getProjectStyleList({
        'keyword':this.formInline.name == ''? '2':this.formInline.name,
        'page':p,
        'page_size':s
      });
      console.log(res);
      this.count = res.data.count;
      let { data } = res.data;
      this.tableData = data;
      // console.log(this.tableData);
    },
    handleSizeChange(val) {
      console.log(val)
      this.page_size = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(val)
      this.page = val;
      this.init();
    },
  },
  mounted(){
    this.init()
  }
};
</script>
<style lang="less" scoped>
.materialPurchase {
  .main {
    margin: 20px;
    .search_condition {
      .inquire {
        width: 100px;
        height: 40px;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
        &:hover {
          background-color: blue;
        }
      }
      /deep/.el-input__inner {
        width: 150px;
      }
    }
    .elbtn {
      padding: 5px 30px;
      border-radius: 10px;
    }
    .table {
      .img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>