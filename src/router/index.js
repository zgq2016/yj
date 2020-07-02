import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login.vue";
import Index from "@/views/index.vue";
import DesignFile from "@/views/archives/designFile.vue";
import ItemDesign from "@/views/researchDevelopment/itemDesign.vue";
import AddProject from "@/views/researchDevelopment/addProject.vue";
import PanelPurchase from "@/views/researchDevelopment/panelPurchase.vue";
import NewTheStyle from "@/views/researchDevelopment/newTheStyle.vue";
import MaterialPurchase from "@/views/researchDevelopment/materialPurchase.vue";
import EditTheStyle from "@/views/researchDevelopment/editTheStyle.vue";
import ClientManagement from "@/views/sell/clientManagement.vue";
import AddClient from "@/views/sell/addClient.vue";
import Check from "@/views/sell/check.vue";
import DesignCheck from "@/views/researchDevelopment/designCheck.vue";
import DetailEdit from "@/views/researchDevelopment/detailEdit.vue";
import DevelopmentStatus from "@/views/researchDevelopment/developmentStatus.vue";
import Development from "@/views/researchDevelopment/developmentCenter/development.vue";
import DesignNote from "@/views/researchDevelopment/developmentCenter/designNote.vue";
import MaterialProcess from "@/views/researchDevelopment/developmentCenter/materialProcess.vue";
import MaterialPurchasing from "@/views/researchDevelopment/developmentCenter/materialPurchasing.vue";
import PatternStatus from "@/views/researchDevelopment/developmentCenter/patternStatus.vue";
import SampleDress from "@/views/researchDevelopment/developmentCenter/sampleDress.vue";
import Distributor from "@/views/archives/distributor.vue";
import Distributor_list from "@/views/archives/distributor_id/distributor_list.vue";
import AddSupplier from "@/views/archives/distributor_id/addSupplier.vue";
import ListDeital from "@/views/archives/distributor_id/listDeital.vue";
import EditSupplier from "@/views/archives/distributor_id/editSupplier.vue";
import RouteCard from "@/views/archives/routeCard.vue";
import RouteCard_list from "@/views/archives/routeCard_id/routeCard_list.vue";
import AddRouteCard from "@/views/archives/routeCard_id/addRouteCard.vue";
import RouteCardDeital from "@/views/archives/routeCard_id/routeCardDeital.vue";
import EditrouteCard from "@/views/archives/routeCard_id/editrouteCard.vue";
import GoodsCategory from "@/views/setting/goodsCategory.vue";
import ColorManagement from "@/views/setting/colorManagement.vue";
import MeasurementManagement from "@/views/setting/measurementManagement.vue";
import MaterialManagement from "@/views/setting/materialManagement.vue";
import TimeManagement from "@/views/setting/timeManagement.vue";
import UnitManagement from "@/views/setting/unitManagement.vue";
import ListAccounts from "@/views/setting/listAccounts.vue";
import Logout from "@/views/setting/logout.vue";
import AuthorityManagement from "@/views/setting/authorityManagement.vue";
import Pattern from "@/views/researchDevelopment/pattern.vue";
import Platemaking from "@/views/researchDevelopment/platemaking.vue";
import StockInquiry from "@/views/warehouse/stockInquiry.vue";
import ProductStorehouse from "@/views/warehouse/productStorehouse.vue";
import Purchase from "@/views/production/purchase.vue";
import ProductionScheduling from "@/views/production/productionScheduling.vue";
import ProductionOrders from "@/views/production/productionOrders.vue";
import Tailor from "@/views/production/tailor.vue";
import Shipment from "@/views/production/shipment.vue";
import ProductionStyle from "@/views/production/productionStyle.vue";
import SalesOrder from "@/views/sell/salesOrder.vue";
import Homepage from "@/views/homepage.vue";

