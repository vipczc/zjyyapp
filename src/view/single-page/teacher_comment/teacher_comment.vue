<template>
  <div class="content">
    <Header-bar :message="'师资评价'"></Header-bar>
    <!-- tab-container -->
    <mt-navbar v-model="selected">
      <mt-tab-item :id="index" v-for="(item,index) in singledata" :key="index">{{item.typename}}</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" v-for="(item,index) in singledata" :key="index">
      <mt-tab-container-item :id="index">
        <div class="tabbar_right">
          <span>选择科室：</span>
          <p @click="handleShowRotation()">{{selectName}}</p>
        </div>
        <div class="comment-box">
          <div class="comments_top">
            <appraise v-if="showchildren" v-bind:singledata="singledata" style="margin-top:0.2rem"></appraise>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="comment-box">
       <div class="comment_top">
              <div class="comment_top_left" style="margin-left:0.2rem">
                <p>各专业基地师资评价</p>
              </div>
            </div>
      <div class="comments_end">
        <swiper
          ref="mySwiper4"
          style="width:3.5rem;height:0.5rem;"
          class="student_top_box swiper-no-swiping"
          :options="swiperOption4"
        >
          <swiper-slide v-for="(item, index) in swipeTopData" :key="index">
            <p class="title">{{item.majorname}}</p>
            <p class="number">好评度{{item.hpl}}</p>
          </swiper-slide>
        </swiper>
      </div>
      <swiper ref="mySwiper" class="student_main_box" :options="swiperOption">
        <swiper-slide v-for="(item, index) in swipeTopData" :key="index">
          <div class="comment">
            <!-- <div class="comment_top">
              <div class="comment_top_left">
                <p>师资评价</p>
              </div>
            </div> -->
            <radar
              v-if="flag"
              ref="radars"
              :maintitle="item.majorname + '基地对老师评价雷达图'"
              :barnumber="rainbardata"
            ></radar>
            <div v-else style="width:100%;height:2rem;">
              <p style="text-align: center; line-height: 2rem; color: #dddddd;">暂无数据</p>
            </div>
            <div class="teacher_radar_detial">
              <div class="rader_detial_left">
                <div class="rader_detial_left_top">
                  <p class="title">评价得分率</p>
                  <!-- <p class="desc">(满分100)</p> -->
                  <p class="number">{{(commentdata.pjpjf)*100}}%</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价最低分</p>
                  <p class="number">{{commentdata.zdf}}</p>
                </div>
              </div>
              <div class="rader_detial_middle"></div>
              <div class="rader_detial_right">
                <div class="rader_detial_left_top">
                  <p class="title">评价总次数</p>
                  <p class="number">{{commentdata.pjzs}}</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价表提交率</p>
                  <p class="number">{{commentdata.tjl}}</p>
                </div>
              </div>
            </div>
            <!--                                <div class="comment_table">-->
            <!--                                    <p class="title">-->
            <!--                                        {{item.majorname}}基地老师评价表-->
            <!--                                        <span>（最近一次）</span>-->
            <!--                                    </p>-->
            <!--                                    <div :style="openmore == true ?'height:auto':'height:2rem'" class="table">-->
            <!--                                        <div class="table_top">-->
            <!--                                            <p>排名</p>-->
            <!--                                            <p>分数</p>-->
            <!--                                            <p>姓名</p>-->
            <!--                                            <p>科室</p>-->
            <!--                                            <p>评价人数</p>-->
            <!--                                        </div>-->
            <!--                                        <div-->
            <!--                                                v-for="(item, index) in teacherdata"-->
            <!--                                                :key="index+'e'"-->
            <!--                                                @click="handleOpenWind(item.personid,item.officeid,item.personname)"-->
            <!--                                                class="table_single"-->
            <!--                                        >-->
            <!--                                            <p>{{index + 1}}</p>-->
            <!--                                            <p style="color: #277FFF;">{{item.pjf}}</p>-->
            <!--                                            <p>{{item.personname}}</p>-->
            <!--                                            <p>{{item.officename}}</p>-->
            <!--                                            <p>{{item.pjrs}}</p>-->
            <!--                                        </div>-->
            <!--                                    </div>-->
            <!--                                    <p v-show="!openmore" @click="openmore = true" class="showmore">展开更多…</p>-->
            <!--                                </div>-->
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div v-show="openWind" class="wind">
      <div class="open_window">
        <div class="win_top">
          <p class="win_title">{{teachername}}老师评价详情</p>
          <img @click="hideWind()" src="../../../assets/images/close.png" alt />
        </div>
        <radar v-if="winflag" ref="winradars" :barnumber="winrainbardata"></radar>
        <div v-else style="width:100%;height:2rem;">
          <p style="text-align: center; line-height: 2rem; color: #dddddd;">暂无数据</p>
        </div>
        <!-- <radar v-if="flag" ref="radars" :maintitle="item.majorname + '基地对老师评价雷达图'" :barnumber="rainbardata"></radar> -->
        <div class="teacher_radar_detial">
          <div class="rader_detial_left">
            <div class="rader_detial_left_top">
              <p class="title">评价得分率</p>
              <!-- <p class="desc">(满分100)</p> -->
              <p class="number">{{wincommentdata.pjpjf}}</p>
            </div>
            <div class="rader_detial_left_end">
              <p class="title">评价最低分</p>
              <p class="number">{{wincommentdata.zdf}}</p>
            </div>
          </div>
          <div class="rader_detial_middle"></div>
          <div class="rader_detial_right">
            <div class="rader_detial_left_top">
              <p class="title">评价总次数</p>
              <p class="number">{{wincommentdata.pjzs}}</p>
            </div>
            <div class="rader_detial_left_end">
              <p class="title">评价表提交率</p>
              <p class="number">{{wincommentdata.tjl}}</p>
            </div>
          </div>
        </div>

        <div class="win_end">
          <p class="win_title">评论项</p>
          <div class="win_end_block">
            <div v-for="(item, index) in winteacherdata" :key="index" class="win_end_block_single">
              <div class="top">
                <div class="block"></div>
                <p>{{item.days}}-{{item.officename}}</p>
              </div>
              <div class="middle">
                <p>{{item.wordsvalue}}</p>
              </div>
            </div>
            <!-- <div class="win_end_block_single">
                                          <div class="top">
                                            <div class="block"></div>
                                            <p>09月20日-内科</p>
                                          </div>
                                          <div class="middle">
                                            <p>王老师带教过程中认真负责，有耐心王老师带教过程中认真负责，有耐心过程中认真负责，有耐心过程中认真负责，有耐心</p>
                                          </div>
                                        </div>
                                        <div class="win_end_block_single">
                                          <div class="top">
                                            <div class="block"></div>
                                            <p>09月20日-内科</p>
                                          </div>
                                          <div class="middle">
                                            <p>王老师带教过程中认真负责，有耐心王老师带教过程中认真负责，有耐心过程中认真负责，有耐心过程中认真负责，有耐心</p>
                                          </div>
                                        </div>
                                        <div class="win_end_block_single">
                                          <div class="top">
                                            <div class="block"></div>
                                            <p>09月20日-内科</p>
                                          </div>
                                          <div class="middle">
                                            <p>王老师带教过程中认真负责，有耐心</p>
                                          </div>
            </div>-->
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div @click="handleHideRotation()" v-show="showRotation" class="rotation_wind">
      <div class="rotation_wind_main">
        <p
          @click="handleSelectName(index,item,item.officelist)"
          v-for="(item, index) in selectdata"
          :style="selectId == index?'color: #277fff':'color: #212121'"
          :key="index"
        >{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import HeaderBar from "@/components/mainHeader";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import radar from "../../../components/mecharts/radar.vue";
import appraise from "../../../components/appraise/appraise.vue";
import { Indicator, Navbar, TabItem } from "mint-ui";
import {
  queryMajorFavorablerate,
  queryMajorTeacherevaluatedata,
  queryMajorTeacherevaluatedataitem,
  getoffice,
  queryTeachereValuationitem
} from "../../../api/teachercomment";
import moment from "moment";

export default {
  components: {
    HeaderBar,
    radar,
    swiper,
    swiperSlide,
    appraise
  },
  data() {
    const self = this;
    return {
      selected: 0,
      showRotation: false,
      openmore: false,
      openWind: false,
      swipeTopData: "",
      selectId: -1,
      firstid: 0,
      commentdata: "",
      teacherdata: "",
      flag: true,
      winflag: false,
      endName: "麻醉科",
      windata: "",
      wincommentdata: "",
      winteacherdata: "",
      teachername: "王老师",
      selectName: "教学部",
      datas: 0,
      singledata: [],
      showchildren: false,
      winrainbardata: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      rainbardata: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      closeid: 99,
      swiperOption4: {
        slidesPerView: 3,
        spaceBetween: 3,
        loop: true,
        centeredSlides: true,
        noSwiping: true,
        speed: 500,
        on: {
          transitionStart: function(event) {
            self.openmore = false;
            queryMajorTeacherevaluatedata(
              self.swipeTopData[this.activeIndex].majorsubjectid,
              self.moment
            ).then(res => {
              self.radardata1 = JSON.parse(res).majordimensionevaluatelist;
              var arrs = [];
              for (let i = 0; i < self.radardata1.length; i++) {
                arrs.push({
                  name:
                    self.radardata1[i].typename +
                    "\n" +
                    self.radardata1[i].averagescore,
                  value: parseFloat(self.radardata1[i].averagescore)
                });
              }
              self.commentdata = JSON.parse(res).majorevaluateoverview;
              self.teacherdata = JSON.parse(res).teacherevaluatelatelydata;
              if (
                arrs[0].value == 0 &&
                arrs[1].value == 0 &&
                arrs[2].value == 0 &&
                arrs[3].value == 0 &&
                arrs[4].value == 0 &&
                arrs[5].value == 0
              ) {
                self.flag = false;
              } else {
                self.flag = true;
                self.rainbardata = arrs;
                setTimeout(() => {
                  self.$refs.radars[this.activeIndex].drawLine();
                }, 1000);
              }
              Indicator.close();
            });
          }
        }
      },
      swiperOption: {
        centeredSlides: true,
        loop: false,
        speed: 500,
        longSwipes: false,
        on: {
          transitionEnd: function(event) {
            if (this.activeIndex == self.closeid) {
              Indicator.close();
            }
          },
          transitionStart: function(event) {
            self.$refs.mySwiper4.swiper.slideToLoop(
              this.activeIndex,
              500,
              false
            );
            self.closeid = this.activeIndex;
            Indicator.open("加载中...");
          }
        }
      },
      radardata1: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      moment: 12,

      selectdata: [
        {
          name: "内科基地"
        },
        {
          name: "外科基地"
        },
        {
          name: "儿科基地"
        },
        {
          name: "全科基地"
        },
        {
          name: "中医基地"
        },
        {
          name: "麻醉科基地"
        },
        {
          name: "眼科基地"
        },
        {
          name: "皮肤科基地"
        },
        {
          name: "放射科基地"
        }
      ]
    };
  },
  methods: {
    handleShowRotation() {
      this.noScroll();
      this.showRotation = true;
    },
    handleHideRotation() {
      this.showRotation = false;
      this.canScroll();
    },
    handleSelectName(index, name, datas) {
      Indicator.open("加载中...");
      this.selectId = index;
      this.selectName = name.name;
      this.datas = name.officeid;
      let add = [];
      add.push(this.datas);
      queryTeachereValuationitem(2, add, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).teacherevaluationitem;
        this.showtab = true;
        Indicator.close();
      });
    },
    handleClickSelect() {
      this.showModal = true;
    },
    handleOpenWind(ids, id, name) {
      Indicator.open("加载中...");
      (this.openWind = true), (this.teachername = name), this.noScroll();
      queryMajorTeacherevaluatedataitem(ids, id, this.moment).then(res => {
        // console.log(this.moment);
        this.windata = JSON.parse(res);
        this.wincommentdata = JSON.parse(res).majorevaluateoverview;
        this.winteacherdata = JSON.parse(res).teacherevaluatewords;
        var arrsd = [];
        for (
          let i = 0;
          i < JSON.parse(res).majordimensionevaluatelist.length;
          i++
        ) {
          arrsd.push({
            name:
              JSON.parse(res).majordimensionevaluatelist[i].typename +
              "\n" +
              JSON.parse(res).majordimensionevaluatelist[i].averagescore,
            value: parseFloat(
              JSON.parse(res).majordimensionevaluatelist[i].averagescore
            )
          });
        }
        if (
          arrsd[0].value == 0 &&
          arrsd[1].value == 0 &&
          arrsd[2].value == 0 &&
          arrsd[3].value == 0 &&
          arrsd[4].value == 0 &&
          arrsd[5].value == 0
        ) {
          this.winflag = false;
        } else {
          this.winrainbardata = arrsd;
          this.winflag = true;
          setTimeout(() => {
            this.$refs.winradars.drawLine();
          }, 1000);
        }
        Indicator.close();
      });
    },
    hideWind() {
      (this.openWind = false), this.canScroll();
    }
  },
  mounted() {
    Indicator.open("加载中...");
    queryMajorFavorablerate(this.moment).then(res => {
      this.swipeTopData = JSON.parse(res).major;
      // console.log(JSON.parse(res));
      this.firstid = JSON.parse(res).major[0].majorsubjectid;
    });
    queryMajorTeacherevaluatedata(this.firstid).then(res => {
      // console.log(JSON.parse(res));
      this.radardata1 = JSON.parse(res).majordimensionevaluatelist;
      this.commentdata = JSON.parse(res).majorevaluateoverview;
      // this.teacherdata = JSON.parse(res).majorevaluateoverview
      this.flag = true;
    });
    getoffice().then(res => {
      // console.log(JSON.parse(res));
      this.selectdata = JSON.parse(res).officelist;
      let ads = [];
      for (let i = 0; i < JSON.parse(res).officelist[0].length; i++) {
        ads.push(JSON.parse(res).officelist[i].name);
      }
      queryTeachereValuationitem(1, 1, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).teacherevaluationitem;
        this.showchildren = true;
        this.showtab = true;
        Indicator.close();
      });
    });
    Indicator.close();
  },
  created() {
    if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 12;
      } else {
        this.moment = moment().month();
      }
    } else {
      this.moment = moment().month() + 1;
    }
  }
};
</script>

