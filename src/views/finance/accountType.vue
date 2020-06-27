<template>
  <div class="accountType">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>财务</el-breadcrumb-item>
      <el-breadcrumb-item>账目类型</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="dialog">
      <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus" >新增项目类型</el-button>

      <el-dialog
        title="账目类型信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <div class="char">
          <label for>类型名称：</label>
          <el-input placeholder="类型名称" v-model="obj.n1" clearable></el-input>
        </div>

        

        <div class="radio">
          <label for>状态：</label>
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">停用</el-radio>
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

    <div class="table" style="width: 100%">
       <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
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
          label="类型名称"
         >
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="备注"
          >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="排序"
          >
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
.accountType{
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
    
    .radio{
      margin-top: 15px;
      /deep/label{
        margin-right: 52px;
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