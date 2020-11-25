<template>
  <div class="addRouteCard">
    <div class="aa">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>档案库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/routeCard_list' }"
          >物料工艺卡</el-breadcrumb-item
        >
        <el-breadcrumb-item>新增物料工艺卡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 图片 -->

    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in nav"
          :key="index"
          :class="active === index ? 'active' : ''"
          @click="actives(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="contents1" v-show="nav[active] == '色号'">
        <div class="headr_list">
          <div class="cont">
            <div class="update" @click="handleImg()">
              <img v-if="form1.picurl" :src="form1.picurl" />
              <i v-else class="avatar-uploader-icon">
                <div
                  class="el-upload__tip"
                  style="
                    font-size: 14px;
                    font-weight: 500;
                    color: rgb(158 152 152);
                  "
                  slot="tip"
                >
                  上传色卡
                </div>
              </i>
            </div>
            <el-cascader
              v-model="form1.color"
              :options="colors"
              :props="optionProps"
              :show-all-levels="false"
              @change="changese"
              placeholder="颜色"
            ></el-cascader>
            <br />
            <el-input
              v-model="form1.color_no"
              placeholder="色号"
              style="width: 200px"
            ></el-input>
            <el-button type="info" @click="form1.color_no = '无编号'" circle
              >无</el-button
            >
            <el-button class="determine" @click.stop="determine"
              >确定</el-button
            >
          </div>

          <div class="abc">
            <el-button class="next" @click="variation(1)">下一步</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="colorCard" v-if="form.color_data.length > 0">
          <ul>
            <li
              v-for="(item, index) in form.color_data"
              @click.stop="recompose(item, index)"
              :key="index"
            >
              <div class="imgs">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.picurl"
                  fit="cover"
                ></el-image>
              </div>
              <div class="substance">
                <h6>{{ item.color }}</h6>
                <h6>{{ item.color_no }}</h6>
              </div>
              <span @click.stop="dels(index)" class="del el-icon-close"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="contents1 contents2" v-show="nav[active] == '基础信息'">
        <div class="input_s">
          <div class="box">
            <el-cascader
              v-model="form.materials_class_id"
              :options="classData"
              :props="bosded"
              @change="handleChange"
              clearable
              placeholder="分类"
              class="left_float"
            ></el-cascader>
            <el-select
              class="left_float"
              v-model="form.unit"
              placeholder="计量单位"
            >
              <el-option
                v-for="item in units"
                :key="item.id"
                :label="item.unit_name"
                :value="item.unit_name"
              ></el-option>
            </el-select>
            <el-input
              v-model="form.wsale_price"
              class="maxsize left_float"
              placeholder="大货单价"
            ></el-input>
            <el-input
              v-model="form.materialsname"
              class="maxsize left_float"
              placeholder="物料名称"
            ></el-input>
            <el-input
              v-model="form1.companyname"
              class="maxsize left_float"
              suffix-icon="el-icon-search"
              placeholder="供应商"
              @input="impedance"
            ></el-input>

            <div class="dataList">
              <div
                class="list"
                v-for="(item, index) in SupplierList_item"
                :key="index"
              >
                <div class="list_img">
                  <img :src="item.cardpicurl" alt />
                </div>
                <div class="list_content">
                  <div class="list_content_left">
                    <div class="list_content_left_name">
                      {{ item.companyname }}
                    </div>
                    <div>
                      {{ item.mainclass }}
                      <em v-if="item.materials_class_name"
                        >({{ item.materials_class_name }})</em
                      >
                    </div>
                    <div v-if="item.supplier_contact_data.length > 0">
                      {{ item.supplier_contact_data[0].contacts }}:{{
                        item.supplier_contact_data[0].phone
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right_float">
            <el-button class="step" @click="variation(0)">上一步</el-button>
            <el-button class="next1" @click="variation(1)">下一步</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div v-if="SupplierList.length == 0" @click="add_Supplier">
          添加供应商
        </div>
        <div v-if="SupplierList.length > 0" class="dataList">
          <div
            @click="listDeital(item)"
            class="list"
            v-for="(item, index) in SupplierList"
            :key="index"
          >
            <div class="list_img">
              <img :src="item.cardpicurl" alt />
            </div>
            <div class="list_content">
              <div class="list_content_left">
                <div class="list_content_left_name">{{ item.companyname }}</div>
                <div>
                  {{ item.mainclass }}
                  <em v-if="item.materials_class_name"
                    >({{ item.materials_class_name }})</em
                  >
                </div>
                <div v-if="item.supplier_contact_data.length > 0">
                  {{ item.supplier_contact_data[0].contacts }}:{{
                    item.supplier_contact_data[0].phone
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          class="pagination"
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[24, 48, 72, 96]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
        ></el-pagination>
      </div>
      <div class="contents1 contents2" v-show="nav[active] == '物料信息'">
        <div class="input_s sencond">
          <div class="bax">
            <div class="recognition" @click="choice">
              <span class="el-icon-camera-solid"></span>
              <em>识别内容</em>
            </div>
            <div class="recognition_right">
              <el-input
                v-model="form.materialsno"
                class="stylp"
                placeholder="编号/品名"
              ></el-input>
              <br />
              <el-input
                v-model="form.breadth"
                class="stylp"
                placeholder="幅宽"
              ></el-input>
              <br />
              <el-input
                v-model="form.grammage"
                class="stylp"
                placeholder="克重"
              ></el-input>
            </div>
            <div class="makeup">
              <div
                class="boxs"
                v-for="(item, index) in form.material_data"
                :key="index"
              >
                <el-autocomplete
                  v-model="item.material_name"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @input="handleSelect(item, index)"
                  suffix-icon="el-icon-search"
                  value-key="name"
                ></el-autocomplete>
                <el-input v-model="item.content" placeholder="%"></el-input>
                <span
                  v-if="length == index + 1"
                  class="el-icon-plus"
                  @click="handleIngredient"
                ></span>
                <span
                  v-else
                  class="el-icon-minus"
                  @click="handleDeleteUser(index)"
                ></span>
              </div>
            </div>
          </div>
          <div class="right_float">
            <el-button class="step" @click="variation(0)">上一步</el-button>
            <el-button class="next1" @click="variation(1)">下一步</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="texts">
          <div
            v-loading="loading"
            element-loading-text="识别内容中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="image-content"
          >
            <ul>
              <li>*注意：识别内容存在差异，谨慎修改！</li>
              <li v-for="(item, index) in contents" :key="index">
                {{ item.words }}
              </li>
            </ul>
          </div>
          <div v-if="fileList1">
            <el-image
              style="width: 100%; height: 300px"
              fit="scale-down"
              title="点击放大"
              :src="fileList1"
              :preview-src-list="[fileList1]"
            ></el-image>
            <!-- fit="scale-down" -->
          </div>
        </div>
      </div>
      <div class="contents1" v-show="nav[active] == '选填内容'">
        <div class="optional">
          <span>选填</span>

          <div class="inputed">
            <el-input
              v-model="form.arrival_time"
              placeholder="到货时间/天"
            ></el-input>
            <div class="radio">
              <el-radio-group v-model="form.instock">
                <el-radio :label="'0'">有货</el-radio>
                <el-radio :label="'1'">无货</el-radio>
              </el-radio-group>
            </div>
            <el-input
              type="textarea"
              v-model="form.remarks"
              placeholder="备注"
            ></el-input>
          </div>
          <div class="ensure">
            <el-button class="step" @click="variation(0)">上一步</el-button>
            <el-button class="next1" @click="handleEdit">确定</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="上传图片"
      :visible.sync="centerDialogVisible"
      center
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="display: flex">
        <div class="info-item">
          <!-- <label class="btn btn-orange" for="uploads">选择图片</label> -->
          <div>
            <div class="upload">
              <input
                type="file"
                id="uploads"
                :value="imgFile"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="uploadImg($event, 1)"
              />
              选择图片
            </div>
            <el-button
              @click="onTake(101)"
              icon="el-icon-camera"
              type="info"
              class="aj"
              size="small"
              >拍照</el-button
            >
          </div>
          <div class="line">
            <div class="cropper-content">
              <div class="cropper">
                <vueCropper
                  ref="cropper"
                  :info="false"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :centerBox="option.centerBox"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :fixedBox="option.fixedBox"
                  @realTime="realTime"
                  @imgLoad="imgLoad"
                ></vueCropper>
              </div>
              <div class="show-preview">
                <div class="preview">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
            </div>
          </div>
          <input
            style="width: 30px; font-size: 20px; margin: 0 10px; float: left"
            type="button"
            class="oper"
            value="+"
            title="放大"
            @click="changeScale(1)"
          />
          <input
            style="width: 30px; font-size: 20px; margin: 0 10px; float: left"
            type="button"
            class="oper"
            value="-"
            title="缩小"
            @click="changeScale(-1)"
          />
          <input
            style="width: 30px; font-size: 20px; margin: 0 10px; float: left"
            type="button"
            class="oper"
            value="↺"
            title="左旋转"
            @click="rotateLeft"
          />
          <input
            style="width: 30px; font-size: 20px; margin: 0 10px; float: left"
            type="button"
            class="oper"
            value="↻"
            title="右旋转"
            @click="rotateRight"
          />
          <input
            style="width: 30px; font-size: 20px; margin: 0 10px; float: left"
            type="button"
            class="oper"
            value="↓"
            title="下载"
            @click="down('blob')"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="finish('blob')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="拍照上传"
      :visible.sync="visible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="1065px"
    >
      <div class="box">
        <video
          id="videoCamera"
          class="canvas"
          :width="videoWidth"
          :height="videoHeight"
          autoplay
        ></video>
        <canvas
          id="canvasCamera"
          class="canvas"
          :width="videoWidth"
          :height="videoHeight"
          style="margin-left: 10px"
        ></canvas>
      </div>
      <div slot="footer">
        <el-button @click="drawImage" icon="el-icon-camera" size="small"
          >拍照</el-button
        >
        <el-button
          v-if="os"
          @click="getCompetence"
          icon="el-icon-video-camera"
          size="small"
          >打开摄像头</el-button
        >
        <!-- <el-button v-else @click="stopNavigator" icon="el-icon-switch-button" size="small">关闭摄像头</el-button> -->
        <el-button @click="resetCanvas" icon="el-icon-refresh" size="small"
          >重置</el-button
        >
        <el-button @click="ctrlShift" icon="el-icon-s-unfold" size="small"
          >另存为</el-button
        >
        <el-button
          @click="onCancel(numberr)"
          icon="el-icon-circle-close"
          size="small"
          >完成</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="请选择一个识别方式"
      :visible.sync="dialogVisible"
      center
      width="30%"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="url + '/webapi.php?g=test'"
        :auto-upload="true"
        name="image"
        :show-file-list="false"
        :on-success="recognition"
        :on-error="errorRecognition"
        :before-upload="beforeRecognition"
        :file-list="fileList"
      >
        <el-button slot="trigger" size="small" type="info"
          >图片内容识别</el-button
        >
      </el-upload>
      <el-button
        @click="onTake"
        icon="el-icon-camera"
        type="info"
        class="camera"
        size="small"
        >拍照</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getSupplierSelect,
  getUnitSelect,
  getColorSelect,
  getMaterialsClass,
  getMaterialsClassInfo,
  materialsAdd,
  getMaterialsInfo,
  materialsDel,
  materialsEdit,
  getMaterialSelect,
  discern,
  getSupplierList,
} from "@/api/archives";
import { VueCropper } from "vue-cropper";
import { Api } from "@/js/api.js"; //接口url配置文件
import { url } from "@/api/configuration";
import { materialAdd } from "@/api/setting.js";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      url: url,
      dialogVisible: false,
      SupplierList: [],
      SupplierList_item: [],
      active: 0,
      nav: ["色号", "基础信息", "物料信息", "选填内容"],
      //剪切图片上传
      optionProps: {
        value: "color_name",
        label: "color_name",
        children: "children",
      },
      crap: false,
      previews: {},
      form1: { picurl: "", color_no: "", color: "", timer_out: "" },
      companyname: "",
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true,
        centerBox: true,
        infoTrue: false,
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      centerDialogVisible: false,

      picurl: "", //物料图片
      name: "",
      form: {
        arrival_time: "",
        breadth: "",
        grammage: "",
        color_data: [],
        instock: "0",
        companyname: "",
        material_data: [
          {
            content: "",
            material_name: "",
            id: "",
          },
        ],
        materials_class_id: "",
        materials_class_name: "",
        materials_mainclass_id: "",
        materials_mainclass_name: "",
        materials_supplier_id: "",
        materialsname: "",
        materialsno: "",
        picurl: "",
        remarks: "",
        unit: "",
        wsale_price: "",
      },
      classDataName: "",
      class_data_name: "",
      radio: "",
      color: "", //选中颜色
      class_datas: [],
      units: [],
      colors: [],
      materials: [],
      colorValue: [
        {
          color: "",
          color_no: "",
          picurl: "",
          id: "",
        },
      ],
      value: "",
      tableData: [
        {
          content: "",
          material_name: "",
          id: "",
        },
      ],
      class_datas_id: "",
      classDatasId: "",
      materials_class_id: "",
      item: "",
      supplier_companyname: "",
      materials_supplier_id: "",
      rules: {
        // supplier_companyname: [
        //   { required: true, message: "请填写商品数量", trigger: "blur" }
        // ],
        materialsno: [
          { required: true, message: "请输入编号", trigger: "blur" },
        ],
        breadth: [{ required: true, message: "请输入幅宽", trigger: "blur" }],
        grammage: [{ required: true, message: "请输入克重", trigger: "blur" }],
        materialsname: [
          { required: true, message: "请输入面料名称", trigger: "blur" },
        ],
        materials_mainclass_name: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        materials_class_name: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        unit: [
          { required: true, message: "请选择计算单位", trigger: "change" },
        ],
        // wsale_price: [
        //   { required: true, message: "请输入大货单价", trigger: "blur" },
        // ],
        // instock: [
        //   { required: true, message: "请选择是否发货", trigger: "change" },
        // ],
        // arrival_time: [
        //   { required: true, message: "请选择时间", trigger: "change" },
        // ],
      },
      material_dataRules: {
        material_data_material_name: [
          { required: true, message: "请输入面料成分", trigger: "change" },
        ],
        material_data_content: [
          { required: true, message: "请输入面料比例", trigger: "blur" },
        ],
      },
      color_dataRules: {
        color_data_color: [
          { required: true, message: "请选择颜色", trigger: "change" },
        ],
        color_data_color_no: [
          { required: true, message: "请输入颜色编号", trigger: "blur" },
        ],
      },
      loading: false,
      headImg: "",
      fileList: [],
      fileList1: "",
      contents: [],
      imgs: [],
      permission: [],
      classData: [],
      bosded: {
        value: "id",
        label: "classname",
        children: "class_data",
      },
      visible: false, //弹窗
      // loading: false, //上传按钮加载
      os: false, //控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 500,
      videoHeight: 400,
      postOptions: [],
      CertCtl: "",
      // 遮罩层
      // loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total1: 0,
      total: 0,
      // 项目人员表格数据
      akworkerList: [],
      //工种类别数据字典
      workerTypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imgSrc: undefined,
      },
      numberr: 0,
      s_company: [],
      index: 0,
      vs1: false,
      pageSize: 24,
      pageIndex: 1,
      length: 1,
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.materials;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item, index) {
      if (
        this.materials.filter(this.createFilter(item.material_name)).length == 0
      ) {
        this.$confirm("是否添加", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await materialAdd({ material_name: item.material_name });
            this.getMaterialList();
          })
          .catch((err) => {
            this.materials.map((v, i) => {
              if (index == i) {
                v.material_name = "";
              }
            });
            this.$message({
              type: "success",
              message: "已取消添加",
            });
          });
      }
    },
    add_Supplier() {
      // this.$router.push({ path: "/addSupplier?loca=1" });
      let form = JSON.stringify(this.form);
      localStorage.setItem("form", form);
      this.$router.push({
        path: `/addSupplier?loca=1&index=1&`,
      });
    },
    variation(index) {
      if (index) {
        this.active++;
      } else {
        this.active--;
      }
    },
    choice() {
      this.dialogVisible = true;
    },
    handleChange(e) {
      let pid = 0;
      this.classData.map((v, i) => {
        if (v.classname == "辅料") {
          pid = v.id;
        }
      });
      console.log(pid);
      if (e != undefined) {
        if (e[0] != pid) {
          if (this.nav.length == 3) {
            this.nav.splice(2, 0, "物料信息");
          }
        } else {
          if (this.nav.length == 4) {
            this.nav.splice(2, 1);
          }
        }
        this.form["materials_class_id"] = e[1];
      } else {
        if (this.nav.length == 3) {
          this.nav.splice(2, 0, "物料信息");
        }
      }
    },
    // 切换内容
    actives(index) {
      this.active = index;
    },
    cancel() {
      if (this.headImg === "") {
        this.option.img = "";
      }
      this.centerDialogVisible = false;
    },

    ctrlShift() {
      var alink = document.createElement("a");
      alink.href = this.imgSrc;
      alink.download = "pic"; //图片名
      alink.click();
      // this.downloadIamge(this.fileList1, 'pic')
    },
    /*调用摄像头拍照开始*/
    onTake(num) {
      if (num != undefined) {
        this.numberr = num;
      }
      this.visible = true;
      this.getCompetence();
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async onCancel(num) {
      this.visible = false;
      this.dialogVisible = false;
      /* this.resetCanvas();*/
      this.stopNavigator();
      if (num != 101) {
        this.fileList1 = this.imgSrc;
        let file = this.dataURLtoFile(this.imgSrc, String(Math.random()));
        let param = new FormData(); // 创建form对象
        param.append("image", file); // 通过append向form对象添加数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let res = await discern(param, config);
        this.contents = res.data.data.words_result;
        if (this.contents) {
          this.contents = this.contents.filter((v) => {
            return !/^\d{1,3}$/.test(v.words);
          });
        }
        let arr = this.pregMaterial(this.contents, this.materials);
        if (arr.length != 0) {
          this.form.material_data = arr;
        }
        this.contents.map((v, i) => {
          this.s_company.map((v1, i1) => {
            if (v.words == v1.value) {
              this.form.supplier_companyname = v1.value;
              this.form.materials_supplier_id = i1.address;
            }
          });
          if (
            v.words.slice(0, 2) == "品名" ||
            v.words.slice(0, 2) == "货号" ||
            v.words.slice(0, 2) == "编号"
          ) {
            if (v.words.indexOf(":") != -1) {
              this.form.materialsno = v.words.slice(3);
            } else {
              this.form.materialsno = v.words.slice(2);
            }
          }
        });
        this.length = this.form.material_data.length;
      } else {
        let file = this.dataURLtoFile(this.imgSrc, String(Math.random()));
        this.fileName = String(Math.random()) + ".png";
        this.option.img = this.imgSrc;
      }
      // this.imgSrc = "";
      this.clearCanvas("canvasCamera");
    },
    // 调用摄像头权限
    getCompetence() {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this;
        this.os = false; //切换成关闭摄像头
        this.thisCancas = document.getElementById("canvasCamera");
        this.thisContext = this.thisCancas.getContext("2d");
        this.thisVideo = document.getElementById("videoCamera");
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
              );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: "scaleX(-1)",
          },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            this.$notify({
              title: "警告",
              message: "没有开启摄像头权限或浏览器版本不兼容.",
              type: "warning",
            });
          });
      });
    },
    //绘制图片
    drawImage() {
      // 点击，canvas画图
      // console.log(this.thisContext);
      this.thisContext.drawImage(
        this.thisVideo,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      );
      // 获取图片base64链接
      this.imgSrc = this.thisCancas.toDataURL("image/png");
      /*const imgSrc=this.imgSrc;*/
    },

    //清空画布
    clearCanvas(id) {
      let c = document.getElementById(id);
      let cxt = c.getContext("2d");
      cxt.clearRect(0, 0, c.width, c.height);
    },
    //重置画布
    resetCanvas() {
      this.imgSrc = "";
      this.clearCanvas("canvasCamera");
    },
    //关闭摄像头
    stopNavigator() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        this.os = true; //切换成打开摄像头
      }
    },
    //放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      // let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          Api(formData).then((response) => {
            if (this.status === 1) {
              for (let i = 0; i < this.colorValue.length; i++) {
                this.form1.picurl = response.data.data.pic_file_url;
              }
              this.imgFile = "";
            }
            if (this.status === 2) {
              this.form1.picurl = response.data.data.pic_file_url;
              this.imgFile = "";
            }
            this.$message({
              //element-ui的消息Message消息提示组件
              type: "success",
              message: "上传成功",
            });
          });
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
      this.centerDialogVisible = false;
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //下载图片
    down(type) {
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      // console.log(e.target.files[0])
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
      this.option.autoCropWidth = 150;
      this.option.autoCropHeight = 150;
    },
    imgLoad(msg) {},
    // *******************识别内容********************
    beforeRecognition() {
      this.loading = true;
      this.dialogVisible = false;
    },
    errorRecognition() {
      this.loading = false;
      this.dialogVisible = false;
    },
    // ****
    pregMaterial(words, material) {
      let result = [];
      for (let i in words) {
        let arr = words[i]["words"].match(
          /([a-zA-Z]\/?[a-zA-Z]?[0-9]{1,2})|([0-9]{1,3}%[a-zA-Z]\/?[a-zA-Z]?)|([\u4E00-\u9FA5]+[0-9]{1,3}%?$)/g
        );
        for (let j in arr) {
          for (let k in material) {
            let value = arr[j].match(
              /([a-zA-Z]\\?[a-zA-Z]?)|(^[\u4E00-\u9FA5]+)/
            );
            if (
              value != null &&
              (material[k]["short_name"] == value[0] ||
                material[k]["material_name"] == value[0])
            ) {
              result.push({
                material_name: material[k].name,
                content: arr[j].match(/[0-9]+/)[0],
                id: material[k].id,
              });
              break;
            }
          }
        }
      }
      return result;
    },
    async recognition(response, file, fileList) {
      this.loading = false;
      this.dialogVisible = false;
      this.length = this.form.material_data.length;
      this.fileList1 = URL.createObjectURL(file.raw);
      this.imgs.push(URL.createObjectURL(file.raw));
      this.contents = response.data.words_result;
      this.contents = this.contents.filter((v) => {
        return !/^\d{1,3}$/.test(v.words);
      });
      let arr = this.pregMaterial(this.contents, this.materials);
      if (arr.length != 0) {
        this.form.material_data = arr;
      }
      this.contents.map((v, i) => {
        this.s_company.map((v1, i1) => {
          if (v.words == v1.value) {
            this.form.supplier_companyname = v1.value;
            this.form.materials_supplier_id = i1.address;
          }
        });
        if (
          v.words.slice(0, 2) == "品名" ||
          v.words.slice(0, 2) == "货号" ||
          v.words.slice(0, 2) == "编号"
        ) {
          if (v.words.indexOf(":") != -1) {
            this.form.materialsno = v.words.slice(3);
          } else {
            this.form.materialsno = v.words.slice(2);
          }
        }
        if (v.words.slice(0, 2) == "幅宽") {
          if (v.words.indexOf(":") != -1) {
            this.form.breadth = v.words.slice(3, -2);
          } else {
            this.form.breadth = v.words.slice(2, -2);
          }
        }
        if (v.words.slice(0, 2) == "克重") {
          if (v.words.indexOf(":") != -1) {
            this.form.grammage = v.words.slice(3, -1);
          } else {
            this.form.grammage = v.words.slice(2, -1);
          }
        }
      });
    },
    rot() {
      this.$router.push({ path: `/materialClassification` });
    },
    handleImg(item) {
      this.item = item;
      this.previews.url = "";
      this.option.img = "";
      this.status = 1;
      this.centerDialogVisible = true;
    },
    handleFormImg() {
      this.previews.url = "";
      this.option.img = "";
      this.status = 2;
      this.centerDialogVisible = true;
    },
    handleIngredient() {
      this.form.material_data.push({
        content: "",
        material_name: "",
        id: "",
      });
      this.length = this.form.material_data.length;
    },
    handleColor() {
      this.form.color_data.push({
        color: "",
        color_no: "",
        picurl: "",
        id: "",
      });
    },
    handleDeleteUser(index) {
      this.form.material_data.splice(index, 1);
      this.length = this.form.material_data.length;
    },
    handleDeleteColor(index) {
      this.form.color_data.splice(index, 1);
    },
    async handleClassDatasId(e) {
      this.classDatasId = e;
      let res = await getMaterialsClassInfo({
        id: this.classDatasId || this.form.mainclass_id,
      });
      let { data } = res.data;
      this.class_datas = data;
      this.form.materials_class_name = "";
      this.form.materials_class_id = "";
      if (data.class_data.length > 0) {
        this.form.materials_class_name = this.class_datas.class_data[0].classname;
        this.form.materials_class_id = this.class_datas.class_data[0].id;
      }
    },
    handleClassDatasIds(e) {
      this.form.materials_class_id = e;
    },
    handleAvatarSuccessPanels(res, file) {
      this.form1.picurl = res.data.pic_file_url;
    },
    beforeAvatarUpload(file) {
      return this.$elUploadBeforeUpload(file);
    },
    async getClassData() {
      let res = await getMaterialsClass();
      let { data } = res.data;
      this.classData = data;
    },
    async get_class_data() {
      let res = await getMaterialsClassInfo({ id: this.classDatasId });
      let { data } = res.data;
      this.class_datas = data;
    },
    async getUnit() {
      let res = await getUnitSelect();
      let { data } = res.data;
      this.units = data;
    },
    async getColor() {
      let res = await getColorSelect();
      let { data } = res.data;
      this.colors = data;
    },
    async handleDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res = await materialsDel({ id });
          this.$router.push({ path: "/routeCard_list" });
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
    async handleEdit() {
      if (this.form.color_data.length == 0) {
        this.active = 0;
        this.$message({
          showClose: true,
          message: "请将数据填充完整！",
          type: "error",
        });
      } else if (
        this.form.materials_class_id == "" ||
        this.form.wsale_price == "" ||
        this.form.materialsname == "" ||
        this.form.unit == ""
      ) {
        this.active = 1;
        this.$message({
          showClose: true,
          message: "请将数据填充完整！",
          type: "error",
        });
      } else if (this.form.materials_supplier_id == "") {
        this.active = 1;
        this.$message({
          showClose: true,
          message: "请点击选择下面的供应商",
          type: "error",
        });
      } else if (
        (this.form.materialsno == "" && this.nav.length > 4) ||
        (this.form.breadth == "" && this.nav.length > 4) ||
        (this.form.grammage == "" && this.nav.length > 4) ||
        this.nav.length > 4
      ) {
        this.active = 2;
        this.$message({
          showClose: true,
          message: "请将数据填充完整！",
          type: "error",
        });
      } else {
        delete this.form["supplier_id"];
        delete this.form["supplier_companyname"];
        delete this.form["materials_supplier_data"];
        this.form.color_data.map((v, i) => {
          if (v.color instanceof Array) v.color = v.color.pop();
        });
        if (this.nav.length < 4) {
          this.form.materialsno = "";
          this.form.breadth = "";
          this.form.grammage = "";
          this.form.material_data = "";
        }

        let res = await materialsAdd(this.form);
        // this.$router.go(-1);
        this.router.push({ path: "routeCard_list" });
        let back = this.$route.query.back - 0;
        let id = this.$route.query.id - 0;
        if (back == 1) {
          this.router.push({ path: `materialProcess?id=${id}` });
        }
      }
    },
    async getMaterialList() {
      let res = await getMaterialSelect();
      let { data } = res.data;
      this.materials = data;
    },
    recompose(item, index) {
      if (this.form1.picurl != "") {
        this.$message({
          showClose: true,
          message: "请先保存",
          type: "error",
        });
        return;
      }
      if (this.form1.color != "") {
        this.$message({
          showClose: true,
          message: "请先保存",
          type: "error",
        });
        return;
      }
      if (this.form1.color_no != "") {
        this.$message({
          showClose: true,
          message: "请先保存",
          type: "error",
        });
        return;
      }
      this.form1.picurl = item.picurl;
      this.form1.color_no = item.color_no;
      this.form1.color = item.color;
      this.form1.timer_out = item.timer_out;
      this.form.color_data.map((v, i) => {
        if (item.timer_out == v.timer_out) {
          if (v.color_no == "无编号") {
            v.color_no = "";
          }
          v.color = "";
        }
      });
    },
    dels(index) {
      this.$confirm("此操作将永久删除该色卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.color_data.splice(index, 1);

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
    determine() {
      if (this.form1.picurl == "") {
        this.$message({
          type: "error",
          message: "请上传图片",
        });
      } else if (this.form1.color == "") {
        this.$message({
          type: "error",
          message: "请选择颜色",
        });
      } else if (this.form1.color_no == "") {
        this.$message({
          type: "error",
          message: "请填写色号",
        });
      } else {
        for (let index = 0; index < this.form.color_data.length; index++) {
          if (this.form.color_data[index].color == this.form1.color) {
            this.$message({
              type: "error",
              message: "颜色不可重复",
            });
            return;
          }
          if (
            this.form.color_data[index].color_no == this.form1.color_no &&
            this.form.color_data[index].color_no != "无编号"
          ) {
            this.$message({
              type: "error",
              message: "色号不可重复",
            });
            return;
          }
        }
      }
      if (
        !this.form1.picurl == "" &&
        !this.form1.color == "" &&
        !this.form1.color_no == ""
      ) {
        if (this.form1.timer_out == "") {
          this.form.color_data.push({
            picurl: this.form1.picurl,
            color: this.form1.color,
            color_no: this.form1.color_no,
            timer_out: new Date().getTime(),
          });
        }
        if (this.form1.timer_out != "") {
          this.form.color_data.map((v, i) => {
            if (v.timer_out == this.form1.timer_out) {
              v.picurl = this.form1.picurl;
              v.color = this.form1.color;
              v.color_no = this.form1.color_no;
              v.timer_out = new Date().getTime();
            }
          });
        }
        this.form1.picurl = "";
        this.form1.color = "";
        this.form1.color_no = "";
        this.form1.timer_out = "";
      }
    },
    changese(e) {
      this.form1.color = e[1];
    },
    async impedance() {
      let res = await getSupplierList({
        companyname: this.form1.companyname,
        page: this.pageIndex,
        page_size: this.pageSize,
      });
      let { data, count } = res.data;
      this.total1 = count;
      this.SupplierList = data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.impedance();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.impedance();
    },
    async listDeital(item) {
      let res = await getSupplierList({
        companyname: item.companyname,
        page: 1,
        page_size: 1,
      });
      let { data, count } = res.data;
      this.total1 = count;
      this.SupplierList_item = data;
      this.form.materials_supplier_id = item.id;
    },
  },
  async mounted() {
    let loca = this.$route.query.loca - 0;
    if (loca == 1) {
      let index = this.$route.query.index - 0;
      this.form = {};
      let form1 = localStorage.getItem("form");
      let form2 = JSON.parse(form1);
      this.form = form2;
      this.active = index;
    } else {
      localStorage.removeItem("form");
    }
    this.getClassData();
    this.getUnit();
    this.getColor();
    this.getMaterialList();
    let res = await getSupplierSelect({
      keyword: "",
    });
    this.impedance();
    let { data } = res.data;
    this.s_company = data;
    this.permission = localStorage.getItem("permission").split(",");
  },
};
</script>

