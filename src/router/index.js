import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login.vue";
import Index from "@/views/index.vue";
import DesignFile from "@/views/archives/designFile.vue";
import ItemDesign from "@/views/researchDevelopment/itemDesign.vue";
import AddProject from "@/views/researchDevelopment/addProject.vue";
import DesignStyle from "@/views/researchDevelopment/designStyle.vue";
import PanelPurchase from "@/views/researchDevelopment/panelPurchase.vue";
import PanelPurchase_edit from "@/views/researchDevelopment/panelPurchase_edit.vue";
import NewTheStyle from "@/views/researchDevelopment/newTheStyle.vue";
import MaterialPurchase from "@/views/researchDevelopment/materialPurchase.vue";
import EditTheStyle from "@/views/researchDevelopment/editTheStyle.vue";
import AddDesignStyle from "@/views/researchDevelopment/addDesignStyle.vue";
import ClientManagement from "@/views/sell/clientManagement.vue";
import AddClient from "@/views/sell/addClient.vue";
import Check from "@/views/sell/check.vue";
import DesignCheck from "@/views/researchDevelopment/designCheck.vue";
import DetailEdit from "@/views/researchDevelopment/detailEdit.vue";
import DevelopmentStatus from "@/views/researchDevelopment/developmentStatus.vue";
// import Development from "@/views/researchDevelopment/developmentCenter/development.vue";
import DesignNote from "@/views/researchDevelopment/developmentCenter/designNote.vue";
import Print from "@/views/print.vue";
import MaterialProcess from "@/views/researchDevelopment/developmentCenter/materialProcess.vue";
import MerchandiseNews from "@/views/researchDevelopment/developmentCenter/merchandiseNews.vue";
import MaterialPurchasing from "@/views/researchDevelopment/developmentCenter/materialPurchasing.vue";
import PatternStatus from "@/views/researchDevelopment/developmentCenter/patternStatus.vue";
import SampleDress from "@/views/researchDevelopment/developmentCenter/sampleDress.vue";
// import Distributor from "@/views/archives/distributor.vue";
import Distributor_list from "@/views/archives/distributor_id/distributor_list.vue";
import AddSupplier from "@/views/archives/distributor_id/addSupplier.vue";
import ListDeital from "@/views/archives/distributor_id/listDeital.vue";
import EditSupplier from "@/views/archives/distributor_id/editSupplier.vue";
// import RouteCard from "@/views/archives/routeCard.vue";
import Plant from "@/views/archives/plant.vue";
import RouteCard_list from "@/views/archives/routeCard_id/routeCard_list.vue";
import AddRouteCard from "@/views/archives/routeCard_id/addRouteCard.vue";
import RouteCardDeital from "@/views/archives/routeCard_id/routeCardDeital.vue";
import EditrouteCard from "@/views/archives/routeCard_id/editrouteCard.vue";
import GoodsCategory from "@/views/setting/goodsCategory.vue";
import Menus from "@/views/setting/menus.vue";
import ColorManagement from "@/views/setting/colorManagement.vue";
import MeasurementManagement from "@/views/setting/measurementManagement.vue";
import MaterialManagement from "@/views/setting/materialManagement.vue";
import TimeManagement from "@/views/setting/timeManagement.vue";
import UnitManagement from "@/views/setting/unitManagement.vue";
import ListAccounts from "@/views/setting/listAccounts.vue";
import Logout from "@/views/setting/logout.vue";
import AuthorityManagement from "@/views/setting/authorityManagement.vue";
import Announcements from "@/views/setting/announcements.vue";
import Measurement from "@/views/setting/measurement.vue";
import Issue from "@/views/setting/issue.vue";
import MaterialClassification from "@/views/setting/materialClassification.vue";
import PlantManagement from "@/views/setting/plantManagement.vue";
import Pattern from "@/views/researchDevelopment/pattern.vue";
import Platemaking from "@/views/researchDevelopment/platemaking.vue";
import StockInquiry from "@/views/warehouse/stockInquiry.vue";
import StockInquiryDetails from "@/views/warehouse/stockInquiryDetails.vue";
import StockInquiryDetailsAdd from "@/views/warehouse/stockInquiryDetailsAdd.vue";
import WarehouseSet from "@/views/warehouse/warehouseSet.vue";
import ProductStorehouse from "@/views/warehouse/productStorehouse.vue";
import MaterialStorage from "@/views/warehouse/materialStorage.vue";
import Material from "@/views/warehouse/material.vue";
import PurchaseMaterial from "@/views/warehouse/purchaseMaterial.vue";
import MaterialTable from "@/views/warehouse/materialTable.vue";
import Purchase from "@/views/production/purchase.vue";
import ProductionScheduling from "@/views/production/productionScheduling.vue";
import ProductionOrders from "@/views/production/productionOrders.vue";
import Tailor from "@/views/production/tailor.vue";
import Sc_Order_information from "@/views/production/sc/sc_Order_information.vue";
import Sc_purchase from "@/views/production/sc/sc_purchase.vue";
import Sc_materialPurchasing from "@/views/production/sc/sc_materialPurchasing.vue";
import Sc_tailor from "@/views/production/sc/sc_tailor.vue";
import Sc_shipment from "@/views/production/sc/sc_shipment.vue";
import Shipment from "@/views/production/shipment.vue";
import ProductionStyle from "@/views/production/productionStyle.vue";
import SalesOrder from "@/views/sell/salesOrder.vue";
import SalesOrderDetails from "@/views/sell/salesOrderDetails.vue";
import SalesOrderDetailsAdd from "@/views/sell/salesOrderDetailsAdd.vue";
import Homepage from "@/views/homepage.vue";

