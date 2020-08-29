<template>
  <div class="ListDeital">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/distributor_list' }">供应商</el-breadcrumb-item>
        <el-breadcrumb-item>供应商详细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="left">
        <div class="main_left">
          <div class="main_left_img">
            <img :src="obj.cardpicurl" alt @click="handlePreview" />
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
        <div class="main_left">
          <div class="main_left_img">
            <img :src="obj.compicurl" alt @click="handlePreview1" />
          </div>
          <div class="main_left_deital">
            <div>是否开发票：{{obj.isbill}}</div>
            <div>税点：{{obj.tax}}</div>
            <div>面料统计：{{obj.material_count}}</div>
            <div>成交笔数：{{obj.deal_count}}</div>
            <div>修改人：{{obj.user_name}}</div>
            <div>修改时间：{{obj.ctime}}</div>
            <div class="bz">备注:{{obj.remarks}}</div>
          </div>
        </div>
      </div>
      <router-link
        :to="`/editSupplier?id=${obj.id}&TL=2`"
        :data="obj"
        v-if="permission.indexOf('editSupplier')!=-1"
      >
        <span class="el-icon-edit" style="font-size: 30px;cursor: pointer;"></span>
      </router-link>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="obj.cardpicurl" alt />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1">
      <img width="100%" :src="obj.compicurl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { getSupplierInfo } from "@/api/archives";
export default {
  data() {
    return {
      power: "",
      id: "",
      obj: {},
      dialogVisible: false,
      dialogVisible1: false,
      permission:[]
    };
  },
  methods: {
    handlePreview() {
      this.dialogVisible = true;
    },
    handlePreview1() {
      this.dialogVisible1 = true;
    },
  },
  async mounted() {
    let { id } = this.$route.query;
    // console.log(id);
    let res = await getSupplierInfo({ id });
    this.obj = res.data.data;
    console.log(res);
    // console.log(this.obj.isbill);
    if (this.obj.isbill === "0") {
      this.obj.isbill = "开";
    }
    if (this.obj.isbill === "1") {
      this.obj.isbill = "不开";
    }
    // this.power = localStorage.getItem("power");
    this.permission = localStorage.getItem("permission").split(",");
    console.log(this.power);
  },
};
</script>

<style lang="less" scoped>
.ListDeital {
  .main {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: 14px;
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
    .main_right {
    }
  }
}
</style>