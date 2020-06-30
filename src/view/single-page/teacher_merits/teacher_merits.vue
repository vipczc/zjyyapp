<template>
  <div>
    <header-main :message="'师资工作量'"></header-main>
    <div class="teachermerits">
      <div class="teacher_merits">
        <piebar
          :middlenumber="1"
          :maintitle="'7月绩效工作量分布'"
          :barnumber="bardata2"
          style="padding-top: 0.2rem;padding-bottom:0.2rem;box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);"
        ></piebar>
      </div>
      <div class="merits_main">
        <div class="merits_main_top">
          <p class="title">
            半年内绩效工作量
            <span>（全院）</span>
          </p>
          <div class="table">
            <div
              v-for="(item, index) in tabeldata"
              :key="index"
              :style="{ height:item.number * 0.002 + 'rem' }"
              class="block"
            >
              <p>{{item.number}}</p>
            </div>
          </div>
          <div class="table_end">
            <p v-for="(item2, index2) in tabeldata" :key="index2">{{item2.type}}</p>
          </div>
        </div>
        <div class="merits_main_end">
          <div class="yraybar">
            <p class="title">各基地未培训带教教师人数</p>
            <div class="bartop">
              <p class="yray">0</p>
              <p class="xray">人数</p>
            </div>
            <div class="barmiddle_center">
              <div class="barleft">
                <p v-for="(item, index) in traindata" :key="index">{{item.name}}</p>
              </div>
              <div class="barmiddle">
                <div v-for="(item2, index2) in traindata" :key="index2" class="barmiddle_single">
                  <div
                    :style="{ 'width': item2.number*0.01 + 'rem','background': item2.color }"
                    class="block"
                  ></div>
                  <p>{{item2.number}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import piebar from "../../../components/mecharts/piebar.vue";
export default {
  data() {
    return {
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
      traindata:[
        {
          name:"内科基地",
          number:249,
          color:"#E28A4A"
        },
        {
          name:"外科基地",
          number:200,
          color:"#E6A062"
        },
        {
          name:"妇产科基地",
          number:30,
          color:"#ECB987"
        },
        {
          name:"全科基地",
          number:15,
          color:"#F2CEAE"
        },
        {
          name:"儿科基地",
          number:7,
          color:"#F7E8D7"
        }
      ],
      bardata2:[
        {
          color:"#395275",
          title:"带教活动量",

          percent:"100人次"
        },
        {
          color:"#5E7AB8",
          title:"阅卷量",

          percent:"20人次"
        },
        {
          color:"#C9D5EC",
          title:"监考量",
 
          percent:"20人次"
        },
        {
          color:"#7ED5BC",
          title:"其他",
  
          percent:"220人次"
        },
      ],
    };
  },
  components: {
    "header-main": mainHeader,
    piebar
  }
};
</script>

<style lang="less" scoped>
.teachermerits {
  position: absolute;
  width: 100%;
  .teacher_merits {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
  }
  .merits_main {
      background: #ffffff;
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
  }
}
.merits_main_end {
  padding-top: 0.1rem;
  background: #ffffff;
  // width: 3.45rem;
  display: block;
  // margin: 0 auto;
  margin-bottom: 0.3rem;
  border-radius: 5px;
  img {
    width: 90%;
    display: block;
    margin: 0 auto;
  }
  .yraybar{
    .title{
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 15px;
      margin-top: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .bartop{
      width: 3.08rem;
      display: flex;
      align-items: center;
      margin-left: 0.57rem;
      margin-bottom: 0.09rem;
      .xray{
        margin-left: auto;
        margin-right: 0.23rem;
      }
      
      p{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397AD;
        letter-spacing: 0;
        // line-height: 13px;
      }
    }
    .barmiddle_center{
      display: flex;
      align-items: flex-start;
      .barleft{
        width: 0.57rem;
        p{
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #9397AD;
          letter-spacing: 0;
          text-align: center;
          // line-height: 13px;
          width: 0.4rem;
          margin: 0 auto;
          margin-top: 0.18rem;
        }
      }
      .barmiddle{
        width: 3.08rem;
        height: 2.72rem;
        border-top: 1px solid #D7DDE4;
        border-left: 1px solid #D7DDE4;
        .barmiddle_single{
          display: flex;
          align-items: center;
          .block{
            height: 0.42rem;
            // width: 2.72rem;
            // background: #212121;
            margin-top: 0.11rem;
          }
          p{
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
}
</style>