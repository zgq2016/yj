<template>
  <div class="routeCardDeital">
    <div class="main">
      <div style="display:flex;justify-content: space-between;">
        <div class="up">
          <div class="up_img">
            <img :src="upData.picurl" alt />
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
        <router-link :to="`/editrouteCard?id=${upData.id}`" :data="upData">
          <span class="el-icon-edit" style="font-size: 30px;cursor: pointer;"></span>
        </router-link>
      </div>
      <div class="supplier">
        <div class="supplier_img">
          <img
            src="https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__56421accffad944d3f7a82b4ed0588f2.svg"
            alt
          />
        </div>
        <div class="supplier_content">
          <div class="supplier_content_name">某某布行</div>
          <div>13570383596</div>
          <div>020 - 89261869</div>
          <div>某某布行</div>
          <div>账号信息：</div>
          <div>广东省广州市海珠区中大九洲广场纬一街北区1020档</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMaterialsInfo } from "@/api/archives";
export default {
  data() {
    return {
      upData: {}
    };
  },
  methods: {},
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
      .supplier_img {
        margin-right: 20px;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .supplier_content {
        .supplier_content_name {
          font-size: 18px;
          font-weight: 600;
        }
        div {
          margin: 8px;
        }
      }
    }
    .bz{
      width: 30em;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
  }
}
</style>