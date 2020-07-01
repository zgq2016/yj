<template>
  <div class="addRouteCard">
    <!-- 图片 -->
    <div style="margin:0px 100px;">
      <div style="margin:10px 0px;">物料图片</div>
      <el-upload
        class="avatar-uploader"
        action="https://yj.ppp-pay.top/uploadpic.php"
        :show-file-list="false"
        :on-success="handleAvatarSuccessPanels"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="obj.picurl" :src="obj.picurl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <!-- form -->
    <el-col class="form" style="margin-top:20px">
      <el-form :model="obj" ref="obj" :rules="rules" label-width="100px">
        <el-form-item label="供应商">
          <el-col :span="8">
            <el-autocomplete
              class="inline-input"
              v-model="supplier_companyname"
              :fetch-suggestions="querySearch"
              placeholder="供应商"
              @select="handleSelect"
              style="width:200px;"
            ></el-autocomplete>
          </el-col>
          <el-col :span="4">
            <router-link to="/addSupplier?id=0">新增供应商</router-link>
          </el-col>
        </el-form-item>
        <el-form-item label="编号" prop="materialsno">
          <el-input v-model="obj.materialsno" style="width:200px;" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="面料名称" prop="materialsname">
          <el-input v-model="obj.materialsname" style="width:200px;" placeholder="面料名称"></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-col :span="6">
            <el-form-item label="分类" prop="materials_mainclass_name">
              <el-select
                v-model="obj.materials_mainclass_name"
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
          </el-col>
          <el-col :span="6">
            <div @click.capture="get_class_data">
              <el-form-item prop="materials_class_name">
                <el-select
                  v-model="obj.materials_class_name"
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
          </el-col>
        </div>
        <div v-for="(item,index) in obj.material_data" :key="item.key" class="member_user_item">
          <el-col :span="6">
            <el-form-item
              :label="`面料成分${index+1}`"
              :prop="'material_data.'+index+'.material_name'"
              :rules="material_dataRules.material_data_material_name"
            >
              <el-input v-model="item.material_name" style="width:200px" placeholder="面料"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :prop="'material_data.'+index+'.content'"
              :rules="material_dataRules.material_data_content"
            >
              <el-input v-model="item.content" style="width:200px" placeholder="%"></el-input>
            </el-form-item>
          </el-col>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleIngredient">添加面料成分</span>
        </el-form-item>
        <el-form-item label="计量单位" prop="unit">
          <span>
            <el-select v-model="obj.unit" placeholder="请选择">
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
          <el-input v-model="obj.wsale_price" style="width:200px;" placeholder="大货量单价"></el-input>
        </el-form-item>
        <div v-for="(item,index) in obj.color_data" :key="item.key" class="color_user_item">
          <el-col :span="6">
            <el-form-item
              :label="`颜色${index+1}`"
              :prop="'color_data.'+index+'.color'"
              :rules="color_dataRules.color_data_color"
            >
              <el-select v-model="item.color" placeholder="请选择" style="width:200px">
                <el-option
                  v-for="item in colors"
                  :key="item.id"
                  :label="item.color_name"
                  :value="item.color_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :prop="'color_data.'+index+'.color_no'"
              :rules="color_dataRules.color_data_color_no"
            >
              <el-input v-model="item.color_no" style="width:200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item>
              <div class="upload" @click="handleImg(item)">
                <img v-if="item.picurl" :src="item.picurl" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-form-item>
          </el-col>

          <span v-if="index>0" class="deleteUser" @click="handleDeleteColor(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleColor">添加颜色</span>
        </el-form-item>
        <el-form-item label="是否有货" prop="instock">
          <el-radio-group v-model="obj.instock">
            <el-radio :label="'0'">是</el-radio>
            <el-radio :label="'1'">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到货时间" prop="arrival_time">
          <el-date-picker v-model="obj.arrival_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="obj.remarks" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
          <el-button @click="handleDel" style="padding:10px 50px;border-radius: 10px;">删除</el-button>
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
  getSupplierSelect,
  getUnitSelect,
  getColorSelect,
  getMaterialsClass,
  materialsAdd,
  getMaterialsClassInfo,
  getMaterialsInfo,
  materialsDel,
  materialsEdit
} from "@/api/archives";
import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件
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

      picurl: "", //物料图片
      name: "",
      form: {
        materialsname: "", //物料名称
        materialsno: "", //编号
        unit: "", //计量单位
        wsale_price: "", //大货量单价
        arrival_time: "", //到货时间
        remarks: "" //备注
      },
      classDataName: "",
      class_data_name: "",
      radio: "",
      color: "", //选中颜色
      classData: [],
      class_datas: [],
      units: [],
      colors: [],
      colorValue: [
        {
          color: "",
          color_no: "",
          picurl: "",
          id: ""
        }
      ],
      value: "",
      tableData: [
        {
          content: "",
          material_name: "",
          id: ""
        }
      ],
      class_datas_id: "",
      classDatasId: "",
      materials_class_id: "",
      item: "",
      obj: {},
      supplier_companyname: "",
      rules: {
        // supplier_companyname: [
        //   { required: true, message: "请填写商品数量", trigger: "blur" }
        // ],
        materialsno: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        materialsname: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        materials_mainclass_name: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        materials_class_name: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        unit: [{ required: true, message: "请填写商品数量", trigger: "blur" }],
        wsale_price: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        instock: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        arrival_time: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        remarks: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ]
      },
      material_dataRules: {
        material_data_material_name: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        material_data_content: [
          { required: true, message: "请填写优惠价格", trigger: "blur" }
        ]
      },
      color_dataRules: {
        color_data_color: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        color_data_color_no: [
          { required: true, message: "请填写优惠价格", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //放大/缩小
    changeScale(num) {
      console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      console.log("finish");
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
            console.log(response);

            for (let i = 0; i < this.colorValue.length; i++) {
              this.item.picurl = response.data.data.pic_file_url;
            }
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
      console.log("realTime");
      this.previews = data;
    },
    //下载图片
    down(type) {
      console.log("down");
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
      console.log("uploadImg");
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
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    },
    handleImg(item) {
      this.item = item;
      this.previews.url = "";
      this.option.img = "";
      this.centerDialogVisible = true;
    },
    handleIngredient() {
      this.obj.material_data.push({
        content: "",
        material_name: "",
        id: ""
      });
    },
    handleColor() {
      this.obj.color_data.push({
        color: "",
        color_no: "",
        picurl: "",
        id: ""
      });
    },
    handleDeleteUser(index) {
      this.tableData.splice(index, 1);
    },
    handleDeleteColor(index) {
      this.colorValue.splice(index, 1);
    },
    async querySearch(value, cb) {
      let res = await getSupplierSelect({
        keyword: value
      });
      let { data } = res.data;
      cb(data);
    },
    handleSelect(item) {
      console.log(item);
      this.supplier_companyname = item.value;
      this.materials_class_id = item.address;
    },
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.obj.mainclass_id
      });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
      this.obj.materials_class_name = this.class_datas.class_data[0].classname;
      this.obj.materials_class_id = this.class_datas.class_data[0].id;
    },
    handleClassDatasIds(e) {
      this.obj.materials_class_id = e;
    },
    handleAvatarSuccessPanels(res, file) {
      this.obj.picurl = res.data.pic_file_url;
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
    async getClassData() {
      let res = await getMaterialsClass();
      console.log(res);
      let { data } = res.data;
      this.classData = data;
    },
    async get_class_data() {
      console.log(this.classDatasId);
      let res = await getMaterialsClassInfo({ id: this.classDatasId });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
    },
    async getUnit() {
      let res = await getUnitSelect();
      let { data } = res.data;
      // console.log(res);
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
        type: "warning"
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res = await materialsDel({ id });
          this.$router.push({ path: "/routeCard_list" });
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
    async handleEdit() {
      this.$refs["obj"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法
        /* 
id: 104
materials_class_id: "53"
materials_class_name: "物料小分类1"
materials_mainclass_id: "51"
materials_mainclass_name: "物料"
materials_supplier_data: [{…}]
supplier_companyname: "00"
supplier_id: "100"
*/
        delete this.obj["supplier_id"];
        delete this.obj["supplier_companyname"];
        delete this.obj["materials_supplier_data"];
        console.log(this.obj);
        let res = await materialsEdit(this.obj);
        console.log(res);
        this.$router.go(-1);
      });
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getMaterialsInfo({ id });
    this.obj = res.data.data;
    console.log(this.obj);
    if (this.obj.materials_supplier_data.length > 0) {
      this.supplier_companyname = this.obj.materials_supplier_data[0].supplier_companyname;
      // this.obj.supplier_id = this.obj.materials_supplier_data[0].supplier_id;
    }
    // this.obj["supplier_companyname"] = "";
    // this.obj[
    //   "supplier_companyname"
    // ] = this.obj.materials_supplier_data[0].supplier_companyname;
    // this.obj["supplier_id"] = this.obj.materials_supplier_data[0].supplier_id;
    console.log(this.obj);
    this.getClassData();
    this.getUnit();
    this.getColor();
    /* 
arrival_time: "2020-07-01"
color_data: Array(1)
id: 106
instock: "0"
material_data: Array(1)
materials_class_id: "56"
materials_class_name: "里料小分类2"
materials_mainclass_id: "52"
materials_mainclass_name: "里料"
materials_supplier_data: Array(1)
materialsname: "00"
materialsno: "00"
picurl: "https://yj.ppp-pay.top/upload/20200630/20200630165547.jpg"
remarks: "00"
supplier_companyname: "炒粉有限公司"
unit: "百件"
wsale_price: "0"
*/
  }
};
</script>

<style lang="less" scoped>
.addRouteCard {
  /deep/textarea {
    width: 500px;
    height: 150px;
    resize: none !important;
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
      position: absolute;
      left: 60%;
      top: 20%;
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
      position: absolute;
      left: 85%;
      top: 20%;
    }
    .upload {
      width: 178px;
      height: 178px;
      border-radius: 10px;
      overflow: hidden;
      i {
        border: 1px solid #ccc;
      }
    }
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