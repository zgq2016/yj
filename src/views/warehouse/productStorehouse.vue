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
            <el-input style="width:130px" v-model="form.stylename" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="分类:">
            <el-select v-model="form.style_type" clearable placeholder="请选择分类" style="width:120px">
              <el-option
                v-for="item in cate"
                :key="item.id"
                :label="item.style_type"
                :value="item.style_type"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数量:">
            <el-input style="width:120px" type='number' v-model="form.min" placeholder="请输入数量"></el-input>&nbsp;至
            <el-input style="width:120px" type='number' v-model="form.max" placeholder="请输入数量"></el-input>
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
          ref="tableData"
          :data="tableData"
          size='mini'
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" prop="stylename" label="名称"></el-table-column>
          <el-table-column align="center" width="70" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.image" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="styleno" label="货号"></el-table-column>
          <el-table-column align="center" prop="stylenumber" label="条码"></el-table-column>
          <el-table-column
            align="center"
            v-for="(item,index) in colors"
            :key="index"
            :prop="'sizes.'+index"
            :label="item"
          ></el-table-column>
          <el-table-column align="center" prop="storehouse_name" label="仓库"></el-table-column>
          <el-table-column align="center" prop="unit" label="单位"></el-table-column>
          <el-table-column align="center" prop="total_quantity" label="当前库存"></el-table-column>
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
import { storehouseList, bookStockList ,materialStoreList} from "@/api/warehouse.js";
import { getCategoryList } from "@/api/researchDevelopment.js";

export default {
  data() {
    return {
      input: "",
      form: {
        checked: true,
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      pageIndex2: 1,
      pageSize2: 10,
      total: 0,
      total2: 0,
      colors: [],
      ware: [],
      cate: [],
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
    onSubmit() {
      if (this.form.checked == true) {
        this.form.hide_empty = 1;
      } else {
        this.form.hide_empty = 0;
      }
      console.log(this.form);

      this.init(this.form);
    },
    handleSize(val) {
      this.pageSize2 = val;
      this.store();
    },
    handleCurrent(val) {
      this.pageIndex2 = val;
      this.store();
    },
    // 仓库
    async store() {
      let res = await storehouseList({
        page: this.pageIndex2,
        page_size: this.pageSize2,
        state:1,
        storehouse_type:1
      });
      let { data } = res.data;
      this.ware = data;
      this.total2 = res.data.count;
    },
    async init(obj) {
      // 分类
      let res = await getCategoryList();
      this.cate = res.data.data;
      // console.log(res);
      let res1 = await bookStockList({
        page: this.pageIndex,
        page_size: this.pageSize,
        ...obj,
      });
      this.tableData = res1.data.data;
      this.total = res1.data.count
      console.log(this.tableData);
      console.log(res1);
      this.tableData.map((v, i) => {
        v.sizes = [];
        this.colors =[]
        for (let key in v.size_data) {
          // console.log(key, v.size_data[key]);
          this.colors.push(key);
          v.sizes.push(v.size_data[key]);
        }
      });
      
    },
  },
  mounted() {
    this.init();
    this.store();
    
  },
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