// 财务
import AccountFlowAndBookkeeping from "@/views/finance/accountFlowAndBookkeeping.vue";
import CustomerReconciliationAndCollection from "@/views/finance/customerReconciliationAndCollection.vue";
import CustomerStatement from "@/views/finance/customerReconciliationAndCollects/customerStatement.vue";
import SummaryParagraph from "@/views/finance/customerReconciliationAndCollects/summaryParagraph.vue";
import SupplierReconciliationAndPayment from "@/views/finance/supplierReconciliationAndPayment.vue";
import Accounter from "@/views/finance/accounter.vue";
import AccountType from "@/views/finance/accountType.vue";
import PaymentReimbursement from "@/views/finance/paymentReimbursement.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "default",
    path: "/",
    redirect: {
      name: "Login",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
    redirect: { name: "ItemDesign" },
    children: [
      { path: "/homepage", name: "Homepage", component: Homepage },
      { path: "/itemDesign", name: "ItemDesign", component: ItemDesign },
      { path: "/addProject", name: "AddProject", component: AddProject },
      {
        path: "/panelPurchase",
        name: "PanelPurchase",
        component: PanelPurchase,
      },
      { path: "/newTheStyle", name: "NewTheStyle", component: NewTheStyle },
      {
        path: "/materialPurchase",
        name: "MaterialPurchase",
        component: MaterialPurchase,
      },
      { path: "/pattern", name: "Pattern", component: Pattern },
      { path: "/platemaking", name: "Platemaking", component: Platemaking },
      { path: "/editTheStyle", name: "EditTheStyle", component: EditTheStyle },

      {
        path: "/clientManagement",
        name: "ClientManagement",
        component: ClientManagement,
      },
      { path: "/addClient", name: "AddClient", component: AddClient },
      { path: "/salesOrder", name: "SalesOrder", component: SalesOrder },
      { path: "/check", name: "Check", component: Check },
      { path: "/designCheck", name: "DesignCheck", component: DesignCheck },
      { path: "/detailEdit", name: "DetailEdit", component: DetailEdit },
      {
        path: "/goodsCategory",
        name: "GoodsCategory",
        component: GoodsCategory,
      },
      {
        path: "/colorManagement",
        name: "ColorManagement",
        component: ColorManagement,
      },
      {
        path: "/measurementManagement",
        name: "MeasurementManagement",
        component: MeasurementManagement,
      },
      {
        path: "/materialManagement",
        name: "MaterialManagement",
        component: MaterialManagement,
      },
      {
        path: "/timeManagement",
        name: "TimeManagement",
        component: TimeManagement,
      },
      {
        path: "/unitManagement",
        name: "UnitManagement",
        component: UnitManagement,
      },
      {
        path: "/listAccounts",
        name: "ListAccounts",
        component: ListAccounts,
      },
      {
        path: "/logout",
        name: "Logout",
        component: Logout,
      },
      {
        path: "/authorityManagement",
        name: "AuthorityManagement",
        component: AuthorityManagement,
      },

      { path: "/stockInquiry", name: "StockInquiry", component: StockInquiry },
      {
        path: "/productStorehouse",
        name: "ProductStorehouse",
        component: ProductStorehouse,
      },
      { path: "/purchase", name: "Purchase", component: Purchase },
      {
        path: "/productionScheduling",
        name: "ProductionScheduling",
        component: ProductionScheduling,
      },
      {
        path: "/productionOrders",
        name: "ProductionOrders",
        component: ProductionOrders,
      },
      {
        path: "/tailor",
        name: "Tailor",
        component: Tailor,
      },
      {
        path: "/shipment",
        name: "Shipment",
        component: Shipment,
      },
      {
        path: "/productionStyle",
        name: "ProductionStyle",
        component: ProductionStyle,
      },
      {
        path: "/developmentStatus",
        name: "DevelopmentStatus",
        component: DevelopmentStatus,
        children: [
          {
            path: "/development",
            name: "Development",
            component: Development,
          },
          {
            path: "/designNote",
            name: "DesignNote",
            component: DesignNote,
          },
          {
            path: "/materialProcess",
            name: "MaterialProcess",
            component: MaterialProcess,
          },
          {
            path: "/materialPurchasing",
            name: "MaterialPurchasing",
            component: MaterialPurchasing,
          },
          {
            path: "/patternStatus",
            name: "PatternStatus",
            component: PatternStatus,
          },
          {
            path: "/sampleDress",
            name: "SampleDress",
            component: SampleDress,
          },
        ],
      },
      {
        path: "/distributor",
        name: "Distributor",
        component: Distributor,
        redirect: { path: "/distributor_list" },
        children: [
          {
            path: "/distributor_list",
            name: "Distributor_list",
            component: Distributor_list,
          },
          {
            path: "/addSupplier",
            name: "AddSupplier",
            component: AddSupplier,
          },
          {
            path: "/listDeital",
            name: "ListDeital",
            component: ListDeital,
          },
          {
            path: "/editSupplier",
            name: "EditSupplier",
            component: EditSupplier,
          },
        ],
      },
      {
        path: "/routeCard",
        name: "RouteCard",
        component: RouteCard,
        redirect: { path: "/routeCard_list" },
        children: [
          {
            path: "/routeCard_list",
            name: "RouteCard_list",
            component: RouteCard_list,
          },
          {
            path: "/addRouteCard",
            name: "AddRouteCard",
            component: AddRouteCard,
          },
          {
            path: "/routeCardDeital",
            name: "RouteCardDeital",
            component: RouteCardDeital,
          },
          {
            path: "/editrouteCard",
            name: "EditrouteCard",
            component: EditrouteCard,
          },
        ],
      },
      {
        path: "/designFile",
        name: "DesignFile",
        component: DesignFile,
      },
      // 财务路由开始
      {
        path: "/accountFlowAndBookkeeping",
        name: "AccountFlowAndBookkeeping",
        component: AccountFlowAndBookkeeping,
      },
      {
        path: "/customerReconciliationAndCollection",
        name: "CustomerReconciliationAndCollection",
        component: CustomerReconciliationAndCollection,
        redirect: { path: "/summaryParagraph" },
        children: [
          {
            path: "/summaryParagraph",
            name: "SummaryParagraph",
            component: SummaryParagraph,
          },
          {
            path: "/customerStatement",
            name: "CustomerStatement",
            component: CustomerStatement,
          },
        ],
      },
      {
        path: "/supplierReconciliationAndPayment",
        name: "SupplierReconciliationAndPayment",
        component: SupplierReconciliationAndPayment,
      },
      { path: "/accounter", name: "Accounter", component: Accounter },
      { path: "/accountType", name: "AccountType", component: AccountType },
      {
        path: "/paymentReimbursement",
        name: "PaymentReimbursement",
        component: PaymentReimbursement,
      },
      // 财务路由结束
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
