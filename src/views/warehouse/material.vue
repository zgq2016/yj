<template>
  <div class="material">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>物料库存查询</el-breadcrumb-item>
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
        <div class="box">
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594964476331&di=3f3573c4fd9b0f2ca185560428315961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dde32eec79e13b07ebdbd50003cd59113%2F90ef76c6a7efce1bb8d6a12ca251f3deb58f6552.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
          <div class="child">
            <div class="left">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594963650563&di=ee9edf3ea2950aa9a99a7d0b5ca6fe5f&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D1d3f4efd8126cffc697fb7b68c3166a6%2F241f95cad1c8a786636d726a6409c93d70cf500a.jpg"
                alt
              />
              <div class="left_n">
                <span>主料</span>
                <span>粉红色</span>
                <span>内部编号:001</span>
                <span>大事噶是</span>
              </div>
            </div>
            <div class="right">
              <h5>库存量</h5>
              <em>500000</em>
            </div>
          </div>
        </div>
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
    },
    onSubmit() {
      console.log(this.form);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.material {
  .main {
    margin: 20px;
    /deep/.pagination {
      float: right;
    }
    .searchInput {
    }
    .table {
      .box {
        overflow: hidden;
        .child {
          cursor: pointer;
          overflow: hidden;
          float: left;
          width: 30%;
          margin-left: 3%;
          margin-top: 15px;

          .left {
            float: left;
            width: 80%;
            overflow: hidden;
            border-radius: 12px;
            background: #f2f2f2;

            img {
              width: 100px;
              height: 100px;
              float: left;
            }
            .left_n {
              float: left;
              span {
                display: block;
                padding: 3px;
              }
              span:first-of-type{
                font-size: 14px;
                font-weight: 900;
                color: #000;
              }
            }
          }
          .right {
            border-radius: 12px;
            background: #f2f2f2;
            height: 104px;
            line-height: 40px;
            float: left;
            width: 20%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>