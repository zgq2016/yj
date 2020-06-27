<template>
  <div class="patternStatus">
    <div class="pattern">
      <!-- 纸样文件 -->
      <div class="patternFile">
        <div class="patternFileName">纸样文件</div>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handlePatternFileSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="patternFilePic" :src="patternFilePic" class="avatar" />
            <div  v-else  class="imag">
              <div slot="tip" class="el-upload__tip ">
                只能上传jpg/png文件，且不超过2M
              </div>
              <el-button size="small">点击上传</el-button>  
            </div>
            <!-- <i v-else class="avatar-uploader-icon el-icon-plus"></i> -->
          </el-upload>
        </div>
      </div>
      <!-- 放码文件 -->
      <div class="codeFile">
        <div class="codeFileName">放码文件</div>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :show-file-list="false"
            :on-success="handlecodeFileSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="codeFilePic" :src="codeFilePic" class="avatar" />
           <div  v-else  class="imag">
              <div slot="tip" class="el-upload__tip ">
                只能上传jpg/png文件，且不超过2M
              </div>
              <el-button size="small">点击上传</el-button>  
            </div>
          </el-upload>
        </div>
      </div>
      <!-- 尺码表 -->
      <div class="sizeSpecification">
        <div class="sizeSpecificationName">尺码表</div>
      </div>
      <!-- 物料用量 -->
      <div class="materialUsage">
        <div class="materialUsageName">物料用量</div>
        <div class="cardList">
          <div class="card">
            <div class="cardStyle">
              <div class="cardStyle_left">
                <div class="cardStyle_left_img">
                  <img
                    src="https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__07d4f05b25ce4b0e9a0dbdfec7c6ba15.svg"
                    alt
                  />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>面料</div>
                    <div class="el-icon-close"></div>
                  </div>
                  <div>水印花系列</div>
                  <div>内部编号:895565562223</div>
                  <div>某某布行</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin:10px">大货用量</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                  <div class="antistop">
                    <label for style="margin:10px">损耗</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="cardStyle">
              <div class="cardStyle_left">
                <div class="cardStyle_left_img">
                  <img
                    src="https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__07d4f05b25ce4b0e9a0dbdfec7c6ba15.svg"
                    alt
                  />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>面料</div>
                    <div class="el-icon-close"></div>
                  </div>
                  <div>水印花系列</div>
                  <div>内部编号:895565562223</div>
                  <div>某某布行</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin:10px">大货用量</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                  <div class="antistop">
                    <label for style="margin:10px">损耗</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="cardStyle">
              <div class="cardStyle_left">
                <div class="cardStyle_left_img">
                  <img
                    src="https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__07d4f05b25ce4b0e9a0dbdfec7c6ba15.svg"
                    alt
                  />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>面料</div>
                    <div class="el-icon-close"></div>
                  </div>
                  <div>水印花系列</div>
                  <div>内部编号:895565562223</div>
                  <div>某某布行</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin:10px">大货用量</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                  <div class="antistop">
                    <label for style="margin:10px">损耗</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="cardStyle">
              <div class="cardStyle_left">
                <div class="cardStyle_left_img">
                  <img
                    src="https://axure-file.lanhuapp.com/b0e7ed9c-a55b-4903-972b-002bbf42cf81__07d4f05b25ce4b0e9a0dbdfec7c6ba15.svg"
                    alt
                  />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>面料</div>
                    <div class="el-icon-close"></div>
                  </div>
                  <div>水印花系列</div>
                  <div>内部编号:895565562223</div>
                  <div>某某布行</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin:10px">大货用量</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                  <div class="antistop">
                    <label for style="margin:10px">损耗</label>
                    <el-input v-model="dosageCargo" placeholder="请输入内容" style="width:100px"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 删除历史 -->
      <div class="delHistory">
        <div class="delHistoryName">删除历史</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patternFilePic: "", //版次图片
      codeFilePic: "",
      dosageCargo: ""
    };
  },
  methods: {
    handlePatternFileSuccess(res, file) {
      this.patternFilePic = res.data.pic_file_url;
    },
    handlecodeFileSuccess(res, file) {
      this.codeFilePic = res.data.pic_file_url;
    },
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
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.patternStatus {
  .pattern {
    .patternFile {
      border-bottom: 1px solid #000;
      .patternFileName {
        padding: 10px;
        font-size: 16px;
      }
    }
    .codeFile {
      border-bottom: 1px solid #000;
      .codeFileName {
        padding: 10px;
        font-size: 16px;
      }
    }
    .sizeSpecification {
      border-bottom: 1px solid #000;
      .sizeSpecificationName {
        height: 200px;
        padding: 10px;
        font-size: 16px;
      }
    }
    .materialUsage {
      border-bottom: 1px solid #000;
      .materialUsageName {
        padding: 10px;
        font-size: 16px;
      }
      .cardList {
        display: flex;
        flex-wrap: wrap;
        .card {
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .cardStyle {
            width: 500px;
            height: 100px;
            display: flex;
            .cardStyle_left {
              width: 260px;
              display: flex;
              background-color: #f2f2f2;
              border-radius: 10px;
              .cardStyle_left_img {
                img {
                  width: 100px;
                  height: 100px;
                }
              }
              .cardStyle_left_content {
                flex: 1;
                div {
                  margin: 2px;
                }
                .cardStyle_left_content_name {
                  font-weight: 600;
                  font-size: 14px;
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
            .cardStyle_right {
              background-color: #f2f2f2;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              .antistop {
                display: flex;
                justify-content: space-between;
                margin: 5px;
              }
            }
          }
        }
      }
    }
    .delHistory {
      border-bottom: 1px solid #000;
      .delHistoryName {
        padding: 10px;
        font-size: 16px;
      }
    }
  }
  .upload{

    margin: 10px 0 30px 0;
    /deep/.el-upload{
      border: 0;
      background: #fff;
    }
    .imag{
      overflow: hidden;
      width: 450px;
      height: 50px;
      padding: 10px 0 0 0;
      text-indent: 3em;
      border: 1px solid #ccc;
      border-radius: 10px;
      .el-upload__tip {
        float: left;
      }
      .el-button{
        float: right;
        border: 0;
      }
    }
  }
}
</style>