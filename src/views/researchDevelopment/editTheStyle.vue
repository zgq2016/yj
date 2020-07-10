<template>
  <div class="editTheStyle">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item v-if="navc.TL-0===30" :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="navc.TL-0===30"
        :to="{ path: `/designCheck?id=${navc.project_id}` }"
      >项目详细</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="navc.TL-0===30"
        :to="{ path: `/development?id=${navc.id}&project_id=${navc.project_id}&TL=30` }"
      >款式详细</el-breadcrumb-item>
      <el-breadcrumb-item>编辑款式</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="basicInfo">基本信息</div>
      <div class="styleNumber">
        <div class="upload" @click="handle_obj_style_pic_url">
          <img v-if="obj.style_pic_url" :src="obj.style_pic_url" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div class="styleNumberContent">
          <div class="form">
            <el-form ref="obj" :model="obj" :rules="rules" label-width="80px">
              <el-form-item label="款号">
                <div>{{obj.styleno}}</div>
              </el-form-item>
              <el-form-item label="名称" prop="stylename">
                <el-input v-model="obj.stylename" style="width:200px"></el-input>
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
                <el-button
                  type="primary"
                  style="margin-left:20px;"
                  round
                  @click="handleAssistant"
                >助理</el-button>
              </el-form-item>
              <el-form-item label="指派助理" v-if="Assistant===true||user_id_data_length>0">
                <div style="display:flex">
                  <div v-for="(item, index) in obj.user_id_data" :key="index">{{item.name}},</div>
                  <div @click="handleAddAssistant" style="margin-left:20px">添加助理</div>
                </div>
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
        <div class="upload" @click="handle_obj_style_color_pic_url">
          <img v-if="obj.style_color_pic_url" :src="obj.style_color_pic_url" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <div class="display:flex">
        <el-button round style="margin:30px  100px 30px 250px" @click="handleEdit">编辑</el-button>
        <el-button round @click="handleDel">删除</el-button>
      </div>
    </div>
    <el-dialog
      title="上传图片"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="display:flex;">
        <div class="info-item">
          <div class="upload">
            <input
              type="file"
              id="uploads"
              :value="imgFile"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadImg($event, 1)"
            />
            选择文件
          </div>
          <div class="line">
            <div class="cropper-content">
              <div class="cropper">
                <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :info="true"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :fixedBox="option.fixedBox"
                  @realTime="realTime"
                  @imgLoad="imgLoad"
                ></vueCropper>
              </div>
              <div class="show-preview">
                <div class="preview">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
            </div>
          </div>
          <input
            style="width:30px;font-size:20px;margin:0 10px;"
            type="button"
            class="oper"
            value="+"
            title="放大"
            @click="changeScale(1)"
          />
          <input
            style="width:30px;font-size:20px;margin:0 10px;"
            type="button"
            class="oper"
            value="-"
            title="缩小"
            @click="changeScale(-1)"
          />
          <input
            style="width:30px;font-size:20px;margin:0 10px;"
            type="button"
            class="oper"
            value="↺"
            title="左旋转"
            @click="rotateLeft"
          />
          <input
            style="width:30px;font-size:20px;margin:0 10px;"
            type="button"
            class="oper"
            value="↻"
            title="右旋转"
            @click="rotateRight"
          />
          <input
            style="width:30px;font-size:20px;margin:0 10px;"
            type="button"
            class="oper"
            value="↓"
            title="下载"
            @click="down('blob')"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="finish('blob')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择助理"
      :visible.sync="centerDialogVisible1"
      width="20%"
      center
      class="dialog1"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-for="(item, index) in stylists" :key="index">
        <el-checkbox v-model="item.checked" @change="isCheckList(item,index)">{{item.name}}</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AssistantCancel">取 消</el-button>
        <el-button type="primary" @click="AssistantFinish">确 定</el-button>
      </span>
    </el-dialog>
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

