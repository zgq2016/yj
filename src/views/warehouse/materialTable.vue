<template>
  <div class="materialTable">
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>仓库</el-breadcrumb-item>
          <el-breadcrumb-item>物料库存查询</el-breadcrumb-item>
          <el-breadcrumb-item>物料库存详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="main">
      <div class="info">
        <!-- header -->
        <div style="display: flex">
          <div class="cardInfo">
            <div class="cardInfoTitle">物料卡信息</div>
            <div class="cardInfoContent">
              <div class="cardInfoContentImg">
                <img :src="header.picurl" alt @click="go_material_card" />
              </div>
              <div class="cardInfoContentText">
                <div class="cardInfoContentTextName">
                  {{ header.materialsname }}
                </div>
                <div style="display: flex">
                  <div style="margin-right: 100px">
                    <div>内部编号：{{ header.materialsno }}</div>
                    <div>编号：{{ header.materialsno }}</div>
                    <div>
                      面料分类：{{ header.materials_mainclass_name
                      }}{{ `(${header.materials_class_name})` }}
                    </div>
                    <div>
                      料 属 性 ：
                      <span
                        style="
                          margin-right: 10px;
                          text-align: center;
                          width: 50px;
                          display: inline-block;
                        "
                        v-for="(item, index) in header.material_data"
                        :key="index"
                        >{{ item.material_name }}</span
                      >
                    </div>
                    <div style="display: flex">
                      <div>
                        面料成分：
                        <span
                          style="
                            margin-right: 10px;
                            text-align: center;
                            width: 50px;
                            display: inline-block;
                          "
                          v-for="(item, index) in header.material_data"
                          :key="index"
                          >{{ item.content }}%</span
                        >
                      </div>
                      <!-- <div style="width:70px;">
                        <div></div>
                      </div>-->
                    </div>
                  </div>
                  <div>
                    <!-- <div>色号：{{colors.color_no}}</div> -->
                    <!-- <div>颜色：{{colors.color}}</div> -->
                    <div>大货单价：{{ header.wsale_price }}</div>
                    <div>幅宽：{{ header.unit }}</div>
                    <div>到货时间：{{ header.arrival_time }}天</div>
                    <div :title="header.remarks" class="rearmk">
                      备注：{{ header.remarks }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="supplierInfo">
            <div class="supplierInfoTitle">供应商信息</div>
            <div class="supplierInfoContent" ref="supplier">
              <div class="supplierInfoContentImg">
                <img :src="supplier.cardpicurl" alt @click="go_supplier" />
              </div>
              <div class="supplierInfoContentText">
                <div class="supplierInfoContentTextName">
                  {{ supplier.companyname }}
                </div>
                <div
                  v-for="(item, index) in supplier.contact_data"
                  :key="index"
                >
                  {{ item.phone }}
                </div>
                <div>账号信息：</div>
                <div style="width: 155px">{{ supplier.address }}</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 15px"
            size="mini"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
          >
            <!-- <el-table-column align="center" type="index" label="采购批次" width="50"></el-table-column> -->

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  ref="singleTable"
                  :data="props.row.details"
                  border
                  size="mini"
                  highlight-current-row
                  style="width: 100%"
                >
                  <el-table-column
                    prop="returntime"
                    label="回料时间"
                  ></el-table-column>
                  <el-table-column
                    prop="quantity"
                    label="回货量"
                  ></el-table-column>
                  <el-table-column
                    prop="amount"
                    label="结算金额"
                  ></el-table-column>
                  <el-table-column
                    prop="balance"
                    label="余结金额"
                  ></el-table-column>
                  <el-table-column prop="details" label="凭证">
                    <template slot-scope="scope">
                      <div
                        v-if="scope.row.picurl"
                        @click="see_voucher(scope.row.picurl)"
                      >
                        查看凭证
                      </div>
                      <div
                        v-if="!scope.row.picurl&&permission.indexOf('purchase_log_picurl_upload') != -1"
                        @click="upload_voucher(scope.row)"
                      >
                        上传凭证
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              type="index"
              prop="purchaseBatch"
              width="90"
              label="采购批次"
            ></el-table-column>
            <el-table-column
              align="center"
              width="95px"
              prop="create_time"
              label="采购时间"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="color_no"
              label="色卡"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="amountPurchased"
              label="采购量"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="单价"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="deposit"
              label="订金"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="stock_quantity"
              label="回货量"
            ></el-table-column>
            <el-table-column
              align="center"
              width="95px"
              prop="create_time"
              label="预计回料时间"
            ></el-table-column>
            <!-- <el-table-column align="center" prop="scheduledReceipt" label="入库量"></el-table-column> -->
            <!-- <el-table-column align="center" prop="stock_quantity" label="库存量"></el-table-column> -->
            <el-table-column
              align="center"
              prop="amount"
              label="结算金额"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="balance"
              label="余结金额"
            ></el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="pagination"
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[9, 18, 27, 36]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="voucher" alt />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1">
      <el-upload
        class="avatar-uploader"
        :action="url + '/uploadpic.php'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess_no"
        :before-upload="beforeAvatarUpload_no"
      >
        <img v-if="picurl" :src="picurl" class="avatar" />
        <i v-else class="el-icon-upload avatar-uploader-icon"></i>
      </el-upload>
      <div style="width: 200px; margin: 0 auto">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button @click="partBack()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  materialStoreRecord,
  materialStoreDetail,
  purchaseLogPicurlUpload,
} from "@/api/warehouse";
import {
  getMaterialsInfo, //物料
  getSupplierInfo, //供应商
} from "@/api/archives";
import { url } from "@/api/configuration";
export default {
  data() {
    return {
      url: url,
      header: [], //物料信息
      supplier: [], //供应商
      colors: {},
      tableData: [],
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      // 获取row的key值
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      // 要展开的行，数
      dialogVisible: false,
      dialogVisible1: false,
      voucher: "",
      picurl: "",
      item: {},
      permission: [],
    };
  },
  methods: {
    async partBack() {
      let { type } = this.$route.query;
      let res = await purchaseLogPicurlUpload({
        id: this.item.id,
        type,
        picurl: this.picurl,
      });
      console.log(res);
      this.init();
      this.materials();
      this.dialogVisible1 = false;
      this.picurl = "";
    },
    handleAvatarSuccess_no(res, file) {
      this.picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload_no(file) {
      return this.$elUploadBeforeUpload(file);
    },
    see_voucher(e) {
      this.dialogVisible = true;
      this.voucher = e;
    },
    upload_voucher(e) {
      this.dialogVisible1 = true;
      this.item = e;
    },
    go_supplier() {
      console.log(this.supplier);
      this.$router.push({ path: `listDeital?id=${this.supplier.id}` });
    },
    go_material_card() {
      console.log(this.header);
      this.$router.push({
        path: `routeCardDeital?id=${this.header.id}`,
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.materials();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.materials();
    },
    async init() {
      this.colors = [];
      this.supplier = [];
      // 物料
      let { materials_id } = this.$route.query;
      let res = await getMaterialsInfo({
        id: Number(materials_id),
      });
      let { data } = res.data;
      this.header = data;
      this.colors = this.header.color_data[0];
      //  {
      //   color: this.header.color_data[0].color,
      //   color_no: this.header.color_data[0].color_no
      // };

      // 供应商
      let res1 = await getSupplierInfo({
        id: Number(data.materials_supplier_data[0].supplier_id),
      });
      let data1 = res1.data.data;
      this.supplier = data1;
      // console.log(this.header, this.supplier);
    },
    async materials() {
      // let id = this.$route.query.materials_id;
      let { materials_id, type, id } = this.$route.query;
      let obj = {
        materials_id: materials_id,
        page: this.pageIndex,
        page_size: this.pageSize,
      };
      if (type) {
        obj["type"] = type;
      }
      if (id) {
        obj["id"] = id;
      }
      let res2 = await materialStoreDetail(obj);
      console.log(res2);
      this.tableData = res2.data.data;
      this.total = res2.data.count;
      this.tableData.map((v, i) => {
        v.details.map((j, k) => {
          v.stock_quantity += Number(j.quantity);
        });
      });

      this.expands.push(this.tableData[0].id);
    },
  },
  mounted() {
    this.init();
    this.materials();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>
<style lang="less" scoped>
.materialTable {
  .main {
    .info {
      .cardInfo {
        margin-right: 80px;
        .cardInfoTitle {
          padding: 0 10px 30px 0;
          font-size: 16px;
        }
        .cardInfoContent {
          display: flex;
          .cardInfoContentImg {
            margin-right: 30px;
            img {
              width: 200px;
              height: 200px;
              border-radius: 15px;
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
          padding: 0 10px 30px 0;
          font-size: 16px;
        }
        .supplierInfoContent {
          display: flex;
          .supplierInfoContentImg {
            img {
              width: 200px;
              height: 200px;
              border-radius: 15px;
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
    .table {
      .el-table {
        /deep/.cell {
          font-weight: 500 !important;
        }
      }
    }
  }
  .pagination {
    margin: 20px;
    text-align: right;
  }
}
</style>