<style scoped lang="less">
.tabbar_right {
  display: flex;
  align-items: center;
  margin-left: auto;
  position: absolute;
  z-index: 2;
  right: 0.2rem;

  img {
    width: 0.16rem;
    height: 0.16rem;
    margin-left: 0.05rem;
  }
}

.rotation_wind {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);

  .rotation_wind_main {
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 0.29rem;
    padding-bottom: 0.11rem;
    height: 3rem;
    overflow: scroll;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #212121;
      text-align: center;
      line-height: 0.17rem;
      margin-bottom: 0.18rem;
    }

    .active {
      color: #277fff;
    }
  }
}

.comments_top {
  // position: absolute;
  width: 3.55rem;
  padding: 0.13rem;
  padding-top: 0.2rem;
  background: #ffffff;
  /*box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.08);*/
  // border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 0.05rem;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

.comments_end {
  background: #ffffff;
  position: relative;
  width: 3.55rem;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 10px;
}

.content {
  padding-bottom: 0.15rem;
}

// img {
//   width: 90%;
//   display: block;
//   margin: 0 auto;
//   padding-bottom: 0.2rem;
// }

.top-img {
  width: 3.55rem;
  padding: 0.13rem;
  padding-top: 0.2rem;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  // margin-top: 0.49rem;
  margin-bottom: 0.05rem;
  position: relative;
}

.navbar {
  font-size: 0.15rem;
  color: #9397ad;
}

.mint-navbar {
  width: 3.55rem;
  text-align: center;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  position: relative;

  /*.mint-tab-item:nth-child(1) {*/
  /*    width: 1.1rem;*/
  /*}*/

  /*.mint-tab-item:nth-child(2) {*/
  /*    width: 1.6rem;*/
  /*}*/

  /*.mint-tab-item:nth-child(3) {*/
  /*    width: 1rem;*/
  /*    overflow: hidden;*/
  /*}*/
}

.comment {
  width: 3.55rem;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  padding-bottom: 0.2rem;
  // span {
  //   color: #474c63;
  //   // padding-top: 0.15rem;
  //   // padding-bottom: 0.2rem;
  //   // padding-right: 0.18rem;
  //   display: block;
  //   text-align: right;
  //   margin-left: auto;
  // }
}

/deep/ .mint-tab-item {
  height: auto !important;
}

/deep/ .mint-tab-item-label {
  color: #9397ad;
  font-size: 0.13rem;
  height: 0.25rem;
  line-height: 0.24rem;
  position: relative;

  p {
    font-size: 0.1rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.12rem;
    opacity: 0.5;
  }
}

/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.15rem;
  color: #212121;

  p {
    color: #212121;
    opacity: 1;
    font-size: 0.12rem;
  }
}

