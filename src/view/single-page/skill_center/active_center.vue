<template>
  <div>
    <header-main :message="'活动中心'"></header-main>
    <div class="skill">
      <mt-navbar v-model="skill">
        <mt-tab-item id="10">经典活动</mt-tab-item>
        <mt-tab-item id="11">近3日活动</mt-tab-item>
      </mt-navbar>
      <div style="height: 40%;display:none">
        <p style="text-align: center; line-height: 2rem; color: #dddddd;">
          暂无数据
        </p>
      </div>
      <mt-tab-container v-model="skill">
        <mt-tab-container-item id="10">
          <div class="news">
            <div
              @click="handleNews(1, item.id)"
              class="news_detial"
              v-for="(item, index) in historyactive.slice(0, skillength)"
              :key="index"
              v-html="item.briefcontent"
            ></div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="11">
          <div class="news">
            <div
              @click="handleNews(2, item.id)"
              class="news_detial"
              v-for="(item, index) in threeactive.slice(0, skillength)"
              :key="index"
              v-html="item.briefcontent"
            ></div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div v-show="showMore" @click="handleActive()" class="show_more">
        <p>加载更多...</p>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import { queryActivitydata } from "../../../api/skill"
export default {
  data() {
    return {
        skill: "10",
        historyactive:[],
        threeactive:[],
        showMore:true,
        skillength:3
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
  mounted() {
      queryActivitydata().then(res => {
      // console.log(JSON.parse(res));
      this.historyactive = JSON.parse(res).historyactivitylist,
      this.threeactive = JSON.parse(res).threedaysactivitylist
    })
  },
  components: {
    "header-main": mainHeader
  }
};
</script>

<style lang="less" scoped>
.skill {
    height: 100%;
    position: absolute;
    width: 100%;
    background: #ffffff;
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
