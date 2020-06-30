<template>
  <div>
    <header-main :message="'技能中心'"></header-main>
    
    <div class="skillcenter">
      <div style="width:100%;height:4rem;background: #ffffff;display:none">
        <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
      </div>
      <div class="skill_center">
        <div class="skill_top">
          <p class="top_title">
            月度使用人次数
            <span>（近6个月）</span>
          </p>
          <div class="end">
            <div class="end_top">
              <div class="top_left">
                <p>人数</p>
              </div>
              <div class="top_right">
                <div v-for="(item, index) in persontime" :key="index" :style="{height:item.rc * 0.0004 + 'rem'}" class="block">
                  <p>{{item.rc}}</p>
                </div>
              </div>
            </div>
            <div class="end_end">
              <div class="end_left">
                <p>月份</p>
              </div>
              <div class="end_right">
                <p v-for="(item2, index2) in persontime" :key="index2">{{item2.yf}}月</p>
              </div>
            </div>
          </div>
        </div>
        <piebar ref="piebar1" v-if="showdata1" :maintitle="'使用人群分布'" :middlenumber="barnumber1" :secondtitle="'（近6个月）'" :barnumber="bardata1" style="padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;margin-top: 0.2rem;"></piebar>
        <piebar ref="piebar2" v-if="showdata2" :maintitle="'技能中心开展活动的各类型占比'" :secondtitle="'（近6个月）'" :barnumber="bardata2" style="padding-bottom:0.2rem;border-bottom: 1px solid #F0F0F7;margin-top: 0.2rem;"></piebar>
        <div class="merits_main_top">
          <p class="title">
            技能中心自主预数量
            <span>（近6个月）</span>
          </p>
          <div class="table">
            <p class="title">人次</p>
            <div
              v-for="(item, index) in skillappointme"
              :key="index"
              :style="{ height:item.yysl * 0.002 + 'rem' }"
              class="block"
            >
              <p>{{item.yysl}}</p>
            </div>
          </div>
          <div class="table_end">
            <p v-for="(item2, index2) in skillappointme" :key="index2">{{item2.yf}}月</p>
          </div>
        </div>
      </div>
      <div class="line">

    </div>
    <div class="skill">
       
        <mt-navbar v-model="skill">
          <mt-tab-item id="10">当前活动</mt-tab-item>
          <mt-tab-item id="11">历史活动</mt-tab-item>
        </mt-navbar>
        <!-- <div style="width:100%;height:4rem;background: #ffffff;">
      <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
    </div> -->
        <mt-tab-container  v-model="skill">
          <mt-tab-container-item style="background:#ffffff" id="10">
             <div @click="handleNews(1,item.id)" class="news" v-for="(item, index) in threeactive.slice(0, skillength)" :key="index" v-html="item.briefcontent"></div>
          </mt-tab-container-item>
          <mt-tab-container-item style="background:#ffffff" id="11">
            <div @click="handleNews(2,item.id)" class="news" v-for="(item, index) in  historyactive.slice(0, skillength)" :key="index" v-html="item.briefcontent"></div>
          </mt-tab-container-item>
        </mt-tab-container>
        <div v-show="showMore" @click="handleActive()" class="show_more">
          <p>加载更多...</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import piebar from "../../../components/mecharts/piebar.vue";
