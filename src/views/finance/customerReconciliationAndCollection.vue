<template>
  <div class="customerReconciliationAndCollection">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>客户对账及收款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
        <el-main>
          <el-tabs type="border-card" value="/summaryParagraph"  @tab-click="handleClick">
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
  
  methods:{
    handleClick(tab, event) {
      let { id } = this.$route.query;
      this.$router.push({ path: `${tab.name}?id=${id}` });
    },
    
  },
  
}

</script>

<style lang="less" scoped>
.customerReconciliationAndCollection{
  .el-container{
    margin-top: 15px;
    overflow: hidden !important;
  }
}
</style>