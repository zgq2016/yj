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
    <div v-if="designRemark===1">
      <div style="display:flex;align-items: center;">
        <el-button
          style
          type="primary"
          @click="design_apply"
          v-if="obj.design_status==='0'||obj.design_status==='2'||obj.design_status==='3'"
        >提交审核</el-button>
        <el-button
          style
          type="primary"
          v-if="obj.design_status==='1'"
          @click="cancel_design_apply"
        >取消审核</el-button>
        <!-- ,0:添加款式,1:设计审核中,2.撤回审核 3设计不通过,4设计通过 -->
        <span v-if="obj.design_status==='0'">添加款式</span>
        <span v-if="obj.design_status==='1'">设计审核中</span>
        <span v-if="obj.design_status==='2'">撤回审核</span>
        <span v-if="obj.design_status==='3'">设计审核不通过</span>
        <span v-if="obj.design_status==='4'">设计审核通过</span>
      </div>
      <div style="width:100%;">
        <span
          class="el-icon-edit-outline"
          style="font-size: 40px;color: #ffa500;cursor: pointer;width:40px;height:40px;margin-left:30px;"
          @click="handleKeepEdit"
          v-if="power.indexOf('A4000100')!=-1"
        ></span>
        <div style="margin:30px 0">
          <div style="font-size:16px;margin: 0px 20px 30px 0;">备注</div>
          <div
            style="font-size:14px;width:80%;margin: 10px 60px; word-wrap: break-word;  word-break: break-all; overflow: hidden;"
          >{{obj.designidea}}</div>
        </div>
        <div>
          <div style="font-size:16px;margin: 10px 20px;">图纸</div>
          <div>
            <img :src="item.url" v-for="(item, index) in img_list" :key="index" alt />
          </div>
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

<style>
</style>