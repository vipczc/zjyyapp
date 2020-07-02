<template>
  <div>
    <div class="main_header"></div>
    <div class="main_top">
      <img class="icon" src="../../../assets/images/logo.png" alt />
      <p class="title">{{hospitalName}}</p>
      <img class="select" src="../../../assets/images/icon_down.png" alt @click="handleClickSelect" />
      <div v-show="userdels != 0" class="point">
        <p>{{userdels}}</p>
      </div>
      <div class="modal-bg" v-if="showModal" @click="handleClickClose"></div>
      <div class="select-modal" v-if="showModal">
        <span class="sj"></span>
        <p @click="handleClickPresident">
          院长直通
          <span v-show="userdels != 0">{{userdels}}</span>
        </p>
        <!-- <p>广济教学</p> -->
        <p @click="showComplain">投诉建议</p>
        <p @click="islogout = true">退出登录</p>
      </div>
    </div>
    <div v-show="islogout" @click="islogout = false" class="logout">
      <div class="logout_box">
        <div class="logout_box_top">
          <p>退出登录</p>
          <img src="../../../assets/images/close2.png" alt />
        </div>
        <div class="logout_box_middle">
          <p class="title">是否确定退出当前登录账号？</p>
          <div class="logout_box_end">
            <div class="logout_box_end_left">
              <p>取消</p>
            </div>
            <div @click="handLogout()" class="logout_box_end_right">
              <p>确定</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style class="main">
      <!-- 页面顶部 -->
      <div>
        <!-- <div class="dropdown">
          <p>下拉刷新...</p>
        </div>-->
        <!-- 页面顶部内容 -->
        <div class="main_today">
          <div class="main_today_top2">
            <p class="todaywork_title">今日工作</p>
            <div class="newtop">
              <p class="name">{{userName}}</p>
            </div>
          </div>
          <div class="main_today_bar">
            <div v-for="(item, index) in workTodaydata.slice(0, 3)" :key="index" class="tabbar">
              <p class="title">{{item.title}}</p>
              <!-- 今日工作的标题 -->
              <p class="time">{{item.starttime}}</p>
            </div>
          </div>
          <div class="main_today_top" @click="hadleToday">
            <div class="number">
              <p>{{workTodaydata.length}}项</p>
              <img src="../../../assets/images/iconshow.png" alt />
            </div>
          </div>
        </div>
      </div>
      <!-- page banner start-->
      <div class="nexttop">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="1">老师</mt-tab-item>
          <mt-tab-item id="2">学员</mt-tab-item>
          <mt-tab-item id="3">技能中心</mt-tab-item>
        </mt-navbar>
      </div>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" class="banner-box">
        <!-- 老师 -->
        <mt-tab-container-item id="1">
          <div class="student">
            <div class="student_main">
              <swiper
                v-if="showteacherString && showteacherWork"
                ref="mySwiper2"
                style="width:3.5rem;height:10%;"
                class="student_top_box swiper-no-swiping"
                :options="swiperOption4"
              >
                <swiper-slide>
                  <p>师资绩效</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>师资评价</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>师资介绍</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>师资培训</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
              </swiper>
              <swiper
                v-if="showteacherString && showteacherWork"
                ref="mySwiper4"
                class="student_main_box"
                :options="swiperOptionteacher"
              >
                <!-- 师资评价-->
                <swiper-slide>
                  <div class="boxshadow">
                    <div class="box2_top">
                      <div class="title">
                        <p style="margin-right:0.1rem;">师资评价</p>
                      </div>
                      <p @click="handleClickMore" class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <!-- <mt-tabbar v-model="selected2">
                      <mt-tab-item @click.stop="changeValue('月度',1)" id="月度">
                        <p @click.stop="changeValue('月度',1)">月度</p>
                      </mt-tab-item>
                      <mt-tab-item @click.stop="changeValue('季度',2)" id="季度">
                        <p @click.stop="changeValue('季度',2)">季度</p>
                      </mt-tab-item>
                      <mt-tab-item id="年度">
                        <p @click.stop="changeValue('年度',3)">年度</p>
                      </mt-tab-item>
                    </mt-tabbar>-->

                    <div class="teacher_radar">
                      <radar
                        v-if="flag1"
                        ref="radar1"
                        :maintitle="'对老师评价雷达图'"
                        :barnumber="radardata1"
                      ></radar>
                      <div v-else style="width:100%;height:2rem;">
                        <p style="text-align: center; line-height: 2rem; color: #dddddd;">暂无数据</p>
                      </div>
                      <div class="teacher_radar_detial">
                        <div>
                          <div class="blockbg">
                            <p class="number">{{teacherValuate.pjpjf}}</p>
                            <p class="title">评价平均分</p>
                            <!-- <p class="desc">(满分{{teacherValuate.zdmf}})</p> -->
                          </div>
                          <div class="blockbg2">
                            <p class="number">{{teacherValuate.zs}}</p>
                            <p class="title">评价发送次数</p>
                          </div>
                        </div>
                        <div>
                          <div class="blockbg">
                            <p class="number">{{teacherValuate.zdf}}</p>
                            <p class="title">评价最低分</p>
                          </div>
                          <div class="blockbg2">
                            <p class="number">{{teacherValuate.tjl}}</p>
                            <p class="title">评价表提交率</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <!-- 师资介绍-->
                <swiper-slide>
                  <div @click="hadleTeacherIntroduce" class="student_exam boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">师资介绍</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/06月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <!-- 师资介绍内容 -->
                    <div style="margin-top:0.25rem" v-if="showteacherString">
                      <div class="teacherrs">
                        <p class="title">老师总数量（人）</p>
                        <p class="number">{{teacherDatalist.lssl}}</p>
                      </div>
                      <div class="teacherlistplan">
                        <ul>
                          <li>
                            <p class="number">{{teacherDatalist.zrys}}</p>
                            <p class="title">主任医师</p>
                          </li>
                          <li>
                            <p class="number">{{teacherDatalist.fzrys}}</p>
                            <p class="title">副主任医师</p>
                          </li>
                        </ul>
                        <ul>
                          <li style="border-radius: 0rem 0rem 0rem 0.1rem;">
                            <p class="number">{{teacherDatalist.zzys}}</p>
                            <p class="title">主治医师</p>
                          </li>
                          <li style="border-radius: 0rem 0rem 0.1rem 0rem;">
                            <p class="number">0</p>
                            <p class="title">其他</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <!-- 师资培训 -->
                <swiper-slide>
                  <div @click="hadleTeacherTrain" class="student_exam boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">师资培训</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/06月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <!-- 师资培训内容 -->
                    <div style="margin-top:0.25rem" v-if="showteacherString">
                      <div class="teachernum">
                        <p class="title">本年度培训计划</p>
                      </div>
                      <div class="teacherlistplan">
                        <ul>
                          <li>
                            <p class="number">{{teacherStringData.ndjhs}}</p>
                            <p class="title">申报计划</p>
                          </li>
                          <li>
                            <p class="number" style="color:#0096C1">{{teacherStringData.zxjhs}}</p>
                            <p class="title">已完成计划</p>
                          </li>
                        </ul>
                      </div>
                      <div class="teachernum">
                        <p class="title">本年度培训人次</p>
                      </div>
                      <div class="teacherlistplan">
                        <ul>
                          <li>
                            <p class="number">{{teacherStringData.jhpxrs}}</p>
                            <p class="title">计划培训人次</p>
                          </li>
                          <li>
                            <p class="number" style="color:#0096C1">{{teacherStringData.sjpxrs}}</p>
                            <p class="title">目前培训人次</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <!-- 师资绩效-->
                <swiper-slide>
                  <div @click="handleTeachingStudent" class="student_exam boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">师资绩效</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/{{moment}}月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <!-- 师资绩效内容 -->
                    <div style="margin-top:0.25rem">
                      <div class="teachernumjx">
                        <p class="title">带教学员数量</p>
                        <p class="number">{{teacherWorkData.djxysl}}</p>
                      </div>
                      <div class="teachernum2">
                        <p class="title">带教学员数量</p>
                        <p class="number">{{teacherWorkData.djhds}}</p>
                        <span class="bfb">教学活动好评度</span>
                        <span class="bfbnum">
                          {{(teacherWorkData.djhdhpl2*100).toFixed(2)}}
                          <span>%</span>
                        </span>
                      </div>
                      <div class="teacherlist">
                        <ul>
                          <li v-for="(item,index) in teachertraintypeworkload" :key="index">
                            <p class="number">{{item.typesum }}</p>
                            <p class="title">{{item.traintypename }}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </mt-tab-container-item>
        <!-- 学员 -->
        <mt-tab-container-item id="2">
          <div class="student">
            <div class="student_main">
              <swiper
                v-if="showstudentexame"
                ref="mySwiper4"
                style="width:3.5rem;height:10%;"
                class="student_top_box swiper-no-swiping"
                :options="swiperOption4"
              >
                <swiper-slide>
                  <p>评价</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>轮转</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>培训</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>考核</p>
                  <div class="swiperborder"></div>
                </swiper-slide>
                <swiper-slide>
                  <p>学员概况</p>
                  <br />
                  <div class="swiperborder"></div>
                </swiper-slide>
              </swiper>
              <swiper
                v-if="showstudentexame"
                ref="mySwiper"
                class="student_main_box"
                :options="swiperOption"
              >
                <!-- 培训-->
                <swiper-slide>
                  <div
                    @click="hadleStudentTrain"
                    v-show="showtrain"
                    class="student_train boxshadow"
                  >
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">学员培训概况</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/{{moment}}月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <!-- on banner -->
                    <div class="bannerbox2" v-if="showstudentexame">
                      <div class="bannerleft">
                        <p>人均（次）</p>
                        <div class="bannertext">
                          <p class="number">{{studenttrain.trainrjcs.rjpxcs}}</p>
                          <p class="title">{{moment}}月人均培训次数</p>
                        </div>
                      </div>
                      <div class="bannerright">
                        <ul>
                          <li>
                            总人数
                            <span>{{studenttrain.trainrjcs.zrs}}</span>
                          </li>
                          <li>
                            一年级
                            <span>{{studenttrain.trainrjcs.ynjrjcs}}</span>
                          </li>
                          <li>
                            二年级
                            <span>{{studenttrain.trainrjcs.enjrjcs}}</span>
                          </li>
                          <li>
                            三年级
                            <span>{{studenttrain.trainrjcs.snjrjcs}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- down banner -->
                    <div class="bannerbox2" v-if="showstudentexame">
                      <div class="bannerleft">
                        <p>累计人次（次）</p>
                        <div class="bannertext">
                          <p class="number">{{studenttrain.trainljrc.ljrc}}</p>
                          <p class="title">{{moment}}月培训累计人次</p>
                        </div>
                      </div>
                      <div class="bannerright">
                        <ul>
                          <li>
                            总人数
                            <span>{{studenttrain.trainrjcs.zrs}}</span>
                          </li>
                          <li>
                            一年级
                            <span>{{studenttrain.trainljrc.ynjrc}}</span>
                          </li>
                          <li>
                            二年级
                            <span>{{studenttrain.trainljrc.enjrc}}</span>
                          </li>
                          <li>
                            三年级
                            <span>{{studenttrain.trainljrc.snjrc}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <!-- 考核-->
                <swiper-slide>
                  <div @click="hadleStudentExamine" class="student_exam boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">住培考核状况</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/{{moment}}月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <div class="khbanner" v-for="(item,index) in studentexame" :key="index">
                      <p class="listtype">{{item.examtype}}考试</p>
                      <div class="khbox">
                        <ul>
                          <li>
                            <p class="title">发布场次</p>
                            <p class="number">{{item.kscc}}</p>
                          </li>
                          <li>
                            <p class="title">参与人次</p>
                            <p class="number">{{item.cysc}}</p>
                          </li>
                          <li>
                            <p class="title">得分率</p>
                            <p class="number">{{item.dfl}}%</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>

                <!-- 学员概况-->
                <swiper-slide>
                  <div @click="hadleStudentSurvey" class="boxshadow">
                    <div class="box2_top">
                      <div class="top">
                        <p class="title">当前学员概况</p>
                        <p class="desc">截止时间:当前</p>
                      </div>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <div class="charts">
                      <div class="radechart" v-for="(item,index) in studenttype" :key="index">
                        <div class="radechart_desc_top" v-if="item.typeid=='999'">
                          <p class="title">{{item.typename}}</p>
                          <p class="number">{{item.studentsum}}</p>
                        </div>
                      </div>
                      <div class="radechart">
                        <div class="radechart_desc">
                          <div
                            class="radechart_desc_end"
                            v-for="(item,index) in studenttype"
                            :key="index"
                          >
                            <div class="radechart_desc_detial" v-if="item.typename !='共有学员'">
                              <div :style="randomRgb(item)" class="block"></div>
                              <p class="title">{{item.typename}}</p>
                              <p class="newnumber">{{item.studentsum}}</p>
                              <p class="desc">{{item.slbl}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="myChart2"
                        :style="{width: '1.2rem', height: '1.2rem', marginLeft:'auto',marginRight: '0.1rem'}"
                      ></div>
                      <div class="pointchart">
                        <p class="title">招收人数统计图</p>
                        <div class="selfchart">
                          <p class="xray">人数</p>
                          <p class="yray">
                            <span>时</span>
                            <br />
                            <span>间</span>
                          </p>
                          <div class="selfchart_main">
                            <div
                              v-for="(item, index) in studentsubject"
                              :key="index"
                              class="selfchart_main_single"
                            >
                              <div class="left">
                                <p style="color:#00C290">{{item.zszs}}</p>
                                <div :style="{ 'height': item.zszs*0.001 + 'rem' }" class="block"></div>
                              </div>
                              <div class="right">
                                <p style="color:#FF9B00">{{item.jqzyzss}}</p>
                                <div
                                  :style="{ 'height': item.jqzyzss*0.001 + 'rem' }"
                                  class="block"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="selfchart_end">
                          <p style="margin-right:0.06rem">0</p>
                          <p v-for="(item2, index2) in studentsubject" :key="index2">{{item2.nian}}</p>
                        </div>

                        <div class="pointchart_desc">
                          <div style="background: #00C290;" class="block"></div>
                          <p style="margin-right:auto">总招收人数</p>
                          <div style="background: #FF9B00;" class="block"></div>
                          <p style="margin-right:0.15rem">紧缺专业招收人数</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>

                <!-- 评价-->
                <swiper-slide>
                  <div @click="hadleStudentScore" class="student_score boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">学员评价概况</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/{{moment}}月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <div class="student_score_main">
                      <radar
                        v-if="flag2"
                        ref="radar2"
                        :maintitle="'对学员评价雷达图'"
                        :barnumber="radardata2"
                      ></radar>
                      <div v-else style="width:100%;height:2rem;">
                        <p style="text-align: center; line-height: 2rem; color: #dddddd;">暂无数据</p>
                      </div>
                      <div class="student_score_main_desc">
                        <div class="score_main_single">
                          <p class="title">评价平均分</p>
                          <p class="title">（满分{{studentvalue.evaluateoverview.zdmf}}）</p>
                          <p class="answer">{{studentvalue.evaluateoverview.pjpjf}}</p>
                        </div>
                        <div class="score_main_single">
                          <p class="title">各角色对学员评价最低分</p>
                          <p class="answer">{{studentvalue.evaluateoverview.zdf}}</p>
                        </div>
                        <div class="score_main_single">
                          <p class="title">各角色对学员评价总数</p>
                          <p class="answer">{{studentvalue.evaluateoverview.zs}}</p>
                        </div>
                        <div class="score_main_single">
                          <p class="title">评价表提交率</p>
                          <p class="answer">{{studentvalue.evaluateoverview.tjl}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <!-- 轮转-->
                <swiper-slide>
                  <div @click="handleRotation" class="teacher_train boxshadow">
                    <div class="student_train_top box2_top">
                      <p style="margin-right:0.1rem" class="title">科室人数</p>
                      <p class="more">更多</p>
                      <img src="../../../assets/images/right_arrow.png" alt />
                    </div>
                    <p class="descs">数据截止时间：：{{years}}年/{{moment}}月</p>
                    <div style="width: 3rem;display:none;">
                      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
                    </div>
                    <div v-if="showbar" class="student_rotation_main">
                      <div class="rotation_desc">
                        <p class="title">当前轮转人员分布</p>
                        <div class="lzbanner">
                          <div class="lztop">
                            <p class="title">上季度</p>
                            <div class="lzbox">
                              <div class="lzleft">
                                <p class="number">{{studentround.dqlzrs}}</p>
                                <p class="title">轮转人数</p>
                              </div>
                              <div class="lzright">
                                <p class="number">{{studentround.waplzxys}}</p>
                                <p class="title">未排轮转人数</p>
                              </div>
                            </div>
                            <div class="lzbox">
                              <div class="lzleft">
                                <p class="number" style="color:#FF9B00">{{studentround.wajhlz}}</p>
                                <p class="title">未按计划轮转</p>
                              </div>
                            </div>
                          </div>
                          <div class="lzbottom">
                            <p class="title">上年度</p>
                            <div class="lzbox2">
                              <div class="lzleft">
                                <p class="number">{{studentround.tprs}}</p>
                                <p class="title">退培人数</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </mt-tab-container-item>
        <!-- 技能中心 -->
        <mt-tab-container-item id="3">
          <div class="jnbanner">
            <div class="box3_top">
              <p style="margin-right:0.1rem" class="title">学员评价概况</p>
              <p class="more">更多</p>
              <img src="../../../assets/images/right_arrow.png" alt />
            </div>
            <p class="descs">数据截止时间：{{years}}年/{{moment}}月</p>
            <div style="width: 3rem;display:none;">
              <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
            </div>
            <!-- 技能中心内容 -->
            <div class="jnzx">
              <div class="jntop">
                <div class="jntoptext">
                  <div class="text">
                    <p>累计活动次数（次）</p>
                  </div>
                  <div class="text">
                    <p>累计使用人次（人）</p>
                  </div>
                </div>
                <div class="jntoptext">
                  <div class="number">
                    <p>{{skillcentrdata.ljhdcs}}</p>
                  </div>
                  <div class="number">
                    <p>{{skillcentrdata.ljsyrc}}</p>
                  </div>
                </div>
              </div>
              <div class="jnbottom">
                <ul>
                  <li v-for="(item3, index3) in skilldata" :key="index3">
                    <p class="title">{{item3.desc}}</p>
                    <p class="number">>{{item3.number}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <!-- page banner end -->
    </div>
    <!-- 投诉建议 -->
    <div v-show="complainShow" @click="hideComplain" class="complain">
      <div class="complain_win">
        <div class="complain_top">
          <p>投诉建议</p>
          <img src="../../../assets/images/close2.png" alt />
        </div>
        <div class="complain_main">
          <div class="complain_main_left">
            <p class="number">{{proposaldata.ndzs}}</p>
            <p class="desc">本年度投诉建议总数</p>
          </div>
          <div class="complain_main_right">
            <div class="complain_main_right_top">
              <p>已反馈数量</p>
              <p style="margin-left:0.15rem;color: #FFBC2E;">{{proposaldata.wcls}}</p>
            </div>
            <div class="complain_main_right_end">
              <p>已处理数量</p>
              <p style="margin-left:0.15rem;color: #2EBF07;">{{proposaldata.ycls}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import radar from "../../../components/mecharts/radar.vue";
import cycle from "../../../components/mecharts/cycle.vue";
import barlabel from "../../../components/mecharts/barlabel.vue";
import myCharts from "echarts";
import {
  Indicator,
  Navbar,
  TabItem,
  Tabbar,
  TabContainer,
  TabContainerItem
} from "mint-ui";
import { querySkillCentredata, queryActivitydata } from "../../../api/skill";
import {
  teachereValuate,
  workToday,
  teacherData,
  teacherWorkload,
  teacherStrainingdata,
  queryStudenteValuate,
  queryHomepageRounddata,
  queryHomepageTraindata,
  queryHomepageExamdata,
  queryHomepageStudentdata,
  queryProposalsheetdata,
  queryProposalsheetdata2
} from "../../../api/main";
import Cookies from "js-cookie";
import moment from "moment";
export default {
  name: "page-navbar",
  data() {
    const self = this;
    return {
      active: "tab-container1",
      selected: "1",
      selected2: "月度",
      student: "7",
      skill: "10",
      hospitalName: "",
      userName: "",
      complainShow: false,
      showModal: false,
      cyclewidth: "1rem",
      cycle2width: "0.7rem",
      cyclename: "cycle1",
      islogout: false,
      starNumber: 0,
      endNumber: 1157,
      winHeight: 0,
      showbar: true,
      showtrain: false,
      flag1: false,
      years: "",
      flag2: false,
      selectcomp1: false,
      selectname1: "月度",
      selectcomp: false,
      selectname: "月度",
      showstudentexame: false,
      showSwipe4single: false,
      studentexame: {},
      historyactive: [],
      threeactive: [],
      userdels: 0,
      moment: 0,
      mounth: "本月",
      endtime: "11月30日",
      typedd: 0,
      proposaldata: "",
      radardata1: [
        {
          name: "学员满意"
        },
        {
          name: "教学态度"
        },
        {
          name: "沟通反馈"
        },
        {
          name: "教学技巧"
        },
        {
          name: "教学氛围"
        },
        {
          name: "职业素养"
        }
      ],
      radardata2: [
        {
          name: "终身学习 161"
        },
        {
          name: "患者照护162 "
        },
        {
          name: "专业精神162 "
        },
        {
          name: "知识技能159 "
        },
        {
          name: "沟通合作 158"
        },
        {
          name: "职业素养 158"
        }
      ],
      background2: ["#C9D5EC", "#5E7AB8", "#395275", "#7ED5BC"],
      data: "",
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 180,
        centeredSlides: true,
        loop: true,
        observer: true,
        observeParents: true,
        speed: 500,
        longSwipes: false,
        on: {
          transitionStart: function(event) {
            // console.log(self.$refs.mySwiper4);
            self.$refs.mySwiper4.swiper.slideToLoop(
              this.activeIndex - 5,
              800,
              false
            );
          },
          transitionEnd: function(event) {},
          click: function() {
            const realIndex = this.realIndex;
            self.handleClickSlide(realIndex);
          }
        }
      },

      swiperOptionteacher: {
        slidesPerView: 2,
        spaceBetween: 180,
        centeredSlides: true,
        loop: true,
        observer: true,
        observeParents: true,
        speed: 500,
        longSwipes: false,
        on: {
          transitionStart: function(event) {
            // console.log(self.$refs.mySwiper4);
            self.$refs.mySwiper2.swiper.slideToLoop(
              this.activeIndex - 5,
              800,
              false
            );
          },
          transitionEnd: function(event) {}
          // click: function() {
          //   const realIndex = this.realIndex;
          //   self.handleClickSlide(realIndex);
          // }
        }
      },

      swiperOption4: {
        // slidesOffsetAfter : 200,
        slidesPerView: 3,
        spaceBetween: 5,
        // centeredSlides: true,
        loop: true,
        observer: true,
        observeParents: true,
        // loopedSlides: 5,
        centeredSlides: true,
        // slideToClickedSlide: true,
        noSwiping: true,
        speed: 300,

        on: {
          transitionEnd: function(event) {}
        }
      },

      swiperOption5: {
        // slidesOffsetAfter : 200,
        slidesPerView: 5,
        spaceBetween: 3,
        // centeredSlides: true,
        loop: true,
        observer: true,
        observeParents: true,
        // loopedSlides: 5,
        centeredSlides: true,
        // slideToClickedSlide: true,
        noSwiping: true,
        speed: 800,

        on: {
          transitionEnd: function(event) {}
        }
      },
      swiperOption2: {
        // slidesOffsetAfter : 200,
        slidesPerView: 2,
        spaceBetween: 340,
        // centeredSlides: true,
        loop: false,
        observer: true,
        observeParents: true,
        on: {}
      },
      swiperOption3: {
        // scrollbar: '.wrap-scroll',
        direction: "vertical",
        slidesPerView: 1,
        speed: 300,
        on: {
          touchStart: function(event) {
            self.typedd = this.activeIndex;
          },
          transitionEnd: function(event) {
            if (this.activeIndex == 0 && self.typedd == 0) {
              // console.log(2222222);
              workToday("", "").then(res => {
                if (JSON.parse(res).code == 1) {
                  this.workTodaydata = JSON.parse(res).worktodaylist;
                } else {
                  console.log("暂无数据");
                }
              });
            }
          }
        }
        // spaceBetween: 1,
        // mousewheelControl: false,
        // freeMode: true
      },
      selfchartdata: [
        {
          left: 34,
          right: 32,
          time: 2015
        },
        {
          left: 298,
          right: 31,
          time: 2016
        },

        {
          left: 380,
          right: 48,
          time: 2017
        },
        {
          left: 458,
          right: 46,
          time: 2018
        },
        {
          left: 379,
          right: 48,
          time: 2019
        }
      ],
      skilldata: [
        {
          desc: "本月活动次数",
          number: "8"
        },
        {
          desc: "本月使用人次",
          number: "8"
        },
        {
          desc: "技能中心器材",
          number: "238"
        },
        {
          desc: "技能中心面积",
          number: "600m²"
        }
      ],
      // datacharts: [
      //   {
      //     name: "数据1",
      //     value: 36,
      //     rate: 12
      //   },
      //   {
      //     name: "数据2",
      //     value: 20,
      //     rate: 20
      //   },
      //   {
      //     name: "数据3",
      //     value: 16,
      //     rate: -40
      //   }
      // ],
      teacherValuate: "",
      teacherBardata: "",
      workTodaydata: "",
      teacherDatalist: "",
      showteacherWork: false,
      teacherWorkData: "",
      teachertraintypeworkload: "",
      showteacherString: false,
      teacherStringData: "",
      skillcentrdata: "",
      studentvalue: {
        dimensionevaluatelist: [],
        evaluateoverview: {}
      },
      studentround: "",
      studenttype: "",
      studentsubject: "",
      studentpie: false,
      studenttrain: {
        trainsum: {},
        trainrjcs: {},
        trainljrc: {}
      },
      couponSelected: "monthly",
      stuSelected: "monthly",
      barleft: [],
      barright: [],
      cycleData: {
        lspxl: 11,
        zrpxl: 11,
        fzrpxl: 11,
        zzpxl: 11
      }
    };
  },
  // watch:{
  //   flag1(){
  //     setTimeout(() => {
  //       this.$refs.radar1.drawLine()
  //     }, 3000);
  //   }
  // },
  methods: {
    randomRgb(item) {
      let R = Math.floor(Math.random() * 130 + 110);
      let G = Math.floor(Math.random() * 130 + 110);
      let B = Math.floor(Math.random() * 130 + 110);
      return {
        background: "rgb(" + R + "," + G + "," + B + ")"
      };
    },

    handleClickSlide(id) {
      // console.log(id);
      if (id == 0) {
        this.hadleStudentTrain();
      }
      if (id == 4) {
        this.handleRotation();
      }
    },
    handleClickSlideTeacher(id) {
      if (id == 0) {
        this.hadleTeacherTrain();
      }
      // if (id == 3) {
      //   this.handleTeachingStudent()
      // }
    },
    handleClickSelect() {
      this.showModal = true;
    },
    handleClickClose() {
      this.showModal = false;
    },
    handleClickPresident() {
      this.$router.push("/president");
    },
    handleClickMore() {
      this.$router.push("/teacher_comment");
    },
    showComplain() {
      this.showModal = false;
      this.complainShow = true;
    },
    hideComplain() {
      this.complainShow = false;
    },
    hadleToday() {
      this.$router.push("/today_work");
    },
    hadleTeacherTrain() {
      this.$router.push("/teacher_train");
    },
    hadleStudentScore() {
      this.$router.push("/comment");
    },
    hadleTeacherIntroduce() {
      this.$router.push("/teacher_introduce");
    },
    handleRotation() {
      this.$router.push("/on_rotation");
    },
    hadleTeacherMerits() {
      this.$router.push("/teacher_merits");
    },
    hadleStudentExamine() {
      this.$router.push("/student_examine");
    },
    hadleStudentSurvey() {
      this.$router.push("/student_survey");
    },
    hadleStudentTrain() {
      this.$router.push("/student_train");
    },
    handleSkill() {
      this.$router.push("/skill_center");
    },
    handleTeachingActive() {
      this.$router.push("/teaching_active");
    },
    handleTeachingStudent() {
      this.$router.push("/teaching_student");
    },
    handleActive() {
      this.$router.push("/active_center");
    },
    handleNews(type, id) {
      this.$router.push({
        path: "/activity_detail",
        query: {
          type: type,
          id: id
        }
      });
    },
    jumpStudent(ins) {
      this.$refs.mySwiper.swiper.slideToLoop(ins, 1000, false); //切换到第一个slide，速度为1秒
      this.$forceUpdate();
    },
    jumpStudentTop(ins) {
      this.$refs.mySwiper4.swiper.slideToLoop(ins - 5, 1000, false); //切换到第一个slide，速度为1秒
      this.$forceUpdate();
    },
    jumpStudentTop(ins) {
      this.$refs.mySwiper2.swiper.slideToLoop(ins - 5, 1000, false); //切换到第一个slide，速度为1秒
      this.$forceUpdate();
    },
    handLogout() {
      document.title = "九划";
      Cookies.remove("user_name");
      Cookies.remove("hos_name");
      this.$router.push("/login");
    },
    changeTab() {
      this.student = "8";
    },
    changeValue(type, state) {
      Indicator.open("加载中...");
      this.selectcomp = false;
      this.selectname = type;
      this.teacherVal(state, "01", "12");
      // if (type == '年度') {
      //   this.teacherVal('01','12')
      // }else if (type == '季度') {
      //   switch (moment().quarter()) {
      //     case 1:
      //         this.teacherVal('01','03')
      //       break;
      //     case 2:
      //         this.teacherVal('04','06')
      //       break;
      //     case 3:
      //         this.teacherVal('07','09')
      //       break;
      //     case 4:
      //         this.teacherVal('10','12')
      //       break;
      //     default:
      //       break;
      //   }
      // }else{
      //   // if (moment().date() < 20) {
      //     this.teacherVal(this.moment,this.moment)
      //   // }else{
      //   //   this.teacherVal(moment().month() + 1,moment().month() + 1)
      //   // }
      // }
    },
    changeValues(type) {
      this.selectcomp1 = false;
      this.selectname1 = type;
      if (type == "年度") {
        this.studentVal("01", "12");
      } else if (type == "季度") {
        switch (moment().quarter()) {
          case 1:
            this.studentVal("01", "03");
            break;
          case 2:
            this.studentVal("04", "06");
            break;
          case 3:
            this.studentVal("07", "09");
            break;
          case 4:
            this.studentVal("10", "12");
            break;
          default:
            break;
        }
      } else {
        if (moment().date() < 20) {
          this.studentVal(this.moment, this.moment);
        } else {
          this.studentVal(moment().month() + 1, moment().month() + 1);
        }
      }
    },
    teacherVal(type, start, end) {
      teachereValuate(type, start, end)
        .then(res => {
          // console.log(JSON.parse(res));

          // console.log(moment(moment().year() + "-" + start,"YYYY-MM").daysInMonth(),moment(moment().year() + "-" + end,"YYYY-MM").daysInMonth());
          if (JSON.parse(res).code == 1) {
            (this.teacherValuate = JSON.parse(res).evaluateoverview),
              (this.teacherBardata = JSON.parse(res).dimensionevaluatelist);
            var arrsp = [];
            for (let i = 0; i < this.teacherBardata.length; i++) {
              arrsp.push({
                name:
                  this.teacherBardata[i].typename +
                  "\n" +
                  this.teacherBardata[i].averagescore,
                value: parseFloat(this.teacherBardata[i].averagescore)
              });
            }
            // console.log(arrsp);
            if (arrsp[0].value <= 10) {
              arrsp[0].value = arrsp[0].value * 10;
            }
            if (arrsp[1].value <= 10) {
              arrsp[1].value = arrsp[1].value * 10;
            }
            if (arrsp[2].value <= 10) {
              arrsp[2].value = arrsp[2].value * 10;
            }
            if (arrsp[3].value <= 10) {
              arrsp[3].value = arrsp[3].value * 10;
            }
            if (arrsp[4].value <= 10) {
              arrsp[4].value = arrsp[4].value * 10;
            }
            if (arrsp[5].value <= 10) {
              arrsp[5].value = arrsp[5].value * 10;
            }

            if (
              arrsp[0].value == 0 &&
              arrsp[1].value == 0 &&
              arrsp[2].value == 0 &&
              arrsp[3].value == 0 &&
              arrsp[4].value == 0 &&
              arrsp[5].value == 0
            ) {
              this.flag1 = false;
            } else {
              this.flag1 = true;
              this.radardata1 = arrsp;
              setTimeout(() => {
                this.$refs.radar1;
              }, 1000);
            }

            Indicator.close();
          } else {
            console.log("暂无数据");
          }
        })
        .catch(err => {
          // console.log(err);
          alert("接口返回错误，请重新刷新页面");
          // window.location.reload()
        });

      // return new Promise((resolve, reject) => {
      //   teachereValuate(start,end)
      //     .then(res => {
      //       if(JSON.parse(res).code == 1){
      //         this.teacherValuate = JSON.parse(res).evaluateoverview,
      //         this.teacherBardata = JSON.parse(res).dimensionevaluatelist
      //         var arrsp = []
      //         for (let i = 0; i < this.teacherBardata.length; i++) {
      //           arrsp.push({
      //             name:this.teacherBardata[i].typename + "\n" + this.teacherBardata[i].averagescore,
      //             value: parseFloat(this.teacherBardata[i].averagescore)
      //           })
      //         }
      //         this.radardata1 = arrsp
      //         this.flag1 = true
      //         this.$refs.radar1.drawLine()
      //         Indicator.close();
      //         resolve();
      //       }else{
      //         // console.log(6);
      //         reject();
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);

      //       reject();
      //     });
      // });
    },
    studentVal(start, end) {
      queryHomepageExamdata(start, end).then(res => {
        // console.log(JSON.parse(res));
        // this.studentexame = JSON.parse(res).exampassingrate;
        let lis = JSON.parse(res).exampassingrate;
        for (var p = 0; p < lis.length; p++) {
          let dfl2 = lis[p].dfl.replace("%", "");
          // console.log(dfl2);
          parseFloat(dfl2).toFixed(2);
          lis[p].dfl = parseFloat(dfl2).toFixed(2);
        }
        this.studentexame = lis;
      });
    },
    handleSelectcomp1() {
      if (this.selectcomp1 == true) {
        this.selectcomp1 = false;
      } else {
        this.selectcomp1 = true;
      }
    },
    handleSelectcomp() {
      if (this.selectcomp == true) {
        this.selectcomp = false;
      } else {
        this.selectcomp = true;
      }
    },
    // startTop() {
    //   // if (document.documentElement.scrollTop == 590) {
    //   //   document.body.scrollTop = document.documentElement.scrollTop = 1157;
    //   // }else{
    //   //   document.body.scrollTop = document.documentElement.scrollTop = 590;
    //   // }
    //   this.starNumber = document.documentElement.scrollTop

    // },
    // endTop() {
    //   this.endNumber = document.documentElement.scrollTop
    //   console.log(this.starNumber,this.endNumber);
    //   if (this.starNumber > this.endNumber) {
    //     //向上滑动
    //     if (this.starNumber < 590) {
    //       document.body.scrollTop = document.documentElement.scrollTop = 1157;
    //     }else{
    //       document.body.scrollTop = document.documentElement.scrollTop = 590;
    //     }
    //   }else{
    //     //向下滑动
    //     if (this.starNumber < 590) {
    //       document.body.scrollTop = document.documentElement.scrollTop = 590;
    //     }else{
    //       document.body.scrollTop = document.documentElement.scrollTop = 1157;
    //     }

    //   }
    // },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = myCharts.init(document.getElementById("myChart2"));
      // let myChart3 = myCharts.init(document.getElementById("myChart3"));
      // let myChart4 = myCharts.init(document.getElementById("myChart4"));
      window.onresize = myChart.resize;
      var vms = this;
      // console.log(vms.studenttype);
      // window.onresize = myChart3.resize;
      // window.onresize = myChart4.resize;
      // 绘制图表
      myChart.setOption({
        // legend: {
        //   // selectedMode: false, // 取消图例上的点击事件
        //   type: "plain",
        //   icon: "circle",
        //   orient: "vertical",
        //   left: "0%",
        //   top: "15%",
        //   align: "right",
        //   itemGap: 15,
        //   itemWidth: 10, // 设置宽度
        //   itemHeight: 10, // 设置高度
        //   symbolKeepAspect: false,
        //   textStyle: {
        //     color: "#000",
        //     rich: {
        //       name: {
        //         verticalAlign: "right",
        //         align: "left",
        //         width: 35,
        //         fontSize: 12
        //       },
        //       value: {
        //         align: "left",
        //         width: 60,
        //         fontSize: 12
        //       },
        //       count: {
        //         align: "left",
        //         width: 80,
        //         fontSize: 12
        //       },
        //       upRate: {
        //         align: "left",
        //         fontSize: 12,
        //         color: "#00cf90"
        //       },
        //       downRate: {
        //         align: "left",
        //         fontSize: 12,
        //         color: "#ff5722"
        //       }
        //     }
        //   },
        //   data: vms.datacharts.map(item => item.name),
        //   formatter: function(name) {
        //     let className = "upRate";
        //     // let rateIcon = "▲";
        //     // console.log(this.data)
        //     if (vms.datacharts && vms.datacharts.length) {
        //       for (var i = 0; i < vms.datacharts.length; i++) {
        //         if (name === vms.datacharts[i].name) {
        //           return (
        //             "{name| " +
        //             name +
        //             "}  | " +
        //             "{value| " +
        //             vms.datacharts[i].value +
        //             "%}"
        //           );
        //         }
        //       }
        //     }
        //   }
        // },
        // series: [
        //   {
        //     name: "数量",
        //     type: "pie",
        //     radius: ["35%", "53%"],
        //     center: ["65%", "30%"],
        //     data: vms.datacharts,
        //     label: {
        //       normal: {
        //         show: false,
        //         position: "center",
        //         formatter: "{text|{c}}\n{b}",
        //         rich: {
        //           text: {
        //             align: "center",
        //             verticalAlign: "middle",
        //             padding: 8,
        //             fontSize: 30
        //           },
        //           value: {
        //             align: "center",
        //             verticalAlign: "middle",
        //             fontSize: 20
        //           }
        //         }
        //       },
        //       emphasis: {
        //         show: true,
        //         textStyle: {
        //           fontSize: "12"
        //         }
        //       }
        //     },
        //     labelLine: {
        //       normal: {
        //         show: true
        //       }
        //     }
        //   }
        // ]
        series: [
          {
            type: "pie",
            color: ["#C9D5EC", "#5E7AB8", "#395275", "#7ED5BC"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["40%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: (function() {
              var res = [];
              var len = 0;
              for (var i = 0; i < vms.studenttype.length; i++) {
                // console.log(vms.studenttype[i]);
                res.push({
                  value: vms.studenttype[i].studentsum,
                  name: vms.studenttype[i].typename
                });
              }
              delete res[0];
              return res;
            })()
          }
        ]
      });
    }
  },
  mounted() {
    if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 12;
        this.mounth = "上月";
        this.endtime = 12 + "月" + moment(12, "MM").daysInMonth() + "日";
      } else {
        this.moment = moment().month();
        this.mounth = "上月";
        this.endtime =
          moment().month() +
          "月" +
          moment(moment().month(), "MM").daysInMonth() +
          "日";
      }
    } else {
      this.moment = moment().month() + 1;
      this.mounth = "本月";
      this.endtime =
        moment().month() +
        1 +
        "月" +
        moment(moment().month() + 1, "MM").daysInMonth() +
        "日";
    }
    this.years = moment().year();

    // console.log(moment().year());

    //   var mo = function (e) { e.preventDefault() }
    //   document.body.style.overflow = 'hidden'
    //   document.addEventListener('touchmove', mo, false)// 禁止页面滑动

    // const mySwiper = this.$refs.mySwiper.swiper
    // mySwiper4.controller.control = mySwiper
    // mySwiper.controller.control = mySwiper4
    setTimeout(() => {
      const mySwiper4 = this.$refs.mySwiper4;
      const mySwiper2 = this.$refs.mySwiper2;
      // console.log(this.$refs.mySwiper4.swiper);
      const mySwiper = this.$refs.mySwiper;
      // mySwiper4.slideToLoop(2, 1000, false);
      // mySwiper.slideToLoop(2, 1000, false);
    }, 1000);

    // this.teacherVal('11','11')
    // this.teacherVal("11","11")
    // if (moment().date() < 20) {
    this.teacherVal(1, this.moment, this.moment);
    // }else{
    //   this.teacherVal(moment().month() + 1,moment().month() + 1)
    // }
    // Promise.all([

    // ]).then(msg => {
    //   // setTimeout(() => {
    //     // console.log(this.$refs.radar1);
    //   // }, 2000);

    //   // this.flag1 = true
    //   // this.$refs.radar1.drawLine()

    // }).catch(err => {
    //   console.log(err);
    // });
    //////////今日直通
    workToday("", "").then(res => {
      if (JSON.parse(res).code == 1) {
        this.workTodaydata = JSON.parse(res).worktodaylist;
      } else {
        console.log("暂无数据");
      }
    }),
      teacherWorkload(this.moment).then(res => {
        if (JSON.parse(res).code == 1) {
          this.teacherWorkData = JSON.parse(res).teacherworkload;
          this.teachertraintypeworkload = JSON.parse(
            res
          ).teachertraintypeworkload;
          this.showteacherWork = true;
        } else {
          console.log("暂无数据");
        }
      }),
      teacherStrainingdata().then(res => {
        // console.log(res);
        if (JSON.parse(res).code == 1) {
          this.teacherStringData = JSON.parse(res).teacherstrainingdata;
          // console.log(JSON.parse(res));
          this.showteacherString = true;
        } else {
          console.log("暂无数据");
        }
      }),
      queryStudenteValuate(this.moment).then(res => {
        if (JSON.parse(res).code == 1) {
          this.studentvalue = JSON.parse(res);
          // console.log(this.studentvalue);
          var arrspd = [];
          for (
            let i = 0;
            i < this.studentvalue.dimensionevaluatelist.length;
            i++
          ) {
            arrspd.push({
              name:
                this.studentvalue.dimensionevaluatelist[i].typename +
                "\n" +
                this.studentvalue.dimensionevaluatelist[i].averagescore,
              value: parseFloat(
                this.studentvalue.dimensionevaluatelist[i].averagescore
              )
            });
          }
          this.radardata2 = arrspd;
          if (
            arrspd[0].value == 0 &&
            arrspd[1].value == 0 &&
            arrspd[2].value == 0 &&
            arrspd[3].value == 0 &&
            arrspd[4].value == 0 &&
            arrspd[5].value == 0
          ) {
            this.flag2 = false;
          } else {
            this.flag2 = true;
          }
          this.flag2 = true;
          setTimeout(() => {
            this.$refs.radar2.drawLine();
            // this.$refs.radar2.drawLine()
          }, 1000);
        } else {
          console.log("暂无数据");
        }
      }),
      queryHomepageRounddata(this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.studentround = JSON.parse(res).personrounddata;
        if (JSON.parse(res).code == 1) {
          // console.log(JSON.parse(res));
          // var arrs = [];
          // arrs.push({
          //   name: JSON.parse(res).officeroundnowsum[0].officename,
          //   number: JSON.parse(res).officeroundnowsum[0].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[0].lzbl,
          //   color: "rgba(249,149,63,1)"
          // });
          // arrs.push({
          //   name: JSON.parse(res).officeroundnowsum[1].officename,
          //   number: JSON.parse(res).officeroundnowsum[1].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[1].lzbl,
          //   color: "rgba(249,149,63,0.70)"
          // });
          // arrs.push({
          //   name: JSON.parse(res).officeroundnowsum[2].officename,
          //   number: JSON.parse(res).officeroundnowsum[2].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[2].lzbl,
          //   color: "rgba(249,149,63,0.40)"
          // });
          // this.barleft = arrs;
          // var arrsd = [];
          // arrsd.push({
          //   name: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 3
          //   ].officename,
          //   number: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 3
          //   ].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 3
          //   ].lzbl,
          //   color: "rgba(249,149,63,1)"
          // });
          // arrsd.push({
          //   name: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 2
          //   ].officename,
          //   number: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 2
          //   ].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 2
          //   ].lzbl,
          //   color: "rgba(249,149,63,1)"
          // });
          // arrsd.push({
          //   name: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 1
          //   ].officename,
          //   number: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 1
          //   ].lzbl,
          //   percent: JSON.parse(res).officeroundnowsum[
          //     JSON.parse(res).officeroundnowsum.length - 1
          //   ].lzbl,
          //   color: "rgba(249,149,63,1)"
          // });
          // this.barright = arrsd;
          // // console.log(arrsd);

          this.showbar = true;
        } else {
          console.log("暂无数据");
        }
      }),
      queryHomepageTraindata(this.moment).then(res => {
        if (JSON.parse(res).code == 1) {
          // console.log(JSON.parse(res));
          this.studenttrain = JSON.parse(res);
          this.showtrain = true;
          this.showstudentexame = true;
          this.showteacherWork = true;
        } else {
          console.log("暂无数据");
        }
      });
    if (moment().date() < 20) {
      this.studentVal(this.moment, this.moment);
    } else {
      this.studentVal(moment().month() + 1, moment().month() + 1);
    }
    queryHomepageStudentdata(this.moment).then(res => {
      // console.log(JSON.parse(res));
      this.studenttype = JSON.parse(res).studatalist;
      // console.log(this.studenttype);
      this.studentsubject = JSON.parse(res).studensubjectdata;
      this.studentpie = true;
      setTimeout(() => {
        this.drawLine();
      }, 1000);
    });
    querySkillCentredata().then(res => {
      this.skillcentrdata = JSON.parse(res).skillcentredata;

      if (!this.skillcentrdata) {
        this.skillcentrdata = {
          byhdcs: 0,
          bysyrc: 0,
          jnzxqc: 0,
          jnzxmj: 0
        };
        var bdd = [];
        bdd.push({
          desc: "本月活动次数",
          number: 0
        });
        bdd.push({
          desc: "本月使用人次",
          number: 0
        });
        bdd.push({
          desc: "技能中心器材",
          number: 0
        });
        bdd.push({
          desc: "技能中心面积",
          number: 0
        });
        this.skilldata = bdd;
      } else {
        var bdd = [];
        bdd.push({
          desc: "本月活动次数",
          number: JSON.parse(res).skillcentredata.byhdcs
        });
        bdd.push({
          desc: "本月使用人次",
          number: JSON.parse(res).skillcentredata.bysyrc
        });
        bdd.push({
          desc: "技能中心器材",
          number: JSON.parse(res).skillcentredata.jnzxqc
        });
        bdd.push({
          desc: "技能中心面积",
          number: JSON.parse(res).skillcentredata.jnzxmj
        });
        this.skilldata = bdd;
      }
    });
    queryActivitydata().then(res => {
      (this.historyactive = JSON.parse(res).historyactivitylist),
        (this.threeactive = JSON.parse(res).threedaysactivitylist);
      // console.log(JSON.parse(res).historyactivitylist);
      if (this.historyactive) {
        // console.log("1");
      }
    });
    queryProposalsheetdata().then(res => {
      this.userdels = JSON.parse(res).dcls;
    });
    queryProposalsheetdata2().then(res => {
      // console.log(JSON.parse(res));
      this.proposaldata = JSON.parse(res).proposalyeardata;
    });
    this.hospitalName = Cookies.get("hos_name");
    this.userName = Cookies.get("user_name");
    // const mySwiper4 = this.$refs.mySwiper4.swiper
    // const mySwiper = this.$refs.mySwiper.swiper
    // mySwiper4.slideToLoop(2, 1000, false);
    // mySwiper.slideToLoop(2, 1000, false);
  },
  created() {
    // console.log(document.body.clientHeight);
    this.winHeight = document.body.clientHeight;
    teacherData().then(res => {
      // console.log(JSON.parse(res));
      if (JSON.parse(res).code == 1) {
        this.teacherDatalist = JSON.parse(res).teacherdata;
        this.cycleData.lspxl = JSON.parse(res).teacherdata.lspxl;
        this.cycleData.zrpxl = JSON.parse(res).teacherdata.zrpxl;
        this.cycleData.fzrpxl = JSON.parse(res).teacherdata.fzrpxl;
        this.cycleData.zzpxl = JSON.parse(res).teacherdata.zzpxl;
        // console.log(this.cycleData);
      } else {
        console.log("暂无数据");
      }
    });
  },
  components: {
    swiper,
    swiperSlide,
    radar,
    cycle,
    barlabel
  }
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.swiper;
  //   }
  // }
};
</script>  
  
