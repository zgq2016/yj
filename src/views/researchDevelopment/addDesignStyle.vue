<template>
  <div class="editTheStyle" v-if="power.indexOf('A9000100')!=-1">
    <div class="aa">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>研发部</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/designStyle' }">设计款式</el-breadcrumb-item>
        <el-breadcrumb-item>新增设计款式</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="styleNumber">
        <div class="upload" @click="handle_form_style_pic_url">
          <el-image
            v-if="form.style_pic_url"
            style="width: 150px; height: 150px;margin-right: 5px;"
            :src="form.style_pic_url"
            fit="cover"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div class="styleNumberContent">
          <div class="form">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
              <el-form-item>
                <div style="width:200px;display:flex">
                  <div>款号:</div>
                  <div>{{form.styleno}}</div>
                </div>
              </el-form-item>
              <el-form-item label="名称" prop="stylename">
                <el-input v-model="form.stylename" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="品类" prop="style_type">
                <el-cascader
                  v-model="form.style_type"
                  :options="categorys"
                  :props="optionProps1"
                  @change="handleChange1"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="年份" prop="year">
                <el-select v-model="form.year" placeholder="年份">
                  <el-option
                    v-for="item in years"
                    :key="item.id"
                    :label="item.year"
                    :value="item.year"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="季节" prop="season">
                <el-select v-model="form.season">
                  <el-option
                    v-for="item in seasons"
                    :key="item.id"
                    :label="item.season"
                    :value="item.season"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颜色" prop="style_color">
                <el-cascader
                  v-model="form.style_color"
                  :options="colors"
                  :props="optionProps"
                  @change="handleChange"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="指派设计师" prop="season">
                <el-select v-model="form.user_id" @change="handleUser_id($event)">
                  <el-option
                    v-for="item in stylists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指派助理">
                <div style="display:flex">
                  <div v-for="(item, index) in arr" :key="index">{{item.name}},</div>
                  <div @click="handleAddAssistant" style="margin-left:20px">添加助理</div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="color">
        <div class="upload" @click="handle_form_style_color_pic_url">
          <div
            v-if="form.color_code"
            class="uploads"
            :style="`background-color:${form.color_code};`"
          ></div>
          <img v-if="form.style_color_pic_url" :src="form.style_color_pic_url" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <div class="display:flex">
        <el-button round style="margin:30px  100px 30px 250px" @click="handleEdit">保存</el-button>
      </div>
    </div>
    <el-dialog
      title="色卡/颜色"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="display:flex;">
        <div class="info-item">
          <div style="display:flex;">
            <div class="upload">
              <input
                type="file"
                id="uploads"
                :value="imgFile"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="uploadImg($event, 1)"
              />
              上传色卡图片
            </div>
            <button v-if="status===2" class="upload" style="margin-left:30px;padding:0 20px 0 10px">
              选择颜色
              <div v-if="status===2">
                <el-color-picker v-model="color_code" @change="color_picker"></el-color-picker>
              </div>
            </button>
          </div>
          <div class="line">
            <div class="cropper-content">
              <div class="cropper">
                <vueCropper
                  ref="cropper"
                  :info="false"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :fixedBox="option.fixedBox"
                  enlarge="100"
                  @realTime="realTime"
                  @imgLoad="imgLoad"
                ></vueCropper>
              </div>
              <div class="show-preview" v-if="status===4||status===2">
                <div class="preview">
                  <div
                    v-if="color_code"
                    :style="`background-color:${color_code};width:150px;height:150px`"
                  ></div>
                  <img v-if="previews.url" :src="previews.url" :style="previews.img" />
                </div>
              </div>
              <div class="show-preview1" v-if="status===1||status===3">
                <div class="preview">
                  <img v-if="previews.url" :src="previews.url" :style="previews.img" />
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
  styleDel,
} from "@/api/researchDevelopment.js";

