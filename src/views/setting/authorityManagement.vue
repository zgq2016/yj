<template>
  <div class="authorityManagement">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="left">
        <el-table
          :data="role_list"
          row-key="id"
          border
          size="mini"
          :tree-props="{children: 'color_data' , hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="role_name" label="名称" width="100"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="200"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="el-icon-edit btn" @click="handleEdit(scope.$index, scope.row)"></div>
              <div class="el-icon-delete btn" @click="handleDelete(scope.$index, scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
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
      <div class="right">
        
      </div>
    </div>
  </div>
</template>

<script>
import { roleList } from "@/api/setting.js";
export default {
  data() {
    return {
      role_list: [
        {
          color_name: "aa",
          sort: "aa"
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
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    async init() {
      let res = await roleList({
        page: this.pageIndex,
        page_size: this.pageSize
      });
      console.log(res);
      let { data, count } = res.data;
      this.role_list = data;
      this.total = count;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.authorityManagement {
  .main {
    display: flex;
    min-height: 800px;
    .left {
      padding: 5px;
      width: 400px;
      .pagination {
        text-align: right;
      }
      .btn {
        margin: 0 10px;
      }
    }
    .right {
      width: 400px;
    }
  }
}
</style>