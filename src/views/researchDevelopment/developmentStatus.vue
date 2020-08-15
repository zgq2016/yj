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
        <el-breadcrumb-item>款式详细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="basicInfo">基础信息</div>
      <div style="display: flex;justify-content: space-between;">
        <div class="content">
          <!-- <img class="imgSrc" :src="obj.style_pic_url" alt /> -->
          <div
            class="imgSrc"
            :style="`background: url(${obj.style_pic_url}) no-repeat 0 -75px;width:150px;height:150px`"
          ></div>
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
                v-if="power.indexOf('A2000300')!=-1||power.indexOf('A2000400')!=-1"
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
            </div>
          </div>
        </div>
        <!-- <span
          class="el-icon-edit-outline"
          style="font-size: 40px;color: #ffa500;cursor: pointer;width:40px;height:40px"
          @click="editTheStyle"
          v-if="power.indexOf('A2000300')!=-1||power.indexOf('A2000400')!=-1"
        ></span>-->
      </div>
      <el-container>
        <el-header>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="power.indexOf('A3000')!=-1" label="研发状态" name="/development"></el-tab-pane>
            <el-tab-pane v-if="power.indexOf('A4000')!=-1" label="设计版单" name="/designNote"></el-tab-pane>
            <el-tab-pane v-if="power.indexOf('A5000')!=-1" label="物料工艺" name="/materialProcess"></el-tab-pane>
            <el-tab-pane v-if="power.indexOf('A6000')!=-1" label="版料采购" name="/materialPurchasing"></el-tab-pane>
            <el-tab-pane v-if="power.indexOf('A7000')!=-1" label="纸样" name="/patternStatus"></el-tab-pane>
            <el-tab-pane v-if="power.indexOf('A8000')!=-1" label="样衣" name="/sampleDress"></el-tab-pane>
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
      obj: {},
      activeName: "",
      TL: "",
      TL1: "",
    };
  },
  methods: {
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
    },
  },
  mounted() {
    this.init();
    let { id } = this.$route.query;
    this.TL = this.$route.query.TL - 0;
    this.TL1 = this.$route.query.TL1 - 0;
    // this.$router.push({ path: `/materialPurchasing?id=${id}` });

    this.power = localStorage.getItem("power");
    console.log(this.power);
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