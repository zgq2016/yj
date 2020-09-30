<template>
  <div class="patternStatus">
    <div class="pattern">
      <!-- 纸样文件 -->
      <div
        class="patternFile"
        v-if="permission.indexOf('style_paperpattern_list') != -1"
      >
        <div style="display: flex">
          <div class="patternFileName">纸样文件</div>
          <div
            class="push_plate_making"
            style="background-color: #f2f2f2"
            @click="get_push_plate"
            v-if="obj.sample_status == 0"
          >
            推送制版
          </div>
          <div
            class="push_plate_making"
            style="background-color: #f2f2f2"
            v-else
          >
            已推送制版
          </div>
        </div>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            :action="url + '/uploadpic.php'"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            v-if="fileList.length == 0"
            :on-exceed="handleExceed"
          >
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <div
              class="imag"
              v-if="permission.indexOf('style_paperpattern_add') != -1"
            >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2M
              </div>
              <el-button size="small">点击上传</el-button>
            </div>
          </el-upload>
          <div class="texts" v-else>
            <span class="contet" v-if="fileList[0]"
              >{{ fileList.urlName }} {{ fileList[0].name }} 提交于
              {{ fileList[0].create_time }}</span
            >
            <span class="btn" @click="handleRemove">删除</span>
            <!--  -->
          </div>
          <el-button
            size="small"
            v-if="fileList.length > 0"
            class="round"
            round
          >
            <a
              :href="
                'https://yj.ppp-pay.top/webapi.php/?g=download&url=' +
                fileList[0].picurl
              "
              >下载</a
            >
          </el-button>
        </div>
      </div>
      <!-- 放码文件 -->
      <div class="codeFile">
        <div class="codeFileName">放码文件</div>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            v-if="codeFilePic.length == 0"
            :action="url + '/uploadpic.php'"
            :on-success="handlecodeFileSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="imag">
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2M
              </div>
              <el-button size="small">点击上传</el-button>
            </div>
          </el-upload>
          <div class="texts" v-else>
            <span class="contet" v-if="codeFilePic[0]"
              >{{ codeFilePic.urlName }} {{ codeFilePic[0].name }} 提交于
              {{ codeFilePic[0].create_time }}</span
            >
            <span class="btn" @click="MeasurementDel">删除</span>
          </div>
          <el-button
            v-if="codeFilePic.length > 0"
            size="small"
            class="round"
            round
          >
            <a
              :href="
                'https://yj.ppp-pay.top/webapi.php/?g=download&url=' +
                codeFilePic[0].picurl
              "
              >下载</a
            >
          </el-button>
        </div>
      </div>
      <div class="measurement">
        <div class="measurementnav">尺寸表</div>
        <div class="tables">
          <div class="boxed">
            <span class="childed">
              <span
                class="hed"
                v-for="(item, index) in tableData"
                :key="index"
                >{{ item.name }}</span
              >
            </span>
            <span class="list">
              <span class="over1">
                <span class="hed1" v-for="(item1, a) in units" :key="a">{{
                  item1.name
                }}</span>
              </span>
              <!-- <span class="over1">
                <span class="hed1" v-for="(item3,c) in units" :key="c">
                  <el-input v-if="vs" v-model="item3.unit" size="mini" placeholder="请输入内容"></el-input>
                  <p v-else>{{item3.unit}}</p>
                </span>
              </span>-->
              <span class="over1">
                <span class="hed1" v-for="(item2, b) in units" :key="b">
                  <el-input
                    v-if="vs"
                    v-model="item2.size"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <p v-else>{{ item2.size }}</p>
                </span>
              </span>
            </span>
          </div>
        </div>
        <div class="adds">
          <div v-if="!vs">
            <el-button @click="modification1" type="primary">修改</el-button>
          </div>
          <div v-else>
            <el-button @click="affirm1" type="primary">确认</el-button>
          </div>
        </div>
      </div>
      <!-- 物料用量 -->
      <div
        class="materialUsage"
        v-if="permission.indexOf('style_materials_use_list') != -1"
      >
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
                    <div>({{ item1.mainclass }})</div>
                    <!-- <div class="el-icon-close"></div> -->
                  </div>
                  <div>{{ item1.materialsname }}</div>
                  <div>内部编号:{{ item1.materialsno }}</div>
                  <div v-if="item1.supplier_data.length > 0">
                    {{ item1.supplier_data[0].companyname }}
                  </div>
                </div>
              </div>
              <div class="cardStyle_right">
                <div>
                  <div class="antistop">
                    <label for style="margin: 10px">大货用量</label>
                    <el-input
                      @input="handleInputMaxusage(item, index)"
                      v-model="item.maxusage"
                      placeholder="请输入内容"
                      style="width: 100px"
                      :disabled="antistopActive"
                      v-if="!antistopActive"
                    ></el-input>
                    <span
                      style="
                        width: 100px;
                        height: 30px;
                        text-align: center;
                        display: block;
                        line-height: 30px;
                      "
                      v-else
                      >{{ item.maxusage }}</span
                    >
                  </div>
                  <div class="antistop">
                    <label for style="margin: 10px">损耗</label>
                    <el-input
                      @input="handleInputLoss(item, index)"
                      v-model="item.loss"
                      placeholder="请输入内容"
                      style="width: 100px"
                      :disabled="antistopActive"
                      v-if="!antistopActive"
                    ></el-input>
                    <span
                      style="
                        width: 100px;
                        height: 30px;
                        text-align: center;
                        display: block;
                        line-height: 30px;
                      "
                      v-else
                      >{{ item.loss }}</span
                    >
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
        <div
          style="margin: 10px 0"
          v-if="permission.indexOf('style_materials_use_edit') != -1"
        >
          <div v-if="antistopActive == true">
            <el-button @click="modification" type="primary">修改</el-button>
          </div>
          <div v-if="antistopActive == false">
            <el-button @click="affirm" type="primary">确认</el-button>
          </div>
        </div>
        <!-- <button @click="antistopActive=false">修改</button>
        <button @click="antistopActive=true">确认</button>-->
      </div>

      <!-- 删除历史 -->
      <div class="delHistory">
        <div class="delHistoryName">删除历史</div>
        <div
          class="delList"
          v-if="permission.indexOf('style_paperpattern_del_list') != -1"
        >
          <span v-if="DelList.length > 0">纸样文件</span>
          <div class="list" v-for="(item, index) in DelList" :key="index">
            <div class="list_name">
              <!-- <div class="img">
                <img :src="item.picurl" alt />
              </div>-->
              <div class="name">{{ item.urlName }}</div>
              <div style="margin: 0 5px">{{ item.name }}</div>
              <div>提交于: {{ item.del_time }}</div>
            </div>
            <div
              class="restore"
              @click="Resume(item)"
              v-if="permission.indexOf('style_paperpattern_resume') != -1"
            >
              还原
            </div>
          </div>
          <span v-if="del_list.length > 0">放码文件</span>
          <div class="list" v-for="(item, index) in del_list" :key="index + 1">
            <div class="list_name">
              <div class="name">{{ item.urlName }}</div>
              <div style="margin: 0 5px">{{ item.name }}</div>
              <div>提交于 {{ item.delete_time }}</div>
            </div>
            <div class="restore" @click="Resume1(item)">还原</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="推送制版"
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
  stylePaperpatternResume,
  getStylistList,
  pushSample,
  getStylePosition,
  stylePositionEdit,
  getStyleMeasurement,
  styleMeasurementAdd,
  styleMeasurementDel,
  download,
  styleMeasurementResume,
} from "@/api/researchDevelopment";
import { url } from "@/api/configuration";
export default {
  data() {
    return {
      url: url,
      del_list: [],
      tableData: [{ name: "部位" }, { name: "尺寸/CM" }],
      codeFilePic: {},
      power: "",
      fileList: [],
      dosageCargo: "",

      obj: {},
      img_list: [],

      dialogImageUrl: "",
      dialogVisible: false,

      MaterialsList: [],
      DelList: [],

      antistopActive: false,
      permission: [],
      stylists: [],
      form: {
        user_id: "",
      },
      centerDialogVisible1: false,
      units: [],
      vs: false,
    };
  },
  methods: {
    async download(url) {
      let res = await download({ url });
      console.log(res);
    },
    MeasurementDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await styleMeasurementDel({
            style_id: this.$route.query.id,
          });
          this.getStyleMeasurement();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handlecodeFileSuccess(response, file, fileList) {
      // console.log(e);
      let { pic_file_url } = response.data;
      let picurl = pic_file_url;
      let res = await styleMeasurementAdd({
        style_id: this.obj.id,
        picurl,
      });
      this.getStyleMeasurement();
    },
    beforeAvatarUpload(e) {
      console.log(e);
    },
    handleUser_id(e) {
      this.form.user_id = e;
    },
    AssistantCancel() {
      this.centerDialogVisible1 = false;
    },
    async AssistantFinish() {
      let res = await pushSample({
        style_id: this.$route.query.id,
        user_id: this.form.user_id || -1,
      });
      if (res.data.error_code == 0) {
        this.$message.success(res.data.msg);
        this.init();
        this.obj.sample_status = 1;
      } else {
        this.$message.error(res.data.msg);
      }
      this.centerDialogVisible1 = false;
    },
    async get_push_plate() {
      this.centerDialogVisible1 = true;
    },
    async handleRemove(file, fileList) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let id = this.fileList[0].id;
          let res = await stylePaperpatternDel({ id });
          this.init();
          this.getStyleMeasurement();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 成功
    async handleSuccess(response, file, fileList) {
      let { pic_file_url } = response.data;
      let picurl = pic_file_url;
      let res = await stylePaperpatternAdd({
        style_id: this.obj.id,
        picurl,
        uid: file.name,
      });
      this.init();
    },
    modification() {
      this.antistopActive = false;
    },
    modification1() {
      this.vs = true;
    },
    async affirm1() {
      let { id } = this.$route.query;
      let res = await stylePositionEdit({
        id,
        style_position: this.units,
      });
      // if(res.data)
      this.vs = false;
      // this.getStylePosition()
    },
    async affirm() {
      this.MaterialsList.map((v, i) => {
        if (v.maxusage === "") {
          v.maxusage = 0;
        }
        if (v.loss === "") {
          v.loss = 0;
        }
        delete v.materials_data;
        delete v.materials_id;
        delete v.style_id;
      });
      let res = await styleMaterialsUseEdit({
        style_materials_data: this.MaterialsList,
      });
      if (res.data.error_code) {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      } else {
        this.init();
        this.antistopActive = true;
      }
    },
    async handleInputMaxusage(e, index) {
      this.MaterialsList.map((v, i) => {
        if (index === i) {
          v.maxusage = e.maxusage.replace(/[^0-9-]+/, "");
        }
      });
    },
    async handleInputLoss(e, index) {
      this.MaterialsList.map((v, i) => {
        if (index === i) {
          v.loss = e.loss.replace(/[^0-9-]+/, "");
        }
      });
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getStyle({ id });
      this.obj = res.data.data;
      let res1 = await stylePaperpatternList({ style_id: this.obj.id });
      this.fileList = res1.data.data;
      if (this.fileList.length > 0) {
        this.fileList.urlName = res1.data.data[0].picurl.split("/").pop();
      }
      this.PaperpatternDelInit();
      this.MaterialsInit();
    },
    async PaperpatternDelInit() {
      let res = await stylePaperpatternDelList({ style_id: this.obj.id });
      this.DelList = res.data.data;
      this.DelList.map((v, i) => {
        v.urlName = v.picurl.split("/").pop();
      });
      console.log(res);
    },
    async PaperpatternDelInit1() {
      let res = await styleMeasurementResume({
        style_id: this.obj.id,
        id: this.codeFilePic[0].id,
      });
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
    },
    async Resume(e) {
      if (this.fileList.length === 0) {
        let res = await stylePaperpatternResume({ id: e.id });
        if (res.data.error_code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        } else {
          this.init();
        }
      } else {
        this.$message.warning("已有数据,请先删除");
        return;
      }
    },
    async Resume1(e) {
      if (this.codeFilePic.length == 0) {
        let res = await styleMeasurementResume({
          style_id: this.obj.id,
          id: e.id,
        });
        if (res.data.error_code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        } else {
          this.getStyleMeasurement();
        }
      } else {
        this.$message.warning("已有数据,请先删除");
        return;
      }
    },
    async getstylist() {
      let res = await getStylistList({ role_id: 4 });
      let { data } = res.data;
      data.map((v) => {
        v["checked"] = false;
      });
      this.stylists = data;
    },
    async getStylePosition() {
      let res = await getStylePosition({ id: this.$route.query.id });
      let { data } = res.data;
      this.units = data;
    },
    async getStyleMeasurement() {
      let res = await getStyleMeasurement({ style_id: this.$route.query.id });
      this.codeFilePic = res.data.data.list;
      this.del_list = res.data.data.del_list;
      if (this.codeFilePic.length > 0) {
        this.codeFilePic.urlName = res.data.data.list[0].picurl
          .split("/")
          .pop();
      }
      if (this.del_list.length > 0) {
        this.del_list.map((v, i) => {
          v.urlName = v.picurl.split("/").pop();
        });
      }
    },
  },
  mounted() {
    this.init();
    this.antistopActive = true;
    // this.power = localStorage.getItem("power");
    this.getstylist();
    this.getStylePosition();
    this.getStyleMeasurement();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.patternStatus {
  /deep/.el-table--border:after,
  /deep/.el-table--group:after,
  /deep/.el-table:before {
    background-color: #c0c4cc;
  }

  /deep/.el-table--border,
  /deep/.el-table--group {
    border-color: #c0c4cc;
  }

  /deep/.el-table td,
  /deep/.el-table th.is-leaf {
    border-bottom: 1px solid #c0c4cc;
  }

  /deep/.el-table--border th,
  /deep/.el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid #c0c4cc;
  }

  /deep/.el-table--border td,
  /deep/.el-table--border th {
    border-right: 1px solid #c0c4cc;
  }
  min-height: 800px;
  .pattern {
    .patternFile {
      border-bottom: 1px solid #000;
      .patternFileName {
        width: 300px;
        padding: 10px;
        font-size: 16px;
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
      .upload {
        width: 600px;
        overflow: hidden;
        margin: 10px 0 30px 0;
        height: 45px;
        line-height: 45px;
        position: relative;
        .round {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .codeFile {
      border-bottom: 1px solid #000;
      .codeFileName {
        padding: 10px;
        font-size: 16px;
      }
    }
    .measurement {
      width: 100%;
      border-bottom: 1px solid #000;
      .measurementnav {
        padding: 10px;
        font-size: 16px;
      }
      .adds {
        margin: 10px 0;
      }
      .tables {
        padding: 10px;
        .boxed {
          width: 1600px;
          overflow: hidden;
          .childed {
            display: block;
            float: left;
            .hed {
              display: block;
              width: 80px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #cccccc;
              text-align: center;
            }
          }
          .list {
            float: left;
            width: 1450px;
          }
          .over1 {
            display: block;
            overflow: hidden;
          }
          .hed1 {
            text-align: center;
            border: 1px solid #cccccc;
            display: block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            float: left;
          }
        }
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
          width: 430px;
          border-radius: 10px;
          background: #f2f2f2;
          display: flex;
          justify-content: space-between;
          .list_name {
            height: 45px;
            display: flex;
            align-items: center;
            .name {
              padding-left: 20px;
              height: 16px;
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
            cursor: pointer;
          }
        }
      }
    }
  }
  .upload {
    width: 600px;
    margin: 10px 0 30px 0;
    height: 45px;
    line-height: 45px;
    position: relative;
    .round {
      position: absolute;
      right: 0;
      top: 0;
    }
    .texts {
      width: 430px;
      height: 45px;
      line-height: 45px;
      background: #f2f2f2 !important;
      overflow: hidden;
      border-radius: 10px;
      .contet {
        float: left;
        padding-left: 20px;
        font-size: 13px;
      }
      .btn {
        float: right;
        width: 40px;
        height: 45px;
        line-height: 45px;
        cursor: pointer;
        font-size: 13px;
      }
    }
    .avatar-uploader {
      width: 100%;
      height: 100%;
      line-height: 45px;
      display: block;
      overflow: hidden;
    }
    /deep/.el-upload {
      border: 0;
      background: #fff;
      float: left;
    }
    .el-upload-list {
      float: left;
      overflow: hidden;
    }
    /deep/.el-upload-list__item {
      display: block;
      width: 430px;
      height: 45px;
      line-height: 45px;
      margin-top: 0px;
      background: #f2f2f2 !important;
      border-radius: 10px;
      .el-icon-close {
        height: 45px;
        line-height: 45px;
        width: 40px;
        text-align: center;
      }
      .el-upload-list__item-status-label {
        width: 40px;
        text-align: center;
        // .el-icon-circle-check:before {
        //   content: "";
        // }
      }
      .el-icon-document:before {
        content: "";
      }
    }
    .imag {
      overflow: hidden;
      width: 430px;
      height: 45px;
      text-indent: 3em;
      border: 1px solid #ccc;
      border-radius: 10px;
      .el-upload__tip {
        float: left;
        line-height: 45px;
        margin-top: 0;
      }
      .el-button {
        float: right;
        margin-top: 0;
        border: 0;
        line-height: 45px;
        padding: 0;
        width: 80px;
      }
    }
  }
}
</style>