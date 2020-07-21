<template>
  <div class="homepage">
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="./../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="left">
        <div class="left_list">
          <ul>
            <li
              v-for="(item,index) in feature"
              :key="index"
              @mouseenter="vb = true"
              @mouseleave="vb = false"
              @click.stop="skip(item)"
            >
              <span class="del" @click.stop="delshor(item,index)" v-if="vb">x</span>
              {{item.title}}
            </li>
            <li @click.stop="addshort">
              <span class="el-icon-plus"></span>
              <span>增加快捷功能</span>
            </li>
          </ul>
        </div>
        <div id="myChart" :style="{width: '100%', height: '450px',border:'1px solid #ccc'}"></div>
      </div>
      <div class="right">
        <div class="nav1">
          <div class="head">
            <span class="el-icon-chat-line-round"></span> 公司公告
          </div>
          <div class="nav_list">
            <ul>
              <li>暂无信息</li>
              <li>暂无信息</li>
            </ul>
          </div>
        </div>
        <div class="nav2">
          <div class="head">
            <span class="el-icon-warning-outline"></span> 提醒信息
          </div>
          <div class="nav_list">
            <ul>
              <li>暂无信息</li>
              <li>暂无信息</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择快捷功能" :visible.sync="dialogVisible" center width="30%">
      <el-form style="width:250px;margin:0 auto;">
        <el-form-item label="快捷功能:">
          <el-select v-model="cut" placeholder="请选择快捷功能" style="width:145px">
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addshortcutKey">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  shortcutKeyList,
  shortcutKeyUserAdd,
  shortcutKeyUserDel,
  shortcutKeyUserList
} from "@/api/home.js";
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      vb: false,
      cut: "",
      feature: []
    };
  },
  mounted() {
    this.drawLine();
    this.init();
  },
  methods: {
    //  删除快捷功能
    delshor(item, index) {
      this.$confirm("删除快捷功能, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await shortcutKeyUserDel({
            id: item.id
          });
          console.log(res);
          this.feature.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 确认增加选择的快捷功能
    async addshortcutKey() {
      // console.log(this.cut);
      let str = "";
      this.list.map((v, i) => {
        if (this.cut == v.title) {
          str = v.url;
        }
      });
      this.dialogVisible = false;
      let res = await shortcutKeyUserAdd({
        user_id: localStorage.getItem("user_id"),
        title: this.cut,
        url: str
      });
      //   console.log(res);
      this.init();
    },
    // 增加快捷功能
    async addshort() {
      this.dialogVisible = true;
      this.cut = "";
      let res = await shortcutKeyList();
      let { data } = res.data;
      this.list = data;
      if (this.feature.length > 0) {
        this.feature.map((v, i) => {
          this.list.map((j, k) => {
            if (v.url === j.url) {
              this.list.splice(j, 1);
            }
          });
        });
      }
      console.log(res);
    },
    //  echarts表
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "月工作状况" },
        color: ["#3fb1e3"],
        tooltip: {},
        xAxis: {
          name: "日期",
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31"
          ]
        },
        yAxis: {
          name: "款式数量",
          type: "value"
        },
        series: [
          {
            name: "款式数量",
            data: [
              120,
              200,
              150,
              80,
              70,
              110,
              130,
              200,
              150,
              80,
              70,
              110,
              130,
              200,
              150,
              80,
              70,
              110,
              130,
              200,
              150,
              80,
              70,
              110,
              130,
              200,
              150,
              80,
              70,
              110,
              130
            ],
            type: "bar"
          }
        ]
      });
    },
    skip(item) {
      this.$router.push({
        path: `/${item.url}`
      });
    },
    async init() {
      // 快捷方式list
      let res = await shortcutKeyUserList();
      let { data } = res.data;
      this.feature = data;
    }
  }
};
</script>
<style lang="less" scoped>
.homepage {
  .main {
    overflow: hidden;
    margin-top: 10px;

    .left {
      float: left;
      width: 75%;
      padding: 1%;
      .left_list {
        ul {
          overflow: hidden;
          li {
            float: left;
            list-style: none;
            display: block;
            width: 130px;
            margin: 0 2.5%;
            height: 130px;
            line-height: 130px;
            text-align: center;
            border-radius: 12px;
            background: #666666;
            margin-bottom: 25px;
            color: #fff;
            cursor: pointer;
            position: relative;
            .del {
              width: 20px;
              height: 20px;
              line-height: 20px;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          li:last-of-type {
            cursor: pointer;
            line-height: 40px;
            span {
              width: 100%;
              display: block;
              font-size: 14px;
            }
            span:first-of-type {
              padding-top: 35px;
              font-size: 25px !important;
            }
          }
        }
      }
    }
    .right {
      float: left;
      width: 25%;
      .nav1 {
        width: 100%;
        padding: 0 5%;
        height: 300px;
        border: 1px solid #cccccc;
        margin-bottom: 10px;
        .head {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 15px;
          font-weight: 600;
          border-bottom: 1px solid #cccccc;
        }
        .nav_list {
          ul {
            li {
              list-style: none;
              padding: 5px 0;
            }
          }
        }
      }
      .nav2 {
        width: 100%;
        padding: 0 5%;
        height: 450px;
        border: 1px solid #cccccc;
        .head {
          width: 100%;
          height: 30px;
          font-size: 15px;
          font-weight: 600;
          line-height: 30px;
          border-bottom: 1px solid #cccccc;
        }
        .nav_list {
          ul {
            li {
              list-style: none;
              padding: 5px 0;
            }
          }
        }
      }
    }
  }
}
</style>