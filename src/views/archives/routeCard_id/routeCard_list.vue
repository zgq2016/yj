<template>
  <div class="routeCard_list" v-if="permission.indexOf('routeCard_list') != -1">
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>档案库</el-breadcrumb-item>
          <el-breadcrumb-item>物料工艺卡</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="工艺卡名称"
        v-model="form.materialsname"
        clearable
        style="width: 200px"
      ></el-input>

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
        <el-form-item prop="class_id">
          <!-- <el-select
            v-model="form.class_id"
            placeholder="选择物料"
            clearable
            @change="get_classData($event)"
            style="width:100px"
          >
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item"
            ></el-option>
          </el-select>-->
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
      <div
        class="addStyle"
        @click="addRouteCard"
        v-if="permission.indexOf('materials_add') != -1"
      >
        新增
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
            <!-- <img :src="item.materials_color_data[0].picurl" alt /> -->
            <el-image :src="item.materials_color_data[0].picurl" fit="cover">
              <div slot="error" class="image-slot">
                <!-- <i class="el-icon-picture-outline"></i> -->
              </div>
            </el-image>
          </div>
          <div class="list_content">
            <div style="font-weight: 600; font-size: 14px">
              {{ item.materialsname }}
            </div>
            <div>内部编号:{{ item.materialsno }}</div>
            <div v-if="item.supplier_data.length > 0">
              {{ item.supplier_data[0].supplier_companyname }}
            </div>
            <div>
              {{ item.materials_mainclass_name }}
              <em v-if="item.materials_class_name"
                >({{ item.materials_class_name }})</em
              >
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
  </div>
</template>

<script>
import { getMaterialsList, getMaterialsClass } from "@/api/archives";
export default {
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: () => ({}), // 属性的默认值
    },
  },
  data() {
    return {
      materialsname: "", //搜索
      SupplierList: [], //列表数据
      pageIndex: 1,
      pageSize: 24,
      total: 0,
      classData: [],
      form: { materials_class_id: "", materialsname: "" },
      optionProps: {
        value: "id",
        label: "classname",
        children: "class_data",
      },
      permission: [],
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
    routeCardDeital(item) {
      this.$router.push({ path: `/routeCardDeital?id=${item.id}&TL=1` });
    },
    addRouteCard() {
      this.$router.push({ path: `/addRouteCard` });
    },
    async init() {
      this.form["page"] = this.pageIndex;
      this.form["page_size"] = this.pageSize;
      this.form["materialsname"] = this.form.materialsname.trim();
      let res = await getMaterialsList(this.form);
      console.log(res);
      let { data, count } = res.data;
      this.total = count;
      this.SupplierList = data;
      console.log(this.SupplierList);
    },
    async getClassData() {
      let res = await getMaterialsClass();
      console.log(res);
      let { data } = res.data;
      this.classData = data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
  },
  mounted() {
    this.init();
    this.getClassData();
    this.permission = localStorage.getItem("permission").split(",");
  },
  watch: {
    data() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.routeCard_list {
  .addStyle {
    margin: 0 30px 0px 0px;
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
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    padding: 20px 0;

    .data_list {
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 260px;
        height: 90px;
        margin: 0 20px 20px 0;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f2f2f2;
        display: flex;
        cursor: pointer;
        .list_img {
          .el-image {
            width: 100px;
            height: 100px;
          }
        }
        .list_content {
          padding: 5px 0 0 5px;
          div {
            margin: 3px 0px;
          }
        }
      }
    }
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>