// 财务
import AccountFlowAndBookkeeping from "@/views/finance/accountFlowAndBookkeeping.vue";
import CustomerReconciliationAndCollection from "@/views/finance/customerReconciliationAndCollection.vue";
import CustomerStatement from "@/views/finance/customerReconciliationAndCollects/customerStatement.vue";
import SummaryParagraph from "@/views/finance/customerReconciliationAndCollects/summaryParagraph.vue";
import SupplierReconciliationAndPayment from "@/views/finance/supplierReconciliationAndPayment.vue";
import PlantReconciliationAndPayment from "@/views/finance/plantReconciliationAndPayment.vue";
import Accounter from "@/views/finance/accounter.vue";
import AccountType from "@/views/finance/accountType.vue";
import PaymentReimbursement from "@/views/finance/paymentReimbursement.vue";

import AdvanceReimbursement from "@/views/examineAndApprove/advanceReimbursement.vue";
import VacationApproval from "@/views/examineAndApprove/vacationApproval.vue";
import ExaminationAndApprovalWork from "@/views/examineAndApprove/examinationAndApprovalWork.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "default",
    path: "/",
    redirect: {
      name: "Homepage",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/print",
    name: "Print",
    component: Print,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
    redirect: { name: "Homepage" },
    children: [
      { path: "/homepage", name: "Homepage", component: Homepage },
      {
        path: "/advanceReimbursement",
        name: "AdvanceReimbursement",
        component: AdvanceReimbursement,
      },
      {
        path: "/itemDesign",
        name: "ItemDesign",
        component: ItemDesign,
      },
      {
        path: "/vacationApproval",
        name: "VacationApproval",
        component: VacationApproval,
      },
      {
        path: "/examinationAndApprovalWork",
        name: "ExaminationAndApprovalWork",
        component: ExaminationAndApprovalWork,
      },

      { path: "/addProject", name: "AddProject", component: AddProject },
      { path: "/designStyle", name: "DesignStyle", component: DesignStyle },
      {
        path: "/panelPurchase",
        name: "PanelPurchase",
        component: PanelPurchase,
      },
      {
        path: "/panelPurchase_edit",
        name: "PanelPurchase_edit",
        component: PanelPurchase_edit,
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
        path: "/addDesignStyle",
        name: "AddDesignStyle",
        component: AddDesignStyle,
      },

      {
        path: "/clientManagement",
        name: "ClientManagement",
        component: ClientManagement,
      },
      { path: "/addClient", name: "AddClient", component: AddClient },
      { path: "/salesOrder", name: "SalesOrder", component: SalesOrder },
      {
        path: "/salesOrderDetails",
        name: "SalesOrderDetails",
        component: SalesOrderDetails,
      },
      {
        path: "/salesOrderDetailsAdd",
        name: "SalesOrderDetailsAdd",
        component: SalesOrderDetailsAdd,
      },
      { path: "/check", name: "Check", component: Check },
      { path: "/designCheck", name: "DesignCheck", component: DesignCheck },
      { path: "/detailEdit", name: "DetailEdit", component: DetailEdit },
      {
        path: "/goodsCategory",
        name: "GoodsCategory",
        component: GoodsCategory,
      },
      {
        path: "/menus",
        name: "Menus",
        component: Menus,
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
      {
        path: "/announcements",
        name: "Announcements",
        component: Announcements,
      },
      {
        path: "/measurement",
        name: "Measurement",
        component: Measurement,
      },
      {
        path: "/issue",
        name: "Issue",
        component: Issue,
      },
      {
        path: "/materialClassification",
        name: "MaterialClassification",
        component: MaterialClassification,
      },
      {
        path: "/plantManagement",
        name: "PlantManagement",
        component: PlantManagement,
      },
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
      {
        path: "/stockInquiry",
        name: "StockInquiry",
        component: StockInquiry,
      },
      {
        path: "/stockInquiryDetails",
        name: "StockInquiryDetails",
        component: StockInquiryDetails,
      },
      {
        path: "/stockInquiryDetailsAdd",
        name: "StockInquiryDetailsAdd",
        component: StockInquiryDetailsAdd,
      },
      { path: "/warehouseSet", name: "WarehouseSet", component: WarehouseSet },
      {
        path: "/productStorehouse",
        name: "ProductStorehouse",
        component: ProductStorehouse,
      },
      {
        path: "/materialStorage",
        name: "MaterialStorage",
        component: MaterialStorage,
      },
      {
        path: "/material",
        name: "Material",
        component: Material,
      },
      {
        path: "/purchase",
        name: "Purchase",
        component: Purchase,
      },
      {
        path: "/materialTable",
        name: "MaterialTable",
        component: MaterialTable,
      },
      {
        path: "/purchaseMaterial",
        name: "PurchaseMaterial",
        component: PurchaseMaterial,
      },
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
        children: [
          {
            path: "/sc_Order_information",
            name: "Sc_Order_information",
            component: Sc_Order_information,
          },
          {
            path: "/sc_purchase",
            name: "Sc_purchase",
            component: Sc_purchase,
          },
          {
            path: "/sc_materialPurchasing",
            name: "Sc_materialPurchasing",
            component: Sc_materialPurchasing,
          },
          {
            path: "/sc_tailor",
            name: "Sc_tailor",
            component: Sc_tailor,
          },
          {
            path: "/sc_shipment",
            name: "Sc_shipment",
            component: Sc_shipment,
          },
        ],
      },
      {
        path: "/developmentStatus",
        name: "DevelopmentStatus",
        component: DevelopmentStatus,
        children: [
          // {
          //   path: "/development",
          //   name: "Development",
          //   component: Development,
          // },
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
            path: "/merchandiseNews",
            name: "MerchandiseNews",
            component: MerchandiseNews,
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

      // {
      //   path: "/distributor",
      //   name: "Distributor",
      //   component: Distributor,
      //   redirect: { path: "/distributor_list" },
      //   children: [
      //     {
      //       path: "/distributor_list",
      //       name: "Distributor_list",
      //       component: Distributor_list,
      //     },
      //     {
      //       path: "/addSupplier",
      //       name: "AddSupplier",
      //       component: AddSupplier,
      //     },
      //     {
      //       path: "/listDeital",
      //       name: "ListDeital",
      //       component: ListDeital,
      //     },
      //     {
      //       path: "/editSupplier",
      //       name: "EditSupplier",
      //       component: EditSupplier,
      //     },
      //   ],
      // },
      // {
      //   path: "/routeCard",
      //   name: "RouteCard",
      //   component: RouteCard,
      //   redirect: { path: "/routeCard_list" },
      //   children: [
      //     {
      //       path: "/routeCard_list",
      //       name: "RouteCard_list",
      //       component: RouteCard_list,
      //     },
      //     {
      //       path: "/addRouteCard",
      //       name: "AddRouteCard",
      //       component: AddRouteCard,
      //     },
      //     {
      //       path: "/routeCardDeital",
      //       name: "RouteCardDeital",
      //       component: RouteCardDeital,
      //     },
      //     {
      //       path: "/editrouteCard",
      //       name: "EditrouteCard",
      //       component: EditrouteCard,
      //     },
      //   ],
      // },
      {
        path: "/designFile",
        name: "DesignFile",
        component: DesignFile,
      },
      {
        path: "/plant",
        name: "Plant",
        component: Plant,
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
      {
        path: "/plantReconciliationAndPayment",
        name: "PlantReconciliationAndPayment",
        component: PlantReconciliationAndPayment,
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
