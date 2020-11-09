<template>
  <div class="designNote" v-if="permission.indexOf('get_style_design') != -1">
    <div v-if="designRemark === 0">
      <div style="margin: 10px 0" class="drawing">备注</div>
      <el-input
        type="textarea"
        v-model="obj.designidea"
        class="textarea"
      ></el-input>
      <div style="margin: 10px 0" class="drawing">图纸</div>
      <el-upload
        :action="url + '/uploadpic.php'"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="img_list"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <el-button size="mini" style="margin: 10px 0" round @click="handleKeep"
        >保存</el-button
      >
    </div>
    <div class="designNoteMain" v-if="designRemark === 1">
      <div class="left">
        <div style="margin: 30px 0">
          <div style="font-size: 16px; margin: 0px 20px 30px 0">备注</div>
          <div
            style="
              font-size: 14px;
              width: 80%;
              margin: 10px 60px;
              word-wrap: break-word;
              word-break: break-all;
              overflow: hidden;
            "
          >
            {{ obj.designidea }}
          </div>
        </div>
        <div>
          <div style="font-size: 16px; margin: 10px 0">图纸</div>
          <div>
            <img
              :src="item.url"
              v-for="(item, index) in img_list"
              :key="index"
              alt
            />
          </div>
        </div>
      </div>
      <div class="right">
        <div
          class="push_plate_making"
          style="background-color: #f2f2f2"
          @click="get_push_plate"
          v-if="obj.pattern_status == '0'"
        >
          推送打版
        </div>
        <div class="push_plate_making" style="background-color: #f2f2f2" v-else>
          已推送打版
        </div>

        <el-tooltip
          content="加急"
          placement="top"
          class="edit"
          style="background-color: #f2f2f2; font-size: 20px"
        >
          <div
            v-if="obj.is_urgent"
            style="color: red"
            class="el-icon-warning-outline"
          ></div>
          <div
            v-else
            @click="styleUrgents"
            class="el-icon-warning-outline"
          ></div>
        </el-tooltip>

        <el-tooltip
          content="提交审批"
          placement="top"
          v-if="design_status == 1 || design_status == 3"
          class="edit"
          style="background-color: #f2f2f2"
        >
          <div @click="design_apply">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          content="设计审核中"
          placement="top"
          v-if="design_status == 2"
          class="edit"
          style="background-color: #ffaf39"
        >
          <div @click="cancel_design_apply">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          content="设计通过"
          placement="top"
          v-if="design_status == 5"
          class="edit"
          style="background-color: #01c46d"
        >
          <div>
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          content="设计不通过"
          placement="top"
          v-if="design_status == 4"
          class="edit"
          style="background-color: #fb3647"
        >
          <div @click="design_apply">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>

        <el-tooltip content="打印" placement="top">
          <div
            class="edit"
            style="background-color: #f2f2f2"
            v-print="'#printTest'"
          >
            <svg viewBox="64 64 896 896" width="20" height="20">
              <path
                d="M732 120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v148h440V120zm120 212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM664 844H360V568h304v276zm164-360c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip content="编辑" placement="top">
          <div
            class="edit"
            style="background-color: #f2f2f2"
            @click="handleKeepEdit"
          >
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
      </div>
      <div class="print">
        <Print :data="obj" />
      </div>
    </div>
    <el-dialog
      title="推送打版"
      :visible.sync="centerDialogVisible1"
      width="20%"
      center
      class="dialog1"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-select v-model="form.user_id" @change="handleUser_id($event)">
        <el-option
          v-for="item in stylists"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AssistantCancel">取 消</el-button>
        <el-button type="primary" @click="AssistantFinish">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="加急提示"
      :visible.sync="centerDialogVisible2"
      width="20%"
      center
      class="dialog1"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="text-align: center">确定是否加急！</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="AssistantFinish1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { url } from "@/api/configuration";
import {
  getStyle,
  styleEdit,
  styleDesignideaPicAdd,
  styleDesignideaPicDel,
  designApply,
  cancelDesignApply,
  styleDesignEdit,
  pushPattern,
  getStylistList,
  styleUrgent,
  getStyleDesign,
} from "@/api/researchDevelopment";
import Print from "@/components/print.vue";

