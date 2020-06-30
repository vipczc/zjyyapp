<template>
  <div class="content">
    <Header-bar :message="'基地评价'"></Header-bar>
    <div class="comment-box">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          滨江口腔外科
          <p>平均分160</p>
        </mt-tab-item>
        <mt-tab-item id="2">
          耳鼻咽喉科
          <p>平均分159.8</p>
        </mt-tab-item>
        <mt-tab-item id="3">
          妇产科
          <p>平均分158.7</p>
        </mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected" swipeable>
        <mt-tab-container-item id="1">
          <div class="comment">
            <radar :maintitle="'360评价图'" :secondtitle="'（平均分）'" :barnumber="this.radardata1"></radar>
            <div class="teacher_radar_detial">
              <div class="rader_detial_left">
                <div class="rader_detial_left_top">
                  <p class="title">评价平均分</p>
                  <p class="desc">(满分100)</p>
                  <p class="number">98.57</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价最低分</p>
                  <p class="number">55</p>
                </div>
              </div>
              <div class="rader_detial_middle"></div>
              <div class="rader_detial_right">
                <div class="rader_detial_left_top">
                  <p class="title">评价总次数</p>
                  <p class="number">867</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价表提交率</p>
                  <p class="number">78.96%</p>
                </div>
              </div>
            </div>
            <div class="comment_bar">
              <p class="comment_bar_top">精神科基地各科老师评价排名</p>
              <div class="comment_bar_middle">
                <div class="bar_singgle">
                  <p class="number">100</p>
                </div>
                <div class="bar_center">
                  <p>（其余暂无）</p>
                </div>
              </div>
              <div class="comment_bar_end">
                <p>精神科</p>
              </div>
            </div>
            <!-- <span class="more">更多 &nbsp;></span>
            <img src="@/assets/images/base-comment0.png" alt />-->
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="comment">
            <radar :maintitle="'360评价图'" :secondtitle="'（平均分）'" :barnumber="this.radardata1"></radar>
            <div class="teacher_radar_detial">
              <div class="rader_detial_left">
                <div class="rader_detial_left_top">
                  <p class="title">评价平均分</p>
                  <p class="desc">(满分100)</p>
                  <p class="number">98.57</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价最低分</p>
                  <p class="number">55</p>
                </div>
              </div>
              <div class="rader_detial_middle"></div>
              <div class="rader_detial_right">
                <div class="rader_detial_left_top">
                  <p class="title">评价总次数</p>
                  <p class="number">867</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价表提交率</p>
                  <p class="number">78.96%</p>
                </div>
              </div>
            </div>
            <div class="comment_bar">
              <p class="comment_bar_top">精神科基地各科老师评价排名</p>
              <div class="comment_bar_middle">
                <div class="bar_singgle">
                  <p class="number">100</p>
                </div>
                <div class="bar_center">
                  <p>（其余暂无）</p>
                </div>
              </div>
              <div class="comment_bar_end">
                <p>精神科</p>
              </div>
            </div>
            <!-- <span class="more">更多 &nbsp;></span>
            <img src="@/assets/images/base-comment.png" alt />-->
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="comment">
            <radar :maintitle="'360评价图'" :secondtitle="'（平均分）'" :barnumber="this.radardata1"></radar>
            <div class="teacher_radar_detial">
              <div class="rader_detial_left">
                <div class="rader_detial_left_top">
                  <p class="title">评价平均分</p>
                  <p class="desc">(满分100)</p>
                  <p class="number">98.57</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价最低分</p>
                  <p class="number">55</p>
                </div>
              </div>
              <div class="rader_detial_middle"></div>
              <div class="rader_detial_right">
                <div class="rader_detial_left_top">
                  <p class="title">评价总次数</p>
                  <p class="number">867</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价表提交率</p>
                  <p class="number">78.96%</p>
                </div>
              </div>
            </div>
            <div class="comment_bar">
              <p class="comment_bar_top">精神科基地各科老师评价排名</p>
              <div class="comment_bar_middle">
                <div class="bar_singgle">
                  <p class="number">100</p>
                </div>
                <div class="bar_center">
                  <p>（其余暂无）</p>
                </div>
              </div>
              <div class="comment_bar_end">
                <p>精神科</p>
              </div>
            </div>
            <!-- <span class="more">更多 &nbsp;></span>
            <img src="@/assets/images/base-comment2.png" alt />-->
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="line"></div>
    <img src="@/assets/images/teacher-comment1.png" alt class="top-img" />
  </div>
</template>

<script>
import HeaderBar from "@/components/mainHeader";
import radar from "../../../components/mecharts/radar.vue";
export default {
  components: {
    HeaderBar,
    radar
  },
  data() {
    return {
      selected: "2",
      radardata1:[
        {
          name:"终身学习 161",

        },
        {
          name:"患者照护162 ",

        },
        {
          name:"专业精神162 ",

        },
        {
          name:"知识技能159 ",

        },
        {
          name:"沟通合作 158",

        },
        {
          name:"职业素养 158",

        },
      ],
    };
  }
};
</script>

<style scoped lang="less">
.content {
  padding-bottom: 0.15rem;
}

.comment-box {
  background-color: #fff;
  padding-bottom: 0.2rem;
  // p{
  //       position: absolute;
  //           top: 0.16rem;
  //       display: block;
  //       /* margin: 0 auto; */
  //       text-align: center;
  //       left: 0;
  //       right: 0;
  //       bottom: 0;
  //       margin: auto;
  //       font-size: 0.1rem;
  // }
}

.line {
  height: 10px;
  background: #f0f0f7;
  width: 3.55rem;
    margin: 0 auto;
}
img {
  width: 90%;
  display: block;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}

.top-img {
  width: 3.55rem;
  padding: 0.13rem;
  padding-top: 0.2rem;
  background: #ffffff;
  box-sizing: border-box;
  // margin-top: 0.49rem;
  padding-bottom: 0.05rem;
  // position: absolute;
}

.navbar {
  font-size: 0.15rem;
  color: #9397ad;
}

.comment {
  width: 3.55rem;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(0, 0, 0, 0.08);
  border-bottom-left-radius: 0.05rem;
  border-bottom-right-radius: 0.05rem;
  span {
    color: #474c63;
    padding-top: 0.15rem;
    padding-bottom: 0.2rem;
    padding-right: 0.18rem;
    display: block;
    text-align: right;
    font-size: 0.15rem;
  }
}

.mint-navbar {
  width: 3.55rem;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  .mint-tab-item:nth-child(1) {
    width: 1.1rem;
  }
  .mint-tab-item:nth-child(2) {
    width: 1.6rem;
  }
  .mint-tab-item:nth-child(3) {
    width: 1rem;
    overflow: hidden;
  }
}

/deep/.mint-tab-item-label {
  color: #9397ad;
  font-size: 0.15rem;
  height: 0.45rem;
  line-height: 0.45rem;
  span {
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.12rem;
    opacity: 0.5;
  }
}
/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.16rem;
  color: #212121;
  span {
    color: #9397ad;
    opacity: 1;
  }
}

.mint-navbar {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.1rem;
}

/deep/ .mint-navbar .mint-tab-item {
  width: 1.3rem;
  padding: 0;
  height: 0.48rem;
  background: transparent;
  margin-bottom: 0.01rem;
  flex: initial;
}
/deep/ .mint-tab-container {
  overflow: inherit;
}
/deep/ .mint-tab-item-label {
  position: relative;
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
    margin-right: 0.15rem;
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
.comment_bar {
  padding-bottom: 0.2rem;
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
</style>