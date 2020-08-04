<template>
  <div class="materialStorage" v-if="power.indexOf('C4000100')!=-1">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>物料库存流水</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="searchInput">
        <el-form :inline="true" :model="form">
          <el-form-item label="仓库:">
            <el-select
              v-model="form.storehouse_id"
              clearable
              placeholder="请选择仓库"
              style="width:120px"
            >
              <el-option
                v-for="item in ware"
                :key="item.id"
                :label="item.storehouse_name"
                :value="item.id"
              ></el-option>
              <el-pagination
                small
                layout="prev, pager, next"
                @size-change="handleSize"
                @current-change="handleCurrent"
                :total="total2"
              ></el-pagination>
            </el-select>
          </el-form-item>

          <el-form-item label="商品:">
            <el-input style="width:130px" v-model="form.materials_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="颜色:">
            <el-select v-model="form.color" clearable placeholder="请选择分类" style="width:120px">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.color_name"
                :value="item.color_name"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="尺码:">
            <el-select v-model="form.warehouse" clearable placeholder="请选择分类" style="width:120px">
              <el-option
                v-for="item in sizes"
                :key="item.id"
                :label="item.size_name"
                :value="item.size_name"
              ></el-option>
            </el-select>
          </el-form-item>-->

          <el-form-item label="日期:">
            <el-date-picker
              style="width:300px;"
              v-model="form.business_time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <hr style="border:1px dashed #ccc" />
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          border
        >
          <el-table-column align="center" property="business_time" width="100" label="业务时间"></el-table-column>
          <el-table-column align="center" property="business_type" label="业务类别"></el-table-column>
          <el-table-column align="center" property="business_no" label="业务单号"></el-table-column>
          <el-table-column align="center" property="materials_name" label="名称"></el-table-column>
          <el-table-column align="center" property="materials_id" label="货号"></el-table-column>
          <el-table-column align="center" property="color" label="颜色"></el-table-column>
          <!-- <el-table-column align="center" property="category1" label="尺码"></el-table-column> -->
          <el-table-column align="center" property="storehouse_name" label="仓库"></el-table-column>
          <el-table-column align="center" property="add_quantity" label="库存增加数量"></el-table-column>
          <el-table-column align="center" property="quantity" label="剩余数量"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { storehouseList, materialStoreRecord } from "@/api/warehouse.js";
import { getColorSelect } from "@/api/researchDevelopment";
import { getSizeSelect } from "@/api/production";
export default {
  data() {
    return {
      power: "",
      input: "",
      form: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 9,
      pageIndex2: 1,
      pageSize2: 9,
      total: 0,
      total2: 0,
      color: ["X", "L", "XXL"],
      ware: [],
      options: [],
      sizes: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.init(this.form);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.form);
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.stock();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.stock();
    },
    onSubmit() {
      this.form.ctime_start = "";
      this.form.ctime_end = "";
      if (this.form.business_time) {
        this.form.ctime_start = this.form.business_time[0];
        this.form.ctime_end = this.form.business_time[1];
      }
      console.log(this.form);
      this.init(this.form);
    },
    // 尺码
    async sized() {
      let res1 = await getSizeSelect();
      let data1 = res1.data.data;
      this.sizes = data1;
    },
    async init(obj) {
      let res = await materialStoreRecord({
        page: this.pageIndex,
        page_size: this.page_size,
        ...obj,
      });
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.count;
    },
    // 仓库
    async stock() {
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2,
        state: 1,
        storehouse_type: 1,
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
      let res2 = await getColorSelect();
      this.options = res2.data.data;
    },
  },
  mounted() {
    this.init();
    this.stock();
    this.sized();
    this.power = localStorage.getItem("power");
  },
};
</script>
<style lang="less" scoped>
.materialStorage {
  .main {
    margin: 20px;
    /deep/.pagination {
      float: right;
    }
    .searchInput {
      /deep/.el-range-separator {
        padding: 0 !important;
      }
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