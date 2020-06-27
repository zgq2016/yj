<template>
  <div class="routeCard_list">
    <!-- 搜索 新增 -->
    <div style="display:flex;justify-content: space-between;align-items: center;">
      <div class="search">
        <el-input v-model="companyname" placeholder="请输入内容" style="width:200px;margin:0 10px;"></el-input>
        <el-button class="el-icon-search">搜索</el-button>
      </div>
      <!-- add -->
      <div class="addStyle">
        <span class="add" @click="addRouteCard">新增</span>
      </div>
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
            <div style="font-weight: 600;font-size: 14px;">{{item.materials_mainclass_name}}<em v-if="item.materials_class_name">({{item.materials_class_name}})</em></div>
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
import { getMaterialsList } from "@/api/archives";
export default {
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: () => ({}) // 属性的默认值
    }
  },
  data() {
    return {
      companyname: "", //搜索
      SupplierList: [], //列表数据
      pageIndex: 1,
      pageSize: 24,
      total: 0
    };
  },
  methods: {
    routeCardDeital(item) {
      this.$router.push({ path: `/routeCardDeital?id=${item.id}` });
    },
    addRouteCard() {
      this.$router.push({ path: `/addRouteCard?id=${this.data.id || 0}` });
    },
    async init() {
      let res = await getMaterialsList({
        materials_class_id: this.data.id || 0,
        page: this.pageIndex,
        page_size: this.pageSize,
        companyname: this.companyname
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
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    data() {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.routeCard_list {
  .addStyle {
    // margin: 0 30px 30px 0;
    text-align: right;
    .add {
      border-radius: 12px;
      padding: 8px 50px;
      color: #000;
      // background-color: #fff;
      border: 1px solid #000;
      margin-right: 10px;
      &:hover {
        color: #fff;
        background-color: #000;
        cursor: pointer;
      }
    }
  }
  .main {
    padding: 20px 0;
    .data_list {
      display: flex;
      flex-wrap: wrap;
      .list {
        background-color: #f2f2f2;
        border-radius: 10px;
        width: 30%;
        display: flex;
        cursor: pointer;
        margin: 0 20px 20px 0;
        .list_img {
          img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
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
    text-align: right;
  }
}
</style>