<style lang="less" scoped>
.tabletop {
  margin-top: 0.2rem;
  .topname {
    color: #474c63;
    text-align: left;
    padding-left: 0.1rem;
  }
}
.end {
  background: #ffffff;
  margin-top: 0.09rem;
  padding-bottom: 0.1rem;

  .end_top {
    border-left: 3px solid #277fff;
    margin-left: 0.15rem;
    padding-left: 0.05rem;
    margin-bottom: 0.1rem;

    p {
      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      color: #474c63;
      letter-spacing: 0;
      // line-height: 18px;
    }
  }

  .end_end {
    width: 3rem;
    margin: 0 auto;

    .end_th {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        height: 0.35rem;
        line-height: 0.35rem;
        width: 1rem;
        text-align: center;
      }
    }

    .end_td {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        height: 0.35rem;
        line-height: 0.35rem;
        width: 1rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  // height: 4rem;
}
.flex_end {
  display: flex;
  align-items: flex-end;
}
.item {
  display: inline-block;
}

.nav {
  padding: 10px;
}

.main {
  height: 100%;
  width: 100%;
  // overflow: hidden;
  position: absolute;
  z-index: 2;
  top: 0.6rem;
  /deep/.mint-tab-item-label {
    font-size: 0.16rem;
  }
  .dropdown {
    position: absolute;
    top: -0.3rem;
    left: 0;
    z-index: 2;
    right: 0;
    margin: auto;
    p {
      text-align: center;
      font-size: 14px;
      color: #dddddd;
    }
  }
}

.link {
  color: inherit;
  padding: 20px;
  display: block;
}
.main_header {
  background-image: url("../../../assets/images/img_bgtop.png");
  background-size: 100%;
  height: 2.07rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.newtop {
  display: flex;
  align-items: center;
  margin-left: auto;
  .name {
    font-size: 0.13rem;
  }
}
.main_top {
  background-image: url("../../../assets/images/img_bgtop.png");
  background-size: 100%;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  // padding-top: 0.16rem;
  // padding-bottom: 0.16rem;
  height: 5.3%;
  padding-top: 2.8%;
  padding-bottom: 2.8%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 0.2rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    // line-height: 0.22rem;
    margin-left: 0.2rem;
  }
  .select {
    width: 0.28rem;
    height: 0.28rem;
    margin-left: auto;
  }
  .name {
    font-family: PingFangSC-Medium;
    font-size: 0.14rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    // line-height: 14px;
    margin-left: auto;
    margin-right: 0.15rem;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
  }

  .point {
    width: 0.15rem;
    height: 0.12rem;
    background: #ff6962;
    border-radius: 0.1rem;
    position: absolute;
    right: 0.08rem;
    top: 0.18rem;
    p {
      font-size: 0.1rem;
      color: #ffffff;
      line-height: 0.12rem;
      text-align: center;
    }
  }
}

.main_today_top2 {
  display: flex;
  align-items: center;
  background: #0096c1;
  position: relative;
  color: #fff;
  padding: 0.11rem;
  border-radius: 0.1rem 0.1rem 0rem 0rem;
}
.main_today {
  width: 3.55rem;
  background: #ffffff;
  margin: 0 auto;
  box-shadow: 0rem 0rem 0.04rem 0.01rem rgba(0, 0, 0, 0.1);
  height: 30%;
  border-radius: 0.1rem 0.1rem 0.1rem 0.1rem;

  .main_today_top {
    display: flex;
    align-items: center;
    padding-top: 0.05rem;
    .today_img {
      width: 0.24rem;
    }
    .todaywork_title {
      font-family: PingFangSC-Medium;
      font-size: 0.2rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      margin-right: auto;
    }
    .number {
      display: flex;
      align-items: center;
      width: 0.65rem;
      height: 0.25rem;
      border-radius: 12.5px;
      border-radius: 12.5px;
      margin: 0 auto;
      p {
        font-family: PingFangSC-Medium;
        font-size: 0.15rem;
        letter-spacing: 0;
        margin-left: 0.08rem;
        margin-right: 0.06rem;
        margin-left: auto;
      }
      img {
        width: 0.08rem;
        height: 0.1rem;
        margin-right: auto;
      }
    }
    .change_img {
      width: 0.16rem;
      height: 0.16rem;
      margin-left: auto;
    }
  }
  .main_today_bar {
    margin-left: 0.16rem;
    margin-right: 0.18rem;
    .tabbar {
      display: flex;
      align-items: center;
      padding-bottom: 0.1rem;
      border-bottom: 1px dashed #f0f0f7;
      padding-top: 0.1rem;
      // line-height: 0.3rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        font-weight: 600;
        letter-spacing: 0;
        // line-height: 18px;
        margin-right: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9397ad;
        letter-spacing: 0;
        // line-height: 13px;
      }
    }
  }
}
.teacher {
  // /deep/ .mint-tab-item-label{
  //   // font-family: PingFangSC-Medium;
  //   font-size: 0.18rem;
  //   color: #212121;
  //   letter-spacing: 0;
  //   // line-height: 18px;
  // }
  // height: 4.3rem;
  margin-top: 1.779%;
  background: #ffffff;
  /deep/ .swiper-slide {
    margin-left: 1px;
  }
  .teacher_header {
    display: flex;
    align-items: center;
    // padding-top: 0.1rem;
    // padding-bottom: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    // background: #ffffff;
    // background: url("../../../assets/images/maintial.png") no-repeat;
    background-size: 1rem 0.3rem;
    margin-left: 0.15rem;
    // padding-left: 0.15rem;
    width: 1rem;
    height: 0.3rem;
    position: absolute;
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      // line-height: 18px;
      position: absolute;
      // width: 1rem;
      left: 0.15rem;
    }
    img {
      width: 1rem;
    }
  }
  .teacher_main_box {
    // width: 3.55rem;
    // height: 3.51rem;
    // background: #ffffff;
    // box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
    // border-radius: 5px;
    // border-radius: 5px;
    // margin: 0 auto;
    margin-left: 0.1rem;
    // margin-top: 0.05rem;
    // margin-bottom: 0.1rem;
    // /deep/ .swiper-slide{
    //   width: auto !important;
    // }
    .box1_top {
      display: flex;
      align-items: center;
      padding-top: 0.1rem;
      // margin-bottom: 0.2rem;
      margin-right: 0.15rem;
      .title {
        border-left: 3px solid #277fff;
        margin-left: 0.1rem;
        display: flex;
        align-items: center;
        height: 0.18rem;
        line-height: 0.18rem;
        p {
          font-family: PingFangSC-Medium;
          font-size: 0.16rem;
          color: #474c63;
          margin-left: 0.1rem;
          letter-spacing: 0;
          // line-height: 18px;
        }
        a {
          font-family: PingFangSC-Medium;
          font-size: 0.16rem;
          color: #474c63;
          margin-left: 0.1rem;
          letter-spacing: 0;
        }
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        text-align: right;
        // line-height: 15px;
        margin-left: auto;
      }
      a {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        text-align: right;
        // line-height: 15px;
        margin-left: auto;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }

    .box1_img {
      width: 2.8rem;
      display: block;
      margin: 0 auto;
      // padding-bottom: 0.2rem;
      // height: 80%;
    }
    .boxshadow {
      width: 3.3rem;
      background: #ffffff;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      margin-bottom: 0.1rem;
      margin-top: 0.1rem;
      // overflow: hidden;
    }
  }
}
.student {
  // padding-top: 0.1rem;
  height: 100%;
  .student_header {
    display: flex;
    align-items: center;
    // padding-top: 0.1rem;
    // padding-bottom: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    background: #ffffff;
    background: url("../../../assets/images/maintial.png") no-repeat;
    background-size: 1rem 0.3rem;
    margin-left: 0.15rem;
    padding-left: 0.15rem;
    width: 1rem;
    height: 0.3rem;
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      // line-height: 18px;
    }
    img {
      width: 0.24rem;
      height: 0.24rem;
      margin-left: 0.21rem;
      margin-right: 0.1rem;
    }
  }
  .student_main {
    height: 95%;
    /deep/ .swiper-container {
      width: 100%;
      height: 100%;
    }
    /deep/ .swiper-slide {
      text-align: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.75);
      height: 100%;
    }
    /deep/ .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
    .swiper_box {
      display: flex;
      // align-items: center;
      .box_left {
        height: 3.76rem;
        width: 0.23rem;
        background: #ffffff;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        border-radius: 5px;
        margin-top: 0.22rem;
      }
      .box_right {
        height: 3.76rem;
        width: 0.23rem;
        background: #ffffff;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        border-radius: 5px;
        margin-top: 0.22rem;
      }
    }

    .student_main_box {
      width: 3.8rem;
      border-radius: 5px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 0.1rem;
      .box1_top {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        width: 3rem;
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.15rem;
          color: #474c63;
          letter-spacing: 0;
          text-align: right;
          // line-height: 15px;
          margin-left: auto;
        }
        img {
          width: 0.15rem;
          height: 0.15rem;
          margin-right: 0.15rem;
        }
      }
      .box1_img {
        width: 2.8rem;
        height: 3.41rem;
        display: block;
        margin: 0 auto;
        // padding-bottom: 0.2rem;
        // height: 80%;
      }
      .boxshadow {
        position: relative;
        width: 3rem;
        height: 100%;
        background: #ffffff;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        border-radius: 5px;
        margin: 0 auto;
      }
    }
  }
}
.skill {
  height: 100%;
  .skill_top {
    // display: flex;
    // align-items: center;
    padding-top: 0.12rem;
    padding-bottom: 0.1rem;
    background-image: url(../../../assets/images/indexback.png);
    background-size: 100%;
    padding-left: 0.2rem;
    padding-right: 0.15rem;
    p {
      color: #ffffff;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .middle {
      display: flex;
      align-items: center;
      .middle_left {
        text-align: center;
        margin-right: auto;
        .middle_left_top {
          margin-bottom: 0.2rem;
        }
        .number {
          font-family: PingFangSC-Regular;
          font-size: 0.38rem;
          color: #ffffff;
          letter-spacing: 0;
          // line-height: 38px;
        }
        .desc {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #ffffff;
          letter-spacing: 0;
          // line-height: 13px;
        }
      }
      .middle_right {
        .middle_right_single {
          display: flex;
          align-items: center;
          margin-top: 0.08rem;
          padding-bottom: 0.09rem;
          .desc {
            margin-right: 0.32rem;
          }
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #ffffff;
            letter-spacing: 0;
            // line-height: 13px;
          }
        }
      }
    }
    .skill_top_img {
      width: 0.24rem;
      height: 0.24rem;
      margin-left: 0.2rem;
      margin-right: 0.08rem;
    }
    .title {
      font-family: PingFangSC-Medium;
      font-size: 0.2rem;
      // color: #212121;
      letter-spacing: 0;
    }
    .more {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      // color: #474c63;
      letter-spacing: 0;
      margin-left: auto;
      margin-right: 0.06rem;
    }
    .arrow {
      width: 0.06rem;
      height: 0.09rem;
      margin-right: 0.15rem;
    }
  }
  .skill_back {
    width: 100%;
    height: 1.73rem;
  }
  .news {
    // height: 2.1rem;
    .news_detial {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      margin-top: 0.05rem;
      margin-bottom: 0.05rem;
      .news_detial_left {
        .title {
          font-family: PingFangSC-Regular;
          font-size: 0.16rem;
          color: #212121;
          letter-spacing: 0;
          line-height: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .time {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #9397ad;
          letter-spacing: 0;
          line-height: 13px;
        }
      }
      img {
        width: 1rem;
        height: 0.7rem;
        border-radius: 5px;
        margin-left: 0.15rem;
        min-width: 1rem;
      }
    }
  }
  .show_more {
    width: 1.2rem;
    height: 0.26rem;
    background: #f0f0f7;
    border-radius: 13px;
    border-radius: 13px;
    margin: 0 auto;
    margin-top: 0.05rem;
    margin-bottom: 0.15rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: #9397ad;
      letter-spacing: 0;
      line-height: 0.26rem;
      text-align: center;
    }
  }
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.select-modal {
  width: 1.34rem;
  height: 1.2rem;
  background-color: #fff;
  padding-top: 0.1rem;
  box-sizing: border-box;
  position: absolute;
  top: 0.5rem;
  right: 0.15rem;
  border-radius: 0.05rem;
  .sj {
    position: absolute;
    top: -0.1rem;
    right: 0.05rem;
    border-top: 0.05rem solid transparent;
    border-left: 0.05rem solid transparent;
    border-right: 0.05rem solid transparent;
    border-bottom: 0.05rem solid #fff;
  }
  p {
    line-height: 0.35rem;
    padding-left: 0.3rem;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #212121;
    span {
      background: #ff6962;
      border-radius: 0.075rem;
      color: #fff;
      font-size: 13px;
      display: inline-block;
      width: 0.22rem;
      height: 0.15rem;
      line-height: 0.15rem;
      text-align: center;
      margin-left: 0.05rem;
    }
  }
}
.box2_top {
  display: flex;
  align-items: center;
  margin-top: 0.12rem;
  // width: 3rem;
  // margin-left: 0.2rem;
  // margin-right: 0.15rem;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    border-left: 3px solid #277fff;
    padding-left: 0.05rem;
    margin-left: 0.1rem;
    height: 0.15rem;
    line-height: 0.15rem;
  }
  .more {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #474c63;
    letter-spacing: 0;
    text-align: right;
    // line-height: 15px;
    margin-left: auto;
  }
  .top {
    display: flex;
    align-items: center;
    .desc {
      font-size: 0.1rem;
      color: #dddddd;
      margin-left: 0.05rem;
    }
  }
  img {
    width: 0.15rem;
    height: 0.15rem;
    margin-right: 0.1rem;
  }
}
.box3_top {
  display: flex;
  align-items: center;
  padding-top: 0.12rem;
  margin-top: 0.3rem;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    border-left: 3px solid #277fff;
    padding-left: 0.05rem;
    margin-left: 0.1rem;
    height: 0.15rem;
    line-height: 0.15rem;
  }
  .more {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #474c63;
    letter-spacing: 0;
    text-align: right;
    // line-height: 15px;
    margin-left: auto;
  }
  .top {
    display: flex;
    align-items: center;
    .desc {
      font-size: 0.1rem;
      color: #dddddd;
      margin-left: 0.05rem;
    }
  }
  img {
    width: 0.15rem;
    height: 0.15rem;
    margin-right: 0.1rem;
  }
}
.complain {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .complain_win {
    width: 3rem;
    height: 2rem;
    background: #ffffff;
    border-radius: 10px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .complain_top {
      padding-top: 0.17rem;
      padding-bottom: 0.16rem;
      border-bottom: 1px solid #f0f0f7;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        // line-height: 16px;
      }
      img {
        width: 0.12rem;
        height: 0.12rem;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
      }
    }
    .complain_main {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      margin-top: 0.3rem;
      margin-bottom: 0.48rem;
      .complain_main_left {
        padding-right: 0.19rem;
        border-right: 2px solid #f0f0f7;
        .number {
          font-family: PingFangSC-Medium;
          font-size: 0.5rem;
          color: #277fff;
          letter-spacing: 0;
          text-align: center;
          line-height: 0.5rem;
        }
        .desc {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          text-align: center;
          line-height: 0.15rem;
          margin-top: 0.07rem;
        }
      }
      .complain_main_right {
        padding-left: 0.14rem;
        .complain_main_right_top {
          display: flex;
          align-items: center;
          padding-bottom: 0.13rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #212121;
            letter-spacing: 0;
            line-height: 0.13rem;
          }
        }
        .complain_main_right_end {
          display: flex;
          align-items: center;
          padding-top: 0.13rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #212121;
            letter-spacing: 0;
            line-height: 0.13rem;
          }
        }
      }
    }
  }
}
.teacher_train {
  position: relative;
  .teacher_train_main {
    // margin-left: 0.23rem;
    // margin-right: 0.22rem;
    // margin-top: 0.3rem;
    // margin-bottom: 0.4rem;
    width: 3.1rem;
    height: 2.05rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.5rem;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.5rem;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.15rem;
      margin-top: 0.1rem;
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .single {
      width: 1.5rem;
      height: 1.02rem;
    }
    .train_main_top_left {
      border-right: 1px solid #f0f0f7;
      border-bottom: 1px solid #f0f0f7;
    }
    .train_main_end_right {
      border-left: 1px solid #f0f0f7;
      border-top: 1px solid #f0f0f7;
      padding-top: 0.28rem;
    }
    .train_main_end_left {
      padding-top: 0.28rem;
    }
    .train_main_top {
      .number {
        color: #7ed5bc;
      }
    }
    .train_main_end {
      .number {
        color: #326699;
      }
    }
  }
}
.teacher_detial_main {
  img {
    width: 2.8rem;
    display: block;
    margin: 0 auto;
  }
  .tdetial_main {
    width: 3.3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .detial_main_top {
      display: flex;
      align-items: center;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      margin-top: 0.3rem;
      .detial_main_top_left {
        text-align: center;
        margin-right: auto;
        .topmain {
          display: flex;
          align-items: center;
        }
        .number {
          opacity: 0.98;
          font-family: PingFangSC-Medium;
          font-size: 0.28rem;
          color: #239eff;
          letter-spacing: 0;
          margin-left: 0.1rem;
          // line-height: 28px;
        }
        .desc {
          font-family: PingFangSC-Regular;
          font-size: 0.15rem;
          color: #212121;
          letter-spacing: 0;
          text-align: center;
          // line-height: 15px;
        }
      }
    }
    .detial_main_middle {
      display: flex;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      margin-top: 0.15rem;
      margin-bottom: 0.3rem;
      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.3rem;
        // color: #7ED5BC;
        letter-spacing: 0;
        text-align: center;
        // line-height: 30px;
      }
      .desc {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
        margin-bottom: 0.1rem;
      }
    }
    .detial_main_end {
      display: flex;
      align-items: center;
      // margin-left: 0.15rem;
      // padding-top: 0.1rem;
      // border-top: 1px solid #dddddd;
      .number {
        font-size: 0.3rem;
        margin-left: 0.1rem;
      }
    }
  }
}
.teacher_score_main {
  // margin-top: 0.2rem;
  // margin-left: 0.17rem;
  // margin-right: 0.2rem;
  width: 3.1rem;
  // height: 3.2rem;
  position: absolute;
  // top: 0;
  left: 0.1rem;
  right: 0;
  bottom: 0;
  top: 0.1rem;
  margin: auto;
  // margin-top: 0.1rem;
  .blocks {
    width: 3.1rem;
    height: 1.49rem;
    display: block;
    position: absolute;
    top: 0;
  }
  .bottom {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
  }
  .left {
    .top {
      font-family: PingFangSC-Medium;
      font-size: 0.2rem;
      color: #7ed5bc;
      letter-spacing: 0;
      text-align: center;
      // line-height: 50px;
    }
  }
  .right {
    .top {
      font-family: PingFangSC-Medium;
      font-size: 0.2rem;
      color: #326699;
      letter-spacing: 0;
      text-align: center;
      // line-height: 50px;
      span {
        font-family: PingFangSC-Medium;
        font-size: 0.18rem;
        color: #326699;
        letter-spacing: 0;
        text-align: center;
        // line-height: 50px;
      }
    }
  }
  .teacher_score_main_top {
    position: relative;
    // margin-top: 0.5rem;
    // padding-top: 0.1rem;
    .top_end {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #f0f0f7;
      padding-bottom: 0.1rem;
    }
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.5rem;
      color: #f9953f;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.5rem;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.15rem;
      margin-top: 0.06rem;
    }
  }
  .teacher_score_main_end {
    position: relative;
    .end_top {
      display: flex;
      align-items: center;
      margin-top: 0.115rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        margin-left: auto;
        // text-align: right;
        // line-height: 15px;
      }
      a {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        margin-left: auto;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
    .end_bottom {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 0.2rem;
    }
  }
  .detial {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    line-height: 0.15rem;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .flex_betwen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .flex_single {
      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.38rem;
        letter-spacing: 0;
        line-height: 0.38rem;
        text-align: center;
      }
      .desc {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.13rem;
        text-align: center;
        margin-top: 0.05rem;
      }
    }
  }
  .score_end {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    line-height: 0.2rem;
    margin-top: 0.15rem;
    // margin-bottom: 0.2rem;
  }
}
.student_train_main {
  // margin-top: 0.3rem;
  padding-bottom: 0.16rem;
  .student_train_single {
    display: flex;
    align-items: flex-end;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    margin-bottom: 0.3rem;
    padding-top: 0.3rem;
    .student_single_left {
      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.38rem;
        letter-spacing: 0;
        line-height: 0.38rem;
      }
      .desc {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.13rem;
        margin-top: 0.05rem;
        text-align: left;
      }
    }
  }
  .middle {
    border-top: 1px solid #f0f0f7;
    border-bottom: 1px solid #f0f0f7;
    margin-bottom: 0;
    padding-bottom: 0.3rem;
  }
  .student_single_right {
    display: flex;
    flex-wrap: wrap;
    width: 1.5rem;
    justify-content: space-between;
    margin-left: auto;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      line-height: 0.13rem;
      margin-bottom: 0.22rem;
      width: 50%;
    }
  }
}
.student_score_main {
  margin-top: 0.2rem;
  width: 90%;
  margin: auto;
  img {
    width: 2.8rem;
    height: 3.41rem;
    display: block;
    margin: 0 auto;
  }
  .student_score_main_desc {
    margin-top: 0.15rem;
    margin-bottom: 0.2rem;
    .score_main_single {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      height: 0.4rem;
      background: rgba(247, 247, 247, 1);
      border-radius: 0.06rem;
      margin-top: 5px;
      .title {
        font-size: 0.11rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 500;
        color: rgba(89, 89, 89, 1);
      }
      .answer {
        margin-left: auto;
        font-size: 0.16rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(0, 150, 193, 1);
      }
    }
  }
}
.student_exam_main {
  img {
    width: 2.8rem;
    height: 3.41rem;
    display: block;
    margin: 0 auto;
  }
}
.student_rotation_main {
  margin-top: 0.3rem;
  img {
    width: 2.8rem;
    height: 3.41rem;
    display: block;
    margin: 0 auto;
  }
  .desc {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    // line-height: 18px;
    margin-top: 0.18rem;
    margin-bottom: 0.17rem;
    text-align: center;
  }
  .rotation_desc {
    margin-bottom: 0.3rem;
    margin-top: 0.18rem;
    .title {
      font-size: 0.12rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
    .desc {
      font-size: 0.1rem;
      margin: 0;
      margin-bottom: 0.1rem;
    }
    .rotation_desc_main {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .rotation_desc_middle {
        border-left: 1px solid #f0f0f7;
        // border-right: 1px solid #f0f0f7;
        padding-left: 0.21rem;
        padding-right: 0.21rem;
      }
      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.3rem;
        color: #7ed5bc;
        letter-spacing: 0;
        text-align: center;
        // line-height: 30px;
      }
      .number2 {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        // color: #212121;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
      .number3 {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
    }
  }
}

.charts {
  margin-top: 0.1rem;
  .radechart {
    .radechart_desc_top {
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      margin-left: 0.1rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 13px;
      }
      .number {
        margin-left: 0.05rem;
        font-family: PingFangSC-Regular;
        font-size: 0.2rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 20px;
      }
    }
    .radechart_desc {
      position: absolute;
      margin-left: 0.1rem;
      width: 1.5rem;

      .radechart_desc_end {
        .radechart_desc_detial {
          display: flex;
          align-items: center;
          margin-bottom: 0.15rem;
          .block {
            width: 0.14rem;
            height: 0.14rem;
            background: #333333;
          }
          .title {
            font-size: 0.13rem;
            margin-left: 0.05rem;
            font-family: PingFangSC-Regular;
            color: #212121;
            letter-spacing: 0;
            width: 0.4rem;
            text-align: left;
          }
          .newnumber {
            font-size: 0.13rem;
            margin-left: 0.05rem;
            font-family: PingFangSC-Regular;
            color: #212121;
            letter-spacing: 0;
          }
          .desc {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #9397ad;
            letter-spacing: 0;
            text-align: center;
            // line-height: 10px;
            margin-left: auto;
            width: 0.5rem;
          }
        }
      }
    }
  }
}
.pointchart_desc {
  display: flex;
  align-items: center;
  margin-left: 0.15rem;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
  .block {
    width: 0.14rem;
    height: 0.14rem;
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 13px;
    margin-left: 0.08rem;
  }
}
// .teacher_radar {

// }
.selfchart {
  width: 2.8rem;
  height: 1.2rem;
  margin: 0 auto;
  border-left: 1px solid #d7dde4;
  border-bottom: 1px solid #d7dde4;
  position: relative;
  .selfchart_main {
    display: flex;
    align-items: flex-end;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    margin-left: 0.15rem;
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.1rem;
      letter-spacing: 0;
      text-align: center;
      position: absolute;
      top: -0.16rem;
      // line-height: 10px;
    }
  }
  .xray {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: left;
    margin-left: 0.1rem;
  }
  .yray {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    position: absolute;
    bottom: 0.05rem;
    right: 0;
  }
  .selfchart_main_single {
    display: flex;
    align-items: flex-end;
    margin-right: 0.27rem;
    .left {
      width: 0.14rem;
      background: #77caf6;
      position: relative;
    }
    .right {
      width: 0.14rem;
      background: #326699;
      position: relative;
    }
    .block {
      margin-top: auto;
    }
  }
}
.selfchart_end {
  display: flex;
  align-items: center;
  // justify-content: space-around;
  margin-right: 0.24rem;
  margin-left: 0.1rem;
  p {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #9397ad;
    letter-spacing: 0;
    margin-right: 0.27rem;
    // line-height: 13px;
  }
}
.pointchart {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    margin-top: 0.1rem;
    letter-spacing: 0;
    // line-height: 15px;
  }
}
.student_train_top {
  width: 3rem;
}
.student_exam_main {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  .student_exam_main_middle {
    height: 3.2rem;
    width: 2.8rem;
    border-left: 1px solid #d7dde4;
    border-bottom: 1px solid #d7dde4;
    margin: 0 auto;
    position: relative;
    .xray {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
      text-align: left;
      margin-left: 0.13rem;
    }
    .single_main {
      display: flex;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      left: 0;
      .single {
        width: 0.9rem;
      }
      .single:nth-child(1) {
        // height: 2.42rem;
        background-image: linear-gradient(
          180deg,
          rgba(38, 54, 148, 0.5) 0%,
          rgba(38, 54, 148, 0) 100%
        );
        border-top: 2px solid #263694;
        position: relative;
        .single_bottom {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #263694;
          letter-spacing: 0;
          // line-height: 16px;
          text-align: left;
          position: absolute;
          bottom: 0.1rem;
          left: 0.07rem;
        }
        .single_percen {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #263694;
          letter-spacing: 0;
          text-align: center;
          // line-height: 16px;
          position: absolute;
          top: -0.2rem;
          // left: 30%;
          width: 0.9rem;
          text-align: center;
        }
      }
      .single:nth-child(2) {
        // height: 2.66rem;
        background-image: linear-gradient(
          180deg,
          rgba(35, 158, 255, 0.5) 0%,
          rgba(35, 158, 255, 0) 100%
        );
        border-top: 2px solid #239eff;
        position: relative;
        .single_bottom {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #239eff;
          letter-spacing: 0;
          // line-height: 16px;
          text-align: left;
          position: absolute;
          bottom: 0.1rem;
          left: 0.07rem;
        }
        .single_percen {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #239eff;
          letter-spacing: 0;
          text-align: center;
          // line-height: 16px;
          position: absolute;
          top: -0.2rem;
          // left: 30%;
          width: 0.9rem;
          text-align: center;
        }
      }
      .single:nth-child(3) {
        // height: 2.51rem;
        background-image: linear-gradient(
          180deg,
          rgba(245, 124, 0, 0.5) 0%,
          rgba(245, 124, 0, 0) 100%
        );
        border-top: 2px solid #f57c00;
        position: relative;
        .single_bottom {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #f57c00;
          letter-spacing: 0;
          // line-height: 16px;
          text-align: left;
          position: absolute;
          bottom: 0.1rem;
          left: 0.07rem;
        }
        .single_percen {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #f57c00;
          letter-spacing: 0;
          text-align: center;
          // line-height: 16px;
          position: absolute;
          top: -0.2rem;
          // left: 30%;
          width: 0.9rem;
          text-align: center;
        }
      }
    }
  }
  .student_exam_main_end {
    display: flex;
    align-items: flex-start;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
      width: 0.9rem;
    }
  }
}
.logout {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .logout_box {
    width: 3rem;
    height: 1.95rem;
    background: #ffffff;
    border-radius: 10px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .logout_box_top {
      border-bottom: 1px solid #f0f0f7;
      position: relative;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        // line-height: 16px;
      }
      img {
        position: absolute;
        top: 0.15rem;
        right: 0.1rem;
        width: 0.12rem;
        height: 0.12rem;
      }
    }
    .logout_box_middle {
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        margin-top: 0.29rem;
        margin-bottom: 0.3rem;
        // line-height: 16px;
      }
      .logout_box_end {
        display: flex;
        align-items: center;
        // margin-left: 0.15rem;
        // margin-right: 0.15rem;
        // justify-content: space-around;
        // padding-bottom: 0.3rem;
        width: 2.6rem;
        margin: 0 auto;
        .logout_box_end_left {
          width: 1.2rem;
          height: 0.4rem;
          background: #ffffff;
          border: 1px solid #277fff;
          border-radius: 20px;
          border-radius: 20px;
          margin-right: 0.1rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.15rem;
            color: #277fff;
            letter-spacing: 0;
            text-align: center;
            line-height: 0.4rem;
            // line-height: 15px;
          }
        }
        .logout_box_end_right {
          width: 1.2rem;
          height: 0.4rem;
          background: #277fff;
          // border: 1px solid #277FFF;
          border-radius: 20px;
          border-radius: 20px;
          margin-left: 0.1rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.15rem;
            color: #ffffff;
            letter-spacing: 0;
            text-align: center;
            line-height: 0.4rem;
            // line-height: 15px;
          }
        }
      }
    }
  }
}
.student_top_box {
  /deep/.swiper-slide {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    height: 100%;
    // line-height: 14px;
  }
  /deep/ .swiper-slide-active {
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #0096c1;
    letter-spacing: 0;
    text-align: center;
    height: 0.35rem;
    // line-height: 16px;
    .swiperborder {
      height: 3px;
      background: #0096c1;
      width: 40px;
      position: absolute;
      bottom: 0;
    }
  }

  .nav_single {
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: center;
      // line-height: 14px;
    }
  }
  .active {
    width: 0.7rem;
    height: 0.3rem;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #474c63;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.3rem;
    }
  }
}
.selectcomp {
  width: 0.5rem;
  height: 0.2rem;
  background: #f0f0f7;
  position: absolute;
  z-index: 1;
  left: 0.2rem;
  .selectcomptitle {
    font-size: 0.1rem;
    text-align: center;
    line-height: 0.2rem;
  }
  .selectsingle {
    background: #f0f0f7;
    .singletitle {
      font-size: 0.1rem;
    }
  }
}
.selectcomp1 {
  width: 0.5rem;
  height: 0.2rem;
  background: #f0f0f7;
  position: absolute;
  z-index: 1;
  top: 0.12rem;
  left: 1rem;
  .selectcomptitle {
    font-size: 0.1rem !important;
    text-align: center !important;
    line-height: 0.2rem;
    margin: 0 !important;
  }
  .selectsingle {
    background: #f0f0f7;
    .singletitle {
      font-size: 0.1rem !important;
      margin: 0 !important;
      text-align: center !important;
    }
  }
}
.nexttop {
  margin-top: 10px;
  background: #fff;
}
.banner-box {
  height: 90%;
  background: #f2f2f3;
}

