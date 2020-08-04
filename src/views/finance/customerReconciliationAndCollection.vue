<template>
  <div class="customerReconciliationAndCollection">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>客户对账及收款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-main>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="对款汇总" name="/summaryParagraph"></el-tab-pane>
          <el-tab-pane label="客户对账单" name="/customerStatement"></el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ path: `${tab.name}` });
    }
  },
  mounted() {
    this.activeName = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
.customerReconciliationAndCollection {
  .el-container {
    margin-top: 15px;
    overflow: hidden !important;
  }
}
</style>