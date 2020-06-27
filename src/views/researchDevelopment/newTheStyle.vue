<template>
  <div class="newTheStyle">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item>款式设计</el-breadcrumb-item>
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
            <img v-if="form.style_pic_url" :src="form.style_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="styleNumberContent">
          <div class="form">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="款号">
                <div>{{form.styleno}}</div>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="form.stylename"></el-input>
              </el-form-item>
              <el-form-item label="品类">
                <el-select v-model="form.style_type" placeholder="品类">
                  <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.style_type"
                    :value="item.style_type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年份">
                <el-select v-model="form.year" placeholder="年份">
                  <el-option
                    v-for="item in years"
                    :key="item.id"
                    :label="item.year"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="季节">
                <el-select v-model="form.season">
                  <el-option
                    v-for="item in seasons"
                    :key="item.id"
                    :label="item.season"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设计师">
                <el-select v-model="user_name" placeholder="工作人员名称" @change="handleUser_id($event)">
                  <el-option
                    v-for="item in stylists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
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
            <img v-if="form.style_color_pic_url" :src="form.style_color_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="form" style="margin:20px 30px">
          <label for style="padding:10px 13px 0">颜色</label>
          <el-select v-model="form.style_color">
            <el-option
              v-for="item in colors"
              :key="item.id"
              :label="item.color_name"
              :value="item.color_name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-button round style="margin:30px 300px" @click="handleClick">保存</el-button>
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
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="款号">
                <div>{{styleno}}</div>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="obj.stylename"></el-input>
              </el-form-item>
              <el-form-item label="品类">
                <el-select v-model="obj.style_type" placeholder="品类">
                  <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.style_type"
                    :value="item.style_type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年份">
                <el-select v-model="obj.year" placeholder="年份">
                  <el-option
                    v-for="item in years"
                    :key="item.id"
                    :label="item.year"
                    :value="item.year"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="季节">
                <el-select v-model="obj.season">
                  <el-option
                    v-for="item in seasons"
                    :key="item.id"
                    :label="item.season"
                    :value="item.season"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设计师">
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
        <div class="form" style="margin:20px 30px">
          <label for style="padding:10px 13px 0">颜色</label>
          <el-select v-model="style_color">
            <el-option
              v-for="item in colors"
              :key="item.id"
              :label="item.color_name"
              :value="item.color_name"
            ></el-option>
          </el-select>
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
        style_color_pic_url: ""
      },
      styleno: "",
      style_color_pic_url: "",
      style_color: "",
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      colors: [],
      user_name: "",
      user_id: "",
      obj: {}
    };
  },
  methods: {
    async handleClick() {
      let { id } = this.$route.query;
      this.form["project_id"] = id;
      this.form["user_id"] = this.user_id;
      let res = await projectStyleAdd(this.form);
      this.$router.go(-1);
    },
    async handleClick1() {
      let { id } = this.$route.query;
      let obj = {};
      obj["project_id"] = id;
      obj["user_id"] = this.obj.user_id;
      obj["style_pic_url"] = this.obj.style_pic_url;
      obj["stylename"] = this.obj.stylename;
      obj["styleno"] = this.styleno;
      obj["season"] = this.obj.season;
      obj["year"] = this.obj.year;
      obj["style_type"] = this.obj.style_type;
      obj["style_color_pic_url"] = this.style_color_pic_url;
      obj["style_color"] = this.style_color;
      let res = await projectStyleAdd(obj);
      // console.log(res);
      this.$router.go(-1);
    },
    handleStyleNumberSuccess(res, file) {
      if (this.$route.query.oldId) {
        this.style_pic_url = res.data.pic_file_url;
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
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
      let res = await getStyle({ id:oldId });
      // console.log(res)
      let res1 = await getProject({id });
      this.obj = res.data.data;
      this.form.year = res1.data.data.finishtime.slice(0,4);
      this.form.season = res1.data.data.season;
      this.user_name = res1.data.data.user_name;
      this.user_id = res1.data.data.user_id;
      // console.log(res1.data.data);
     
    },
    async getStylenoData() {
      let res = await getStyleno();
      this.form.styleno = res.data.data.styleno;
      this.styleno = res.data.data.styleno;
    },
     
  },
  async mounted() {
    this.getStylenoData();
    this.getYear();
    this.getSeason();
    this.getCategory();
    this.getstylist();
    this.getColor();
    this.init();
  },
 
};
</script>

<style lang="less" scoped>
.newTheStyle {
  .main {
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
      margin-top: 30px;
      display: flex;
    }
  }
}
</style>