.mint-navbar {
  width: 2.25rem;
  // margin: 0 auto;
  padding: 0px;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  .is-selected {
    border-radius: 10px 10px 0px 0px;
    background: #f2f2f3;
  }
  .mint-tab-item {
    width: 0.5rem;
  }
}
.blockbg {
  height: 0.5rem;
  width: 1.1rem;
  background: #f7f7f7;
  border-radius: 0.06rem;
  padding-top: 0.15rem;
  line-height: 0.2rem;
  margin-right: 0.2rem;
  display: inline-block;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  font-size: 11px;
  margin-top: 0.1rem;
  .number {
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
  }
}
.blockbg2 {
  height: 0.5rem;
  width: 1.1rem;
  background: #f7f7f7;
  border-radius: 0.06rem;
  padding-top: 0.15rem;
  line-height: 0.2rem;
  font-size: 11px;
  display: inline-block;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  margin-top: 0.1rem;
  .number {
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
  }
}
.mint-tabbar {
  top: 0.4rem;
  height: 0.4rem;
}
.teachernum {
  height: 0.6rem;
  width: 2.38rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.1rem 0.1rem 0rem 0rem;
  padding-left: 0.22rem;
  margin: 0 auto;
  text-align: left;
  .title {
    font-size: 0.15rem;
    line-height: 0.7rem;
    color: rgba(89, 89, 89, 1);
    font-weight: 500;
  }
  .number {
    color: #0096c1;
    font-size: 0.2rem;
  }
}
.teacherrs {
  height: 0.6rem;
  width: 2.38rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.1rem 0.1rem 0rem 0rem;
  padding-left: 0.22rem;
  margin: 0 auto;
  text-align: left;
  .title {
    padding-top: 0.1rem;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
  }
  .number {
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
    font-size: 20px;
  }
}
.teachernumjx {
  height: 0.6rem;
  width: 2.38rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.1rem 0.1rem 0rem 0rem;
  padding-left: 0.22rem;
  margin: 0 auto;
  text-align: left;
  .title {
    line-height: 0.3rem;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
  }
  .number {
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
  }
}
.teachernum2 {
  height: 1rem;
  width: 2.38rem;
  background: rgba(247, 247, 247, 1);
  padding-left: 0.22rem;
  margin: 0 auto;
  text-align: left;
  .title {
    font-size: 0.11rem;
    line-height: 0.3rem;
    color: rgba(89, 89, 89, 1);
  }
  .number {
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
  }

  .bfb {
    font-size: 0.11rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 0.16rem;
  }
  .bfbnum {
    font-size: 0.15rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
    line-height: 0.17rem;
  }
}
.teacherlist ul li {
  width: 1.28rem;
  height: 0.6rem;
  background: rgba(247, 247, 247, 1);
  display: inline-block;
  margin: 0.02rem;
  .number {
    font-size: 0.2rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(89, 89, 89, 1);
    line-height: 0.24rem;
  }
  .title {
    font-size: 0.11rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 0.16rem;
  }
}
.teacherlistplan ul li {
  width: 1.28rem;
  height: 1.2rem;
  background: rgba(247, 247, 247, 1);
  display: inline-block;
  margin: 0.02rem;
  .number {
    font-size: 0.2rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(89, 89, 89, 1);
    line-height: 0.6rem;
  }
  .title {
    font-size: 0.11rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 0.16rem;
  }
}
.descs {
  text-align: left;
  font-size: 0.11rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(140, 140, 140, 1);
  line-height: 0.16rem;
  margin-left: 0.2rem;
}

