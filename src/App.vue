<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
.el-autocomplete-suggestion {
  .el-scrollbar {
    .el-autocomplete-suggestion__wrap {
      ul {
        li {
          padding: 0 2px !important;
          line-height: 28px;
          font-size: 10px;
        }
      }
    }
  }
}
</style>