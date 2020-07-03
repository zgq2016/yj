<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="40%"
    center
    :before-close="handleClose"
  >
    <span>您确定要退出登录吗?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="()=>{this.$router.go(-1)}">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          // this.dialogVisible=true
          this.$router.go(-1);
        })
        .catch(_ => {});
    },
    async determine() {
      this.$router.push({
        path: `/Login`
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
/deep/.el-dialog__body {
  text-align: center !important;
  span {
    font-size: 18px;
  }
}
</style>