/deep/ .mint-navbar .mint-tab-item {
  /*width: 1.3rem;*/
  padding: 0.06rem;
  height: 0.48rem;
  background: transparent;
  margin-bottom: 0.01rem;
  // flex: initial;
}

/deep/ .mint-tab-container {
  overflow: inherit;
}

// .comment-box {
//   p{
//         position: absolute;
//             top: 0.16rem;
//         display: block;
//         /* margin: 0 auto; */
//         text-align: center;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         margin: auto;
//         font-size: 0.1rem;
//   }
// }
.comment_top {
  display: flex;
  align-items: center;
  padding-top: 0.15rem;
  padding-bottom: 0.2rem;
  padding-right: 0.18rem;

  .comment_top_left {
    border-left: 3px solid #277fff;
    margin-left: 0.1rem;
    padding-left: 0.05rem;
  }

  p {
    font-family: PingFangSC-Medium;
    font-size: 0.16rem;
    color: #474c63;
    letter-spacing: 0;
    // line-height: 18px;
  }
}

.teacher_radar_detial {
  display: flex;
  align-items: center;
  margin-bottom: 0.15rem;

  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #212121;
    letter-spacing: 0;
  }

  .desc {
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #9397ad;
    letter-spacing: 0;
  }

  .number {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #2187ff;
    letter-spacing: 0;
    margin-left: auto;
  }

  .rader_detial_left {
    margin: 0 auto;
    margin-left: 0.15rem;
  }

  .rader_detial_right {
    margin: 0 auto;
    margin-left: 0.15rem;
  }

  .rader_detial_left_top {
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;
  }

  .rader_detial_left_end {
    display: flex;
    align-items: center;
    margin-top: 0.1rem;
  }

  .rader_detial_middle {
    width: 1px;
    height: 0.4rem;
    background: #dddddd;
  }
}