import { querySkillcenTredetailsdata,queryActivitydata } from "../../../api/skill"
export default {
  data() {
    return {
      skill: "10",
      teacherdata: [
        {
          type: "2月",
          number: 40,
          color: "#239eff"
        },
        {
          type: "3月",
          number: 40,
          color: "#239eff"
        },
        {
          type: "4月",
          number: 43,
          color: "#239eff"
        },
        {
          type: "5月",
          number: 38,
          color: "#239eff"
        },
        {
          type: "6月",
          number: 37,
          color: "#239eff"
        },
        {
          type: "7月",
          number: 39,
          color: "#239eff"
        }
      ],
      tabeldata: [
        {
          type: "2月",
          number: 340
        },
        {
          type: "3月",
          number: 298
        },
        {
          type: "4月",
          number: 380
        },
        {
          type: "5月",
          number: 458
        },
        {
          type: "6月",
          number: 379
        },
        {
          type: "7月",
          number: 379
        }
      ],
      bardata1:[
        {
          color:"#395275",
          title:"医师",
          percent:"100人次"
        },
        {
          color:"#5E7AB8",
          title:"护士",
          percent:"20人次"
        },
        {
          color:"#C9D5EC",
          title:"院外学员",
          percent:"20人次"
        },
        {
          color:"#7ED5BC",
          title:"院内学员",
          percent:"220人次"
        },
      ],
      bardata2:[
        {
          color:"#395275",
          title:"专家讲座",
          percent:"25%"
        },
        {
          color:"#5E7AB8",
          title:"带教医师培训",
          percent:"25%"
        },
        {
          color:"#C9D5EC",
          title:"各类考试",
          percent:"25%"
        },
        {
          color:"#7ED5BC",
          title:"教学活动",
          percent:"25%"
        },
      ],
      historyactive:[],
      threeactive:[],
      persontime:[],
      persontype:[],
      skillappointme:[],
      traintype:[],
      barnumber1:0,
      showdata1:false,
      showdata2:false,
      skillength:3,
      showMore:true,
    };
  },
  watch:{
    skill(){
        this.skillength = 3,
        this.showMore = true
    }
  },
  methods:{
       handleNews(type,id) {
      this.$router.push({
        path: "/activity_detail",
        query: {
          type: type,
          id:id
        }
      });
    },
    handleActive(){
        this.skillength = 99
        this.showMore = false
    }
  },
  mounted(){
    querySkillcenTredetailsdata().then(res => {  
      // console.log(JSON.parse(res));
       
      this.persontime = JSON.parse(res).persontimelist,
      this.persontype = JSON.parse(res).persontypetimelist,
      this.skillappointme = JSON.parse(res).skillappointmentlist,
      this.traintype = JSON.parse(res).traintypelist
      var arr = []
      var arrs = []
      arr.push({
        title:this.persontype[0].typename,
        percent:this.persontype[0].rc + "人次",
        numbers:this.persontype[0].rc,
        color:"#395275"
      })
      arr.push({
        title:this.persontype[1].typename,
        percent:this.persontype[1].rc + "人次",
        numbers:this.persontype[1].rc,
        color:"#5E7AB8"
      })
      // arr.push({
      //   title:this.persontype[2].typename,
      //   percent:this.persontype[2].rc + "人次",
      //   numbers:this.persontype[2].rc,
      //   color:"#C9D5EC"
      // })
      // arr.push({
      //   title:this.persontype[3].typename,
      //   percent:this.persontype[3].rc + "人次",
      //   numbers:this.persontype[3].rc,
      //   color:"#7ED5BC"
      // })
      // this.barnumber1 = parseInt(this.persontype[0].rc) + parseInt(this.persontype[1].rc) + parseInt(this.persontype[2].rc) + parseInt(this.persontype[3].rc)
       this.barnumber1 = parseInt(this.persontype[0].rc) + parseInt(this.persontype[1].rc)
      this.bardata1 = arr
      arrs.push({
        title:this.traintype[0].typename,
        percent:this.traintype[0].bl,
        numbers:this.traintype[0].bl1,
        color:"#395275"
      })
      arrs.push({
        title:this.traintype[1].typename,
        percent:this.traintype[1].bl,
        numbers:this.traintype[1].bl1,
        color:"#5E7AB8"
      })
      arrs.push({
        title:this.traintype[2].typename,
        percent:this.traintype[2].bl,
        numbers:this.traintype[2].bl1,
        color:"#7ED5BC"
      })
      // arrs.push({
      //   title:this.traintype[3].typename,
      //   percent:this.traintype[3].bl,
      //   numbers:this.traintype[3].bl1,
      //   color:"#7ED5BC"
      // })
      this.bardata2 = arrs
      this.showdata1 = true
      this.showdata2 = true
      setTimeout(() => {
        this.$refs.piebar1.drawLine()
        this.$refs.piebar2.drawLine()
      }, 1000);
    })
    queryActivitydata().then(res => {
      // console.log(JSON.parse(res));
      this.historyactive = JSON.parse(res).historyactivitylist,
      this.threeactive = JSON.parse(res).threedaysactivitylist
    })
  },
  components: {
    "header-main": mainHeader,
    piebar
  }
};
</script>