import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      headImg: "",
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      centerDialogVisible: false,
      centerDialogVisible1: false,
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
      },
      Assistant: false,
      checkedList: [],
      arr: [],
      user_id_data_length: "",
      navc: {}
    };
  },
  methods: {
    AssistantFinish() {
      this.obj.user_id_data = [];
      this.stylists.map((v, i) => {
        if (v.checked == true) {
          this.obj.user_id_data.push(v);
        }
      });
      this.centerDialogVisible1 = false;
    },
    AssistantCancel() {},
    isCheckList(e, i) {
      this.arr = [];
      if (e.checked == false) {
        this.stylists.map((v, i) => {
          if (v.id == e.id) {
            v.checked = false;
          }
        });
      }
      if (e.checked == true) {
        this.stylists.map((v, i) => {
          if (v.id == e.id) {
            v.checked = true;
          }
        });
      }
    },
    handleAddAssistant() {
      this.centerDialogVisible1 = true;
    },
    handleAssistant() {
      if (this.Assistant === false) {
        this.Assistant = true;
      } else {
        this.Assistant = !this.Assistant;
      }
    },
    cancel() {
      if (this.obj.style_pic_url === "") {
        this.obj.style_pic_url = "";
      }
      if (this.obj.style_color_pic_url === "") {
        this.obj.style_color_pic_url = "";
      }
      this.centerDialogVisible = false;
    },
    //放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      // console.log(this.status);
      // let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          Api(formData).then(response => {
            if (this.status == 1) {
              this.obj.style_pic_url = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            if (this.status == 2) {
              this.obj.style_color_pic_url = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            this.$message({
              //element-ui的消息Message消息提示组件
              type: "success",
              message: "上传成功"
            });
          });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
      // this.status = "";
      this.centerDialogVisible = false;
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //下载图片
    down(type) {
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {},
    handle_obj_style_pic_url() {
      this.option.img = "";
      this.status = 1;
      this.centerDialogVisible = true;
    },
    handle_obj_style_color_pic_url() {
      this.option.img = "";
      this.status = 2;
      this.centerDialogVisible = true;
    },
    async handleEdit() {
      this.$refs["obj"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        let obj = {};
        this.obj.user_id_data.map(v => {
          v["user_id"] = v.id;
          delete v.checked;
          delete v.ctime;
          delete v.id;
          delete v.last_login_time;
          delete v.name;
          delete v.role;
          delete v.username;
        });
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
        obj["user_id_data"] = this.obj.user_id_data;
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
    async getstylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.obj.user_id_data.map(v => {
        data.map((v1, i1) => {
          if (v.user_id == v1.id) {
            v1["checked"] = true;
            v["name"] = v1.name;
          }
        });
      });
      this.stylists = data;
      this.user_id_data_length = this.obj.user_id_data.length;
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
    console.log(this.$route.query);
    let navc = this.$route.query;
    this.navc = navc;
    let res = await getStyle({ id: navc.id });
    console.log(res);
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
  .upload {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    .avatar-uploader-icon {
      border: 1px solid #ccc;
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .dialog {
    .upload {
      margin-bottom: 30px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      position: relative;
      cursor: pointer;
      color: #888;
      background: #fafafa;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      *zoom: 1;
      #uploads {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
      }
    }
    .info {
      width: 720px;
      margin: 0 auto;
      .oper-dv {
        height: 20px;
        text-align: right;
        margin-right: 100px;
        a {
          font-weight: 500;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .info-item {
        margin-top: 15px;

        label {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        .sel-img-dv {
          position: relative;
          .sel-file {
            position: absolute;
            width: 90px;
            height: 30px;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
          }
          .sel-btn {
            position: absolute;
            cursor: pointer;
            z-index: 1;
          }
        }
      }
    }

    .cropper-content {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
      .cropper {
        width: 260px;
        height: 260px;
      }
      .show-preview {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-left: 30px;
      }
    }
    .cropper-content .show-preview .preview {
      margin-left: 0px;
    }
  }
}
</style>



