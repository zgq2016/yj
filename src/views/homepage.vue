<template>
  <div class="homepage" v-if="permission.indexOf('homepage') != -1">
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <el-row :gutter="20">
          <el-col
            :span="8"
            v-if="permission.indexOf('mouth_work_status') != -1"
          >
            <div class="grid-content bg-purples">
              <span class="fonts">【当月工作状况】</span>
              <div id="myChart"></div>
            </div>
          </el-col>
          <el-col
            :span="8"
            v-if="permission.indexOf('notice_index_list') != -1"
          >
            <div class="grid-content bg-purple">
              <span
                class="fonts"
                @click.stop="$router.push({ path: `/announcements` })"
                >【公司公告】</span
              >
              <ul v-if="nav_list.length > 0">
                <li
                  @click.stop="lookTitle(item1)"
                  v-for="(item1, index) in nav_list"
                  :key="index"
                >
                  <span>{{ item1.title }}</span>
                </li>
              </ul>
              <h4 v-else>暂无公告信息</h4>
            </div>
          </el-col>
          <el-col :span="8" v-if="permission.indexOf('warn_list') != -1">
            <div class="grid-content bg-purple">
              <span class="fonts">【提醒信息】</span>
              <ul v-if="list2.length > 0">
                <li
                  @click.stop="lookTitle1(item1)"
                  v-for="(item1, index) in list2"
                  :key="index"
                >
                  <span>{{ item1.title }}</span>
                </li>
              </ul>
              <h4 v-else>暂无提醒信息</h4>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="content_1" v-if="permission.indexOf('Z2000') != -1">
        <div class="hed">
          <p>设计项目</p>
          <span @click.stop="$router.push({ path: `/itemDesign` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_1.length > 0">
            <li
              @click.stop="rout1(item.id)"
              v-for="(item, index) in works_1"
              :key="index"
            >
              <div v-if="item.picurl != ''">
                <el-image
                  class="images"
                  :src="item.picurl"
                  fit="cover"
                ></el-image>
              </div>
              <div>
                <div v-if="item.picurl == ''">
                  <el-image
                    class="images"
                    v-if="item.projecttype == '【意向订单】'"
                    :src="img1"
                    alt
                  />
                  <el-image
                    class="images"
                    v-if="item.projecttype == '【阶段工作】'"
                    :src="img2"
                    alt
                  />
                  <el-image
                    class="images"
                    v-if="item.projecttype == '【企划系列】'"
                    :src="img3"
                    alt
                  />
                </div>
              </div>
              <div style="margin-top: 10px">
                <p style="color: #000">{{ item.projectname }}</p>
                <span style="display: flex">
                  <p style="color: #999999">{{ item.user_name }}</p>
                  <p>{{ item.projecttype }}</p>
                </span>
              </div>
            </li>
          </ul>
          <h4 v-else>暂无项目信息</h4>
        </div>
      </div>
      <div class="content_2" v-if="permission.indexOf('Z3000') != -1">
        <div class="hed">
          <p>设计款式</p>
          <span @click.stop="$router.push({ path: `/designStyle` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_2.length > 0">
            <li
              @click.stop="rout2(item.id, 1)"
              v-for="(item, index) in works_2"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>

              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.username }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无款式信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z4000') != -1">
        <div class="hed">
          <p>版料采购</p>
          <span @click.stop="$router.push({ path: `/materialPurchase` })"
            >更多</span
          >
        </div>
        <div class="tet">
          <ul v-if="works_3.length > 0">
            <li
              @click.stop="rout2(item.id, 2)"
              v-for="(item, index) in works_3"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.username }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无版料采购信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z5000') != -1">
        <div class="hed">
          <p>纸样</p>
          <span @click.stop="$router.push({ path: `/pattern` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_3_1.length > 0">
            <li
              @click.stop="rout2(item.id, 3)"
              v-for="(item, index) in works_3_1"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.username }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无纸样信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z6000') != -1">
        <div class="hed">
          <p>制版</p>
          <span @click.stop="$router.push({ path: `/platemaking` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_3_2.length > 0">
            <li
              @click.stop="rout2(item.id, 4)"
              v-for="(item, index) in works_3_2"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.username }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无制版信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z7000') != -1">
        <div class="hed">
          <p>生产下单</p>
          <span @click.stop="$router.push({ path: `/productionOrders` })"
            >更多</span
          >
        </div>
        <div class="tet">
          <ul v-if="works_4.length > 0">
            <li
              @click.stop="rout2(item.id, 5)"
              v-for="(item, index) in works_4"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.user_name }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无生产下单信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z8000') != -1">
        <div class="hed">
          <p>生产采购</p>
          <span @click.stop="$router.push({ path: `/purchase` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_5.length > 0">
            <li
              @click.stop="rout2(item.id, 6)"
              v-for="(item, index) in works_5"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.user_name }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无生产采购信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z9000') != -1">
        <div class="hed">
          <p>生产排单</p>
          <span @click.stop="$router.push({ path: `/productionScheduling` })"
            >更多</span
          >
        </div>
        <div class="tet">
          <ul v-if="works_6.length > 0">
            <li
              @click.stop="rout2(item.id, 7)"
              v-for="(item, index) in works_6"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.user_name }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无生产排单信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z10000') != -1">
        <div class="hed">
          <p>裁剪</p>
          <span @click.stop="$router.push({ path: `/tailor` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_7.length > 0">
            <li
              @click.stop="rout2(item.id, 8)"
              v-for="(item, index) in works_7"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.user_name }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无裁剪信息</h4>
        </div>
      </div>
      <div class="content_3" v-if="permission.indexOf('Z11000') != -1">
        <div class="hed">
          <p>生产出货</p>
          <span @click.stop="$router.push({ path: `/shipment` })">更多</span>
        </div>
        <div class="tet">
          <ul v-if="works_8.length > 0">
            <li
              @click.stop="rout2(item.id, 9)"
              v-for="(item, index) in works_8"
              :key="index"
            >
              <el-image
                class="images"
                :src="item.style_pic_url ? item.style_pic_url : img"
                fit="cover"
              ></el-image>
              <span>
                <p>
                  <strong>{{ item.style_type }}</strong>
                </p>
                <p>{{ item.stylename }}</p>
                <!-- <p>{{ item.style_color }}</p> -->
                <p>{{ item.user_name }}</p>
              </span>
            </li>
          </ul>
          <h4 v-else>暂无生产出货信息</h4>
        </div>
      </div>
    </div>
    <!-- 公告信息 -->
    <el-dialog
      title="公告信息"
      :visible.sync="dialogVisible1"
      width="45%"
      center
    >
      <el-form :model="form" style="margin: 0 20px" label-width="60px">
        <el-form-item label="主题:">
          <span>{{ form.title }}</span>
        </el-form-item>
        <el-form-item label="时间:">
          <span>{{ form.ctime }}</span>
        </el-form-item>
        <el-form-item label="内容:">
          <span>{{ form.text }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 提醒信息 -->
    <el-dialog
      title="提醒信息"
      :visible.sync="dialogVisible2"
      width="45%"
      center
    >
      <el-form :model="form1" style="margin: 0 20px" label-width="60px">
        <el-form-item label="主题:">
          <span>{{ form1.title }}</span>
        </el-form-item>
        <el-form-item label="时间:">
          <span>{{ form1.ctime }}</span>
        </el-form-item>
        <el-form-item label="内容:">
          <span>{{ form1.text }}</span>
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
  getProduceProcureList, // 采购
  getProduceFactoryList, //生产排单列表
  getProduceCutList, // 生产裁剪
  getProduceCompleteList, // 出货
  getStylePurchase, // 版料采购
  getStylePattern, // 纸样
  getStyleSample, // 制版
} from "@/api/home.js";
import { produceAdd, getProduceList } from "@/api/production";
import { getDataList, getStyleAll } from "@/api/researchDevelopment";
import imgs from "@/assets/022.jpg";
import imgs1 from "@/assets/意向.jpg";
import imgs2 from "@/assets/阶段.jpg";
import imgs3 from "@/assets/系列.jpg";
import moment from "moment";
export default {
  data() {
    return {
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
      works_3_1: [],
      works_3_2: [],
      works_4: [],
      works_5: [],
      works_6: [],
      works_7: [],
      works_8: [],
      vs: false,
      img: "",
      img1: "",
      img2: "",
      img3: "",
      permission: [],
    };
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
        // console.log(this.getDaysInMonth(times[0], times[1]));
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
      // console.log(this.getDaysInMonth(year,month_i));
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
            this.yA.splice(k, 1, v.total);
          }
        });
      });
      this.yA.push(10);

      this.date1 = this.yearMonth;
      this.drawLine();
    },
    async init() {
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

      this.drawLine();
    },
    async work() {
      if (this.permission.indexOf("Z2000") != -1) {
        let res = await getDataList({
          page: 1,
          page_size: 4,
        });
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
      }
      // let res1 = await myAssistWork({
      //   limit: 20,
      // });
      // this.works_2 = res1.data.data;
      if (this.permission.indexOf("Z3000") != -1) {
        let res2 = await getStyleAll({
          page: 1,
          page_size: 8,
        });
        this.works_2 = res2.data.data;
      }
      if (this.permission.indexOf("Z7000") != -1) {
        let res3 = await getProduceList({
          page: 1,
          page_size: 8,
        });
        this.works_4 = res3.data.data;
      }
      if (this.permission.indexOf("Z8000") != -1) {
        let res4 = await getProduceProcureList({
          page: 1,
          page_size: 8,
        });
        this.works_5 = res4.data.data;
      }
      if (this.permission.indexOf("Z9000") != -1) {
        let res5 = await getProduceFactoryList({
          page: 1,
          page_size: 8,
        });
        this.works_6 = res5.data.data;
      }
      if (this.permission.indexOf("Z10000") != -1) {
        let res6 = await getProduceCutList({
          page: 1,
          page_size: 8,
        });
        this.works_7 = res6.data.data;
      }
      if (this.permission.indexOf("Z11000") != -1) {
        let res7 = await getProduceCompleteList({
          page: 1,
          page_size: 8,
        });
        this.works_8 = res7.data.data;
      }
      if (this.permission.indexOf("Z4000") != -1) {
        let res8 = await getStylePurchase({
          page: 1,
          page_size: 8,
        });
        this.works_3 = res8.data.data;
      }
      if (this.permission.indexOf("Z5000") != -1) {
        let res9 = await getStylePattern({
          page: 1,
          page_size: 8,
        });
        this.works_3_1 = res9.data.data;
      }
      if (this.permission.indexOf("Z6000") != -1) {
        let res10 = await getStyleSample({
          page: 1,
          page_size: 8,
        });
        this.works_3_2 = res10.data.data;
      }
      // console.log(res3);
    },
    rout1(id) {
      document.body.style = null;
      this.$router.push({ path: `/designCheck?id=${id}` });
    },
    rout2(id, index) {
      document.body.style = null;
      if (index == 1) {
        this.$router.push({ path: `/designNote?id=${id}` });
      } else if (index == 2) {
        this.$router.push({ path: `/materialPurchasing?id=${id}` });
      } else if (index == 3) {
        this.$router.push({ path: `/patternStatus?id=${id}` });
      } else if (index == 4) {
        this.$router.push({ path: `/sampleDress?id=${id}` });
      } else if (index == 5) {
        this.$router.push({ path: `/productionStyle?id=${id}&activeNames=1` });
      } else if (index == 6) {
        this.$router.push({ path: `/productionStyle?id=${id}&activeNames=2` });
      } else if (index == 7) {
        this.$router.push({ path: `/productionStyle?id=${id}&activeNames=3` });
      } else if (index == 8) {
        this.$router.push({ path: `/productionStyle?id=${id}&activeNames=4` });
      } else if (index == 9) {
        this.$router.push({ path: `/productionStyle?id=${id}&activeNames=5` });
      }
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
  mounted() {
    this.img = imgs;
    this.img1 = imgs1;
    this.img2 = imgs2;
    this.img3 = imgs3;
    console.log(this.img);
    this.permission = localStorage.getItem("permission").split(",");
    // console.log(this.permission);
    this.init();
    this.mouthWork();
    this.work();
  },
  // updated() {
  //   this.drawLine();
  // },
};
</script>
<style lang="less" scoped>
.homepage {
  .main {
    overflow: hidden;
    // margin-top: 10px;
    // max-width: 1600px;
    .el-row {
      min-width: 1000px;
      margin-bottom: 20px;
      height: 190px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    @media screen and (min-width: 1920px) {
      .header {
        width: 1415px;
      }
      .el-row {
        height: 235px;
      }
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 208px;
        }
        #myChart {
          height: 180px;
          width: 100%;
          position: absolute;
          top: 40px;
        }
      }
    }
    @media screen and (min-width: 1601px) and (max-width: 1920px) {
      .header {
        width: 1415px;
      }
      .el-row {
        height: 235px;
      }
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 208px;
        }
        #myChart {
          height: 180px;
          width: 100%;
          position: absolute;
          top: 40px;
        }
      }
    }
    @media screen and (min-width: 1211px) and (max-width: 1600px) {
      .header {
        width: 1210px !important;
      }
      .el-row {
        height: 120px;
      }
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 175px;
        }
        #myChart {
          position: absolute;
          top: 30px;
          height: 100%;
          width: 100%;
        }
      }
      .content_1 {
        margin-top: 75px;
      }
    }
    @media screen and (max-width: 1210px) {
      .header {
        width: 1210px !important;
      }
      .el-row {
        height: 120px;
      }
      .el-col {
        border-radius: 10px;
        .grid-content {
          height: 175px;
        }
        #myChart {
          position: absolute;
          top: 30px;
          height: 100%;
          width: 100%;
        }
      }
      .content_1 {
        margin-top: 75px;
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
      h4 {
        position: absolute;
        top: 40%;
        left: 40%;
        font-weight: 500;
        font-size: 12px;
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
    @media screen and (min-width: 1601px) {
      .content_1 {
        overflow: hidden;
        margin-bottom: 25px;
        width: 1440px;
        height: 297px;
        .tet {
          h4 {
            margin-top: 60px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
          }
          .images {
            width: 340px;
            height: 187px;
            border-radius: 10px;
          }
          .pp {
            color: #000;
          }
        }
        .hed {
          overflow: hidden;
          height: 60px;
          p {
            float: left;
            margin: 20px 0;
            color: #000000;
            font-size: 16px;
          }
          span {
            float: right;
            margin-right: 30px;
            cursor: pointer;
            line-height: 60px;
          }
        }
      }
      .content_2 {
        width: 1440px;
        height: 440px;
        overflow: hidden;
        .tet {
          h4 {
            margin-top: 80px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
          }
          .images {
            width: 160px;
            height: 300px;
            border-radius: 10px;
          }
        }
        .hed {
          overflow: hidden;
          height: 60px;
          p {
            float: left;
            font-weight: 600;
            margin: 20px 0;
            color: #000000;
            font-size: 16px;
          }
          span {
            float: right;
            margin-right: 30px;
            cursor: pointer;
            line-height: 60px;
          }
        }
        ul {
          li {
            float: left;
            margin-right: 18px;
            margin-bottom: 25px;
            span {
              display: block;
              margin-top: 5px;
              p {
                color: #000000;
              }
              p:last-of-type {
                color: #999999;
                padding-top: 3px;
              }
            }
          }
          li:hover {
            cursor: pointer;
            .el-image {
              animation: animations 0.1s linear forwards;
            }
          }
        }
      }
      .content_3 {
        width: 1440px;
        height: 440px;
        overflow: hidden;
        .tet {
          h4 {
            margin-top: 80px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
          }
          .images {
            width: 160px;
            height: 300px;
            border-radius: 10px;
          }
        }
        .hed {
          overflow: hidden;
          height: 60px;
          p {
            float: left;
            font-weight: 600;
            margin: 20px 0;
            color: #000000;
            font-size: 16px;
          }
          span {
            float: right;
            cursor: pointer;
            margin-right: 30px;
            line-height: 60px;
          }
        }
        ul {
          li {
            float: left;
            margin-right: 18px;
            margin-bottom: 25px;
            span {
              display: block;
              margin-top: 5px;
              p {
                color: #000000;
              }
              p:last-of-type {
                color: #999999;
                padding-top: 3px;
              }
            }
          }
          li:hover {
            cursor: pointer;
            .el-image {
              animation: animations 0.1s linear forwards;
            }
          }
        }
      }
    }
    @media screen and (min-width: 1211px) and (max-width: 1600px) {
      .content_1 {
        width: 1210px !important;
        height: 274px !important;
        .images {
          width: 289px !important;
          height: 163px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 289px !important;
          }
          li:nth-child(4) {
            margin-right: 0;
          }
        }
      }
      .content_2 {
        width: 1210px !important;
        height: 391px !important;
        .images {
          width: 135px !important;
          height: 252px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 135px !important;
          }
          li:nth-child(8) {
            margin-right: 0;
          }
        }
      }
      .content_3 {
        width: 1210px !important;
        height: 391px !important;
        .images {
          width: 129px !important;
          height: 252px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 135px !important;
          }
          li:nth-child(8) {
            margin-right: 0;
          }
        }
      }
    }
    @media screen and (max-width: 1210px) {
      .content_1 {
        width: 1210px !important;
        height: 274px !important;
        .images {
          width: 289px !important;
          height: 163px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 289px !important;
          }
          li:nth-child(4) {
            margin-right: 0;
          }
        }
      }
      .content_2 {
        width: 1210px !important;
        height: 391px !important;
        .images {
          width: 135px !important;
          height: 252px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 135px !important;
          }
          li:nth-child(8) {
            margin-right: 0;
          }
        }
      }
      .content_3 {
        width: 1210px !important;
        height: 391px !important;
        .images {
          width: 129px !important;
          height: 252px !important;
          border-radius: 10px;
        }
        .hed {
          width: 1210px;
          span {
            margin-right: 12px !important;
          }
        }
        ul {
          li {
            width: 135px !important;
          }
          li:nth-child(8) {
            margin-right: 0;
          }
        }
      }
    }

    .content_1 {
      overflow: hidden;
      margin-bottom: 25px;
      width: 1440px;
      height: 297px;
      .tet {
        h4 {
          margin-top: 60px;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
        }
        .images {
          width: 340px;
          height: 187px;
          border-radius: 10px;
        }
        .pp {
          color: #000;
        }
      }
      .hed {
        overflow: hidden;
        height: 60px;
        p {
          float: left;
          margin: 20px 0;
          color: #000000;
          font-size: 16px;
        }
        span {
          float: right;
          margin-right: 30px;
          cursor: pointer;
          line-height: 60px;
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
          .el-image {
            animation: animations 0.1s linear forwards;
          }
        }
        li {
          float: left;
          width: 340px;
          margin-right: 18px;
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
      width: 1440px;
      height: 440px;
      overflow: hidden;
      .tet {
        h4 {
          margin-top: 80px;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
        }
        .images {
          width: 160px;
          height: 300px;
          border-radius: 10px;
        }
      }
      .hed {
        overflow: hidden;
        height: 60px;
        p {
          float: left;
          font-weight: 600;
          margin: 20px 0;
          color: #000000;
          font-size: 16px;
        }
        span {
          float: right;
          margin-right: 30px;
          cursor: pointer;
          line-height: 60px;
        }
      }
      ul {
        li {
          float: left;
          margin-right: 18px;
          margin-bottom: 25px;
          span {
            display: block;
            margin-top: 5px;
            p {
              color: #000000;
            }
            p:last-of-type {
              color: #999999;
              padding-top: 3px;
            }
          }
        }
        li:hover {
          cursor: pointer;
          .el-image {
            animation: animations 0.1s linear forwards;
          }
        }
      }
    }
    .content_3 {
      width: 1440px;
      height: 440px;
      overflow: hidden;
      .tet {
        h4 {
          margin-top: 80px;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
        }
      }
      .hed {
        overflow: hidden;
        height: 60px;
        p {
          float: left;
          font-weight: 600;
          margin: 20px 0;
          color: #000000;
          font-size: 16px;
        }
        span {
          float: right;
          cursor: pointer;
          margin-right: 30px;
          line-height: 60px;
        }
      }
      ul {
        li {
          float: left;
          margin-right: 18px;
          margin-bottom: 25px;
          span {
            display: block;
            margin-top: 5px;
            p {
              color: #000000;
            }
            p:last-of-type {
              color: #999999;
              padding-top: 3px;
            }
          }
        }
        li:hover {
          cursor: pointer;
          .el-image {
            animation: animations 0.1s linear forwards;
          }
        }
      }
    }
  }
  .hed {
    span:hover {
      color: red;
    }
  }
}
</style>