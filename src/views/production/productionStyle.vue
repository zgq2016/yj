<template>
  <div class="productionStyle">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <img src="../../assets/mbxlogo.svg" alt class="mbxlogo" />
      <el-breadcrumb-item>生产</el-breadcrumb-item>
      <el-breadcrumb-item>生产款式档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="info">
        <div class="basicsInfo">
          <div class="basicsInfoName">款式基础信息</div>
          <div class="basicsInfoImg">
            <img :src="obj.style_pic_url" alt />
            <img :src="obj.style_color_pic_url" alt />
          </div>
        </div>
        <div class="materialCardInfo">
          <div class="materialCardInfoName">物料卡信息</div>
          <div class="materialCardInfoContent">
            <div style="font-size:20px;font-weight: 600;">{{obj.stylename}}</div>
            <div style="display:flex">
              <div style="margin-right:100px">
                <div>款号：{{obj.styleno}}</div>
                <div>品类：{{obj.style_type}}</div>
                <div>年份：{{obj.year}}</div>
                <div>季节：{{obj.season}}</div>
                <div>颜色：{{obj.style_color}}</div>
                <div>设计师：{{obj.user_name}}</div>
              </div>
              <div>
                <div>物料总费：</div>
                <div>加工费：</div>
                <div>工艺费：</div>
                <div>总成本：</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 下单批次： -->
      <div class="placeAnOrderBatchInfo">
        <div class v-for="(item,index) in ob" :key="index">
          <div
            class="placeAnOrderBatch sty"
            style="display: flex;justify-content: center;align-items: center;"
            @click.stop="switchingStyle(item,index)"
            :class="active===index?'active':''"
          >
            <div class="color">下单批次：{{item.num}}</div>
            <div class="el-icon-close" @click.stop="styleColorDel(item,index)"></div>
          </div>
        </div>
        <!-- <div class="placeAnOrderBatch">下单批次：2</div> -->
        <div class="placeAnOrderBatch increase" @click.stop="increaseBatch">+ 增加批次</div>
      </div>
      <!-- 增加批次窗 -->
      <el-dialog title="增加批次" :visible.sync="centerDialogVisible" width="30%" center>
        <span style="text-align: center;width:100%;display:inline-block;">请确定是否增加批次！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDesign">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 步骤条 -->
      <el-steps
        :space="90"
        :active="8"
        align-center
        process-status="process"
        finish-status="success "
      >
        <el-step icon="el-icon-success" description="02.20 20:30" title="准备下单"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="已下单"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="主料已下单"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="主料回料"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="辅料全部回料"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="已指派"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="已裁剪"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="部分出货"></el-step>
        <el-step icon="el-icon-success" description="02.20 20:30" title="全部出货"></el-step>
      </el-steps>
      <!-- 信息部分 -->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="下单信息" name="1">
          <div class="orderInformation">
            <!-- 没数据或者修改 -->
            <div v-if="!show" style="margin:0 0 10px 0;">
              <!-- 第一个表单 -->
              <el-form style="position: relative;" v-if="king" label-width="80px">
                <el-form-item label="客户">
                  <el-select
                    v-model="form_i.companyname"
                    @change="user_changed()"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in users"
                      :key="item.id"
                      :label="item.companyname"
                      :value="item.companyname"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item style="position: absolute; top:0;left:300px;" label="出货时间">
                  <el-date-picker
                    v-model="form_i.date"
                    @change="dateChanged()"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="颜色">
                  <!-- <el-input v-model="form.name" style="width:200px"></el-input> -->
                  <span :v-model="form_i.color" style="margin-left:20px;">{{form_i.color}}</span>
                </el-form-item>
                <el-form-item label="总量">
                  <el-input v-model="form_i.sum" @input="inputChange()" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="尺码">
                  <div
                    style="width:100px;margin:0 10px;float:left;  display: inline-block;text-align: center;overflow: hidden;"
                    v-for="(itemSize,indexSize) in form_i.size_name"
                    :key="indexSize"
                  >
                    <span
                      v-if="form_i.size_name"
                      style="width:80px;float:left; text-align: center;"
                    >{{itemSize}}</span>
                  </div>

                  <el-popover placement="bottom" title="请选择尺码" width="450" trigger="click">
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="form_i.size_name"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="(itemc,indexc) in sizes"
                        :label="itemc.size_name"
                        :key="indexc"
                      >{{itemc.size_name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-button slot="reference">选择尺码</el-button>
                  </el-popover>
                </el-form-item>

                <el-form-item label="比例">
                  <el-input
                    @input="inputChange()"
                    v-for="(itemScale,indexScale) in form_i.ratio"
                    :key="indexScale"
                    v-model="form_i.ratio[indexScale]"
                    style="display: inline-block;width:100px;margin:0 10px;"
                  ></el-input>
                </el-form-item>

                <el-form-item label="数量">
                  <el-input
                    disabled
                    v-for="(itemNum,indexNum) in form_i.quantity"
                    :key="indexNum"
                    v-model="form_i.quantity[indexNum]"
                    style="width:100px;margin:0 10px;"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="danger"
                  style="width:100px;position:absolute;right:100px;top:20px;"
                  @click.stop="omit()"
                  round
                >删除</el-button>
                <hr style="border:1px dashed #999999" />
              </el-form>

              <!-- 循环出来的表单 -->
              <el-form
                ref="form"
                v-for="(item,index) in form"
                :key="index"
                style="position: relative;"
                label-width="80px"
              >
                <el-form-item label="颜色">
                  <!-- <el-input v-model="form.name" style="width:200px"></el-input> -->
                  <span style="margin-left:20px;">{{item.color}}</span>
                </el-form-item>
                <el-form-item label="总量">
                  <el-input
                    v-model="item.sum"
                    @input="inputChange(index,index)"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="尺码">
                  <div
                    style="width:100px;margin:0 10px;float:left;  display: inline-block;text-align: center;overflow: hidden;"
                    v-for="(itemSize,indexSize) in item.size_name"
                    :key="indexSize"
                  >
                    <span style="width:80px;float:left; text-align: center;">{{itemSize}}</span>
                  </div>
                  <el-popover placement="bottom" title="请选择尺码" width="450" trigger="click">
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="form[index].size_name"
                      @change="checked => handleCheckedCitiesChange(checked,index)"
                    >
                      <el-checkbox
                        v-for="(itemc,indexc) in sizes"
                        :label="itemc.size_name"
                        :key="indexc"
                      >{{itemc.size_name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-button slot="reference">选择尺码</el-button>
                  </el-popover>
                </el-form-item>

                <el-form-item label="比例">
                  <el-input
                    @input="inputChange(index,index)"
                    v-for="(itemScale,indexScale) in item.size_name"
                    :key="indexScale"
                    v-model="ratio[index][indexScale]"
                    style="display: inline-block;width:100px;margin:0 10px;"
                  ></el-input>
                </el-form-item>

                <el-form-item label="数量">
                  <el-input
                    disabled
                    v-for="(itemNum,indexNum) in item.size_name"
                    :key="indexNum"
                    v-model="quantity[index][indexNum]"
                    style="width:100px;margin:0 10px;"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="danger"
                  style="width:100px;position:absolute;right:100px;top:20px;"
                  @click="omit(index)"
                  round
                >删除</el-button>
                <hr style="border:1px dashed #999999" />
              </el-form>
            </div>
            <!-- 确定订单和新增颜色 -->
            <el-form v-if="show1" :ref="form1" :v-if="lot.length == 0" style="width:100%;">
              <el-form-item style="width:300px; float:left;" label="增加颜色">
                <el-select
                  v-model="color"
                  @change="changed"
                  @click="styleColorSelect()"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in colors"
                    :key="item.id"
                    :label="item.style_color_name"
                    :value="item.style_color_name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style=" float:right;">
                <el-button @click="clickOrders()">确认下单</el-button>
              </el-form-item>
            </el-form>
            <!-- 有数据 -->
            <div v-if="show">
              <el-form style="position: relative;width:auto;height:300px;" label-width="80px">
                <span style="position:absolute;left:20%;font-size:14px;">出货时间 {{this.form_i.date}}</span>
                <div class="table_header">
                  <div class="table_nav">
                    <span>颜色</span>
                    <span v-for="(item_t,index_t) in t_size" :key="index_t">{{item_t}}</span>
                    <span>数量</span>
                    <span>总数</span>
                  </div>
                  <div v-for="(item_c,index_c) in table" :key="index_c" class="table_list">
                    <span>{{item_c.style_color_name}}</span>
                    <span v-for="(item_q,index_q) in all[index_c]" :key="index_q">{{item_q}}</span>
                    <span>{{item_c.total}}</span>
                    <span>{{item_c.sum}}</span>
                  </div>
                </div>
                <el-button
                  style="width:100px;position:absolute;right:100px;top:20px;"
                  @click="btnModify()"
                  round
                  type="info"
                >修改</el-button>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="采购" name="2">
          <div class="purchase" v-if="king1">
            <div class="color">
              <span
                v-for="(item_color,index_color) in chang_color"
                :key="index_color"
                :class="active1===index_color?'active':''"
                @click="purchaseChanged(item_color,index_color)"
                style="margin:0 10px;width:60px;padding:5px;text-align:center;cursor: pointer;"
              >{{item_color}}</span>
            </div>

            <div class="material_purchase">
              <div v-for="(item, index) in cardList" :key="index">
                <div class="content" v-for="(item1, index1) in item.list" :key="index1">
                  <div class="card">
                    <div class="cardStyle">
                      <div class="cardStyle_left">
                        <div class="cardStyle_left_img">
                          <img :src="item1.picurl" alt />
                        </div>
                        <div class="cardStyle_left_content">
                          <div class="cardStyle_left_content_name">
                            <div>{{item1.mainclass}}</div>
                            <div class="el-icon-close" @click="procureDel(item1)"></div>
                          </div>
                          <div>{{item1.color}}</div>
                          <div>内部编号:{{item1.materialsno}}</div>
                          <div>{{item1.companyname}}</div>
                        </div>
                      </div>
                      <div class="cardStyle_right">
                        <div>
                          {{item1.color}}
                          <div>{{item1.color_no}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wastage">
                    <div>
                      大货单件用量
                      <div>20m</div>
                    </div>
                    <div>
                      损耗
                      <div>0.5m</div>
                    </div>
                  </div>
                  <div class="amount">
                    <div>
                      计算总用量
                      <div>100m</div>
                    </div>
                    <div>
                      计算总金额
                      <div>10000</div>
                    </div>
                  </div>
                  <div class="orderInformation" v-if="item1.produce_order_procure_log_data">
                    <!-- 步骤条 -->
                    <el-steps
                      finish-status="wait"
                      :active="item1.produce_order_procure_log_data.length-1"
                    >
                      <el-step
                        style="width:125px"
                        v-for="(item_g, index_g) in item1.produce_order_procure_log_data"
                        :key="index_g"
                        title
                        description
                        icon="el-icon-success"
                      >
                        <template v-slot:title>
                          <div class="tt">
                            <span>
                              {{item_g.logname}}
                              <em
                                v-if="item_g.state == '1'"
                              >{{item_g.quantity+"m"}}</em>
                              <!-- <em
                                v-if="item_g.state == '3'"
                              >{{(item1.amountPurchased)+'m'}}</em>-->
                            </span>
                            <span>{{item_g.ctime}}</span>
                          </div>
                        </template>
                        <template v-slot:description>
                          <div class="dt">
                            <span v-if="index_g==0">{{"预计回料时间"}}</span>
                            <span v-if="item_g.state == '2'">{{"延迟回料时间"}}</span>
                            <span v-if="item_g.state == '1'">{{"部分回料时间"}}</span>
                            <span v-if="item_g.state == '3'">{{"回料总量"}}</span>
                            <span v-if="item_g.state == '3'">{{item1.amountPurchased+'m'}}</span>
                            <span v-else-if="item_g.state == '0'">{{item1.finishTime}}</span>
                            <span v-else>{{item_g.returntime}}</span>
                          </div>
                        </template>
                      </el-step>
                    </el-steps>
                    <div v-if="item1.produce_order_procure_log_data">
                      <el-button
                        style="margin-left:10px"
                        size="mini"
                        @click.stop="seeDetails(item1)"
                        round
                        v-if="item1.amountPurchased == 0"
                      >采购录入</el-button>
                      <el-button
                        v-if="item1.amountPurchased != 0 && item1.produce_order_procure_log_data[item1.produce_order_procure_log_data['length']-1].state != 3 "
                        size="mini"
                        style="margin-left:10px"
                        @click.stop="updateStatus(item1)"
                        round
                      >更新状态</el-button>
                      <!-- <el-button size="mini"  style="margin-left:10px" @click.stop="seeDetails()" round>查看详情</el-button> -->
                    </div>
                  </div>
                </div>
                <el-divider v-if="item.list != 0" content-position="right">{{item.materials}}</el-divider>
              </div>
              <!-- <router-view :data="itemList"></router-view> -->
            </div>
            <!-- 弹框 -->
            <el-dialog
              width="30%"
              title="请选择更新后的状态"
              class="tan"
              :visible.sync="outerVisible"
              center
            >
              <!-- 全部回料 -->
              <el-dialog
                width="30%"
                title="请上传全部回料凭证"
                :visible.sync="innerVisibled1"
                append-to-body
                center
              >
                <el-form ref="form2" :model="form2" label-width="100px">
                  <el-upload
                    class="avatar-uploader1"
                    action="https://yj.ppp-pay.top/uploadpic.php"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="form2.imageUrl" :src="form2.imageUrl" class="avatar1" />
                    <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                  </el-upload>
                  <div style="width:150px;margin:0 auto">
                    <el-button @click="innerVisibled1 = false">取消</el-button>
                    <el-button @click="allMaterial()">确定</el-button>
                  </div>
                </el-form>
              </el-dialog>
              <!-- 部分回料 -->
              <el-dialog
                width="30%"
                title="部分回料"
                :visible.sync="innerVisible"
                append-to-body
                center
              >
                <el-form ref="form3" :model="form3" label-width="100px">
                  <el-form-item label="回料数量">
                    <el-input placeholder="请输入内容" style="width:200px" v-model="form3.number"></el-input>
                  </el-form-item>
                  <el-form-item label="结算金额">
                    <el-input placeholder="请输入内容" style="width:200px" v-model="form3.money"></el-input>
                  </el-form-item>
                  <el-form-item label="部分回料时间">
                    <el-date-picker v-model="form3.date" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="余结金额">
                    <span style="width:200px" :model="form3.money1"></span>
                  </el-form-item>
                  <el-upload
                    class="avatar-uploader"
                    action="https://yj.ppp-pay.top/uploadpic.php"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="form3.imageUrl" :src="form3.imageUrl" class="avatar" />
                    <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                  </el-upload>
                  <div style="width:200px;margin:0 auto">
                    <el-button @click="innerVisible = false">取消</el-button>
                    <el-button @click="partBack()">确定</el-button>
                  </div>
                </el-form>
              </el-dialog>
              <!-- 延迟回料 -->
              <el-dialog
                width="30%"
                title="延迟回料"
                :visible.sync="innerVisibled"
                append-to-body
                center
              >
                <el-form ref="form4" :model="form4" label-width="80px">
                  <el-form-item label="延迟时间">
                    <el-date-picker v-model="form4.date" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="原因">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form4.reason"></el-input>
                  </el-form-item>
                  <div style="width:200px;margin:0 auto">
                    <el-button @click="innerVisibled = false">取消</el-button>
                    <el-button @click="delayBack()">确定</el-button>
                  </div>
                </el-form>
              </el-dialog>
              <div slot="footer" style="height:80px;" class="dialog-footer">
                <el-button @click="outerVisible = false;innerVisibled1 = true;">全部回料</el-button>
                <el-button @click="outerVisible = false;innerVisible = true;">部分回料</el-button>
                <el-button @click="outerVisible = false;innerVisibled = true;">延迟回料</el-button>
              </div>
            </el-dialog>
            <el-button size="mini" @click="handleMaterialsCard" round>+ 增加物料</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="生产排单" name="3">
          <!-- 无数据 -->
          <div v-if="!vb" class="productionArranged">
            <el-form
              :inline="true"
              v-for="(item,index) in formInline"
              :key="index"
              class="demo-form-inline"
              style="margin-bottom:10px;position: relative;"
            >
              <el-form-item label="指派工厂：">
                <el-input v-model="regions1[index]" placeholder="指派工厂" disabled style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="指派方式：">
                <el-select
                  v-model="mode[index]"
                  @change="select_l(index)"
                  placeholder="指派方式"
                  style="width:150px"
                >
                  <el-option
                    v-for="item_l in modes"
                    :key="item_l.id"
                    :label="item_l.name"
                    :value="item_l.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指派数量：">
                <el-input v-model="item.quantity" placeholder="请填入指派数量" style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="加工价格：">
                <el-input v-model="item.price" placeholder="请填入加工价格" style="width:150px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>加工费对比</el-button>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="item.remarks" style="width:50vw"></el-input>
              </el-form-item>
              <el-button
                style="position: absolute;right:5px;bottom:5px;"
                type="danger"
                @click="factoryDel(item.id,index)"
                round
              >删除</el-button>
              <hr style="border:1px dashed #999999" />
            </el-form>

            <!-- 新增指派工厂与确定排单 -->
            <div>
              <el-form>
                <el-form-item label="新增指派工厂：">
                  <el-select
                    v-model="region"
                    @change="regionadd"
                    placeholder="增加工厂"
                    style="width:150px"
                  >
                    <el-option
                      v-for="itemregion in regions"
                      :key="itemregion.id"
                      :label="itemregion.factory_name"
                      :value="itemregion.factory_name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-button @click="arranged" style="float:right;margin-bottom:15px;">确认排单</el-button>
              </el-form>
            </div>
          </div>
          <!-- 有数据 -->
          <div style="position: relative;" v-if="vb">
            <div class="factory_table" v-for="(item2,index2) in formInline" :key="index2">
              <div class="factory_left">
                <div class="factory_left_top">
                  <div class="list">
                    <span>指派工厂：</span>
                    <span>{{regions1[index2]}}</span>
                    <span>指派方式：</span>
                    <span>{{mode[index2]}}</span>
                    <span>指派数量：</span>
                    <span>{{item2.quantity}}</span>
                    <span>加工价格：</span>
                    <span>{{item2.price}}元</span>
                  </div>
                </div>
                <div class="factory_left_bottom">
                  <span>备注：</span>
                  <span>{{item2.remarks}}</span>
                </div>
              </div>

              <hr style="border:1px dashed #999999" />
            </div>
            <div class="factory_right">
              <el-button round type="info" @click="factoryEidt()">修改</el-button>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="裁剪" name="4">
          <div class="tailor">
            <div>
              <el-row style="margin-left:10%;">
                <el-col :span="3">录入裁床数量：</el-col>
              </el-row>
              <!-- <div v-if="tailorList.category>0"> -->
              <!-- 没数据 -->
              <div v-if="!vb1">
                <div class="tailor_table" v-for="(item,index) in tailorList" :key="index">
                  <div class="tailor_nav">
                    <span>颜色</span>
                    <span v-for="(item_t,index_t) in item.t_size" :key="index_t">{{item_t}}</span>
                    <span>数量</span>
                    <span>总数</span>
                  </div>
                  <div v-for="(item_c,index_c) in item.category" :key="index_c" class="tailor_list">
                    <span>{{item_c.color}}</span>
                    <el-input
                      class="inputs"
                      v-for="(item_q,index_q) in item_c.size_input"
                      :key="index_q"
                      placeholder="请输入内容"
                      @input="inputNumber(index,index_c)"
                      v-model="item_c.size_input[index_q]"
                    ></el-input>
                    <span>{{item_c.sizeNum}}</span>
                    <span v-if="index_c == item.category.length-1 ">{{item.total}}</span>
                  </div>
                  <el-button
                    round
                    type="danger"
                    style="position:absolute;right:10%;top:5%;"
                    @click="tailorDel(item.id,index)"
                  >删除</el-button>
                  <div @click.stop="ide(index)">
                    <span>裁床单：</span>
                    <el-upload
                      class="avatar-uploader"
                      action="https://yj.ppp-pay.top/uploadpic.php"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
                      <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <hr style="border:1px dashed #999999" />
                </div>
              </div>
              <!-- 有数据 -->
              <div v-if="vb1" style="position:relative">
                <div class="tailor_table" v-for="(item,index) in tailorList" :key="index">
                  <div class="tailor_nav">
                    <span>颜色</span>
                    <span v-for="(item_t,index_t) in item.t_size" :key="index_t">{{item_t}}</span>
                    <span>数量</span>
                    <span>总数</span>
                  </div>
                  <div v-for="(item_c,index_c) in item.category" :key="index_c" class="tailor_list">
                    <span>{{item_c.color}}</span>
                    <span
                      v-for="(item_q,index_q) in item_c.size_input"
                      :key="index_q"
                    >{{item_c.size_input[index_q]}}</span>
                    <span>{{item_c.sizeNum}}</span>
                    <span v-if="index_c == item.category.length-1 ">{{item.total}}</span>
                  </div>

                  <div @click.stop="ide(index)">
                    <span>裁床单：</span>
                    <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
                  </div>
                  <hr style="border:1px dashed #999999" />
                </div>
                <el-button
                  style="position:absolute;right:10%;top:0;"
                  round
                  type="info"
                  @click="tailorEdit()"
                >修改</el-button>
              </div>
            </div>
            <div class="add" v-if="!vb1">
              <el-button size="mini" @click="tailoradd" round>+ 增加床次</el-button>
              <el-button @click="tailored" round>确定</el-button>
            </div>
            <!-- </div> -->
          </div>
        </el-collapse-item>
        <el-collapse-item title="出货" name="5">
          <div class="shipment">
            <div class="shipmentList">
              <el-row>
                <el-col :span="3">出货数量：</el-col>
              </el-row>
              <!-- 无数据 -->
              <div v-if="!vb2">
                <el-form style="position:relative" v-for="(item,index) in complete" :key="index">
                  <!-- 成品 -->
                  <div>
                    <div class="tailor_table">
                      <div style="font-size:16px;">成品 :</div>
                      <div class="tailor_nav">
                        <span>颜色</span>
                        <span v-for="(item_ss,index_ss) in item.t_size" :key="index_ss">{{item_ss}}</span>
                        <span>数量</span>
                        <span>总数</span>
                      </div>
                      <div
                        v-for="(item_cc,index_cc) in item.produce_complete_size_a_data"
                        :key="index_cc"
                        class="tailor_list"
                      >
                        <span>{{item_cc.color}}</span>
                        <el-input
                          class="inputs"
                          v-for="(item_qq,index_qq) in item_cc.size_input"
                          :key="index_qq"
                          placeholder="请输入内容"
                          @input="goDowninput(index,index_cc)"
                          v-model="item_cc.size_input[index_qq]"
                        ></el-input>
                        <span>{{item_cc.sizeNum}}</span>
                        <span
                          v-if="index_cc == item.produce_complete_size_a_data.length-1"
                        >{{item.total_a}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 次品 -->
                  <div class="tailor_table">
                    <div style="font-size:16px;">次品 :</div>
                    <div class="tailor_nav">
                      <span>颜色</span>
                      <span v-for="(item_t,index_cr) in item.t_size" :key="index_cr">{{item_t}}</span>
                      <span>数量</span>
                      <span>总数</span>
                    </div>
                    <div
                      v-for="(item_c,index_cd) in item.produce_complete_size_b_data"
                      :key="index_cd"
                      class="tailor_list"
                    >
                      <span>{{item_c.color}}</span>
                      <el-input
                        class="inputs"
                        v-for="(item_q,index_qt) in item_c.size_input"
                        :key="index_qt"
                        placeholder="请输入内容"
                        @input="goDowninput1(index,index_cd)"
                        v-model="item_c.size_input[index_qt]"
                      ></el-input>
                      <span>{{item_c.sizeNum}}</span>
                      <span
                        v-if="index_cd == item.produce_complete_size_a_data.length-1"
                      >{{item.total_b}}</span>
                    </div>
                  </div>
                  <el-button
                    round
                    type="danger"
                    style="position:absolute;top:5%;right:10%"
                    @click="completeDel(item.id_c,index)"
                  >删除</el-button>
                  <hr style="border:1px dashed #999999" />
                </el-form>
              </div>
              <!-- 有数据 -->
              <div v-if="vb2" style="position:relative;">
                <div style="position:relative" v-for="(item,index) in complete" :key="index">
                  <!-- 成品 -->
                  <div>
                    <div class="tailor_table">
                      <div style="font-size:16px;">成品 :</div>
                      <div class="tailor_nav">
                        <span>颜色</span>
                        <span v-for="(item_ss,index_ss) in item.t_size" :key="index_ss">{{item_ss}}</span>
                        <span>数量</span>
                        <span>总数</span>
                      </div>
                      <div
                        v-for="(item_cc,index_cc) in item.produce_complete_size_a_data"
                        :key="index_cc"
                        class="tailor_list"
                      >
                        <span>{{item_cc.color}}</span>
                        <span
                          v-for="(item_qq,index_qq) in item_cc.size_input"
                          :key="index_qq"
                        >{{item_qq}}</span>
                        <span>{{item_cc.sizeNum}}</span>
                        <span
                          v-if="index_cc == item.produce_complete_size_a_data.length-1"
                        >{{item.total_a}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 次品 -->
                  <div class="tailor_table">
                    <div style="font-size:16px;">次品 :</div>
                    <div class="tailor_nav">
                      <span>颜色</span>
                      <span v-for="(item_t,index_cr) in item.t_size" :key="index_cr">{{item_t}}</span>
                      <span>数量</span>
                      <span>总数</span>
                    </div>
                    <div
                      v-for="(item_c,index_cd) in item.produce_complete_size_b_data"
                      :key="index_cd"
                      class="tailor_list"
                    >
                      <span>{{item_c.color}}</span>
                      <span
                        v-for="(item_q,index_qt) in item_c.size_input"
                        :key="index_qt"
                      >{{item_q}}</span>
                      <span>{{item_c.sizeNum}}</span>
                      <span
                        v-if="index_cd == item.produce_complete_size_a_data.length-1"
                      >{{item.total_b}}</span>
                    </div>
                  </div>
                  <hr style="border:1px dashed #999999" />
                </div>
                <el-button
                  style="position:absolute;right:10%;top:0;"
                  round
                  type="info"
                  @click="completeEdit()"
                >修改</el-button>
              </div>
            </div>
            <div class="add" v-if="!vb2">
              <el-button @click="goDownAdd" round>+增加出货批次</el-button>
              <el-button @click="goDownlist" round>确定</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog title="新增物料" :visible.sync="centerDialogVisible1" width="30%" center class="dialog">
      <div>
        <div class="cardList" v-for="(item, index) in cardList" :key="index">
          <div style="display: flex;justify-content: space-between;align-items: flex-end;">
            <div>
              <div v-for="(item1, index1) in searchCard" :key="index1">
                <div v-for="(item2, index2) in item1.style_materials_data" :key="index2">
                  <div class="card" v-if="item.materials===item1.mainclass" style="margin:10px 0">
                    <div class="cardStyle">
                      <div class="cardStyle_left">
                        <div class="cardStyle_left_img">
                          <img :src="item2.materials_color_data[0].picurl" alt />
                        </div>
                        <div class="cardStyle_left_content">
                          <div class="cardStyle_left_content_name">
                            <div>{{item2.mainclass}}</div>
                          </div>
                          <div>{{item2.color}}</div>
                          <div>内部编号:{{item2.materials_data[0].materialsno}}</div>
                          <div>{{item2.style_materials_supplier_data[0].companyname}}</div>
                        </div>
                      </div>
                      <div class="cardStyle_right" @mouseleave="visible1 = false">
                        <div style="cursor: pointer;" @click.stop="handlePopoverId1(item2)">
                          <el-popover
                            placement="right"
                            width="100"
                            v-model="visible1"
                            v-if="item2.id===popoverId1"
                          >
                            <div class="colourNumberList">
                              <div
                                class="colourNumber"
                                @click.stop="handleColourNumber1(item2,item3)"
                                v-for="(item3, index3) in item2.materials_color_data"
                                :key="index3"
                              >
                                <img :src="item3.picurl" alt />
                                <div>{{item3.color}} {{item3.color_no}}</div>
                              </div>
                            </div>
                          </el-popover>
                          <div>{{item2.color||item2.materials_color_data[0].color}}</div>
                          <div>{{item2.color_no||item2.materials_color_data[0].color_no}}</div>
                        </div>
                        <el-checkbox v-model="item2.isCheckList" @change="isCheckListBox(item1)"></el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-divider content-position="right">{{item.materials}}</el-divider>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button @click="addDesignColor">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  projectStyleMaterialsAdd,
  getStyle,
  projectStyleColorDel,
  getWestList,
  getMaterialsList,
  getStyleMaterialsList
} from "@/api/researchDevelopment";
import {
  produceAdd, // 新增生产批次
  produceDel, // 删除生产批次
  produceInfo, // 生产批次明细
  getStyleColorSelect, // 款式颜色select
  getSizeSelect, // 尺码select
  produceOrderAdd, // 增加批次下单信息
  produceOrderEdit, // 编辑批次下单信息
  produceOrderDel, // 删除批次下单信息
  produceOrderInfo, //显示批次下单信息
  produceOrderProcureList, //采购列表
  produceOrderProcureAdd, //新增采购物料信息
  produceOrderProcure_del, //删除采购物料信息
  produceOrderProcureEdit, //编辑 采购物料信息
  produceOrderProcureLogAdd, //新增采购日志信息
  getFactorySelect, //生产排单select工厂
  produceFactoryOrderAdd, //新增排单信息
  produceFactoryOrderList, //显示排单信息
  produceFactoryOrderEdit, //编辑排单信息
  produceFactoryOrderDel, //删除排单信息
  produceCutOrderAdd, //新增裁剪信息
  produceCutOrderList, //显示裁剪信息
  produceCutOrderEdit, //编辑裁剪信息
  produceCutOrderDel, //删除裁剪信息
  produceCompleteAdd, //新增出货信息
  produceCompleteList, //显示出货信息
  produceCompleteDel, //删除出货信息
  produceCompleteEdit //编辑出货信息
} from "@/api/production";
import {
  getMaterialsInfo, //物料
  getSupplierInfo //供应商
} from "@/api/archives";
export default {
  data() {
    return {
      chang_color: "",
      cardList_materials: "",
      materials_color_id: "",
      popoverId: "", //弹出框id
      visible: "", //弹出框id1
      searchInput: "", //搜索值
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      MaterialsList: [], //物料数组
      centerDialogVisible1: false, //增加款式颜色
      input: "",
      activeNames: "1",
      table: [], //数据表格
      t_size: [], //数据表格尺码
      t_quantity: [], //数据表格尺码数量
      all: [], //数据表格尺码数量
      all_1: [], //数据表格尺码数量

      form: [],
      form1: [],
      formInline: [],
      vb: false,
      region: "",
      regions: [], //工厂数组
      activities_endlong: [
        {
          logname: "已下单"
        },
        {
          logname: "部分回料"
        },
        {
          logname: "延迟回料"
        },
        {
          logname: "回料"
        }
      ], //日志
      cardList: [
        {
          materials: "主料",
          list: [[], [], [], [], [], [], [], []],
          data: {}
        },
        {
          materials: "里料",
          list: [[], [], [], [], [], [], [], []],
          data: {}
        },
        {
          materials: "辅料",
          list: [[], [], [], [], [], [], [], []],
          data: {}
        },
        {
          materials: "工艺",
          list: [[], [], [], [], [], [], [], []],
          data: {}
        }
      ],
      searchCard: [], //新增物料
      tailorList: [], // 裁剪
      obj: {},
      centerDialog: false,
      centerDialogVisible: false,
      designColor: "",
      ob: [],
      num: 0,
      active: 0,
      active1: 0,
      users: {},
      colors: {},
      color: "",
      sizes: [],
      size: [],
      total: 0,
      form_i: {
        customer_id: 0,
        id: 0,
        date: "",
        companyname: "",
        color: "",
        sum: "",
        size_name: [],
        size: "",
        ratio: [],
        quantity: []
      },
      table_data: false,

      companyname: "",
      size_name: [[], [], [], [], [], [], [], [], [], [], [], []],
      quantity: [[], [], [], [], [], [], [], [], [], [], [], []],
      ratio: [[], [], [], [], [], [], [], [], [], [], [], []],
      sum: 0,
      show: false,
      show1: false,
      show2: false,
      show9: true,
      outerVisible: false,
      innerVisible: false,
      innerVisibled: false,
      innerVisibled1: false,
      form2: {
        imageUrl: ""
      },
      form3: {
        number: "",
        money: "",
        money1: "",
        date: "",
        imageUrl: ""
      },
      form4: {
        date: "",
        reason: ""
      },
      popoverId1: "",
      visible1: "",
      materials_color_id1: "",
      isCheckListBoxEvent: "",
      isCheckList: [],
      procurement: [],
      chang_color: [],
      lot: [], //批次个数
      king: false,
      king1: false,
      ac: 0,
      checkedCities: [],
      checkAll: false,
      isIndeterminate: true,
      tal: [], //裁剪排单数据
      shipping: [],
      shipping1: [],
      itemList: {},
      produce_order_procure_id: 0,

      regions1: [],
      modes: [
        { name: "包工包料", id: 1 },
        { name: "包工不包料", id: 2 },
        { name: "裁片加工", id: 3 }
      ],
      last: [], //上一个数组值
      last1: [], //上一个数组值
      mode: [],
      factory_bl: false, //判断排单编辑或者新增

      vb1: false, //裁剪修改
      vb2: false, //出货修改

      edit1: false, //裁剪编辑接口触发
      edit2: false, //出货编辑接口触发
      //********出货*******/
      complete: []
    };
  },
  methods: {
    //
    handleChange(val) {
      // console.log(val);
    },
    onSubmit() {
      // console.log("submit!");
    },
    handleAvatarSuccess(res, file) {
      this.form3.imageUrl = res.data.pic_file_url;
    },

    handleAvatarSuccess1(res, file) {
      this.form2.imageUrl = res.data.pic_file_url;
    },
    handleAvatarSuccess2(res, file) {
      this.tailorList[this.ac].imageUrl = res.data.pic_file_url;
    },
    ide(v) {
      this.ac = v;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 下单信息删除按钮
    async omit(index) {
      // this.show = false;
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (index != undefined) {
            let res = await produceOrderDel({
              id: this.form[index].id
            });
            this.form.splice(index, 1);
            this.size_name.splice(index, 1);
            this.quantity.splice(index, 1);
            this.ratio.splice(index, 1);
          } else {
            let res = await produceOrderDel({
              id: this.form_i.id
            });
            if (this.form.length == 0) {
              this.form_i = {
                customer_id: 0,
                id: 0,
                date: "",
                companyname: "",
                color: "",
                sum: "",
                size_name: [],
                size: "",
                ratio: [],
                quantity: []
              };
            } else {
              this.form_i = this.form.shift();
              this.size_name[0] = [];
              this.quantity[0] = [];
              this.ratio[0] = [];
              this.size_name.push(this.size_name.shift());
              this.quantity.push(this.quantity.shift());
              this.ratio.push(this.ratio.shift());
            }
          }

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //输入数量算法
    async inputChange(v, j) {
      // console.log(this.form);
      if (v == undefined || j == undefined) {
        let a = 0;
        this.form_i.quantity = [];
        for (let i = 0; i < this.form_i.ratio.length; i++) {
          a += Number(this.form_i.ratio[i]);
        }
        for (let i = 0; i < this.form_i.ratio.length; i++) {
          if (this.form_i.ratio[i] != 0 || this.form_i.ratio[i] != "") {
            if (this.form_i.sum == "") {
              this.form_i.quantity.push(0);
            } else {
              this.form_i.quantity.push(
                Math.round((this.form_i.sum / a) * this.form_i.ratio[i])
              );
            }
          } else {
            this.form_i.quantity.push("");
          }
        }
        this.form_i.quantity.map((j, k) => {
          if (isNaN(j)) {
            j = "";
          }
        });
      } else {
        this.form[v].ratio = this.ratio[v];
        this.quantity[v] = [];
        let a = 0;
        // this.sum = 0;
        for (let i = 0; i < this.form[v].ratio.length; i++) {
          a += Number(this.form[v].ratio[i]);
        }
        for (let i = 0; i < this.form[v].ratio.length; i++) {
          if (this.ratio[v][i] != 0 || this.ratio[v][i] != "") {
            if (this.form[v].sum == undefined) {
              this.quantity[v].push(0);
            } else {
              this.quantity[v].push(
                Math.round((this.form[v].sum / a) * this.form[v].ratio[i])
              );
            }
          } else {
            this.quantity[v].push("");
          }
        }
        this.quantity[v].map((j, k) => {
          if (isNaN(j)) {
            j = "";
          }
        });
        this.form[v].quantity = this.quantity[v];
      }
      // console.log(this.form);
    },
    // 选择颜色
    async changed() {
      if (this.form_i.color == "") {
        this.form_i.color = this.color;
        this.king = true;
      } else {
        this.form.push({
          color: this.color,
          id: 0,
          date: this.form_i.date,
          customer_id: this.form_i.customer_id,
          companyname: this.form_i.companyname,
          size_name: []
        });
      }
      this.color = "";
      // this.color = v;

      // console.log(this.form);
    },
    // 选择客户
    async user_changed() {
      let res = await getWestList();
      let { data } = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].companyname == this.form_i.companyname) {
          this.form_i.customer_id = Number(data[i].id);
          // this.form[v].customer_id = Number(data[i].id);
        }
      }
      if (this.form.length > 0) {
        for (let i = 0; i < length; i++) {
          this.form[i].customer_id = this.form_i.customer_id;
        }
      }
    },
    // 选择时间
    async dateChanged(v) {
      // console.log(this.form);
      if (v != undefined) {
        this.date = moment(this.date).format("YYYY-MM-DD");
        this.form[v].date = this.date;
        console.log(this.date);
      } else {
        this.form_i.date = moment(this.form_i.date).format("YYYY-MM-DD");
      }
    },
    // 增加批次事件触发
    async increaseBatch() {
      this.centerDialogVisible = true;
      this.active = 0;
    },
    // 客户
    async westList() {
      let res = await getWestList();
      let { data } = res.data;
      // console.log(data);
      this.users = data;
    },
    // 颜色
    async styleColorSelect() {
      let style_id = this.$route.query.id;
      // console.log(style_id);
      let res = await getStyleColorSelect({ style_id: Number(style_id) });
      let { data } = res.data;
      this.colors = data;

      // console.log(res);
      // console.log(this.colors);
    },
    // 尺码
    async sizeSelect() {
      let res = await getSizeSelect();
      let { data } = res.data;
      this.sizes = data;
      // console.log(this.sizes);
    },
    // 确定增加批次
    async addDesign() {
      this.centerDialogVisible = false;
      let { id } = this.$route.query;
      let res = await produceAdd({ style_id: Number(id) });
      let res1 = await produceInfo({ style_id: Number(id) });
      let { data } = res1.data;
      console.log(data);
      this.ob = [];
      data.map((v, i) => {
        this.ob.push({
          num: i,
          produce_no: v.produce_no
        });
      });
      // this.date = [];
      this.form = [];
      this.quantity = [[], [], [], [], [], [], [], [], [], []];
      this.ratio = [[], [], [], [], [], [], [], [], [], []];
      this.size_name = [[], [], [], [], [], [], [], [], [], [], [], []];
      this.init();
      this.active = 0;
      // this.designColor = "";
    },
    // 切换批次
    async switchingStyle(item, index) {
      this.active = index;
      // console.log(this.ob[index].produce_no);
      this.table_data = false;
      this.show = false;
      this.show9 = true;
      // 出货
      this.edit1 = false;
      this.edit2 = false;
      this.vb2 = false;
      // 裁剪
      this.vb1 = false;
      // 生产排单
      this.vb = false;
      this.factory_bl = false;
      // this.date = [];
      // this.form_i = {};
      // this.form_i.ratio = [];
      // this.form_i.size_name = [];
      this.form = [];
      this.quantity = [[], [], [], [], [], [], [], [], [], []];
      this.ratio = [[], [], [], [], [], [], [], [], [], []];
      this.size_name = [[], [], [], [], [], [], [], [], [], [], [], []];
      this.init(); // 下单初始化
      this.int_i(); // 采购初始化
      this.init_r(); // 生产排单初始化
      this.init_t(); // 裁剪初始化
      this.init_c(); // 出货初始化
    },
    // 删除批次
    async styleColorDel(item, index) {
      // console.log(item,index)

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res = await produceDel({
            style_id: Number(id),
            produce_no: item.produce_no
          });
          // console.log(res);

          this.active = 0;
          this.form = [];
          this.quantity = [[], [], [], [], [], [], [], [], [], []];
          this.ratio = [[], [], [], [], [], [], [], [], [], []];
          this.size_name = [[], [], [], [], [], [], [], [], [], [], [], []];
          this.init();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // this.date = [];
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 下单信息修改按钮
    async btnModify() {
      this.show = false;
      this.show1 = true;
      this.show2 = true;
      this.king = true;
    },
    // 选择尺码
    async handleCheckedCitiesChange(value, index) {
      let arrNew = [];
      this.sizes.map((v, i) => {
        value.map((j, k) => {
          if (v.size_name == j) {
            arrNew.push(v.size_name);
          }
        });
      });
      // console.log(value, arrNew);
      // 导入表一
      if (index == undefined) {
        // 表一
        if (value.length > this.form_i.ratio.length) {
          arrNew.map((j, k) => {
            if (value[value.length - 1] == j) {
              this.form_i.ratio.splice(k, 0, "");
              this.form_i.quantity.splice(k, 0, "");
            }
          });
          if (this.table_data) {
            arrNew.map((j, k) => {
              if (value[value.length - 1] == j) {
                this.form_i.ids.splice(k, 0, "0");
              }
            });
          }
          this.last = arrNew;
        }

        if (value.length < this.form_i.ratio.length) {
          //删除
          this.last.map((j, k) => {
            let bl = arrNew.indexOf(j);
            if (bl == -1) {
              this.form_i.ratio.splice(k, 1);
              this.form_i.quantity.splice(k, 1);
            }
          });
          // console.log(this.form_i);
          // 重新计算数量
          let add = 0;
          this.form_i.ratio.forEach(el => {
            add += Number(el);
          });
          this.form_i.ratio.map((q, w) => {
            if (q != 0) {
              this.form_i.quantity[w] = Math.round((this.form_i.sum / add) * q);
            }
          });

          this.last = arrNew;

          if (this.table_data) {
            arrNew.map((j, k) => {
              if (value[value.length - 1] == j) {
                this.form_i.ids.splice(k, 1);
              }
            });
          }
        }

        this.form_i.size_name = arrNew;
      } else {
        //其他表
        if (value.length >= this.ratio[index].length) {
          arrNew.map((j, k) => {
            if (value[value.length - 1] == j) {
              this.ratio[index].splice(k, 0, "");
              this.quantity[index].splice(k, 0, "");
            }
          });
          if (this.table_data) {
            this.form[index].ids = [];
            arrNew.map((j, k) => {
              if (value[value.length - 1] == j) {
                this.form[index].ids.splice(k, 0, "0");
              }
            });
          }
          this.last1 = arrNew;
        }
        if (value.length < this.ratio[index].length) {
          //删除
          // console.log(this.form[index].size_name);

          this.last1.map((j, k) => {
            let bl = arrNew.indexOf(j);
            if (bl == -1) {
              this.ratio[index].splice(k, 1);
              this.quantity[index].splice(k, 1);
            }
          });
          this.last1 = arrNew;
          // 重新计算数量
          let add = 0;
          this.ratio[index].forEach(el => {
            add += Number(el);
          });
          this.ratio[index].map((q, w) => {
            if (q != 0) {
              this.quantity[index][w] = Math.round(
                (this.form[index].sum / add) * q
              );
            }
          });

          if (this.table_data) {
            arrNew.map((j, k) => {
              if (value[value.length - 1] == j) {
                this.form[index].ids.splice(k, 1);
              }
            });
          }
        }
        // 导入其他表
        this.form[index].size_name = arrNew;
      }
    },
    // 下单初始化
    async init() {
      // console.log(this.$route.query.activeNames);
      this.activeNames = this.$route.query.activeNames;
      let { id } = this.$route.query;
      // let res = await produceAdd({ style_id: Number(id) });
      let res1 = await produceInfo({ style_id: Number(id) });
      let { data } = res1.data;
      this.lot = data;
      this.num = 0;
      this.ob = [];
      data.forEach(element => {
        this.num++;
        this.ob.push({ num: this.num, produce_no: element.produce_no });
      });

      // 初始化表单
      this.form_i = {
        customer_id: 0,
        id: 0,
        date: "",
        companyname: "",
        color: "",
        sum: "",
        size_name: [],
        size: "",
        ratio: [],
        quantity: []
      };
      if (this.ob.length != 0) {
        let res = await produceOrderInfo({
          style_id: Number(id),
          produce_no: this.ob[this.active].produce_no
        });

        let data1 = res.data.data;
        // 显示批次下单信息
        // console.log(res);
        let res2 = await getWestList();

        if (data1.length == 0) {
          // console.log(data1.length);
          this.form = [];

          this.show1 = true;
        } else {
          // this.show1 = true;
          data1.map((v, i) => {
            let obj_list = {};
            let q = [];
            let r = [];
            let z = [];
            let ids = [];
            let comname = "";
            let data2 = res2.data.data;

            for (let y = 0; y < data2.length; y++) {
              if (data2[y].id == v.customer_id) {
                comname = data2[y].companyname;
              }
            }
            v.produce_order_size_date.map((a, b) => {
              q.push(a.quantity);
              r.push(a.ratio);
              z.push(a.size);
              ids.push(a.id);
              this.quantity[i].push(a.quantity);
              this.ratio[i].push(a.ratio);
              this.size_name[i].push(a.size);
            });
            let arrNew1 = [];
            let arrNew2 = [];
            let arrNew3 = [];
            this.sizes.map((g, h) => {
              z.map((j, k) => {
                if (g.size_name == j) {
                  arrNew1.push(g.size_name);
                  arrNew2.push(r[k]);
                  arrNew3.push(q[k]);
                }
              });
            });

            // this.date.push(v.expect_date);
            obj_list = {
              customer_id: v.customer_id,
              id: v.id,
              color: v.style_color_name,
              date: v.expect_date,
              sum: v.total,
              quantity: arrNew3,
              ratio: arrNew2,
              size_name: arrNew1,
              ids: ids,
              companyname: comname
            };
            // console.log(obj_list);

            this.form.push(obj_list);
          });
          // console.log(this.form);
          this.last.push(this.ratio[0]);

          this.form_i = this.form.shift();
          this.quantity.splice(0, 1);
          this.ratio.splice(0, 1);
          this.size_name.splice(0, 1);
          // 导入数据表
          if (data1.length > 0) {
            this.show = true;
            this.show1 = false;
            this.king1 = true;
            this.table_data = true;
            // 数据表格
            this.table = data1;
            this.tal = [];
            this.t_size = [];
            this.t_quantity = [];
            let t = [];
            this.all = [];
            let zo = 0;
            this.table.map((v, i) => {
              v.produce_order_size_date.map((a, j) => {
                this.t_size.push(a.size);
                this.t_size = [...new Set(this.t_size)];
              });
            });
            this.table.map((v, i) => {
              v.produce_order_size_date.map((a, j) => {
                let quant = [];
                let quant1 = [];
                this.t_size.map((x, y) => {
                  if (x == a.size) {
                    quant.push(a.quantity);
                  } else {
                    quant.push(0);
                  }
                  quant1.push("");
                });

                this.t_quantity.push(quant);
                t.push(quant1);
              });
              // console.log(this.t_quantity);
              let al = [];
              let al1 = [];
              if (this.t_quantity.length > 0) {
                al = this.t_quantity.reduce((pre, cur, index) => {
                  pre.forEach((item, index) => {
                    pre[index] += cur[index];
                  });
                  return pre;
                });
                al1 = t.reduce((pre, cur, index) => {
                  pre.forEach((item, index) => {
                    pre[index] += cur[index];
                  });
                  return pre;
                });

                this.all.push(al);
                this.tal.push(al1);
                this.t_quantity = [];
                t = [];
                zo += v.total;
                if (i == this.table.length - 1) {
                  this.table[i].sum = zo;
                }
              }
            });
          }
        }
      }
      this.handleSearchInput();
    },
    // 确定下单
    async clickOrders() {
      // console.log(this.form);
      // console.log(this.form_i);
      let style_id = Number(this.$route.query.id);
      let arr = [];
      let arr1 = [[], [], [], [], [], [], [], [], [], [], []];
      this.$confirm("请你确定下单！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //取得form数据

          if (this.show9) {
            this.form.unshift(this.form_i);
            // this.show9 = false;
          }
          this.form.map((v, i) => {
            v.companyname = this.form_i.companyname;
            v.customer_id = this.form_i.customer_id;
            v.date = this.form_i.date;
          });

          for (let i = 0; i < this.form.length; i++) {
            arr1[i] = [];
            this.form[i].size_name.map((e, a) => {
              if (this.table_data) {
                arr1[i].push({
                  style_id: style_id,
                  produce_no: this.ob[this.active].produce_no,
                  style_color_name: this.form[i].color,
                  size: this.form[i].size_name[a],
                  quantity: Number(this.form[i].quantity[a]),
                  ratio: Number(this.form[i].ratio[a]),
                  id: Number(this.form[i].ids[a]) //修改部分
                });
              } else {
                arr1[i].push({
                  style_id: style_id,
                  produce_no: this.ob[this.active].produce_no,
                  style_color_name: this.form[i].color,
                  size: this.form[i].size_name[a],
                  quantity: Number(this.form[i].quantity[a]),
                  ratio: Number(this.form[i].ratio[a])
                });
              }
              // console.log(this.form[i].size_name[a]);
              // console.log(arr1[i]);
            });
            if (arr1[i].length == 1) {
              arr1[i][0].ratio = 1;
            }
            arr.push({
              style_id: style_id,
              produce_no: this.ob[this.active].produce_no,
              style_color_name: this.form[i].color,
              id: this.form[i].id,
              total: Number(this.form[i].sum),
              customer_id: this.form[i].customer_id,
              expect_date: this.form[i].date,
              produce_order_size: arr1[i]
            });
          }
          console.log(arr);

          //将form数据传入接口
          if (this.show2) {
            //编辑接口
            let resn = await produceOrderEdit({
              style_id: style_id,
              produce_no: this.ob[this.active].produce_no,
              produce_order: arr
            });
            console.log(resn);
          } else {
            //增加接口
            let res = await produceOrderAdd({ produce_order: arr });
            console.log(res);
          }
          this.show = true;
          this.show1 = false;
          this.form = [];
          this.quantity = [[], [], [], [], [], [], [], [], [], []];
          this.ratio = [[], [], [], [], [], [], [], [], [], []];
          this.size_name = [[], [], [], [], [], [], [], [], [], [], [], []];
          this.init();
          this.int_i(); //采购初始化

          this.$message({
            type: "success",
            message: "下单成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "success",
            message: "取消下单"
          });
        });
      // } else {
      //   this.$message.error("请填写完整数据！！！");
      //   console.log(this.form_i, this.form);
      // }
    },

    // 切换采购订单颜色
    async purchaseChanged(item, index) {
      this.active1 = index;
      this.int_i(index);
      this.init_r(index);
    },
    // 采购信息列表
    async ProcureList() {
      let id = this.$route.query.id;
      let res1 = await produceInfo({
        style_id: id
      });
      let { data } = res1.data;
      // console.log(data[this.active].produce_no);

      // console.log(data[this.active].produce_no);
      // let res = await produceOrderProcureList({
      //   style_id: Number(data[this.active].style_id),
      //   produce_no: data[this.active].produce_no
      // });
      // console.log(res);
    },
    // 采购录入
    async seeDetails(item) {
      console.log(item);
      // this.itemList = item
      let obj = JSON.stringify(item);
      this.$router.push({
        path: `/PanelPurchase?materials_id=${item.materials_id}&e=${obj}`
      });
    },
    // 更新状态
    async updateStatus(item) {
      this.outerVisible = true;
      this.produce_order_procure_id = item.id;
    },
    // 全部回料
    async allMaterial() {
      this.innerVisibled1 = false;

      let res = await produceOrderProcureLogAdd({
        produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
        logname: "全部回料", //日志名称
        returntime: "", //预计回料时间/部分回料时间/延迟时间
        state: "3", //回料状态 1部份回料 2延时回料 3全部回料
        picurl: this.form2.imageUrl, //凭证图片
        quantity: 0, //回料数量
        amount: 0, //结算金额
        remarks: "" //原因备注
      });
      this.int_i();
      console.log(res);
    },
    // 部分回料
    async partBack() {
      this.innerVisible = false;
      this.form3.date = moment(this.form3.date).format("YYYY-MM-DD");
      let res = await produceOrderProcureLogAdd({
        produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
        logname: "部分回料", //日志名称
        returntime: this.form3.date, //预计回料时间/部分回料时间/延迟时间
        state: "1", //回料状态 1部份回料 2延时回料 3全部回料
        picurl: this.form3.imageUrl, //凭证图片
        quantity: Number(this.form3.number), //回料数量
        amount: Number(this.form3.money), //结算金额
        remarks: "" //原因备注
      });
      this.int_i();
      console.log(res);
    },
    // 延迟回料
    async delayBack() {
      this.innerVisibled = false;
      this.form4.date = moment(this.form4.date).format("YYYY-MM-DD");
      let res = await produceOrderProcureLogAdd({
        produce_order_procure_id: this.produce_order_procure_id, //生产采购单id
        logname: "延迟回料", //日志名称
        returntime: this.form4.date, //预计回料时间/部分回料时间/延迟时间
        state: "2", //回料状态 1部份回料 2延时回料 3全部回料
        picurl: this.form4.imageUrl, //凭证图片
        quantity: 0, //回料数量
        amount: 0, //结算金额
        remarks: this.form4.reason //原因备注
      });
      this.int_i();
      console.log(res);
    },
    // 点击增加物料
    async handleMaterialsCard() {
      // this.materials = item.materials;
      this.centerDialogVisible1 = true;
      let { id } = this.$route.query;
      let res = await produceInfo({
        style_id: id
      });
      let data1 = res.data.data;
      let res1 = await getStyleMaterialsList({
        style_id: Number(id),
        style_color_name: this.procurement[this.active1].style_color_name
      });
      res1.data.data.forEach((v, i) => {
        v.style_materials_data.forEach((v, i) => {
          v["isCheckList"] = false;
        });
      });
      let { data } = res1.data;
      this.searchCard = data;
      this.isCheckList = [];
      // console.log(this.searchCard);
    },
    async handleSearchInput() {
      let res = await getMaterialsList({
        keyword: this.searchInput || "",
        page: this.pageIndex,
        page_size: this.pageSize
      });
      let { data } = res.data;

      this.MaterialsList = data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 确认增加物料
    async addDesignColor() {
      let { id } = this.$route.query;
      let res1 = await produceInfo({
        style_id: id
      });
      let { data } = res1.data;
      let newArr = [];
      console.log(this.isCheckList);
      
      this.isCheckList.map(async (v, i) => {
        newArr.push({
          style_id: Number(id),
          produce_no: data[this.active].produce_no,
          style_color_name: this.procurement[this.active1].style_color_name,
          mainclass: v.mainclass,
          materials_id: Number(v.style_materials_data.materials_id),
          color: v.style_materials_data.color,
          color_no: v.style_materials_data.color_no,
          picurl: v.style_materials_data.picurl
        });
      });
      let res = await produceOrderProcureAdd({
        produce_order_procure_materials: newArr
      });
      console.log(res);
      this.int_i(this.active1);
      this.centerDialogVisible1 = false;
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    // 增加物料弹框内的方法
    isCheckListBox(e) {
      console.log(e);

      // this.isCheckListBoxEvent = e;
      if (e.style_materials_data[0].isCheckList === true) {
        this.isCheckList.push({
          mainclass: e.mainclass,
          style_materials_data: {
            materials_color_id:
              this.materials_color_id1 || e.style_materials_data[0].materials_color_data[0].id,
            style_id: e.style_materials_data[0].style_id,
            materials_id: e.style_materials_data[0].materials_id,
            color: e.style_materials_data[0].materials_color_data[0].color,
            color_no: e.style_materials_data[0].materials_color_data[0].color_no,
            picurl: e.style_materials_data[0].materials_color_data[0].picurl
          }
        });
      }
      if (e.isCheckList === false) {
        this.isCheckList.pop();
      }
    },
    handlePopoverId1(item) {
      this.popoverId1 = item.id;
      this.visible1 = true;
    },
    handleColourNumber1(item, item1) {
      this.materials_color_id1 = item1.id;
      item["color"] = item1.color;
      item["color_no"] = item1.color_no;
      this.visible1 = false;
    },
    // 采购物料删除
    async procureDel(v) {
      this.$confirm("此操作将永久删除该物料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await produceOrderProcure_del({
            id: v.id
          });
          console.log(res.data.data);
          this.int_i(this.active1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 采购初始化
    async int_i(itemn) {
      let { id } = this.$route.query;
      let res1 = await produceInfo({
        //批次
        style_id: id
      });
      let { data } = res1.data;
      if (data.length != 0) {
        let res = await produceOrderInfo({
          //下单信息
          style_id: Number(id),
          produce_no: data[this.active].produce_no
        });
        let data1 = res.data.data;
        this.procurement = data1;
        this.chang_color = [];
        this.procurement.map((v, i) => {
          this.chang_color.push(v.style_color_name);
        });
        this.chang_color = [...new Set(this.chang_color)];
        let res2 = await produceOrderProcureList({
          //采购信息
          style_id: Number(id),
          produce_no: data[this.active].produce_no
        });
        let data3 = res2.data.data;
        let all1 = [[], [], [], [], [], [], [], [], [], []];
        data3.map((v, i) => {
          this.chang_color.map((f, g) => {
            if (f == v.style_color_name) {
              all1[g].push(v);
            }
          });
        });
        if (itemn == undefined) {
          itemn = this.active1;
        }
        this.cardList.map(async (v, i) => {
          let a = [];
          all1[itemn].map(async (f, l) => {
            if (v.materials == f.mainclass) {
              let ress = await getMaterialsInfo({
                id: Number(f.materials_id)
              });
              let { data } = ress.data;
              if (data.materials_supplier_data) {
                let res1 = await getSupplierInfo({
                  id: Number(data.materials_supplier_data[0].supplier_id)
                });
                let datas = res1.data.data;
                f["materialsno"] = data.materialsno;
                f["companyname"] = datas.companyname;
                a.push(f);
              }
            }
          });
          
          v.list = a;
        });
      }
      // console.log(this.procurement);
      // console.log(this.cardList);
    },

    // 生产排单
    //新增指派工厂
    async regionadd(value) {
      // console.log(value,this.regions);

      let { id } = this.$route.query;
      let res1 = await produceInfo({
        //批次
        style_id: id
      });
      let { data } = res1.data;
      if (data.length > 0) {
        let f_id = 0;
        this.regions.map((v, i) => {
          if (value == v.factory_name) {
            f_id = v.id;
          }
        });
        this.regions1.push(this.region);
        if (this.factory_bl) {
          this.formInline.push({
            style_id: Number(id),
            produce_no: data[this.active].produce_no,
            factory_id: f_id,
            id: 0
          });
        } else {
          this.formInline.push({
            style_id: Number(id),
            produce_no: data[this.active].produce_no,
            factory_id: f_id
          });
        }
        this.region = "";
        console.log(this.formInline);
      }
    },
    // 选择指派方式
    select_l(index) {
      this.modes.map((v, i) => {
        if (this.mode[index] == v.name) {
          this.formInline[index].mode = v.id;
        }
      });
    },
    // 提交新增指派单
    async arranged() {
      this.$confirm("提交指派单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id } = this.$route.query;
          let res1 = await produceInfo({
            //批次
            style_id: id
          });
          let { data } = res1.data; /*  */
          console.log(this.formInline);
          if (!this.factory_bl) {
            let res = await produceFactoryOrderAdd({
              //新增排单
              style_id: Number(id),
              produce_no: data[this.active].produce_no,
              produce_factory_order: this.formInline
            });
            console.log(res);
          } else {
            let res2 = await produceFactoryOrderEdit({
              //编辑
              style_id: Number(id),
              produce_no: data[this.active].produce_no,
              produce_factory_order: this.formInline
            });
            console.log(res2);
          }

          this.init_r();
          this.$message({
            type: "success",
            message: "新增成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消新增"
          });
        });
    },
    // 修改生产排单
    async factoryEidt() {
      this.vb = false;
    },
    // 删除生产排单
    async factoryDel(factory_id, index) {
      this.$confirm("此操作将永久删除该排单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (factory_id != 0) {
            let res = await produceFactoryOrderDel({
              id: factory_id
            });
            console.log(res);
          }
          this.formInline.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 生产排单初始化
    async init_r() {
      let { id } = this.$route.query;
      let res = await produceInfo({
        //批次
        style_id: id
      });
      let { data } = res.data;
      let res1 = await getFactorySelect(); //生产排单select工厂
      let data1 = res1.data.data;
      this.regions = data1;
      // console.log(data,this.regions);
      this.formInline = [];
      if (data.length > 0) {
        let res2 = await produceFactoryOrderList({
          //显示排单信息
          style_id: id,
          produce_no: data[this.active].produce_no
        });
        // console.log(res2.data.data);
        let data2 = res2.data.data;
        if (data2.length > 0) {
          this.vb = true;
          this.factory_bl = true;
        }
        this.mode = [];
        data2.map((v, i) => {
          this.modes.map((j, k) => {
            if (v.mode == j.id) {
              this.mode.push(j.name);
            }
          });
          this.regions.map((j, k) => {
            if (v.factory_id == j.id) {
              this.regions1.push(j.factory_name);
            }
          });
          this.formInline.push({
            style_id: id,
            produce_no: data[this.active].produce_no,
            factory_id: v.factory_id,
            mode: v.mode,
            price: v.price,
            quantity: v.quantity,
            remarks: v.remarks,
            id: v.id
          });
        });
      }
    },

    // 裁剪
    // 增加床次
    async tailoradd() {
      let tals = [];
      this.tal.map((v, i) => {
        let sz = [];
        let ids = [];
        v.forEach(e => {
          sz.push("");
          ids.push(0);
        });
        if (!this.edit1) {
          tals.push({
            size_input: sz,
            color: this.table[i].style_color_name,
            sizeNum: 0
          });
        } else {
          tals.push({
            size_input: sz,
            color: this.table[i].style_color_name,
            sizeNum: 0,
            id: ids
          });
        }
      });

      // 颜色去重
      for (var i = 0; i < tals.length; i++) {
        for (var j = i + 1; j < tals.length; j++) {
          if (tals[i].color == tals[j].color) {
            tals.splice(j, 1);
            j--;
          }
        }
      }
      if (!this.edit1) {
        this.tailorList.push({
          t_size: this.t_size,
          imageUrl: "",
          total: 0,
          category: tals
        });
      } else {
        this.tailorList.push({
          t_size: this.t_size,
          imageUrl: "",
          total: 0,
          category: tals,
          id: 0
        });
      }
      console.log(this.tailorList);
    },
    // 床次input输入计算
    async inputNumber(index, index1) {
      this.tailorList[index].category[index1].sizeNum = 0;
      this.tailorList[index].total = 0;

      let size_input = this.tailorList[index].category[index1].size_input;

      for (let key in size_input) {
        this.tailorList[index].category[index1].sizeNum += Number(
          size_input[key]
        );
      }
      this.tailorList[index].category.forEach(item => {
        this.tailorList[index].total += Number(item.sizeNum);
      });
    },
    // 提交裁剪床次
    async tailored() {
      this.$confirm("提交裁剪订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(this.tailorList);
          let { id } = this.$route.query;
          let res = await produceInfo({
            //批次
            style_id: id
          });
          let { data } = res.data;
          let arr1 = [];
          // 上传数据

          // console.log(arr1);
          if (!this.edit1) {
            //新增
            this.tailorList.map((v, i) => {
              let arr2 = [];
              v.category.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || f != undefined || f !== 0) {
                    arr2.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f
                    });
                  }
                });
              });
              arr1.push({
                style_id: id,
                produce_no: data[this.active].produce_no,
                picurl: v.imageUrl,
                produce_cut_order_size: arr2
              });
            });
            let res1 = await produceCutOrderAdd({
              style_id: id,
              produce_no: data[this.active].produce_no,
              produce_cut_order: arr1
            });
            console.log(res1);
          } else {
            //编辑
            this.tailorList.map((v, i) => {
              let arr2 = [];
              v.category.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || f === 0) {
                    arr2.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f,
                      id: j.id[g]
                    });
                  }
                });
              });
              arr1.push({
                style_id: id,
                produce_no: data[this.active].produce_no,
                picurl: v.imageUrl,
                id: v.id,
                produce_cut_order_size: arr2
              });
            });
            let res1 = await produceCutOrderEdit({
              style_id: id,
              produce_no: data[this.active].produce_no,
              produce_cut_order: arr1
            });
            console.log(res1);
          }
          this.init_t();

          this.$message({
            type: "success",
            message: "新增成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消新增"
          });
        });
    },
    // 裁剪删除
    async tailorDel(tailorDel_id, index) {
      this.$confirm("此操作将永久删除该裁剪, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.tailorList.splice(index, 1);
          if (tailorDel_id != 0) {
            let res = await produceCutOrderDel({
              id: tailorDel_id
            });
            console.log(res);
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    async tailorEdit() {
      this.vb1 = false;
    },
    // 裁剪初始化
    async init_t() {
      setTimeout(async () => {
        let { id } = this.$route.query;
        let res = await produceInfo({
          //批次
          style_id: id
        });
        let { data } = res.data;

        this.tailorList = [];
        if (data.length > 0) {
          let res1 = await produceCutOrderList({
            //裁剪数据列
            style_id: id,
            produce_no: data[this.active].produce_no
          });
          // console.log(res1);
          let data1 = res1.data.data;
          // console.log(res1);

          if (data1.length > 0) {
            this.vb1 = true;
            this.edit1 = true;
          }
          // console.log(data1);

          // 往裁剪表加入数据
          data1.map((v, i) => {
            let arrNew = [];
            let arrObj = [];
            v.produce_cut_order_size_data.map((j, k) => {
              arrNew.push(j.style_color_name);
              arrObj.push({
                color: j.style_color_name,
                quantity: j.quantity,
                size: j.size,
                id: j.id
              });
            });
            arrNew = [...new Set(arrNew)]; //去重

            let sizeInput = [];
            let arrNew1 = [];
            arrNew.map((q, w) => {
              sizeInput = [];
              let ids = [];
              this.t_size.map((f, g) => {
                sizeInput.push(0);
                ids.push(0);
              });
              arrObj.map((j, k) => {
                if (j.color == q) {
                  this.t_size.map((f, g) => {
                    if (j.size == f) {
                      sizeInput[g] = j.quantity;
                      ids[g] = j.id;
                    }
                  });
                }
              });
              let sum = sizeInput.reduce((prev, cur) => {
                return Number(prev) + Number(cur);
              });
              arrNew1.push({
                color: q,
                sizeNum: sum,
                size_input: sizeInput,
                id: ids
              });
            });
            let sum1 = 0;
            arrNew1.map((k, l) => {
              sum1 += k.sizeNum;
            });
            this.tailorList.push({
              category: arrNew1,
              imageUrl: v.picurl,
              t_size: this.t_size,
              total: sum1,
              id: v.id
            });
          });
          // console.log(this.tailorList);
        }
      }, 500);
    },

    // 出货
    // 增加出货次数
    async goDownAdd() {
      let newArr1 = [];
      let newArr2 = [];

      this.tal.map((v, i) => {
        let sz = [];
        let sz1 = [];
        let id_i = [];
        v.forEach(e => {
          sz.push("");
          sz1.push("");
          id_i.push(0);
        });
        if (!this.edit2) {
          // console.log(this.table);

          newArr1.push({
            size_input: sz,
            color: this.table[i].style_color_name,
            sizeNum: 0
          });
          // console.log(newArr1);

          newArr2.push({
            size_input: sz1,
            color: this.table[i].style_color_name,
            sizeNum: 0
          });
        } else {
          newArr1.push({
            size_input: sz,
            color: this.table[i].style_color_name,
            sizeNum: 0,
            id: id_i
          });
          newArr2.push({
            size_input: sz1,
            color: this.table[i].style_color_name,
            sizeNum: 0,
            id: id_i
          });
        }
      });

      this.complete.push({
        t_size: this.t_size,
        produce_complete_size_a_data: newArr1, //成品
        produce_complete_size_b_data: newArr2, //次品
        total_a: 0,
        total_b: 0,
        id_c: 0
      });
      // console.log(this.complete);
    },
    // 出货input输入计算
    // 成品
    async goDowninput(index1, index2, index3) {
      this.complete[index1].produce_complete_size_a_data[index2].sizeNum = 0;
      this.complete[index1].total_a = 0;

      let size_input = this.complete[index1].produce_complete_size_a_data[
        index2
      ].size_input;

      for (let key in size_input) {
        this.complete[index1].produce_complete_size_a_data[
          index2
        ].sizeNum += Number(size_input[key]);
      }
      this.complete[index1].produce_complete_size_a_data.forEach(item => {
        this.complete[index1].total_a += Number(item.sizeNum);
      });
    },
    // 次品
    async goDowninput1(index1, index2) {
      this.complete[index1].produce_complete_size_b_data[index2].sizeNum = 0;
      this.complete[index1].total_b = 0;

      let size_input = this.complete[index1].produce_complete_size_b_data[
        index2
      ].size_input;

      for (let key in size_input) {
        this.complete[index1].produce_complete_size_b_data[
          index2
        ].sizeNum += Number(size_input[key]);
      }
      this.complete[index1].produce_complete_size_b_data.forEach(item => {
        this.complete[index1].total_b += Number(item.sizeNum);
      });
    },
    // 提交出货
    async goDownlist() {
      this.$confirm("提交出货订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // console.log(this.complete);
          let { id } = this.$route.query;
          let res = await produceInfo({
            //批次
            style_id: id
          });
          let { data } = res.data;
          let arrNew = [];
          if (!this.edit2) {
            //新增
            this.complete.map((v, i) => {
              let arr = [];
              v.produce_complete_size_a_data.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || undefined || 0) {
                    arr.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f,
                      isproduct: 1
                    });
                  }
                });
              });
              v.produce_complete_size_b_data.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || undefined || 0) {
                    arr.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f,
                      isproduct: 0
                    });
                  }
                });
              });
              arrNew.push({
                style_id: id,
                produce_no: data[this.active].produce_no,
                produce_complete_size: arr
              });
            });
            let res1 = await produceCompleteAdd({
              style_id: id,
              produce_no: data[this.active].produce_no,
              produce_complete: arrNew
            });
            console.log(res1);
          } else {
            //编辑
            let obj = {};
            this.complete.map((v, i) => {
              let arr = [];
              v.produce_complete_size_a_data.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || f != undefined || f === 0) {
                    arr.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f,
                      isproduct: 1,
                      id: j.id[g]
                    });
                  }
                });
              });
              v.produce_complete_size_b_data.map((j, k) => {
                j.size_input.map((f, g) => {
                  if (f != "" || f != undefined || f === 0) {
                    arr.push({
                      style_id: id,
                      produce_no: data[this.active].produce_no,
                      style_color_name: j.color,
                      size: v.t_size[g],
                      quantity: f,
                      isproduct: 0,
                      id: j.id[g]
                    });
                  }
                });
              });
              arrNew.push({
                style_id: id,
                produce_no: data[this.active].produce_no,
                id: v.id_c,
                produce_complete_size: arr
              });
            });
            let res1 = await produceCompleteEdit({
              style_id: id,
              produce_no: data[this.active].produce_no,
              produce_complete: arrNew
            });
            console.log(res1);
          }
          this.init_c();
          this.$message({
            type: "success",
            message: "出货订单提交成功!"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    },
    // 删除
    async completeDel(id_c, index) {
      this.$confirm("此操作将永久删除该出货单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (id_c != 0) {
            let res = await produceCompleteDel({
              id: id_c
            });
            console.log(res);
          }
          this.complete.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    async completeEdit() {
      this.vb2 = false;
    },
    // 出货初始化
    async init_c() {
      setTimeout(async () => {
        let { id } = this.$route.query;
        let res = await produceInfo({
          //批次
          style_id: id
        });
        let { data } = res.data;
        this.complete = [];
        if (data.length > 0) {
          let res1 = await produceCompleteList({
            style_id: id,
            produce_no: data[this.active].produce_no
          });
          let data1 = res1.data.data;
          // console.log(this.t_size);
          // console.log(this.complete);
          data1.produce_complete_data.map((v, i) => {
            // 成品
            let arrColor_a = []; //颜色
            let arrObj_a = []; //颜色对应的对象
            let arrInput_a = []; //颜色对应的对象
            let arr_a = []; //颜色对应的对象
            let id_a = []; //颜色对应尺码的id
            // 次品
            let arrColor_b = []; //颜色
            let arrObj_b = []; //颜色对应的对象
            let arrInput_b = []; //颜色对应的对象
            let arr_b = []; //颜色对应的对象
            let id_b = []; //颜色对应尺码的id
            v.produce_complete_size_a_data.map((j, k) => {
              arrColor_a.push(j.style_color_name);
              arrObj_a.push({
                style_color_name: j.style_color_name,
                size: j.size,
                quantity: j.quantity,
                id: j.id
              });
              if (v.produce_complete_size_b_data.length == 0) {
                arrColor_b.push(j.style_color_name);
              }
            });
            v.produce_complete_size_b_data.map((j, k) => {
              arrColor_b.push(j.style_color_name);
              arrObj_b.push({
                style_color_name: j.style_color_name,
                size: j.size,
                quantity: j.quantity,
                id: j.id
              });
              if (v.produce_complete_size_a_data.length == 0) {
                arrColor_a.push(j.style_color_name);
              }
            });

            arrColor_a = [...new Set(arrColor_a)];
            arrColor_b = [...new Set(arrColor_b)];

            arrColor_a.map((f, g) => {
              arrInput_a = [];
              id_a = [];
              this.t_size.map((f, g) => {
                arrInput_a.push(0);
                id_a.push(0);
              });
              arrObj_a.map((j, k) => {
                if (j.style_color_name == f) {
                  this.t_size.map((n, m) => {
                    if (j.size == n) {
                      arrInput_a[m] = j.quantity;
                      id_a[m] = j.id;
                    }
                  });
                }
              });
              let sum = arrInput_a.reduce((prev, cur) => {
                return Number(prev) + Number(cur);
              });
              arr_a.push({
                color: f,
                sizeNum: sum,
                size_input: arrInput_a,
                id: id_a
              });
            });
            arrColor_b.map((f, g) => {
              arrInput_b = [];
              id_b = [];
              this.t_size.map((f, g) => {
                arrInput_b.push(0);
                id_b.push(0);
              });
              arrObj_b.map((j, k) => {
                if (j.style_color_name == f) {
                  this.t_size.map((n, m) => {
                    if (j.size == n) {
                      arrInput_b[m] = j.quantity;
                      id_b[m] = j.id;
                    }
                  });
                }
              });
              let sum = arrInput_b.reduce((prev, cur) => {
                return Number(prev) + Number(cur);
              });
              arr_b.push({
                color: f,
                sizeNum: sum,
                size_input: arrInput_b,
                id: id_b
              });
            });
            let total_aa = 0;
            let total_bb = 0;
            arr_a.map((j, k) => {
              total_aa += j.sizeNum;
            });
            arr_b.map((j, k) => {
              total_bb += j.sizeNum;
            });
            // 往表内加数据
            this.complete.push({
              total_a: total_aa,
              total_b: total_bb,
              t_size: this.t_size,
              id_c: v.id,
              produce_complete_size_a_data: arr_a,
              produce_complete_size_b_data: arr_b
            });
          });
          // console.log(data1);
          if (data1.produce_complete_data.length > 0) {
            this.vb2 = true;
            this.edit2 = true;
          }
          // console.log(this.complete);
        }
      }, 500);
    }
  },
  async mounted() {
    let { id } = this.$route.query;
    let res = await getStyle({ id });
    this.obj = res.data.data;
    // console.log(this.obj);
    // console.log(this.obj.style_materials_color_data)
    // this.activities_endlong = res.data.data.style_log;
    this.init();
    this.int_i();
    this.init_r();
    this.init_t();
    this.init_c(); //出货
    this.sizeSelect();
    this.westList();
    this.styleColorSelect();
    this.ProcureList();
  }
};
</script>
<style lang="less" scoped>
.productionStyle {
  .main {
    .info {
      display: flex;
      .basicsInfo {
        width: 40%;
        .basicsInfoName {
          margin: 30px 0px;
          font-size: 16px;
        }
        .basicsInfoImg {
          display: flex;
          img {
            width: 200px;
            margin-right: 20px;
          }
        }
      }
      .materialCardInfo {
        width: 40%;
        .materialCardInfoName {
          margin: 30px 0px;
          font-size: 16px;
        }
        .materialCardInfoContent {
          div {
            margin: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .placeAnOrderBatchInfo {
      margin: 30px 0;
      display: flex;
      .placeAnOrderBatch {
        margin: 0 5px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
      }
    }
    .purchase {
      .color {
        display: flex;
        margin: 20px 0;
      }

      .material_purchase {
        .content {
          display: flex;
          margin-bottom: 10px;
          .card {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 12px;
            .cardStyle {
              width: 320px;
              height: 100px;
              display: flex;
              .cardStyle_left {
                width: 270px;
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
                  div {
                    margin: 0 3px;
                  }
                  flex: 1;
                  .cardStyle_left_content_name {
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
              .cardStyle_right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 50px;
                background-color: #f2f2f2;
                border-radius: 10px;
              }
            }
          }
          .wastage {
            width: 100px;
            border-radius: 10px;
            background-color: #f2f2f2;
            height: 100px;
            text-align: center;
          }
          .amount {
            width: 100px;
            border-radius: 10px;
            background-color: #f2f2f2;
            height: 100px;
            text-align: center;
          }
          .orderInformation {
            border-radius: 10px;
            background-color: #f2f2f2;
            width: 610px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 100px;
            padding: 10px;
          }
        }
      }
    }
    .productionArranged {
      margin: 0 30px;
      /deep/textarea {
        height: 100px;
        resize: none !important;
      }
    }
    .factory_table {
      margin: 0 20%;
      position: relative;
      .factory_left_top {
        width: 100%;
        display: inline-block;
        .list {
          span {
            float: left;
            display: block;
            padding: 5px 10px;
          }
        }
      }
      .factory_left_bottom {
        span {
          padding: 25px 10px;
        }
      }
    }
    .factory_right {
      position: absolute;
      top: 5%;
      right: 5%;
    }
    .tailor {
      .tailor_table {
        margin-left: 15%;
        position: relative;
        .tailor_nav {
          overflow: hidden;
          span {
            float: left;
            display: block;
            width: 75px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }
        }
        .tailor_list {
          overflow: hidden;
          .inputs {
            float: left;
            display: block;
            width: 75px;
            height: 25px;
            line-height: 25px;
            text-align: center !important;
            margin-bottom: 15px;
            margin-right: 10px;
          }
          span {
            float: left;
            display: block;
            width: 75px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }
        }
      }
      .add {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .shipment {
      .shipmentList {
        margin: 30px 0;
        padding: 10px 0;
        .tailor_table {
          margin-left: 10%;
          margin-bottom: 20px;
          .tailor_nav {
            overflow: hidden;
            span {
              float: left;
              display: block;
              width: 75px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-right: 10px;
            }
          }
          .tailor_list {
            overflow: hidden;
            .inputs {
              float: left;
              display: block;
              width: 75px;
              height: 25px;
              line-height: 25px;
              text-align: center !important;
              margin-bottom: 15px;
              margin-right: 10px;
            }
            span {
              float: left;
              display: block;
              width: 75px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-right: 10px;
            }
          }
        }
      }
      .add {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .dfjccaic {
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      padding: 2px;
    }
  }
  .increase {
    // margin-left:10px;
    cursor: pointer;
  }
  // .placeAnOrderBatchInfo {
  .el-steps {
    margin: 40px 0;
    /deep/.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
      font-size: 16px;
      font-weight: 800;
    }
    /deep/.el-step__title {
      font-size: 12px;
    }
    /deep/.el-step__icon {
      width: 17px;
      background-color: transparent;
    }
    /deep/.el-step__head {
      top: 30px;
    }

    /deep/.el-step__main {
      position: relative;
      bottom: 20px;
      .el-step__description {
        padding-top: 20%;
      }
    }
  }
  // }
  //步骤条
  .orderInformation {
    .el-steps {
      position: relative;
      // margin-bottom: 40px;
      /deep/.el-step__icon {
        width: 12px;
      }
      .tt {
        position: absolute;
        span:first-of-type {
          display: block;
          font-size: 10px;
          color: #666666;
          em {
            margin-left: 3px;
            color: #999999;
          }
        }
        span:last-of-type {
          display: block;
          font-size: 10px;
          -webkit-transform: scale(0.8);
          color: #999999;
          margin-left: -12px;
        }
      }
      .dt {
        position: absolute;
        top: 50px;
        span {
          display: block;
          font-size: 10px;
        }
      }
      /deep/.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
        font-size: 12px;
        font-weight: 400;
        position: relative;
      }
      /deep/.el-step__title {
        font-size: 12px;
        line-height: 14px;
      }
      /deep/.el-step__icon {
        width: 12px;
      }
      /deep/.el-step__head {
        top: 30px;
      }

      /deep/.el-step__line {
        width: auto;
        margin-right: 20px;
      }

      /deep/.el-step {
        width: 100px;
        display: inline-block;
      }
      /deep/.el-step__main {
        position: relative;
        bottom: 20px;
        .el-step__description {
          padding-top: 20%;
        }
      }
    }
    // .el-step__line:last-of-type {
    // width: 0px !important;
    // }
  }
  .active {
    border: 1px solid #add;
  }
  // 数据表格
  .table_header {
    width: 600px;
    position: absolute;
    left: 25%;
    top: 40px;
    .table_nav {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      overflow: hidden;
      span {
        float: left;
        width: 10%;
        height: 30px;
      }
    }
    .table_list {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      overflow: hidden;
      span {
        float: left;
        width: 10%;
        height: 30px;
      }
    }
  }
  // 增加物料弹框
  .dialog {
    .cardList {
      margin: 30px 0;
      .card {
        .cardStyle {
          width: 320px;
          height: 100px;
          display: flex;
          .cardStyle_left {
            width: 270px;
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
                margin: 3px;
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
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 50px;
            background-color: #f2f2f2;
            border-radius: 10px;
            overflow: hidden;
            .colourNumberList {
              .colourNumber {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 10px;
                cursor: pointer;
              }
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
      }
    }
  }
  .dialog1 {
    .searchCard {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .card {
        margin: 10px 20px;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .cardStyle {
          width: 320px;
          height: 100px;
          display: flex;
          .cardStyle_left {
            width: 270px;
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
                margin: 3px;
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            background-color: #f2f2f2;
            border-radius: 10px;
            .colourNumberList {
              .colourNumber {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 10px;
                cursor: pointer;
              }
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
// 弹框上传照片
.el-dialog__wrapper {
  /deep/.el-form {
    position: relative;
    .avatar-uploader {
      position: absolute;
      top: 0px;
      right: 3%;
    }
    .avatar-uploader1 {
      position: relative;
      margin-bottom: 15px;
      top: 0px;
      left: 40%;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader1 {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    background: #ccc;
    width: 110px;
    height: 110px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader1 .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .avatar1 {
    width: 110px;
    height: 110px;
    display: block;
  }
}
</style>