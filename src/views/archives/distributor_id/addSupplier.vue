<template>
  <div class="addSupplier">
    <!-- 图片 -->
    <div class="upload">
      <!-- 商标/名片 -->
      <div class="upload_card">
        <div class="upload_name">商标/名片</div>
        <el-upload
          class="avatar-uploader"
          action="https://yj.ppp-pay.top/uploadpic.php"
          :show-file-list="false"
          :on-success="handleAvatarSuccessCard"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="cardpicurl" :src="cardpicurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 门面照 -->
      <div class="upload_panels">
        <div class="upload_name">门面照</div>
        <el-upload
          class="avatar-uploader"
          action="https://yj.ppp-pay.top/uploadpic.php"
          :show-file-list="false"
          :on-success="handleAvatarSuccessPanels"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="compicurl" :src="compicurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <!-- form -->
    <div class="form">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item prop="companyname" label="公司名称">
          <el-input v-model="form.companyname" style="width:200px" placeholder="请填写名称"></el-input>
        </el-form-item>

        <el-form-item prop="classData" style="display:inline-block" label="分类">
          <el-select
            v-model="form.classData"
            placeholder="请选择"
            @change="handleClassDatasId($event)"
          >
            <el-option
              v-for="item in classData"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form_l" style="display:inline-block;" prop="class_data_name">
          <el-select
            v-model="form.class_data_name"
            placeholder="料属性"
            @change="handle_class_datas_id($event)"
          >
            <el-option
              v-for="item in class_datas.class_data"
              :key="item.id"
              :label="item.classname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- prop="contacts" -->
        <el-form-item
          class="member_user_item"
          v-for="(item,index) in form.contact"
          :key="item.key"
          :label="`联系人${index+1}`"
        >
          <el-row>
            <el-col :span="6">
              <el-input
                v-model="form.contact[index].contacts"
                style="width:200px"
                placeholder="请填写联系人"
               
                id="contacts"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-input
                v-model="form.contact[index].phone"
                style="width:200px; border-radius:4px;"
                placeholder="请填写联系电话"
              
                id="phone"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <em v-if="bl1" style="font-size:10px;color: #F56C6C;">请填写联系人</em>
              <span v-if="!bl1" style="width:100%;display:block;height:40px;"></span>
            </el-col>
            <el-col :span="6">
              <em v-if="bl2" style="font-size:10px;color: #F56C6C;">请输入正确电话号码</em>
            </el-col>
          </el-row>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </el-form-item>
        <el-form-item>
          <span @click="handleAddUsers" style="cursor: pointer;">增加联系人</span>
        </el-form-item>

        <el-form-item
          class="member_account_item"
          v-for="(item,index) in form.banks"
          :key="item.key"
          :label="`账号信息${index+1}`"
        >
          <el-row>
            <el-col :span="6">
              <div></div>
              <el-select v-model="form.banks[index].bank" placeholder="类别">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input v-model="form.banks[index].name" style="width:200px" placeholder="收款人姓名"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="form.banks[index].bankid" style="width:200px" placeholder="银行卡卡号"></el-input>
            </el-col>
          </el-row>
          <span v-if="index>0" class="deleteAccount" @click="handleDeleteAccount(index)">-</span>
        </el-form-item>
        <!-- </div> -->
        <el-form-item label>
          <span style="cursor: pointer;" @click="handleAddAccount">增加账号信息</span>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="form.address" style="width:600px" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item prop="isbill" label="是否开发票">
          <el-radio-group v-model="form.isbill">
            <el-radio :label="0">不开</el-radio>
            <el-radio :label="1">开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="tax" label="税点">
          <el-input
            style="width:200px"
            v-model="form.tax"
            :maxlength="inputMaxL"
            @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(tax) ? null : tax.length - 1"
          ></el-input>%
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  supplierAdd,
  getBankNameSelect,
  getMaterialsClass,
  getMaterialsClassInfo
} from "@/api/archives";
export default {
  data() {
    return {
      cardpicurl: "",
      compicurl: "",
      form: {
        companyname: "",
        address: "",
        remarks: "",
        tax: "",
        classData: "",
        class_data_name: "",
        contact: [{ contacts: "", phone: "", id: "" }],
        banks: [
          {
            bank: "",
            name: "",
            bankid: "",
            id: ""
          }
        ],
        radio: ""
      },
      tax: "",
      radio: "",
      options: [],
      contact: [
        {
          contacts: "",
          phone: "",
          id: ""
          // key: Date.now()
        }
      ], //新增联系人
      banks: [
        {
          bank: "",
          name: "",
          bankid: "",
          id: ""
          // key: Date.now()
        }
      ], //新增账号信息
      inputMaxL: 1,
      classData: [],
      classDataName: "",
      class_datas: [],
      class_data_name: "",
      classDatasId: "",
      bl: false,
      bl1: false,
      bl2: false,
      rules: {
        companyname: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        classData: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        class_data_name: [
          { required: true, message: "请选择小分类", trigger: "change" }
        ],
        contacts: [
          {
            type: "array",
            required: true,
            message: "请至少填写一个联系人信息",
            trigger: "blur"
          }
        ],
        phone: [
          {
            type: "array",
            required: true,
            message: "请至少填写一个联系人信息",
            trigger: "blur"
          },
          {
            min: 11,
            max: 12,
            message: "长度在 11 到 12 个字符",
            trigger: "blur"
          }
        ],
        banks: [
          {
            type: "array",
            required: true,
            message: "请至少填写一个银行卡信息",
            trigger: "blur"
          }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        isbill: [
          { required: true, message: "请选择是否开发票", trigger: "change" }
        ],
        tax: [{ required: true, message: "请输入税点", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击保存
    onSubmit() {
      // let { id } = this.$route.query;
      // let contacts = document.getElementById("contacts");
      // let phone = document.getElementById("phone");

      this.$refs["form"].validate(async valid => {
        // this.form.contact.map((v, i) => {
        //   if (v.contacts == "") {
        //     this.bl = true;
        //     this.bl1 = true;
        //     contacts.style.border = "1px solid #F56C6C";
        //   }
        //   if (v.phone == "") {
        //     this.bl = true;
        //     this.bl2 = true;
        //     phone.style.border = "1px solid #F56C6C";

        //   } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(v.phone))) {
        //     this.bl = true;
        //     this.bl2 = true;
        //     phone.style.border = "1px solid #F56C6C";
        //   }
        // });
        if (!valid) return;

        // if (!this.bl) {
        contacts.style.border = "1px solid #DCDFE6";
        phone.style.border = "1px solid #DCDFE6";
        let obj = this.form;
        obj["materials_class_id"] = this.materials_class_id;
        obj["cardpicurl"] = this.cardpicurl;
        obj["compicurl"] = this.compicurl;
        let res = await supplierAdd(obj);
        console.log(res);
        this.$router.go(-1);
        // }
      });
    },
    // contactBlur1(){
    //   let contacts = document.getElementById("contacts");
    // },
    // contactBlur2(){
    //   let phone = document.getElementById("phone");
    // },
    // 新增联系人
    handleAddUsers() {
      this.form.contact.push({
        contacts: "",
        phone: "",
        id: ""
        // key: Date.now()
      });
    },
    // 新增账号
    handleAddAccount() {
      this.form.banks.push({
        bank: "",
        name: "",
        bankid: "",
        id: ""
        // key: Date.now()
      });
    },
    // 删除联系人
    handleDeleteUser(index) {
      this.form.contact.splice(index, 1);
    },
    // 删除账号
    handleDeleteAccount(index) {
      this.form.bank.splice(index, 1);
    },
    handleAvatarSuccessCard(res, file) {
      console.log(res);
      this.cardpicurl = res.data.pic_file_url;
      console.log(this.cardpicurl);
    },
    handleAvatarSuccessPanels(res, file) {
      this.compicurl = res.data.pic_file_url;
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

    // async get_class_data() {
    //   console.log(this.classDatasId);
    //   let res = await getMaterialsClassInfo({ id: this.classDatasId });
    //   console.log(res);
    //   let { data } = res.data;
    //   this.class_datas = data;
    // },
    async handleClassDatasId(e) {
      console.log(e);
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({ id: this.classDatasId });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
    },
    handle_class_datas_id(e) {
      // console.log(e);
      this.materials_class_id = e;
    }
  },
  async mounted() {
    let res = await getBankNameSelect();
    // console.log(res);
    let { data } = res.data;
    this.options = data;
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
    }
    .upload_panels {
      display: flex;
      width: 40%;
      height: 200px;
      .upload_name {
        margin: 0 30px;
      }
    }
  }
  .form {
    .form_l {
      /deep/.el-form-item__content {
        margin-left: 12px !important;
      }
    }
    .member_user_item {
      border-bottom: 1px #eee dashed;
      position: relative;
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
        left: 80%;
        top: 20%;
      }
    }
  }
  /deep/textarea {
    width: 500px;
    height: 150px;
    resize: none !important;
  }
}
</style>