export default {
  components: { Print },
  data() {
    return {
      url: url,
      obj: { pattern_status: 0, designidea: "" },
      design_status: "",
      designRemark: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //图片数据
      permission: [],
      stylists: [],
      form: {
        user_id: "",
      },
      centerDialogVisible1: false,
      centerDialogVisible2: false,
    };
  },
  methods: {
    handleUser_id(e) {
      this.form.user_id = e;
    },
    AssistantCancel() {
      this.centerDialogVisible1 = false;
    },
    async AssistantFinish() {
      let res = await pushPattern({
        style_id: this.$route.query.id,
        user_id: this.form.user_id || -1,
      });
      if (res.data.error_code == 0) {
        this.$message.success(res.data.msg);
        this.init();
        this.obj.pattern_status = 1;
      } else {
        this.$message.error(res.data.msg);
      }
      this.centerDialogVisible1 = false;
    },
    async get_push_plate() {
      this.centerDialogVisible1 = true;
    },
    async design_apply() {
      let res = await designApply({ style_id: this.$route.query.id - 0 });
      console.log(res);
      this.init();
      this.getstylist();
      this.getStyle();
    },
    async cancel_design_apply() {
      let res = await cancelDesignApply({ style_id: this.$route.query.id - 0 });
      console.log(res);
      this.init();
      this.getstylist();
      this.getStyle();
    },
    handleKeepEdit() {
      this.designRemark = 0;
    },
    async handleKeep() {
      let { id } = this.$route.query;
      let { designidea } = this.obj;
      let res = await styleDesignEdit({ id, designidea });
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      } else {
        this.init();
        this.designRemark = 1;
        this.getStyle();
      }
    }, //成功
    async handleSuccess(response, file, fileList) {
      let style_id = this.$route.query.id - 0;
      let { pic_file_url } = response.data;
      let picurl = pic_file_url;

      let res = await styleDesignideaPicAdd({ style_id, picurl });
    },
    // 移除
    async handleRemove(file, fileList) {
      let id = file.id;
      let res = await styleDesignideaPicDel({ id });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      if (this.permission.indexOf("style_designidea_pic_add") != -1) {
        return this.$elUploadBeforeUpload(file);
      } else {
        this.$message({
          showClose: true,
          message: "无权操作",
          type: "error",
        });
        return false;
      }
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyleDesign({ id });
      let { data } = res.data;
      this.obj.designidea = data.designidea;
      this.obj.id = data.id;
      this.obj.designidea_pic = data.designidea_pic;

      this.img_list = res.data.data.designidea_pic.map((v) => {
        return { url: v.designidea_pic_url, id: v.id };
      });
      if (this.img_list.length != 0) {
        this.designRemark = 1;
      }
    },
    async getstylist() {
      let res = await getStylistList({ role_id: 3 });
      let { data } = res.data;
      data.map((v) => {
        v["checked"] = false;
      });
      this.stylists = data;
    },
    async styleUrgents() {
      this.centerDialogVisible2 = true;
    },
    async AssistantFinish1() {
      this.centerDialogVisible2 = false;
      let { id } = this.$route.query;
      let res = await styleUrgent({
        style_id: id,
      });
      if (!res.data.error_code) {
        this.obj.is_urgent = 1;
      }
    },

    async getStyle() {
      let res = await getStyle({ id: this.$route.query.id });
      // console.log(res);
      this.obj.pattern_status = res.data.data.pattern_status;
      this.obj.is_urgent = res.data.data.is_urgent;
      this.design_status = res.data.data.design_status;
      console.log(this.design_status);
    },
  },
  mounted() {
    // console.log(this.$route.query);

    if (this.$route.query.designRemark - 0 === 0) {
      this.designRemark = this.$route.query.designRemark - 0;
    }
    this.init();
    this.getstylist();
    this.getStyle();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.designNoteMain {
  display: flex;
  margin-bottom: 20px;
  // .drawing{
  //   margin: 10px;
  // }
  .left {
    width: 1000px;
  }
  .right {
    flex: 1;
    display: flex;
    .edit {
      width: 30px;
      height: 30px;
      background-color: #000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 15px;
    }
    .push_plate_making {
      width: 130px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 15px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 100px;
    }
  }
  .print {
    display: none;
  }
}
</style>