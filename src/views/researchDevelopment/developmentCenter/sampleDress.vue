<template>
  <div class="sampleDress">
    <div class="sampleDressName">版次1</div>
    <div class="upload">
      <!-- <el-upload
        class="avatar-uploader"
        action="https://yj.ppp-pay.top/uploadpic.php"
        :show-file-list="false"
        :on-success="handleSampleDressFileSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="sampleDressPic" :src="sampleDressPic" class="avatar" />
        <i v-else class="el-icon-upload avatar-uploader-icon" style="font-size:16px">上传样衣图片</i>
      </el-upload>-->
      <el-upload
        action="https://yj.ppp-pay.top/uploadpic.php"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="img_list"
      >
        <i class="el-icon-plus">上传样衣图片</i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  styleSampleAdd,
  styleSampleList,
  styleSampleDel
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [] //图片数据
    };
  },
  methods: {
    async handleSuccess(response, file, fileList) {
      let style_id = this.$route.query.id - 0;
      let { pic_file_url } = response.data;
      let picurl = pic_file_url;
      let res = await styleSampleAdd({ style_id, picurl });
    },
    // 移除
    async handleRemove(file, fileList) {
      let id = file.id;
      let res = await styleSampleDel({ id });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async init() {
      let res = await styleSampleList({ style_id: this.$route.query.id - 0 });
      console.log(res);
      this.img_list = res.data.data.map(v => {
        return { url: v.picurl, id: v.id };
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.sampleDress {
  border-bottom: 1px solid #000;
  .sampleDressName {
    padding: 10px;
    font-size: 16px;
  }
  .upload {
    margin: 10px 0 30px 0;
  }
  .avatar-uploader-icon {
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 10px;
  }
  .el-icon-plus {
    font-size: 14px;
  }
}
</style>