<template>
  <div class="index w">
    <el-container>
      <el-aside width="100px">
        <div class="logo">FOS</div>
        <el-menu
          :router="true"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#000"
          text-color="#fff"
        >
          <el-menu-item index="/homepage" v-if="power.indexOf('Z')!=-1">
            <div style="display: flex;align-items: center;">
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path
                  d="M28 26.667c0 0.736-0.597 1.333-1.333 1.333v0h-21.333c-0.736 0-1.333-0.597-1.333-1.333v0-14.013c0-0 0-0.001 0-0.001 0-0.426 0.2-0.806 0.512-1.050l0.003-0.002 10.667-8.296c0.223-0.175 0.509-0.281 0.819-0.281s0.595 0.106 0.822 0.283l-0.003-0.002 10.667 8.296c0.314 0.246 0.515 0.626 0.515 1.052 0 0 0 0.001 0 0.001v-0 14.013z"
                  fill="#fff"
                />
              </svg>
              <div style="margin-left:5px">首页</div>
            </div>
          </el-menu-item>
          <el-submenu index="2" v-if="power.indexOf('A')!=-1">
            <template slot="title" v-if="power.indexOf('A')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M7.515 16.943l2.437 2.439 1.888-1.888-2.44-2.436 1.885-1.885 2.439 2.437 1.885-1.885-2.436-2.439 1.885-1.885 2.435 2.44 1.887-1.887-2.439-2.437 3.772-3.771c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l5.656 5.656c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-16.969 16.969c-0.241 0.241-0.575 0.39-0.943 0.39s-0.701-0.149-0.943-0.39l-5.656-5.656c-0.241-0.241-0.39-0.575-0.39-0.943s0.149-0.701 0.39-0.943l3.771-3.772zM18.828 24.484l5.657-5.656 3.515 3.515v5.657h-5.656l-3.516-3.516zM7.515 13.171l-3.772-3.771c-0.242-0.241-0.391-0.575-0.391-0.943s0.149-0.702 0.391-0.943l3.772-3.771c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.773 3.771-5.659 5.657z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">研发</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/itemDesign" v-if="power.indexOf('A1000')!=-1">设计项目</el-menu-item>
              <el-menu-item index="/materialPurchase" v-if="power.indexOf('A4000')!=-1">版料采购</el-menu-item>
              <el-menu-item index="/pattern" v-if="power.indexOf('A7000')!=-1">纸样</el-menu-item>
              <el-menu-item index="/platemaking" v-if="power.indexOf('A8000')!=-1">制版</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="power.indexOf('B')!=-1">
            <template slot="title" v-if="power.indexOf('B')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path d="M13.333 13.481v-12.148l14.667 8v18.667h-24v-18.667z" fill="#fff" />
                </svg>
                <div style="margin-left:5px">生产</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/productionOrders" v-if="power.indexOf('A1000')!=-1">生产下单</el-menu-item>
              <el-menu-item index="/purchase" v-if="power.indexOf('A2000')!=-1">生产采购</el-menu-item>
              <el-menu-item index="/productionScheduling" v-if="power.indexOf('A3000')!=-1">生产排单</el-menu-item>
              <el-menu-item index="/tailor" v-if="power.indexOf('A4000')!=-1">裁剪</el-menu-item>
              <el-menu-item index="/shipment" v-if="power.indexOf('A5000')!=-1">生产出货</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="power.indexOf('C')!=-1">
            <template slot="title" v-if="power.indexOf('C')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M28 26.667c0 0.736-0.597 1.333-1.333 1.333v0h-21.333c-0.736 0-1.333-0.597-1.333-1.333v0-14.013c0-0 0-0.001 0-0.001 0-0.426 0.2-0.806 0.512-1.050l0.003-0.002 10.667-8.296c0.223-0.175 0.509-0.281 0.819-0.281s0.595 0.106 0.822 0.283l-0.003-0.002 10.667 8.296c0.314 0.246 0.515 0.626 0.515 1.052 0 0 0 0.001 0 0.001v-0 14.013zM9.333 20v2.667h13.333v-2.667h-13.333z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">仓库</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/productStorehouse" v-if="power.indexOf('C1000')!=-1">产品库存查询</el-menu-item>
              <el-menu-item index="/stockInquiry" v-if="power.indexOf('C2000')!=-1">产品入库</el-menu-item>
              <el-menu-item index="/material" v-if="power.indexOf('C3000')!=-1">物料库存查询/采购</el-menu-item>
              <el-menu-item index="/materialStorage" v-if="power.indexOf('C4000')!=-1">物料库存流水</el-menu-item>
              <el-menu-item index="/warehouseSet" v-if="power.indexOf('C5000')!=-1">仓库设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" v-if="power.indexOf('D')!=-1">
            <template slot="title" v-if="power.indexOf('D')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M17.333 18.749v10.584h-12c0-0 0-0.001 0-0.001 0-5.891 4.776-10.667 10.667-10.667 0.47 0 0.933 0.030 1.387 0.089l-0.054-0.006zM16 17.333c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM23.724 26.552l4.713-4.713 1.887 1.885-6.6 6.6-4.715-4.715 1.887-1.885 2.827 2.828z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">销售</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/clientManagement" v-if="power.indexOf('D1000')!=-1">客户管理</el-menu-item>
              <el-menu-item index="/salesOrder" v-if="power.indexOf('D2000')!=-1">订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6" v-if="power.indexOf('E')!=-1">
            <template slot="title" v-if="power.indexOf('E')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M17.885 6.667h8.781c0.736 0 1.333 0.597 1.333 1.333v0 1.333h-24v-4c0-0.736 0.597-1.333 1.333-1.333v0h9.885l2.667 2.667zM4.116 12h23.768c0 0 0 0 0.001 0 0.736 0 1.333 0.597 1.333 1.333 0 0.039-0.002 0.078-0.005 0.116l0-0.005-1.112 13.333c-0.059 0.687-0.631 1.222-1.328 1.223h-21.547c-0.697-0-1.269-0.536-1.328-1.218l-0-0.005-1.112-13.333c-0.003-0.033-0.005-0.072-0.005-0.111 0-0.736 0.597-1.333 1.333-1.333 0 0 0 0 0.001 0h-0z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">档案</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/distributor_list" v-if="power.indexOf('E1000')!=-1">供应商</el-menu-item>
              <el-menu-item index="/routeCard_list" v-if="power.indexOf('E2000')!=-1">物料工艺卡</el-menu-item>
              <el-menu-item index="/designFile" v-if="power.indexOf('E3000')!=-1">款式档案</el-menu-item>
              <el-menu-item index="/plant">工厂</el-menu-item>
              <!-- v-if="power.indexOf('E4000')!=-1" -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7" v-if="power.indexOf('I')!=-1">
            <template slot="title" v-if="power.indexOf('I')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">审批</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/advanceReimbursement" v-if="power.indexOf('I3000')!=-1">预支报销</el-menu-item>
              <el-menu-item index="/vacationApproval" v-if="power.indexOf('I2000')!=-1">假期审批</el-menu-item>
              <el-menu-item
                index="/ExaminationAndApprovalWork"
                v-if="power.indexOf('I1000')!=-1"
              >工作审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8" v-if="power.indexOf('F')!=-1">
            <template slot="title" v-if="power.indexOf('F')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M16 29.333c-7.364 0-13.333-5.969-13.333-13.333s5.969-13.333 13.333-13.333 13.333 5.969 13.333 13.333-5.969 13.333-13.333 13.333zM17.333 17.333v-1.333h4v-2.667h-3.448l2.829-2.828-1.887-1.887-2.828 2.829-2.828-2.829-1.887 1.888 2.829 2.827h-3.448v2.667h4v1.333h-4v2.667h4v2.667h2.667v-2.667h4v-2.667h-4z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">财务</div>
              </div>
            </template>
            <el-menu-item-group>
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
              <!-- v-if="power.indexOf('F4000')!=-1" -->
              <el-menu-item index="/plantReconciliationAndPayment">加工厂对账及付款</el-menu-item>
              <el-menu-item index="/accounter" v-if="power.indexOf('F5000')!=-1">结算帐户</el-menu-item>
              <el-menu-item index="/accountType" v-if="power.indexOf('F6000')!=-1">账目类型</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9" v-if="power.indexOf('G')!=-1">
            <template slot="title" v-if="power.indexOf('G')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M4 4h24c0.736 0 1.333 0.597 1.333 1.333v0 21.333c0 0.736-0.597 1.333-1.333 1.333v0h-24c-0.736 0-1.333-0.597-1.333-1.333v0-21.333c0-0.736 0.597-1.333 1.333-1.333v0zM9.333 17.333v5.333h2.667v-5.333h-2.667zM14.667 9.333v13.333h2.667v-13.333h-2.667zM20 13.333v9.333h2.667v-9.333h-2.667z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">统计</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item>统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="10" v-if="power.indexOf('H')!=-1">
            <template slot="title" v-if="power.indexOf('H')!=-1">
              <div style="display: flex;align-items: center;">
                <svg viewBox="0 0 32 32" width="20" height="20">
                  <path
                    d="M2.843 18.173c-0.114-0.653-0.179-1.406-0.179-2.173s0.065-1.52 0.191-2.252l-0.011 0.079c1.469 0.035 2.789-0.669 3.303-1.908 0.513-1.24 0.077-2.672-0.987-3.684 0.862-1.197 1.879-2.214 3.036-3.049l0.039-0.027c1.013 1.064 2.445 1.5 3.685 0.987s1.943-1.835 1.907-3.303c0.654-0.114 1.407-0.18 2.175-0.18s1.521 0.065 2.253 0.191l-0.079-0.011c-0.036 1.469 0.668 2.789 1.907 3.303 1.24 0.513 2.672 0.077 3.684-0.987 1.197 0.862 2.214 1.879 3.049 3.036l0.027 0.039c-1.064 1.013-1.5 2.445-0.987 3.685s1.835 1.943 3.303 1.907c0.114 0.654 0.18 1.407 0.18 2.175s-0.065 1.521-0.191 2.253l0.011-0.079c-1.469-0.036-2.789 0.668-3.303 1.907-0.513 1.24-0.077 2.672 0.987 3.684-0.862 1.197-1.879 2.214-3.036 3.049l-0.039 0.027c-1.013-1.064-2.445-1.5-3.685-0.987s-1.943 1.835-1.907 3.303c-0.654 0.114-1.407 0.18-2.175 0.18s-1.521-0.065-2.253-0.191l0.079 0.011c0.036-1.469-0.668-2.789-1.907-3.303-1.24-0.513-2.672-0.077-3.684 0.987-1.197-0.862-2.214-1.879-3.049-3.036l-0.027-0.039c1.064-1.013 1.5-2.445 0.987-3.685s-1.835-1.943-3.303-1.907zM16 20c2.209 0 4-1.791 4-4s-1.791-4-4-4v0c-2.209 0-4 1.791-4 4s1.791 4 4 4v0z"
                    fill="#fff"
                  />
                </svg>
                <div style="margin-left:5px">设置</div>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/goodsCategory" v-if="power.indexOf('H1000')!=-1">商品分类</el-menu-item>
              <el-menu-item index="/materialClassification" v-if="power.indexOf('H10000')!=-1">物料分类</el-menu-item>
              <el-menu-item index="/plantManagement" v-if="power.indexOf('H11000')!=-1">工厂分类</el-menu-item>
              <el-menu-item index="/colorManagement" v-if="power.indexOf('H2000')!=-1">颜色管理</el-menu-item>
              <el-menu-item index="/measurementManagement" v-if="power.indexOf('H3000')!=-1">尺码管理</el-menu-item>
              <el-menu-item index="/materialManagement" v-if="power.indexOf('H4000')!=-1">材质管理</el-menu-item>
              <el-menu-item index="/timeManagement" v-if="power.indexOf('H5000')!=-1">季节管理</el-menu-item>
              <el-menu-item index="/unitManagement" v-if="power.indexOf('H6000')!=-1">单位管理</el-menu-item>
              <el-submenu index="9-3" v-if="power.indexOf('H7000')!=-1">
                <template slot="title" v-if="power.indexOf('H7000')!=-1">用户管理</template>
                <el-menu-item index="/listAccounts">用户列表</el-menu-item>
                <el-menu-item index="authorityManagement">权限管理</el-menu-item>
              </el-submenu>
              <el-menu-item index="/announcements">公司公告</el-menu-item>
              <el-menu-item index="/logout" v-if="power.indexOf('H8000')!=-1">退出系统</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view style="padding:0 40px;"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      power: "",
      activeIndex: "2",
      isCollapse: true,
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
  },
  mounted() {
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.index {
  /deep/ .el-menu--horizontal > .el-menu-item {
    border-bottom: none;
  }
  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
  }
  /deep/ .el-submenu__title {
    border-bottom-color: #000 !important;
  }
  .el-menu-demo {
    overflow: hidden;
    border-radius: 15px;
  }
  .logo {
    width: 100px;
    height: 80px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-weight: 600;
  }
  .el-menu-vertical-demo {
    width: 100px;
    // height: 600px;
    border-radius: 20px;
    // overflow: hidden;
    padding: 20px 0;
  }
  /deep/.el-main {
    padding: 0;
  }
}
</style>