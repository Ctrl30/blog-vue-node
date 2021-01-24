<template>
  <div class="comment-box">
    <div v-if="!isSignIn" class="signInText">登录留言</div>
    <div v-else class="input-box">
      <div class="input-top">
        <div class="img">
          <img class="avatar" :src="userInfo.headImg" />
          <p class="username">{{ userInfo.nickName }}</p>
        </div>
        <div class="text">
          <textarea class="comment-content" v-model="submitText"></textarea>
        </div>
      </div>

      <div class="input-buttom">
        <a href="javascript:void(0);" class="submit" @click="handleClick"
          >发表评论</a
        >
      </div>
    </div>

    <div class="all_comment">
      <p class="title">
        全部评论
        <span class="total">{{commentList.length}} </span>条
      </p>
      <div class="comment-list">
        <div class="comment-item" v-for="comment in commentList" :key="comment.id">
          <div class="item_l">
            <img class="avatar" :src="comment.headImg" />
            <p class="username">{{ comment.nickName }}</p>
          </div>
          <div class="item_r">
            <div class="comment-content">
              <div class="comment_text">{{comment.content}}</div>
              <div class="comment_time">
                <span class="date">{{comment.createTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitText: "",
      userInfo: {},
      commentList: [],
    };
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/api/users/info").then((res) => {
        const result = res.data;
        if (result) {
          this.userInfo = result.data;
        }
      });
    },
    handleClick() {
      this.$axios
        .post("/api/comment/publish", {
          content: this.submitText,
          articleId: this.$route.params.id,
        })
        .then((res) => {
          if (res.data.code === 0) {
          this.$message.success('发表成功')
            this.submitText = "";
            this.getComments()
          }
        });
    },
    getComments() {
      this.$axios
        .get("/api/comment/list", {
          params:{
          articleId:this.$route.params.id
        }
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.commentList = res.data.list
          }
        });
    },
  },
  computed: {
    isSignIn() {
      return this.$store.state.token;
    },
  },
  created() {
    this.getUserInfo();
    this.getComments();
  },
};
</script>

<style lang="scss" scoped>
.comment-box {
  padding: 50px 30px;
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.157),
    0 0 3px rgba($color: #000000, $alpha: 0.227);
  background: #fafafa;
  .signInText {
    color: #3b99fc;
    font-size: 18px;
    cursor: pointer;
  }
}
.input-box {
  .input-top {
    display: flex;
    .img {
      width: 100px;
      text-align: center;
      .avatar {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
      .username {
        cursor: pointer;
        color: #3b99fc;
        word-break: break-all;
      }
    }
    .text {
      flex: 1;
      textarea {
        width: 98%;
        margin-left: 2%;
        min-height: 80px;
        border: 1px solid #ddd;
        font-size: 14px;
        border-radius: 6px;
        padding: 20px;
        box-sizing: border-box;
        &:focus {
          border: 1px solid #3b99fc;
        }
      }
    }
  }

  .input-buttom {
    margin-top: 20px;
    overflow: hidden;
    .submit {
      float: right;
      width: 100px;
      height: 50px;
      line-height: 50px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      border-radius: 6px;
      color: #fff;
      &:hover {
        background: rgba(0, 129, 255, 0.7);
      }
    }
  }
}
.all_comment {
  text-align: left;
  border-top: 1px solid #eee;
  padding: 30px 0;
  margin: 30px 0 0 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 50px;
    border-left: 4px solid #3b99fc;
    padding-left: 16px;
  }
  .comment-list {
    .comment-item {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid #eee;
      .item_l {
        width: 100px;
        text-align: center;
        .avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid #ccc;
          margin-bottom: 20px;
        }
        .username {
          cursor: pointer;
          color: #3b99fc;
          word-break: break-all;
        }
      }
      .item_r {
        flex: 1;
        .comment-content {
          width: 98%;
          margin-left: 2%;
          box-sizing: border-box;
          font-size: 14px;
          padding: 10px;
          color: #666;
          .comment_text {
            min-height: 70px;
          }
          .comment_time {
            text-align: right;
            font-size: 12px;
            padding: 10;
          }
        }
      }
    }
  }
}
</style>