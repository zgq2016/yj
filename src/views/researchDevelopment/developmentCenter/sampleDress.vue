<template>
  <div class="sampleDress">
    <div class="sampleDressName">版次1</div>
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        action="https://yj.ppp-pay.top/uploadpic.php"
        :show-file-list="false"
        :on-success="handleSampleDressFileSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="sampleDressPic" :src="sampleDressPic" class="avatar" />
        <i v-else class="el-icon-upload avatar-uploader-icon" style="font-size:16px">上传样衣图片</i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleDressPic: "" //版次图片
    };
  },
  methods: {
    handleSampleDressFileSuccess(res, file) {
      this.sampleDressPic = res.data.pic_file_url;
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
    }
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
  .upload{
    margin: 10px 0 30px 0;
  }
  .avatar-uploader-icon{
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 10px;
  }
}
</style>