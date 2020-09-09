<template>
  <div class="print" id="printTest">
    <div class="left">
      <div class="company">SHESHO 设计版单</div>
      <div>款号：{{obj.styleno}}</div>
      <div>品类：{{obj.style_type}}</div>
      <div>年份：{{obj.year}}</div>
      <div>季节：{{obj.season}}</div>
      <div>设计师：{{obj.user_name}}</div>
      <div>颜色：{{obj.style_color}}</div>
      <!-- <div class="lining">
        <div>面料样板</div>
      </div>-->
      <div class="liningke">
        <el-table :data="tableData" size="mini" border style="width: 100%">
          <el-table-column label="尺寸表" align="center">
            <el-table-column prop="part" width="96px" align="center" label="部位"></el-table-column>
            <el-table-column prop="monad" width="96px" align="center" label="单位"></el-table-column>
            <el-table-column prop="size" width="106px" align="center" label="尺寸/CM"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="remark">
        <div>备注及工艺说明</div>
      </div>
    </div>
    <div class="right">
      <!-- <img class="img1" :src="designidea_pic_url0" alt />
      <img class="img2" :src="designidea_pic_url1" alt />-->
      <el-image :src="designidea_pic_url0" fit="cover" class="img1">
        <div slot="error" class="image-slot">
          <!-- <i class="el-icon-picture-outline"></i> -->
        </div>
      </el-image>
      <br>
      <el-image :src="designidea_pic_url1" fit="cover" class="img2">
        <div slot="error" class="image-slot">
          <!-- <i class="el-icon-picture-outline"></i> -->
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
import { getStyle } from "@/api/researchDevelopment";
export default {
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: () => ({}), // 属性的默认值
    },
  },
  data() {
    return {
      obj: {},
      designidea_pic_data_length: "",
      designidea_pic_url0: "",
      designidea_pic_url1: "",
      tableData: [
        { part: "", monad: "洗水前", size: "成品" },
        { part: "前衣长", monad: "", size: "" },
        { part: "后中长", monad: "", size: "" },
        { part: "肩宽", monad: "", size: "" },
        { part: "单肩", monad: "", size: "" },
        { part: "胸围", monad: "", size: "" },
        { part: "腰围", monad: "", size: "" },
        { part: "臀围", monad: "", size: "" },
        { part: "摆围", monad: "", size: "" },
        { part: "袖长", monad: "", size: "" },
        { part: "袖肥", monad: "", size: "" },
        { part: "袖口", monad: "", size: "" },
        { part: "前胸宽", monad: "", size: "" },
        { part: "后背宽", monad: "", size: "" },
        { part: "前领围", monad: "", size: "" },
        { part: "后领围", monad: "", size: "" },
        { part: "搭位", monad: "", size: "" },
        { part: "袋", monad: "", size: "" },
        { part: "裤裙长", monad: "", size: "" },
        { part: "腰围", monad: "", size: "" },
        { part: "臀围", monad: "", size: "" },
        { part: "肶围", monad: "", size: "" },
        { part: "膝围", monad: "", size: "" },
        { part: "脚围", monad: "", size: "" },
        { part: "前浪", monad: "", size: "" },
        { part: "后浪", monad: "", size: "" },
        { part: "腰高", monad: "", size: "" },
        { part: "拉链长", monad: "", size: "" },
        { part: "前袋", monad: "", size: "" },
        { part: "后袋", monad: "", size: "" },
      ],
    };
  },
  methods: {
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      console.log(res);
      this.obj = res.data.data;
      if (res.data.data.designidea_pic_data.length > 0) {
        this.designidea_pic_url0 =
          res.data.data.designidea_pic_data[0].designidea_pic_url;
      }
      if (res.data.data.designidea_pic_data.length > 1) {
        this.designidea_pic_url1 =
          res.data.data.designidea_pic_data[1].designidea_pic_url;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.print {
  display: flex;
  width: 842px;
  height: 595px;
  color: #000;
  margin: 0 10px;
  .left {
    width: 340px;
    margin-left: 10px;
    margin-right: 30px;
    .company {
      font-size: 26px;
    }
    .lining {
      width: 300px;
      height: 300px;
      border: 1px solid #000;
      margin: 15px 0;

      div {
        // background-color: #000;
        border-bottom: 1px solid #000;
        color: #000;
        font-size: 16px;
        padding: 5px 10px;
        text-align: center;
      }
    }
    /deep/.el-table::before {
      border: 1px solid #000;
    }
    /deep/.el-table--mini {
      th {
        padding: 0px !important;
      }
      td {
        padding: 0px !important;
      }
    }
    /deep/.el-table {
      color: #000;
      th {
        border: 1px solid #000;
        padding: 0px !important;
      }
      td {
        border: 1px solid #000;
        padding: 0px !important;
      }
    }
    /deep/.el-table--border::after {
      border: 1px solid #000;
    }
    /deep/.el-table--border {
      border: 1px solid #000;

      // td {
      //   border-color: #000;
      // }
    }
    /deep/.is-center {
      background: #fff;
    }
    .liningke {
      width: 300px;
      height: 200px;
      margin: 15px 0;
      // .liningkes {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   background-color: #000;
      //   color: #fff;
      //   font-size: 16px;
      //   padding: 0 10px;
      // }
      // .liningkess {
      //   width: 100px;
      //   height: 20px;
      //   border: 1px solid #000;
      // }
    }
    .remark {
      width: 200px;
      height: 200px;
      border: 1px solid #000;
      margin-bottom: 10px;
      div {
        background-color: #000;
        color: #fff;
        font-size: 16px;
        padding: 0 10px;
      }
    }
  }
  .right {
    // margin-top: 100px;
    .img1 {
      max-width: 440px;
      max-height: 600px;
      margin-bottom: 5px;
    }
    .img2 {
      // width: 500px;
      // height: 500px;
      max-width: 440px;
      max-height: 600px;
    }
  }
}
</style>