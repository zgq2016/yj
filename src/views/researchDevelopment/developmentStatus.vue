<template>
  <div class="developmentStatus">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>研发部</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===0" :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===0" :to="{ path: `/designCheck?id=${obj.project_id}` }">项目详细</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===30" :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===30" :to="{ path: `/designCheck?id=${obj.project_id}` }">项目详细</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===1" :to="{ path: `/materialPurchase` }">版料采购</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===2" :to="{ path: `/pattern` }">纸样</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===3" :to="{ path: `/platemaking` }">制版</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===20" :to="{ path: `/productionOrders` }">生产下单</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===21" :to="{ path: `/designFile` }">款式档案</el-breadcrumb-item>
        <el-breadcrumb-item v-if="TL===100" :to="{ path: `/designStyle` }">设计款式</el-breadcrumb-item>
        <el-breadcrumb-item>款式详细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="basicInfo">基础信息</div>
      <div style="display: flex;justify-content: space-between;">
        <div class="content">
          <el-image
            class="imgSrc"
            style="width: 150px; height: 150px;margin-right: 5px;"
            :src="obj.style_pic_url"
            fit="cover"
          ></el-image>
          <img
            v-if="obj.style_color_pic_url!==''"
            class="imgSrc"
            style="width:150px;height:150px"
            :src="obj.style_color_pic_url"
            alt
          />
          <div
            v-if="obj.style_color_pic_url===''"
            class="imgSrc"
            style="width:150px;height:150px"
            :style="`background-color:${obj.color_code};`"
          ></div>
          <div class="info">
            <div style="height:165px">
              <div class="name">{{obj.stylename}}</div>
              <div>款号：{{obj.styleno}}</div>
              <div>品类：{{obj.style_type}}</div>
              <div>年份：{{obj.year}}</div>
              <div>季节：{{obj.season}}</div>
              <div>设计师：{{obj.user_name}}</div>
              <div>颜色：{{obj.style_color}}</div>
            </div>
            <div style="display:flex">
              <el-tooltip
                class="edit"
                style="background-color: #f2f2f2;"
                v-if="permission.indexOf('style_edit')!=-1||permission.indexOf('style_del')!=-1"
                content="编辑"
                placement="top"
              >
                <div @click="editTheStyle">
                  <svg viewBox="0 0 32 32" width="20" height="20">
                    <path
                      d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
                      fill="#5e5e5e"
                    />
                  </svg>
                </div>
              </el-tooltip>

              <div class="jour" v-if="!log" @click="get_view_log">查看日志</div>
              <div class="jour" v-else @click="get_view_log">隐藏日志</div>
            </div>
          </div>
        </div>
      </div>

      <el-container>
        <div class="orderInformation" style="margin-bottom: 20px;" v-if="log">
          <el-steps finish-status="wait" :active="activities_endlong.length-1">
            <el-step
              style="width:100px"
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
        <el-header>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="permission.indexOf('designNote')!=-1" label="设计版单" name="/designNote"></el-tab-pane>
            <el-tab-pane v-if="permission.indexOf('materialProcess')!=-1" label="物料工艺" name="/materialProcess"></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('materialPurchasing')!=-1&&this.obj.purchase_status!=0"
              label="版料采购"
              name="/materialPurchasing"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('patternStatus')!=-1&&this.obj.pattern_status!=0"
              label="纸样"
              name="/patternStatus"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('sampleDress')!=-1&&this.obj.sample_status!=0"
              label="样衣"
              name="/sampleDress"
            ></el-tab-pane>
            <el-tab-pane v-if="TL===21" label="生产信息" name="/ProductionStyle"></el-tab-pane>
            <el-tab-pane v-if="TL===21" label="商品信息" name="/merchandiseNews"></el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getStyle } from "@/api/researchDevelopment";
export default {
  data() {
    return {
      power: "",
      permission:[],
      obj: {},
      activeName: "",
      TL: "",
      TL1: "",
      activities_endlong: [],
      log: false,
    };
  },
  methods: {
    get_view_log() {
      this.log = !this.log;
    },
    handleClick(tab, event) {
      let { id, TL } = this.$route.query;
      // this.activeName = tab.name;
      this.$router.push({
        path: `${tab.name}?id=${id}&project_id=${this.obj.project_id}&TL=${TL}`,
      });
    },
    editTheStyle() {
      let { id } = this.$route.query;
      this.$router.push({
        path: `editTheStyle?id=${id}&project_id=${this.obj.project_id}&TL=30`,
      });
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      console.log(this.obj);
      this.activeName = this.$route.path;
      this.activities_endlong = res.data.data.style_log;
    },
  },
  mounted() {
    this.init();
    let { id } = this.$route.query;
    this.TL = this.$route.query.TL - 0;
    this.TL1 = this.$route.query.TL1 - 0;

    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.developmentStatus {
  .main {
    padding: 30px 40px;

    .orderInformation {
      .el-steps {
        position: relative;
        margin-bottom: 40px;
        /deep/.el-step__icon {
          width: 12px;
          background-color: transparent;
        }
        .tt {
          // position: absolute;
          span {
            font-size: 14px;
          }
          span:first-of-type {
            display: block;
            // color: #666666;
            em {
              margin-left: 3px;
              color: #999999;
            }
          }
          span:last-of-type {
            display: block;
            -webkit-transform: scale(0.8);
            // color: #999999;
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
          // width: 100px;
          flex-basis: 100px !important;
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
    .basicInfo {
      font-size: 20px;
      font-weight: 600;
    }
    .content {
      margin: 20px 0;
      display: flex;
      .imgSrc {
        width: 200px;
        height: 200px;
        margin-right: 30px;
        border-radius: 10px;
      }
      .info {
        .name {
          font-size: 20px;
          font-weight: 600;
        }
        .edit {
          width: 30px;
          height: 30px;
          background-color: #000;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-right: 15px;
        }
        .jour {
          margin: 5px 0;
          width: 80px;
          height: 25px;
          line-height: 25px;
          background: #f2f2f2;
          text-align: center;
          border-radius: 8px;
        }
        .jour:hover {
          cursor: pointer;
          background: #dad1d1;
        }
        div {
          margin: 0 0 5px 0px;
        }
      }
    }
    .drawing {
      margin: 30px 0 10px 10px;
      font-size: 20px;
    }
    .btn {
      padding: 10px 40px;
      margin: 30px 400px;
      border-radius: 5px;
    }
  }
}
</style>