<style lang="less" scoped>
.skillcenter {
  position: absolute;
  width: 100%;
  .skill_center {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
    padding-top: 0.01rem;
    .skill_top {
      background: #ffffff;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      border-radius: 5px;
      padding-bottom: 0.01rem;
      padding-top: 0.01rem;
      .top_title {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        // line-height: 15px;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        span {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          // line-height: 10px;
        }
      }
    }
    .end {
      width: 3.15rem;
      margin: 0 auto;
      margin-bottom: 0.21rem;
      .end_top {
        display: flex;
        align-items: flex-end;
        .top_left {
          height: 1.47rem;
          width: 0.31rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #212121;
            letter-spacing: 0;
            // line-height: 13px;
          }
        }
        .top_right {
          height: 1.48rem;
          width: 2.83rem;
          border-left: 1px solid #d7dde4;
          border-bottom: 1px solid #d7dde4;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          .block:nth-child(1){
            background: rgba(249,149,63,1);
            p{
              color: rgba(249,149,63,1);
            }
          }
          .block:nth-child(2){
            background: rgba(249,149,63,0.7);
            p{
              color: rgba(249,149,63,0.7);
            }
          }
          .block:nth-child(3){
            background: rgba(249,149,63,0.4);
            p{
              color: rgba(249,149,63,0.4);
            }
          }
          .block:nth-child(4){
            background: rgba(35,158,255,0.40);
            p{
              color: rgba(35,158,255,0.40);
            }
          }
          .block:nth-child(5){
            background: rgba(35,158,255,0.70);
            p{
              color: rgba(35,158,255,0.70);
            }
          }
          .block:nth-child(6){
            background: rgba(35,158,255,1);
            p{
              color: rgba(35,158,255,1);
            }
          }
          .block {
            width: 0.16rem;
            // height: 1.2rem;
            // transform: scaleY(-1) rotate(-180deg);
            // background: #239EFF;
            position: relative;
            p {
              font-family: PingFangSC-Regular;
              font-size: 0.13rem;
              // color: #239EFF;
              letter-spacing: 0;
              text-align: center;
              // line-height: 13px;
              position: absolute;
              top: -0.2rem;
            }
          }
        }
      }
      .end_end {
        display: flex;
        align-items: flex-start;
        .end_left {
          width: 0.31rem;
          height: 0.2rem;
          border-top: 1px solid #d7dde4;
          border-right: 1px solid #d7dde4;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #212121;
            letter-spacing: 0;
            // line-height: 13px;
          }
        }
        .end_right {
          display: flex;
          align-items: flex-start;
          width: 2.83rem;
          justify-content: space-around;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.11rem;
            color: #9397ad;
            letter-spacing: 0;
            text-align: center;
            // line-height: 11px;
          }
        }
      }
    }
  }
}
.merits_main_top {
  margin-top: 0.2rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid #f0f0f7;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    span {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 10px;
    }
  }
  .table {
    height: 1.2rem;
    width: 3.35rem;
    margin: 0 auto;
    border-left: 1px solid #d7dde4;
    border-bottom: 1px solid #d7dde4;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    position: relative;
    .title{
      font-size: 0.1rem;
      color: #dddddd;
      position: absolute;
      top: 0;
      left: 0.1rem;
    }
    .block {
      width: 0.28rem;
      position: relative;
      // height: 0.84rem;
      background: #239eff;
      p {
        font-family: PingFangSC-Medium;
        font-size: 0.1rem;
        color: #239eff;
        letter-spacing: 0;
        text-align: center;
        position: absolute;
        top: -0.2rem;
        left: 0.05rem;
        // line-height: 10px;
      }
    }
  }
  .table_end {
    width: 3.35rem;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 0.1rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
    }
  }
}
.line{
    width: 100%;
    height: 0.1rem;
    background: #F0F0F7;
}
.skill {
  .skill_top {
    // display: flex;
    // align-items: center;
    padding-top: 0.12rem;
    padding-bottom: 0.1rem;
    background-image: linear-gradient(
      243deg,
      #24bae0 0%,
      #4271c4 49%,
      #273897 100%
    );
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
        margin-right: 0.83rem;
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
      width: 0.15rem;
      height: 0.15rem;
      margin-right: 0.15rem;
    }
  }
  .skill_back {
    width: 100%;
    height: 1.73rem;
  }
  .news {
    width: 3.6rem;
    margin: 0 auto;
    .news_detial {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      margin-top: 0.15rem;
      margin-bottom: 0.15rem;
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
/deep/ .mint-navbar {
  color: #9397ad;
  font-size: 0.15rem;
  .mint-tab-item-label {
    font-size: 0.15rem;
  }
  .mint-tab-item.is-selected {
    // border-bottom: 3px solid #ffffff;
    border: none;
    position: relative;
    color: #333333;
    &:after {
      content: "";
      position: absolute;
      height: 0.03rem;
      width: 0.5rem;
      background-color: #277fff;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      margin-bottom: 0.1rem;
      border-radius: 1.5px;
      border-radius: 1.5px;
    }
    .mint-tab-item-label {
      font-size: 0.18rem;
    }
  }
}
</style>