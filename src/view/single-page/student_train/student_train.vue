<template>
  <div>
    <header-main :message="'培训'"></header-main>
    <div class="studenttrain">
      <div class="student_train">
        <div class="student_train_top">
          <!-- <div class="tabbar"> -->
          <!-- <p :class="this.tabIndex == 2 ? 'active':''" >住培</p> -->
          <!-- <p :class="this.tabIndex == 2 ? 'active':''" @click="changeTab(2)">住培</p> -->
          <!-- <p :class="this.tabIndex == 3 ? 'active':''" >专培</p>
            <p :class="this.tabIndex == 4 ? 'active':''" >本科</p>
          <p :class="this.tabIndex == 5 ? 'active':''" >研究生</p>-->
          <!-- </div> -->
          <!-- <div class="tabbar_right">
            <p>筛选</p>
            <img
              @click="handleShowRotation()"
              src="../../../assets/images/todaywork/select.png"
              alt
            />
          </div>-->
        </div>
        <!-- <div style="width:100%;height:4rem">
          <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
        </div>-->
        <div class="student_train_main" v-for="(item,index) in singledata" :key="index">
          <div class="student_train_main_single">
            <p class="top">{{item.name}}</p>
            <!-- <div class="middle">
              <div class="left">
                <p style="color: #F9953F;" class="number">{{singledata[0].ljrs}}</p>
                <p class="desc">培训累计人数</p>
              </div>
              <div class="center">
                <p style="color: #326699;" class="number">{{singledata[0].rjpxcs}}</p>
                <p class="desc">人均培训次数</p>
                <p class="desc">（总人数<span>{{singledata[0].zrs}}</span>人）</p>
              </div>
              <div class="right">
                <div class="right_top">
                  <p class="right_number">{{singledata[0].bypxcs}}</p>
                   <p class="right_percent">%</p>
                </div>
                <p  class="desc">本月共计培训场次</p>
              </div>
            </div>-->
            <!-- <piebar :barnumber="bardata"></piebar> -->
            <!-- <trainbar :bardata="singledata[0].studenttraintypedata"></trainbar> -->
            <div class="end">
              <div class="end_end">
                <div class="end_th">
                  <p>培训类型</p>
                  <p>发布次数</p>
                  <p>参与人数</p>
                </div>
                <div class="endtable">
                  <div
                    v-for="(studentsweb, index) in item.traintypesumlist"
                    :key="index"
                    class="end_td"
                  >
                    <p>{{studentsweb.traintypename}}</p>
                    <p>{{studentsweb.trainsum}}</p>
                    <p>{{studentsweb.studentsum}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="handleHideRotation()" v-show="showRotation" class="rotation_wind">
      <div class="rotation_wind_main">
        <p
          :style="selectId == -1?'color: #277fff':'color: #212121'"
          @click="handleSelectName(-1,'全部','')"
        >全部</p>
        <p
          @click="handleSelectName(index,item.majorname,item.officelist)"
          v-for="(item, index) in selectdata"
          :style="selectId == index?'color: #277fff':'color: #212121'"
          :key="index"
        >{{item.majorname}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
// import piebar from "../../../components/mecharts/piebar.vue";
import trainbar from "../../../components/mecharts/trainbar.vue";
import {
  queryStudenttraindata,
  queryMajormanageoffice
} from "../../../api/studentcomment";
import { Indicator } from "mint-ui";
import moment from "moment";
export default {
  data() {
    return {
      showRotation: false,
      tabIndex: 2,
      selectId: -1,
      selectName: "内科基地",
      bardata: [
        {
          color: "#395275",
          title: "小讲堂",
          percent: "25%"
        },
        {
          color: "#5E7AB8",
          title: "教学查房",
          percent: "37%"
        },
        {
          color: "#C9D5EC",
          title: "疑难病症",
          percent: "37%"
        },
        {
          color: "#7ED5BC",
          title: "阅片会",
          percent: "37%"
        }
      ],
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
      ],
      singledata: [
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        },
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        },
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        }
      ],
      showtab: false,
      moment: 0
    };
  },
  methods: {
    // changeTab(num){
    //   this.tabIndex = num
    //   queryStudenttraindata(num,'',this.moment).then(res => {
    //     // console.log(JSON.parse(res));
    //     this.singledata = JSON.parse(res).studenttraindata
    //     this.showtab = true
    //   })
    // },

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
      this.selectName = name;
      let add = [];
      for (let i = 0; i < datas.length; i++) {
        add.push(datas[i].officeid);
      }
      queryStudenttraindata(2, add, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).studenttraindata;
        this.showtab = true;
        Indicator.close();
      });
    }
  },
  mounted() {
    Indicator.open("加载中...");
    queryMajormanageoffice().then(res => {
      // console.log(JSON.parse(res));
      this.selectdata = JSON.parse(res).majorlist;
      let ads = [];
      for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
        ads.push(JSON.parse(res).majorlist[0].officelist[i].officeid);
      }
      queryStudenttraindata(2, "", this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).officetrainsumlist;
        // this.showtab = true
        Indicator.close();
      });
    });
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
  },
  components: {
    "header-main": mainHeader,
    // piebar
    trainbar
  }
};
</script>

