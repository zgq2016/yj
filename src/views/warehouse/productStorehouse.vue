<template>
  <div class="productStorehouse">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>产品回仓</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="searchInput">
        <label for style="margin-right: 20px;">扫描</label>
        <el-input v-model="input" placeholder="请输入内容" style="width:200px"></el-input>
      </div>
      <div class="table">
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.picimg" class="img" alt />
            </template>
          </el-table-column>
          <el-table-column property="username" label="名称"></el-table-column>
          <el-table-column property="stylenumber" label="款号"></el-table-column>
          <el-table-column property="color" label="颜色"></el-table-column>
          <el-table-column property="category" label="品类"></el-table-column>
          <el-table-column property="inventorynum" label="库存数量"></el-table-column>
          <el-table-column property="unit" label="单位"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                class="elbtn"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >{{scope.row.operation}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <!-- 打印  导出-->
      <div class="btn">
        <el-button size="mini">打印</el-button>
        <el-button size="mini">导出</el-button>
        <el-button size="mini">确认入库</el-button>
      </div>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",

      tableData: [
        {
          picimg:
            "https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__9baf896cacfe3438e33a5434b694f14c.svg",
          username: "王小虎",
          stylenumber: "王小虎",
          color: "王小虎",
          category: "王小虎",
          inventorynum: "王小虎",
          unit: "王小虎",
          operation: "王小虎"
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    }
  }
};
</script>
<style lang="less" scoped>
.productStorehouse {
  .main {
    margin: 20px;
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