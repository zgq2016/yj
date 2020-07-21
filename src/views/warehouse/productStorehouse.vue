<template>
  <div class="productStorehouse">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>产品库存查询</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="searchInput">
        <el-form :inline="true" :model="form">
          <el-form-item label="仓库:">
            <el-select v-model="form.warehouse" placeholder="请选择仓库" style="width:120px">
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
            <el-input style="width:130px" v-model="form.commodity" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="分类:">
            <el-select v-model="form.warehouse" placeholder="请选择分类" style="width:120px">
              <!-- <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option> -->
              <el-option label="分类1" value="分类1"></el-option>
              <el-option label="分类2" value="分类2"></el-option>
              <el-option label="分类3" value="分类3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数量:">
            <el-input style="width:100px" v-model="form.beforenumber" placeholder="请输入数量"></el-input>&nbsp;至
            <el-input style="width:100px" v-model="form.afternumber" placeholder="请输入数量"></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.checked">过滤无库存</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary">展示统计数据</el-button>
        <el-button type="primary">导出</el-button>
        <el-button v-print="'#printTest'" type="primary">打印</el-button>
      </div>
      <hr style="border:1px dashed #ccc" />
      <div class="table">
        <el-table
          id="printTest"
          ref="singleTable"
          :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" property="username" label="名称"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.picimg" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column align="center" property="stylenumber" label="货号"></el-table-column>
          <el-table-column align="center" property="stylenumber" label="条码"></el-table-column>
          <!-- <el-table-column :property="scope.row.color" label="条码"></el-table-column> -->
          <el-table-column
            align="center"
            v-for="(item,index) in color"
            :key="index"
            :prop="'color.'+index"
            :label="item"
          ></el-table-column>

          <el-table-column align="center" property="category1" label="F"></el-table-column>
          <el-table-column align="center" property="category" label="品牌"></el-table-column>
          <el-table-column align="center" property="inventorynum" label="仓库"></el-table-column>
          <el-table-column align="center" property="unit" label="单位"></el-table-column>
          <el-table-column align="center" property="num" label="当前库存"></el-table-column>
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
import { storehouseList } from "@/api/warehouse.js";
export default {
  data() {
    return {
      input: "",
      form: {
        checked: true
      },
      tableData: [
        {
          picimg:
            "https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__9baf896cacfe3438e33a5434b694f14c.svg",
          username: "阿斯顿",
          stylenumber: "品牌",
          color: ["100", "200", "200"],
          category: "西所",
          inventorynum: "仓库1",
          unit: "件",
          operation: "0",
          category1: 0,
          num: 0
        }
      ],
      pageIndex: 1,
      pageSize: 9,
      pageIndex2: 1,
      pageSize2: 9,
      total: 0,
      total2: 0,
      color: ["X", "L", "XXL"],
      ware: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    onSubmit() {
      console.log(this.form);
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.init();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.init();
    },
    async init() {
      // 仓库
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.productStorehouse {
  .main {
    margin: 20px;
    /deep/.pagination {
      float: right;
    }
    .searchInput {
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