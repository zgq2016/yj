<template>
  <div class="routeCard_list">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item>供应商</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input placeholder="单据编号" v-model="companyname" clearable style="width:200px"></el-input>
      <el-button
        icon="el-icon-search"
        size="mini"
        circle
        class="search_button"
        @click="handleSearch"
      ></el-button>
    </div>
    <div class="form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item prop="class_id">
          <el-select
            v-model="form.class_id"
            placeholder="选择物料"
            clearable
            @change="get_classData($event)"
            style="width:100px"
          >
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="addStyle" @click="addRouteCard" v-if="power.indexOf('E2000100')!=-1">新增</div>
    </div>
    <!-- main -->
    <div class="main">
      <div class="data_list">
        <div
          class="list"
          v-for="(item, index) in SupplierList"
          :key="index"
          @click="routeCardDeital(item)"
        >
          <div class="list_img">
            <img :src="item.picurl" alt />
          </div>
          <div class="list_content">
            <div style="font-weight: 600;font-size: 14px;">
              {{item.materials_mainclass_name}}
              <em
                v-if="item.materials_class_name"
              >({{item.materials_class_name}})</em>
            </div>
            <div>{{item.materialsname}}</div>
            <div>内部编号:{{item.materialsno}}</div>
            <div v-if="item.supplier_data.length>0">{{item.supplier_data[0].supplier_companyname}}</div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[24, 48, 72, 96]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMaterialsList, getMaterialsClass } from "@/api/archives";
export default {
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: () => ({}), // 属性的默认值
    },
  },
  data() {
    return {
      power: "",
      companyname: "", //搜索
      SupplierList: [], //列表数据
      pageIndex: 1,
      pageSize: 24,
      total: 0,
      classData: [],
      form: {
        class_id: "",
      },
    };
  },
  methods: {
    handleSearch() {
      if (this.companyname === "") {
        this.data.id = 0;
        this.init();
      } else {
        this.data.id = this.data.id;
        this.init();
      }
    },
    routeCardDeital(item) {
      this.$router.push({ path: `/routeCardDeital?id=${item.id}&TL=1` });
    },
    addRouteCard() {
      this.$router.push({ path: `/addRouteCard` });
    },
    async init() {
      let res = await getMaterialsList({
        materials_class_id: this.data.id || 0,
        page: this.pageIndex,
        page_size: this.pageSize,
        companyname: this.companyname,
      });
      console.log(res);
      let { data, count } = res.data;
      this.total = count;
      this.SupplierList = data;
      console.log(this.SupplierList);
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
    this.init();
    this.power = localStorage.getItem("power");
  },
  watch: {
    data() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.routeCard_list {
  .addStyle {
    margin: 0 30px 0px 0px;
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
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    padding: 20px 0;
    .data_list {
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 300px;
        margin: 0 20px 20px 0;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f2f2f2;
        display: flex;
        cursor: pointer;
        .list_img {
          img {
            width: 100px;
            height: 100px;
          }
        }
        .list_content {
          padding: 5px 10px;
          div {
            margin: 3px 0px;
          }
        }
      }
    }
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>