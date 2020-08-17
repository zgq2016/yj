<template>
  <div class="homepage">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purples">
              <span class="fonts">【当月工作状况】</span>
              <div id="myChart"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="fonts" @click.stop="$router.push({path: `/announcements`})">【公司公告】</span>
              <ul>
                <li @click.stop="lookTitle(item1)" v-for="(item1,index) in nav_list" :key="index">
                  <span>{{item1.title}}</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="fonts">【提醒信息】</span>
              <ul>
                <li @click.stop="lookTitle1(item1)" v-for="(item1,index) in list2" :key="index">
                  <span>{{item1.title}}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="content_1">
        <div class="hed">
          <p>设计项目</p>
          <span @click.stop="$router.push({path: `/itemDesign`})">更多</span>
        </div>
        <div>
          <ul>
            <li @click.stop="rout1(item.id)" v-for="(item,index) in works_1" :key="index">
              <div v-if="item.picurl!=''">
                <el-image
                  style="width: 290px; height: 160px;border-radius: 10px;"
                  :src="item.picurl"
                  fit="cover"
                ></el-image>
              </div>
              <div>
                <div v-if="item.picurl==''">
                  <img
                    style="width: 290px; height: 160px;border-radius: 10px;"
                    v-if="item.projecttype=='【意向订单】'"
                    src="./../assets/意向.jpg"
                    alt
                  />
                  <img
                    style="width: 290px; height: 160px;border-radius: 10px;"
                    v-if="item.projecttype=='【阶段工作】'"
                    src="./../assets/阶段.jpg"
                    alt
                  />
                  <img
                    style="width: 290px; height: 160px;border-radius: 10px;"
                    v-if="item.projecttype=='【企划系列】'"
                    src="./../assets/系列.jpg"
                    alt
                  />
                </div>
              </div>
              <span>
                <p>{{item.projecttype}}</p>
                <p>{{item.projectname}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_2">
        <p>项目款式</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_2" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>版料采购</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_3" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>纸样</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_3" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>制版</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_3" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>生产下单</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_4" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>生产采购</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_4" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>生产排单</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_4" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>裁剪</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_4" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_3">
        <p>生产出货</p>
        <div>
          <ul>
            <li @click.stop="rout2(item.id)" v-for="(item,index) in works_4" :key="index">
              <el-image
                style="width: 150px; height: 230px;border-radius: 10px;"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <span>
                <p>{{item.style_type}}</p>
                <p>{{item.stylename}}</p>
                <p>{{item.style_color}}</p>
                <p>{{item.name}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 公告信息 -->
    <el-dialog title="公告信息" :visible.sync="dialogVisible1" width="45%" center>
      <el-form :model="form" style="margin:0 20px" label-width="60px">
        <el-form-item label="主题:">
          <span>{{form.title}}</span>
        </el-form-item>
        <el-form-item label="时间:">
          <span>{{form.ctime}}</span>
        </el-form-item>
        <el-form-item label="内容:">
          <span>{{form.text}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 提醒信息 -->
    <el-dialog title="提醒信息" :visible.sync="dialogVisible2" width="45%" center>
      <el-form :model="form1" style="margin:0 20px" label-width="60px">
        <el-form-item label="主题:">
          <span>{{form1.title}}</span>
        </el-form-item>
        <el-form-item label="时间:">
          <span>{{form1.ctime}}</span>
        </el-form-item>
        <el-form-item label="内容:">
          <span>{{form1.text}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  shortcutKeyList,
  shortcutKeyUserAdd,
  shortcutKeyUserDel,
  shortcutKeyUserList,
  noticeIndexList,
  warnList,
  mouthWorkStatus,
  myWork,
  myAssistWork,
} from "@/api/home.js";
import { produceAdd, getProduceList } from "@/api/production";
import { getDataList, getStyleList } from "@/api/researchDevelopment";
import moment from "moment";
export default {
  data() {
    return {
      power: "",
      list: [],
      list2: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      vb: false,
      cut: "",
      feature: [],
      date1: "",
      xA: [],
      yA: [],
      nav_list: [],
      nav_list1: [],
      form: {},
      form1: {},
      yearMonth: "",
      works_1: [],
      works_2: [],
      works_3: [],
      works_4: [],
    };
  },
  mounted() {
    this.power = localStorage.getItem("power");
    this.drawLine();
    this.init();
    this.mouthWork();
    this.work();
  },
  methods: {
    // 查看公告
    lookTitle(item) {
      this.dialogVisible1 = true;
      this.form = item;
    },
    // 删除快捷功能
    delShor(item, index) {
      this.$confirm("删除快捷功能, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await shortcutKeyUserDel({
            id: item.id,
          });
          console.log(res);
          this.feature.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 确认增加选择的快捷功能
    async addshortcutKey() {
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
        url: str,
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
            if (v.url == j.url) {
              this.list.splice(k, 1);
            }
          });
        });
      }
      console.log(this.list);
    },
    // echarts表
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      window.onresize = myChart.resize;

      // 绘制图表
      myChart.setOption({
        tooltip: {},
        color: "red",
        xAxis: {
          // name: "日期",
          type: "category",
          data: this.xA,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          // show: false,
          axisTick: {
            //y轴刻度线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
        },
        yAxis: {
          // name: "款式数量",
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          // show: false,
          axisTick: {
            //y轴刻度线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
        },
        series: [
          {
            name: "款式数量",
            data: this.yA,
            type: "bar",
          },
        ],
      });
    },
    // 选择月份
    async changedDate(item) {
      if (item != null) {
        this.date1 = moment(item).format("YYYY-MM");
        // console.log(this.date1);
        let times = this.date1.split("-");
        this.xA = [];
        this.yA = [];
        this.xA = this.getDaysInMonth(times[0], times[1]);
        let res = await mouthWorkStatus({
          user_id: localStorage.getItem("user_id"),
          date: this.date1,
        });
        let { data } = res.data;
        this.xA.forEach((element) => {
          this.yA.push(0);
        });
        this.xA.map((j, k) => {
          data.map((v, i) => {
            if (v.day == j) {
              this.yA.splice(i, 1, v.total);
            }
          });
        });
        this.drawLine();
      } else {
        this.mouthWork();
      }
    },
    // 快捷跳转
    skip(item) {
      this.$router.push({
        path: `/${item.url}`,
      });
    },
    // 提醒信息
    lookTitle1(item) {
      // console.log(item);
      this.dialogVisible2 = true;
      this.form1 = item;
    },
    //
    // 获取当前年月
    async mouthWork() {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth();
      let mh = month + 1;
      if (mh.toString().length == 1) {
        mh = "0" + mh;
      }
      this.yearMonth = year + "-" + mh;
      this.xA = [];
      this.yA = [];
      // console.log(this.yearMonth.split('-'));
      // 计算某月的具体日期
      let month_i = parseInt(mh, 10);
      this.xA = this.getDaysInMonth(year, month_i);
      let res = await mouthWorkStatus({
        user_id: localStorage.getItem("user_id"),
        date: this.yearMonth,
      });
      let { data } = res.data;
      this.xA.forEach((element) => {
        this.yA.push(0);
      });
      this.xA.map((j, k) => {
        data.map((v, i) => {
          if (v.day == j) {
            this.yA.splice(i, 1, v.total);
          }
        });
      });
      this.yA.push(10);
      this.date1 = this.yearMonth;
      this.drawLine();
      // console.log(res);
    },
    async init() {
      // 快捷方式list
      let res = await shortcutKeyUserList();
      let { data } = res.data;
      this.feature = data;
      // 公司公告
      let res1 = await noticeIndexList({
        page_size: 10,
        page: 1,
      });
      let data1 = res1.data.data;
      this.nav_list = data1;
      this.nav_list = this.nav_list.slice(0, 3);

      // 提醒信息
      let res2 = await warnList({
        page_size: 10,
        page: 1,
      });
      let data2 = res2.data.data;
      this.list2 = data2;
      this.list2 = this.list2.slice(0, 3);
    },
    async work() {
      let res = await getDataList({
        page: 1,
        page_size: 5,
      });

      console.log(res);
      this.works_1 = res.data.data;
      this.works_1.map((v, i) => {
        if (v.projecttype == 0) {
          v.projecttype = "【意向订单】";
        } else if (v.projecttype == 1) {
          v.projecttype = "【阶段工作】";
        } else if (v.projecttype == 2) {
          v.projecttype = "【企划系列】";
        }
      });
      // let res1 = await myAssistWork({
      //   limit: 20,
      // });
      // this.works_2 = res1.data.data;

      let res2 = await getStyleList({
        page: 1,
        page_size: 10,
      });
      let res3 = await getProduceList({
        page: 1,
        page_size: 10,
      });
      this.works_2 = res2.data.data;
      this.works_3 = res2.data.data;
      this.works_4 = res3.data.data;
      console.log(this.works_3);
    },
    rout1(id) {
      this.$router.push({ path: `/designCheck?id=${id}` });
      document.body.style = null;
    },
    rout2(id) {
      document.body.style = null;
      this.$router.push({ path: `/development?id=${id}` });
    },
    //根据某年某月计算出具体日期
    getDaysInMonth(year, month) {
      const daysOfMonth = [];
      month = parseInt(month, 10);
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      for (let i = 1; i <= lastDayOfMonth; i++) {
        if (i < 10) {
          daysOfMonth.push("0" + i); //判断是部否小于10，如果小于加0，，例如“01”
        } else {
          daysOfMonth.push(i + "");
        }
      }
      return daysOfMonth;
    },
  },
};
</script>
<style lang="less" scoped>
.homepage {
  .main {
    overflow: hidden;
    margin-top: 10px;
    max-width: 1600px;
    .el-row {
      min-width: 1000px;
      margin-bottom: 20px;
      height: 160px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    @media screen and (max-width: 1500px) {
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 144px;
        }
        #myChart {
          height: 180px;
          width: 100%;
          position: absolute;
          top: -10px;
        }
      }
    }
    @media screen and (min-width: 1490px) {
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 208px;
        }
        #myChart {
          position: absolute;
          top: 30px;
          height: 100%;
          width: 100%;
        }
      }
      .content_1 {
        margin-top: 85px;
      }
    }

    // .bg-purple-dark {
    //   background: #99a9bf;
    // }

    .bg-purple {
      position: relative;
      background: #dde1e6;
      .fonts {
        color: #000000;
        position: absolute;
        top: 7px;
        left: 7px;
        font-size: 50%;
        cursor: pointer;
      }
      .fonts:hover {
        color: red;
      }
      ul {
        position: absolute;
        top: 30%;
        left: 10px;
        li {
          display: block;
          margin-bottom: 15px;
          cursor: pointer;
          span {
            padding: 5px 15px;
            border-radius: 10px;
            font-size: 10px;
            background: #f2f2f2;
            margin-bottom: 10px;
            min-width: 130px;
          }
        }
      }
    }
    .bg-purples {
      position: relative;
      background: #000000;
      .fonts {
        cursor: pointer;
        color: #f9fafc;
        position: absolute;
        top: 7px;
        left: 7px;
        font-size: 10px;
      }
    }
    // .bg-purple-light {
    //   background: #e5e9f2;
    // }

    .grid-content {
      border-radius: 10px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    @media screen and (max-width: 1510px) {
      .content_1 {
        width: 1440px;
        .hed {
          width: 1220px;
        }
        ul {
          li:nth-child(4) {
            margin-right: 0;
          }
        }
      }
      .content_2 {
        width: 1400px;
        height: 690px;
        overflow: hidden;
      }
      .content_3 {
        width: 1400px;
        height: 690px;
        overflow: hidden;
      }
    }
    .content_1 {
      margin-bottom: 25px;
      width: 100%;
      height: 260px;
      overflow: hidden;
      .hed {
        overflow: hidden;
        p {
          float: left;
          font-weight: 500;
          margin: 10px 0;
          color: #000000;
          font-size: 18px;
        }
        span {
          float: right;
          cursor: pointer;
        }
      }
      @keyframes animations {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-5px);
        }
        100% {
          transform: translateY(-10px);
        }
      }
      ul {
        li:hover {
          cursor: pointer;
          animation: animations 0.1s linear forwards;
        }
        li {
          float: left;
          width: 290px;
          margin-right: 25px;
          margin-bottom: 25px;
          // .el-image:hover {
          //   animation: anima 0.5s linear forwards;
          // }
          span {
            display: block;
            margin-top: 5px;
            p {
              padding: 1px;
              color: #000000;
            }
            p:last-of-type {
              color: #999999;
            }
          }
        }
        li:last-of-type {
          display: block;
          margin-right: 0;
        }
      }
    }
    .content_2 {
      height: 345px;
      overflow: hidden;
      & > p {
        font-weight: 500;
        font-size: 18px;
        margin: 10px 0;
        color: #000000;
      }
      ul {
        li {
          float: left;
          margin-right: 26px;
          margin-bottom: 25px;
        }
        li:hover {
          cursor: pointer;
          animation: animations 0.1s linear forwards;
        }
      }
    }
    .content_3 {
      height: 345px;
      overflow: hidden;
      & > p {
        font-weight: 500;
        font-size: 18px;
        margin: 10px 0;
        color: #000000;
      }
      ul {
        li {
          float: left;
          margin-right: 26px;
          margin-bottom: 25px;
        }
        li:hover {
          cursor: pointer;
          animation: animations 0.1s linear forwards;
        }
      }
    }
  }
}
</style>