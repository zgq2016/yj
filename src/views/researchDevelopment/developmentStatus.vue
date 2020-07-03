<template>
  <div class="developmentStatus">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item>设计项目</el-breadcrumb-item>
      <el-breadcrumb-item>设计项目查看</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="basicInfo">基本信息</div>
      <div style="display: flex;justify-content: space-between;">
        <div class="content">
          <img class="imgSrc" :src="obj.style_pic_url" alt />
          <img class="imgSrc" :src="obj.style_color_pic_url" alt />
          <div class="info">
            <div class="name">{{obj.stylename}}</div>
            <div>款号：{{obj.styleno}}</div>
            <div>品类：{{obj.style_type}}</div>
            <div>年份：{{obj.year}}</div>
            <div>季节：{{obj.season}}</div>
            <div>设计师：{{obj.user_name}}</div>
            <div>颜色：{{obj.style_color}}</div>
          </div>
        </div>
        <span
          class="el-icon-edit-outline"
          style="font-size: 40px;color: #ffa500;cursor: pointer;width:40px;height:40px"
          @click="editTheStyle"
        ></span>
      </div>
      <el-container>
        <el-header>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="研发状态" name="/development"></el-tab-pane>
            <el-tab-pane label="设计版单" name="/designNote"></el-tab-pane>
            <el-tab-pane label="物料工艺" name="/materialProcess"></el-tab-pane>
            <el-tab-pane label="版料采购" name="/materialPurchasing"></el-tab-pane>
            <el-tab-pane label="纸样" name="/patternStatus"></el-tab-pane>
            <el-tab-pane label="样衣" name="/sampleDress"></el-tab-pane>
            <el-tab-pane label="生产信息" name="/ProductionStyle"></el-tab-pane>
            <el-tab-pane label="商品信息" name="/merchandiseNews"></el-tab-pane>
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
      obj: {},
      activeName: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      let { id } = this.$route.query;
      // this.activeName = tab.name;
      this.$router.push({ path: `${tab.name}?id=${id}` });
    },
    editTheStyle() {
      let { id } = this.$route.query;
      this.$router.push({ path: `editTheStyle?id=${id}` });
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      console.log(this.obj);
      this.activeName = this.$route.path;
    }
  },
  mounted() {
    // console.log(this.$route.path);

    this.init();
    let { id } = this.$route.query;
    // this.$router.push({ path: `/materialPurchasing?id=${id}` });
  },
  watch: {
    $route() {
      this.init();
    }
  }
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
        margin-top: 20px;
        .name {
          font-size: 20px;
          font-weight: 600;
        }
        div {
          margin: 5px 0px;
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