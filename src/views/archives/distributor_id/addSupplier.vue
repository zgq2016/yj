<template>
  <div class="addSupplier">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/distributor_list' }">供应商</el-breadcrumb-item>
        <el-breadcrumb-item>新增供应商</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 图片 -->
    <div class="upload">
      <!-- 商标/名片 -->
      <div class="upload_card">
        <div class="upload_name">商标/名片</div>
        <div class="uploads" @click="handle_cardpicurl">
          <img v-if="form.cardpicurl" :src="form.cardpicurl" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <!-- 门面照 -->
      <div class="upload_panels">
        <div class="upload_name">门面照</div>
        <div class="uploads" @click="handle_compicurl">
          <img v-if="form.compicurl" :src="form.compicurl" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <!-- action="https://yj.ppp-pay.top/webapi.php?g=test" -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://shesho.ppp-pay.top/webapi.php?g=test"
        :auto-upload="true"
        name="image"
        :show-file-list="false"
        :on-success="recognition"
        :on-error="errorRecognition"
        :before-upload="beforeRecognition"
        :file-list="fileList"
      >
        <el-button slot="trigger" size="small" type="info">图片内容识别</el-button>
      </el-upload>
      <el-button @click="onTake" icon="el-icon-camera" type="info" class="camera" size="small">拍照</el-button>

      <div
        v-loading="loading"
        element-loading-text="识别内容中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="image-content"
      >
        <ul>
          <li>*注意：识别内容存在差异，谨慎修改！</li>
          <li v-for="(item,index) in contents" :key="index">{{item.words}}</li>
        </ul>
        <div v-if="fileList1">
          <el-image
            style="width: 100%; height: 300px;"
            fit="scale-down"
            title="点击放大"
            :src="fileList1"
            :preview-src-list="[fileList1]"
          ></el-image>
        </div>
      </div>
    </div>

    <el-dialog title="拍照上传" :visible.sync="visible" @close="onCancel" width="1065px">
      <div class="box">
        <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoplay></video>
        <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
      </div>
      <div slot="footer">
        <el-button @click="drawImage" icon="el-icon-camera" size="small">拍照</el-button>
        <el-button v-if="os" @click="getCompetence" icon="el-icon-video-camera" size="small">打开摄像头</el-button>
        <el-button v-else @click="stopNavigator" icon="el-icon-switch-button" size="small">关闭摄像头</el-button>
        <el-button @click="resetCanvas" icon="el-icon-refresh" size="small">重置</el-button>
        <el-button @click="onCancel(1)" icon="el-icon-circle-close" size="small">完成</el-button>
      </div>
    </el-dialog>
    <!-- form -->
    <div class="form">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="公司简称" prop="companyname">
          <el-input v-model="form.companyname" style="width:200px" placeholder="请填写公司简称"></el-input>
        </el-form-item>
        <el-form-item label="公司全称">
          <el-input v-model="form.alias_name" style="width:200px" placeholder="请填写公司全称"></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-form-item label="分类" prop="mainclass">
            <el-select
              v-model="form.mainclass"
              placeholder="请选择"
              @change="handleClassDatasId($event)"
              style="width:200px;"
            >
              <el-option
                v-for="item in classData"
                :key="item.id"
                :label="item.classname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="materials_class_name">
            <el-select
              v-model="form.materials_class_name"
              placeholder="请选择"
              @change="handleClassDatasIds($event)"
              style="width:200px"
            >
              <el-option
                v-for="item in class_datas.class_data"
                :key="item.id"
                :label="item.classname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <span class="rot" @click="rot">新增分类</span>
        </div>
        <div v-for="(item,index) in form.contact" :key="item.key" class="member_user_item">
          <el-form-item
            :label="`联系人`"
            :prop="'contact.'+index+'.contacts'"
            :rules="contactRules.contact_contacts"
          >
            <el-input v-model="item.contacts" style="width:200px" placeholder="请填写联系人"></el-input>
          </el-form-item>
          <!-- :rules="contactRules.contact_phone" -->
          <el-form-item :prop="'contact.'+index+'.phone'">
            <el-input
              v-model="item.phone"
              style="width:200px"
              class="it"
              @blur="itphone(item.phone,index)"
              placeholder="请填写联系电话"
            ></el-input>
          </el-form-item>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleAddUsers">增加联系人</span>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" style="width:500px" placeholder="详细地址"></el-input>
        </el-form-item>
        <div v-for="(item,index) in form.bank" :key="item.key" class="member_account_item">
          <el-form-item :label="`账号信息`">
            <el-select v-model="item.bank" placeholder="银行名称" style="width:200px">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :prop="'bank.'+index+'.name'">
            <el-input v-model="item.name" style="width:200px" placeholder="收款人姓名"></el-input>
          </el-form-item>
          <el-form-item :prop="'bank.'+index+'.bankid'">
            <el-input
              v-model="item.bankid"
              style="width:200px"
              class="ib"
              @blur="ibBankid(item.bankid,index)"
              placeholder="银行卡卡号"
            ></el-input>
          </el-form-item>
          <span v-if="index>0" class="deleteAccount" @click="handleDeleteAccount(index)">-</span>
        </div>
        <el-form-item label>
          <span style="cursor: pointer;" @click="handleAddAccount">增加账号信息</span>
        </el-form-item>

        <el-form-item label="是否开发票" prop="isbill">
          <el-radio-group v-model="form.isbill">
            <el-radio :label="'0'">不开</el-radio>
            <el-radio :label="'1'">开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="税点" prop="tax" v-if="form.isbill=='1'">
          <el-input style="width:200px" v-model="form.tax" @input="handleInput"></el-input>%
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
        </el-form-item>
      </el-form>
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
  </div>
