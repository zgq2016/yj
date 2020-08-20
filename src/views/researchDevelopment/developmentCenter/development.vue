<template>
  <div class="development" v-if="power.indexOf('A3000100')!=-1">
    <div class="orderInformation">
      <el-steps finish-status="wait" :active="activities_endlong.length-1">
        <el-step
          style="width:125px"
          v-for="(item_g, index_g) in activities_endlong"
          :key="index_g"
          title
          description
          icon="el-icon-success"
        >
          <template v-slot:title>
            <div class="tt">
              <span>{{item_g.logname}}</span>
            </div>
          </template>
          <template v-slot:description>
            <div class="dt">
              <span>{{item_g.ctime}}</span>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
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
  },
};
</script>

<style lang="less" scoped>
.development {
  
  .orderInformation {
    .el-steps {
      position: relative;
      margin-bottom: 40px;
      /deep/.el-step__icon {
        width: 12px;
        background-color: transparent;
      }
      .tt {
        position: absolute;
        span:first-of-type {
          display: block;
          font-size: 10px;
          color: #666666;
          em {
            margin-left: 3px;
            color: #999999;
          }
        }
        span:last-of-type {
          display: block;
          font-size: 10px;
          -webkit-transform: scale(0.8);
          color: #999999;
          margin-left: -10px;
        }
      }
      .dt {
        position: absolute;
        top: 50px;
        span {
          display: block;
          font-size: 10px;
          float: left;
        }
      }
      /deep/.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
        font-size: 12px;
        font-weight: 400;
        position: relative;
      }
      /deep/.el-step__title {
        font-size: 12px;
        line-height: 14px;
      }
      /deep/.el-step__icon {
        width: 12px;
      }
      /deep/.el-step__head {
        top: 30px;
      }

      /deep/.el-step__line {
        width: auto;
        margin-right: 20px;
      }

      /deep/.el-step {
        width: 100px;
        display: inline-block;
      }
      /deep/.el-step__main {
        position: relative;
        bottom: 20px;
        .el-step__description {
          padding-top: 20%;
        }
      }
    }
  }
}
</style>