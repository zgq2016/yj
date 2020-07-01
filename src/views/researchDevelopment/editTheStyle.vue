<template>
  <div class="editTheStyle">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item>款式设计</el-breadcrumb-item>
      <el-breadcrumb-item>编辑款式</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="basicInfo">基本信息</div>
      <!-- <div class="styleNumber">
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
                <div>{{obj.styleno}}</div>
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
            <img v-if="obj.style_color_pic_url" :src="obj.style_color_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="form" style="margin:20px 30px">
          <label for style="padding:10px 13px 0">颜色</label>
          <el-select v-model="obj.style_color">
            <el-option
              v-for="item in colors"
              :key="item.id"
              :label="item.color_name"
              :value="item.color_name"
            ></el-option>
          </el-select>
        </div>
      </div>-->
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
            <el-form ref="obj" :model="obj" :rules="rules" label-width="80px">
              <el-form-item label="款号">
                <div>{{obj.styleno}}</div>
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
              <el-form-item label="颜色" prop="style_color">
                <el-select v-model="obj.style_color">
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
            <img v-if="obj.style_color_pic_url" :src="obj.style_color_pic_url" class="avatar" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="display:flex">
        <el-button round style="margin:30px  100px 30px 250px" @click="handleEdit">编辑</el-button>
        <el-button round @click="handleDel">删除</el-button>
      </div>
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
  projectStyleAdd,
  getStyle,
  styleEdit,
  styleDel
} from "@/api/researchDevelopment.js";
export default {
  data() {
    return {
      form: {
        style_pic_url: "",
        style_color_pic_url: "",
        stylename: "",
        styleno: "",
        season: "",
        year: "",
        style_type: "",
        style_color: ""
      },
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      colors: [],
      user_name: "",
      user_id: "",
      obj: {},
      rules: {
        stylename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        style_type: [
          { required: true, message: "请输入品类", trigger: "blur" }
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        season: [{ required: true, message: "请输入季节", trigger: "blur" }],
        user_name: [
          { required: true, message: "请输入设计师", trigger: "blur" }
        ],
        style_color: [
          { required: true, message: "请输入颜色", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleEdit() {
      this.$refs["obj"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        let obj = {};
        obj["id"] = this.$route.query.id;
        obj["style_pic_url"] = this.obj.style_pic_url;
        obj["style_color_pic_url"] = this.obj.style_color_pic_url;
        obj["stylename"] = this.obj.stylename;
        obj["styleno"] = this.obj.styleno;
        obj["season"] = this.obj.season;
        obj["year"] = this.obj.year;
        obj["style_type"] = this.obj.style_type;
        obj["style_color"] = this.obj.style_color;
        obj["user_name"] = this.obj.user_name;
        obj["user_id"] = this.obj.user_id;
        let res = await styleEdit(obj);
        console.log(res);
        this.$router.go(-1);
      });
    },
    async handleDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await styleDel({ id: this.obj.id });
          this.$router.push({ path: `/designCheck?id=${this.obj.project_id}` });
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
    handleStyleNumberSuccess(res, file) {
      this.obj.style_pic_url = res.data.pic_file_url;
    },
    handleColorSuccess(res, file) {
      this.obj.style_color_pic_url = res.data.pic_file_url;
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
      this.obj.user_id = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
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
    async getStyleno() {
      let res = await getStyleno();
      this.form.styleno = res.data.data.styleno;
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getStyle({ id });
    // console.log(res);
    this.obj = res.data.data;
    this.getYear();
    this.getColor();
    this.getSeason();
    this.getstylist();
    this.getCategory();
    this.getStyleno();
  }
};
</script>

<style lang="less" scoped>
.editTheStyle {
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