import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      power: "",
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
        fixedBox: true,
        centerBox: true,
        infoTrue: false,
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
        style_color: "",
        user_id: "",
      },
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      colors: [],
      user_id: "",
      rules: {
        stylename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        style_type: [
          { required: true, message: "请输入品类", trigger: "blur" },
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        season: [{ required: true, message: "请输入季节", trigger: "blur" }],
        user_id: [{ required: true, message: "请输入设计师", trigger: "blur" }],
        style_color: [
          { required: true, message: "请输入颜色", trigger: "blur" },
        ],
      },
      Assistant: false,
      checkedList: [],
      arr: [],
      user_id_data_length: "",
      navc: {},
      status: "",
      color_code: "",
      optionProps1: {
        value: "style_type",
        label: "style_type",
        children: "children",
      },
      optionProps: {
        value: "color_name",
        label: "color_name",
        children: "children",
      },
    };
  },
  methods: {
    handleChange(e) {
      this.form.style_color = e[1];
    },
    handleChange1(e) {
      this.form.style_type = e[1];
    },
    color_picker() {
      this.previews.url = "";
      this.form.style_color_pic_url = "";
      this.form.style_color_pic_url = "";
      this.style_color_pic_url = "";
    },
    AssistantFinish() {
      this.stylists.map((v, i) => {
        if (v.checked == true) {
          this.arr.push(v);
        }
      });
      this.centerDialogVisible1 = false;
    },
    AssistantCancel() {
      this.centerDialogVisible1 = false;
    },
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
      if (this.form.style_pic_url === "") {
        this.form.style_pic_url = "";
      }
      if (this.form.style_color_pic_url === "") {
        this.form.style_color_pic_url = "";
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
      // let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          Api(formData).then((response) => {
            if (this.status == 1) {
              this.form.style_pic_url = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            if (this.status == 2) {
              this.form.style_color_pic_url = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            this.$message({
              //element-ui的消息Message消息提示组件
              type: "success",
              message: "上传成功",
            });
          });
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
      if (this.status == 2) {
        this.form.color_code = this.color_code;
      }
      this.color_code = "";
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
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
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
      reader.onload = (e) => {
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
      if (this.status === 2 || this.status === 4) {
        this.option.autoCropWidth = 150;
        this.option.autoCropHeight = 150;
      } else if (this.status === 1 || this.status === 3) {
        this.option.autoCropWidth = 150;
        this.option.autoCropHeight = 300;
      }
    },
    imgLoad(msg) {},
    handle_form_style_pic_url() {
      this.option.img = "";
      this.status = 1;
      this.centerDialogVisible = true;
    },
    handle_form_style_color_pic_url() {
      this.option.img = "";
      this.status = 2;
      this.centerDialogVisible = true;
    },
    async handleEdit() {
      console.log(this.arr);
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        // 调用actions的登录方法
        let form = {};
        this.arr.map((v) => {
          v["user_id"] = v.id;
          delete v.checked;
          delete v.ctime;
          delete v.last_login_time;
          delete v.name;
          delete v.role;
          delete v.username;
          delete v.id;
        });
        form["style_pic_url"] = this.form.style_pic_url;
        form["style_color_pic_url"] = this.form.style_color_pic_url;
        form["stylename"] = this.form.stylename;
        form["styleno"] = this.form.styleno;
        form["project_id"] = 0;
        form["season"] = this.form.season;
        form["year"] = this.form.year;
        form["style_type"] = this.form.style_type;
        form["style_color"] = this.form.style_color;
        form["user_id"] = this.form.user_id;
        form["user_id_data"] = this.arr;
        form["color_code"] = this.form.color_code;
        let res = await projectStyleAdd(form);
        console.log(res);
        this.$router.push({
          path: `/designStyle`,
        });
        // designNote?id=280&TL=30&project_id=139
      });
    },

    handleUser_id(e) {
      this.form.user_id = e;
    },
    async getYear() {
      let res = await getYearList();
      let { data } = res.data;
      this.years = data;
    },
    async getColor() {
      let res = await getColorSelect();
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
      console.log(res);
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
    },
  },
  async mounted() {
    this.getYear();
    this.getColor();
    this.getSeason();
    this.getstylist();
    this.getCategory();
    this.getStyleno();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.editTheStyle {
  .main {
    min-height: 800px;
    position: relative;
    .basicInfo {
      font-size: 20px;
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
  .uploads {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #000;
  }
  .dialog {
    .upload {
      margin-bottom: 30px;
      width: 140px;
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
        width: 350px;
        height: 350px;
      }
      .show-preview {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-left: 30px;
      }
      .show-preview1 {
        width: 150px;
        height: 300px;
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
  /deep/.el-color-picker__trigger {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 0;
    // position: relative;
    // left: -390px;
    // top: -50px;
    cursor: pointer;
  }
}
</style>



