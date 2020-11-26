<template>
  <div class="developmentStatus">
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>生产</el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="TL === 0"
            :to="{ path: '/productionOrders' }"
            >生产下单</el-breadcrumb-item
          >
          <el-breadcrumb-item v-if="TL === 1" :to="{ path: '/purchase' }"
            >采购列表</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-if="TL === 2"
            :to="{ path: '/productionScheduling' }"
            >生产排期</el-breadcrumb-item
          >
          <el-breadcrumb-item v-if="TL === 3" :to="{ path: '/tailor' }"
            >裁剪</el-breadcrumb-item
          >
          <!-- 款式详细-->
          <el-breadcrumb-item v-if="TL === 4" :to="{ path: '/shipment' }"
            >生产出货</el-breadcrumb-item
          >
          <el-breadcrumb-item v-if="TL === 21" :to="{ path: '/designFile' }"
            >款式档案</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-if="TL === 21"
            :to="{ path: `/designNote?id=${this.$route.query.id}&TL=21` }"
            >款式详细</el-breadcrumb-item
          >
          <el-breadcrumb-item>生产档案</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <div class="particulars">
        <div style="display: flex; justify-content: space-between">
          <div class="content">
            <el-image
              class="imgSrc"
              style="width: 160px; height: 160px; margin-right: 5px"
              :src="obj.style_pic_url"
              fit="cover"
            ></el-image>
            <img
              v-if="obj.style_color_pic_url !== ''"
              class="imgSrc"
              style="width: 160px; height: 160px"
              :src="obj.style_color_pic_url"
              alt
            />
            <div
              v-if="obj.style_color_pic_url === ''"
              class="imgSrc"
              style="width: 160px; height: 160px"
              :style="`background-color:${obj.color_code};`"
            ></div>
            <div class="info">
              <div style="height: 165px">
                <div class="name">{{ obj.stylename }}</div>
                <div>款号：{{ obj.styleno }}</div>
                <div>品类：{{ obj.style_type }}</div>
                <div>年份：{{ obj.year }}</div>
                <div>季节：{{ obj.season }}</div>
                <div>设计师：{{ obj.user_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="editBtn">
          <div class="jour" v-if="!log" @click="get_view_log">查看日志</div>
          <div class="jour" v-else @click="get_view_log">隐藏日志</div>
          <el-select
            v-model="value"
            clearable
            placeholder="批次"
            @change="get_route_produce_no"
            style="width: 200px"
          >
            <el-option
              v-for="item in options"
              :key="item.produce_no"
              :label="item.produce_no"
              :value="item.produce_no"
            ></el-option>
          </el-select>
        </div>
      </div>

      <el-container>
        <div class="orderInformation" style="margin-bottom: 20px" v-if="log">
          <el-steps
            finish-status="wait"
            :active="activities_endlong.length - 1"
          >
            <el-step
              style="width: 100px"
              v-for="(item_g, index_g) in activities_endlong"
              :key="index_g"
              title
              description
              icon="el-icon-success"
            >
              <template v-slot:title>
                <div class="tt">
                  <span>{{ item_g.logname }}</span>
                </div>
              </template>
              <template v-slot:description>
                <div class="dt">
                  <span>{{ item_g.ctime }}</span>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <el-header>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-if="permission.indexOf('productionOrders') != -1"
              label="下单信息"
              name="/sc_Order_information"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('purchase') != -1"
              label="采购"
              name="/sc_purchase"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('productionScheduling') != -1"
              label="生产排单"
              name="/sc_materialPurchasing"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('tailor') != -1"
              label="裁剪"
              name="/sc_tailor"
            ></el-tab-pane>
            <el-tab-pane
              v-if="permission.indexOf('shipment') != -1"
              label="出货"
              name="/sc_shipment"
            ></el-tab-pane>
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
import { getStyle, styleFile } from "@/api/researchDevelopment";
import {
  produceLogData, //批次日志
  produceAdd, // 新增生产批次
  produceDel, // 删除生产批次
  produceInfo, // 生产批次明细
  getStyleColorSelect, // 款式颜色select
  getSizeSelect, // 尺码select
  produceOrderAdd, // 增加批次下单信息
  produceOrderEdit, // 编辑批次下单信息
  produceOrderDel, // 删除批次下单信息
  produceOrderInfo, //显示批次下单信息
  produceOrderProcureList, //采购列表
  produceOrderProcureAdd, //新增采购物料信息
  produceOrderProcure_del, //删除采购物料信息
  produceOrderProcureEdit, //编辑 采购物料信息
  produceOrderProcureLogAdd, //新增采购日志信息
  getFactorySelect, //生产排单select工厂
  produceFactoryOrderAdd, //新增排单信息
  produceFactoryOrderList, //显示排单信息
  produceFactoryOrderEdit, //编辑排单信息
  produceFactoryOrderDel, //删除排单信息
  produceCutOrderAdd, //新增裁剪信息
  produceCutOrderList, //显示裁剪信息
  produceCutOrderEdit, //编辑裁剪信息
  produceCutOrderDel, //删除裁剪信息
  produceCompleteAdd, //新增出货信息
  produceCompleteList, //显示出货信息
  produceCompleteDel, //删除出货信息
  produceCompleteEdit, //编辑出货信息
  produceFactoryProcessPrice,
} from "@/api/production";
export default {
  data() {
    return {
      permission: [],
      obj: {},
      activeName: "",
      TL: "",
      TL1: "",
      activities_endlong: [],
      value: "",
      options: [],
      log: false,
    };
  },
  methods: {
    get_view_log() {
      this.log = !this.log;
    },
    handleClick(tab, event) {
      let { id, TL, produce_no } = this.$route.query;
      // this.activeName = tab.name;
      this.$router.push({
        path: `${tab.name}?id=${id}&TL=${TL}&produce_no=${produce_no}`,
      });
    },
    get_route_produce_no(e) {
      let { id, TL, produce_no } = this.$route.query;
      console.log(location.href);

      let num = location.href.split("/#/");
      let num1 = num[1].indexOf("?");
      let path = num[1].substring(-1, num1);
      this.$router.push({
        path: `${path}?id=${id}&TL=${TL}&produce_no=${e}`,
      });
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      this.init_A();
    },
    async init_A() {
      let { id } = this.$route.query;
      let res = await produceInfo({ style_id: id });
      let { data } = res.data;
      this.options = data;
      this.activeName = this.$route.path;
      this.activities_endlong = data[0].produce_log_data;
    },
  },
  mounted() {
    this.init();
    let { id, produce_no } = this.$route.query;
    this.TL = this.$route.query.TL - 0;
    this.TL1 = this.$route.query.TL1 - 0;
    this.value = produce_no;

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
    .particulars {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 170px;
      .editBtn {
        display: flex;
        align-items: flex-end;
        /deep/ .el-input__inner {
          width: 100%;
          height: 30px;
          background-color: #f2f2f2;
          border-radius: 15px;
          border: none;
          color: #5e5e5e;
          font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
            \\5b8b\4f53, sans-serif;
        }
        .jour {
          width: 100px;
          height: 30px;
          background: #f2f2f2;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          margin-right: 10px;
        }
        .jour:hover {
          cursor: pointer;
          background: #000000;
          color: #fff;
        }
      }
    }
    .orderInformation {
      margin: 10px 0;
      border-radius: 10px;
      background-color: #f2f2f2;
      // flex: 1;
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      justify-content: space-between;
      word-spacing: normal;
      align-items: flex-end;
      height: 120px;
      padding: 10px;
      &::-webkit-scrollbar {
        // display: none;
      }
    }
    .orderInformation {
      // width: 1000px;
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
    .content {
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
        div {
          padding: 2px;
        }
      }
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
  }
  /deep/ .el-header {
    padding: 0 !important;
  }
}
</style>