<style lang="less" scoped>
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
    width: 3.25rem;
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
        width: 2rem;
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
        width: 1.61rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  // height: 4rem;
}
.studenttrain {
  position: absolute;
  width: 100%;
  /deep/ .pie_single {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .student_train {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
    padding-top: 0.01rem;
    .student_train_top {
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #f0f0f7;
      .tabbar {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 2.6rem;
        height: 0.3rem;
        border: 1px solid #dddddd;
        p {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          width: 100%;
          height: 100%;
          line-height: 0.3rem;
        }
        .active {
          background: #277fff;
          color: #ffffff;
        }
      }
      .tabbar_right {
        display: flex;
        align-items: center;
        margin-left: auto;
        img {
          width: 0.16rem;
          height: 0.16rem;
          margin-left: 0.05rem;
        }
      }
    }
    .student_train_main {
      // padding-left: 0.1rem;
      // margin-right: 0.1rem;
      // margin-top: 0.21rem;
      // display: none;
      .student_train_main_single {
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #f0f0f7;
        .top {
          font-family: PingFangSC-Regular;
          font-size: 0.15rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 15px;
          border-left: 3px solid #277fff;
          margin-left: 0.1rem;
          padding-left: 0.05rem;
          margin-bottom: 0.2rem;
          margin-top: 0.2rem;
        }
        .middle {
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          margin-bottom: 0.32rem;
          .right_top {
            // display: flex;
            // align-items: flex-end;
            // margin: 0 auto;
            // margin-bottom: 0.1rem;
            // margin-top: 0.1rem;
            // width: 60px;

            .right_number {
              font-family: PingFangSC-Medium;
              font-size: 0.38rem;
              color: #7ed5bc;
              letter-spacing: 0;
              text-align: center;
              // line-height: 38px;
              // line-height: 0.38rem;
            }
            .right_percent {
              font-family: PingFangSC-Medium;
              font-size: 0.16rem;
              color: #326699;
              letter-spacing: 0;
              text-align: center;
              // line-height: 16px;
            }
          }
          .number {
            font-family: PingFangSC-Medium;
            font-size: 0.38rem;
            // color: #F9953F;
            letter-spacing: 0;
            text-align: center;
            // line-height: 38px;
            span {
              font-family: PingFangSC-Medium;
              font-size: 0.16rem;
              // color: #326699;
              letter-spacing: 0;
              text-align: center;
              // line-height: 16px;
            }
          }
          .desc {
            font-family: PingFangSC-Regular;
            font-size: 0.12rem;
            color: #212121;
            letter-spacing: 0;
            text-align: center;
            span {
              color: #326699;
            }
            // line-height: 13px;
          }
        }
      }
    }
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
</style>