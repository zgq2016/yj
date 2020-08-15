<template>
  <div class="designNote" v-if="power.indexOf('A4000200')!=-1">
    <div v-if="designRemark===0">
      <el-input type="textarea" v-model="obj.designidea" class="textarea"></el-input>
      <div class="drawing">图纸</div>
      <el-upload
        action="https://yj.ppp-pay.top/uploadpic.php"
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
      <el-button size="mini" round @click="handleKeep">保存</el-button>
    </div>
    <div class="designNoteMain" v-if="designRemark===1">
      <div class="left">
        <div style="margin:30px 0">
          <div style="font-size:16px;margin: 0px 20px 30px 0;">备注</div>
          <div
            style="font-size:14px;width:80%;margin: 10px 60px; word-wrap: break-word;  word-break: break-all; overflow: hidden;"
          >{{obj.designidea}}</div>
        </div>
        <div>
          <div style="font-size:16px;margin: 10px 0;">图纸</div>
          <div>
            <img :src="item.url" v-for="(item, index) in img_list" :key="index" alt />
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <div
            v-if="obj.design_status==='0'||obj.design_status==='2'"
            @click="design_apply"
            class="edit"
            style="background-color: #f2f2f2;"
          >
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
          <div
            v-if="obj.design_status==='1'"
            class="edit"
            style="background-color: #ffaf39;"
            @click="cancel_design_apply"
          >
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
          <div v-if="obj.design_status==='4'" class="edit" style="background-color: #01c46d;">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
          <div
            v-if="obj.design_status==='3'"
            class="edit"
            style="background-color: #fb3647;"
            @click="design_apply"
          >
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M29.152 22.848c-0.32-1.344-1.376-2.208-2.72-2.208-1.568 0-3.104-0.032-4.672 0-0.48 0.032-0.832-0.128-1.152-0.448-0.896-0.832-1.472-1.856-1.6-3.104-0.128-1.088 0.032-2.144 0.384-3.168 0.48-1.28 0.992-2.56 1.504-3.84 0.384-0.96 0.736-1.952 0.608-3.040-0.192-1.344-0.64-2.528-1.568-3.456-1.408-1.344-3.104-1.792-4.928-1.504-1.504 0.256-2.752 1.024-3.584 2.4-0.96 1.536-1.248 3.2-0.544 4.96 0.224 0.64 0.512 1.248 0.768 1.888 0.512 1.248 1.056 2.496 1.28 3.84 0.384 2.080-0.096 3.808-1.664 5.184-0.194 0.179-0.453 0.288-0.739 0.288-0.010 0-0.021-0-0.031-0l0.002 0h-4.864c-0.992 0-1.824 0.384-2.368 1.28-0.224 0.352-0.32 0.8-0.512 1.248v4.096c0.224 0.512 0.704 0.384 1.12 0.416v1.568c0 0.576 0.192 0.736 0.704 0.736h22.912c0.448 0 0.64-0.192 0.64-0.672 0.032-0.192 0-0.384 0-0.608v-1.024h0.48c0.448-0.032 0.64-0.224 0.64-0.704v-3.392c0-0.256-0.032-0.512-0.096-0.736zM27.040 28.8h-22.048v-1.12h22.048v1.12z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </div>
        <router-link
          :to="`/print?id=${this.$route.query.id}`"
          class="edit"
          style="background-color: #f2f2f2;"
        >
          <svg viewBox="64 64 896 896" width="20" height="20">
            <path
              d="M732 120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v148h440V120zm120 212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM664 844H360V568h304v276zm164-360c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"
              fill="#5e5e5e"
            />
          </svg>
        </router-link>
        <div class="edit" style="background-color: #f2f2f2;" @click="handleKeepEdit">
          <svg viewBox="0 0 32 32" width="20" height="20">
            <path
              d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
              fill="#5e5e5e"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStyle,
  styleEdit,
  styleDesignideaPicAdd,
  styleDesignideaPicDel,
  designApply,
  cancelDesignApply,
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      power: "",
      obj: {},
      designRemark: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //图片数据
    };
  },
  methods: {
    async design_apply() {
      let res = await designApply({ style_id: this.$route.query.id - 0 });
      console.log(res);
      this.init();
    },
    async cancel_design_apply() {
      let res = await cancelDesignApply({ style_id: this.$route.query.id - 0 });
      console.log(res);
      this.init();
    },
    handleKeepEdit() {
      this.designRemark = 0;
    },
    async handleKeep() {
      let { id } = this.$route.query;
      let { designidea } = this.obj;
      let res = await styleEdit({ id, designidea });
      this.init();
      this.designRemark = 1;
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
      return this.$elUploadBeforeUpload(file);
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      this.img_list = res.data.data.designidea_pic_data.map((v) => {
        return { url: v.designidea_pic_url, id: v.id };
      });
    },
  },
  mounted() {
    // console.log(this.$route.query);

    if (this.$route.query.designRemark - 0 === 0) {
      this.designRemark = this.$route.query.designRemark - 0;
    }
    this.init();
    this.power = localStorage.getItem("power");
  },
};
</script>

<style lang="less" scoped>
.designNoteMain {
  display: flex;
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
  }
}
</style>