</template>
<script>
import {
  supplierAdd,
  getBankNameSelect,
  getSupplierInfo,
  supplierEdit,
  supplierDel,
  getMaterialsClass,
  getMaterialsClassInfo,
  discern,
  basicAccurate,
} from "@/api/archives";

import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件
import { max } from "moment";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      visible: false, //弹窗
      // loading: false, //上传按钮加载
      os: false, //控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 500,
      videoHeight: 400,
      postOptions: [],
      CertCtl: "",
      // 遮罩层
      // loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 项目人员表格数据
      akworkerList: [],
      //工种类别数据字典
      workerTypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imgSrc: undefined,
      },
      loading: false,
      headImg: "",
      fileList: [],
      fileList1: "",
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
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      centerDialogVisible: false,
      form: {
        address: "",
        bank: [
          {
            bank: "",
            name: "",
            bankid: "",
            id: "",
          },
        ],

        cardpicurl: "",
        companyname: "",

        compicurl: "",
        contact: [{ contacts: "", phone: "", id: "" }],
        ctime: "",
        id: "",
        isbill: "0",
        mainclass: "",
        mainclass_id: "",
        materials_class_id: "",
        materials_class_name: "",
        remarks: "",
        tax: "",
      },
      status: "",
      options: [],
      classData: [],
      classDataName: "",
      class_datas: [],
      class_data_name: "",
      classDatasId: "",
      contents: [],
      // 表单规则
      rules: {
        companyname: [
          { required: true, message: "公司简称,公司全称", trigger: "blur" },
        ],
        mainclass: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        materials_class_name: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      contactRules: {
        contact_contacts: [
          { required: true, message: "请填写联系人名称", trigger: "blur" },
        ],
        contact_phone: [
          { required: true, message: "请填写联系人号码", trigger: "blur" },
        ],
      },
      imgs: [],
      // bankRules: {
      //   bank_bank: [
      //     { required: true, message: "请选择银行", trigger: "change" },
      //   ],
      //   bank_name: [
      //     { required: true, message: "请填写卡号名称", trigger: "blur" },
      //   ],
      //   bank_bankid: [
      //     { required: true, message: "请填写银行卡号", trigger: "blur" },
      //   ],
      // },
      vs1: false,
      vs2: false,
    };
  },
  methods: {
    /*调用摄像头拍照开始*/
    onTake() {
      this.visible = true;
      this.getCompetence();
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async onCancel(val) {
      this.visible = false;
      /* this.resetCanvas();*/
      this.stopNavigator();
      if (val == 1) {
        this.fileList1 = this.imgSrc;
        let file = this.dataURLtoFile(this.imgSrc, String(Math.random()));
        let param = new FormData(); // 创建form对象
        param.append("image", file); // 通过append向form对象添加数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let res = await discern(param, config);
        this.contents = res.data.data.words_result;
        if (this.contents) {
          if (this.contents) {
            this.contents = this.contents.filter((v) => {
              return !/^\d{1,3}$/.test(v.words);
            });
          }
        }
      }
    },
    // 调用摄像头权限
    getCompetence() {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this;
        this.os = false; //切换成关闭摄像头
        this.thisCancas = document.getElementById("canvasCamera");
        this.thisContext = this.thisCancas.getContext("2d");
        this.thisVideo = document.getElementById("videoCamera");
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
              );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: "scaleX(-1)",
          },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            this.$notify({
              title: "警告",
              message: "没有开启摄像头权限或浏览器版本不兼容.",
              type: "warning",
            });
          });
      });
    },
    //绘制图片
    drawImage() {
      // 点击，canvas画图
      console.log(this.thisContext);
      this.thisContext.drawImage(
        this.thisVideo,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      );
      // 获取图片base64链接
      this.imgSrc = this.thisCancas.toDataURL("image/png");
      /*const imgSrc=this.imgSrc;*/
    },

    //清空画布
    clearCanvas(id) {
      let c = document.getElementById(id);
      let cxt = c.getContext("2d");
      cxt.clearRect(0, 0, c.width, c.height);
    },
    //重置画布
    resetCanvas() {
      this.imgSrc = "";
      this.clearCanvas("canvasCamera");
    },
    //关闭摄像头
    stopNavigator() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        this.os = true; //切换成打开摄像头
      }
    },
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },

    ibBankid(val, index) {
      let input = document.getElementsByClassName("ib")[index].children[0];
      let nodes = document.getElementsByClassName("ib")[index];
      let div = document.createElement("div");
      div.className = "error";
      div.style.color = "#F56C6C";
      div.innerHTML = "请输入正确的银行卡码";
      console.log(nodes.children);
      if (nodes.children.length < 2) {
        nodes.appendChild(div);
      }

      if (/^([1-9]{1})(\d{14}|\d{18})$/.test(val)) {
        input.style.border = "1px solid #DCDFE6";
        nodes.removeChild(nodes.children[1]);
        this.vs1 = false;
      } else {
        input.style.border = "1px solid #F56C6C";
        this.vs1 = true;
      }
    },
    itphone(val, index) {
      let input = document.getElementsByClassName("it")[index].children[0];
      let nodes = document.getElementsByClassName("it")[index];
      let div = document.createElement("div");
      div.className = "error";
      div.style.color = "#F56C6C";
      div.innerHTML = "请输入正确的号码";
      console.log(nodes.children);
      if (nodes.children.length < 2) {
        nodes.appendChild(div);
      }
      if (
        /^1[3456789]\d{9}$/.test(val) ||
        /^(0[0-9]{2,3}-)?[2-9][0-9]{6,7}$/.test(val)
      ) {
        input.style.border = "1px solid #DCDFE6";
        nodes.removeChild(nodes.children[1]);
        this.vs2 = false;
      } else {
        input.style.border = "1px solid #F56C6C";
        this.vs2 = true;
      }
    },
    rot() {
      this.$router.push({ path: `/materialClassification` });
    },
    cancel() {
      if (this.headImg === "") {
        this.option.img = "";
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
    // *******************识别内容********************
    beforeRecognition() {
      this.loading = true;
    },
    errorRecognition() {
      this.loading = false;
    },
    async recognition(response, file, fileList) {
      console.log(file, fileList);
      this.loading = false;
      this.fileList1 = URL.createObjectURL(file.raw);
      this.imgs.push(URL.createObjectURL(file.raw));
      this.contents = response.data.words_result;
      // if (this.contents) {
      // if(this.contents)
      this.contents = this.contents.filter((v) => {
        return !/^\d{1,3}$/.test(v.words);
      });
      // }
    },
    //上传图片（点击上传按钮）
    finish(type) {
      // console.log(this.status);
      console.log(type);
      // imgs
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
              this.form.cardpicurl = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            if (this.status == 2) {
              this.form.compicurl = response.data.data.pic_file_url;
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
      // console.log(e, num);
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
        // this.imgs = JSON.parse(JSON.stringify(data));

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

    handle_cardpicurl() {
      this.option.img = "";
      this.status = 1;
      this.centerDialogVisible = true;
    },
    handle_compicurl() {
      this.option.img = "";
      this.status = 2;
      this.centerDialogVisible = true;
    },
    handleInput(e) {
      this.form.tax = this.form.tax
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    },

    async handleEdit() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid || this.vs1 ) return;
        // 调用actions的登录方法

        console.log(this.form);
        let res = await supplierAdd(this.form);
        console.log(res);
        if (res.data.error_code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        } else {
          this.$router.go(-1);
        }
        // }
      });
    },

    // 新增联系人
    handleAddUsers() {
      this.form.contact.push({
        contacts: "",
        phone: "",
        id: "",
        // key: Date.now()
      });
    },
    // 删除联系人
    handleDeleteUser(index) {
      this.form.contact.splice(index, 1);
    },
    // 新增账号
    handleAddAccount() {
      this.form.bank.push({
        bank: "",
        name: "",
        bankid: "",
        id: "",
        // key: Date.now()
      });
    },
    // 删除账号
    handleDeleteAccount(index) {
      this.form.bank.splice(index, 1);
    },
    async getBankName() {
      let res = await getBankNameSelect();
      let { data } = res.data;
      this.options = data;
    },
    handleAvatarSuccessCard(res, file) {
      this.form.cardpicurl = res.data.pic_file_url;
    },
    handleAvatarSuccessPanels(res, file) {
      this.form.compicurl = res.data.pic_file_url;
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },

    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.form.mainclass_id,
      });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class_id = "";
      this.form.materials_class_name = "";
      if (data.class_data.length > 0) {
        this.form.materials_class_name = this.class_datas.class_data[0].classname;
        this.form.materials_class_id = this.class_datas.class_data[0].id;
      }
    },
    handleClassDatasIds(e) {
      this.form.materials_class_id = e;
    },
  },
  async mounted() {
    this.getBankName();
    let res1 = await getMaterialsClass();
    this.classData = res1.data.data;
  },
};
</script>

