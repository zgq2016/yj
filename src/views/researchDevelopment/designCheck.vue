<template>
  <div class="designCheck">
    <!-- 面包屑 -->
    <div class="aa">
      <div class="bb">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>研发</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/itemDesign' }"
            >设计项目</el-breadcrumb-item
          >
          <el-breadcrumb-item>项目详细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 详情 -->
    <div class="particulars">
      <div class="detail">
        <div class="left_img">
          <div v-if="obj.picurl !== ''">
            <el-image
              v-if="obj.picurl !== ''"
              style="
                width: 340px;
                height: 187px;
                border-radius: 15px;
                margin-right: 20px;
              "
              :src="obj.picurl"
              fit="cover"
            ></el-image>
          </div>

          <div v-if="obj.picurl === ''">
            <img
              v-if="obj.projecttype === '0'"
              src="../../assets/意向.jpg"
              alt
            />
            <img
              v-if="obj.projecttype === '1'"
              src="../../assets/阶段.jpg"
              alt
            />
            <img
              v-if="obj.projecttype === '2'"
              src="../../assets/系列.jpg"
              alt
            />
          </div>
        </div>
        <div class="right_content">
          <div
            style="width: 300px; height: 160px"
            v-if="obj.projecttype != '2'"
          >
            <div class="name">{{ obj.projectname }}</div>
            <div class="client">客户：{{ obj.customer_companyname }}</div>
            <div class="season">季节：{{ obj.season }}</div>
            <div class="year">年份：{{ obj.year }}</div>
            <div class="claim">要求：{{ obj.detailed }}</div>
          </div>
          <div
            style="width: 165px; height: 160px"
            v-if="obj.projecttype == '2'"
          >
            <div class="name">{{ obj.projectname }}</div>
            <div class="client">元素：{{ obj.element }}</div>
            <div class="year">色系：{{ obj.color }}</div>
            <div class="season">季节：{{ obj.season }}</div>
            <div class="year">年份：{{ obj.year }}</div>
          </div>
          <div
            style="width: 165px; height: 160px"
            v-if="obj.projecttype == '2'"
          >
            <div class="name"></div>
            <div class="claim">要求数量：{{ obj.quantity }}</div>
            <div class="claim">完成时间：{{ obj.finishtime }}</div>
          </div>
        </div>
      </div>
      <div class="middle" v-if="obj.projecttype == '2'">
        <div
          class="ban1"
          @click="change(0)"
          :class="active == 0 ? 'active' : ''"
        >
          企划展板
        </div>
        <div
          class="ban2"
          @click="change(1)"
          :class="active == 1 ? 'active' : ''"
        >
          系列款式
        </div>
      </div>
      <div class="editBtn">
        <el-tooltip
          class="edit"
          style="margin-right: 12px; background-color: #f2f2f2"
          v-if="
            permission.indexOf('project_edit') != -1 ||
            permission.indexOf('project_del') != -1
          "
          content="编辑"
          placement="top"
        >
          <div @click="editOutline">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          class="edit"
          style="margin-right: 12px; background-color: #f2f2f2"
          v-if="switchover_active === false"
          content="切换"
          placement="top"
        >
          <div @click="switchover">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          class="edit"
          style="margin-right: 12px; background-color: #f2f2f2"
          v-if="switchover_active === true"
          content="切换"
          placement="top"
        >
          <div @click="switchover">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                fill="#5e5e5e"
              />
            </svg>
          </div>
        </el-tooltip>
        <div class="add">
          <span
            style="background-color: #f2f2f2; color: #5e5e5e"
            class="addStyle"
            @click="addTheStyle"
            v-if="permission.indexOf('get_project_style_list') != -1"
            >添加款式</span
          >
          <span
            class="addStyle"
            @click="newTheStyle"
            v-if="permission.indexOf('project_style_add') != -1"
            >新增款式</span
          >
        </div>
      </div>
    </div>

    <!-- add -->

    <!-- table -->
    <div class="table" v-if="permission.indexOf('get_project') != -1">
      <div v-show="active == 1">
        <div v-if="switchover_active === false">
          <el-table :data="tableData" size="mini">
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" label="图片">
              <template slot-scope="scope" property="style_pic_url">
                <div style="display: flex">
                  <el-image
                    style="
                      width: 50px;
                      height: 50px;
                      border-radius: 5px;
                      margin-right: 5px;
                    "
                    :src="scope.row.style_pic_url"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <!-- <i class="el-icon-picture-outline"></i> -->
                    </div>
                  </el-image>
                  <img
                    v-if="scope.row.style_color_pic_url"
                    :src="scope.row.style_color_pic_url"
                    class="img"
                    style="width: 50px; height: 50px; border-radius: 5px"
                    alt
                  />
                  <div
                    v-else
                    class="imgSrc"
                    style="width: 50px; height: 50px; border-radius: 5px"
                    :style="`background-color:${scope.row.color_code};`"
                  ></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              property="stylename"
              align="center"
              label="款式名称"
            ></el-table-column>
            <el-table-column
              property="styleno"
              align="center"
              label="款号"
            ></el-table-column>
            <!-- <el-table-column property="style_color" align="center" label="颜色"></el-table-column> -->
            <el-table-column
              property="style_type"
              align="center"
              label="品类"
            ></el-table-column>
            <el-table-column
              property="ctime"
              align="center"
              width="95"
              label="开始时间"
            ></el-table-column>
            <el-table-column
              property="design"
              align="center"
              label="状态"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <!-- 插槽：匿名插槽，具名插槽，数据插槽 -->
              <template v-slot="scope">
                <div class="btn">
                  <div
                    @click="handleEdit(scope.row)"
                    v-if="permission.indexOf('get_style') != -1"
                  >
                    查看
                  </div>
                  <!-- <el-button
                size="mini"
                v-if="scope.row.design_status==='3'||scope.row.design_status==='4'&&scope.row.user_id==userid"
                @click="sample_apply(scope.$index, scope.row)"
              >提交审核</el-button>
              <el-button
                size="mini"
                v-if="scope.row.design_status==='3'&&scope.row.user_id==userid"
                @click="cancel_sample_apply(scope.$index, scope.row)"
                >撤回审核</el-button>-->
                  <div
                    @click="design_agree(scope.$index, scope.row, 1)"
                    v-if="
                      scope.row.design_status === '2' &&
                      permission.indexOf('design_agree') != -1
                    "
                  >
                    通过
                  </div>
                  <div
                    @click="design_agree(scope.$index, scope.row, 0)"
                    v-if="
                      scope.row.design_status === '2' &&
                      permission.indexOf('design_agree') != -1
                    "
                  >
                    不通过
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="switchover_active === true">
          <div class="card" v-for="(item, index) in tableData" :key="index">
            <div @click="handleEdit(item)">
              <el-image
                style="width: 160px; height: 300px; border-radius: 10px"
                :src="item.style_pic_url"
                fit="cover"
              ></el-image>
              <div style="color: #000">{{ item.style_type }}</div>
              <div style="color: #000">{{ item.stylename }}</div>
              <div style="color: #000">{{ item.styleno }}</div>
              <div style="color: #ccc">{{ item.user_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="active == 0">
        <div v-if="designRemark === 0">
          <div class="drawing">备注</div>
          <el-input
            type="textarea"
            v-model="designidea"
            class="textarea"
          ></el-input>
          <div class="drawing">图纸</div>
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
          <el-button
            size="mini"
            style="margin: 10px 0"
            round
            @click="handleKeep"
            >保存</el-button
          >
        </div>
        <div v-else>
          <div class="pro" v-if="obj.proposal_board.remarks">
            <div style="font-size: 18px; padding: 20px 0">备注</div>
            <div style="font-size: 18px; padding: 20px 0; width: 100%">
              {{ obj.proposal_board.remarks }}
            </div>
            <div @click="editpro" class="editpro">
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path
                  d="M17.2 9.144l5.656 5.657-13.2 13.199h-5.656v-5.657l13.2-13.2zM19.085 7.259l2.828-2.829c0.241-0.241 0.575-0.39 0.943-0.39s0.701 0.149 0.943 0.39l3.772 3.772c0.241 0.241 0.39 0.575 0.39 0.943s-0.149 0.701-0.39 0.943l-2.829 2.828-5.656-5.656z"
                  fill="#5e5e5e"
                />
              </svg>
            </div>
          </div>
          <div class="imgages">
            <div style="font-size: 18px; padding: 20px 0">图片</div>
            <div>
              <el-image
                style="width: 53%"
                v-for="(item, index) in obj.proposal_board.picurl"
                :key="index"
                :src="item"
                fit="cover"
              ></el-image>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="款式搜索"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
    >
      <div>
        <el-input
          v-model="input"
          placeholder="请填写款式名称或款号"
          clearable
          style="width: 300px"
          @input="searchInput"
        ></el-input>
        <div style="display: flex; flex-wrap: wrap; width: 100%">
          <div
            class="search__card"
            v-for="(item, index) in styleList"
            :key="index"
          >
            <div @click="handleSelectItem(item)">
              <!-- router-link :to="`/newTheStyle?id=${$route.query.id}&oldId=${item.id}`" -->
              <div class="search_card_left">
                <div class="search_card_left_img">
                  <!-- <img :src="item.style_pic_url" alt /> -->
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 20px"
                    :src="item.style_pic_url"
                    fit="cover"
                  ></el-image>
                </div>
                <div class="search_card_left_content">
                  <div class="search_card_left_content_name">
                    {{ item.stylename }}
                  </div>
                  <div>{{ item.style_type }}</div>
                  <div>{{ item.year }}</div>
                  <div>{{ item.season }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        v-if="total !== 0"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[9, 18, 27, 36]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProject,
  getProjectStyleList,
  projectStyleAddto,
  designAgree,
  proposalEdit,
} from "@/api/researchDevelopment";
import { url } from "@/api/configuration";
export default {
  data() {
    return {
      designidea: "",
      tableData: [],
      centerDialogVisible: false,
      input: "",
      pageIndex: 1,
      pageSize: 9,
      total: 0,
      styleList: [],
      permission: [],
      switchover_active: false,
      active: 1,
      designRemark: 0,
      url: url,
      obj: { pattern_status: 0, designidea: "" },
      img_list: [],
      design_status: "",
      dialogImageUrl: "",
      dialogVisible: false,
      picurl: [],
    };
  },
  methods: {
    editpro() {
      this.designRemark = 0;
    },
    async handleKeep() {
      let res = await proposalEdit({
        project_id: this.$route.query.id,
        remarks: this.designidea,
        picurl: this.picurl,
      });
      // console.log(res);
      // if(res.data)
      this.designRemark = 1;
      this.init();
    },
    async handleSuccess(response, file, fileList) {
      let style_id = this.$route.query.id - 0;
      let { pic_file_url } = response.data;
      // console.log(response,file);
      this.picurl.push(pic_file_url);

      // let res = await styleDesignideaPicAdd({ style_id, picurl });
    },
    // 移除
    async handleRemove(file, fileList) {
      let id = file.id;
      // console.log(file,fileList);
      if (file.response) {
        this.picurl.map((v, i) => {
          if (v == file.response.data.pic_file_url) {
            this.picurl.splice(i, 1);
          }
        });
      } else {
        this.picurl.map((v, i) => {
          if (v == file.url) {
            this.picurl.splice(i, 1);
          }
        });
      }
      // let res = await styleDesignideaPicDel({ id });
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
    change(v) {
      this.active = v;
    },
    async design_agree(index, row, e) {
      let res = await designAgree({ style_id: row.id, agree: e });
      // console.log(res);
      this.init();
    },
    // async cancel_design_apply(index, row, e) {
    //   let res = await designAgree({ style_id: row.id, agree: e });
    //   console.log(res);
    //   this.init();
    // },
    switchover() {
      this.switchover_active = !this.switchover_active;
    },
    handleSelectItem(item) {
      this.$confirm("确定选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        console.log(item);
        this.$router.push({
          path: `/newTheStyle?id=${this.$route.query.id}&oldId=${item.id}`,
        });
      });
    },
    async searchInput() {
      let res = await getProjectStyleList({
        keyword: this.input,
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      console.log(res);
      let { data, count } = res.data;
      this.styleList = data;
      this.total = count;
    },
    newTheStyle() {
      let { id } = this.$route.query;
      this.$router.push({ path: `/newTheStyle?id=${id}` });
    },
    addTheStyle() {
      this.centerDialogVisible = true;
    },
    handleEdit(e) {
      console.log(e);
      let { id } = e;
      this.$router.push({
        path: `/designNote?id=${id}&TL=${30}&project_id=${this.obj.id}`,
      });
      document.body.style = null;
    },
    editOutline() {
      let { id } = this.$route.query;
      this.$router.push({ path: `/detailEdit?id=${id}` });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchInput();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.searchInput();
    },
    async init() {
      let { id } = this.$route.query;
      let res = await getProject({ id });
      this.obj = res.data.data;
      if (this.obj.proposal_board) {
        if (
          this.obj.proposal_board.remarks != "" ||
          this.obj.proposal_board.picurl.length != 0 ||
          this.obj.proposal_board.picurl == ""
        ) {
          this.designRemark = 1;
        }

        this.designidea = this.obj.proposal_board.remarks;
        if (this.obj.proposal_board.picurl) {
          this.img_list = [];
          this.picurl = [];
          this.obj.proposal_board.picurl.map((v, i) => {
            this.img_list.push({ url: v, id: i });
            this.picurl.push(v);
          });
        }
      }

      this.tableData = res.data.data.style_data;
      this.tableData.map((v, i) => {
        if (v.design_status == "0") {
          v.design = "等待设计";
        }
        if (v.design_status == "1") {
          v.design = "设计已上传";
        }
        if (v.design_status == "2") {
          v.design = "设计审核中";
        }
        if (v.design_status == "3") {
          v.design = "撤回审核";
        }
        if (v.design_status == "4") {
          v.design = "设计不通过";
        }
        if (v.design_status == "5") {
          v.design = "设计通过";
        }
      });
      console.log(this.tableData);
    },
  },
  async mounted() {
    this.init();
    this.permission = localStorage.getItem("permission").split(",");
  },
  computed: {
    userid() {
      return this.$store.state.userInfo.id;
    },
  },
};
</script>

<style lang="less" scoped>
.designCheck {
  .active {
    color: #fff !important;
    background: #000 !important;
  }
  .pro {
    position: relative;
  }
  /deep/.editpro {
    position: absolute;
    top: 20px;
    right: 30%;
    border-radius: 50%;
    background: #f2f2f2;
    padding: 5px;
  }
  .add {
    display: flex;
    .addStyle {
      margin-right: 12px;
      border-radius: 15px;
      width: 120px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #000;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .particulars {
    display: flex;
    justify-content: space-between;
    height: 200px;
    padding: 0 0 15px 0;
    .detail {
        width: 500px;
      display: flex;
      img {
        width: 160px;
        height: 160px;
        border-radius: 15px;
        margin-right: 20px;
      }
      .right_content {
        flex: 1;
        display: flex;
        // justify-content: center;
        // align-content: center;
        .claim {
          // width: 1200px;
          text-align: justify;
          text-justify: newspaper;
          word-break: break-all;
        }

        .name {
          height: 26px;
          font-size: 20px;
          font-weight: 600;
        }
        div {
          font-size: 14px;
          margin: 0 0 10px 0;
        }
      }
    }
    .middle {
      display: flex;
      align-items: flex-end;
      width: 200px;
      // height: 30px;
      .ban1 {
        cursor: pointer;
        color: #5e5e5e;
        background: #f2f2f2;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px 0 0 10px;
      }
      .ban2 {
        cursor: pointer;
        color: #5e5e5e;
        background: #f2f2f2;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 0 10px 10px 0;
      }
    }

    .editBtn {
      display: flex;
      align-items: flex-end;
      .edit {
        width: 30px;
        height: 30px;
        background-color: #000;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 15px;
        font-size: 10px;
        // padding: 10px;
      }
    }
  }
  .check {
    cursor: pointer;
  }
  .search__card {
    display: flex;
    width: 300px;
    margin: 10px;
    .search_card_left {
      width: 300px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      background-color: #f2f2f2;
      .search_card_left_img {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .search_card_left_content {
        padding-top: 3px;
        .search_card_left_content_name {
          font-weight: 700;
        }
        div {
          margin: 5px;
        }
      }
    }
    .search_card_right {
      background-color: #f2f2f2;
      width: 50px;
      height: 100px;
      border-radius: 10px;
    }
  }
  .table {
    .img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-size: 50px 50px;
      background-repeat: no-repeat;
    }
    .color {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    .el-table {
      /deep/.cell {
        font-weight: 500 !important;
      }
    }
    .drawing {
      font-size: 16px;
      margin: 10px 0;
    }
  }
  .card {
    margin: 0 25px 20px 0;
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
    float: left;
    div {
      margin: 1px 5px;
    }
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin: 0 10px;
    }
  }
}
</style>