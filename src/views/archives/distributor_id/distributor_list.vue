<template>
  <!--  v-if="data.id=data.id||0" -->
  <div class="right_list">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item>供应商</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px">
      <el-input placeholder="供应商名称" v-model="form.companyname" clearable style="width:200px"></el-input>
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
        <el-form-item>
          <el-cascader
            v-model="form.materials_class_id"
            :options="classData"
            :props="optionProps"
            @change="handleChange"
            :show-all-levels="false"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div class="addStyle" @click="addSupplier" v-if="power.indexOf('E2000100')!=-1">新增</div>
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
              <div>
                {{item.mainclass}}
                <em
                  v-if="item.materials_class_name"
                >({{item.materials_class_name}})</em>
              </div>
              <div
                v-if="item.supplier_contact_data.length>0"
              >{{item.supplier_contact_data[0].contacts}}:{{item.supplier_contact_data[0].phone}}</div>
            </div>
          </div>
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
</template>

<script>
import { getSupplierList, getMaterialsClass } from "@/api/archives";
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
      form: { materials_class_id: "", companyname: "" },
      optionProps: {
        value: "id",
        label: "classname",
        children: "class_data",
      },
    };
  },
  methods: {
    handleChange(e) {
      this.pageIndex = 1;
      if (e != undefined) {
        this.form["materials_class_id"] = e.pop();
      }
      this.init();
    },
    handleSearch() {
      this.pageIndex = 1;
      this.init();
    },
    addSupplier() {
      this.$router.push({ path: `/addSupplier?id=${this.data.id || 0}&TL=0` });
    },
    listDeital(item) {
      this.$router.push({ path: `/listDeital?id=${item.id}&TL=1` });
    },
    async init() {
      this.form["page"] = this.pageIndex;
      this.form["page_size"] = this.pageSize;
      this.form["companyname"] = this.form.companyname;
      let res = await getSupplierList(this.form);
      console.log(res);
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
    },
    async getClassData() {
      let res = await getMaterialsClass();
      console.log(res);
      let { data } = res.data;
      this.classData = data;
    },
  },
  mounted() {
    this.init();
    this.getClassData();
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
.right_list {
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
  /deep/ .el-input__icon {
    line-height: 30px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-pagination {
    margin: 20px;
    text-align: right;
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
  .main {
    padding: 20px 0;
    .dataList {
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 260px;
        height: 60px;
        margin: 0 10px 10px 0;
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
  }
  .el-pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>