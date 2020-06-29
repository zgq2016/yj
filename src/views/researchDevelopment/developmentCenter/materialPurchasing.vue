<template>
  <div class="materialPurchasing">
    <div class="material_purchase_name">
      <div
        v-for="(item, index) in obj.style_color_data"
        :key="index"
        style="display: flex;align-items: center;"
      >
        <el-divider direction="vertical"></el-divider>
        <div
          style="margin:0 10px;cursor: pointer;"
          @click="handleColorNum(item,index)"
          :class="active===index?'active':''"
        >{{item.style_color_name}}</div>
        <el-divider direction="vertical"></el-divider>
      </div>
    </div>
    <div v-for="(item, index) in style_materials" :key="index">
      <div class="content" v-for="(item1, index1) in item.style_materials_data" :key="index1">
        <div class="card">
          <div class="cardStyle">
            <div class="cardStyle_left">
              <div class="cardStyle_left_img">
                <img :src="item1.picurl" alt />
              </div>
              <div class="cardStyle_left_content">
                <div class="cardStyle_left_content_name">
                  <div>{{item1.materials_mainclass_name}} ({{item1.materials_class_name}})</div>
                  <div
                    class="el-icon-close"
                    style="cursor: pointer;"
                    @click.stop="handleStyleMaterialsDel(item1)"
                  ></div>
                </div>
                <div>{{item1.materials_data[0].materialsname}}</div>
                <div>内部编号:{{item1.materials_data[0].materialsno}}</div>
                <div
                  v-if="item1.style_materials_supplier_data.length>0"
                >{{item1.style_materials_supplier_data[0].companyname}}</div>
              </div>
            </div>
            <div class="cardStyle_right">
              <div>
                {{item1.color}}
                <div>{{item1.color_no}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="orderInformation">
          <el-steps finish-status="wait" :active="1">
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
                  <span>
                    {{item_g.logname}}
                    <em>{{"100m"}}</em>
                    <!-- <em v-if="item_g.state == '1'">{{item_g.quantity+"m"}}</em> -->
                  </span>
                  <span>{{"2020-10-20"}}</span>
                </div>
              </template>
              <template v-slot:description>
                <div class="dt">
                  <span>{{"预计回料时间"}}</span>
                  <span>{{"2020-10-20"}}</span>
                  <!-- ****************************************************************** -->
                  <!-- <span v-if="index_g==0">{{"预计回料时间"}}</span>
                  <span v-if="item_g.state == '2'">{{"延迟回料时间"}}</span>
                  <span v-if="item_g.state == '1'">{{"部分回料时间"}}</span>
                  <span v-if="item_g.state == '3'">{{"回料总量"}}</span>
                  <span v-if="item_g.state == '3'">{{item1.amountPurchased+'m'}}</span>
                  <span v-else-if="item_g.state == '0'">{{item1.finishTime}}</span>
                  <span v-else>{{item_g.returntime}}</span>-->
                </div>
              </template>
            </el-step>
          </el-steps>
          <div>
            <el-button size="mini" round @click="goPanelPurchase">{{"采购录入"}}</el-button>
          </div>
        </div>
      </div>
      <el-divider content-position="right">{{item.mainclass}}</el-divider>
    </div>
  </div>
</template>

<script>
import {
  getStyle,
  styleMaterialsResume,
  getMaterialsProcureList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      cardList: [
        {
          materialsCard: "主料卡",
          materials: "主料"
        },
        {
          materialsCard: "里料卡",
          materials: "里料"
        },
        {
          materialsCard: "辅料卡",
          materials: "辅料"
        },
        {
          materialsCard: "工艺卡",
          materials: "工艺"
        }
      ], //首页大数据
      activities_endlong: [
        {
          logname: "已下单",
          ctime: ""
        },
        {
          logname: "部分回料",
          ctime: ""
        },
        {
          logname: "延迟回料",
          ctime: ""
        },
        {
          logname: "回料",
          ctime: ""
        }
      ], //日志
      obj: {},
      style_materials: [],
      active: 0
    };
  },
  methods: {
    handleStyleMaterialsDel(e) {
      console.log(e);
    },
    async handleColorNum(item, index) {
      this.active = index;
      console.log(item);
      let res1 = await getMaterialsProcureList({
        style_id: item.style_id,
        style_color_name: item.style_color_name
      });
      console.log(res1);
      let { data } = res1.data;
      this.style_materials = data;
    },
    goPanelPurchase() {
      this.$router.push({ name: "PanelPurchase" });
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      if (this.obj.style_color_data.length != 0) {
        let res1 = await getMaterialsProcureList({
          style_id: this.obj.style_color_data[0].style_id,
          style_color_name: this.obj.style_color_data[0].style_color_name
        });
        console.log(res1);
        let { data } = res1.data;
        this.style_materials = data;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.materialPurchasing {
  .material_purchase_name {
    font-size: 16px;
    margin-bottom: 10px;
    display: flex;
  }
  .content {
    width: 100%;
    display: flex;
    margin: 10px 0px;
    .card {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .cardStyle {
        width: 320px;
        height: 100px;
        display: flex;
        .cardStyle_left {
          width: 270px;
          display: flex;
          background-color: #f2f2f2;
          border-radius: 10px;
          overflow: hidden;
          .cardStyle_left_img {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .cardStyle_left_content {
            flex: 1;
            div {
              margin: 3px;
            }
            .cardStyle_left_content_name {
              font-weight: 600;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              .el-icon-close {
                cursor: pointer;
              }
            }
          }
        }
        .cardStyle_right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 50px;
          background-color: #f2f2f2;
          border-radius: 10px;
        }
      }
    }
    .orderInformation {
      border-radius: 10px;
      background-color: #f2f2f2;
      flex: 1;
      // width: 600px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 100px;
      padding: 10px;
    }
  }
  .active {
    border-bottom: 1px solid aqua;
    color: aqua;
  }

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
// patternStatus
// PatternStatus
</style>