<template>
  <div class="routeCardDeital">
    <div class="main">
      <div style="display:flex;justify-content: space-between;">
        <div class="up">
          <div class="up_img">
            <img :src="upData.picurl" alt @click="handlePreview" />
          </div>
          <div class="up_content">
            <div class="up_content_name">{{upData.materialsname}}</div>
            <div style="display:flex;">
              <div style="margin-right:100px;">
                <div>内部编号 : {{upData.materialsno}}</div>
                <div>编号 : {{upData.materialsno}}</div>
                <div>面料分类</div>
                <div>料属性</div>
                <div style="display:flex;">
                  <div>面料成分：</div>
                  <div v-for="(item, index) in upData.material_data" :key="index">
                    <div>
                      <div>{{item.content}}</div>
                      <div>{{item.material_name}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>大货量单价：{{upData.wsale_price}}</div>
                <div>幅宽：{{upData.unit}}</div>
                <div>是否有货：{{upData.instock}}</div>
                <div>到货时间：{{upData.arrival_time}}</div>
                <div class="bz">备注：{{upData.remarks}}</div>
              </div>
            </div>
          </div>
        </div>
        <router-link :to="`/editrouteCard?id=${upData.id}&TL=2`" :data="upData" v-if="power.indexOf('E2000200')!=-1||power.indexOf('E2000300')!=-1">
          <span class="el-icon-edit" style="font-size: 30px;cursor: pointer;"></span>
        </router-link>
      </div>
      <div class="supplier">
        <div class="main_left">
          <div class="main_left_img">
            <img :src="obj.cardpicurl" alt @click="handlePreview1" />
          </div>
          <div class="main_left_deital">
            <div class="main_left_deital_name">{{obj.companyname}}</div>
            <div>
              <div>
                <div v-for="(item, index) in obj.contact_data" :key="index">
                  <span style="margin:0 10px">{{item.contacts}}:</span>
                  <span>{{item.phone}}</span>
                </div>
              </div>
            </div>
            <div>
              账号信息：
              <div>
                <div v-for="(item, index) in obj.bank_data" :key="index">
                  <span>{{item.bank}}</span>
                  <span style="margin:0 10px">{{item.bankid}}</span>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
            <div>{{obj.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="upData.picurl" alt />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1">
      <img width="100%" :src="obj.cardpicurl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { getMaterialsInfo, getSupplierInfo } from "@/api/archives";
export default {
  data() {
    return {
      power: "",
      upData: {},
      obj: {},
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  methods: {
    handlePreview() {
      this.dialogVisible = true;
    },
    handlePreview1() {
      this.dialogVisible1 = true;
    },
    async init() {
      let res = await getSupplierInfo({
        id: this.upData.materials_supplier_data[0].supplier_id
      });
      this.obj = res.data.data;
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getMaterialsInfo({ id });
    // console.log(res);
    this.upData = res.data.data;
    console.log(this.upData);
    if (this.upData.instock === "0") {
      this.upData.instock = "是";
    }
    if (this.upData.instock === "1") {
      this.upData.instock = "否";
    }
    this.init();
    this.power = localStorage.getItem("power");
    console.log(this.power);
  }
};
</script>

<style lang="less" scoped>
.routeCardDeital {
  .main {
    // display: flex;
    // justify-content: space-between;
    padding: 20px;
    font-size: 14px;
    .up {
      display: flex;
      // justify-content: space-between;
      margin-bottom: 50px;
      .up_img {
        margin-right: 20px;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .up_content {
        .up_content_name {
          font-size: 18px;
          font-weight: 600;
        }
        div {
          margin: 2px;
        }
      }
    }
    .supplier {
      display: flex;
      margin-bottom: 50px;
      .main_left {
        display: flex;
        margin-bottom: 50px;
        .main_left_img {
          margin-right: 20px;
          img {
            width: 200px;
            height: 200px;
          }
        }
        .main_left_deital {
          .bz {
            width: 43em;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
          }
          .main_left_deital_name {
            font-size: 16px;
            font-weight: 600;
          }
          div {
            margin: 5px 0px;
          }
        }
      }
    }
    .bz {
      width: 30em;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
  }
}
</style>