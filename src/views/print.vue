<template>
  <div class="print">
    <div class="left">
      <div class="company">SHESHO 设计版单</div>
      <div>款号：{{obj.styleno}}</div>
      <div>品类：{{obj.style_type}}</div>
      <div>年份：{{obj.year}}</div>
      <div>季节：{{obj.season}}</div>
      <div>设计师：{{obj.user_name}}</div>
      <div>颜色：{{obj.style_color}}</div>
      <div class="lining">
        <div>面料样板</div>
      </div>
      <div class="liningke">
        <div class="liningkes">
          <div>部位</div>
          <div>尺寸</div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
        <div style="display:flex">
          <div class="liningkess"></div>
          <div class="liningkess"></div>
        </div>
      </div>
      <div class="remark">
        <div>备注及工艺说明</div>
      </div>
    </div>
    <div class="right">
      <img class="img1" :src="designidea_pic_url0" alt />
      <img class="img2" :src="designidea_pic_url1" alt />
    </div>
  </div>
</template>

<script>
import { getStyle } from "@/api/researchDevelopment";
export default {
  data() {
    return {
      obj: {},
      designidea_pic_data_length: "",
      designidea_pic_url0: "",
      designidea_pic_url1: "",
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
    width: 300px;
    .company {
      font-size: 26px;
    }
    .lining {
      width: 200px;
      height: 400px;
      border: 1px solid #000;
      margin: 10px 0;

      div {
        background-color: #000;
        color: #fff;
        font-size: 16px;
        padding: 0 10px;
      }
    }
    .liningke {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
      .liningkes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #000;
        color: #fff;
        font-size: 16px;
        padding: 0 10px;
      }
      .liningkess {
        width: 100px;
        height: 20px;
        border: 1px solid #000;
      }
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
    margin-top: 100px;
    .img1 {
      width: 400px;
      height: 500px;
      margin-bottom: 5px;
    }
    .img2 {
      width: 400px;
      height: 500px;
    }
  }
}
</style>