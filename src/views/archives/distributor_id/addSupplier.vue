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
          <img v-if="form.cardpicurl" :src="form.cardpicurl" class="avatar" />
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
          <img v-if="form.compicurl" :src="form.compicurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
            <el-form-item
              :prop="'contact.'+index+'.phone'"
              :rules="contactRules.contact_phone"
            >
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
            <el-form-item
              :prop="'bank.'+index+'.bankid'"
              :rules="bankRules.bank_bankid"
            >
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
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
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
export default {
  data() {
    return {
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
      options: [],
      classData: [],
      classDataName: "",
      class_datas: [],
      class_data_name: "",
      classDatasId: "",
      // 表单规则
      rules: {
        companyname: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        mainclass: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        materials_class_name: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        tax: [{ required: true, message: "请填写商品数量", trigger: "blur" }],
        remarks: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ]
      },
      contactRules: {
        contact_contacts: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        contact_phone: [
          { required: true, message: "请填写优惠价格", trigger: "blur" }
        ]
      },
      bankRules: {
        bank_bank: [
          { required: true, message: "请填写商品数量", trigger: "blur" }
        ],
        bank_name: [
          { required: true, message: "请填写优惠价格", trigger: "blur" }
        ],
        bank_bankid: [
          { required: true, message: "请填写优惠价格", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
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

    async get_class_data() {},
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.form.mainclass_id
      });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class_name = this.class_datas.class_data[0].classname;
      this.form.materials_class_id = this.class_datas.class_data[0].id;
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
}
</style>