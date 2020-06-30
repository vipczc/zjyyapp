<template>
  <div>
    <header-main :message="'学员概况'"></header-main>
    <div class="studentsurvey">
      <div class="student_introduce" style="width:100%;height:4rem;display:none">
        <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
      </div>
      <div class="student_introduce">
        <!-- <div class="tabbar_right">
          <p style="display:inline-block">筛选</p>
          <img @click="handleShowRotation()" src="../../../assets/images/todaywork/select.png" alt />
        </div> -->
        <!-- <div class="studentpiebar">
          <p class="piebar_title">本科</p>
          <piebar v-if="showpie" ref="pirbar1" :barnumber="bardata1"  style="padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;"></piebar>
        </div>
        <div class="studentpiebar">
          <p class="piebar_title">研究生</p>
          <piebar v-if="showpie" ref="pirbar2" :barnumber="bardata2" style="padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;"></piebar>
        </div>
        <div class="studentpiebar">
          <p class="piebar_title">住培</p>
          <piebar v-if="showpie" ref="pirbar3" :barnumber="bardata3" style="padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;"></piebar>
        </div>-->
        <div class="end">
          <div class="end_end">
            <div class="end_th">
              <p>基地名称</p>
              <p>学员数量</p>
            </div>
            <div class="endtable">
              <div v-for="(item, index) in majorstudentsum" :key="index" class="end_td">
                <p>{{item.majorname}} </p>
                <p >{{item.studentsum}}</p>
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
import piebar from "../../../components/mecharts/piebar.vue";
import { Indicator } from "mint-ui";
import {
  queryStudentdetailsdata,
  queryStudenttraindata,
  queryMajormanageoffice
} from "../../../api/studentcomment";
import moment from "moment";
export default {
  data() {
    return {
      majorstudentsum:'',
      bardata1: [
        {
          color: "#395275",
          title: "实习",
          number: "200",
          percent: "25%"
        },
        {
          color: "#5E7AB8",
          title: "见习",
          number: "300",
          percent: "37%"
        },
        {
          color: "#7ED5BC",
          title: "留学生",
          number: "300",
          percent: "37%"
        }
      ],
      bardata2: [
        {
          color: "#395275",
          title: "专硕",
          number: "200",
          percent: "25%"
        },
        {
          color: "#5E7AB8",
          title: "科硕",
          number: "300",
          percent: "37%"
        },
        {
          color: "#C9D5EC",
          title: "专博",
          number: "300",
          percent: "37%"
        },
        {
          color: "#7ED5BC",
          title: "科博",
          number: "300",
          percent: "37%"
        }
      ],
      bardata3: [
        {
          color: "#395275",
          title: "本院",
          number: "200",
          percent: "25%"
        },
        {
          color: "#5E7AB8",
          title: "外院委培",
          number: "300",
          percent: "37%"
        },
        {
          color: "#7ED5BC",
          title: "社会化",
          number: "300",
          percent: "37%"
        }
      ],
      showpie: false,
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
    changeTab(num) {
      this.tabIndex = num;
      queryStudenttraindata(num, "", this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).studenttraindata;
        this.showtab = true;
      });
    },
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
        this.singledata = JSON.parse(res).studenttraindata;
        this.showtab = true;
        Indicator.close();
      });
    });
    queryStudentdetailsdata().then(res => {
      // console.log(JSON.parse(res));
      this.majorstudentsum = JSON.parse(res).majorstudentsum;
      // var arrs = [];
      // arrs.push({
      //   color: "#395275",
      //   title: "实习",
      //   number: JSON.parse(res).bkstudentdetailsdata.sxssl,
      //   percent: JSON.parse(res).bkstudentdetailsdata.sxsbl,
      //   numbers: JSON.parse(res).bkstudentdetailsdata.sxssl
      // });
      // arrs.push({
      //   color: "#5E7AB8",
      //   title: "见习",
      //   number: JSON.parse(res).bkstudentdetailsdata.jxssl,
      //   percent: JSON.parse(res).bkstudentdetailsdata.jxsbl,
      //   numbers: JSON.parse(res).bkstudentdetailsdata.jxssl
      // });
      // arrs.push({
      //   color: "#7ED5BC",
      //   title: "留学生",
      //   number: JSON.parse(res).bkstudentdetailsdata.lxssl,
      //   percent: JSON.parse(res).bkstudentdetailsdata.lxsbl,
      //   numbers: JSON.parse(res).bkstudentdetailsdata.lxssl
      // });
      // this.bardata1 = arrs;
      // var adds = [];
      // adds.push({
      //   color: "#395275",
      //   title: "专硕",
      //   number: JSON.parse(res).yjsstudentdetailsdata.zssl,
      //   percent: JSON.parse(res).yjsstudentdetailsdata.zsbl,
      //   numbers: JSON.parse(res).yjsstudentdetailsdata.zssl
      // });
      // adds.push({
      //   color: "#5E7AB8",
      //   title: "科硕",
      //   number: JSON.parse(res).yjsstudentdetailsdata.kssl,
      //   percent: JSON.parse(res).yjsstudentdetailsdata.ksbl,
      //   numbers: JSON.parse(res).yjsstudentdetailsdata.kssl
      // });
      // adds.push({
      //   color: "#C9D5EC",
      //   title: "专博",
      //   number: JSON.parse(res).yjsstudentdetailsdata.zbsl,
      //   percent: JSON.parse(res).yjsstudentdetailsdata.zbbl,
      //   numbers: JSON.parse(res).yjsstudentdetailsdata.zbsl
      // });
      // adds.push({
      //   color: "#7ED5BC",
      //   title: "科博",
      //   number: JSON.parse(res).yjsstudentdetailsdata.kbsl,
      //   percent: JSON.parse(res).yjsstudentdetailsdata.kbbl,
      //   numbers: JSON.parse(res).yjsstudentdetailsdata.kbsl
      // });
      // this.bardata2 = adds;
      // var apps = [];
      // apps.push({
      //   color: "#395275",
      //   title: "本院",
      //   number: JSON.parse(res).zpstudentdetailsdata.bysl,
      //   percent: JSON.parse(res).zpstudentdetailsdata.bybl,
      //   numbers: JSON.parse(res).zpstudentdetailsdata.bysl
      // });
      // apps.push({
      //   color: "#5E7AB8",
      //   title: "外院委培",
      //   number: JSON.parse(res).zpstudentdetailsdata.wywpsl,
      //   percent: JSON.parse(res).zpstudentdetailsdata.wywpbl,
      //   numbers: JSON.parse(res).zpstudentdetailsdata.wywpsl
      // });
      // apps.push({
      //   color: "#7ED5BC",
      //   title: "社会化",
      //   number: JSON.parse(res).zpstudentdetailsdata.shhsl,
      //   percent: JSON.parse(res).zpstudentdetailsdata.shhbl,
      //   numbers: JSON.parse(res).zpstudentdetailsdata.shhsl
      // });
      // this.bardata3 = apps;
      // this.showpie = true;
      // setTimeout(() => {
      // this.$refs.pirbar1.drawLine()
      // this.$refs.pirbar2.drawLine()
      // this.$refs.pirbar3.drawLine()
      //   }, 1000);
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
    piebar
  }
};
</script>

<style lang="less" scoped>
.studentsurvey {
  position: absolute;
  width: 100%;
  .student_introduce {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
    padding-top: 0.01rem;
    .studentpiebar {
      .piebar_title {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 15px;
        border-left: 3px solid #277fff;
        margin-left: 0.2rem;
        padding-left: 0.05rem;
        margin-top: 0.2rem;
      }
    }
  }
}

.end {
  background: #ffffff;
  padding-top: 0.09rem;
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
  height: 5rem;
}

.tabbar_right {
  align-items: center;
  margin-left: auto;
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
</style>