.comment_table {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    text-align: center;
    margin-top: 0.3rem;

    span {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
    }
  }

  .table {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    overflow: hidden;

    .table_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      border-bottom: 1px solid #f0f0f7;
      padding-bottom: 0.07rem;

      p {
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        width: 0.52rem;
        text-align: center;
        // line-height: 15px;
      }
    }

    .table_single {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f7;
      margin-top: 0.07rem;
      padding-bottom: 0.07rem;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        width: 0.52rem;
        text-align: center;
        // line-height: 15px;
      }
    }
  }

  .showmore {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    // margin-top: 0.08rem;
    // line-height: 14px;
    padding-top: 0.3rem;
  }
}

.comment_bar {
  .comment_bar_top {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    text-align: center;
  }

  .comment_bar_middle {
    width: 2.8rem;
    height: 1.2rem;
    margin: 0 auto;
    border-left: 1px solid #d7dde4;
    border-bottom: 1px solid #d7dde4;
    position: relative;

    .bar_singgle {
      width: 0.14rem;
      height: 0.88rem;
      position: absolute;
      bottom: 0;
      left: 0.12rem;
      background: #f9953f;

      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.1rem;
        color: #f9953f;
        letter-spacing: 0;
        text-align: center;
        position: absolute;
        top: -0.16rem;
        left: -0.03rem;
        // line-height: 10px;
      }
    }

    .bar_center {
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.11rem;
        color: #9397ad;
        letter-spacing: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 0.8rem;
        height: 0.11rem;
      }
    }
  }

  .comment_bar_end {
    width: 2.8rem;
    margin: 0 auto;
    margin-top: 0.1rem;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // text-align: center;
      // line-height: 13px;
    }
  }
}

