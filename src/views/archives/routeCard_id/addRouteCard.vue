<template>
  <div class="addRouteCard">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/routeCard_list' }">物料工艺卡</el-breadcrumb-item>
        <el-breadcrumb-item>新增物料工艺卡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 图片 -->
    <div style="margin:0px 100px;">
      <div style="margin:10px 0px;">物料图片</div>
      <div class="upload" @click="handleFormImg">
        <img v-if="form.picurl" :src="form.picurl" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>

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
        <el-button slot="trigger" size="small" type="primary">图片内容识别</el-button>
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
          <!-- fit="scale-down" -->
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
    <el-col class="form" style="margin-top:20px">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <div style="display:flex;">
          <el-form-item label="供应商">
            <el-autocomplete
              class="inline-input"
              v-model="supplier_companyname"
              :fetch-suggestions="querySearch"
              placeholder="供应商"
              @select="handleSelect"
              style="width:200px;margin-right:10px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item class="texa">
            <router-link :to="`/addSupplier`" target="_blank">新增供应商</router-link>
          </el-form-item>
        </div>
        <el-form-item label="编号" prop="materialsno">
          <el-input v-model="form.materialsno" style="width:200px;" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="面料名称" prop="materialsname">
          <el-input v-model="form.materialsname" style="width:200px;" placeholder="面料名称"></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-form-item label="分类" prop="materials_mainclass_name">
            <el-select
              v-model="form.materials_mainclass_name"
              placeholder="请选择"
              @change="handleClassDatasId($event)"
              style="width:200px"
            >
              <el-option
                v-for="item in classData"
                :key="item.id"
                :label="item.classname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div @click.capture="get_class_data">
            <el-form-item class="texa" prop="materials_class_name">
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
          </div>
          <span class="rot" @click="rot">新增分类</span>
        </div>
        <div v-for="(item,index) in form.material_data" :key="item.key" class="member_user_item">
          <el-form-item
            :label="`面料成分`"
            :prop="'material_data.'+index+'.material_name'"
            :rules="material_dataRules.material_data_material_name"
          >
            <el-select v-model="item.material_name" placeholder="请选择" style="width:200px">
              <el-option
                v-for="item in materials"
                :key="item.id"
                :label="item.name"
                :value="item.material_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="texa"
            :prop="'material_data.'+index+'.content'"
            :rules="material_dataRules.material_data_content"
          >
            <el-input v-model="item.content" style="width:200px" placeholder="%"></el-input>
          </el-form-item>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleIngredient">添加面料成分</span>
        </el-form-item>
        <el-form-item label="计量单位" prop="unit">
          <span>
            <el-select v-model="form.unit" placeholder="请选择">
              <el-option
                v-for="item in units"
                :key="item.id"
                :label="item.unit_name"
                :value="item.unit_name"
              ></el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="大货量单价" prop="wsale_price">
          <el-input v-model="form.wsale_price" style="width:200px;" placeholder="大货量单价"></el-input>
        </el-form-item>
        <div v-for="(item,index) in form.color_data" :key="item.key" class="color_user_item">
          <el-form-item
            :label="`颜色`"
            :prop="'color_data.'+index+'.color'"
            :rules="color_dataRules.color_data_color"
          >
            <el-cascader
              v-model="item.color"
              :options="colors"
              :props="optionProps"
              :show-all-levels="false"
            ></el-cascader>
            <!-- @change="handleChange" -->

            <!-- <el-select v-model="item.color" placeholder="请选择" style="width:200px">
              <el-option
                v-for="item in colors"
                :key="item.id"
                :label="item.color_name"
                :value="item.color_name"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item
            class="texa"
            :prop="'color_data.'+index+'.color_no'"
            :rules="color_dataRules.color_data_color_no"
          >
            <el-input v-model="item.color_no" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item class="texa">
            <div class="upload" @click="handleImg(item)">
              <img v-if="item.picurl" :src="item.picurl" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-form-item>

          <span v-if="index>0" class="deleteUser" @click="handleDeleteColor(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleColor">添加颜色</span>
        </el-form-item>
        <el-form-item label="是否有货" prop="instock">
          <el-radio-group v-model="form.instock">
            <el-radio :label="'0'">是</el-radio>
            <el-radio :label="'1'">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到货时间" prop="arrival_time">
          <!-- <el-date-picker v-model="form.arrival_time" type="date" placeholder="选择日期"></el-date-picker> -->
          <el-input v-model="form.arrival_time" placeholder="到货时间" style="width:200px"></el-input>天
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
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
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish('blob')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getSupplierSelect,
  getUnitSelect,
  getColorSelect,
  getMaterialsClass,
  getMaterialsClassInfo,
  materialsAdd,
  getMaterialsInfo,
  materialsDel,
  materialsEdit,
  getMaterialSelect,
  discern,
} from "@/api/archives";
import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      //剪切图片上传
      optionProps: {
        value: "color_name",
        label: "color_name",
        children: "children",
      },
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

      picurl: "", //物料图片
      name: "",
      form: {
        arrival_time: "",
        color_data: [
          {
            color: "",
            color_no: "",
            picurl: "",
            id: "",
          },
        ],
        instock: "0",
        material_data: [
          {
            content: "",
            material_name: "",
            id: "",
          },
        ],
        materials_class_id: "",
        materials_class_name: "",
        materials_mainclass_id: "",
        materials_mainclass_name: "",
        materials_supplier_id: "",
        materialsname: "",
        materialsno: "",
        picurl: "",
        remarks: "",
        unit: "",
        wsale_price: "",
      },
      classDataName: "",
      class_data_name: "",
      radio: "",
      color: "", //选中颜色
      classData: [],
      class_datas: [],
      units: [],
      colors: [],
      materials: [],
      colorValue: [
        {
          color: "",
          color_no: "",
          picurl: "",
          id: "",
        },
      ],
      value: "",
      tableData: [
        {
          content: "",
          material_name: "",
          id: "",
        },
      ],
      class_datas_id: "",
      classDatasId: "",
      materials_class_id: "",
      item: "",
      supplier_companyname: "",
      materials_supplier_id: "",
      rules: {
        // supplier_companyname: [
        //   { required: true, message: "请填写商品数量", trigger: "blur" }
        // ],
        materialsno: [
          { required: true, message: "请输入编号", trigger: "blur" },
        ],
        materialsname: [
          { required: true, message: "请输入面料名称", trigger: "blur" },
        ],
        materials_mainclass_name: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        materials_class_name: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        unit: [
          { required: true, message: "请选择计算单位", trigger: "change" },
        ],
        // wsale_price: [
        //   { required: true, message: "请输入大货单价", trigger: "blur" },
        // ],
        // instock: [
        //   { required: true, message: "请选择是否发货", trigger: "change" },
        // ],
        // arrival_time: [
        //   { required: true, message: "请选择时间", trigger: "change" },
        // ],
      },
      material_dataRules: {
        material_data_material_name: [
          { required: true, message: "请输入面料成分", trigger: "change" },
        ],
        material_data_content: [
          { required: true, message: "请输入面料比例", trigger: "blur" },
        ],
      },
      color_dataRules: {
        color_data_color: [
          { required: true, message: "请选择颜色", trigger: "change" },
        ],
        color_data_color_no: [
          { required: true, message: "请输入颜色编号", trigger: "blur" },
        ],
      },
      loading: false,
      headImg: "",
      fileList: [],
      fileList1: "",
      contents: [],
      imgs: [],
      permission: [],

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
            if (this.status === 1) {
              console.log(1);
              for (let i = 0; i < this.colorValue.length; i++) {
                this.item.picurl = response.data.data.pic_file_url;
              }
              this.imgFile = "";
            }
            if (this.status === 2) {
              console.log(2);
              this.form.picurl = response.data.data.pic_file_url;
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
    },
    imgLoad(msg) {},
    // *******************识别内容********************
    beforeRecognition() {
      this.loading = true;
    },
    errorRecognition() {
      this.loading = false;
    },
    async recognition(response, file, fileList) {
      this.loading = false;
      this.fileList1 = URL.createObjectURL(file.raw);
      this.imgs.push(URL.createObjectURL(file.raw));
      this.contents = response.data.words_result;
      this.contents = this.contents.filter((v) => {
        return !/^\d{1,3}$/.test(v.words);
      });
    },
    rot() {
      this.$router.push({ path: `/materialClassification` });
    },
    handleImg(item) {
      this.item = item;
      this.previews.url = "";
      this.option.img = "";
      this.status = 1;
      this.centerDialogVisible = true;
    },
    handleFormImg() {
      this.previews.url = "";
      this.option.img = "";
      this.status = 2;
      this.centerDialogVisible = true;
    },
    handleIngredient() {
      this.form.material_data.push({
        content: "",
        material_name: "",
        id: "",
      });
    },
    handleColor() {
      this.form.color_data.push({
        color: "",
        color_no: "",
        picurl: "",
        id: "",
      });
    },
    handleDeleteUser(index) {
      this.form.material_data.splice(index, 1);
    },
    handleDeleteColor(index) {
      this.form.color_data.splice(index, 1);
    },
    async querySearch(value, cb) {
      let res = await getSupplierSelect({
        keyword: value,
      });
      let { data } = res.data;
      cb(data);
    },
    handleSelect(item) {
      this.form.supplier_companyname = item.value;
      this.form.materials_supplier_id = item.address;
    },
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.form.mainclass_id,
      });
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class_name = "";
      this.form.materials_class_id = "";
      if (data.class_data.length > 0) {
        this.form.materials_class_name = this.class_datas.class_data[0].classname;
        this.form.materials_class_id = this.class_datas.class_data[0].id;
      }
    },
    handleClassDatasIds(e) {
      this.form.materials_class_id = e;
    },
    handleAvatarSuccessPanels(res, file) {
      this.form.picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async get_class_data() {
      let res = await getMaterialsClassInfo({ id: this.classDatasId });
      let { data } = res.data;
      this.class_datas = data;
    },
    async getUnit() {
      let res = await getUnitSelect();
      let { data } = res.data;
      this.units = data;
    },
    async getColor() {
      let res = await getColorSelect();
      let { data } = res.data;
      this.colors = data;
    },
    async handleDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res = await materialsDel({ id });
          this.$router.push({ path: "/routeCard_list" });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handleEdit() {
      if (this.supplier_companyname === "") {
        this.$message.error("请选择供应商 or 请添加供应商");
      } else {
        this.$refs["form"].validate(async (valid) => {
          if (!valid) return;

          delete this.form["supplier_id"];
          delete this.form["supplier_companyname"];
          delete this.form["materials_supplier_data"];
          this.form.color_data.map((v, i) => {
            if (v.color instanceof Array) v.color = v.color.pop();
          });
          let res = await materialsAdd(this.form);
          this.$router.go(-1);
        });
      }
    },
    async getMaterialList() {
      let res = await getMaterialSelect();
      console.log(res);
      let { data } = res.data;
      this.materials = data;
    },
  },
  async mounted() {
    this.getClassData();
    this.getUnit();
    this.getColor();
    this.getMaterialList();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.addRouteCard {
  .upload {
    float: left;
    width: 200px;
    height: 200px;
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
  .upload-demo {
    float: left;
    height: 30px;
    margin-left: 100px;
  }
  .camera {
    position: relative;
    height: 40px;
    right: 90px;
    top: 80px;
  }
  .texa {
    /deep/.el-form-item__content {
      margin-left: 30px !important;
    }
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
  /deep/textarea {
    width: 500px;
    height: 150px;
    resize: none !important;
  }
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
  .color_user_item {
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
    // .upload {
    //   width: 178px;
    //   height: 178px;
    //   border-radius: 10px;
    //   overflow: hidden;
    //   i {
    //     border: 1px solid #ccc;
    //   }
    // }
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