<template>
  <div class="materialTable">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>物料库存查询</el-breadcrumb-item>
      <el-breadcrumb-item>物料库存详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="info">
        <!-- header -->
        <div style="display: flex;">
          <div class="cardInfo">
            <div class="cardInfoTitle">物料卡信息</div>
            <div class="cardInfoContent">
              <div class="cardInfoContentImg">
                <img :src="header.picurl" alt />
              </div>
              <div class="cardInfoContentText">
                <div class="cardInfoContentTextName">{{header.materialsname}}</div>
                <div style="display: flex;">
                  <div style="margin-right:100px">
                    <div>内部编号：{{header.materialsno}}</div>
                    <div>编号：{{header.materialsno}}</div>
                    <div>面料分类：{{header.materials_mainclass_name}}{{`(${header.materials_class_name})`}}</div>
                    <div>
                      料 属 性 ：
                      <span
                        style="margin-right:10px;text-align:center;width:50px;display:inline-block;"
                        v-for="(item,index) in header.material_data"
                        :key="index"
                      >{{item.material_name}}</span>
                    </div>
                    <div style="display: flex;">
                      <div>
                        面料成分：
                        <span
                          style="margin-right:10px;text-align:center;width:50px;display:inline-block;"
                          v-for="(item,index) in header.material_data"
                          :key="index"
                        >{{item.content}}%</span>
                      </div>
                      <!-- <div style="width:70px;">
                        <div></div>
                      </div>-->
                    </div>
                  </div>
                  <div>
                    <!-- <div>色号：{{colors.color_no}}</div> -->
                    <!-- <div>颜色：{{colors.color}}</div> -->
                    <div>大货单价：{{header.wsale_price}}</div>
                    <div>幅宽：{{header.unit}}</div>
                    <div>到货时间：{{header.arrival_time}}</div>
                    <div :title="header.remarks" class="rearmk">备注：{{header.remarks}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="supplierInfo">
            <div class="supplierInfoTitle">供应商信息</div>
            <div class="supplierInfoContent" ref="supplier">
              <div class="supplierInfoContentImg">
                <img :src="supplier.cardpicurl" alt />
              </div>
              <div class="supplierInfoContentText">
                <div class="supplierInfoContentTextName">{{supplier.companyname}}</div>
                <div v-for="(item,index) in supplier.contact_data" :key="index">{{item.phone}}</div>
                <div>账号信息：</div>
                <div style="width:155px">{{supplier.address}}</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="table">
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            style="width: 100%;margin-top:15px;"
          >
            <!-- <el-table-column align="center" type="index" label="采购批次" width="50"></el-table-column> -->
            <el-table-column
              align="center"
              type="index"
              prop="purchaseBatch"
              width="90"
              label="采购批次"
            ></el-table-column>
            <el-table-column align="center" prop="purchaseTime" label="采购时间"></el-table-column>
            <el-table-column align="center" prop="pantone" label="色卡"></el-table-column>
            <el-table-column align="center" prop="amountPurchased" label="采购量"></el-table-column>
            <el-table-column align="center" prop="univalence" label="单价"></el-table-column>
            <el-table-column align="center" prop="subscription" label="订金"></el-table-column>
            <el-table-column align="center" prop="cargo" label="回货量"></el-table-column>
            <el-table-column align="center" prop="cargoTime" label="回货时间"></el-table-column>
            <!-- <el-table-column align="center" prop="scheduledReceipt" label="入库量"></el-table-column> -->
            <el-table-column align="center" prop="inventory" label="库存量"></el-table-column>
            <el-table-column align="center" prop="settlementAmount" label="结算金额"></el-table-column>
            <el-table-column align="center" prop="amount" label="余结金额"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMaterialsInfo, //物料
  getSupplierInfo //供应商
} from "@/api/archives";
export default {
  data() {
    return {
      header: [], //物料信息
      supplier: [], //供应商
      colors: {},
      tableData: [
        {
          purchaseBatch: "",
          purchaseTime: "",
          pantone: "",
          amountPurchased: "",
          univalence: "",
          subscription: "",
          cargo: "",
          cargoTime: "",
          scheduledReceipt: "",
          inventory: "",
          settlementAmount: "",
          amount: ""
        }
      ]
    };
  },
  methods: {
    async init() {
      // 物料
      let { materials_id } = this.$route.query;
      let res = await getMaterialsInfo({
        id: Number(materials_id)
      });
      console.log(res);
      let { data } = res.data;
      this.header = data;
      this.colors = {
        color: this.header.color_data[0].color,
        color_no: this.header.color_data[0].color_no
      };

      // 供应商
      let res1 = await getSupplierInfo({
        id: Number(data.materials_supplier_data[0].supplier_id)
      });
      let data1 = res1.data.data;
      this.supplier = data1;
      console.log(this.header, this.supplier);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.materialTable {
  .main {
    .info {
      .cardInfo {
        margin-right: 80px;
        .cardInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
        .cardInfoContent {
          display: flex;
          .cardInfoContentImg {
            margin-right: 30px;
            img {
              width: 200px;
              height: 200px;
            }
          }
          .cardInfoContentText {
            cursor: pointer;
            div {
              margin: 3px 0;
              font-size: 14px;
            }
            .cardInfoContentTextName {
              font-size: 16px;
              font-weight: 600;
              margin-top: 10px;
            }
            /deep/.rearmk {
              width: 170px;
              word-wrap: break-word;
              word-break: normal;

              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              // 控制行数
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .supplierInfo {
        .supplierInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
        .supplierInfoContent {
          display: flex;
          .supplierInfoContentImg {
            img {
              width: 200px;
              height: 200px;
            }
          }
          .supplierInfoContentText {
            margin: 10px 30px;
            div {
              margin: 3px 0;
              font-size: 14px;
            }
            .supplierInfoContentTextName {
              font-size: 16px;
              font-weight: 600;
              margin-top: 10px;
            }
          }
        }
      }
      .purchaseInfo {
        .purchaseInfoTitle {
          padding: 30px 10px;
          font-size: 16px;
        }
      }
      .form {
        margin: 30px 10px;
      }
    }
  }
}
</style>