<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    let user_id = localStorage.getItem("user_id");
    this.$store.commit("setUserInfo", { id: user_id });
  },
};
</script>

<style lang="less">
.el-autocomplete-suggestion {
  width: 150px !important;
  .el-scrollbar {
    .el-autocomplete-suggestion__wrap {
      ul {
        li {
          padding: 0 10px !important;
          line-height: 28px;
          font-size: 10px;
        }
      }
    }
  }
}
.el-select-dropdown {
  width: 200px !important;
}
// .el-cascader__dropdown{
//   top: 190px !important;
// }
</style>