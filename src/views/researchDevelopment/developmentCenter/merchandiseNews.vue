<template>
  <div class="merchandiseNews">
    <div v-if="active==false">
      <span style="width:300px;margin-right:20px">价格:{{style_price}}</span>
      <el-button type="primary" @click="handleSerchEdit">编辑</el-button>
    </div>
    <div v-if="active==true">
      <el-input v-model="style_price" placeholder="请输入内容" style="width:300px;margin-right:20px"></el-input>
      <el-button type="primary" @click="handleSerch">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getStyle, goodsStylePriceAdd } from "@/api/researchDevelopment";
export default {
  data() {
    return {
      style_price: "",
      active: false,
    };
  },
  methods: {
    handleSerchEdit() {
      this.active = true;
    },
    async handleSerch() {
      let res = await goodsStylePriceAdd({
        id: this.$route.query.id,
        style_price: this.style_price,
      });
      console.log(res);
      this.active = false;
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      console.log(res);
      this.style_price = res.data.data.style_price;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
.aa {
}
</style>