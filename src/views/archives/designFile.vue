<template>
  <div class="designFile">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>档案库</el-breadcrumb-item>
      <el-breadcrumb-item>款式档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
    </div>
  </div>
</template>

<script>
import { getStyle } from "@/api/researchDevelopment";
export default {
  data() {
    return {
     
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    onSubmit() {
      console.log("submit!");
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getStyle({ id });
    this.obj = res.data.data;
    console.log(this.obj);
    // console.log(this.obj.style_materials_color_data)
    this.activities_endlong = res.data.data.style_log;
  }
};
</script>
<style lang="less" scoped>
.designFile {
  .main {
    .info {
      display: flex;
      .basicsInfo {
        width: 50%;
        .basicsInfoName {
          margin: 30px 0px;
          font-size: 16px;
        }
        .basicsInfoImg {
          display: flex;
          img {
            width: 200px;
            margin-right: 20px;
          }
        }
      }
      .materialCardInfo {
        width: 50%;
        .materialCardInfoName {
          margin: 30px 0px;
          font-size: 16px;
        }
        .materialCardInfoContent {
          div {
            margin: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .placeAnOrderBatchInfo {
      margin: 30px 0;
      display: flex;
      .placeAnOrderBatch {
        margin: 0 40px;
        font-size: 16px;
      }
    }
    .orderInformation {
    }
    .purchase {
      .color {
        display: flex;
        margin: 20px 0;
        div {
          margin: 0 40px;
        }
      }
      .material_purchase {
        .content {
          display: flex;
          .card {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 12px;
            .cardStyle {
              width: 320px;
              height: 100px;
              display: flex;
              .cardStyle_left {
                width: 270px;
                display: flex;
                background-color: #f2f2f2;
                border-radius: 10px;
                .cardStyle_left_img {
                  img {
                    width: 100px;
                    height: 100px;
                  }
                }
                .cardStyle_left_content {
                  div {
                    margin: 0 5px;
                  }
                  flex: 1;
                  .cardStyle_left_content_name {
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
              .cardStyle_right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 50px;
                background-color: #f2f2f2;
                border-radius: 10px;
              }
            }
          }
          .wastage {
            width: 100px;
            border-radius: 10px;
            background-color: #f2f2f2;
            height: 100px;
            text-align: center;
          }
          .amount {
            width: 100px;
            border-radius: 10px;
            background-color: #f2f2f2;
            height: 100px;
            text-align: center;
          }
          .orderInformation {
            border-radius: 10px;
            background-color: #f2f2f2;
            width: 500px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 100px;
            padding: 10px;
          }
        }
      }
    }
    .productionArranged {
      /deep/textarea {
        height: 100px;
        resize: none !important;
      }
    }
    .tailor {
      .tailorList {
        margin: 30px 0;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
      .add {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .shipment {
      .shipmentList {
        margin: 30px 0;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
      .add {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .dfjccaic {
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      padding: 2px;
    }
  }
}
</style>


