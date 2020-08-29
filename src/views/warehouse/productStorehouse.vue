<template>
  <div class="productStorehouse" v-if="permission.indexOf('productStorehouse')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>产品库存查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input
        style="width:200px;margin-right:10px;"
        v-model="formInline.stylename"
        placeholder="请输入商品名称"
      ></el-input>
      <el-input style="width:120px" type="number" v-model="formInline.min" placeholder="请输入数量"></el-input>&nbsp;至
      <el-input style="width:120px" type="number" v-model="formInline.max" placeholder="请输入数量"></el-input>
      <el-button icon="el-icon-search" size="mini" circle class="search_button" @click="onSubmit"></el-button>
    </div>
    <div class="main">
      <div class="form">
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-select
              v-model="formInline.storehouse_id"
              clearable
              @change="onSubmit"
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
          <el-form-item>
            <el-select
              v-model="formInline.style_type"
              clearable
              placeholder="请选择分类"
              style="width:120px"
              @change="onSubmit"
            >
              <el-option
                v-for="item in cate"
                :key="item.id"
                :label="item.style_type"
                :value="item.style_type"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-checkbox @change="onSubmit" v-model="formInline.checked">过滤无库存</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="addStyle">
          <div>展示统计数据</div>
        </div>
      </div>
      <div class="table">
        <el-table
          id="printTest"
          ref="tableData"
          :data="tableData"
          size="mini"
          highlight-current-row
        >
          <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
          <el-table-column align="center" prop="stylename" label="名称"></el-table-column>
          <el-table-column align="center" label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 50px;border-radius: 5px;margin-right: 5px;"
                :src="scope.row.image"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="styleno" label="款号"></el-table-column>
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
    <div class="btn">
      <el-button size="mini" >导出</el-button>
      <el-button v-print="'#printTest'" size="mini">打印</el-button>
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
import {
  storehouseList,
  bookStockList,
  materialStoreList,
} from "@/api/warehouse.js";
import { getCategoryList } from "@/api/researchDevelopment.js";

export default {
  data() {
    return {
      power: "",
      input: "",
      formInline: {
        stylename: "",
        storehouse_id: "",
        style_type: "",
        min: "",
        max: "",
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
      permission:[]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.init(this.formInline);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.formInline);
    },
    onSubmit() {
      if (this.formInline.checked == true) {
        this.formInline.hide_empty = 1;
      } else {
        this.formInline.hide_empty = 0;
      }
      console.log(this.formInline);

      this.init(this.formInline);
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
        state: 1,
        storehouse_type: 0,
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
      this.total = res1.data.count;
      // console.log(this.tableData);
      this.colors = [];
      this.tableData.map((v, i) => {
        for (let key in v.size_data) {
          if (this.colors.indexOf(key) == -1) {
            this.colors.push(key);
          }
        }
      });
      this.tableData.map((v, i) => {
        v.sizes = [];
        for (let key in v.size_data) {
          this.colors.map((j, k) => {
            if (j == key && v.sizes.length < this.colors.length) {
              v.sizes.push(v.size_data[key]);
            } else if (j == key && v.sizes.length == this.colors.length) {
              v.sizes.splice(j, 0, v.size_data[key]);
            } else if (v.sizes.length < this.colors.length) {
              v.sizes.push(0);
            }
          });
        }
      });
    },
  },
  mounted() {
    this.init();
    this.store();
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>
<style lang="less" scoped>
.productStorehouse {
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
    align-items: center;
  }
  .addStyle {
    margin: 0 30px 30px 0;
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

  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>