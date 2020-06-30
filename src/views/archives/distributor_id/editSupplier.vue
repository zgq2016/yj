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
          <img v-if="obj.cardpicurl" :src="obj.cardpicurl" class="avatar" />
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
          <img v-if="obj.compicurl" :src="obj.compicurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <!-- form -->
    <div class="form">
      <el-form label-width="100px">
        <el-form-item label="公司名称">
          <el-input v-model="obj.companyname" style="width:200px" placeholder="请填写名称"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <div>
            <el-col :span="6">
              <el-select
                v-model="obj.mainclass"
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
            </el-col>
            <div @click.capture="get_class_data">
              <el-select
                v-model="obj.materials_class_name"
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
            </div>
          </div>
        </el-form-item>

        <div v-for="(item,index) in obj.contact_data" :key="item.key" class="member_user_item">
          <el-form-item :label="`联系人${index+1}`">
            <el-row>
              <el-col :span="6">
                <el-input v-model="item.contacts" style="width:200px" placeholder="请填写联系人"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="item.phone" style="width:200px" placeholder="请填写联系电话"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <span v-if="index>0" class="deleteUser" @click="handleDeleteUser(index)">-</span>
        </div>
        <el-form-item>
          <span style="cursor: pointer;" @click="handleAddUsers">增加联系人</span>
        </el-form-item>
        <div v-for="(item,index) in obj.bank_data" :key="item.key" class="member_account_item">
          <el-form-item :label="`账号信息${index+1}`">
            <el-row>
              <el-col :span="6">
                <div>
                  <el-select v-model="item.bank" placeholder="类别">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="item.name" style="width:200px" placeholder="收款人姓名"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="item.bankid" style="width:200px" placeholder="银行卡卡号"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <span v-if="index>0" class="deleteAccount" @click="handleDeleteAccount(index)">-</span>
        </div>
        <el-form-item label>
          <span style="cursor: pointer;" @click="handleAddAccount">增加账号信息</span>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="obj.address" style="width:600px" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="是否开发票">
          <el-radio-group v-model="radio">
            <el-radio :label="'0'">不开</el-radio>
            <el-radio :label="'1'">开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="税点">
          <el-input style="width:200px" v-model="obj.tax"></el-input>%
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="obj.remarks" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" style="padding:10px 50px;border-radius: 10px;">保存</el-button>
          <el-button @click="handleDel" style="padding:10px 50px;border-radius: 10px;">删除</el-button>
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
      obj: {},
      options: [],
      radio: "",
      classData: [],
      classDataName: "",
      class_datas: [],
      class_data_name: "",
      classDatasId: ""
    };
  },
  methods: {
    async handleDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await supplierDel({ id: this.obj.id });
          console.log(res);
          this.$router.push({ path: "/distributor_list" });
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
      this.obj["isbill"] = this.radio;
      console.log(this.obj);

      let res = await supplierEdit(this.obj);
      console.log(res);
      this.$router.go(-1);
    },
    // 新增联系人
    handleAddUsers() {
      this.obj.contact_data.push({
        contacts: "",
        phone: "",
        id: ""
        // key: Date.now()
      });
    },
    // 删除联系人
    handleDeleteUser(index) {
      this.obj.contact_data.splice(index, 1);
    },
    // 新增账号
    handleAddAccount() {
      this.obj.bank_data.push({
        bank: "",
        name: "",
        bankid: "",
        id: ""
        // key: Date.now()
      });
    },
    // 删除账号
    handleDeleteAccount(index) {
      this.obj.bank_data.splice(index, 1);
    },
    async getBankName() {
      let res = await getBankNameSelect();
      let { data } = res.data;
      this.options = data;
    },
    handleAvatarSuccessCard(res, file) {
      console.log(res);
      this.obj.cardpicurl = res.data.pic_file_url;
      console.log(this.cardpicurl);
    },
    handleAvatarSuccessPanels(res, file) {
      this.obj.compicurl = res.data.pic_file_url;
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

    async get_class_data() {
      console.log(this.classDatasId);
      let res = await getMaterialsClassInfo({ id: this.classDatasId });
      console.log(res);
      let { data } = res.data;
      this.class_datas = data;
    },
    handleClassDatasId(e) {
      console.log(e);
      this.classDatasId = e;
    },
    handle_class_datas_id(e) {
      // console.log(e);
      this.obj.materials_class_id = e;
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    console.log(id);
    let res = await getSupplierInfo({ id });
    this.obj = res.data.data;
    this.radio = this.obj.isbill;
    console.log(this.obj);
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