<template>
  <div class="summaryParagraph">
    <div class="headers clearfix">
      <div class="client fl">
        <label for>客户：</label>
        <el-select v-model="stylist" placeholder="- 请选择 -" @change="handleUser_id($event)">
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      
      <div class="classification fl">
        <label for>客户分类：</label>
        <el-select v-model="stylist" placeholder="- 请选择 -" >
          <el-option v-for="item in stylists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="arear fl">
        <label for>欠款金额：</label>
        <el-input-number v-model="num1" controls-position="right" @change="handleChange" ></el-input-number>
        <label for>至</label>
        <el-input-number v-model="num2" controls-position="right" @change="handleChange" ></el-input-number>
      </div>

      <div class="chenckb fl">
        <el-checkbox v-model="checked">不显示无欠款客户</el-checkbox>
      </div>

      <div class="btn fl" @click="handlesearch">
        <el-button type="primary">查询</el-button>
      </div>

      <div class="btn1 fl">
        <el-button type="primary" icon="el-icon-message">收起统计数据</el-button>
      </div>

      <div class="btn1 fl">
        <el-button type="primary" icon="el-icon-upload2">导出</el-button>
      </div>

    </div>
     <el-divider></el-divider>
    <div class="main_top">
      <span>客户数：<em>{{n1}}</em></span>
      <span>欠款客户数：<em>{{n2}}</em></span>
      <span>欠款金额：<em>{{n1+n2}}</em></span>
      <span>充值客户数：<em>{{n3}}</em></span>
      <span>充值金额：<em>{{n1+n2}}</em></span>
    </div>
    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column fixed prop="data" label="序号" ></el-table-column>
        <el-table-column fixed prop="data" label="客户名称"></el-table-column>
        <el-table-column fixed prop="data" label="客户分类" ></el-table-column>
        <el-table-column fixed prop="data" label="联系人" ></el-table-column>
        <el-table-column fixed prop="data" label="手机" ></el-table-column>
        <el-table-column fixed prop="data" label="欠款" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getStylistList,
} from "@/api/researchDevelopment";
export default {
  data(){
    return {
      num1: 0,
      num2: 2,
      stylist:'',
      stylists:[],
      name:'',
      checked:false,
      n1:465,
      n2:65455,
      n3:445,
      tableData:[
        {data:1},
        {data:2},
        {data:13},
        {data:14},
        {data:15},
        {data:15333333333333},
      ]
    
    }
  },
  methods:{
    handleUser_id(e) {
      this.user_id = e;
    },
    handleChange(v){
      console.log(v);
    },
    handlesearch(){
      var obj = {};
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      console.log(data);
      this.stylists = data;
    },
  },
  mounted(){
    this.getStylist()
  }
}
</script>

<style lang="less" scoped>
.summaryParagraph{
    label {
      width: 40px;
      margin-right: 10px;
    }
   .headers {
    padding: 0px 10px 10px 5px;
    .client {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }
    .classification {
      margin-top: 10px;
      /deep/.el-input__inner {
        width: 120px !important;
      }
    }
    .arear{
      margin-top: 10px;
      label{
        margin-left: 10px;
      }
    }
    .chenckb{
      margin-top: 20px;

    }
    .btn{
      float: right;
      margin-top: 10px;
    }
    
  }
  .btn1{
    margin-top: 15px;
  }

  .main_top{
    margin-top: 15px;
    span{
      padding: 5px;
      float: left;
      width: 20%;
      text-align: center;
      border: 1px solid #cccccc;
      em{
        margin-left: 5px;
        font-size: 16px;
        color: crimson;
      }
    }
  }

  .table{
    margin-top: 80px;
    /deep/.cell{
      text-align: center;
    }
  }
}
  
  
</style>