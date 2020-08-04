<template>
  <div class="announcements">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>公司公告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-button type="primary" size="small" @click="bulletin">发公告</el-button>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:20px;cursor: pointer;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        size="small"
      >
        <el-table-column type="index"  label="序号"></el-table-column>
        <el-table-column align="center" prop="ctime" width="95" label="时间"></el-table-column>
        <el-table-column prop="title" width="250" label="标题"></el-table-column>
        <el-table-column prop="text" label="内容"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" @click="delBulletin(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        size="mini"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 发布公告 -->
    <el-dialog title="发布公告" :visible.sync="dialogVisible" width="40%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="主题:" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="text">
          <el-input type="textarea" :rows="15" v-model="ruleForm.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send()">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改公告 -->
    <el-dialog title="修改公告" :visible.sync="dialogVisible1" width="40%" center>
      <el-form
        :model="ruleForm"
        :rules="rules1"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="主题:" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="时间:">
          <span>{{ruleForm.ctime}}</span>
        </el-form-item>
        <el-form-item label="内容:" prop="text">
          <el-input type="textarea" :rows="15" v-model="ruleForm.text"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editBulletin()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { noticeList, noticeAdd, noticeEdit, noticeDel } from "@/api/setting.js";
export default {
  data() {
    return {
      tableData: [],
      ruleForm: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        text: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      rules1: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        text: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.ruleForm = row;
      this.dialogVisible1 = true;
    },
    //  点击发广告
    bulletin() {
      this.ruleForm = {};
      this.dialogVisible = true;
    },
    // 点击公告标题
    clickLi(item) {
      this.ruleForm = item;
    },
    // 发送
    send() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) return false;
        let res = await noticeAdd({
          title: this.ruleForm.title,
          text: this.ruleForm.text
        });
        console.log(res);
        this.dialogVisible = false;
        this.ruleForm = {};
        this.init();
      });
    },
    // 删除该公告
    delBulletin(row) {
      this.$confirm("此操作将永久删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await noticeDel({
            id: row.id
          });
          this.ruleForm = {};
          this.init();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑该公告
    async editBulletin() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) return false;
        let res = await noticeEdit({
          title: this.ruleForm.title,
          text: this.ruleForm.text,
          id: this.ruleForm.id
        });
        this.dialogVisible1 = false;
        this.ruleForm = {};
        this.init();
      });
    },
    async init() {
      let res = await noticeList({
        page: this.pageIndex,
        page_size: this.pageSize
      });
      let { data } = res.data;
      this.tableData = data;
      this.total = res.data.count;
      console.log(res);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.announcements {
  .main {
    overflow: hidden;
    margin-top: 15px;
    width: 100%;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
}
</style>