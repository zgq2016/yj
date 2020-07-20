<template>
  <div class="materialStorage">
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
            <el-select v-model="form.warehouse" placeholder="请选择仓库" style="width:120px">
              <!-- <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option> -->
              <el-option label="仓库1" value="仓库1"></el-option>
              <el-option label="仓库2" value="仓库1"></el-option>
              <el-option label="仓库3" value="仓库1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品:">
            <el-input style="width:130px" v-model="form.commodity" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="颜色:">
            <el-select v-model="form.warehouse" placeholder="请选择分类" style="width:120px">
              <!-- <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option> -->
              <el-option label="分类1" value="分类1"></el-option>
              <el-option label="分类2" value="分类2"></el-option>
              <el-option label="分类3" value="分类3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="尺码:">
            <el-select v-model="form.warehouse" placeholder="请选择分类" style="width:120px">
              <!-- <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option> -->
              <el-option label="分类1" value="分类1"></el-option>
              <el-option label="分类2" value="分类2"></el-option>
              <el-option label="分类3" value="分类3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期:">
            <el-date-picker
              style="width:300px;"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
          <el-table-column align="center" property="username" label="业务时间"></el-table-column>
          <el-table-column align="center" property="username" label="货号"></el-table-column>
          <el-table-column align="center" property="stylenumber" label="名称"></el-table-column>
          <el-table-column align="center" property="stylenumber" label="颜色"></el-table-column>
          <el-table-column align="center" property="category1" label="尺码"></el-table-column>
          <el-table-column align="center" property="category" label="仓库"></el-table-column>
          <el-table-column align="center" property="inventorynum" label="业务类别"></el-table-column>
          <el-table-column align="center" property="unit" label="业务单号"></el-table-column>
          <el-table-column align="center" property="num" label="库存增加数量"></el-table-column>
          <el-table-column align="center" property="num" label="剩余数量"></el-table-column>
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
export default {
  data() {
    return {
      input: "",
      form: {
        checked: true
      },
      tableData: [{num:0}],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      color: ["X", "L", "XXL"]
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
    }
  },
  mounted() {}
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