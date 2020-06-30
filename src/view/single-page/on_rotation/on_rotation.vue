<template>
  <div>
    <header-main :message="'轮转'"></header-main>

    <!-- tab-container -->

    <div class="rotation">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">退培学员清单</mt-tab-item>
        <mt-tab-item id="2">轮转学员清单</mt-tab-item>
        <mt-tab-item id="3">未入科的学员清单</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!-- <div style="width:100%;height:4rem;display:none">
            <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
          </div>
          <div class="rotation_top">
            <div class="bluetitle"></div>
            <p>{{this.selectName}}</p>
            <img
              @click="handleShowRotation()"
              src="../../../assets/images/on_rotation/tabulation.png"
              alt
            />
          </div>
          <div class="rotation_middle">-->
          <!-- <p>
              总人数：
              <span>{{majorlists.zrs}}</span>
            </p>
            <p>
              当前正常轮转人数：
              <span>{{majorlists.lzrs}}</span>
            </p>
            <p>
              当前请假人数：
              <span style="color:#E28A4A">{{majorlists.qjrs}}</span>
            </p>
            <p>
              当前未按计划轮转人数：
              <span>{{majorlists.wajhlz}}</span>
            </p>
            <p>
              年度退陪人数：
              <span>{{majorlists.tprs}}</span>
          </p>-->
          <!-- <div class="flex middle1">
          <p>正常轮转人数：</p>
          <span>961</span>
        </div>
        <div class="flex middle2">
          <p>
            （总数：
            <span>985</span>）
          </p>
        </div>
        <div class="flex middle3">
          <p>请假人数：</p>
          <span>24</span>
        </div>
        <div class="flex middle4">
          <p>未按计划轮转人数：</p>
          <span>0</span>
        </div>
        <div class="flex middle5">
          <p>退培人数：</p>
          <span>0</span>
          </div>-->
          <!-- </div>
          <div class="rotation_main">-->
          <!-- <p>科室轮转人数（全科室）</p> -->
          <!-- <img src="../../../assets/images/on_rotation/on_rotation.png" alt=""> -->
          <!-- <div class="yraybar">
              <p class="title">科室轮转人数（全科室）</p>
              <div class="bartop">
                <p class="yray">0</p>
                <p class="xray">饱和人数</p>
              </div>
              <div class="barmiddle_center">
                <div class="barleft">
                  <div v-for="(item, index) in traindata" :key="index" class="barleft_block">
                    <p>{{item.officename}}</p>
                  </div>
                </div>
                <div class="barmiddle">
                  <div v-for="(item2, index2) in traindata" :key="index2" class="barmiddle_single">
          <div :style="{ 'width': item2.lzrs*0.025 + 'rem' }" class="block">-->
          <!-- <p style="margin-top: 0.05rem;margin-left:0.15rem">当前:{{item2.before}}</p>
          <p style="margin-left:0.15rem">标准:{{item2.now}}</p>-->
          <!-- </div>
                    <p>{{item2.lzrs}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
          <div class="end">
            <div class="end_end">
              <div class="end_th">
                <p>基地名称</p>
                <p>学员姓名</p>
              </div>
              <div class="endtable">
                <div class="end_td" v-for="(item, index) in selectdata" :key="index">
                  <p>{{item.majorname}}</p>
                  <p style="border-left:1px solid #f0f0f7">
                    <span v-for="(studentname,index) in item.studentlist" :key="index">
                      {{studentname.personname}}
                      <span>
                        <br />
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="end">
            <div class="end_end">
              <div class="end_th">
                <p>基地名称</p>
                <p>学员姓名</p>
              </div>
              <div class="endtable">
                <div v-for="(item, index) in selectdata" :key="index" class="end_td">
                  <p>{{item.majorname}}</p>
                  <p style="border-left:1px solid #f0f0f7">
                    <span v-for="(studentname,index) in item.studentlist" :key="index">
                      {{studentname.personname}}
                      <span>
                        <br />
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="end">
            <div class="end_end">
              <div class="end_th">
                <p>基地名称</p>
                <p>学员姓名</p>
              </div>
              <div class="endtable">
                <div v-for="(item, index) in selectdata2" :key="index" class="end_td" >
                  <p>{{item.name}}</p>
                  <p style="border-left:1px solid #f0f0f7">
                    <span v-for="(studentname,index) in item.studentlist" :key="index" >
                      {{studentname.personname}}
                      <span>
                        <br />
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div @click="handleHideRotation()" v-show="showRotation" class="rotation_wind">
      <div class="rotation_wind_main">  
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
import { Navbar, TabItem } from "mint-ui";
import {
  queryMajormanageoffice,
  queryMajorstudentrounddata
} from "../../../api/studentcomment";
export default {
  data() {
    return {
      showRotation: false,
      selectId: 0,
      selected: "1",
      selectName: "内科基地",
      selectdata: "",
      selectdata2: "",
      traindata: [
        {
          name: "麻醉科",
          number: 100,
          color: "#E28A4A",
          before: 25,
          now: 25
        },
        {
          name: "急诊科",
          number: 100,
          color: "#E6A062",
          before: 22,
          now: 22
        },
        {
          name: "放射科",
          number: 100,
          color: "#ECB987",
          before: 30,
          now: 30
        },
        {
          name: "滨江口腔外科",
          number: 92,
          color: "#F2CEAE",
          before: 23,
          now: 25
        },
        {
          name: "耳鼻咽喉科",
          number: 66.6,
          color: "#F7E8D7",
          before: 20,
          now: 30
        },
        {
          name: "产科",
          number: 50,
          color: "#DADBF0",
          before: 15,
          now: 30
        },
        {
          name: "妇科",
          number: 46.1,
          color: "#B2BBDD",
          before: 12,
          now: 26
        },
        {
          name: "全科医学科",
          number: 41.7,
          color: "#8496CC",
          before: 10,
          now: 24
        },
        {
          name: "生殖医学科",
          number: 36.4,
          color: "#5D74BC",
          before: 8,
          now: 22
        },
        {
          name: "中医康复科",
          number: 30,
          color: "#4877CA",
          before: 5,
          now: 15
        }
      ],
      // selectdata: [
      //   {
      //     name: "内科基地"
      //   },
      //   {
      //     name: "外科基地"
      //   },
      //   {
      //     name: "儿科基地"
      //   },
      //   {
      //     name: "全科基地"
      //   },
      //   {
      //     name: "中医基地"
      //   },
      //   {
      //     name: "麻醉科基地"
      //   },
      //   {
      //     name: "眼科基地"
      //   },
      //   {
      //     name: "皮肤科基地"
      //   },
      //   {
      //     name: "放射科基地"
      //   }
      // ],
      offid: 0,
      majorlists: {}
    };
  },
  watch: {
    selected(val) {
      // console.log(val);
      queryMajorstudentrounddata(val).then(res => {
        // console.log(JSON.parse(res));
        this.selectdata = JSON.parse(res).majorlist;
        this.selectdata2 = JSON.parse(res).officelist;
      });
    }
  },
  methods: {
    // handleShowRotation() {
    //   this.noScroll();
    //   this.showRotation = true;
    // },
    // handleHideRotation() {
    //   this.showRotation = false;
    //   this.canScroll();
    // },
    // handleSelectName(index, name, data) {
    //   (this.selectId = index), (this.selectName = name);
    //   let addp = [];
    //   for (let p = 0; p < data.length; p++) {
    //     addp.push(data[p].officeid);
    //   }
    // }
  },
  mounted() {
    queryMajorstudentrounddata(1).then(res => {
      // console.log(JSON.parse(res));
      this.selectdata = JSON.parse(res).majorlist;
      this.selectdata2 = JSON.parse(res).officelist;
    });
    // queryMajormanageoffice().then(res => {
    //   this.selectdata = JSON.parse(res).majorlist;
    //   let ads = [];
    //   for (
    //     let i = 0;
    //     i < JSON.parse(res).majorlist[0].officelist.length;
    //     i++
    //   ) {
    //     ads.push(JSON.parse(res).majorlist[0].officelist[i].officeid);
    //   }
    //   this.selectName = JSON.parse(res).majorlist[0].majorname;
    // });
  },
  components: {
    "header-main": mainHeader
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
        // height: 0.35rem;
        // line-height: 0.35rem;
        width: 2rem;
        text-align: center;
      }
    }

    .end_td {
      display: flex;
      border: 1px solid #f0f0f7;
      align-items: center;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        // border: 1px solid #f0f0f7;
        // height: 0.35rem;
        line-height: 0.35rem;
        width: 1.61rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  height: 4.5rem;
}
.rotation {
  position: absolute;
  background: #ffffff;
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  border-radius: 5px;
  border-radius: 5px;
  .rotation_top {
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    height: 0.47rem;
    display: flex;
    align-items: center;
    .bluetitle {
      background: #277fff;
      width: 0.03rem;
      height: 0.14rem;
      margin-right: 0.05rem;
    }
    img {
      width: 0.2rem;
      height: 0.2rem;
    }
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 0.18rem;
      margin-right: auto;
    }
  }
  .rotation_middle {
    // display: flex;
    // flex-wrap: wrap;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    margin-top: 0.15rem;
    // margin-bottom: 0.1rem;
    .flex {
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 0.13rem;
      margin-bottom: 0.1rem;
      span {
        color: #5d74bc;
        font-size: 0.15rem;
      }
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #0f0f0f;
      letter-spacing: 0;
      // line-height: 0.13rem;
    }
    .middle2 {
      margin-left: 0.15rem;
      margin-right: 0.15rem;
    }
    .middle5 {
      margin-left: 0.15rem;
    }
  }
  .rotation_main {
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      //   text-align: center;
      //   line-height: 0.15rem;
      //   margin-bottom: 0.2rem;
    }
    img {
      width: 3.35rem;
      display: block;
      margin: 0 auto;
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
.yraybar {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    margin-top: 0.2rem;
    margin-bottom: 0.15rem;
  }
  .bartop {
    width: 3.08rem;
    display: flex;
    align-items: center;
    margin-left: 0.57rem;
    margin-bottom: 0.09rem;
    .xray {
      margin-left: auto;
      margin-right: 0.23rem;
    }

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
    }
  }
  .barmiddle_center {
    display: flex;
    align-items: flex-start;
    .barleft {
      width: 0.57rem;
      .barleft_block {
        width: 0.36rem;
        margin: 0 auto;
        margin-top: 0.11rem;
        height: 0.42rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
    }
    .barmiddle {
      width: 3.08rem;
      // height: 2.72rem;
      border-top: 1px solid #d7dde4;
      border-left: 1px solid #d7dde4;
      padding-bottom: 0.1rem;
      margin-right: 0.1rem;
      .barmiddle_single {
        display: flex;
        align-items: center;
        .block {
          height: 0.42rem;
          // width: 2.72rem;
          background: #e28a4a;
          margin-top: 0.11rem;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #212121;
          letter-spacing: 0;
          margin-left: 0.05rem;
          // line-height: 12px;
        }
      }
    }
  }
}
</style>