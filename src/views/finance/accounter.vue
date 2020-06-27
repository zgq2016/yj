<template>
  <div class="accounter">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>结算帐户</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="dialog">
      <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus" >新增账户</el-button>

      <el-dialog
        title="账目类型信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <div class="char">
          <label for>类型名称：</label>
          <el-input placeholder="类型名称" v-model="obj.n1" clearable></el-input>
        </div>

        <div class="account">
          <label for>账号：</label>
          <el-input placeholder="账号" v-model="obj.n2" clearable></el-input>
        </div>

        <div class="holder">
          <label for>开户人：</label>
          <el-input placeholder="开户人" v-model="obj.n3" clearable></el-input>
        </div>

        <div class="radio">
          <label for>状态：</label>
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">停用</el-radio>
        </div>

        <div class="category">
          <label for>所属门店：</label>
          <el-select v-model="category" placeholder="- 全部 -">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </div>

        <div class="category">
          <label for>账户类型：</label>
          <el-select v-model="category" placeholder="- 全部 -">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.style_type"
              :value="item.style_type"
            ></el-option>
          </el-select>
        </div>

        <div class="remark">
          <label>备注：</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>

        <div class="number">
          <label>排序：</label>
          <el-input-number size="mini" v-model="num1"></el-input-number>
        </div>
        

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <el-divider></el-divider>

    <div class="table">
       <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed="left"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="账户名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="开户人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="帐户类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="当前余额"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="所属门店"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="备注"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="排序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="状态"
          width="120">
        </el-table-column>
        
      </el-table>
    </div>

  </div>
</template>
 
<script>
export default {
  data(){
    return{ 
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
      dialogVisible:false,
      obj:{
        n1:'1',
        n2:'1',
        n3:'1',
      },
      radio:'1',
      categorys:{style_type:'aaaa'},
      category:'aaa',
      textarea:'',
      num1:'1',

    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick(row) {
        console.log(row);
    },
    
  }
}
</script>

<style lang="less" scoped>
.accounter{
  .dialog{
    margin-top: 15px;
    /deep/.el-dialog__header{
      text-align: center;
    }
    /deep/.el-dialog__body{
      text-align: center;
      /deep/label{
        display: inline-block;
        width: 70px;
        text-align: right;
      }
    }
    /deep/.el-dialog__footer{
      text-align: center;
    }
    .char{
      margin-top: 15px;
      /deep/.el-input{
        width: 300px;
      }
    }
    .account{
      margin-top: 15px;
      /deep/.el-input{
        width: 300px;
      }
    }
    .holder{
      margin-top: 15px;
      /deep/.el-input{
        width: 300px;
      }
    }
    .radio{
      margin-top: 15px;
      /deep/label{
        margin-right: 52px;
      }
    }
    .category{
      margin-top: 15px;
      /deep/.el-input{
        width: 300px;
      }
    }
    .remark{
      margin-top: 15px;
      /deep/.el-textarea{
        width: 300px;
      }
      /deep/label{
        margin-bottom: 5px;
      }
    }
    .number{
      margin-top: 15px;
      margin-left:85px ;
      text-align: left;
      /deep/label{
        margin-bottom: 5px;
      }
    }
  }
}
</style>