<template>
  <div class="addProject">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>研发部</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/itemDesign' }">设计项目
        <!-- <router-link to="/itemDesign"></router-link> -->
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id==='a'">新增意向订单</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id==='b'">新增阶段工作</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id==='c'">新增企划系列</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="upload" @click="handleImg">
        <img v-if="headImg" :src="headImg" alt />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <!-- form -->
      <div class="form">
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <el-form-item label="项目名称" prop="projectname">
            <el-input v-model="form.projectname"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="projecttype">
            <!-- <div @click.capture="projecttypeName"> -->
            <el-select v-model="form.projecttype" @change="handleChange($event)">
              <el-option
                v-for="item in projecttypes"
                :key="item.id"
                :label="item.v"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- </div> -->
          </el-form-item>
          <el-form-item label="客户" prop="west" v-if="this.$route.query.id==='a'">
            <el-select v-model="form.west" placeholder="客户名称" @change="handleCustomer_id($event)">
              <el-option
                v-for="item in wests"
                :key="item.id"
                :label="item.companyname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="this.$route.query.id==='a'">
            <el-select v-model="form.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="this.$route.query.id==='a'">
            <el-select v-model="form.season" placeholder="季节">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="this.$route.query.id==='b'">
            <el-select v-model="form.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="this.$route.query.id==='b'">
            <el-select v-model="form.season" placeholder="季节">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="元素" prop="element" v-if="this.$route.query.id==='c'">
            <el-input v-model="form.element" placeholder="元素描述"></el-input>
          </el-form-item>
          <el-form-item label="色系" prop="color" v-if="this.$route.query.id==='c'">
            <el-input v-model="form.color" placeholder="色系"></el-input>
          </el-form-item>
          <el-form-item label="年份" prop="year" v-if="this.$route.query.id==='c'">
            <el-select v-model="form.year" placeholder="年份">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="季节" prop="season" v-if="this.$route.query.id==='c'">
            <el-select v-model="form.season">
              <el-option
                v-for="item in seasons"
                :key="item.id"
                :label="item.season"
                :value="item.season"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间" prop="finishtime">
            <el-date-picker v-model="form.finishtime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="要求数量" prop="quantity">
            <el-input v-model="form.quantity" @input="handleInput" placeholder="要求数量"></el-input>
          </el-form-item>
          <el-form-item label="详细要求" prop="detailed">
            <el-input type="textarea" v-model="form.detailed" class="textarea"></el-input>
          </el-form-item>
          <el-form-item label="指派" prop="stylist">
            <el-select v-model="form.stylist" placeholder="工作人员名称" @change="handleUser_id($event)">
              <el-option
                v-for="item in stylists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" style="padding:10px 50px;border-radius: 15px;">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="40%" center class="dialog">
      <div style="display:flex;">
        <div class="info-item">
          <label class="btn btn-orange" for="uploads">选择图片</label>
          <input
            type="file"
            id="uploads"
            :value="imgFile"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="uploadImg($event, 1)"
          />
          <input type="button" class="oper" value="+" title="放大" @click="changeScale(1)" />
          <input type="button" class="oper" value="-" title="缩小" @click="changeScale(-1)" />
          <input type="button" class="oper" value="↺" title="左旋转" @click="rotateLeft" />
          <input type="button" class="oper" value="↻" title="右旋转" @click="rotateRight" />
          <input type="button" class="oper" value="↓" title="下载" @click="down('blob')" />
          <!-- <input type="button" class="btn btn-blue" value="上传头像" @click="finish('blob')" /> -->
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
              <div>
                <div
                  class="show-preview"
                  :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}"
                >
                  <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish('blob')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getWestList,
  getYearList,
  getSeasonList,
  getStylistList,
  getAddProject
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
      projecttypes: [
        {
          v: "意向",
          id: 0
        },
        {
          v: "阶段",
          id: 1
        },
        {
          v: "企划",
          id: 2
        }
      ],
      years: [],
      seasons: [],
      stylists: [],
      categorys: [],
      wests: [],
      form: {
        projectname: "", //项目名称
        projecttype: "", //项目类型
        quantity: "", //要求数量
        detailed: "", //详细要求
        user_id: "",
        finishtime: "", //完成时间
        customer_id: "",
        west: "", //西所
        year: "", //年
        season: "", //季节
        stylist: "", //设计师
        element: "", //元素
        color: "" //色系
      },
      // 表单规则
      rules: {
        projectname: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projecttype: [
          { required: true, message: "请输入项目类型", trigger: "blur" }
        ],
        west: [{ required: true, message: "请输入客户", trigger: "blur" }],
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
        stylist: [{ required: true, message: "请输入设计师", trigger: "blur" }]
      }
    };
  },
  methods: {
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
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          Api(formData).then(response => {
            this.headImg = response.data.data.pic_file_url;
            this.imgFile = "";
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
    handleImg() {
      this.centerDialogVisible = true;
    },
    handleChange(e) {
      if (e === 0) this.$router.push({ path: "/addProject?id=a" });
      if (e === 1) this.$router.push({ path: "/addProject?id=b" });
      if (e === 2) this.$router.push({ path: "/addProject?id=c" });
    },
    handleInput() {
      this.form.quantity = this.form.quantity.replace(/[^0-9-]+/, "");
    },
    onSubmit() {
      console.log(this.form);
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        // if (this.id == "a") this.form.projecttype = 0;
        // if (this.id == "b") this.form.projecttype = 1;
        // if (this.id == "c") this.form.projecttype = 2;
        let { id } = this.$route.query;
        delete this.form.west;
        delete this.form.stylist;
        let obj = { ...this.form };
        obj["finishtime"] = moment(this.form.finishtime).format("YYYY-MM-DD");
        obj["picurl"] = this.headImg;
        if (id === "a") {
          obj["customer_id"] = this.form.customer_id;
          obj["year"] = this.form.year;
          obj["season"] = this.form.season;
          obj["element"] = "";
          obj["color"] = "";
        }
        if (id === "b") {
          obj["year"] = this.form.year;
          obj["season"] = this.form.season;
        }
        if (id === "c") {
          obj["element"] = this.form.element;
          obj["color"] = this.form.color;
          obj["year"] = this.form.year;
          obj["season"] = this.form.season;
          obj["customer_id"] = "";
        }
        let res = await getAddProject(obj);
        console.log(res);
        this.$router.push({ name: "Index" });
      });
    },
    handleCustomer_id(e) {
      console.log(e);
      this.form.customer_id = e;
    },
    handleUser_id(e) {
      console.log(e);
      this.form.user_id = e;
    },
    async getWest() {
      let res = await getWestList();
      let { data } = res.data;
      this.wests = data;
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
    async getstylist() {
      let res = await getStylistList();
      let { data } = res.data;
      this.stylists = data;
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    this.id = id;
    if (this.id === "a") this.form.projecttype = 0;
    if (this.id === "b") this.form.projecttype = 1;
    if (this.id === "c") this.form.projecttype = 2;
    this.getWest();
    this.getYear();
    this.getSeason();
    this.getstylist();
  }
};
</script>

<style lang="less" scoped>
.addProject {
  .main {
    display: flex;
    padding: 40px 40px 40px 30px;
    .upload {
      width: 178px;
      height: 178px;
      border-radius: 10px;
      overflow: hidden;
      i {
        border: 1px solid #ccc;
      }
    }
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
  .dialog {
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
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview {
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #cccccc;
          background: #cccccc;
          margin-left: 40px;
        }
      }
    }
    .cropper-content .show-preview .preview {
      margin-left: 0;
    }
  }
}
</style>