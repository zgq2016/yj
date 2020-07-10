        <el-button size="mini">确认入库</el-button>
<template>
  <div class="stockInquiry">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>仓库</el-breadcrumb-item>
      <el-breadcrumb-item>产品入库</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 左边 -->
      <div class="left">
        <div class="left_nav">
          <ul>
            <li>默认</li>
            <li>已入库</li>
            <li>草稿</li>
            <li>已撤销</li>
          </ul>
        </div>
        <div class="left_submit">
          <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="日期:">
              <el-date-picker
                v-model="ruleForm.value1"
                size="mini"
                type="daterange"
                range-separator="一"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="厂商:">
              <el-select size="mini" v-model="ruleForm.region" placeholder="请选择厂商">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单号:">
              <el-input size="mini" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item class="sub">
              <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="mini" type="primary">批量打印</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="left_table">
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            size="mini"
            border
            @cell-click="cellClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="25"></el-table-column>
            <el-table-column align="center" prop="name" label="状态" width="60"></el-table-column>
            <el-table-column align="center" label="日期" width="96">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              width="81"
              label="供应商名称"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
      <!-- 右边边 -->
      <div class="right">
        <div class="right_header">
          <div class="rh_left">
            <h4>入库单--{{'zaan'}}</h4>
          </div>
          <div class="rh_right">
            <el-button size="mini" type="primary">扫码</el-button>
            <el-button size="mini" type="primary">导入</el-button>
            <el-button size="mini" type="primary">新增入库单</el-button>
          </div>
        </div>
        <hr style="border:1px dashed #ccc;margin:0 10px" />
        <div class="right_main">
          <div class="right_form">
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item style="overflow: hidden;width:100%;">
                <div style="float:left;padding:10px 0 0 15px;">
                  尚欠供应商款:
                  <em style="color:red;">&yen;{{'00.00'}}</em>
                </div>
                <div class="cssa" style="float:right;padding:10px 15px 0 0;width:210px;">
                  <el-steps :space="110" align-center :active="1" finish-status="wait">
                    <el-step icon="el-icon-success" title="草稿"></el-step>
                    <el-step icon="el-icon-success" title="已入库"></el-step>
                  </el-steps>
                </div>
              </el-form-item>

              <el-form-item
                prop="manufacturer"
                style="display:inline-block;width:30%;margin-left:3%;"
                label="厂商:"
              >
                <el-select size="mini" v-model="form.manufacturer" placeholder="请选择厂商">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="ware"
                style="display:inline-block;width:30%;margin-left:2%;"
                label="仓库:"
              >
                <el-select size="mini" v-model="form.ware" placeholder="请选择仓库">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="display:inline-block;width:30%;margin-left:1%;" label="结算账户:">
                <el-select size="mini" v-model="form.user" placeholder="请选择结账账户">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="display:inline-block;width:26%;margin-left:3%;" label="实付金额:">
                <el-input size="mini" style="width: 60%;" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item
                style="display:inline-block;width:30%;margin-left:2%;"
                label="日期:"
                prop="date1"
              >
                <el-date-picker
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 75%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                style="display:inline-block;width:35%;margin-left:1%;"
                label="备注:"
                prop="desc"
              >
                <el-input size="mini" style="width:75%;" type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="right_table"></div>
        </div>
        <div class="right_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      rules: {
        manufacturer: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        ware: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      stylist: "", //设计师
      year: "", //年
      season: "", //季节
      category: "", //类别

      pageIndex: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {}, //查询表单
      form: {
        manufacturer: "",
        ware: "",
        date1: ""
      }, //选择表单
      tableData: [
        {
          date: "2016-05-03 18:01",
          name: "已入库",
          address: "上海市普11111"
        },
        {
          date: "2016-05-02 18:01",
          name: "已入库",
          address: "上海市普2"
        },
        {
          date: "2016-05-04 18:01",
          name: "已入库",
          address: "上海市普3"
        },
        {
          date: "2016-05-01 18:01",
          name: "草稿",
          address: "上海市普4"
        },
        {
          date: "2016-05-08 18:01",
          name: "草稿",
          address: "上海市普5"
        },
        {
          date: "2016-05-06 18:01",
          name: "已撤销",
          address: "上海市普6"
        },
        {
          date: "2016-05-07 18:01",
          name: "已撤销",
          address: "上海市普7"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleUser_id() {},
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      this.seasons = data;
    },
    async getStylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      this.categorys = data;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //单元格被点击
    cellClick(row, column, cell, event) {
      console.log(row, column, cell, event);
    }
  },
  mounted() {
    this.getYear();
    this.getSeason();
    this.getStylist();
    this.getCategory();
  }
};
</script>

<style lang="less" scoped>
.stockInquiry {
  list-style: none;
  .main {
    background: rgb(248, 245, 245);
    overflow: hidden;
    .left {
      overflow: hidden;
      margin: 10px 1% 10px 1%;
      float: left;
      background: #fff;
      width: 22%;
      .left_nav {
        border-bottom: 1px solid #cccccc;
        margin-bottom: 10px;
        ul {
          overflow: hidden;
          li {
            // width: 25%;
            list-style: none;
            float: left;
            text-align: center;
            padding: 6px;
            cursor: pointer;
          }
        }
      }
      .left_submit {
        margin-bottom: 10px;
        .el-form {
          position: relative;
          padding: 3px 10px;
          .sub {
            text-align: center;
          }
          .el-form-item {
            margin-bottom: 5px;
            .el-form-item__content {
              .el-input {
                width: 178px;
              }
              .el-date-editor--daterange {
                width: 178px;
                position: absolute;
                top: 5px;
              }
            }
          }
        }
      }
      .left_table {
        cursor: pointer;
      }
    }
    .right {
      margin: 10px 1% 10px 0;
      background: #fff;
      width: 75%;
      float: right;
      .right_header {
        overflow: hidden;

        .rh_left {
          float: left;
          padding: 10px 0 0 10px;
          font-size: 14px;
          line-height: 48px;
        }
        .rh_right {
          padding: 10px 10px 0 0;
          float: right;
          line-height: 48px;
        }
      }
      .right_main {
        .right_form {
          /deep/.cssa {
            .el-steps {
              position: relative;
              // margin-bottom: 40px;
              /deep/.el-step__icon {
                width: 12px;
              }
              /deep/.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
                font-size: 12px;
                font-weight: 400;
                position: relative;
              }
              /deep/.el-step__title {
                font-size: 12px;
                line-height: 14px;
              }
              /deep/.el-step__icon {
                width: 12px;
              }
              /deep/.el-step__head {
                // top: 30px;
                // color: #000;
                // border-color: #000;
              }

              /deep/.el-step__line {
                // width: auto;
                // margin-right: 20px;
                margin-top: 9px;
              }

              /deep/.el-step {
                // width: 100px;
                // display: inline-block;
              }
              /deep/.el-step__main {
                position: relative;
                bottom: 10px;
                .el-step__description {
                  padding-top: 20%;
                }
              }
            }
          }
        }
      }
    }
  }

  .pagination {
    margin: 10px 0;
    text-align: center;
    padding: 2px 0px;
  }
}
</style>