.bannerbox2 {
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  .bannerleft {
    width: 45%;
    text-align: left;
    height: 1.56rem;
    background: rgba(247, 247, 247, 1);
    border-radius: 0.06rem;
    padding: 0.1rem;
    font-size: 0.12rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    .bannertext {
      text-align: center;
      .number {
        font-size: 0.4rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(0, 150, 193, 1);
        line-height: 1rem;
      }
      .title {
        font-size: 0.11rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(89, 89, 89, 1);
      }
    }
  }
  .bannerright {
    width: 50%;
    text-align: left;
    ul li {
      height: 0.4rem;
      margin-left: 10px;
      background: rgba(247, 247, 247, 1);
      border-radius: 0.06rem;
      font-size: 0.11rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(89, 89, 89, 1);
      padding-left: 10px;
      margin-top: 0.02rem;
      span {
        font-size: 0.2rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(89, 89, 89, 1);
      }
    }
    ul li:nth-child(1) {
      font-size: 0.12rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      span {
        font-size: 0.2rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(0, 150, 193, 1);
      }
    }
  }
}
.khbanner {
  text-align: left;
  width: 80%;
  margin: auto;
  margin-top: 0.37rem;
}
.listtype {
  font-size: 0.12rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.khbox {
  margin-top: 0.17rem;
}
.khbox ul {
  display: flex;
}
.khbox ul li {
  width: 0.8rem;
  height: 0.5rem;
  padding: 10px;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.06rem;
  margin-right: 0.05rem;
  .title {
    font-size: 0.11rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
  }

  .number {
    font-size: 0.2rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(0, 150, 193, 1);
  }
}
.khbox ul li:nth-child(3) {
  .number {
    color: rgba(89, 89, 89, 1);
  }
}
.lzbanner {
  width: 80%;
  margin: auto;
}
.lztop {
  height: 1.8rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.06rem;
  padding: 10px;
  .title {
    text-align: left;
  }
}
.lzbox {
  display: flex;
  margin-top: 0.34rem;
  .lzleft {
    width: 50%;
    .number {
      font-size: 0.2rem;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(0, 150, 193, 1);
    }
    .title {
      text-align: center;
      font-size: 0.11rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(89, 89, 89, 1);
    }
  }
  .lzright {
    width: 50%;
    .number {
      color: rgba(89, 89, 89, 1);
      font-size: 0.2rem;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
    }
    .title {
      text-align: center;
      font-size: 0.11rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(89, 89, 89, 1);
    }
  }
}
.lzbottom {
  margin-top: 0.15rem;
  width: 1.09rem;
  height: 1.2rem;
  padding: 10px;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.06rem;
  .title {
    text-align: left;
  }
  .lzbox2 {
    margin-top: 0.34rem;
    .number {
      font-size: 0.2rem;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(255, 74, 74, 1);
      line-height: 0.24rem;
    }
    .title {
      text-align: center;
      font-size: 0.11rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(89, 89, 89, 1);
    }
  }
}
.jnbanner {
  width: 3.35rem;
  height: 5.12rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.06rem;
  margin: auto;
}
.jnzx {
  width: 2.85rem;
  margin: auto;
}
.jntop {
  padding: 20px;
  height: 0.86rem;
  background: rgba(0, 150, 193, 1);
  border-radius: 0.06rem;
  margin: auto;
  .jntoptext {
    display: flex;
  }
  .text {
    width: 50%;
    font-size: 0.12rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.17rem;
  }
  .number {
    width: 50%;
    font-size: 0.24rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.32rem;
  }
}
.jnbottom ul {
  margin-top: 0.06rem;
}
.jnbottom ul li {
  width: 1rem;
  height: 0.6rem;
  padding: 20px;
  margin-top: 0.06rem;
  display: inline-block;
  margin-right: 0.06rem;
  background: rgba(247, 247, 247, 1);
  border-radius: 0.06rem;
  .title {
    font-size: 0.14rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 0.16rem;
  }
  .number {
    font-size: 0.2rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: rgba(89, 89, 89, 1);
    line-height: 0.24rem;
  }
}
</style>
