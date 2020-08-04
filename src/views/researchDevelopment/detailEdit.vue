<template>
  <div class="detailEdit">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>研发</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/itemDesign' }">设计项目</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/designCheck?id=${obj.id}` }">项目详细</el-breadcrumb-item>
      <el-breadcrumb-item>编辑{{obj.projecttype}}订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="upload" @click="handleImg">
        <img v-if="obj.picurl" :src="obj.picurl" alt />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <!-- form -->
      <div class="form">
        <!-- ref="form" :model="form" -->
        <el-form :model="obj" ref="obj" :rules="rules" label-width="130px">
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
          <el-form-item label="详细要求">
            <el-input type="textarea" v-model="obj.detailed" class="textarea"></el-input>
          </el-form-item>
          <el-form-item label="指派设计师" prop="user_name">
            <el-select v-model="obj.user_name" placeholder="工作人员名称" @change="handleUser_id($event)">
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
              <div v-for="(item, index) in obj.user_id_data" :key="index">{{item.name}},</div>
              <div @click="handleAddAssistant" style="margin-left:20px">添加助理</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="power.indexOf('A1000300')!=-1"
              @click="handleKeep"
              style="padding:10px 50px;border-radius: 15px;"
            >保存</el-button>
            <el-button
              v-if="power.indexOf('A1000400')!=-1"
              @click="handleDel"
              style="padding:10px 50px;border-radius: 15px;"
            >删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog
      title="上传图片"
      :visible.sync="centerDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
      center
      class="dialog"
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

          <!-- <el-button class="oper" value="↓" title="下载" @click="down('blob')" circle></el-button> -->
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
import { Api } from "@/js/api.js"; //接口url配置文件
import { VueCropper } from "vue-cropper";
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
  components: {
    VueCropper
  },
  data() {
    return {
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

      power: "",
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
      },

      Assistant: false,
      checkedList: [],
      arr: [],
      user_id_data_length: ""
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
    AssistantCancel() {
      this.centerDialogVisible1 = false;},
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
      if (this.obj.picurl === "") {
        this.obj.picurl = "";
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
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          Api(formData).then(response => {
            this.obj.picurl = response.data.data.pic_file_url;
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
      this.option.img = "";
      // this.option.img = this.obj.picurl;
      this.centerDialogVisible = true;
    },
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
        this.obj.user_id_data.map(v => {
          v["user_id"] = v.id;
          delete v.checked;
          delete v.ctime;
          delete v.last_login_time;
          delete v.name;
          delete v.role;
          delete v.username;
          delete v.id;
        });

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
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getProject({ id });
    this.obj = res.data.data;
    if (res.data.data.projecttype === "0") res.data.data.projecttype = "意向";
    if (res.data.data.projecttype === "1") res.data.data.projecttype = "阶段";
    if (res.data.data.projecttype === "2") res.data.data.projecttype = "企划";

    this.getWest();
    this.getYear();
    this.getSeason();
    this.getstylist();

    this.power = localStorage.getItem("power");
    console.log(this.power);
  }
};
</script>

<style lang="less" scoped>
.detailEdit {
  .main {
    display: flex;
    padding: 40px 40px 40px 30px;
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
      margin-left: 0;
    }
  }
}
</style>