<style lang="less" scoped>
.addRouteCard {
  .main {
    overflow: hidden;
  }
  /deep/.el-icon-search {
    color: #cccccc !important;
    height: 30px !important;
    line-height: 30px;
  }

  /deep/.el-input {
    width: 130px !important;
    height: 40px;
    margin-bottom: 5px;
  }
  /deep/.el-textarea__inner {
    background-color: #f2f2f2;
    border-radius: 15px;
    border: none;
    color: #5e5e5e;
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
    padding: 10px;
  }
  /deep/.el-input__inner {
    width: 100%;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 15px;
    border: none;
    color: #5e5e5e;
    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
      \\5b8b\4f53, sans-serif;
  }
  .search_button {
    margin-left: 10px;
    background-color: #000;
  }
  /deep/ .el-icon-search {
    color: #fff;
  }
  /deep/.el-button {
    border: none;
  }
  //
  /deep/input::-webkit-input-placeholder {
    text-align: center;
  }
  /deep/input::-moz-input-placeholder {
    text-align: center;
  }
  /deep/input::-ms-input-placeholder {
    text-align: center;
  }
  // 导航
  .nav {
    margin-bottom: 50px;
    ul {
      overflow: hidden;
      li {
        float: left;
        display: block;
        height: 25px;
        margin-right: 20px;
        background: #f2f2f2;
        border-radius: 15px;
        width: 100px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  /deep/.is-circle {
    padding: 8px;
    margin-left: 5px;
  }
  // 点击样式
  .active {
    color: #ffffff;
    background: #000000 !important;
  }
  // 色号
  .contents1 {
    overflow: hidden;
    .texts {
      margin-top: 40px;
    }
    .optional {
      span {
        margin-bottom: 20px;
        display: block;
        width: 80px;
        height: 30px;
        padding-top: 5px;
        background-color: #f2f2f2;
        border-radius: 15px;
        border: none;
        color: #5e5e5e;
        font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
          \\5b8b\4f53, sans-serif;
        text-align: center;
      }
      .ensure {
        margin-top: 20px;
        .step {
          width: 86px;
          background: #000;
          margin: 0;
          height: 30px;
          border-radius: 15px;
          line-height: 2px;
          color: #eee;
          margin-right: 20px;
        }
        .next1 {
          width: 139px;
          background: #000;
          margin: 0;
          height: 30px;
          border-radius: 15px;
          line-height: 2px;
          color: #eee;
        }
      }
      .radio {
        width: 200px;
        height: 30px;
        background-color: #f2f2f2;
        border-radius: 15px;
        border: none;
        margin-bottom: 20px;
        .el-radio-group {
          width: 100%;
          text-align: center;
          line-height: 30px;
          .el-radio {
            padding-top: 10px;
          }
        }
      }
      .inputed {
        margin-top: 20px;
      }
    }
    .el-divider {
      float: left;
    }
    .headr_list {
      overflow: hidden;
    }
    .update {
      overflow: hidden;
      float: left;
      background: #e0dcdc;
      border-radius: 10px;
      width: 150px;
      height: 150px;
      margin-right: 25px;
    }
    .cont {
      width: 400px;
      height: 150px;
      .determine {
        width: 130px;
        background: #000;
        margin-left: 0;
        margin-top: 30px;
        line-height: 2px;
        height: 30px;
        border-radius: 15px;
        color: #eee;
      }
    }
    .abc {
      float: right;
      position: relative;
      .next {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 150px;
        background: #000;
        margin: 0;
        height: 30px;
        border-radius: 15px;
        line-height: 2px;
        color: #eee;
      }
    }

    .input_s {
      position: relative;
      .left_float {
        margin-right: 20px;
      }
      .box {
        width: 500px !important;
      }
      .maxsize {
        width: 280px !important;
        height: 40px;
        margin-bottom: 5px;
      }

      .next {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 150px;
        background: #000;
        margin: 0;
        height: 30px;
        border-radius: 15px;
        line-height: 2px;
        color: #eee;
      }
    }
    .colorCard {
      ul {
        li {
          float: left;
          display: block;
          width: 340px;
          height: 90px;
          overflow: hidden;
          margin-right: 40px;
          margin-bottom: 40px;
          position: relative;
          cursor: pointer;
          .del {
            position: absolute;
            top: 5px;
            right: 10px;
          }
          .del:hover {
            border: 1px solid #000;
          }
          .imgs {
            height: 90px;
            width: 90px;
            border-radius: 10px 0 0 10px;
            float: left;
            overflow: hidden;
          }
          .substance {
            float: left;
            width: 250px;
            height: 90px;
            background: #f2f2f2;
            padding: 20px 0 0 20px;
            border-radius: 0 10px 10px 0;
            h6 {
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .contents2 {
    .dataList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 260px;
        height: 60px;
        margin: 0 10px 10px 0;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f2f2f2;
        display: flex;
        cursor: pointer;
        float: left;
        .list_img {
          img {
            width: 60px;
            height: 60px;
          }
        }
        .list_content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding: 5px 20px;
          .list_content_left {
            .list_content_left_name {
              font-weight: 600;
              color: #000;
              div {
                padding: 5px 0;
              }
            }
          }
        }
      }
    }
    .input_s {
      height: 251px;
    }
    .sencond {
      height: 150px;
      .bax {
        overflow: hidden;
        height: 150px;
      }
      .recognition_right {
        float: left;
        margin-left: 25px;
        height: 150px;
      }
      .makeup {
        float: left;
        max-width: 860px;
        height: 150px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .boxs {
          width: 400px;
          height: 30px;
          display: flex;
          //   width: 280px;
          //   height: 30px;
          overflow: hidden;
          //   margin-bottom: 15px;
          //   margin-left: 20px;
          margin: 0 0 20px 20px;
          padding: 0 10px;
          background-color: #f2f2f2;
          border-radius: 15px;
          justify-content: space-between;
          align-items: center;
          border: none;
          .el-autocomplete {
            flex: 1;
            height: 30px;
            input {
              width: 100%;
            }
          }
          .el-input {
            flex: 1;
            height: 30px;
            input {
              width: 100%;
            }
          }

          //   .el-select {
          //     float: left;
          //   }
          //   .el-input {
          //     float: left;
          //   }
          //   .el-icon-plus {
          //     float: left;
          //     line-height: 30px;
          //     text-align: center;
          //   }
          //   .el-icon-minus {
          //     float: left;
          //     line-height: 30px;
          //     text-align: center;
          //   }
        }
      }
      .recognition {
        float: left;
        position: relative;
        width: 120px;
        height: 120px;
        background: #f2f2f2;
        border-radius: 25px;
        cursor: pointer;
        span {
          display: block;
          font-size: 40px;
          text-align: center;
          line-height: 120px;
        }
        em {
          position: absolute;
          left: 50%;
          top: 48%;
          font-size: 14px;
          font-weight: 600;
          margin-left: -28px;
          margin-top: 20px;
        }
      }
    }
    .right_float {
      width: 226px;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      right: 0;
      .next1 {
        float: right;
        width: 139px;
        background: #000;
        margin: 0;
        height: 30px;
        border-radius: 0 15px 15px 0;
        line-height: 2px;
        color: #eee;
      }
      .step {
        float: left;
        width: 86px;
        background: #000;
        margin: 0;
        height: 30px;
        border-radius: 15px 0 0 15px;
        line-height: 2px;
        color: #eee;
      }
    }
  }

  // 基础信息
  // 物料信息
  // 选填内容
  .wuln {
    .upload {
      float: left;
      width: 200px;
      height: 200px;
      border-radius: 10px;
      overflow: hidden;
      .avatar-uploader-icon {
        border: 1px solid #ccc;
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .upload-demo {
    display: inline-block;
    height: 40px;
    text-align: center;
    margin-right: 40px;
    .el-button {
      height: 40px;
      border-radius: 10px;
    }
  }
  .camera {
    display: inline-block;
    height: 40px;
    text-align: center;
    border-radius: 10px;
  }
  .texa {
    /deep/.el-form-item__content {
      margin-left: 30px !important;
    }
  }
  .image-content {
    max-width: 500px;
    height: auto;
    ul {
      padding: 10px;
      display: block;
      li {
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
        padding-bottom: 5px;
        border-bottom: 1px solid #000000;
      }
      li:first-of-type {
        font-weight: 600;
        margin: 8px;
      }
    }
    /deep/.el-image-viewer__wrapper {
      img {
        width: auto;
        height: auto;
        max-height: auto;
      }
    }
  }
  /deep/textarea {
    width: 500px;
    height: 150px;
    resize: none !important;
  }
  .rot {
    height: 40px;
    line-height: 40px;
    display: block;
    margin-left: 20px;
  }
  .rot:hover {
    cursor: pointer;
    color: coral;
  }
  .member_user_item {
    border-bottom: 1px #eee dashed;
    position: relative;
    display: flex;

    .deleteUser {
      display: block;
      background: #ddd;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      line-height: 16px;
      color: #fff;
      cursor: pointer;
      border-radius: 50px;
      margin: 10px 20px;
    }
  }
  .color_user_item {
    border-bottom: 1px #eee dashed;
    position: relative;
    display: flex;
    .deleteUser {
      display: block;
      background: #ddd;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      line-height: 16px;
      color: #fff;
      cursor: pointer;
      border-radius: 50px;
      margin: 10px 20px;
    }
    // .upload {
    //   width: 178px;
    //   height: 178px;
    //   border-radius: 10px;
    //   overflow: hidden;
    //   i {
    //     border: 1px solid #ccc;
    //   }
    // }
  }
  @media screen and (max-width: 1430px) {
    .dialog {
      width: 1430px;
    }
  }
  .dialog {
    div {
      overflow: hidden;
    }
    .aj {
      // display: flex;
      float: left;
      margin-left: 30px;
      height: 40px;
      background: rgba(243, 242, 242, 0);
      color: #000;
      border: 1px solid #cccccc;
    }
    .upload {
      float: left;
      margin-bottom: 30px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      position: relative;
      cursor: pointer;
      color: #888;
      background: #fafafa;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      *zoom: 1;
      #uploads {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
      }
    }
    .info {
      width: 720px;
      margin: 0 auto;
      .oper-dv {
        height: 20px;
        text-align: right;
        margin-right: 100px;
        a {
          font-weight: 500;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .info-item {
        margin-top: 15px;
        label {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        .sel-img-dv {
          position: relative;
          .sel-file {
            position: absolute;
            width: 90px;
            height: 30px;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
          }
          .sel-btn {
            position: absolute;
            cursor: pointer;
            z-index: 1;
          }
        }
      }
    }
    .cropper-content {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
      .cropper {
        width: 500px;
        height: 500px;
      }
      .show-preview {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-left: 30px;
      }
    }
    .cropper-content .show-preview .preview {
      margin-left: 0px;
    }
  }
  /deep/.el-dialog__body {
    text-align: center !important;
  }
}
</style>