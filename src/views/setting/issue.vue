<template>
  <div class="announcements" v-if="permission.indexOf('announcements')!=-1">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>问题反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-button
        type="primary"
        size="small"
        v-if="permission.indexOf('notice_add')!=-1"
        @click="bulletin"
      >添加问题</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top:20px;cursor: pointer;" size="small">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="status_name" label="状态"></el-table-column>
        <el-table-column align="center" prop="username" label="发布人"></el-table-column>
        <el-table-column align="center" prop="create_time" label="发布时间"></el-table-column>
        <el-table-column align="center" prop="fix_username" label="回复人"></el-table-column>
        <el-table-column align="center" prop="finish_time" label="回复时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              type="text"
              v-if="scope.row.status!=1"
              @click="delBulletin(scope.row)"
              size="small"
            >回复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        size="mini"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="回复信息" :visible.sync="dialogVisible2" width="60%" center>
      <!-- :rules="rules" -->
      <el-form :model="form" ref="form" label-width="60px" class="demo-ruleForm">
        <el-form-item label="内容:">
          <!-- <script id="editor" type="text/plain"></script> -->
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reply"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editBulletin()">回复</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="发布问题" @close="close" :visible.sync="dialogVisible" width="60%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="主题:" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <!-- <script id="editor" type="text/plain"></script> -->
          <!-- 图片上传组件辅助-->
          <el-upload
            action="https://yj.ppp-pay.top/uploadpic.php"
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
          ></el-upload>

          <quill-editor
            v-loading="quillUpdateImg"
            element-loading-text="图片加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            v-model="ruleForm.content"
            ref="myQuillEditor"
            class="editer"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="查看问题"
      @close="closed"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible1"
      width="40%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules1"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="主题:" prop="title">
          <el-input v-model="ruleForm.title" disabled></el-input>
        </el-form-item>

        <el-form-item label="内容:" prop="content">
          <div v-html="ruleForm.content">{{ruleForm.content}}</div>
        </el-form-item>
        <el-form-item v-if="ruleForm.reply!=''" label="回复内容:">
          <div>{{ruleForm.reply}}</div>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="editBulletin()">保存</el-button>
        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器

import { issueList, issueAdd, issueReply, issueInfo } from "@/api/setting.js";
export default {
  data() {
    return {
      permission: [],
      tableData: [],
      ruleForm: {},
      form: {},
      editorOption: {
        placeholder: "请在这里输入",
        theme: "snow",
        // loading: true,
        modules: {
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          //
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], //列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], //字体
              [{ align: [] }], //对齐方式
              ["clean"], //清除字体样式
              ["image", "video"], //上传图片、上传视频
            ],

            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
          clipboard: {
            // 粘贴过滤
            matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]],
          },
          // 截屏上传
          ImageExtend: {
            loading: true,
            // name: 'file',
            // 设置上传参数，因为我们要上传七牛，所以需要token
            // change: (xhr, FormData) => {
            //   FormData.append("token", this.$store.state.upload_token);
            // },
            action: "https://yj.ppp-pay.top/uploadpic.php",
            response: (res) => {
              console.log(res, "response");
              // 这里有必要说一下，由于七牛上传成功以后返回的是 {hash: 'xxxx', key: 'xxx'},其中key就是七牛生成的文件名称，所以我们拼接上自己的服务器地址，就是图片保存的地址，return
              // 的结果会座位图片的src
              return this.$store.getters.upload_url + res.key;
            },
          },
        },
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      rules1: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      quillUpdateImg: false,
      once: true,
    };
  },
  components: {
    //使用编辑器
    quillEditor,
  },
  methods: {
    onEditorChange(event) {
      this.once = false;
    },
    // 复制粘贴配置调用方法
    HandleCustomMatcher(node, Delta) {
      if (this.once === false) {
        // 文字、图片等，从别处复制而来，清除自带样式，转为纯文本
        let ops = [];
        Delta.ops.forEach((op) => {
          console.log(op);

          // console.log(node, op, "富文本编辑器中的内容");
          if (op.insert && (typeof op.insert === "string" || op.insert.image)) {
            ops.push({
              insert: op.insert,
            });
          }
        });
        Delta.ops = ops;
        return Delta;
      } else {
        return Delta;
      }
    },

    beforeUpload(file) {
      // 显示loading动画
      this.$elUploadBeforeUpload(file);
      this.quillUpdateImg = true;
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(res);
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (!res.error_code) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data.pic_file_url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },

    onEditorReady(editor) {
      console.log(editor);
    },
    async handleClick(row) {
      console.log(row);
      let res = await issueInfo({ id: row.id });
      this.ruleForm = res.data.data;
      this.dialogVisible1 = true;
    },
    bulletin() {
      this.ruleForm = {};
      this.dialogVisible = true;
    },
    clickLi(item) {
      this.ruleForm = item;
    },
    // 发送
    send() {
      console.log(this.ruleForm.content);
      this.$refs["ruleForm"].validate(async (valid) => {
        if (!valid) return;
        let res = await issueAdd({
          title: this.ruleForm.title,
          content: this.ruleForm.content,
        });
        console.log(res);
        this.dialogVisible = false;
        this.$refs["ruleForm"].resetFields();
        this.init();
      });
    },
    close() {
      this.$refs["ruleForm"].resetFields();
    },
    closed() {
      this.$refs["ruleForm"].resetFields();
      this.init();
    },
    delBulletin(row) {
      this.form.id = row.id;
      this.dialogVisible2 = true;
    },
    async editBulletin() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return false;
        let res = await issueReply({
          reply: this.form.reply,
          id: this.form.id,
        });
        console.log(res);
        this.dialogVisible2 = false;
        this.form = {};
        this.init();
      });
    },
    async init() {
      let res = await issueList({
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data } = res.data;
      this.tableData = data;
      this.total = res.data.count;
      this.tableData.map((v, i) => {
        if (!v.status) {
          v.status_name = "待处理";
        } else {
          v.status_name = "已处理";
        }
        if (v.fix_username == "" || v.fix_username == undefined) {
          v.fix_username = "暂无人处理";
        }
      });
      // console.log(res);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
  },
  mounted() {
    this.init();
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.announcements {
  .main {
    overflow: hidden;
    margin-top: 15px;
    width: 100%;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
  // /deep/.ql-editor {
  //   height: 400px;
  // }
  /deep/.ql-editor.ql-blank,
  /deep/.ql-editor {
    height: 350px;
    img {
      max-width: 150px;
    }
  }
  /deep/.el-form-item__content {
    img {
      max-width: 150px;
    }
  }
}
</style>