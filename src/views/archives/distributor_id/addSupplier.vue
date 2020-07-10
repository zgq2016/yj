<template>
  <div class="addSupplier">
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
    </div>
    <!-- form -->
    <div class="form">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="公司名称" prop="companyname">
          <el-input v-model="form.companyname" style="width:200px" placeholder="请填写名称"></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-col :span="6">
            <el-form-item label="分类" prop="mainclass">
              <el-select
                v-model="form.mainclass"
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
          </el-col>
        </div>

        <div v-for="(item,index) in form.contact" :key="item.key" class="member_user_item">
          <el-col :span="6">
            <el-form-item
              :label="`联系人${index+1}`"
              :prop="'contact.'+index+'.contacts'"
              :rules="contactRules.contact_contacts"
            >
              <el-input v-model="item.contacts" style="width:200px" placeholder="请填写联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :prop="'contact.'+index+'.phone'" :rules="contactRules.contact_phone">
              <el-input v-model="item.phone" style="width:200px" placeholder="请填写联系电话"></el-input>
            </el-form-item>
          </el-col>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleAddUsers">增加联系人</span>
        </el-form-item>
        <div v-for="(item,index) in form.bank" :key="item.key" class="member_account_item">
          <el-col :span="6">
            <el-form-item
              :label="`账号信息${index+1}`"
              :prop="'bank.'+index+'.bank'"
              :rules="bankRules.bank_bank"
            >
              <el-select v-model="item.bank" placeholder="类别" style="width:200px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :prop="'bank.'+index+'.name'" :rules="bankRules.bank_name">
              <el-input v-model="item.name" style="width:200px" placeholder="收款人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :prop="'bank.'+index+'.bankid'" :rules="bankRules.bank_bankid">
              <el-input v-model="item.bankid" style="width:200px" placeholder="银行卡卡号"></el-input>
            </el-form-item>
          </el-col>
          <span v-if="index>0" class="deleteAccount" @click="handleDeleteAccount(index)">-</span>
        </div>
        <el-form-item label>
          <span style="cursor: pointer;" @click="handleAddAccount">增加账号信息</span>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" style="width:600px" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="是否开发票" prop="isbill">
          <el-radio-group v-model="form.isbill">
            <el-radio :label="'0'">不开</el-radio>
            <el-radio :label="'1'">开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="税点" prop="tax">
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
  getMaterialsClassInfo
} from "@/api/archives";

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
      form: {
        address: "",
        bank: [
          {
            bank: "",
            name: "",
            bankid: "",
            id: ""
          }
        ],

        cardpicurl: "",
        companyname: "",

        compicurl: "",
        contact: [{ contacts: "", phone: "", id: "" }],
        ctime: "",
        id: "",
        isbill: "",
        mainclass: "",
        mainclass_id: "",
        materials_class_id: "",
        materials_class_name: "",
        remarks: "",
        tax: ""
      },
      status: "",
      options: [],
      classData: [],
      classDataName: "",
      class_datas: [],
      class_data_name: "",
      classDatasId: "",
      // 表单规则
      rules: {
        companyname: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        mainclass: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        materials_class_name: [
          { required: true, message: "请选择二级分类", trigger: "change" }
        ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
        tax: [{ required: true, message: "请填写税点", trigger: "blur" }],
        isbill: [
          { required: true, message: "请选择是否发票", trigger: "change" }
        ]
      },
      contactRules: {
        contact_contacts: [
          { required: true, message: "请填写联系人名称", trigger: "blur" }
        ],
        contact_phone: [
          { required: true, message: "请填写联系人号码", trigger: "blur" }
        ]
      },
      bankRules: {
        bank_bank: [
          { required: true, message: "请选择银行", trigger: "change" }
        ],
        bank_name: [
          { required: true, message: "请填写卡号名称", trigger: "blur" }
        ],
        bank_bankid: [
          { required: true, message: "请填写银行卡号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
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
    //上传图片（点击上传按钮）
    finish(type) {
      console.log(this.status);
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
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        // 调用actions的登录方法

        console.log(this.form);
        let res = await supplierAdd(this.form);
        console.log(res);
        this.$router.go(-1);
        // }
      });
    },

    // 新增联系人
    handleAddUsers() {
      this.form.contact.push({
        contacts: "",
        phone: "",
        id: ""
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
        id: ""
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

    async get_class_data() {},
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.form.mainclass_id
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
    }
  },
  async mounted() {
    this.getBankName();
    let res1 = await getMaterialsClass();
    this.classData = res1.data.data;
  }
};
</script>

<style lang="less" scoped>
.addSupplier {
  .upload {
    display: flex;
    .upload_card {
      display: flex;
      width: 40%;
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
    .upload_panels {
      display: flex;
      width: 40%;
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
        position: absolute;
        left: 85%;
        top: 20%;
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