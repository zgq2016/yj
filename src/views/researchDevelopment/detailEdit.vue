<template>
  <div class="detailEdit">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/designCheck?id=${obj.id}` }">项目详细</el-breadcrumb-item>/
      <el-breadcrumb-item>编辑{{obj.projecttype}}订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- upload -->
      <el-upload
        class="avatar-uploader"
        action="https://yj.ppp-pay.top/uploadpic.php"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img :src="obj.picurl" class="avatar" />
      </el-upload>
      <!-- form -->
      <div class="form">
        <!-- ref="form" :model="form" -->
        <el-form :model="obj" ref="obj" :rules="rules" label-width="80px">
          <el-form-item label="项目名称" prop="projectname">
            <el-input v-model="obj.projectname"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="projecttype">
            <el-select v-model="obj.projecttype" @change="handleChange($event)">
              <el-option
                v-for="item in projecttypes"
                :key="item.id"
                :label="item.v"
                :value="item.v"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户" prop="customer_companyname" v-if="obj.projecttype==='意向'">
            <el-select
              v-model="obj.customer_companyname"
              placeholder="客户名称"
              @change="handleCustomer_id($event)"
            >
              <el-option
                v-for="item in wests"
                :key="item.id"
                :label="item.companyname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="obj.projecttype==='意向'">
            <el-select v-model="obj.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="obj.projecttype==='意向'">
            <el-select v-model="obj.season" placeholder="季节">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="obj.projecttype==='阶段'">
            <el-select v-model="obj.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="obj.projecttype==='阶段'">
            <el-select v-model="obj.season" placeholder="季节">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="元素" prop="element" v-if="obj.projecttype==='企划'">
            <el-input v-model="obj.element" placeholder="元素描述"></el-input>
          </el-form-item>
          <el-form-item label="色系" prop="color" v-if="obj.projecttype==='企划'">
            <el-input v-model="obj.color" placeholder="色系"></el-input>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="obj.projecttype==='企划'">
            <el-select v-model="obj.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="obj.projecttype==='企划'">
            <el-select v-model="obj.season">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间" prop="finishtime">
            <el-date-picker v-model="obj.finishtime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="要求数量" prop="quantity">
            <el-input v-model="obj.quantity" @input="handleInput" placeholder="要求数量"></el-input>
          </el-form-item>
          <el-form-item label="详细要求" prop="detailed">
            <el-input type="textarea" v-model="obj.detailed" class="textarea"></el-input>
          </el-form-item>
          <el-form-item label="指派" prop="user_name">
            <el-select v-model="obj.user_name" placeholder="工作人员名称" @change="handleUser_id($event)">
              <el-option
                v-for="item in stylists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleKeep" style="padding:10px 50px;border-radius: 15px;">保存</el-button>
            <el-button @click="handleDel" style="padding:10px 50px;border-radius: 15px;">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getWestList,
  getYearList,
  getSeasonList,
  getStylistList,
  getAddProject,
  projectEdit,
  getProject,
  projectDel
} from "@/api/researchDevelopment.js";
export default {
  data() {
    return {
      obj: {},
      projecttypes: [
        {
          v: "意向",
          id: "0"
        },
        {
          v: "阶段",
          id: "1"
        },
        {
          v: "企划",
          id: "2"
        }
      ],
      wests: [],
      years: [],
      seasons: [],
      stylists: [],
      west: "",
      year: "",
      season: "",
      // 表单规则
      rules: {
        projectname: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projecttype: [
          { required: true, message: "请输入项目类型", trigger: "blur" }
        ],
        customer_companyname: [
          { required: true, message: "请输入客户", trigger: "blur" }
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        season: [{ required: true, message: "请输入季节", trigger: "blur" }],
        element: [{ required: true, message: "请输入元素", trigger: "blur" }],
        color: [{ required: true, message: "请输入颜色", trigger: "blur" }],
        finishtime: [
          { required: true, message: "请输入完成时间", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "请输入要求数量", trigger: "blur" }
        ],
        detailed: [
          { required: true, message: "请输入详细要求", trigger: "blur" }
        ],
        user_name: [
          { required: true, message: "请输入设计师", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleDel() {
      let { id } = this.$route.query;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await projectDel({ id });
          this.$router.push({ name: "Index" });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleInput() {
      this.form.quantity = this.form.quantity.replace(/[^0-9-]+/, "");
    },
    async handleKeep() {
      this.$refs["obj"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        if (this.obj.projecttype == "意向") this.obj.projecttype = "0";
        if (this.obj.projecttype == "阶段") this.obj.projecttype = "1";
        if (this.obj.projecttype == "企划") this.obj.projecttype = "2";
        console.log(this.obj);

        let res = await projectEdit(this.obj);
        console.log(res);
        let { id } = this.$route.query;
        this.$router.push({ path: `/designCheck?id=${id}` });
      });
    },
    handleChange(e) {
      this.obj.projecttype = e;
      console.log(this.obj.projecttype);
    },
    handleAvatarSuccess(res, file) {
      this.obj.picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleUser_id(e) {
      this.obj.user_id = e;
    },
    handleCustomer_id(e) {
      this.obj.customer_id = e;
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      // console.log(data);
      this.wests = data;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      // console.log(data);
      this.years = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      // console.log(data);
      this.seasons = data;
    },
    async getstylist() {
      let res = await getStylistList();
      let { data } = res.data;
      console.log(data);
      this.stylists = data;
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getProject({ id });
    console.log(res);
    this.obj = res.data.data;
    if (res.data.data.projecttype === "0") res.data.data.projecttype = "意向";
    if (res.data.data.projecttype === "1") res.data.data.projecttype = "阶段";
    if (res.data.data.projecttype === "2") res.data.data.projecttype = "企划";

    this.getWest();
    this.getYear();
    this.getSeason();
    this.getstylist();
  }
};
</script>

<style lang="less" scoped>
.detailEdit {
  .main {
    display: flex;
    padding: 40px 40px 40px 30px;
    .avatar-uploader {
      padding-right: 50px;
    }
  }
  /deep/.el-input__inner {
    width: 300px !important;
  }
  /deep/textarea {
    width: 500px;
    height: 150px;
    resize: none !important;
  }
}
</style>