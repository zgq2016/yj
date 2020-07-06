<template>
  <div class="patternStatus">
    <div class="pattern">
      <!-- 纸样文件 -->
      <div class="patternFile">
        <div class="patternFileName">纸样文件</div>
        <div class="upload">
          <el-upload
            class="upload-demo"
            action="https://yj.ppp-pay.top/uploadpic.php"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="img_list"
            list-type="picture"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <!-- 放码文件 -->
      <!-- <div class="codeFile">
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
            <div v-else class="imag">
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
              <el-button size="small">点击上传</el-button>
            </div>
          </el-upload>
        </div>
      </div>-->
      <!-- 尺码表 -->
      <!-- <div class="sizeSpecification">
        <div class="sizeSpecificationName">尺码表</div>
      </div>-->
      <!-- 物料用量 -->
      <div class="materialUsage">
        <div class="materialUsageName">物料用量</div>
        <div class="cardList">
          <div class="card" v-for="(item, index) in MaterialsList" :key="index">
            <div class="cardStyle">
              <div
                class="cardStyle_left"
                v-for="(item1, index1) in item.materials_data"
                :key="index1"
              >
                <div class="cardStyle_left_img">
                  <img :src="item1.picurl" alt />
                </div>
                <div class="cardStyle_left_content">
                  <div class="cardStyle_left_content_name">
                    <div>({{item1.mainclass}})</div>
                    <!-- <div class="el-icon-close"></div> -->
                  </div>
                  <div>{{item1.materialsname}}</div>
                  <div>内部编号:{{item1.materialsno}}</div>
                  <div v-if="item1.supplier_data.length>0">{{item1.supplier_data[0].companyname}}</div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin:10px">大货用量</label>
                    <el-input
                      @input="handleInputMaxusage(item,index)"
                      v-model="item.maxusage"
                      placeholder="请输入内容"
                      style="width:100px"
                      :disabled="antistopActive"
                    ></el-input>
                  </div>
                  <div class="antistop">
                    <label for style="margin:10px">损耗</label>
                    <el-input
                      @input="handleInputLoss(item,index)"
                      v-model="item.loss"
                      placeholder="请输入内容"
                      style="width:100px"
                      :disabled="antistopActive"
                    ></el-input>
                  </div>
                </div>
                <!-- <div v-if="antistopActive===true">
                  <div class="antistop">
                    <div style="margin:10px">大货用量</div>
                    <div style="width:100px"></div>
                  </div>
                  <div class="antistop">
                    <div style="margin:10px">损耗</div>
                    <div style="width:100px"></div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div v-if="antistopActive==true">
          <el-button @click="modification" type="primary">修改</el-button>
        </div>
        <div v-if="antistopActive==false">
          <el-button @click="affirm" type="primary">确认</el-button>
        </div>
        <!-- <button @click="antistopActive=false">修改</button>
        <button @click="antistopActive=true">确认</button>-->
      </div>
      <!-- 删除历史 -->
      <div class="delHistory">
        <div class="delHistoryName">删除历史</div>
        <div class="delList">
          <div class="list" v-for="(item, index) in DelList" :key="index">
            <div class="list_name">
              <div class="img">
                <img :src="item.picurl" alt />
              </div>
              <div class="name">{{item.uid}}</div>
            </div>
            <div class="restore" @click="Resume(item)">还原</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  stylePaperpatternList,
  getStyle,
  stylePaperpatternAdd,
  stylePaperpatternDel,
  styleMaterialsUseList,
  styleMaterialsUseEdit,
  stylePaperpatternDelList,
  stylePaperpatternResume
} from "@/api/researchDevelopment";
export default {
  data() {
    return {
      dosageCargo: "",

      obj: {},
      img_list: [],

      dialogImageUrl: "",
      dialogVisible: false,

      MaterialsList: [],
      DelList: [],

      antistopActive: false
    };
  },
  methods: {
    modification() {
      this.antistopActive = false;
    },
    affirm() {
      this.antistopActive = true;
    },
    async handleInputMaxusage(e, index) {
      // if (e.maxusage === "") {
      //   e.maxusage = "0";
      // }
      // if (e.maxusage !== "0") {
      //   e.maxusage = e.maxusage.replace(/[^0-9-]+/, "");
      // }
      this.MaterialsList.map((v, i) => {
        console.log(v);
        if (index === i) {
          v.maxusage = e.maxusage.replace(/[^0-9-]+/, "");
        }
      });
      console.log(this.MaterialsList);
      // let res = await styleMaterialsUseEdit({
      //   id: e.id,
      //   maxusage: e.maxusage
      // });
      // this.MaterialsInit();
    },
    async handleInputLoss(e, index) {
      // if (e.loss === "") {
      //   e.loss = "0";
      // }
      // if (e.loss !== "0") {
      //   e.loss = e.loss.replace(/[^0-9-]+/, "");
      // }
      this.MaterialsList.map((v, i) => {
        console.log(v);
        if (index === i) {
          v.loss = e.loss.replace(/[^0-9-]+/, "");
        }
      });
      console.log(this.MaterialsList);
      // let res = await styleMaterialsUseEdit({
      //   id: e.id,
      //   loss: e.loss
      // });
      // this.MaterialsInit();
    },
    // 成功
    async handleSuccess(response, file, fileList) {
      let { pic_file_url } = response.data;
      let picurl = pic_file_url;
      let res = await stylePaperpatternAdd({
        style_id: this.obj.id,
        picurl,
        uid: file.name
      });
      this.init();
    },
    // 移除
    async handleRemove(file, fileList) {
      let id = file.id;
      let res = await stylePaperpatternDel({ id });
      this.init();
      // this.PaperpatternDelInit();
    },
    // 预览
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
      let res1 = await stylePaperpatternList({ style_id: this.obj.id });
      this.img_list = res1.data.data.map(v => {
        return { url: v.picurl, id: v.id, name: v.uid };
      });
      this.PaperpatternDelInit();
      this.MaterialsInit();
    },
    async PaperpatternDelInit() {
      let res = await stylePaperpatternDelList({ style_id: this.obj.id });
      this.DelList = res.data.data;
    },
    async MaterialsInit() {
      let res = await styleMaterialsUseList({ style_id: this.obj.id });
      res.data.data.map((v, i) => {
        if (v.maxusage === "0") {
          v.maxusage = "";
        }
        if (v.loss === "0") {
          v.loss = "";
        }
      });
      this.MaterialsList = res.data.data;
      console.log(this.MaterialsList);
    },
    async Resume(e) {
      let res = await stylePaperpatternResume({ id: e.id });
      this.init();
    }
  },
  mounted() {
    this.init();
    this.antistopActive = true;
  }
};
</script>

<style lang="less" scoped>
.patternStatus {
  min-height: 800px;
  .pattern {
    .patternFile {
      border-bottom: 1px solid #000;
      .patternFileName {
        width: 300px;
        padding: 10px;
        font-size: 16px;
      }
      .upload {
        width: 400px;
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
              overflow: hidden;
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
      .delList {
        padding: 10px 0;
        .list {
          margin: 10px 0;
          width: 400px;
          height: 90px;
          display: flex;
          border: 1px solid #000;
          .list_name {
            display: flex;
            flex: 1;
            .img {
              width: 90px;
              padding: 10px;
              img {
                width: 70px;
                height: 70px;
              }
            }
            .name {
              width: 250px;
              height: 16px;
              margin-top: 35px;
              display: -webkit-box;
              overflow: hidden;
              white-space: normal !important;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          .restore {
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .upload {
    margin: 10px 0 30px 0;
    /deep/.el-upload {
      border: 0;
      background: #fff;
    }
    .imag {
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
      .el-button {
        float: right;
        border: 0;
      }
    }
  }
}
</style>