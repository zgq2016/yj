<template>
  <div class="newTheStyle">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/itemDesign' }">项目设计</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/designCheck?id=${this.$route.query.id}` }">项目详细</el-breadcrumb-item>
      <el-breadcrumb-item>新增款式</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 没有数据 -->
    <div class="main" v-if="!this.$route.query.oldId">
      <div class="basicInfo">基本信息</div>
      <div class="styleNumber">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleStyleNumberSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- :before-upload="beforeUpload" -->
            <img v-if="form.style_pic_url" :src="form.style_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="styleNumberContent">
          <div class="form">
            <el-form :model="form" ref="form" :rules="rules" label-width="80px">
              <el-form-item>
                <div style="display:flex">
                  <div style="width:200px">款号: {{form.styleno}}</div>
                  <div style="width:200px">年份: {{defaultData.year}}</div>
                  <div style="width:200px">季节: {{defaultData.season}}</div>
                  <div style="width:200px">设计师: {{defaultData.user_name}}</div>
                </div>
              </el-form-item>
              <el-form-item label="名称" prop="stylename">
                <el-input v-model="form.stylename" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="品类" prop="style_type">
                <div style="display:flex">
                  <el-select v-model="form.style_type" placeholder="品类">
                    <el-option
                      v-for="item in categorys"
                      :key="item.id"
                      :label="item.style_type"
                      :value="item.style_type"
                    ></el-option>
                  </el-select>
                  <router-link
                    :to="`/goodsCategory?TL=1&id=${ this.$route.query.id}`"
                    style="margin-left:30px"
                  >新增品类</router-link>
                </div>
              </el-form-item>
              <el-form-item label="颜色" prop="style_color">
                <div style="display:flex">
                  <el-select v-model="form.style_color">
                    <el-option
                      v-for="item in colors"
                      :key="item.id"
                      :label="item.color_name"
                      :value="item.color_name"
                    ></el-option>
                  </el-select>
                  <router-link
                    :to="`/colorManagement?TL=1&id=${ this.$route.query.id}`"
                    style="margin-left:30px"
                  >新增颜色</router-link>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="color">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleColorSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.style_color_pic_url" :src="form.style_color_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="form"></div>
      </div>
      <div style="margin:150px 300px; height:50px;">
        <el-button round style="float:left" @click="handleClick">保存</el-button>
        <el-button round style="float:left" @click="handleClickEdit">保存并编辑设计版单</el-button>
      </div>
    </div>
    <!-- 有数据 -->
    <div class="main" v-if="this.$route.query.oldId">
      <div class="basicInfo">基本信息</div>
      <div class="styleNumber">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleStyleNumberSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="obj.style_pic_url" :src="obj.style_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="styleNumberContent">
          <div class="form">
            <el-form ref="obj" :model="obj" :rules="rules1" label-width="80px">
              <el-form-item label="款号">
                <div>{{styleno}}</div>
              </el-form-item>
              <el-form-item label="名称" prop="stylename">
                <el-input v-model="obj.stylename"></el-input>
              </el-form-item>
              <el-form-item label="品类" prop="style_type">
                <el-select v-model="obj.style_type" placeholder="品类">
                  <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.style_type"
                    :value="item.style_type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年份" prop="year">
                <el-select v-model="obj.year" placeholder="年份">
                  <el-option
                    v-for="item in years"
                    :key="item.id"
                    :label="item.year"
                    :value="item.year"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="季节" prop="season">
                <el-select v-model="obj.season">
                  <el-option
                    v-for="item in seasons"
                    :key="item.id"
                    :label="item.season"
                    :value="item.season"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设计师" prop="user_name">
                <el-select
                  v-model="obj.user_name"
                  placeholder="工作人员名称"
                  @change="handleUser_id($event)"
                >
                  <el-option
                    v-for="item in stylists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颜色" prop="style_color_name">
                <el-select v-model="obj.style_color_name">
                  <el-option
                    v-for="item in colors"
                    :key="item.id"
                    :label="item.color_name"
                    :value="item.color_name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="color">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handleColorSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="style_color_pic_url" :src="style_color_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <el-button round style="margin:30px 300px" @click="handleClick1">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  getStyleno,
  getYearList,
  getSeasonList,
  getStylistList,
  getCategoryList,
  getColorSelect,
  getStyle,
  projectStyleAdd,
  getProject
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      form: {
        style_pic_url: "",
        stylename: "",
        styleno: "",
        season: "",
        year: "",
        style_type: "",
        style_color: "",
        style_color_pic_url: "",
        user_name: ""
      },
      styleno: "",
      style_color_pic_url: "",
      style_color: "",
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      colors: [],
      user_id: "",
      obj: {},
      defaultData: {},
      // 表单规则
      rules: {
        stylename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        style_type: [
          { required: true, message: "请输入品类", trigger: "blur" }
        ],
        style_color: [
          { required: true, message: "请输入颜色", trigger: "blur" }
        ]
      },
      rules1: {
        stylename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        style_type: [
          { required: true, message: "请输入品类", trigger: "blur" }
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        season: [{ required: true, message: "请输入季节", trigger: "blur" }],
        user_name: [
          { required: true, message: "请输入设计师", trigger: "blur" }
        ],
        style_color_name: [
          { required: true, message: "请输入颜色", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleClickEdit() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        console.log(this.form);
        console.log(this.defaultData);
        let obj = {};
        obj["style_type"] = this.form.style_type;
        obj["stylename"] = this.form.stylename;
        obj["styleno"] = this.form.styleno;
        obj["style_color"] = this.form.style_color;
        obj["style_color_pic_url"] = this.form.style_color_pic_url;
        obj["style_pic_url"] = this.form.style_pic_url;
        obj["year"] = this.defaultData.year;
        obj["season"] = this.defaultData.season;
        obj["user_id"] = this.defaultData.user_id;
        obj["project_id"] = this.defaultData.id;
        let res = await projectStyleAdd(obj);
        console.log(res);
        this.$router.push({
          path: `/designNote?id=${res.data.data[0].id}&designRemark=${0}`
        });
      });
    },
    async handleClick() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        console.log(this.form);
        console.log(this.defaultData);
        let obj = {};
        obj["style_type"] = this.form.style_type;
        obj["stylename"] = this.form.stylename;
        obj["styleno"] = this.form.styleno;
        obj["style_color"] = this.form.style_color;
        obj["style_color_pic_url"] = this.form.style_color_pic_url;
        obj["style_pic_url"] = this.form.style_pic_url;
        obj["year"] = this.defaultData.year;
        obj["season"] = this.defaultData.season;
        obj["user_id"] = this.defaultData.user_id;
        obj["project_id"] = this.defaultData.id;
        let res = await projectStyleAdd(obj);
        console.log(res);
        this.$router.go(-1);
      });
    },
    async handleClick1() {
      this.$refs["obj"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        delete this.obj.user_name;
        let { id } = this.$route.query;
        let obj = {};
        console.log(obj.user_id);
        obj["project_id"] = id;
        obj["user_id"] = this.user_id || this.obj.user_id;
        obj["style_pic_url"] = this.obj.style_pic_url;
        obj["stylename"] = this.obj.stylename;
        obj["styleno"] = this.styleno;
        obj["season"] = this.obj.season;
        obj["year"] = this.obj.year;
        obj["style_type"] = this.obj.style_type;
        obj["style_color_pic_url"] = this.style_color_pic_url;
        obj["style_color"] = this.obj.style_color_name;
        let res = await projectStyleAdd(obj);
        console.log(res);
        this.$router.go(-1);
      });
    },
    handleStyleNumberSuccess(res, file) {
      if (this.$route.query.oldId) {
        this.obj.style_pic_url = res.data.pic_file_url;
      }
      if (!this.$route.query.oldId) {
        this.form.style_pic_url = res.data.pic_file_url;
      }
    },
    handleColorSuccess(res, file) {
      // console.log(this.$route.query.oldId)
      if (this.$route.query.oldId) {
        this.style_color_pic_url = res.data.pic_file_url;
      }
      if (!this.$route.query.oldId) {
        this.form.style_color_pic_url = res.data.pic_file_url;
      }
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    handleUser_id(e) {
      this.user_id = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
      // console.log(this.years)
    },
    async getColor() {
      let res = await getColorSelect();
      // console.log(res);
      let { data } = res.data;
      this.colors = data;
    },
    async getSeason() {
      let res = await getSeasonList();
      let { data } = res.data;
      this.seasons = data;
    },
    async getstylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    },
    async getCategory() {
      let res = await getCategoryList();
      let { data } = res.data;
      this.categorys = data;
    },
    async init() {
      let { id } = this.$route.query;
      let { oldId } = this.$route.query;

      if (oldId === undefined) {
        let res = await getProject({ id });
        console.log(res);
        this.defaultData = res.data.data;
      }
      if (oldId !== undefined) {
        let res1 = await getStyle({ id: oldId });
        console.log(res1);
        console.log(res1.data.data);
        this.obj = res1.data.data;
        // this.form.year = res1.data.data.year;
        // this.form.season = res1.data.data.season;
        // this.user_name = res1.data.data.user_name;
        // this.user_id = res1.data.data.user_id;
        // console.log(res1.data.data);
      }
    },
    async getStylenoData() {
      let res = await getStyleno();
      this.form.styleno = res.data.data.styleno;
      this.styleno = res.data.data.styleno;
    }
  },
  async mounted() {
    this.getStylenoData();
    this.getYear();
    this.getSeason();
    this.getCategory();
    this.getstylist();
    this.getColor();
    this.init();
  }
};
</script>

<style lang="less" scoped>
.newTheStyle {
  .main {
    min-height: 800px;
    position: relative;
    .basicInfo {
      font-size: 20px;
      padding: 30px 10px;
    }
    .styleNumber {
      display: flex;
      span {
        padding: 10px 40px;
      }
      .styleNumberContent {
        .form {
          margin: 30px 0;
        }
      }
    }
    .color {
      position: absolute;
      left: 0px;
      top: 350px;
      display: flex;
    }
  }
}
</style>