.student_top_box {
  /deep/ .swiper-slide {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    // line-height: 14px;
  }

  /deep/ .swiper-slide-active {
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #474c63;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 3px solid #277fff;
    height: 0.45rem;

    .title {
      font-size: 0.18rem;
    }

    .number {
      font-size: 0.12rem;
    }

    // line-height: 16px;
  }

  .nav_single {
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: center;
      // line-height: 14px;
    }
  }

  .active {
    width: 0.7rem;
    height: 0.3rem;
    border-bottom: 3px solid #277fff;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #474c63;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.3rem;
    }
  }

  .title {
    font-size: 0.15rem;
  }

  .number {
    font-size: 0.12rem;
  }
}

.wind {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .teacher_radar_detial {
    margin-left: 0.15rem;
    margin-right: 0.15rem;
    border-bottom: 1px solid #f0f0f7;
    padding-bottom: 0.2rem;
  }

  .open_window {
    width: 3.55rem;
    height: 6rem;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #ffffff;
    border-radius: 10px;
    border-radius: 10px;
    overflow: auto;

    .win_top {
      display: flex;
      align-items: center;
      // margin-left: 0.15rem;
      margin-top: 0.2rem;
      margin-right: 0.15rem;
      // margin-bottom: 0.2rem;
      img {
        width: 0.12rem;
        height: 0.12rem;
        margin-bottom: 0.2rem;
        margin-left: auto;
        padding: 0;
      }
    }

    .win_title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      border-left: 3px solid #277fff;
      padding-left: 0.05rem;
      margin-left: 0.15rem;
      margin-bottom: 0.2rem;
      // text-align: center;
      // line-height: 15px;
    }

    .win_end_block {
      margin-left: 0.16rem;
      border-left: 1px solid #deedff;
      padding-left: 0.12rem;

      .win_end_block_single {
        .top {
          display: flex;
          align-items: center;

          .block {
            width: 0.05rem;
            height: 0.05rem;
            border-radius: 50%;
            background: #277fff;
            border: 1px solid #277fff;
            margin-right: 0.1rem;
            position: absolute;
            left: 0.13rem;
          }

          p {
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #212121;
            letter-spacing: 0;
            // line-height: 15px;
          }
        }

        .middle {
          width: 3.11rem;

          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #474c63;
            letter-spacing: 0;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
            // opacity: 0.3;
            background: rgba(240, 240, 247, 0.3);
            border-radius: 5px;
            border-radius: 5px;
            padding-left: 0.08rem;
            padding-right: 0.08rem;
            // text-align: center;
            // line-height: 15px;
          }
        }
      }
    }
  }
}
</style>