<style lang="less" scoped>
.addSupplier {
  // position: relative;
  .upload {
    position: relative;
    display: flex;
    .upload_card {
      display: flex;
      width: 350px;
      height: 200px;
      .upload_name {
        margin: 0 30px;
      }
      .uploads {
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
    .upload-demo {
      height: 30px;
      // margin-left: 10px;
    }
    .camera {
      position: relative;
      height: 40px;
      right: 90px;
      top: 80px;
    }
    .image-content {
      position: absolute;
      left: 920px;
      width: 500px;
      height: auto;
      border: 1px solid #cccccc;
      z-index: 33;
      ul {
        padding: 10px;
        li {
          margin-bottom: 5px;
        }
        li:first-of-type {
          font-weight: 600;
          margin: 8px;
        }
      }
      /deep/.el-image-viewer__wrapper {
        img {
          width: auto;
          height: auto;
          max-height: auto;
        }
      }
    }

    .upload_panels {
      display: flex;
      width: 350px;
      height: 200px;
      .upload_name {
        margin: 0 30px;
      }
      .uploads {
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
  }
  .form {
    .rot {
      height: 40px;
      line-height: 40px;
      display: block;
      margin-left: 20px;
    }
    .rot:hover {
      cursor: pointer;
      color: coral;
    }
    .member_user_item {
      border-bottom: 1px #eee dashed;
      position: relative;
      display: flex;

      .deleteUser {
        display: block;
        background: #ddd;
        width: 16px;
        height: 16px;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 50px;
        margin: 10px 20px;
      }
    }
    .member_account_item {
      display: flex;
      border-bottom: 1px #eee dashed;
      position: relative;
      .deleteAccount {
        display: block;
        background: #ddd;
        width: 16px;
        height: 16px;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 50px;
        margin: 10px 20px;
      }
    }
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
      margin-left: 0px;
    }
  }
}
</style>