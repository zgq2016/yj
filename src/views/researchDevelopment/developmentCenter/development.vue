<template>
  <div class="development" v-if="power.indexOf('A3000100')!=-1">
    <!-- <input type="text"> -->
    <el-steps space="200" style="margin-top:50px">
      <el-step
        style="width:100px"
        :title="item.logname"
        :description="item.ctime"
        v-for="(item, index) in activities_endlong"
        :key="index"
      ></el-step>
    </el-steps>
  </div>
</template>

<script>
import { getStyle } from "@/api/researchDevelopment";
export default {
  data() {
    return {
      power: "",
      activities_endlong: [],

    };
  },
  methods: {
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      console.log(res);
      this.activities_endlong = res.data.data.style_log;
    },
  },
  mounted() {
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  },
};
</script>

<style lang="less" scoped>
.development {
  /deep/.el-step__title {
    margin: -50px 0 15px 0px;
  }
  /deep/.el-step__icon {
    font-size: 10px;
    width: 7px;
    height: 7px;
    background-color: #ccc;
  }
  /deep/.el-step__icon-inner {
    width: 5px;
    height: 5px;
    overflow: hidden;
    margin: -12px 1px 1px 1px;
  }
}
</style>