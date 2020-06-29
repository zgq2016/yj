<template>
  <!--  v-if="data.id=data.id||0" -->
  <div class="right_list">
    <!-- 搜索 新增 -->
    <div style="display:flex;justify-content: space-between;align-items: center;">
      <div class="search">
        <el-input v-model="companyname" placeholder="请输入内容" style="width:200px;margin:0 10px;"></el-input>
        <el-button class="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <!-- add -->
      <div class="addStyle">
        <span class="add" @click="addSupplier">新增</span>
      </div>
    </div>

    <!-- main -->
    <div class="main">
      <div class="dataList">
        <div
          @click="listDeital(item)"
          class="list"
          v-for="(item, index) in SupplierList"
          :key="index"
        >
          <div class="list_img">
            <img :src="item.cardpicurl" alt />
          </div>
          <div class="list_content">
            <div class="list_content_left">
              <div class="list_content_left_name">{{item.companyname}}</div>
              <div>{{item.mainclass}}<em v-if="item.materials_class_name">({{item.materials_class_name}})</em></div>
              <div v-if="item.supplier_contact_data.length>0" >{{item.supplier_contact_data[0].contacts}}:{{item.supplier_contact_data[0].phone}}</div>
            </div>
            <!-- <div class="list_content_right">101</div> -->
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
import { getSupplierList } from "@/api/archives";
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
    handleSearch() {
      if (this.companyname === "") {
        this.data.id = 0;
        this.init();
      } else {
        this.data.id = this.data.id;
        this.init();
      }
    },
    addSupplier() {
      // console.log(this.data.id || 0);
      this.$router.push({ path: `/addSupplier?id=${this.data.id || 0}` });
    },
    listDeital(item) {
      this.$router.push({ path: `/listDeital?id=${item.id}` });
    },
    async init() {
      let res = await getSupplierList({
        materials_class_id: this.data.id || "",
        page: this.pageIndex,
        page_size: this.pageSize,
        companyname: this.companyname
      });
      // console.log(res);
      let { data, count } = res.data;
      this.total = count;
      this.SupplierList = data;
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
.right_list {
  .addStyle {
    text-align: right;
    .add {
      border-radius: 12px;
      padding: 8px 50px;
      color: #000;
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
    .dataList {
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 25%;
        height: 60px;
        margin: 0 70px 20px 0;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f2f2f2;
        display: flex;
        cursor: pointer;
        .list_img {
          img {
            width: 60px;
            height: 60px;
          }
        }
        .list_content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding: 5px 20px;
          .list_content_left {
            .list_content_left_name {
              font-weight: 600;
              color: #000;
              div {
                padding: 5px 0;
              }
            }
          }
        }
      }
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>