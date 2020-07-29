<template>
  <div class="index">
    <el-container>
      <el-header style="border-bottom:1px solid #eee;">
        <el-menu
          :router="true"
          :default-active="activeIndex"
          class="el-menu-demo w"
          mode="horizontal"
        >
          <el-menu-item>
            <div class="logo">
              <img src="../assets/logo.jpg" alt />
              <div class="logoName">衣家 YIJIA</div>
            </div>
          </el-menu-item>
          <el-menu-item index="/homepage" v-if="power.indexOf('Z')!=-1">首页</el-menu-item>
          <el-submenu index="2" style="width:100px;overflow:hidden" v-if="power.indexOf('A')!=-1">
            <template slot="title" v-if="power.indexOf('A')!=-1">研发</template>
            <el-menu-item index="/itemDesign" v-if="power.indexOf('A1000')!=-1">设计项目</el-menu-item>
            <el-menu-item index="/materialPurchase" v-if="power.indexOf('A4000')!=-1">版料采购</el-menu-item>
            <el-menu-item index="/pattern" v-if="power.indexOf('A7000')!=-1">纸样</el-menu-item>
            <el-menu-item index="/platemaking" v-if="power.indexOf('A8000')!=-1">制版</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-if="power.indexOf('B')!=-1">
            <template slot="title" v-if="power.indexOf('B')!=-1">生产</template>
            <el-menu-item index="/productionOrders" v-if="power.indexOf('A1000')!=-1">生产下单</el-menu-item>
            <el-menu-item index="/purchase" v-if="power.indexOf('A2000')!=-1">生产采购</el-menu-item>
            <el-menu-item index="/productionScheduling" v-if="power.indexOf('A3000')!=-1">生产排期</el-menu-item>
            <el-menu-item index="/tailor" v-if="power.indexOf('A4000')!=-1">裁剪</el-menu-item>
            <el-menu-item index="/shipment" v-if="power.indexOf('A5000')!=-1">生产出货</el-menu-item>
          </el-submenu>
          <el-submenu index="4" v-if="power.indexOf('C')!=-1">
            <template slot="title" v-if="power.indexOf('C')!=-1">仓库</template>
            <el-menu-item index="/productStorehouse" v-if="power.indexOf('C1000')!=-1">产品库存查询</el-menu-item>
            <el-menu-item index="/stockInquiry" v-if="power.indexOf('C2000')!=-1">产品入库</el-menu-item>
            <el-menu-item index="/material" v-if="power.indexOf('C3000')!=-1">物料库存查询/采购</el-menu-item>
            <el-menu-item index="/materialStorage" v-if="power.indexOf('C4000')!=-1">物料库存流水</el-menu-item>
            <el-menu-item index="/warehouseSet" v-if="power.indexOf('C5000')!=-1">仓库设置</el-menu-item>
          </el-submenu>
          <el-submenu index="5" v-if="power.indexOf('D')!=-1">
            <template slot="title" v-if="power.indexOf('D')!=-1">销售</template>
            <el-menu-item index="/clientManagement" v-if="power.indexOf('D1000')!=-1">客户管理</el-menu-item>
            <el-menu-item index="/salesOrder" v-if="power.indexOf('D2000')!=-1">订单</el-menu-item>
          </el-submenu>
          <el-submenu index="6" v-if="power.indexOf('E')!=-1">
            <template slot="title" v-if="power.indexOf('E')!=-1">档案库</template>
            <el-menu-item index="/distributor" v-if="power.indexOf('E1000')!=-1">供应商</el-menu-item>
            <el-menu-item index="/routeCard" v-if="power.indexOf('E2000')!=-1">物料工艺卡</el-menu-item>
            <el-menu-item index="/designFile" v-if="power.indexOf('E3000')!=-1">款式档案</el-menu-item>
            <el-menu-item index="/plant">工厂</el-menu-item>
            <!-- v-if="power.indexOf('E4000')!=-1" -->
          </el-submenu>
          <el-submenu index="7" v-if="power.indexOf('F')!=-1">
            <template slot="title" v-if="power.indexOf('F')!=-1">财务</template>
            <el-menu-item index="/paymentReimbursement" v-if="power.indexOf('F1000')!=-1">预支报销</el-menu-item>
            <!-- <el-menu-item index="7-2">财务统计</el-menu-item> -->
            <el-menu-item
              index="/accountFlowAndBookkeeping"
              v-if="power.indexOf('F2000')!=-1"
            >账户流水及记账</el-menu-item>
            <el-menu-item
              index="/customerReconciliationAndCollection"
              v-if="power.indexOf('F3000')!=-1"
            >客户对账及收款</el-menu-item>
            <el-menu-item
              index="/supplierReconciliationAndPayment"
              v-if="power.indexOf('F4000')!=-1"
            >供应商对账及付款</el-menu-item>
            <el-menu-item index="/accounter" v-if="power.indexOf('F5000')!=-1">结算帐户</el-menu-item>
            <el-menu-item index="/accountType" v-if="power.indexOf('F6000')!=-1">账目类型</el-menu-item>
          </el-submenu>
          <el-submenu index="8" v-if="power.indexOf('G')!=-1">
            <template slot="title" v-if="power.indexOf('G')!=-1">统计</template>
          </el-submenu>
          <el-submenu index="9" v-if="power.indexOf('H')!=-1">
            <template slot="title" v-if="power.indexOf('H')!=-1">设置</template>
            <el-menu-item index="/goodsCategory" v-if="power.indexOf('H1000')!=-1">商品分类</el-menu-item>
            <el-menu-item index="/colorManagement" v-if="power.indexOf('H2000')!=-1">颜色管理</el-menu-item>
            <el-menu-item index="/measurementManagement" v-if="power.indexOf('H3000')!=-1">尺码管理</el-menu-item>
            <el-menu-item index="/materialManagement" v-if="power.indexOf('H4000')!=-1">材质管理</el-menu-item>
            <el-menu-item index="/timeManagement" v-if="power.indexOf('H5000')!=-1">季节管理</el-menu-item>
            <el-menu-item index="/unitManagement" v-if="power.indexOf('H6000')!=-1">单位管理</el-menu-item>
            <el-submenu index="9-3" v-if="power.indexOf('H7000')!=-1">
              <template slot="title" v-if="power.indexOf('H7000')!=-1">账户管理</template>
              <el-menu-item index="/listAccounts">账户列表</el-menu-item>
              <el-menu-item index="authorityManagement">权限管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/announcements">公司公告</el-menu-item>
            <el-menu-item index="/logout" v-if="power.indexOf('H8000')!=-1">退出系统</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="9">
            <template slot="title">设置</template>
            <el-menu-item index="/goodsCategory">商品分类</el-menu-item>
            <el-menu-item index="/colorManagement">颜色管理</el-menu-item>
            <el-menu-item index="/measurementManagement">尺码管理</el-menu-item>
            <el-menu-item index="/materialManagement">材质管理</el-menu-item>
            <el-menu-item index="/timeManagement">季节管理</el-menu-item>
            <el-menu-item index="/unitManagement">单位管理</el-menu-item>
            <el-submenu index="9-3">
              <template slot="title">账户管理</template>
              <el-menu-item index="/listAccounts">账户列表</el-menu-item>
              <el-menu-item index="authorityManagement">权限管理</el-menu-item>
            </el-submenu>         
            <el-menu-item index="/logout">退出系统</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-header>
      <el-main>
        <router-view class="w"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      power: "",
      activeIndex: "2",
    };
  },
  methods: {},
  mounted() {
    this.power = localStorage.getItem("power");
    // console.log(this.power);
    // console.log(localStorage.getItem("user_id"));
  },
};
</script>

<style lang="less" scoped>
.index {
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .logoName {
      font-size: 20px;
      color: #000;
    }
  }
  // /deep/.el-submenu__title{
  //   width: 120px;
  // }
}
</style>